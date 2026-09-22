<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'read_time',
        'excerpt',
        'content',
        'instagram_link',
        'thumbnail',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}