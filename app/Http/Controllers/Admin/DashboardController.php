<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Auth;

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
use App\Models\Service;
use App\Models\Setting;
use App\Models\CompanyHistory;

class DashboardController extends Controller
{
    public function index()
    {
        // Mengambil path file PDF katalog produk dan spare part secara permanen dari database
        $productCatalog = Setting::where('key', 'product_catalog_pdf')->first();
        $sparePartCatalog = Setting::where('key', 'spare_part_catalog_pdf')->first();

        return Inertia::render('Admin/Dashboard', [
            'homeSetting'           => HomeSetting::first(),
            'projects'              => Project::latest()->get(),
            'branches'              => Branch::all(),
            'products'              => Product::all(),
            'spareParts'            => SparePart::all(),
            'articles'              => Article::latest()->get(), 
            'mediaGalleries'        => MediaGallery::all(),
            'testimonials'          => Testimonial::latest()->get(),
            'activePoster'          => Poster::where('is_active', true)->latest()->first(),
            'posters'               => Poster::latest()->get(),
            'milestones'            => Milestone::latest()->get(),
            'companyHistories'      => CompanyHistory::orderBy('year', 'asc')->get(), // Diubah dari 'histories' menjadi 'companyHistories'[cite: 11]
            'teamMembers'           => TeamMember::all(),
            'customers'             => Customer::all(),
            'jobVacancies'          => JobVacancy::latest()->get(),
            'services'              => Service::latest()->get(),
            
            // Menyediakan data katalog PDF utama secara terpisah untuk Produk dan Spare Part
            'productCatalogPdf'     => $productCatalog ? $productCatalog->value : null,
            'sparePartCatalogPdf'   => $sparePartCatalog ? $sparePartCatalog->value : null,
            
            // Variabel pendukung lainnya
            'explodedImagesMap'     => session('spare_part_exploded_images', []),
            'explodedPartsDataMap'  => session('spare_part_exploded_parts_data', []),
        ]);
    }
}