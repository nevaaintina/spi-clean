<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_vacancies', function (Blueprint $table) {
            $table->id();$table->string('title');
            $table->string('department');$table->string('location');
            $table->string('education');$table->string('job_type');
            $table->string('image')->nullable();$table->text('description')->nullable();
            $table->text('requirements')->nullable();$table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_vacancies');
    }
};