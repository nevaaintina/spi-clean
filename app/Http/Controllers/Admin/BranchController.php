<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Branch;

class BranchController extends Controller
{
    /**
     * Menyimpan data cabang/area operasional baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'city'        => 'required|string|max:100',
            'phone'       => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'maps_link'   => 'nullable|string|max:500',
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
        ]);

        Branch::create($validated);

        return redirect()->back()->with('success', 'Cabang / Area Operasional berhasil ditambahkan!');
    }

    /**
     * Memperbarui data cabang/area operasional.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'city'        => 'required|string|max:100',
            'phone'       => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'maps_link'   => 'nullable|string|max:500',
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
        ]);

        $branch = Branch::findOrFail($id);
        $branch->update($validated);

        return redirect()->back()->with('success', 'Cabang berhasil diperbarui!');
    }

    /**
     * Menghapus data cabang/area operasional.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();
        return redirect()->back()->with('success', 'Cabang berhasil dihapus.');
    }
}