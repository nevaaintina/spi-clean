<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamMember;
use Illuminate\Support\Facades\File;

class TeamMemberController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'category' => 'required|string|in:management,operational',
            'linkedin' => 'nullable|string|max:255', // 👈 Validasi input linkedin (opsional/boleh kosong)
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/team');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $imagePath = 'images/team/' . $filename;
        }

        TeamMember::create([
            'name' => $request->name,
            'role' => $request->role,
            'category' => $request->category,
            'linkedin' => $request->linkedin, // 👈 Menyimpan data linkedin ke database
            'image_path' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Anggota tim berhasil ditambahkan!');
    }

    public function destroy(TeamMember $teamMember)
    {
        if ($teamMember->image_path && File::exists(public_path($teamMember->image_path))) {
            File::delete(public_path($teamMember->image_path));
        }
        $teamMember->delete();

        return redirect()->back()->with('success', 'Anggota tim berhasil dihapus.');
    }
}