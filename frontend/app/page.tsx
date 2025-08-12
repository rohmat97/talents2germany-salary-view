"use client";

import Link from "next/link";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Talents2Germany Salary Management
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
            A comprehensive solution for managing employee salary information with ease and efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/admin/salaries"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              View Salary Data
            </Link>
            
            <a 
              href="https://github.com/rohmat97/talents2germany-salary-view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-white font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              GitHub Repository
            </a>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Employee Management</h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              Easily manage employee information, including personal details, position, and department.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Salary Tracking</h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              Keep track of employee salaries, bonuses, and other compensation details in one place.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Reporting</h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              Generate detailed reports on salary distributions, trends, and analytics.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 border-t border-zinc-200 dark:border-zinc-800 mt-10">
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p> {new Date().getFullYear()} Talents2Germany. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
