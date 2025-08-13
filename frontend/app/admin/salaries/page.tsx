"use client";

import { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import { apiGet, apiPut, getApiBaseUrl } from "@/lib/api";

type Health = { status: string; app?: string };

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
};

export default function AdminSalariesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [employees, setEmployees] = useState<{data: Employee[]}>({data: []});
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editFormData, setEditFormData] = useState({
    salary_in_euros: "",
    commission: "",
  });

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee);
    setEditFormData({
      salary_in_euros: employee.salary_in_euros?.toString() || "",
      commission: employee.commission?.toString() || "",
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingEmployee) return;

    try {
      const updatedEmployee = await apiPut<Employee>(
        `/api/admin/employees/${editingEmployee.id}/salary`,
        {
          salary_in_euros: editFormData.salary_in_euros
            ? parseFloat(editFormData.salary_in_euros)
            : null,
          commission: editFormData.commission
            ? parseFloat(editFormData.commission)
            : 500,
        }
      );

      // Update the employee in the state
      setEmployees((prev) => ({
        ...prev,
        data: prev.data.map((emp) =>
          emp.id === editingEmployee.id ? updatedEmployee : emp
        )
      }));

      // Close the modal
      setEditingEmployee(null);
    } catch (err: any) {
      setError(err.message || "Failed to update employee salary");
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const healthData = await apiGet<Health>("/api/health", {
          cache: "no-store",
        });
        const employeesData = await apiGet<{data: Employee[]}>("/api/admin/employees", {
          cache: "no-store",
        });
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
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
            Admin • Salaries
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Manage employee salary information
          </p>
        </div>

        <div className="grid gap-6">
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-800 shadow-sm">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-3">
              Backend Status
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              API Base URL: <span className="font-mono">{getApiBaseUrl()}</span>
            </p>
            <div className="mt-3">
              {loading && (
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Checking backend…
                </p>
              )}
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
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
              <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                Employee Salaries
              </h2>
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
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Failed to load employee data
                </p>
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        Local Salary
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        Euro Salary
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        Commission
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        Displayed Salary
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                    {employees.data.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                          {employee.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                          €{employee.salary_in_local_currency.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                          {employee.salary_in_euros !== null
                            ? `€${employee.salary_in_euros.toLocaleString()}`
                            : "Not set"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                          {employee.commission !== null
                            ? `€${employee.commission.toLocaleString()}`
                            : "Not set"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                          {employee.displayed_salary !== null
                            ? `€${employee.displayed_salary.toLocaleString()}`
                            : "Not calculated"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                          <button
                            onClick={() => handleEditClick(employee)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                          >
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

                {employees.data.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      No employees found
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Edit Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Edit Salary Details
              </h2>
              <button
                onClick={() => setEditingEmployee(null)}
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
              <span className="font-medium">{editingEmployee.name}</span>
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

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
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
      )}
    </div>
  );
}
