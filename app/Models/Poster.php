<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poster extends Model
{
    // Tetapkan nama jadual secara eksplisit untuk mengelakkan ralat nama majmuk
    protected $table = 'posters';

    protected $fillable = [
        'image_path',
        'is_active',
    ];
}