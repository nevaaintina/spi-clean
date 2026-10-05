<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function create()
    {
        // Jika user sudah terlanjur login, paksa logout dulu 
        // agar saat membuka halaman login, sesinya bersih total
        if (Auth::check()) {
            Auth::logout();
            request()->session()->invalidate();
            request()->session()->regenerateToken();
        }

        return Inertia::render('Admin/Login');
    }

    public function store(Request $request)
    {
        // 1. Validasi input form
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required'],
        ]);

        // 2. Cari user berdasarkan username di database
        $user = \App\Models\User::where('username', $request->username)->first();

        // 3. CEK KETAT: Jika username tidak ada ATAU password tidak cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => '⚠️ Maaf, username atau kata sandi yang Anda masukkan salah.'
            ], 422); // Status 422 agar ditangkap oleh blok catch di frontend
        }

        // 4. Jika benar, lakukan login session
        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        // 5. Kembalikan URL tujuan redirect untuk frontend
        return response()->json([
            'redirect' => url('/admin')
        ]);
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        // Mendukung respons JSON atau redirect biasa agar aman dari error Inertia/Axios
        if ($request->wantsJson()) {
            return response()->json(['redirect' => url('/login')]);
        }

        return redirect('/login');
    }
}