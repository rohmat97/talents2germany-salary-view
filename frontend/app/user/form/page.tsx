"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useEmployeeSubmission } from "@/hooks/useEmployeeSubmission";

export default function UserSalaryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary_in_local_currency: "",
  });
  
  const { loading, success, error, submitEmployee } = useEmployeeSubmission();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitEmployee(formData);
      // Reset form
      setFormData({
        name: "",
        email: "",
        salary_in_local_currency: "",
      });
    } catch (err: any) {
      // Error is handled in the hook
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navigation />
      
      <main className="max-w-2xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
            Salary Information Form
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Please enter your details and salary information
          </p>

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Salary data submitted successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200">
                Error: {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="salary_in_local_currency" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Salary in Local Currency
              </label>
              <input
                type="number"
                id="salary_in_local_currency"
                name="salary_in_local_currency"
                value={formData.salary_in_local_currency}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Enter your salary amount"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Salary Information"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
