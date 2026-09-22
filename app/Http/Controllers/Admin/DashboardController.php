<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HomeSetting;
use App\Models\Project;
use App\Models\Branch;
use App\Models\Product;
use App\Models\SparePart;
use App\Models\Article;
use App\Models\MediaGallery;
use App\Models\Testimonial;
use App\Models\Poster;
use App\Models\Milestone;
use App\Models\TeamMember;
use App\Models\Customer;
use App\Models\JobVacancy;
use App\Models\Service; // 👈 Model Service diimpor di sini

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'homeSetting'          => HomeSetting::first(),
            'projects'             => Project::latest()->get(),
            'branches'             => Branch::all(),
            'products'             => Product::all(),
            'spareParts'           => SparePart::all(),
            'articles'             => Article::latest()->get(), 
            'mediaGalleries'       => MediaGallery::all(),
            'testimonials'         => Testimonial::latest()->get(),
            'activePoster'         => Poster::where('is_active', true)->latest()->first(),
            'posters'              => Poster::latest()->get(),
            'milestones'           => Milestone::latest()->get(),
            'teamMembers'          => TeamMember::all(),
            'customers'            => Customer::all(),
            'jobVacancies'         => JobVacancy::latest()->get(),
            'services'             => Service::latest()->get(), // 👈 Memuat data sub-layanan untuk Admin Dashboard
            
            // Variabel untuk menyelaraskan status fail PDF katalog utama pada dashboard admin
            'catalogPdfUrl'        => session('spare_part_catalog_pdf'),
            'explodedImagesMap'    => session('spare_part_exploded_images', []),
            'explodedPartsDataMap' => session('spare_part_exploded_parts_data', []),
        ]);
    }
}