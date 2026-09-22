<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Branch;

class BranchController extends Controller
{
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

    public function destroy(Branch $branch)
    {
        $branch->delete();
        return redirect()->back()->with('success', 'Cabang berhasil dihapus.');
    }
}