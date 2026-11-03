<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Milestone;
use Illuminate\Support\Facades\File;

class MilestoneController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/milestones');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $imagePath = 'images/milestones/' . $filename;
        }

        Milestone::create([
            'year' => $request->year,
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Milestone berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'year' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $milestone = Milestone::findOrFail($id);
        $imagePath = $milestone->image_path;

        // 1. Opsi jika centang hapus foto lama
        if ($request->boolean('remove_image')) {
            if ($imagePath && File::exists(public_path($imagePath))) {
                File::delete(public_path($imagePath));
            }
            $imagePath = null;
        }

        // 2. Jika mengunggah file gambar baru
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($milestone->image_path && File::exists(public_path($milestone->image_path))) {
                File::delete(public_path($milestone->image_path));
            }

            // Simpan gambar baru
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/milestones');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $imagePath = 'images/milestones/' . $filename;
        }

        $milestone->update([
            'year' => $request->year,
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Milestone berhasil diperbarui!');
    }

    public function destroy(Milestone $milestone)
    {
        if ($milestone->image_path && File::exists(public_path($milestone->image_path))) {
            File::delete(public_path($milestone->image_path));
        }
        $milestone->delete();

        return redirect()->back()->with('success', 'Milestone berhasil dihapus.');
    }
}