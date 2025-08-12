"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-zinc-900 dark:text-white"
            >
              Talents2Germany
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/" 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/admin/salaries" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/admin/salaries" 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Admin Salaries
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
