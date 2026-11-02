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
        'linkedin', // 👈 Diizinkan untuk mass assignment (create/update)
        'image_path',
    ];
}