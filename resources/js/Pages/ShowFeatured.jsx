import React from "react";
import { Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { ArrowLeft } from "lucide-react";

export default function ShowFeatured() {
  // 1. Kamus Data untuk Masing-masing Card Layanan Unggulan
  const servicesMap = {
    "pelatihan-operator": {
      title: "Pelatihan Operator",
      description: "Kami memberikan pelatihan khusus kepada operator Anda untuk unit XCMG pertambangan dan konstruksi guna memastikan pengoperasian alat berat yang aman, efisien dan berstandar operasional tinggi.",
      content: `
        <p>PT Servistama Pro Indonesia menyediakan program pelatihan intensif bagi operator alat berat di lapangan. Program ini dirancang langsung oleh instruktur berpengalaman untuk meningkatkan keahlian teknis serta pemahaman mendalam mengenai unit XCMG.</p>
        <p>Dengan pelatihan yang tepat, perusahaan Anda dapat menekan risiko kecelakaan kerja, mengoptimalkan produktivitas unit, serta mengurangi tingkat keausan mesin akibat kesalahan operasional.</p>
      `,
      image_path: "/images/featured-service1.jpg",
      photos: [
        "/images/pelatihan-operator1.jpg",
        "/images/pelatihan-operator2.jpg"
      ]
    },
    "layanan-maintenance": {
      title: "Heavy Equipment Maintenance & Overhaul",
      description: "Layanan pemeliharaan menyeluruh dan overhaul komponen alat berat XCMG untuk memastikan performa mesin selalu optimal, tangguh dan dapat diandalkan di setiap medan proyek pertambangan maupun konstruksi.",
      content: `
        <p>PT Servistama Pro Indonesia menyediakan solusi perawatan preventif dan korektif komprehensif yang dikerjakan oleh tim mekanik berpengalaman dan tersertifikasi.</p>
        <p>Kami menggunakan suku cadang original (genuine parts) serta prosedur uji diagnostik berstandar global guna meminimalkan risiko downtime serta memperpanjang masa pakai unit alat berat Anda.</p>
      `,
      image_path: "/images/featured-service2.jpg",
      photos: [
        "/images/layanan-pem1.jpg",
        "/images/layanan-pem2.jpg"
      ]
    },
    "suplai-suku-cadang": {
      title: "Suplai Suku Cadang",
      description: "Ketersediaan suku cadang original XCMG lengkap dengan jaminan kualitas terbaik untuk memastikan keandalan mesin serta meminimalisir waktu henti (downtime) operasional Anda.",
      content: `
        <p>Sebagai mitra terpercaya, kami menyediakan berbagai kebutuhan suku cadang asli (genuine parts) untuk seluruh lini produk alat berat XCMG.</p>
        <p>Pengadaan komponen yang cepat dan tepat sasaran menjadi komitmen kami agar proyek konstruksi dan pertambangan Anda tetap berjalan tanpa hambatan berarti.</p>
      `,
      image_path: "/images/featured-service3.png",
      photos: [
        "/images/suplai1.jpg",
        "/images/suplai2.jpg"
      ]
    },
    "konsultasi-teknis": {
      title: "Konsultasi Teknis",
      description: "Layanan konsultasi pemilihan unit dan analisis kebutuhan operasional proyek secara komprehensif bersama tim engineer profesional kami.",
      content: `
        <p>Bingung menentukan spesifikasi alat berat yang paling efisien untuk medan proyek Anda? Tim ahli kami siap memberikan rekomendasi teknis yang akurat.</p>
        <p>Kami menganalisis berbagai aspek mulai dari kondisi medan, kapasitas muat, hingga kalkulasi efisiensi bahan bakar demi kesuksesan operasional proyek Anda.</p>
      `,
      image_path: "/images/featured-service4.jpg",
      photos: [
        "/images/konsultasi1.jpg",
        "/images/konsultasi2.jpg"
      ]
    }
  };

  // 2. Ambil slug dari URL path terakhir (contoh: /featured-services/pelatihan-operator)
  const currentPath = window.location.pathname;
  const slug = currentPath.split("/").pop();

  // Pilih data service berdasarkan slug, jika tidak ada fallback ke service pertama
  const service = servicesMap[slug] || servicesMap["layanan-maintenance"];

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
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-[#ffc107] selection:text-[#0f2b5c]">
      <Head title={`${service.title} - PT Servistama Pro Indonesia`} />
      <Navbar />

      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Tombol Kembali ke Layanan Unggulan di Beranda */}
          <button
            onClick={handleBackToFeatured}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0F2B5C] mb-8 transition cursor-pointer bg-transparent border-none p-0"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Layanan Unggulan
          </button>

          {/* Bagian Deskripsi */}
          <div className="space-y-6 mb-16">
            <span className="text-xs font-black tracking-widest text-[#ffc107] uppercase bg-amber-50 px-3.5 py-1.5 rounded-lg border border-amber-200 inline-block">
              Layanan Unggulan
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0F2B5C] tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
              {service.description}
            </p>
            {service.content && (
              <div 
                className="text-sm text-slate-600 leading-relaxed space-y-4 pt-2 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            )}
          </div>

          {/* Bagian Galeri & Tepat 3 Foto */}
          <div className="space-y-6 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-black text-[#0F2B5C]">Galeri & Dokumentasi Kegiatan</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Foto Utama */}
              {service.image_path && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm h-64">
                  <img
                    src={service.image_path}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              {/* 2 Foto Tambahan */}
              {service.photos.slice(0, 2).map((photo, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm h-64">
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