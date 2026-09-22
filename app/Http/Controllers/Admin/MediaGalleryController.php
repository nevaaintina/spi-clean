<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class MediaGalleryController extends Controller
{
    /**
     * Menyimpan media baru (foto/video) ke database dan folder penyimpanan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'required|string',
            'media_type'   => 'required|string',
            'file'         => 'required|file|mimes:jpg,jpeg,png,webp,mp4,mov,avi|max:51200', // Maksimal 50MB
            'description'  => 'nullable|string',
        ]);

        $filePath = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            
            // Simpan ke folder public/media
            $file->move(public_path('media'), $filename);
            $filePath = 'media/' . $filename;
        }

        MediaGallery::create([
            'title'        => $request->input('title'),
            'category'     => $request->input('category'),
            'media_type'   => $request->input('media_type'),
            'file_path'    => $filePath,
            'description'  => $request->input('description'),
        ]);

        return redirect()->back()->with('success', 'Media berhasil diunggah ke galeri!');
    }

    /**
     * Menghapus media dari database dan file fisiknya.
     */
    public function destroy(MediaGallery $media)
    {
        // Hapus file fisik jika ada
        if ($media->file_path && file_exists(public_path($media->file_path))) {
            @unlink(public_path($media->file_path));
        }

        $media->delete();

        return redirect()->back()->with('success', 'Media berhasil dihapus!');
    }
}