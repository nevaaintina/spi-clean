<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HomeSetting;
use App\Models\Poster;
use Illuminate\Support\Facades\File;

class HomeSettingController extends Controller
{
    public function update(Request $request)
    {
        // 1. Validasi input form
        $request->validate([
            'youtube_url' => 'nullable|string|max:255',
            'video_file'  => 'nullable|file|mimes:mp4,mov,ogg,qt|max:101200', // Maksimal 50MB
        ]);

        // 2. Ambil data pengaturan pertama atau buat baru
        $setting = HomeSetting::firstOrNew();
        
        $setting->youtube_url = $request->youtube_url;

        // 3. Proses penyimpanan file video langsung ke folder public/videos/
        if ($request->hasFile('video_file')) {
            // Hapus file video lama dari folder public jika ada
            if ($setting->video_path && File::exists(public_path($setting->video_path))) {
                File::delete(public_path($setting->video_path));
            }

            $file = $request->file('video_file');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            
            // Tentukan folder tujuan public/videos
            $destinationPath = public_path('videos');
            
            // Buat foldernya secara otomatis jika belum ada
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            
            // Pindahkan file ke folder public/videos/
            $file->move($destinationPath, $filename);
            
            // Simpan path relatif ke database
            $setting->video_path = 'videos/' . $filename;
        }

        $setting->save();

        return redirect()->back()->with('success', 'Video Hero Banner berhasil diperbarui!');
    }

    /**
     * Menghapus file video hero banner dari folder public dan database.
     */
    public function deleteHero()
    {
        $setting = HomeSetting::first();

        if ($setting) {
            // Hapus file fisik dari folder public jika ada
            if ($setting->video_path && File::exists(public_path($setting->video_path))) {
                File::delete(public_path($setting->video_path));
            }

            // Set kolom video_path menjadi null
            $setting->video_path = null;
            $setting->save();
        }

        return redirect()->back()->with('success', 'Video Hero berhasil dihapus.');
    }

    // =========================================================================
    // FITUR KELOLA POSTER (POPUP HOMEPAGE)
    // =========================================================================

    /**
     * Menyimpan poster baru ke folder public/images/posters.
     */
    public function storePoster(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Nonaktifkan semua poster lama yang sebelumnya aktif
            Poster::where('is_active', true)->update(['is_active' => false]);

            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            
            $destinationPath = public_path('images/posters');
            
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            
            $file->move($destinationPath, $filename);

            Poster::create([
                'image_path' => 'images/posters/' . $filename,
                'is_active'  => true,
            ]);
        }

        return redirect()->back()->with('success', 'Poster berhasil diunggah!');
    }

    /**
     * Menghapus poster dari folder public dan database.
     */
    public function destroyPoster(Poster $poster)
    {
        if ($poster->image_path && File::exists(public_path($poster->image_path))) {
            File::delete(public_path($poster->image_path));
        }

        $poster->delete();

        return redirect()->back()->with('success', 'Poster berhasil dihapus.');
    }
}