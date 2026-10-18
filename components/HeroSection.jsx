import { ArrowDown, ArrowUpRight } from 'lucide-react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SR%20GROUPS-V5WchfOJHFWYLd0R1l1VjrzUp6vMkc.jpeg'

export default function HeroSection({ onWriteReview, onExploreReviews }) {
  return (
    <section className="relative mx-auto grid min-h-[675px] max-w-[960px] items-center overflow-hidden px-0 py-20 lg:grid-cols-2 lg:gap-12">
      <div className="relative z-10 max-w-[540px]">
        <div className="mb-8 flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-blue-200">
          <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_16px_#93c5fd]" />
          Customer feedback
        </div>
        <h2 className="text-[62px] font-medium leading-[0.97] tracking-[-0.055em] text-[#f4f2ee] sm:text-[76px]">
          Your<br />Experience<br /><em className="font-serif font-normal tracking-[-0.07em] text-purple-200">Matters.</em>
        </h2>
        <p className="mt-10 max-w-[505px] text-[20px] leading-[1.7] text-[#a7b4c7]">
          Real perspective from the people and teams who move forward with SR Groups.
        </p>
        <div className="mt-10 flex items-center gap-8">
          <button type="button" onClick={onWriteReview} className="flex items-center gap-5 rounded-[4px] bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-blue-50">
            Share your experience <ArrowUpRight className="h-5 w-5" />
          </button>
          <button type="button" onClick={onExploreReviews} className="flex items-center gap-2 text-sm text-[#d0d9e7] transition-colors hover:text-blue-200">
            Explore reviews <ArrowDown className="h-4 w-4 text-blue-200" />
          </button>
        </div>
      </div>
      <div className="relative hidden h-[450px] lg:block">
        <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/40 bg-black/50 p-10 shadow-[0_0_80px_rgba(96,165,250,0.12)]">
          <img src={logoUrl} alt="SR Groups" className="h-full w-full rounded-full object-cover" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[460px] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-[50%] border border-purple-300/40" />
        <div className="absolute left-1/2 top-1/2 h-[285px] w-[465px] -translate-x-1/2 -translate-y-1/2 rotate-[-34deg] rounded-[50%] border border-white/25" />
        <span className="absolute right-4 top-20 text-[10px] uppercase tracking-[0.22em] text-[#7b8494]">IT solutions</span>
        <span className="absolute bottom-20 left-0 text-[10px] uppercase tracking-[0.22em] text-[#7b8494]">Healthcare</span>
      </div>
    </section>
  )
}
