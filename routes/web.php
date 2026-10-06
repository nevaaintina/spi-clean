<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
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
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\JobApplicationController;

// ==================== RUTE HALAMAN UTAMA & PUBLIK ====================

Route::get('/', function () {
    return Inertia::render('Home', [
        'homeSetting'  => HomeSetting::first(),
        'projects'     => Project::all(),
        'branches'     => Branch::all(),
        'testimonials' => Testimonial::where('category', 'customer')->get(),
        'latestPosts'  => Article::latest()->take(4)->get(),
        'activePoster' => Poster::where('is_active', true)->latest()->first(),
    ]);
});

Route::get('/contact-us', function () {
    return Inertia::render('Contact');
});

Route::get('/career', function () {
    return Inertia::render('Career', [
        'jobVacancies'       => JobVacancy::latest()->get(),
        'careerTestimonials' => Testimonial::whereIn('category', ['employee', 'intern'])->get()
    ]);
});

Route::get('/media', function () {
    return Inertia::render('Media', [
        'mediaGalleries' => MediaGallery::all()
    ]);
});

Route::get('/media-gallery', function () {
    return Inertia::render('Media', [
        'mediaGalleries' => MediaGallery::all()
    ]);
});

Route::get('/products', function () {
    $productCatalog = Setting::where('key', 'product_catalog_pdf')->first();

    return Inertia::render('Products/Index', [
        'products'      => Product::all(),
        'catalogPdfUrl' => $productCatalog ? $productCatalog->value : null,
    ]);
});

Route::get('/products/{product}', function (Product $product) {
    return Inertia::render('Products/Show', [
        'product' => $product,
    ]);
});

// ==================== RUTE SERVICES ====================
Route::get('/services', [ServiceController::class, 'index']);

Route::get('/services/{categoryName}', function ($categoryName) {
    $decodedName = urldecode($categoryName);
    $services = Service::where('category', 'LIKE', "%{$decodedName}%")->get();

    $descriptions = [
        "Maintenance & Repair" => "Layanan pemeliharaan berkala dan perbaikan menyeluruh untuk memastikan unit alat berat Anda selalu dalam kondisi prima.",
        "Installation & Commissioning" => "Layanan pemasangan dan uji laik operasi profesional untuk unit atau komponen baru sebelum diterjunkan ke lapangan.",
        "Overhaul & Rebuild" => "Solusi perbaikan besar dan restorasi total komponen mesin guna mengembalikan performa standar pabrikan.",
        "Inspection & Testing" => "Inspeksi ketat dan pengujian performa komponen kritis untuk mendeteksi potensi kerusakan sejak dini.",
        "Contract & Consulting" => "Layanan kontrak perawatan jangka panjang dan konsultasi teknis manajemen alat berat proyek Anda."
    ];

    return Inertia::render('Services/Show', [
        'category' => [
            'name' => $decodedName,
            'description' => $descriptions[$decodedName] ?? 'Layanan profesional dan terpercaya dari PT. Servistama Pro Indonesia.'
        ],
        'serviceList' => $services
    ]);
});

// ==================== RUTE PUBLIK KNOWLEDGE ====================
Route::get('/knowledge', function (Request $request) {
    $query = Article::latest();

    if ($request->has('category') && $request->input('category')) {
        $query->where('category', $request->input('category'));
    }

    return Inertia::render('Knowledge/Index', [
        'articles'        => $query->get(),
        'featuredArticle' => Article::where('is_featured', true)->latest()->first() ?? Article::latest()->first(),
        'filters'         => $request->only(['category']),
    ]);
});

Route::get('/knowledge/{article}', function (Article $article) {
    return Inertia::render('Knowledge/Show', [
        'article'         => $article,
        'relatedArticles' => Article::where('id', '!=', $article->id)->latest()->take(3)->get(),
    ]);
});

// Rute Halaman Lainnya
Route::get('/why-choose-us', function () {
    return Inertia::render('WhyChooseUs');
});

Route::get('/featured-services/{slug}', function ($slug) {
    return Inertia::render('ShowFeatured', [
        'slug' => $slug
    ]);
});

Route::get('/esg', function () {
    return Inertia::render('About/Esg');
});

Route::get('/hse', function () {
    return Inertia::render('About/Hse');
});

Route::get('/about', function () {
    return Inertia::render('About/Index', [
        'milestones'     => Milestone::orderBy('year', 'asc')->get(),
        'managementTeam' => TeamMember::all(),
        'customers'      => Customer::all(),
    ]);
});

