import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Left side */}
      <div className="flex items-center space-x-6 text-gray-900 dark:text-gray-100 text-sm sm:text-base">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Home
        </Link>
        <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Dashboard
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
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
