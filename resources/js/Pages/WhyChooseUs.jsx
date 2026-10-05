import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head, Link } from "@inertiajs/react";

export default function WhyChooseUsPage() {
  // 4 Pilar Utama (Mengikuti layout Gambar 2)
  const corePillars = [
    {
      title: "Authorized Partner",
      desc: "Mitra resmi XCMG di Indonesia dengan standar mutu layanan servis internasional dan jaminan keaslian unit.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F2B5C] group-hover:text-[#FFC107] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Certified Mechanics",
      desc: "Didukung mekanik berpengalaman dan tersertifikasi resmi dalam penanganan alat berat pertambangan dan konstruksi.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F2B5C] group-hover:text-[#FFC107] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v2a1 1 0 01-1 1h-1a2 2 0 00-2 2v2a2 2 0 002 2h1a1 1 0 011 1v2a1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1v-2a1 1 0 011-1h1a2 2 0 002-2v-2a2 2 0 00-2-2H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
    {
      title: "Genuine Parts",
      desc: "Ketersediaan suku cadang asli OEM XCMG dengan garansi resmi untuk memaksimalkan umur pakai dan performa unit.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F2B5C] group-hover:text-[#FFC107] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Safety & Reliability",
      desc: "Penerapan standar K3, CSMS, serta kesiapan layanan darurat 24 jam untuk meminimalkan downtime operasional Anda.",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F2B5C] group-hover:text-[#FFC107] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Head title="Why Choose Us - PT. Servistama Pro Indonesia" />

      {/* 1. NAVBAR */}
      <Navbar />

      <main>
        {/* =========================================================
            HERO SECTION (FULL SATU LAYAR / FULL SCREEN VIEWPORT)
        ========================================================= */}
        <section className="relative h-screen min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#071A35] pt-16 sm:pt-20 pb-6 sm:pb-12">
          {/* Background Image Alat Berat */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-why.png"
              alt="Heavy Equipment Operations"
              className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-100"
            />
            {/* Overlay gradien halus & terang */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A35]/75 via-[#071A35]/30 to-black/25" />
          </div>

          {/* Konten Hero Tengah */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 flex-1 flex flex-col justify-center my-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#FFC107] uppercase mb-2 sm:mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                AUTHORIZED XCMG PARTNER
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-3 sm:mb-5 drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
                PT Servistama Pro Indonesia
              </h1>
              <p className="text-xs sm:text-base sm:text-lg text-white font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                Solusi terpadu servis, perawatan prediktif, suku cadang resmi, serta dukungan teknis alat berat untuk memaksimalkan uptime proyek pertambangan dan konstruksi di seluruh Indonesia.
              </p>
            </div>
          </div>

          {/* 3 Value Bar di Bagian Bawah Hero */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 border-t border-white/20 backdrop-blur-[2px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 text-white">
              <div className="md:pr-6 border-b md:border-b-0 md:border-r border-white/20 pb-2.5 sm:pb-3 md:pb-0">
                <p className="text-[11px] sm:text-xs sm:text-sm text-slate-100 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                  <strong className="text-white font-bold block sm:inline">Reliable — </strong>
                  Mitra servis nomor satu dengan komitmen respons cepat dan penanganan presisi sesuai standar pabrikan.
                </p>
              </div>

              <div className="md:px-6 border-b md:border-b-0 md:border-r border-white/20 pb-2.5 sm:pb-3 md:pb-0">
                <p className="text-[11px] sm:text-xs sm:text-sm text-slate-100 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                  <strong className="text-white font-bold block sm:inline">Experienced — </strong>
                  Dipercaya oleh berbagai industri pertambangan dan kontraktor nasional terkemuka di tanah air.
                </p>
              </div>

              <div className="md:pl-6">
                <p className="text-[11px] sm:text-xs sm:text-sm text-slate-100 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                  <strong className="text-white font-bold block sm:inline">Competitive — </strong>
                  Ketersediaan suku cadang OEM melimpah serta layanan efisien guna menghasilkan total cost of ownership terbaik.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY CHOOSE US MAIN SECTION
        ========================================================= */}
        <section className="py-12 sm:py-20 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            {/* Header Tengah & Paragraf Narasi */}
            <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0F2B5C] tracking-tight mb-4 sm:mb-6">
                Why choose us
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 font-normal">
                Memiliki komitmen penuh sebagai mitra servis resmi alat berat XCMG di Indonesia, PT Servistama Pro Indonesia menyediakan solusi menyeluruh mulai dari perawatan berkala, inspeksi unit berkala, perbaikan komponen hidrolik dan transmisi, hingga penyediaan suku cadang orisinal. Layanan kami dirancang khusus agar Anda dapat berfokus sepenuhnya pada ekspansi bisnis dan capaian produksi harian, sementara kami menjaga kesiapan dan performa armada alat berat Anda di lapangan.
              </p>

              {/* Sub-judul "How we conduct business" dengan garis bawah */}
              <div className="inline-flex flex-col items-center">
                <h3 className="text-sm sm:text-base sm:text-lg font-bold text-[#0F2B5C] tracking-tight">
                  How we conduct business
                </h3>
                <span className="mt-1.5 sm:mt-2 w-12 sm:w-16 h-[2px] bg-[#FFC107]" />
              </div>
            </div>

            {/* 4 Pilar Utama Berjajar Sesuai Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-8 pt-2 sm:pt-4">
              {corePillars.map((item, index) => (
                <div key={index} className="group flex flex-col items-center text-center">
                  <div className="mb-3.5 sm:mb-5 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-[#0F2B5C] transition-all duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-sm sm:text-lg font-extrabold text-[#0F2B5C] mb-1.5 sm:mb-2.5 tracking-tight group-hover:text-[#0F2B5C]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Banner Kontak / Call-To-Action */}
            <div className="mt-12 sm:mt-20 rounded-2xl bg-[#0F2B5C] p-6 sm:p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl">
              <div>
                <h4 className="text-lg sm:text-xl sm:text-2xl font-black mb-1.5 sm:mb-2">
                  Siap Mengoptimalkan Kesiapan Alat Berat Anda?
                </h4>
                <p className="text-slate-300 text-[11px] sm:text-xs sm:text-sm max-w-xl">
                  Hubungi tim teknis PT Servistama Pro Indonesia untuk survei lapangan, konsultasi servis berkala, atau penawaran suku cadang resmi.
                </p>
              </div>
              <Link
                href="/contact-us"
                className="w-full md:w-auto text-center inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#FFC107] px-6 py-3.5 text-xs font-extrabold text-[#0F2B5C] transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg cursor-pointer"
              >
                Hubungi Kami Sekarang
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}