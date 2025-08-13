"use client";

import { useState } from "react";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  salary_in_local_currency: number;
  salary_in_euros: number | null;
  commission: number | null;
  displayed_salary: number | null;
  created_at: string;
  updated_at: string;
  isOptimistic?: boolean;
};

type EditFormData = {
  salary_in_euros: string;
  commission: string;
};

export default function SalaryEditModal({
  employee,
  onClose,
  onSubmit,
}: {
  employee: Employee;
  onClose: () => void;
  onSubmit: (data: { salary_in_euros: number | null; commission: number | null }) => Promise<void>;
}) {
  const [editFormData, setEditFormData] = useState<EditFormData>({
    salary_in_euros: employee.salary_in_euros?.toString() || "",
    commission: employee.commission?.toString() || "",
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState<string | null>(null);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const salaryData = {
      salary_in_euros: editFormData.salary_in_euros
        ? parseFloat(editFormData.salary_in_euros)
        : null,
      commission: editFormData.commission
        ? parseFloat(editFormData.commission)
        : 500,
    };

    try {
      await onSubmit(salaryData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update employee salary");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Edit Salary Details
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          Editing salary for{" "}
          <span className="font-medium">{employee.name}</span>
        </p>

        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="salary_in_euros"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Salary in Euros
            </label>
            <input
              type="number"
              id="salary_in_euros"
              name="salary_in_euros"
              value={editFormData.salary_in_euros}
              onChange={handleEditChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
              placeholder="Enter salary in euros"
            />
          </div>

          <div>
            <label
              htmlFor="commission"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Commission (default: 500)
            </label>
            <input
              type="number"
              id="commission"
              name="commission"
              value={editFormData.commission}
              onChange={handleEditChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
              placeholder="Enter commission amount"
            />
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              Update Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
