<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyHistory extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak menggunakan bentuk plural standar secara otomatis
    protected $table = 'company_histories';

    // Daftar kolom yang diizinkan untuk mass assignment (pencatatan data via form)
    protected $fillable = [
        'year',
        'title',
    ];
}