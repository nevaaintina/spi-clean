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
        if (!Schema::hasTable('services')) {
            Schema::create('services', function (Blueprint $table) {
                $table->id();
                $table->string('category'); // Menyimpan kategori layanan utama (dropdown)
                $table->string('title'); // Nama Sub-Layanan
                $table->text('description')->nullable(); // Penjelasan lengkap
                $table->json('what_we_do')->nullable(); // Poin-poin pekerjaan
                $table->json('key_benefits')->nullable(); // Poin-poin keuntungan
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};