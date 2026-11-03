<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\File;

class CustomerController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:8048',
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/customers');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $logoPath = 'images/customers/' . $filename;
        }

        Customer::create([
            'name' => $request->name,
            'region' => $request->region,
            'description' => $request->description,
            'address' => $request->address,
            'logo_path' => $logoPath,
        ]);

        return redirect()->back()->with('success', 'Pelanggan berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:8048',
        ]);

        $customer = Customer::findOrFail($id);
        $logoPath = $customer->logo_path;

        // 1. Opsi hapus logo jika dicentang dari frontend
        if ($request->boolean('remove_logo')) {
            if ($logoPath && File::exists(public_path($logoPath))) {
                File::delete(public_path($logoPath));
            }
            $logoPath = null;
        }

        // 2. Jika mengunggah file logo baru
        if ($request->hasFile('logo')) {
            // Hapus logo lama jika ada
            if ($customer->logo_path && File::exists(public_path($customer->logo_path))) {
                File::delete(public_path($customer->logo_path));
            }

            // Simpan logo baru ke direktori public/images/customers
            $file = $request->file('logo');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            $destinationPath = public_path('images/customers');
            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true, true);
            }
            $file->move($destinationPath, $filename);
            $logoPath = 'images/customers/' . $filename;
        }

        // Update data pelanggan di database
        $customer->update([
            'name' => $request->name,
            'region' => $request->region,
            'description' => $request->description,
            'address' => $request->address,
            'logo_path' => $logoPath,
        ]);

        return redirect()->back()->with('success', 'Pelanggan berhasil diperbarui!');
    }

    public function destroy(Customer $customer)
    {
        if ($customer->logo_path && File::exists(public_path($customer->logo_path))) {
            File::delete(public_path($customer->logo_path));
        }
        $customer->delete();

        return redirect()->back()->with('success', 'Pelanggan berhasil dihapus.');
    }
}