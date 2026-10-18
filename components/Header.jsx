import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Header({ onReviewsClick, onShareClick }) {
  return (
    <header className="relative z-50 mx-auto max-w-[960px] border-b border-white/15">
      <div className="flex items-center justify-between px-0 py-3.5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-14 overflow-hidden rounded-full bg-black">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SR%20GROUPS-V5WchfOJHFWYLd0R1l1VjrzUp6vMkc.jpeg"
              alt="SR Groups logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-[17px] font-semibold tracking-[0.24em]">SR GROUPS</h1>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-[#9e9d9a]">IT Solutions &amp; Healthcare</p>
          </div>
        </div>
        <nav className="flex items-center gap-8 text-sm text-[#d2d0cc]">
          <button type="button" onClick={onReviewsClick} className="hidden transition-colors hover:text-blue-200 sm:inline-block">Reviews</button>
          <button type="button" onClick={onShareClick} className="hidden transition-colors hover:text-blue-200 md:inline-block">Share your experience</button>
          <Link href="https://www.srgroups.company" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-[4px] bg-white px-5 py-2.5 font-semibold text-slate-950 transition-colors hover:bg-blue-50">
            Visit SR Groups <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
