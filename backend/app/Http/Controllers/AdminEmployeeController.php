<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class AdminEmployeeController extends Controller
{
    /**
     * Display a listing of all employees with salary details.
     */
    public function index()
    {
        $employees = Employee::query()
            ->select([
                'id',
                'name',
                'email',
                'role',
                'salary_in_local_currency',
                'salary_in_euros',
                'commission',
                'displayed_salary',
                'created_at',
                'updated_at'
            ])
            ->orderByDesc('id')
            ->paginate(15);

        return response()->json($employees);
    }

    /**
     * Update employee salary details (euros and commission).
     */
    public function updateSalary(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'salary_in_euros' => ['sometimes', 'required', 'numeric', 'min:0'],
            'commission' => ['sometimes', 'required', 'numeric', 'min:0'],
        ]);

        $employee->update($data);

        // The displayed_salary will be automatically calculated due to the virtual column
        return response()->json($employee->fresh());
    }
}
