<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Menampilkan halaman login (Inertia React).
     */
    public function create()
    {
        return Inertia::render('Admin/Login');
    }

    /**
     * Memproses data percobaan login admin menggunakan username.
     */
    public function store(Request $request)
    {
        // Validasi input form
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required'],
        ]);

        // Proses autentikasi via Laravel Auth
        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect()->intended('/admin/dashboard');
        }

        // Jika gagal, kembalikan dengan pesan error
        return back()->withErrors([
            'username' => 'Username atau kata sandi yang Anda masukkan salah.',
        ])->onlyInput('username');
    }

    /**
     * Memberitahu Laravel agar menggunakan kolom 'username' alih-alih 'email'.
     */
    public function username()
    {
        return 'username';
    }

    /**
     * Menangani proses keluar (logout) admin.
     */
    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}