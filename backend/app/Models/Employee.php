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
    ];

    protected $casts = [
        'salary' => 'decimal:2',
    ];
}
