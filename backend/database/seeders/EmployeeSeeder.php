<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 20 example employee records
        for ($i = 1; $i <= 20; $i++) {
            Employee::create([
                'name' => 'Employee ' . $i,
                'email' => 'employee' . $i . '@example.com',
                'role' => $this->getRandomRole(),
                'salary_in_local_currency' => rand(30000, 100000),
                'salary_in_euros' => rand(25000, 80000),
                'commission' => rand(300, 1000),
            ]);
        }
    }

    /**
     * Get a random employee role.
     */
    private function getRandomRole(): string
    {
        $roles = ['developer', 'designer', 'manager', 'analyst', 'consultant', 'engineer'];
        return $roles[array_rand($roles)];
    }
}
