<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('spare_parts', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('part_number');
            $table->string('name');
            $table->string('brand')->default('XCMG');
            $table->text('image')->nullable();
            $table->json('gallery')->nullable(); // Untuk multi-upload foto tambahan
            $table->string('catalog_pdf')->nullable(); // File PDF download katalog utama
            $table->json('exploded_images')->nullable(); // Gambar diagram exploded view per assembly
            $table->text('description')->nullable();
            
            // Kolom spesifikasi detail tambahan sesuai form admin & controller
            $table->string('delivery_time')->nullable();
            $table->string('supply_capacity')->nullable();
            $table->string('product_origin')->nullable();
            $table->string('package_type')->nullable();
            $table->string('shipping_methods')->nullable();
            $table->string('rating')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spare_parts');
    }
};