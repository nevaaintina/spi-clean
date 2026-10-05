import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

const categoryIcons = {
  "All": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  "Excavator": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 19h18M5 19l2-7h5l2 7M7 12l3-7h4l2 7M14 5h3l3 7h-5" />
    </svg>
  ),
  "Wheel Loader": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17l2-7h7l4 7M14 10l3-4h3v4M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Motor Grader": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17l2-6h7l3 6M14 11l3-4h3v4M8 8h4M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Crane": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 20V5h13M5 6h13M8 20h8M18 6l3 7M21 13h-3M15 13v7" />
    </svg>
  ),
  "Dump Truck": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17V8h9l4 4h3v5M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Mining Equipment": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M4 18h16M6 18V8l6-4 6 4v10M9 18v-5h6v5M8 9h8" />
    </svg>
  ),
  "Road": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 4L6 20M15 4l3 16M12 5v3M12 11v3M12 17v2" />
    </svg>
  ),
};

const defaultCategoryIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export default function ProductIndex({ products = [], catalogPdfUrl = null }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Inisialisasi AOS dengan durasi animasi santai (2.2 detik)
  useEffect(() => {
    AOS.init({
      duration: 2200,
      once: false,
      easing: 'cubic-bezier(0.12, 1, 0.2, 1)',
    });
  }, []);

  const categories = [
    "Excavator",
    "Wheel Loader",
    "Motor Grader",
    "Crane",
    "Dump Truck",
    "Mining Equipment",
    "Road",
  ];

  const categoryList = [
    { name: "All", icon: categoryIcons["All"] },
    ...categories.map((cat) => ({
      name: cat,
      icon: categoryIcons[cat] || defaultCategoryIcon,
    })),
  ];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const handleDownloadCatalog = () => {
    if (catalogPdfUrl) {
      window.open(`/${catalogPdfUrl.replace(/^\//, '')}`, "_blank");
    } else {
      alert("File katalog PDF utama belum tersedia. Silakan hubungi admin.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      <Head title="Katalog Produk & Alat Berat - PT Servistama Pro Indonesia" />
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-[4000ms]"
          style={{
            backgroundImage: `url('/images/hero-product.png')`,
          }}
          data-aos="zoom-out"
          data-aos-duration="3000"
        />
        <div className="absolute inset-0 bg-[#071b38]/30 z-10" />

        <div className="relative max-w-[1380px] mx-auto px-4 sm:px-10 lg:px-16 xl:px-20 py-24 sm:py-36 lg:py-48 min-h-[480px] sm:min-h-[660px] lg:min-h-[740px] flex items-center z-20">
          <div className="w-full max-w-[820px]" data-aos="fade-up" data-aos-duration="2400">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6" data-aos="fade-right" data-aos-delay="200">
              <span className="w-5 sm:w-7 h-[2.5px] sm:h-[3px] bg-[#ffc107]" />
              <span className="text-[11px] sm:text-sm md:text-[15px] font-extrabold tracking-[0.08em] text-[#ffc107] uppercase drop-shadow-md" translate="no">
                KATALOG ALAT BERAT & PRODUK
              </span>
            </div>

            <h1 className="text-2xl sm:text-[50px] md:text-[60px] xl:text-[70px] leading-[1.12] sm:leading-[1.08] tracking-[-0.02em] font-semibold text-white drop-shadow-lg" data-aos="fade-up" data-aos-delay="400">
              Solusi Alat Berat & <br />
              <span className="text-[#ffc107] font-bold">Suku Cadang XCMG</span>
            </h1>

            <p className="mt-4 sm:mt-7 max-w-[680px] text-xs sm:text-[16px] md:text-[18px] leading-relaxed sm:leading-8 text-slate-100 font-medium drop-shadow-md" data-aos="fade-up" data-aos-delay="600">
              Temukan berbagai lini produk berkualitas tinggi untuk mendukung efisiensi dan produktivitas proyek konstruksi serta pertambangan Anda.
            </p>

            <div className="mt-6 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="800">
              <a
                href="#products"
                className="inline-flex items-center gap-2 sm:gap-3 bg-[#ffc107] hover:bg-[#e0a806] text-[#0f2b5c] px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-black shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                LIHAT PRODUK
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleDownloadCatalog}
                className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white hover:text-[#0f2b5c] text-white border border-white/30 px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-black shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                </svg>
                DOWNLOAD KATALOG
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section id="products" className="relative bg-white py-12 sm:py-16 lg:py-20">
        <div className="relative max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10" data-aos="fade-up">
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                <span className="w-6 sm:w-7 h-[2px] bg-[#ffc107]" />
                <span className="text-[10px] sm:text-[11px] font-black tracking-[0.16em] uppercase text-[#0f2b5c]" translate="no">
                  OUR PRODUCTS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f2b5c] tracking-tight">
                Pilihan Alat Berat <span className="text-[#ffc107]">Berkualitas</span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-slate-500 font-light">
              Pilih kategori untuk menemukan produk yang sesuai dengan kebutuhan proyek Anda.
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 mb-8 sm:mb-12 scrollbar-hide" data-aos="fade-up" data-aos-delay="200">
            {categoryList.map((category) => {
              const active = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`
                    shrink-0 flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer
                    ${
                      active
                        ? "bg-[#0f2b5c] border-[#0f2b5c] text-[#ffc107] scale-105 shadow-md"
                        : "bg-white border-slate-200 text-slate-600 hover:border-[#0f2b5c] hover:scale-102"
                    }
                  `}
                >
                  <span className={`w-4 h-4 sm:w-5 sm:h-5 ${active ? "text-[#ffc107]" : "text-[#0f2b5c]"}`}>{category.icon}</span>
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6" data-aos="fade-up" data-aos-duration="2400">
            {filteredProducts.map((product, idx) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative bg-slate-100 border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end h-[220px] sm:h-[300px] lg:h-[400px] text-center cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 150}
              >
                {/* Gambar Full Cover Card */}
                <div className="absolute inset-0 w-full h-full z-0">
                  <img
                    src={product.image ? `/${product.image}` : "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay Informasi (Default bersih hanya gambar. Teks judul dan sedikit deskripsi muncul saat di-hover/disentuh kursor) */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 bg-gradient-to-t from-[#0b2348] via-[#0b2348]/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col items-center justify-end text-center z-20">
                  <h3 className="text-xs sm:text-base font-bold text-white tracking-wide mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-200 font-light leading-relaxed mb-2 line-clamp-2">
                    {product.overview || product.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black text-[#ffc107]">
                    Lihat Produk <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center" data-aos="fade">
              <h3 className="text-base font-bold text-[#0f2b5c]">Produk tidak ditemukan</h3>
              <p className="mt-1 text-xs text-slate-400 font-light">Belum ada produk pada kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}