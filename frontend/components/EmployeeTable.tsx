import { useState } from "react";
import SalaryEditModal from "./SalaryEditModal";

interface Employee {
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
}

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete, onAdd }: EmployeeTableProps) {
  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-800 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
          Employee Salaries
        </h2>
        <button 
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Add Employee
        </button>
      </div>

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
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">
                  {employee.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                  €{employee.salary_in_local_currency?.toLocaleString() || '0'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                  {employee.salary_in_euros !== null && employee.salary_in_euros !== undefined
                    ? `€${employee.salary_in_euros.toLocaleString()}`
                    : "Not set"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                  {employee.commission !== null && employee.commission !== undefined
                    ? `€${employee.commission.toLocaleString()}`
                    : "Not set"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                  {employee.displayed_salary !== null && employee.displayed_salary !== undefined
                    ? `€${employee.displayed_salary.toLocaleString()}`
                    : "Not calculated"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                  <button
                    onClick={() => onEdit(employee)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(employee.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div className="text-center py-10">
            <p className="text-zinc-500 dark:text-zinc-400">
              No employees found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
