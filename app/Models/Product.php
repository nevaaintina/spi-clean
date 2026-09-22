<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'name',
        'image',
        'brochure',
        'video_path',
        'gallery',
        'overview',
        'description',
        'specifications',
        'features',
    ];

    protected $casts = [
        'specifications' => 'array',
        'features' => 'array',
        'gallery' => 'array',
    ];
}