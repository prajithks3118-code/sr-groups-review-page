'use client'

import { useState, useRef } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ReviewSummary from '@/components/ReviewSummary'
import ReviewsSection from '@/components/ReviewsSection'
import ReviewForm from '@/components/ReviewForm'
import Footer from '@/components/Footer'

export default function Page() {
  const [reviews, setReviews] = useState([])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    jobTitle: '',
    industry: '',
    rating: 0,
    reviewText: '',
    profilePhoto: null,
    agreed: false,
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const submittingRef = useRef(false)
  const formRef = useRef(null)
  const reviewsRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }

    setFormData((prev) => ({
      ...prev,
      profilePhoto: file,
    }))

    const reader = new FileReader()

    reader.onloadend = () => {
      setImagePreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: null,
    }))

    setImagePreview(null)
  }

  const validateForm = () => {
    // Required fields only.
    // Company Name, Job Title and Profile Photo are OPTIONAL.
    if (!formData.fullName.trim()) {
      return false
    }

    if (!formData.email.trim()) {
      return false
    }

    if (!formData.industry.trim()) {
      return false
    }

    if (!formData.reviewText.trim()) {
      return false
    }

    if (Number(formData.rating) < 1 || Number(formData.rating) > 5) {
      return false
    }

    if (!formData.agreed) {
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(formData.email.trim())) {
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (submittingRef.current) {
      return
    }

    if (!validateForm()) {
      alert(
        'Please fill in all required fields and accept the consent checkbox.'
      )
      return
    }

    submittingRef.current = true

    const review = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),

      // These two fields are optional.
      company: formData.company.trim(),
      jobTitle: formData.jobTitle.trim(),

      // Industry is currently required.
      industry: formData.industry.trim(),

      rating: Number(formData.rating),

      reviewText: formData.reviewText.trim(),

      // Optional profile photo.
      profilePhoto: imagePreview || '',
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      })

      let result = null

      try {
        result = await response.json()
      } catch {
        result = null
      }

      if (!response.ok || !result?.success) {
        const message =
          result?.message ||
          `The server could not save the review. HTTP status: ${response.status}`

        throw new Error(message)
      }

      // Show the newly submitted review immediately.
      setReviews((currentReviews) => [
        {
          ...review,
          date: new Date().toISOString(),
        },
        ...currentReviews,
      ])

      setSubmitted(true)

      // Clear the form after successful submission.
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          company: '',
          jobTitle: '',
          industry: '',
          rating: 0,
          reviewText: '',
          profilePhoto: null,
          agreed: false,
        })

        setImagePreview(null)
        setSubmitted(false)
        submittingRef.current = false
      }, 3000)
    } catch (error) {
      console.error('Review submission error:', error)

      alert(
        `Could not save your review: ${
          error?.message || 'Unknown error'
        }`
      )

      submittingRef.current = false
    }
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0c0d] text-[#f5f3ef]">
      <Header
        onReviewsClick={scrollToReviews}
        onShareClick={scrollToForm}
      />

      <main>
        <HeroSection
          onWriteReview={scrollToForm}
          onExploreReviews={scrollToReviews}
        />

        <div ref={reviewsRef}>
          <ReviewSummary reviews={reviews} />

          <ReviewsSection reviews={reviews} />
        </div>

        <ReviewForm
          ref={formRef}
          formData={formData}
          imagePreview={imagePreview}
          submitted={submitted}
          onInputChange={handleInputChange}
          onRatingChange={handleRatingChange}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  )
}