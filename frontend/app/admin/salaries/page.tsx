"use client";

import { useState } from "react";
import Navigation from "../../../components/Navigation";
import { useEmployees } from "@/hooks/useEmployees";
import { useHealth } from "@/hooks/useHealth";
import SalaryEditModal from "@/components/SalaryEditModal";
import BackendStatus from "@/components/BackendStatus";
import EmployeeTable from "@/components/EmployeeTable";
import StatusDisplay from "@/components/StatusDisplay";
import ConfirmationModal from "@/components/ConfirmationModal";
import AddEmployeeModal from "@/components/AddEmployeeModal";

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

export default function AdminSalariesPage() {
  const { employees, loading, error, refreshEmployees, updateEmployeeSalary, addEmployee, deleteEmployee } = useEmployees();
  const { health, loading: healthLoading, error: healthError, refreshHealth } = useHealth();
  
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; employeeId: number | null }>({ 
    isOpen: false, 
    employeeId: null 
  });
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleAddClick = () => {
    setIsAddingEmployee(true);
  };

  const handleAddEmployeeSubmit = async (employeeData: {
    name: string;
    email: string;
    role: string;
    salary_in_local_currency: number;
  }) => {
    // Convert the data to match the Employee type structure
    const fullEmployeeData = {
      ...employeeData,
      salary_in_euros: null,
      commission: null,
      displayed_salary: null
    };
    await addEmployee(fullEmployeeData);
    setSuccessMessage('Employee added successfully');
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDeleteClick = (employeeId: number) => {
    setDeleteConfirmation({ isOpen: true, employeeId });
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation.employeeId) {
      try {
        await deleteEmployee(deleteConfirmation.employeeId);
        setSuccessMessage('Employee deleted successfully');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        // Error handling is already done in the hook
        console.error('Delete error:', err);
      }
      setDeleteConfirmation({ isOpen: false, employeeId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, employeeId: null });
  };

  // Add a refresh handler for manual refresh
  const handleRefresh = () => {
    refreshEmployees();
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
            Admin • Salaries
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Manage employee salary information
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

          {!loading && !error && (
            <EmployeeTable 
              employees={employees}
              onEdit={handleEditClick}
              onAdd={handleAddClick}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingEmployee && (
        <SalaryEditModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSubmit={async (salaryData) => {
            await updateEmployeeSalary(editingEmployee.id, salaryData);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <ConfirmationModal
          title="Delete Employee"
          message="Are you sure you want to delete this employee? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {/* Add Employee Modal */}
      {isAddingEmployee && (
        <AddEmployeeModal
          onClose={() => setIsAddingEmployee(false)}
          onSubmit={handleAddEmployeeSubmit}
        />
      )}
    </div>
  );
}
