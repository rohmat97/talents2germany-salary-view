<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'email',
        'role',
        'salary',
        'salary_in_local_currency',
        'salary_in_euros',
        'commission',
    ];

    protected $casts = [
        'salary' => 'decimal:2',
        'salary_in_local_currency' => 'decimal:2',
        'salary_in_euros' => 'decimal:2',
        'commission' => 'decimal:2',
        'displayed_salary' => 'decimal:2',
    ];
}
