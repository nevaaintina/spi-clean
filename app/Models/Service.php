<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'title',
        'description',
        'what_we_do',
        'key_benefits',
    ];

    // Mengubah format text point-point menjadi array otomatis saat dipanggil di frontend
    protected $casts = [
        'what_we_do' => 'array',
        'key_benefits' => 'array',
    ];
}