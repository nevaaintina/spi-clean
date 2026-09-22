<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'category',
        'linkedin', // 👈 Ditambahkan agar mass assignment untuk linkedin diizinkan
        'image_path',
    ];
}