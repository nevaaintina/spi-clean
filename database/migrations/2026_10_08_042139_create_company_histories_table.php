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
        Schema::create('company_histories', function (Blueprint $table) {
    $table->id();
    $table->string('year'); // Contoh: "2022"
    $table->string('title'); // Contoh: "Authorized XCMG Dealer Indonesia"
    $table->integer('order')->default(0); // Untuk mengatur urutan tampilan
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_histories');
    }
};
