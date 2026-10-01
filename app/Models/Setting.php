<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    // Nama tabel di database
    protected $table = 'settings';

    // Kolom yang diizinkan untuk diisi secara massal (mass assignment)
    protected $fillable = [
        'key',
        'value',
    ];

    /**
     * Helper opsional untuk mengambil path PDF katalog berdasarkan tipe ('product' atau 'spare_part')
     */
    public static function getCatalogPath($type)
    {
        $setting = self::where('key', $type . '_catalog_pdf')->first();
        return $setting ? $setting->value : null;
    }
}