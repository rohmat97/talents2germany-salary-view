<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Employee;
use App\Models\User;

class EmployeeSalaryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that submitting with an existing email updates the record instead of creating a duplicate.
     */
    public function test_employee_with_existing_email_gets_updated(): void
    {
        // Create an existing employee
        $existingEmployee = Employee::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role' => 'developer',
            'salary_in_local_currency' => 50000,
        ]);

        // Submit new data with the same email
        $response = $this->postJson('/api/employees', [
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'role' => 'senior developer',
            'salary_in_local_currency' => 75000,
        ]);

        // Assert that the response is successful and the record was updated
        $response->assertStatus(200);
        $this->assertDatabaseCount('employees', 1);
        $this->assertDatabaseHas('employees', [
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'role' => 'senior developer',
            'salary_in_local_currency' => 75000,
        ]);
    }

    /**
     * Test that submitting with a new email creates a new record.
     */
    public function test_employee_with_new_email_gets_created(): void
    {
        $response = $this->postJson('/api/employees', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'role' => 'designer',
            'salary_in_local_currency' => 60000,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('employees', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'role' => 'designer',
            'salary_in_local_currency' => 60000,
        ]);
    }

    /**
     * Test that admin can view all employees with salary details.
     */
    public function test_admin_can_view_all_employees(): void
    {
        // Create test employees
        Employee::factory()->count(3)->create();

        // For now, we'll test without authentication since we haven't fully implemented it
        // In a real application, you would authenticate as admin
        $response = $this->getJson('/api/admin/employees');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
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
                ]
            ],
            'links',
            'meta'
        ]);
    }

    /**
     * Test that admin can update salary in euros and commission.
     */
    public function test_admin_can_update_salary_details(): void
    {
        $employee = Employee::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role' => 'developer',
            'salary_in_local_currency' => 50000,
        ]);

        // For now, we'll test without authentication since we haven't fully implemented it
        // In a real application, you would authenticate as admin
        $response = $this->putJson("/api/admin/employees/{$employee->id}/salary", [
            'salary_in_euros' => 45000,
            'commission' => 1000,
        ]);

        $response->assertStatus(200);
        $updatedEmployee = Employee::find($employee->id);
        $this->assertEquals(45000, $updatedEmployee->salary_in_euros);
        $this->assertEquals(1000, $updatedEmployee->commission);
        $this->assertEquals(46000, $updatedEmployee->displayed_salary);
    }
}
