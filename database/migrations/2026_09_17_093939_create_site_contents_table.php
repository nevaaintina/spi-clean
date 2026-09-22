<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Pengaturan Homepage (Video Hero)
        Schema::create('home_settings', function (Blueprint $table) {
            $table->id();
            $table->string('youtube_url')->nullable();
            $table->string('video_path')->nullable();
            $table->timestamps();
        });

        // 2. Galeri Proyek
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->string('year');
            $table->string('image');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 3. Cabang / Area Operasional & Peta
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // Head Office / Branch Office / Warehouse
            $table->string('name');
            $table->string('city');
            $table->string('phone');
            $table->text('description')->nullable();
            $table->string('maps_link')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
        });

        // 4. Produk Utama & Spesifikasi
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // Excavator, Wheel Loader, dll.
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('image');
            $table->json('gallery')->nullable();
            $table->string('brochure')->nullable();
            $table->string('youtube_url')->nullable();
            $table->text('overview')->nullable();
            $table->longText('description')->nullable();
            $table->json('specifications')->nullable(); // Label & Nilai
            $table->json('features')->nullable(); // Poin Fitur Unggulan
            $table->timestamps();
        });

        // 5. Suku Cadang (Spare Parts)
        Schema::create('spare_parts', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('unit')->default('Pcs');
            $table->string('image');
            $table->json('specs_detail')->nullable(); // Detail tambahan
            $table->timestamps();
        });

        // 6. Berita / Knowledge
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('General');
            $table->text('content');
            $table->string('image');
            $table->timestamps();
        });

        // 7. Media Gallery
        Schema::create('media_galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('file_path');
            $table->string('type')->default('image'); // image / video
            $table->timestamps();
        });

        // 8. Testimoni (Customer, Karyawan, Anak Magang)
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['customer', 'employee', 'intern'])->default('customer');
            $table->text('quote');
            $table->string('name');
            $table->string('role'); // Jabatan / Status (Cth: Project Manager, Software Engineer, Mahasiswa Magang)
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_settings');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('branches');
        Schema::dropIfExists('products');
        Schema::dropIfExists('spare_parts');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('media_galleries');
        Schema::dropIfExists('testimonials');
    }
};