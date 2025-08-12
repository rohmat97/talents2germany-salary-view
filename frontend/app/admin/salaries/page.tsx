"use client";

import { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import { apiGet, getApiBaseUrl } from "@/lib/api";

type Health = { status: string; app?: string };

type Employee = {
  id: number;
  name: string;
  position: string;
  salary: number;
  department: string;
  created_at: string;
  updated_at: string;
};

export default function AdminSalariesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const healthData = await apiGet<Health>("/api/health", { cache: "no-store" });
        const employeesData = await apiGet<Employee[]>("/api/employees", { cache: "no-store" });
        if (mounted) {
          setHealth(healthData);
          setEmployees(employeesData);
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">Admin • Salaries</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Manage employee salary information</p>
        </div>

        <div className="grid gap-6">
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-800 shadow-sm">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-3">Backend Status</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">API Base URL: <span className="font-mono">{getApiBaseUrl()}</span></p>
            <div className="mt-3">
              {loading && <p className="text-sm text-zinc-600 dark:text-zinc-300">Checking backend…</p>}
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              {!loading && !error && (
                <div className="text-sm">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    {health?.status || "unknown"}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-white">Employee Salaries</h2>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900">
                Add Employee
              </button>
            </div>
            
            {loading && (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            {error && (
              <div className="text-center py-10">
                <p className="text-red-600 dark:text-red-400 mb-4">Failed to load employee data</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white text-sm font-medium rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
            
            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                  <thead className="bg-zinc-50 dark:bg-zinc-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Position</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Salary</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">{employee.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">{employee.position}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">{employee.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">€{employee.salary.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {employees.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-zinc-500 dark:text-zinc-400">No employees found</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
