import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/login', {
        username,
        password,
      });

      if (response.data.redirect) {
        window.location.href = response.data.redirect;
      }
    } catch (error) {
      setLoading(false);
      
      const msg = 
        error.response?.data?.message || 
        error.response?.data?.errors?.username?.[0] || 
        '⚠️ Maaf, username atau kata sandi yang Anda masukkan salah.';

      setErrorMessage(msg);
      setShowAlertModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans relative">
      <Head title="Admin Login - PT Servistama Pro Indonesia" />
      
      {/* ===== POP-UP PERINGATAN (MODAL ALERT) ===== */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-red-100 max-w-sm w-full p-6 text-center transform transition-all scale-100">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
              ⚠️
            </div>
            <h3 className="text-lg font-black text-[#0b2348] mb-1">Gagal Masuk</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => setShowAlertModal(false)}
              className="w-full py-3 rounded-xl bg-[#0b2348] text-white text-xs font-black hover:bg-[#ffc107] hover:text-[#0b2348] transition-all duration-300 shadow-md cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}
      {/* =========================================== */}

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-[#0b2348]">Admin Dashboard</h2>
          <p className="text-xs text-slate-500 mt-1">PT Servistama Pro Indonesia</p>
        </div>

        {/* Menggunakan autoComplete="off" pada form */}
        <form onSubmit={submit} className="space-y-5" autoComplete="off">
          {/* Input Username */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#ffc107]"
              placeholder="Masukkan username..."
              autoComplete="off"
              name="random_username_field"
              required
            />
          </div>

          {/* Input Kata Sandi */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Kata Sandi</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#ffc107]"
                placeholder="••••••••"
                autoComplete="new-password"
                name="random_password_field"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-500 hover:text-slate-700 focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-xs font-black transition-all duration-300 shadow-md ${
              loading 
                ? 'bg-slate-400 text-white cursor-not-allowed' 
                : 'bg-[#0b2348] text-white hover:bg-[#ffc107] hover:text-[#0b2348] cursor-pointer'
            }`}
          >
            {loading ? 'Memproses...' : 'Masuk Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
}