<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SparePart extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'part_number',
        'name',
        'brand',
        'image',
        'gallery',
        'description',
        'catalog_pdf',
        'exploded_images',
        'delivery_time',
        'supply_capacity',
        'product_origin',
        'package_type',
        'shipping_methods',
        'rating',
    ];

    protected $casts = [
        'gallery'         => 'array',
        'exploded_images' => 'array',
    ];
}