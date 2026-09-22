<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'city',
        'phone',
        'description',
        'maps_link',
        'latitude',
        'longitude',
    ];
}