import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function ShowFeatured() {
  // Data Statis Layanan Unggulan (Menyerupai data asli dari database)
  const service = {
    title: "Heavy Equipment Maintenance & Overhaul",
    description: "Layanan pemeliharaan menyeluruh dan overhaul komponen alat berat XCMG untuk memastikan performa mesin selalu optimal, tangguh, dan dapat diandalkan di setiap medan proyek pertambangan maupun konstruksi.",
    content: `
      <p>PT Servistama Pro Indonesia menyediakan solusi perawatan preventif dan korektif komprehensif yang dikerjakan oleh tim mekanik berpengalaman dan tersertifikasi.</p>
      <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F2B5C; margin-top: 1.25rem; margin-bottom: 0.5rem;">Standar Kualitas Tertinggi</h3>
      <p>Kami menggunakan suku cadang original (genuine parts) serta prosedur uji diagnostik berstandar global guna meminimalkan risiko downtime serta memperpanjang masa pakai unit alat berat Anda.</p>
    `,
    image_path: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"
    ]
  };

  // Fungsi untuk kembali ke home dan langsung scroll ke section featured services
  const handleBackToFeatured = (e) => {
    e.preventDefault();
    router.visit('/', {
      onFinish: () => {
        const section = document.getElementById('featured-services');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Head title={`${service.title} - PT Servistama Pro Indonesia`} />
      <Navbar />

      <main className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Tombol Kembali ke Layanan Unggulan di Beranda */}
          <button
            onClick={handleBackToFeatured}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0F2B5C] mb-8 transition cursor-pointer bg-transparent border-none p-0"
          >
            <span>←</span> Kembali ke Layanan Unggulan
          </button>

          {/* Header Informasi */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFC107] bg-amber-50 px-3 py-1 rounded-md">
              Layanan Unggulan
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0F2B5C] mt-4 mb-6">
              {service.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
              {service.description}
            </p>
            {service.content && (
              <div 
                className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-6 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            )}
          </div>

          {/* Galeri Beberapa Foto */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#0F2B5C]">Galeri & Dokumentasi Kegiatan</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tampilkan foto utama card terlebih dahulu */}
              {service.image_path && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm h-64">
                  <img
                    src={service.image_path}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              {/* Tampilkan foto-foto tambahan dari galeri */}
              {service.photos.map((photo, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm h-64">
                  <img
                    src={photo}
                    alt={`Dokumentasi ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}