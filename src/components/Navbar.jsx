// Its purpose is to provide a navigation bar with links to different sections of the application.

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 bg-gray-100 dark:bg-gray-900 shadow-sm">
      {/* Left side: Brand */}
      <Link href="/">
        <span className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">
          SolarPulse
        </span>
      </Link>

      {/* Right side: Navigation */}
      <div className="space-x-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
        <Link href="/countries" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Explore Countries
        </Link>
        <Link href="/top5" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Top 5
        </Link>
        <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          About
        </Link>
      </div>
    </nav>
  );
}
