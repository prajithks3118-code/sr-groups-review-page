import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-blue-900/20 backdrop-blur-md py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold mb-2">SR GROUPS</h3>
            <p className="text-sm text-gray-400">IT Solutions & Healthcare</p>
          </div>

          {/* Link */}
          <div className="text-right md:text-left">
            <Link
              href="https://www.srgroups.company"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 transition-colors duration-200 text-sm"
            >
              Visit SR Groups
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} SR Groups. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
