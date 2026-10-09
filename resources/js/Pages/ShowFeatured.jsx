import React from "react";
import { Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { ArrowLeft } from "lucide-react";

export default function ShowFeatured() {
  // 1. Kamus Data untuk Masing-masing Card Layanan Unggulan (Slug disesuaikan dengan database)
  const servicesMap = {
    "pelatihan-operator": {
      title: "Layanan khusus pelatihan operator unit XCMG",
      description: "Kami memberikan pelatihan khusus kepada operator Anda untuk unit XCMG pertambangan dan konstruksi guna memastikan pengoperasian alat berat yang aman, efisien dan berstandar operasional tinggi.",
      image_path: "/images/featured-service1.jpg",
      photos: [
        "/images/pelatihan-operator1.jpg",
        "/images/pelatihan-operator2.jpg"
      ]
    },
    "perawatan-unit": {
      title: "Layanan perawatan unit XCMG",
      description: "Kami juga melayani perawatan unit XCMG pertambangan anda memastikan berjalan dengan baik saat operator anda bekerja pada unit di area site.",
      image_path: "/images/featured-service2.jpg",
      photos: [
        "/images/layanan-pem1.jpg",
        "/images/layanan-pem2.jpg"
      ]
    },
    "layanan-maintenance": {
      title: "Layanan Maintenance Unit XCMG",
      description: "Layanan pemeliharaan dan perawatan menyeluruh untuk memastikan performa unit XCMG Anda tetap optimal di segala medan pertambangan.",
      image_path: "/images/featured-service2.jpg",
      photos: [
        "/images/layanan-pem1.jpg",
        "/images/layanan-pem2.jpg"
      ]
    },
    "suplai-suku-cadang": {
      title: "Layanan Suku Cadang untuk Unit XCMG Pertambangan",
      description: "Pelayanan cepat dan tepat waktu dari kami untuk memenuhi kebutuhan suku cadang unit XCMG pertambangan Anda. Kami melayani kebutuhan suku cadang Anda selama 24 jam.",
      image_path: "/images/featured-service3.png",
      photos: [
        "/images/suplai1.jpg",
        "/images/suplai2.jpg"
      ]
    },
    "konsultasi-teknis": {
      title: "servis unit",
      description: "Dengan mekanik yang handal dari kami, PT. Servistama Pro Indonesia mampu menjawab keraguan untuk servis berkala unit XCMG pertambangan anda.",
      image_path: "/images/featured-service4.jpg",
      photos: [
        "/images/konsultasi1.jpg",
        "/images/konsultasi2.jpg"
      ]
    }
  };

  // 2. Ambil slug dari URL path terakhir dan ubah ke lowercase agar aman
  const currentPath = window.location.pathname;
  const slug = currentPath.split("/").pop().toLowerCase();

  // Pilih data service berdasarkan slug, jika tidak ada gunakan default layanan pertama
  const service = servicesMap[slug] || servicesMap["pelatihan-operator"];

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
      <Head title={`${service?.title || "Layanan Unggulan"} - PT Servistama Pro Indonesia`} />
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
              {service?.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
              {service?.description}
            </p>
          </div>

          {/* Bagian Galeri & Dokumentasi */}
          <div className="space-y-6 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-black text-[#0F2B5C]">Galeri & Dokumentasi Kegiatan</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Foto Utama */}
              {service?.image_path && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm h-64">
                  <img
                    src={service.image_path}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              {/* 2 Foto Tambahan */}
              {service?.photos?.slice(0, 2).map((photo, index) => (
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