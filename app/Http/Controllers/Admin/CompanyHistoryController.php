<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyHistory;
use Illuminate\Http\Request;

class CompanyHistoryController extends Controller
{
    /**
     * Menyimpan data company history baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'year'        => 'required|string|max:255',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        CompanyHistory::create([
            'year'        => $request->year,
            'title'       => $request->title,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Company history berhasil ditambahkan.');
    }

    /**
     * Memperbarui data company history di database.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'year'        => 'required|string|max:255',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $companyHistory = CompanyHistory::findOrFail($id);

        $companyHistory->update([
            'year'        => $request->year,
            'title'       => $request->title,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Company history berhasil diperbarui.');
    }

    /**
     * Menghapus data company history dari database.
     */
    public function destroy(CompanyHistory $companyHistory)
    {
        $companyHistory->delete();

        return redirect()->back()->with('success', 'Company history berhasil dihapus.');
    }
}