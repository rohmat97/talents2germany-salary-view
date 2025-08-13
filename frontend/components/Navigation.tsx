"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

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
            <NavLink href="/">Home</NavLink>
            <NavLink href="/user/form">Submit Salary</NavLink>
            <NavLink href="/admin/salaries">Admin Salaries</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
