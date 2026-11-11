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
        Schema::table('media_galleries', function (Blueprint $table) {
            // Ubah file_path agar boleh kosong (NULL)
            $table->string('file_path')->nullable()->change();

            // Tambahkan instagram_url jika belum ada
            if (!Schema::hasColumn('media_galleries', 'instagram_url')) {
                $table->string('instagram_url')->nullable()->after('file_path');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media_galleries', function (Blueprint $table) {
            if (Schema::hasColumn('media_galleries', 'instagram_url')) {
                $table->dropColumn('instagram_url');
            }
        });
    }
};