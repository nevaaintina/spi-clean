import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

/* =========================================================
   ICON COMPONENT
========================================================= */
function Icon({ type, className = "w-6 h-6" }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
  };

  if (type === "shield") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.8" />
        <path strokeLinecap="round" strokeWidth="1.8" d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "gear") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 13.5l1.2 1-1.8 3.1-1.5-.6a7.4 7.4 0 01-1.7 1l-.2 1.6h-3.5l-.2-1.6a7.4 7.4 0 01-1.7-1l-1.5.6-1.8-3.1 1.2-1a7.2 7.2 0 010-2l-1.2-1 1.8-3.1 1.5.6a7.4 7.4 0 011.7-1l.2-1.6h3.5l.2 1.6a7.4 7.4 0 011.7 1l1.5-.6 1.8 3.1-1.2 1a7.2 7.2 0 010 2z" />
      </svg>
    );
  }

  if (type === "award") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4.5" strokeWidth="1.8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.5 12l-1 8 3.5-2 3.5 2-1-8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.5 8l1 1 2-2" />
      </svg>
    );
  }

  if (type === "weight") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 20h12l-1.5-12h-9L6 20z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 8a3 3 0 016 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 14h4" />
      </svg>
    );
  }

  if (type === "bucket") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 15h14l-2 4H7l-2-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 15l2-8h4l2 8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 7h4" />
      </svg>
    );
  }

  if (type === "engine") {
    return (
      <svg {...common}>
        <rect x="4" y="7" width="14" height="10" rx="2" strokeWidth="1.8" />
        <path strokeLinecap="round" strokeWidth="1.8" d="M18 10h3v4h-3M7 4v3M11 4v3M15 4v3M7 17v3M11 17v3M15 17v3" />
        <circle cx="11" cy="12" r="2" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "download") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4v11" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 11l4 4 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 20h14" />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H11l-5 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 10h8M8 13h5" />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (type === "chevron-left") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
      </svg>
    );
  }

  if (type === "chevron-right") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 11l9-8 9 8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 10v10h14V10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 20v-6h6v6" />
      </svg>
    );
  }

  return null;
}

