<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SparePart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class SparePartController extends Controller
{
    /**
     * Menampilkan halaman Admin Dashboard dengan membawa data spare parts dan session exploded view
     */
    public function index(Request $request)
    {
        $spareParts = SparePart::latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'spareParts'           => $spareParts,
            'explodedImagesMap'    => session('spare_part_exploded_images', []),
            'explodedPartsDataMap' => session('spare_part_exploded_parts_data', []),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category'         => 'required|string',
            'part_number'      => 'required|string|max:255',
            'name'             => 'required|string|max:255',
            'brand'            => 'nullable|string|max:255',
            'image'            => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
            'description'      => 'nullable|string',
            'delivery_time'    => 'nullable|string|max:255',
            'supply_capacity'  => 'nullable|string|max:255',
            'product_origin'   => 'nullable|string|max:255',
            'package_type'     => 'nullable|string|max:255',
            'shipping_methods' => 'nullable|string|max:255',
            'rating'           => 'nullable|string|max:255',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/spareparts');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $imagePath = 'images/spareparts/' . $filename;
        }

        $galleryPaths = [];
        if ($request->hasFile('gallery_images')) {
            $gDestination = public_path('images/spareparts/gallery');
            if (!File::exists($gDestination)) {
                File::makeDirectory($gDestination, 0755, true, true);
            }

            foreach ($request->file('gallery_images') as $gFile) {
                $gName = time() . '_' . uniqid() . '_' . preg_replace('/\s+/', '_', $gFile->getClientOriginalName());
                $gFile->move($gDestination, $gName);
                $galleryPaths[] = 'images/spareparts/gallery/' . $gName;
            }
        }

        SparePart::create([
            'category'         => $request->category,
            'part_number'      => $request->part_number,
            'name'             => $request->name,
            'brand'            => $request->brand ?? 'XCMG',
            'image'            => $imagePath,
            'gallery'          => $galleryPaths, // Menyimpan galeri foto yang nantinya digabung untuk download katalog PDF di frontend
            'description'      => $request->description,
            'delivery_time'    => $request->delivery_time ?? '1-90 DAYS',
            'supply_capacity'  => $request->supply_capacity ?? '10,000 Pieces/Year, Waiting for Your Order in Stock',
            'product_origin'   => $request->product_origin ?? 'China',
            'package_type'     => $request->package_type ?? 'Carton or Wooden Box',
            'shipping_methods' => $request->shipping_methods ?? 'Air Transport, Sea Transport, Express Delivery, Truck Transportation',
            'rating'           => $request->rating ?? '4.9 /5 based on 177 votes',
        ]);

        return redirect()->to('/admin?tab=spareparts')->with('success', 'Spare Part beserta galeri foto berhasil ditambahkan!');
    }

    /**
     * Menangani penyimpanan konfigurasi Download Katalog PDF Utama & Gambar/Data Exploded View
     */
    public function storeCatalogConfig(Request $request)
    {
        $request->validate([
            'assembly_name'  => 'required|string',
            'catalog_pdf'    => 'nullable|mimes:pdf|max:20480',
            'exploded_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
            'exploded_parts' => 'nullable|string',
        ]);

        $destinationPath = public_path('images/spareparts/config');
        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true, true);
        }

        if ($request->hasFile('catalog_pdf')) {
            $pdfFile = $request->file('catalog_pdf');
            $pdfName = 'catalog_' . time() . '.' . $pdfFile->getClientOriginalExtension();
            $pdfFile->move($destinationPath, $pdfName);
            session(['spare_part_catalog_pdf' => 'images/spareparts/config/' . $pdfName]);
        }

        if ($request->hasFile('exploded_image')) {
            $imgFile = $request->file('exploded_image');
            $imgName = 'exploded_' . preg_replace('/\s+/', '_', strtolower($request->assembly_name)) . '_' . time() . '.' . $imgFile->getClientOriginalExtension();
            $imgFile->move($destinationPath, $imgName);
            
            $explodedMap = session('spare_part_exploded_images', []);
            $explodedMap[$request->assembly_name] = 'images/spareparts/config/' . $imgName;
            session(['spare_part_exploded_images' => $explodedMap]);
        }

        if ($request->filled('exploded_parts')) {
            $partsData = json_decode($request->input('exploded_parts'), true);
            $explodedPartsMap = session('spare_part_exploded_parts_data', []);
            $explodedPartsMap[$request->assembly_name] = $partsData;
            session(['spare_part_exploded_parts_data' => $explodedPartsMap]);
        }

        // Pastikan session tersimpan permanen di request saat redirect
        session()->save();

        return redirect()->to('/admin?tab=spareparts')->with('success', 'Konfigurasi Katalog Utama & Exploded View berhasil diperbarui!');
    }

    /**
     * Menghapus konfigurasi Exploded View berdasarkan nama assembly
     */
    public function destroyCatalogConfig($assemblyName)
    {
        $decodedName = urldecode($assemblyName);

        $explodedMap = session('spare_part_exploded_images', []);
        if (isset($explodedMap[$decodedName])) {
            $imgPath = public_path($explodedMap[$decodedName]);
            if (File::exists($imgPath)) {
                File::delete($imgPath);
            }
            unset($explodedMap[$decodedName]);
            session(['spare_part_exploded_images' => $explodedMap]);
        }

        $explodedPartsMap = session('spare_part_exploded_parts_data', []);
        if (isset($explodedPartsMap[$decodedName])) {
            unset($explodedPartsMap[$decodedName]);
            session(['spare_part_exploded_parts_data' => $explodedPartsMap]);
        }

        session()->save();

        return redirect()->to('/admin?tab=spareparts')->with('success', 'Konfigurasi Exploded View berhasil dihapus!');
    }

    public function destroy(SparePart $sparePart)
    {
        if ($sparePart->image && File::exists(public_path($sparePart->image))) {
            File::delete(public_path($sparePart->image));
        }

        if (!empty($sparePart->gallery) && is_array($sparePart->gallery)) {
            foreach ($sparePart->gallery as $gal) {
                if (File::exists(public_path($gal))) {
                    File::delete(public_path($gal));
                }
            }
        }

        $sparePart->delete();

        return redirect()->to('/admin?tab=spareparts')->with('success', 'Spare Part berhasil dihapus!');
    }
}