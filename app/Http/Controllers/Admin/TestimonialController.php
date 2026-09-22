<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'role'     => 'required|string|max:255',
            'category' => 'required|in:customer,employee,intern',
            'quote'    => 'required|string',
            'image'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $file->move(public_path('testimonials'), $filename);
            $imagePath = 'testimonials/' . $filename;
        }

        Testimonial::create([
            'name'       => $request->input('name'),
            'role'       => $request->input('role'),
            'category'   => $request->input('category'),
            'quote'      => $request->input('quote'),
            'image_path' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Testimoni berhasil ditambahkan!');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image_path && file_exists(public_path($testimonial->image_path))) {
            @unlink(public_path($testimonial->image_path));
        }

        $testimonial->delete();

        return redirect()->back()->with('success', 'Testimoni berhasil dihapus!');
    }
}