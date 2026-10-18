import { Star, Upload, X } from 'lucide-react'
import { forwardRef, useRef } from 'react'

const ReviewForm = forwardRef(
  (
    {
      formData,
      imagePreview,
      submitted,
      onInputChange,
      onRatingChange,
      onImageUpload,
      onRemoveImage,
      onSubmit,
    },
    ref
  ) => {
    const starRefs = useRef([])

    const selectRating = (value) => {
      onRatingChange(value)
      starRefs.current[value - 1]?.focus()
    }

    const handleStarKeyDown = (e) => {
      const current = formData.rating || 0
      let next = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Math.min(5, current + 1)
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Math.max(1, current - 1)
      else if (e.key === 'Home') next = 1
      else if (e.key === 'End') next = 5
      if (next !== null) {
        e.preventDefault()
        selectRating(next)
      }
    }

    return (
      <section ref={ref} className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Share Your Feedback</h2>

          {submitted ? (
            <div className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 p-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Star className="w-8 h-8 text-green-400 fill-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-200 mb-2">Thank you for your review</h3>
              <p className="text-blue-100/80">
                Your review has been added to the reviews section.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/5 to-blue-500/5 border border-white/10 p-8 space-y-6"
            >
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={onInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/10 transition-all duration-200 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={onInputChange}
                  placeholder="yourname@gmail.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/10 transition-all duration-200 focus:outline-none"
                />
              </div>

              {/* Company and Job Title Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={onInputChange}
                    placeholder="Your company"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/10 transition-all duration-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-white mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={onInputChange}
                    placeholder="Your position"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/10 transition-all duration-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Industry/Sector */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-white mb-2">
                  Industry / Sector <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={onInputChange}
                  placeholder="e.g., Healthcare, IT, Finance"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/10 transition-all duration-200 focus:outline-none"
                />
              </div>

              {/* Star Rating */}
              <div>
                <span id="rating-label" className="block text-sm font-medium text-white mb-4">
                  Star Rating <span className="text-red-400" aria-hidden="true">*</span>
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="rating-label"
                  aria-required="true"
                  onKeyDown={handleStarKeyDown}
                  className="flex gap-2"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      ref={(el) => {
                        starRefs.current[star - 1] = el
                      }}
                      type="button"
                      role="radio"
                      aria-checked={formData.rating === star}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      tabIndex={formData.rating === star || (formData.rating === 0 && star === 1) ? 0 : -1}
                      onClick={() => onRatingChange(star)}
                      className="rounded transition-transform duration-200 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'fill-blue-300 text-blue-300'
                            : 'text-gray-500 hover:text-blue-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label htmlFor="reviewText" className="block text-sm font-medium text-white mb-2">
                  Write Your Review <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="reviewText"
                  name="reviewText"
                  required
                  value={formData.reviewText}
                  onChange={onInputChange}
                  placeholder="Share your experience with SR Groups..."
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-400 focus:bg-white/10 transition-all duration-200 focus:outline-none resize-none"
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <span id="profile-photo-label" className="block text-sm font-medium text-white mb-2">
                  Profile Photo
                </span>
                <div className="space-y-4">
                  {!imagePreview ? (
                    <label className="relative flex items-center justify-center gap-2 px-4 py-8 rounded-lg bg-white/5 border border-dashed border-white/20 hover:border-blue-400 hover:bg-white/10 cursor-pointer transition-all duration-200 focus-within:border-blue-400 focus-within:bg-white/10">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span id="profile-photo-action" className="text-gray-400 text-sm">Click to upload image</span>
                      <input
                        type="file"
                        id="profilePhoto"
                        accept="image/*"
                        onChange={onImageUpload}
                        aria-labelledby="profile-photo-label profile-photo-action"
                        className="sr-only"
                      />
                    </label>
                  ) : (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={imagePreview}
                        alt="Profile photo preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={onRemoveImage}
                        aria-label="Remove profile photo"
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  required
                  checked={formData.agreed}
                  onChange={onInputChange}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 accent-blue-400 cursor-pointer"
                />
                <label htmlFor="agreed" className="text-sm text-gray-300 cursor-pointer">
                  I agree to have my review displayed publicly
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </section>
    )
  }
)

ReviewForm.displayName = 'ReviewForm'

export default ReviewForm
