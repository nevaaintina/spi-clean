<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('category');                  // Kategori produk (Excavator, Wheel Loader, dll)
            $table->string('name');                      // Nama produk / model
            $table->text('image')->nullable();           // Path foto utama produk
            $table->string('brochure')->nullable();      // Path file PDF brosur lokal (disimpan di folder brochures/products)
            $table->string('video_path')->nullable();    // Path file video lokal yang di-upload
            $table->json('gallery')->nullable();         // Galeri foto tambahan
            $table->text('overview')->nullable();        // Overview singkat
            $table->text('description')->nullable();     // Deskripsi lengkap
            $table->json('specifications')->nullable();  // Data spesifikasi teknis dinamis (Label & Nilai)
            $table->json('features')->nullable();        // Poin-poin fitur unggulan
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};