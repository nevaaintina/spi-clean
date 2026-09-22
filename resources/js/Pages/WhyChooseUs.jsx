import React from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function WhyChooseUsPage() {
  const advantages = [
    {
      title: "Authorized XCMG Service Partner",
      desc: "Mitra resmi XCMG dengan standar layanan terpercaya.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Certified Engineers",
      desc: "Teknisi bersertifikat dengan keahlian dan kompetensi yang terjamin.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Genuine Spare Parts",
      desc: "Suku cadang asli XCMG dengan kualitas terbaik dan terjamin keasliannya.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Warranty Specialist",
      desc: "Garansi resmi dan penanganan klaim yang cepat dan tepat.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Fast Response Service",
      desc: "Respon cepat untuk meminimalkan downtime dan menjaga produktivitas.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Nationwide Service Coverage",
      desc: "Jangkauan layanan luas di seluruh wilayah Indonesia.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Experienced Technical Team",
      desc: "Tim berpengalaman yang siap memberikan solusi terbaik.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Digital Service Report",
      desc: "Laporan servis digital yang akurat, transparan, dan mudah diakses kapan saja.",
      icon: (
        <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: "24 Hours Emergency Support",
      desc: "Dukungan darurat 24 jam siap membantu kapan pun.",
      icon: (
        <span className="text-[#0f2b5c] font-black text-sm tracking-tighter">24</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">
      <Head title="Why Choose Us - PT. Servistama Pro Indonesia" />
      
      {/* 1. NAVBAR DI ATAS */}
      <Navbar />

      {/* 2. SECTION WHY CHOOSE US */}
      <section className="relative w-full bg-white text-slate-800 py-24 overflow-hidden border-b border-slate-200">
        
        {/* DEKORASI SUDUT KANAN ATAS (WARNA BIRU KORPORAT & POLA TITIK) */}
        <div className="absolute top-0 right-0 w-[420px] h-[350px] bg-gradient-to-bl from-[#0f2b5c] via-[#0b2248] to-[#071935] rounded-bl-[120px] pointer-events-none hidden lg:block overflow-hidden">
          <div className="absolute right-8 top-12 grid grid-cols-4 gap-3 opacity-30">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
            ))}
          </div>
        </div>

        {/* GAMBAR ALAT BERAT DI ATAS KANAN */}
        <div className="absolute top-0 right-0 w-full lg:w-[48%] h-[320px] pointer-events-none overflow-hidden hidden lg:block">
          <img
            src="/images/choose.jpg"
            alt="Heavy Equipment"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          {/* HEADER SECTION (KIRI) */}
          <div className="max-w-xl mb-16">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-[11px] font-bold tracking-widest text-[#0f2b5c] uppercase">
                WHY CHOOSE US
              </span>
              <span className="w-12 h-[1.5px] bg-[#ffc107]"></span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight mb-3">
              Why Choose Us
            </h2>

            <p className="text-slate-600 text-xs md:text-sm font-semibold mb-3">
              Menampilkan keunggulan perusahaan.
            </p>

            <div className="w-12 h-1 bg-[#ffc107] rounded-full mb-4"></div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Kami berkomitmen memberikan layanan terbaik dengan standar tinggi, didukung oleh tim profesional, teknologi modern, dan jangkauan layanan yang luas.
            </p>
          </div>

          {/* GRID 3x3 (9 CARD PERTAMA) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {advantages.map((item, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#ffc107] transition-all duration-300 flex items-start gap-4"
              >
                {/* Kotak Ikon Biru Korporat di Kiri */}
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/80 flex items-center justify-center shrink-0 group-hover:bg-[#ffc107] group-hover:border-[#ffc107] transition-colors [&>svg]:group-hover:text-[#0f2b5c]">
                  {item.icon}
                </div>

                {/* Teks di Kanan */}
                <div>
                  <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CARD KE-10 (MELEBAR FULL DI BAWAH) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#ffc107] transition-all duration-300 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/80 flex items-center justify-center shrink-0 hover:bg-[#ffc107] transition-colors [&>svg]:hover:text-[#0f2b5c]">
              <svg className="w-6 h-6 text-[#0f2b5c]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-1">
                Modern Workshop Facility
              </h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Fasilitas bengkel modern dengan peralatan lengkap dan teknologi terkini untuk hasil layanan terbaik.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FOOTER DI BAWAH */}
      <Footer />

    </div>
  );
}