// ==================== RUTE PUBLIK SPARE PARTS ====================
Route::get('/spare-parts', function (Request $request) {
    $query = SparePart::query();

    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where('part_number', 'like', "%{$search}%")
              ->orWhere('name', 'like', "%{$search}%");
    }

    if ($request->has('category') && $request->input('category') !== 'Semua') {
        $query->where('category', $request->input('category'));
    }

    $sparePartCatalog = Setting::where('key', 'spare_part_catalog_pdf')->first();

    return Inertia::render('SpareParts/Index', [
        'spareParts'        => $query->get(),
        'filters'           => $request->only(['search', 'category']),
        'catalogPdfUrl'     => $sparePartCatalog ? $sparePartCatalog->value : null,
        'explodedImages'    => session('spare_part_exploded_images', []),
        'explodedPartsData' => session('spare_part_exploded_parts_data', []),
    ]);
});

Route::get('/spare-parts/{sparePart}', function (SparePart $sparePart) {
    $sparePartCatalog = Setting::where('key', 'spare_part_catalog_pdf')->first();

    return Inertia::render('SpareParts/Show', [
        'sparePart'          => $sparePart,
        'catalogPdfUrl'      => $sparePartCatalog ? $sparePartCatalog->value : null,
        'explodedImagesMap'    => session('spare_part_exploded_images', []),
        'explodedPartsDataMap' => session('spare_part_exploded_parts_data', []),
    ]);
});


// ==================== RUTE AUTHENTICATION ====================
Route::get('/login', [AuthController::class, 'create'])->name('login'); 
Route::post('/login', [AuthController::class, 'store']);
Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');


// ==================== RUTE DASHBOARD ADMIN ====================
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HomeSettingController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\MilestoneController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\SparePartController as AdminSparePartController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\MediaGalleryController;
use App\Http\Controllers\Admin\JobVacancyController;
use App\Http\Controllers\Admin\CatalogController;

Route::get('/admin', [DashboardController::class, 'index'])->name('admin.dashboard')->middleware(['auth']);

Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {
    Route::get('/home/hero', [HomeSettingController::class, 'index'])->name('home.hero');
    Route::post('/home/hero', [HomeSettingController::class, 'update'])->name('home.hero.update');
    Route::delete('/home/hero', [HomeSettingController::class, 'deleteHero'])->name('home.hero.delete');

    Route::post('/posters', [HomeSettingController::class, 'storePoster'])->name('posters.store');
    Route::delete('/posters/{poster}', [HomeSettingController::class, 'destroyPoster'])->name('posters.destroy');

    Route::resource('projects', ProjectController::class);
    Route::resource('branches', BranchController::class);

    Route::resource('products', ProductController::class);
    Route::resource('testimonials', TestimonialController::class);

    Route::resource('milestones', MilestoneController::class);
    Route::resource('team-members', TeamMemberController::class);
    Route::resource('customers', CustomerController::class);

    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');

    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');

    Route::post('/media', [MediaGalleryController::class, 'store'])->name('media.store');
    Route::delete('/media/{media}', [MediaGalleryController::class, 'destroy'])->name('media.destroy');

    Route::post('/job-vacancies', [JobVacancyController::class, 'store'])->name('job-vacancies.store');
    Route::put('/job-vacancies/{jobVacancy}', [JobVacancyController::class, 'update'])->name('job-vacancies.update');
    Route::delete('/job-vacancies/{jobVacancy}', [JobVacancyController::class, 'destroy'])->name('job-vacancies.destroy');

    Route::post('/catalogs/update', [CatalogController::class, 'update'])->name('catalogs.update');
    Route::delete('/catalogs/delete', [CatalogController::class, 'destroy'])->name('catalogs.destroy');

    Route::post('/spare-parts', [AdminSparePartController::class, 'store'])->name('spare-parts.store');
    Route::post('/spare-parts/catalog-config', [AdminSparePartController::class, 'storeCatalogConfig'])->name('spare-parts.catalog-config');
    Route::delete('/spare-parts/catalog-config/{assemblyName}', [AdminSparePartController::class, 'destroyCatalogConfig'])->name('spare-parts.catalog-config.destroy');
    Route::delete('/spare-parts/{sparePart}', [AdminSparePartController::class, 'destroy'])->name('spare-parts.destroy');
});