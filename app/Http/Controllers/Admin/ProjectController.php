<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\File;

class ProjectController extends Controller
{
    /**
     * Menyimpan data proyek baru beserta upload foto ke folder public/images/projects.
     */
    public function store(Request $request)
    {
        // 1. Validasi input dari form admin
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'location'    => 'required|string|max:255',
            'year'        => 'required|string|max:10',
            'image'       => 'required|image|mimes:jpeg,png,jpg,webp|max:50240',
            'description' => 'nullable|string',
        ]);

        // 2. Proses upload file fisik ke folder public/images/projects
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            
            // Tentukan folder tujuan absolut di dalam folder public Laravel
            $destinationPath = public_path('images/projects');
            
            // Buat foldernya secara otomatis jika belum ada
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            
            // Pindahkan file gambar ke direktori tujuan
            $file->move($destinationPath, $filename);
            
            // Simpan path relatif ke database
            $validated['image'] = 'images/projects/' . $filename;
        }

        // 3. Simpan data ke database
        Project::create($validated);

        // 4. Redirect kembali dengan pesan sukses agar Inertia me-reload props data proyek
        return redirect()->back()->with('success', 'Proyek baru berhasil ditambahkan!');
    }

    /**
     * Menghapus data proyek dan file gambarnya dari folder public.
     */
    public function destroy(Project $project)
    {
        // Hapus file fisik jika ada di dalam folder public
        if ($project->image) {
            $filePath = public_path($project->image);
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
        }

        // Hapus data dari database
        $project->delete();

        return redirect()->back()->with('success', 'Proyek berhasil dihapus.');
    }
}