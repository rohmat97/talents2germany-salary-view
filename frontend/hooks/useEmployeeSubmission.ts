import { useState, useCallback } from 'react';
import { apiPost } from '@/lib/api';

type EmployeeFormData = {
  name: string;
  email: string;
  salary_in_local_currency: string;
};

export function useEmployeeSubmission() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitEmployee = useCallback(async (formData: EmployeeFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await apiPost("/api/employees", {
        name: formData.name,
        email: formData.email,
        salary_in_local_currency: parseFloat(formData.salary_in_local_currency),
        role: "Employee" // Default role
      });
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    success,
    error,
    submitEmployee,
  };
}
