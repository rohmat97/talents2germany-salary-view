<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->decimal('salary_in_local_currency', 10, 2)->nullable();
            $table->decimal('salary_in_euros', 10, 2)->default(0);
            $table->decimal('commission', 10, 2)->default(500);
            $table->decimal('displayed_salary', 10, 2)->virtualAs('salary_in_euros + commission');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn(['salary_in_local_currency', 'salary_in_euros', 'commission', 'displayed_salary']);
        });
    }
};
