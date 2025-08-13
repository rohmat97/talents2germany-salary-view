import { useState, useEffect, useCallback } from 'react';
import { apiGet, apiPut, apiPost, apiDelete } from '@/lib/api';

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

type EmployeeData = {
  data: Employee[];
};

type OptimisticEmployee = Employee & { isOptimistic?: boolean };

export function useEmployees() {
  const [employees, setEmployees] = useState<EmployeeData>({ data: [] });
  const [optimisticEmployees, setOptimisticEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const employeesData = await apiGet<EmployeeData>('/api/admin/employees', {
        cache: 'no-store',
      });
      setEmployees(employeesData);
      setOptimisticEmployees(employeesData.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEmployeeSalary = async (
    employeeId: number,
    salaryData: { salary_in_euros: number | null; commission: number | null }
  ) => {
    // Find the employee being updated
    const employeeToUpdate = employees.data.find(emp => emp.id === employeeId);
    
    if (!employeeToUpdate) {
      throw new Error('Employee not found');
    }

    // Set optimistic update
    const optimisticEmployee: OptimisticEmployee = {
      ...employeeToUpdate,
      ...salaryData,
      isOptimistic: true
    };

    setOptimisticEmployees(prev => 
      prev.map(emp => emp.id === employeeId ? optimisticEmployee : emp)
    );

    try {
      // Make the actual API call
      const updatedEmployee = await apiPut<Employee>(
        `/api/admin/employees/${employeeId}/salary`,
        salaryData
      );
      
      // Update with actual data
      setEmployees(prev => ({
        ...prev,
        data: prev.data.map(emp => emp.id === employeeId ? updatedEmployee : emp)
      }));
      
      setOptimisticEmployees(prev => 
        prev.map(emp => emp.id === employeeId ? updatedEmployee : emp)
      );
      
      return updatedEmployee;
    } catch (err: any) {
      // Revert optimistic update on error
      setOptimisticEmployees(prev => 
        prev.map(emp => emp.id === employeeId ? employeeToUpdate : emp)
      );
      throw err;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const addEmployee = async (employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newEmployee = await apiPost<Employee>('/api/employees', employeeData);
      
      // Optimistically add the new employee to the list
      setOptimisticEmployees(prev => [...prev, newEmployee]);
      setEmployees(prev => ({ ...prev, data: [...prev.data, newEmployee] }));
      
      return newEmployee;
    } catch (err: any) {
      setError(err.message || 'Failed to add employee');
      throw err;
    }
  };

  const deleteEmployee = async (employeeId: number) => {
    try {
      // Optimistically remove the employee from the list
      setOptimisticEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      setEmployees(prev => ({ ...prev, data: prev.data.filter(emp => emp.id !== employeeId) }));
      
      // Make the actual API call
      await apiDelete(`/api/employees/${employeeId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to delete employee');
      // Refresh the employee list to restore the deleted employee
      fetchEmployees();
      throw err;
    }
  };

  return {
    employees: optimisticEmployees,
    loading,
    error,
    refreshEmployees: fetchEmployees,
    updateEmployeeSalary,
    addEmployee,
    deleteEmployee
  };
}
