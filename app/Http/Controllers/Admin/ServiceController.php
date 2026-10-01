<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function index()
    {
        $categories = Service::select('category', DB::raw('count(*) as total'))
            ->groupBy('category')
            ->get();

        return Inertia::render('Services/Index', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'what_we_do' => 'nullable|string',
            'key_benefits' => 'nullable|string',
        ]);

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

    // 👇 TAMBAHKAN METHOD UPDATE INI UNTUK FITUR EDIT
    public function update(Request $request, Service $service)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'what_we_do' => 'nullable',
            'key_benefits' => 'nullable',
        ]);

        // Tangani jika datanya dikirim berupa string textarea atau sudah berbentuk array
        $whatWeDoArray = is_array($request->what_we_do) 
            ? $request->what_we_do 
            : ($request->what_we_do ? array_filter(explode("\n", str_replace("\r", "", $request->what_we_do))) : []);

        $keyBenefitsArray = is_array($request->key_benefits) 
            ? $request->key_benefits 
            : ($request->key_benefits ? array_filter(explode("\n", str_replace("\r", "", $request->key_benefits))) : []);

        $service->update([
            'category' => $request->category,
            'title' => $request->title,
            'description' => $request->description,
            'what_we_do' => $whatWeDoArray,
            'key_benefits' => $keyBenefitsArray,
        ]);

        return redirect()->back()->with('success', 'Sub-layanan berhasil diperbarui!');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->back()->with('success', 'Sub-layanan berhasil dihapus.');
    }
}