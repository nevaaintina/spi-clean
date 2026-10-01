<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('media_galleries')) {
            Schema::create('media_galleries', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('category');
                $table->string('media_type');
                $table->string('file_path');
                $table->text('description')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('media_galleries');
    }
};