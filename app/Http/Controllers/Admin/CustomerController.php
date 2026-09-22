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
            'address' => 'nullable|string', // 👈 Ditambahkan validasi untuk alamat / maps
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10048',
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
            'address' => $request->address, // 👈 Disimpan ke database
            'logo_path' => $logoPath,
        ]);

        return redirect()->back()->with('success', 'Pelanggan berhasil ditambahkan!');
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