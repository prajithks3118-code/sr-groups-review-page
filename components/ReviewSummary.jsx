import { Star } from 'lucide-react'

export default function ReviewSummary({ reviews }) {
  const reviewCount = reviews.length
  const averageRating = reviewCount
    ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviewCount).toFixed(1)
    : null
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {reviewCount === 0 ? (
          <div className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/5 to-blue-500/5 border border-white/10 p-12 text-center">
            <div className="mb-4">
              <Star className="w-12 h-12 mx-auto text-blue-400/60" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-200">No reviews yet</h3>
            <p className="text-gray-400">Be the first to share your experience with SR Groups</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/5 to-blue-500/5 border border-white/10 p-8">
              <p className="text-gray-400 text-sm mb-2">Average Rating</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">{averageRating}</span>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-blue-300 text-blue-300"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Count */}
            <div className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/5 to-purple-500/5 border border-white/10 p-8">
              <p className="text-gray-400 text-sm mb-2">Total Reviews</p>
              <p className="text-4xl font-bold">{reviewCount}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
