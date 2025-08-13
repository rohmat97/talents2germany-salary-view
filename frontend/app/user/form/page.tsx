"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useEmployeeSubmission } from "@/hooks/useEmployeeSubmission";
import { useHealth } from "@/hooks/useHealth";
import BackendStatus from "@/components/BackendStatus";
import StatusDisplay from "@/components/StatusDisplay";

export default function UserSalaryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary_in_local_currency: "",
  });
  
  const { loading, success, error, submitEmployee } = useEmployeeSubmission();
  const { health, loading: healthLoading, error: healthError, refreshHealth } = useHealth();
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitEmployee(formData);
      setSuccessMessage("Salary data submitted successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
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

  // Add a refresh handler for manual refresh
  const handleRefresh = () => {
    refreshHealth();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navigation />
      
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {successMessage}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
            User • Salary Information
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Please enter your details and salary information
          </p>
        </div>

        <div className="grid gap-6">
          <BackendStatus 
            health={health}
            loading={healthLoading}
            error={healthError}
          />

          <StatusDisplay 
            loading={loading}
            error={error}
            onRetry={handleRefresh}
          />

          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-6">
              Salary Submission Form
            </h2>

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
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Salary Information"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
