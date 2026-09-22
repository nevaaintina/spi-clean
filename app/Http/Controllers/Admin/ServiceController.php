<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'what_we_do' => 'nullable|string',
            'key_benefits' => 'nullable|string',
        ]);

        // Mengubah input textarea (per baris / enter) menjadi array agar rapi disimpan
        $whatWeDoArray = $request->what_we_do ? array_filter(explode("\n", str_replace("\r", "", $request->what_we_do))) : [];
        $keyBenefitsArray = $request->key_benefits ? array_filter(explode("\n", str_replace("\r", "", $request->key_benefits))) : [];

        Service::create([
            'category' => $request->category,
            'title' => $request->title,
            'description' => $request->description,
            'what_we_do' => $whatWeDoArray,
            'key_benefits' => $keyBenefitsArray,
        ]);

        return redirect()->back()->with('success', 'Sub-layanan berhasil ditambahkan!');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->back()->with('success', 'Sub-layanan berhasil dihapus.');
    }
}