/* =========================================================
   PRODUCT SHOW (MAIN COMPONENT)
========================================================= */
export default function ProductShow({ product }) {
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <Head title="Produk Tidak Ditemukan - PT Servistama Pro Indonesia" />
        <Navbar />
        <div className="py-24">
          <h1 className="text-2xl font-black text-[#0f2b5c] mb-2">Produk Tidak Ditemukan</h1>
          <p className="text-sm text-slate-500 mb-6">Maaf, produk yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/products" className="px-6 py-3 bg-[#ffc107] text-[#0f2b5c] font-bold text-xs rounded-xl shadow">
            Kembali ke Katalog Produk
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Deskripsi");

  const tabs = [
    "Deskripsi",
    "Spesifikasi",
    "Fitur Unggulan",
    "Galeri",
    "Dokumen",
    "Video",
  ];

  // Hanya mengambil foto galeri
  const galleryImages = Array.isArray(product.gallery) && product.gallery.length > 0
    ? product.gallery.map(img => `/${img.replace(/^\//, '')}`)
    : (product.image ? [`/${product.image.replace(/^\//, '')}`] : ["https://via.placeholder.com/600"]);

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const specifications = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications || '[]') 
    : (product.specifications || []);

  const features = typeof product.features === 'string' 
    ? JSON.parse(product.features || '[]') 
    : (product.features || []);

  const getVideoUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    let cleanPath = path.replace(/^public\//, '').replace(/^\//, '');
    if (cleanPath.startsWith("videos/")) return `/${cleanPath}`;
    return `/videos/products/${cleanPath}`;
  };

  const videoSource = getVideoUrl(product.video_path);

  const handleDownloadPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Mohon izinkan pop-up pada browser Anda untuk mendownload dokumen PDF.");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Katalog Dokumen - ${product.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #0f2b5c; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ffc107; padding-bottom: 15px; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 5px 0 0; font-size: 14px; color: #555; }
            .page { page-break-after: always; text-align: center; margin-bottom: 40px; }
            .page img { max-width: 100%; max-height: 750px; object-fit: contain; border: 1px solid #ddd; border-radius: 8px; padding: 10px; background: #fff; }
            .footer { font-size: 11px; color: #888; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PT. SERVISTAMA PRO INDONESIA</h1>
            <p>Dokumentasi Resmi Unit: <strong>${product.name}</strong> (${product.category})</p>
          </div>
          ${galleryImages.map((img, idx) => `
            <div class="page">
              <img src="${window.location.origin}${img}" alt="Dokumen ${idx + 1}" />
              <div class="footer">Halaman ${idx + 1} dari ${galleryImages.length} \vert{}${product.name}</div>
            </div>
          `).join('')}
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-white text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      <Head title={`${product.name} - PT Servistama Pro Indonesia`} />
      <Navbar />

      <main className="pt-28 pb-20">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mb-6">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-400 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="flex items-center gap-1.5 hover:text-[#0f2b5c] transition">
              <Icon type="home" className="w-3.5 h-3.5" />
              Home
            </Link>
            <span>›</span>
            <Link href="/products" className="hover:text-[#0f2b5c] transition">
              Products
            </Link>
            <span>›</span>
            <span>{product.category}</span>
            <span>›</span>
            <span className="font-bold text-[#0f2b5c]">{product.name}</span>
          </div>
        </div>

        {/* =====================================================
            PRODUCT HERO SECTION
        ===================================================== */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="space-y-6">
            
            {/* 1. KATEGORI BADGE DI ATAS */}
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#fff4ce] border border-[#ffc107]/50 text-[11px] font-black text-[#0f2b5c] uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            {/* 2. NAMA PRODUK */}
            <h1 className="text-[32px] sm:text-[44px] md:text-[52px] leading-[1.1] font-black tracking-[-0.03em] text-[#0f2b5c]">
              {product.name}
            </h1>

            {/* 3. SLIDER FOTO UTAMA */}
            <div className="relative overflow-hidden rounded-[28px] bg-slate-900 border border-slate-200 shadow-lg group">
              <div className="relative h-[420px] sm:h-[550px] lg:h-[640px] w-full overflow-hidden flex items-center justify-center bg-slate-900">
                <img
                  src={galleryImages[activeImage] || galleryImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Counter Badge */}
                <div className="absolute top-5 left-5 z-20">
                  <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-[#0f2b5c] text-xs font-black shadow-md">
                    {String(activeImage + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                  </div>
                </div>

                {/* Tombol Geser Kiri / Kanan */}
                {galleryImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#0f2b5c] flex items-center justify-center shadow-xl opacity-80 group-hover:opacity-100 transition cursor-pointer z-20"
                      aria-label="Previous Image"
                    >
                      <Icon type="chevron-left" className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#0f2b5c] flex items-center justify-center shadow-xl opacity-80 group-hover:opacity-100 transition cursor-pointer z-20"
                      aria-label="Next Image"
                    >
                      <Icon type="chevron-right" className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 4. BAGIAN BAWAH */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
              {/* Thumbnail Galeri di Kiri */}
              {galleryImages.length > 1 ? (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 bg-slate-900 shrink-0 transition cursor-pointer ${activeImage === idx ? 'border-[#ffc107] shadow-md scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : <div />}

              {/* Tombol Konsultasi Produk di Kanan */}
              <div className="w-full lg:w-auto shrink-0">
                <a
                  href={`https://wa.me/6282258013177?text=Halo%20SPI,%20saya%20ingin%20berkonsultasi%20mengenai%20produk%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-[340px] h-[58px] rounded-2xl bg-[#ffc107] hover:bg-[#eaae00] text-[#0f2b5c] font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Icon type="chat" className="w-5 h-5" />
                  Konsultasi Produk
                  <Icon type="arrow" className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            TABS NAVIGATION
        ===================================================== */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mt-14">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 sm:px-8 py-5 text-sm font-bold transition-all cursor-pointer ${activeTab === tab ? "text-[#0f2b5c]" : "text-slate-500 hover:text-[#0f2b5c]"}`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute left-5 right-5 bottom-0 h-[3px] rounded-full bg-[#ffc107]" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT SECTION
        ===================================================== */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mt-4">
          {activeTab === "Deskripsi" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#ffc107] rounded-r-full" />
                <div className="pl-3">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-7 h-[2px] bg-[#ffc107]" />
                    <span className="text-[11px] font-black tracking-widest text-[#0f2b5c] uppercase">Product Overview</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0f2b5c] mb-4">Deskripsi Produk</h2>
                  <p className="text-sm text-slate-600 leading-7">{product.description || product.overview}</p>
                  
                  {features.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center text-[11px] font-black">✓</span>
                          <span className="text-xs sm:text-sm text-slate-600 leading-5">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-6 bg-[#ffc107] rounded-full" />
                  <h2 className="text-lg font-black text-[#0f2b5c]">Spesifikasi Utama</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {specifications.length > 0 ? (
                    specifications.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="py-3 flex justify-between items-center text-xs">
                        <span className="text-slate-400">{item.label}</span>
                        <strong className="text-[#0f2b5c]">{item.value}</strong>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic py-4">Belum ada spesifikasi teknis yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Spesifikasi" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Spesifikasi Teknis Lengkap
              </h2>
              {specifications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 text-sm">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-[#0f2b5c] text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Belum ada spesifikasi yang diinput pada produk ini.</p>
              )}
            </div>
          )}

          {/* TAB FITUR UNGGULAN: Tanda # Telah Dihapus */}
          {activeTab === "Fitur Unggulan" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Fitur Unggulan & Keunggulan
              </h2>
              {features.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-black shrink-0 text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        {/* Menghilangkan tanda # */}
                        <h3 className="font-bold text-[#0f2b5c] text-base mb-1">Keunggulan {idx + 1}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Belum ada fitur unggulan yang ditambahkan.</p>
              )}
            </div>
          )}

          {activeTab === "Galeri" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Galeri Foto Produk ({galleryImages.length} Foto)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveImage(index)} 
                    className={`relative group cursor-pointer overflow-hidden rounded-xl border-2 aspect-[4/3] bg-slate-100 transition ${activeImage === index ? 'border-[#ffc107] shadow-md' : 'border-slate-200'}`}
                  >
                    <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Dokumen" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Dokumen Katalog & Semua Foto Produk ({galleryImages.length} Foto Digabungkan)
              </h2>
              <div className="space-y-6 max-w-xl">
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0f2b5c] text-white flex items-center justify-center font-black text-xs shrink-0">PDF</div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0f2b5c]">Katalog Dokumen {product.name}</h4>
                      <p className="text-xs text-slate-500">Gabungan seluruh ({galleryImages.length}) foto unit dalam 1 dokumen PDF</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={handleDownloadPdf}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ffc107] hover:bg-[#eaae00] text-[#0f2b5c] font-black text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm shrink-0"
                  >
                    <Icon type="download" className="w-4 h-4" />
                    Download PDF Katalog
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Video" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Video Produk & Dokumentasi
              </h2>
              {videoSource ? (
                <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                  <video 
                    src={videoSource} 
                    controls 
                    className="w-full h-full object-contain"
                  ></video>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic text-center py-8">Video demonstrasi belum tersedia untuk produk ini.</p>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}