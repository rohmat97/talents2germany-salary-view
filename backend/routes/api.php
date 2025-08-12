<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AdminEmployeeController;
use App\Http\Middleware\EnsureAdminMiddleware;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => config('app.name'),
    ]);
});

// Employees CRUD API
Route::apiResource('employees', EmployeeController::class);

// Admin routes
Route::middleware([EnsureAdminMiddleware::class])->group(function () {
    Route::get('/admin/employees', [AdminEmployeeController::class, 'index']);
    Route::put('/admin/employees/{employee}/salary', [AdminEmployeeController::class, 'updateSalary']);
});
