import { NextResponse } from 'next/server'

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL

export async function POST(request) {
  try {
    if (!SCRIPT_URL) {
      return NextResponse.json(
        { success: false, message: 'Google Apps Script URL is not configured.' },
        { status: 500 }
      )
    }

    const review = await request.json()

    const payload = {
      action: 'addReview',
      fullName: review.fullName || '',
      email: review.email || '',
      company: typeof review.company === 'string' ? review.company.trim() : '',
      jobTitle: typeof review.jobTitle === 'string' ? review.jobTitle.trim() : '',
      industry: typeof review.industry === 'string' ? review.industry.trim() : '',
      rating: Number(review.rating) || 0,
      reviewText: review.reviewText || '',
      profilePhoto:
        typeof review.profilePhoto === 'string'
          ? review.profilePhoto
          : '',
    }

    if (
      !payload.fullName.trim() ||
      !payload.email.trim() ||
      !payload.industry ||
      !payload.reviewText.trim() ||
      payload.rating < 1 ||
      payload.rating > 5
    ) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required review fields.' },
        { status: 400 }
      )
    }

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new Error(`Apps Script returned HTTP ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Unable to save the review.',
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Review saved successfully.',
    })
  } catch (error) {
    console.error('Review submission error:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to save the review. Please try again.' },
      { status: 500 }
    )
  }
}