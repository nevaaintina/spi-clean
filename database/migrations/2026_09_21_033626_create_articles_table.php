<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('read_time')->nullable()->default('5 Menit');
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('instagram_link')->nullable(); // Kolom untuk Link Instagram
            $table->string('thumbnail')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};