import { Star } from 'lucide-react'

export default function ReviewsSection({ reviews }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-gray-400 mb-12">Real feedback from our valued customers</p>

        {reviews.length === 0 ? (
          <div className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/5 to-blue-500/5 border border-white/10 p-16 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-300">
              Be the first to share your experience with SR Groups
            </h3>
            <p className="text-gray-400">
              Your review will help others discover the value we bring
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/5 to-blue-500/5 border border-white/10 p-8 hover:border-blue-400/30 transition-all duration-200 hover:bg-gradient-to-br hover:from-white/10 hover:to-blue-500/10"
              >
                {/* Header with avatar and info */}
                <div className="flex gap-4 mb-4">
                  {review.profilePhoto ? (
                    <img
                      src={review.profilePhoto}
                      alt={review.fullName}
                      className="w-12 h-12 rounded-full object-cover border border-blue-300/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold text-white">
                      {review.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{review.fullName}</h3>
                    {review.jobTitle && (
                      <p className="text-sm text-gray-400">{review.jobTitle}</p>
                    )}
                    {review.company && (
                      <p className="text-sm text-gray-400">{review.company}</p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-blue-300 text-blue-300'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-300 mb-4 leading-relaxed">{review.reviewText}</p>

                {/* Date */}
                <p className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
