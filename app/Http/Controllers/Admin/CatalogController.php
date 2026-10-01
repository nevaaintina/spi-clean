<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Setting;

class CatalogController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'type' => 'required|in:product,spare_part',
            'catalog_pdf' => 'required|mimes:pdf|max:25600',
        ], [
            'catalog_pdf.required' => 'Silakan pilih file PDF terlebih dahulu.',
            'catalog_pdf.mimes' => 'Format file harus berupa PDF.',
            'catalog_pdf.max' => 'Ukuran file PDF terlalu besar! Maksimal adalah 25 MB.',
        ]);

        $file = $request->file('catalog_pdf');
        $type = $request->type;
        $filename = $type . '_catalog_' . time() . '.pdf';
        
        $destinationPath = public_path('pdf/catalogs');
        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true, true);
        }

        $settingKey = $type . '_catalog_pdf';
        $oldSetting = Setting::where('key', $settingKey)->first();
        
        if ($oldSetting && $oldSetting->value && File::exists(public_path($oldSetting->value))) {
            File::delete(public_path($oldSetting->value));
        }

        $file->move($destinationPath, $filename);
        $relativePath = 'pdf/catalogs/' . $filename;

        Setting::updateOrCreate(
            ['key' => $settingKey],
            ['value' => $relativePath]
        );

        $labelName = $type === 'product' ? 'Katalog Produk' : 'Katalog Spare Part';

        return redirect()->back()->with('success', $labelName . ' berhasil diperbarui dan disimpan secara permanen!');
    }

    // Method untuk menghapus file katalog utama
    public function destroy(Request $request)
    {
        $request->validate([
            'type' => 'required|in:product,spare_part',
        ]);

        $type = $request->type;
        $settingKey = $type . '_catalog_pdf';
        
        $setting = Setting::where('key', $settingKey)->first();

        if ($setting && $setting->value) {
            if (File::exists(public_path($setting->value))) {
                File::delete(public_path($setting->value));
            }
            $setting->delete();
        }

        $labelName = $type === 'product' ? 'Katalog Produk' : 'Katalog Spare Part';

        return redirect()->back()->with('success', $labelName . ' berhasil dihapus.');
    }
}