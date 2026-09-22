<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048', // Maksimal ~10MB
            'brochure' => 'nullable|mimes:pdf|max:15120', // Maksimal ~15MB
            'video_file' => 'nullable|mimes:mp4,mov,ogg,webm|max:51200', // Maksimal ~50MB
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048', // Validasi tiap foto galeri
        ], [
            'image.image' => 'File untuk foto utama harus berupa gambar (jpeg, png, jpg, webp).',
            'image.mimes' => 'Format foto utama harus berjenis jpeg, png, jpg, atau webp.',
            'image.max' => 'Ukuran foto utama terlalu besar! Maksimal ukuran file adalah 10 MB.',
            'brochure.mimes' => 'File brosur harus berformat PDF.',
            'brochure.max' => 'Ukuran file brosur PDF terlalu besar! Maksimal ukuran file adalah 15 MB.',
            'video_file.mimes' => 'Format file video harus berupa mp4, mov, ogg, atau webm.',
            'video_file.max' => 'Ukuran file video terlalu besar! Maksimal ukuran file adalah 50 MB.',
            'gallery_images.*.image' => 'Setiap file galeri tambahan harus berupa gambar.',
            'gallery_images.*.mimes' => 'Format galeri foto harus jpeg, png, jpg, atau webp.',
        ]);

        // Menyimpan gambar utama langsung ke folder public/images/products
        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            
            $destinationPath = public_path('images/products');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }

            $file->move($destinationPath, $filename);
            $imagePath = 'images/products/' . $filename;
        }

        // Menyimpan file brosur PDF langsung ke folder public/brochures/products
        $brochurePath = null;
        if ($request->hasFile('brochure')) {
            $pdfFile = $request->file('brochure');
            $pdfName = 'brochure_' . time() . '_' . preg_replace('/\s+/', '_', $pdfFile->getClientOriginalName());
            
            $pdfDestination = public_path('brochures/products');
            if (!File::exists($pdfDestination)) {
                File::makeDirectory($pdfDestination, 0755, true, true);
            }

            $pdfFile->move($pdfDestination, $pdfName);
            $brochurePath = 'brochures/products/' . $pdfName;
        }

        // Menyimpan file video langsung ke folder public/videos/products
        $videoPath = null;
        if ($request->hasFile('video_file')) {
            $vidFile = $request->file('video_file');
            $vidName = time() . '_' . preg_replace('/\s+/', '_', $vidFile->getClientOriginalName());
            
            $vidDestination = public_path('videos/products');
            if (!File::exists($vidDestination)) {
                File::makeDirectory($vidDestination, 0755, true, true);
            }

            $vidFile->move($vidDestination, $vidName);
            $videoPath = 'videos/products/' . $vidName;
        }

        // Menyimpan galeri foto tambahan (Multi-upload) ke folder public/images/products/gallery
        $galleryPaths = [];
        if ($request->hasFile('gallery_images')) {
            $gDestination = public_path('images/products/gallery');
            if (!File::exists($gDestination)) {
                File::makeDirectory($gDestination, 0755, true, true);
            }

            foreach ($request->file('gallery_images') as $gFile) {
                $gName = time() . '_' . uniqid() . '_' . preg_replace('/\s+/', '_', $gFile->getClientOriginalName());
                $gFile->move($gDestination, $gName);
                $galleryPaths[] = 'images/products/gallery/' . $gName;
            }
        }

        // Menangani spesifikasi dan fitur
        $specifications = $request->specifications;
        if (is_string($specifications)) {
            $specifications = json_decode($specifications, true);
        }

        $features = $request->features;
        if (is_string($features)) {
            $features = json_decode($features, true);
        }

        Product::create([
            'category' => $request->category,
            'name' => $request->name,
            'image' => $imagePath,
            'brochure' => $brochurePath, // Menyimpan path file fisik PDF
            'video_path' => $videoPath,
            'gallery' => $galleryPaths,
            'overview' => $request->overview,
            'description' => $request->description,
            'specifications' => $specifications,
            'features' => $features,
        ]);

        return redirect()->to('/admin?tab=products')->with('success', 'Produk beserta brosur berhasil ditambahkan!');
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category' => 'required|string',
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
            'brochure' => 'nullable|mimes:pdf|max:15120',
            'video_file' => 'nullable|mimes:mp4,mov,ogg,webm|max:51200',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
        ]);

        // Update gambar utama jika ada file baru yang diunggah
        $imagePath = $product->image;
        if ($request->hasFile('image')) {
            if ($product->image && File::exists(public_path($product->image))) {
                File::delete(public_path($product->image));
            }
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/products');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $imagePath = 'images/products/' . $filename;
        }

        // Update brosur PDF jika ada file baru yang diunggah
        $brochurePath = $product->brochure;
        if ($request->hasFile('brochure')) {
            if ($product->brochure && File::exists(public_path($product->brochure))) {
                File::delete(public_path($product->brochure));
            }
            $pdfFile = $request->file('brochure');
            $pdfName = 'brochure_' . time() . '_' . preg_replace('/\s+/', '_', $pdfFile->getClientOriginalName());
            $pdfDestination = public_path('brochures/products');
            if (!File::exists($pdfDestination)) {
                File::makeDirectory($pdfDestination, 0755, true, true);
            }
            $pdfFile->move($pdfDestination, $pdfName);
            $brochurePath = 'brochures/products/' . $pdfName;
        }

        // Update video jika ada file baru yang diunggah
        $videoPath = $product->video_path;
        if ($request->hasFile('video_file')) {
            if ($product->video_path && File::exists(public_path($product->video_path))) {
                File::delete(public_path($product->video_path));
            }
            $vidFile = $request->file('video_file');
            $vidName = time() . '_' . preg_replace('/\s+/', '_', $vidFile->getClientOriginalName());
            $vidDestination = public_path('videos/products');
            if (!File::exists($vidDestination)) {
                File::makeDirectory($vidDestination, 0755, true, true);
            }
            $vidFile->move($vidDestination, $vidName);
            $videoPath = 'videos/products/' . $vidName;
        }

        // Update galeri foto tambahan jika ada file baru yang diunggah
        $galleryPaths = $product->gallery ?? [];
        if ($request->hasFile('gallery_images')) {
            if (!empty($product->gallery) && is_array($product->gallery)) {
                foreach ($product->gallery as $oldGallery) {
                    if (File::exists(public_path($oldGallery))) {
                        File::delete(public_path($oldGallery));
                    }
                }
            }

            $galleryPaths = [];
            $gDestination = public_path('images/products/gallery');
            if (!File::exists($gDestination)) {
                File::makeDirectory($gDestination, 0755, true, true);
            }

            foreach ($request->file('gallery_images') as $gFile) {
                $gName = time() . '_' . uniqid() . '_' . preg_replace('/\s+/', '_', $gFile->getClientOriginalName());
                $gFile->move($gDestination, $gName);
                $galleryPaths[] = 'images/products/gallery/' . $gName;
            }
        }

        $specifications = $request->specifications;
        if (is_string($specifications)) {
            $specifications = json_decode($specifications, true);
        }

        $features = $request->features;
        if (is_string($features)) {
            $features = json_decode($features, true);
        }

        $product->update([
            'category' => $request->category,
            'name' => $request->name,
            'image' => $imagePath,
            'brochure' => $brochurePath,
            'video_path' => $videoPath,
            'gallery' => $galleryPaths,
            'overview' => $request->overview,
            'description' => $request->description,
            'specifications' => $specifications,
            'features' => $features,
        ]);

        return redirect()->to('/admin?tab=products')->with('success', 'Produk berhasil diperbarui!');
    }

    public function destroy(Product $product)
    {
        // Hapus file gambar utama
        if ($product->image && File::exists(public_path($product->image))) {
            File::delete(public_path($product->image));
        }

        // Hapus file brosur PDF fisik
        if ($product->brochure && File::exists(public_path($product->brochure))) {
            File::delete(public_path($product->brochure));
        }

        // Hapus file video
        if ($product->video_path && File::exists(public_path($product->video_path))) {
            File::delete(public_path($product->video_path));
        }

        // Hapus semua file fisik galeri foto tambahan
        if (!empty($product->gallery) && is_array($product->gallery)) {
            foreach ($product->gallery as $galleryImg) {
                if (File::exists(public_path($galleryImg))) {
                    File::delete(public_path($galleryImg));
                }
            }
        }
        
        $product->delete();

        return redirect()->to('/admin?tab=products')->with('success', 'Produk berhasil dihapus!');
    }
}