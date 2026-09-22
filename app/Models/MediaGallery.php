<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaGallery extends Model
{
    use HasFactory;

    // Nama tabel di database
    protected $table = 'media_galleries';

    // Kolom yang diizinkan untuk diisi secara mass-assignment dari form admin
    protected $fillable = [
        'title',
        'category',
        'media_type',
        'file_path',
        'description',
    ];
}