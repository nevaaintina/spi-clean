import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

function FadeReveal({ children, className = "", delay = 0 }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-4.35-4.35m2.1-5.15a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.5" strokeWidth="1.8" />
    </svg>
  );
}

export default function Index({ spareParts = [], filters = {}, catalogPdfUrl = null, explodedImages = {}, explodedPartsData = {} }) {
  const categories = [
    "Semua",
    "Hydraulic System",
    "Filters & Maintenance",
    "Undercarriage",
    "Engine Parts",
    "Electrical System",
    "Transmission & Brake",
  ];

  const [activeCategory, setActiveCategory] = useState(filters?.category || "Semua");
  const [keyword, setKeyword] = useState(filters?.search || "");

  // State untuk Exploded View Interaktif
  const [explodedSystem, setExplodedSystem] = useState("Hydraulic System");

  // Fallback gambar jika admin belum mengunggah gambar untuk sistem tertentu
  const defaultImages = {
    "Hydraulic System": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    "Filters & Maintenance": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    "Undercarriage": "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    "Engine Parts": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    "Electrical System": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    "Transmission & Brake": "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
  };

  const currentImage = explodedImages[explodedSystem] 
    ? `/${explodedImages[explodedSystem].replace(/^\//, '')}` 
    : defaultImages[explodedSystem];

  const currentParts = explodedPartsData[explodedSystem] || [
    { no: "01", component: "Belum ada konfigurasi komponen", partNumber: "-", status: "Available" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/spare-parts', { search: keyword, category: activeCategory }, { preserveState: true });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    router.get('/spare-parts', { search: keyword, category }, { preserveState: true });
  };

  // Logika Download Katalog: Jika ada PDF dari admin buka PDF, jika tidak gabungkan semua foto spare parts jadi PDF cetak
  const handleDownloadCatalog = () => {
    if (catalogPdfUrl) {
      window.open(`/${catalogPdfUrl.replace(/^\//, '')}`, "_blank");
    } else if (spareParts.length > 0) {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Mohon izinkan pop-up pada browser Anda untuk mendownload katalog PDF.");
        return;
      }

      // Kumpulkan semua foto spare parts (foto utama + galeri)
      let allImages = [];
      spareParts.forEach(part => {
        if (part.image) allImages.push({ url: `/${part.image.replace(/^\//, '')}`, title: `${part.name} (Part No: ${part.part_number})` });
        if (Array.isArray(part.gallery)) {
          part.gallery.forEach(img => allImages.push({ url: `/${img.replace(/^\//, '')}`, title: `${part.name} (Galeri)` }));
        }
      });

      if (allImages.length === 0) {
        alert("Belum ada foto spare parts yang tersedia untuk digabungkan ke katalog.");
        printWindow.close();
        return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Katalog Suku Cadang - PT. Servistama Pro Indonesia</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; color: #0f2b5c; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ffc107; padding-bottom: 15px; }
              .header h1 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0; font-size: 14px; color: #555; }
              .page { page-break-after: always; text-align: center; margin-bottom: 40px; }
              .page img { max-width: 100%; max-height: 700px; object-fit: contain; border: 1px solid #ddd; border-radius: 8px; padding: 10px; background: #fff; }
              .title { font-size: 14px; font-weight: bold; margin-bottom: 10px; color: #071b38; }
              .footer { font-size: 11px; color: #888; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>PT. SERVISTAMA PRO INDONESIA</h1>
              <p>Katalog Resmi Suku Cadang Alat Berat & Komponen XCMG</p>
            </div>
            ${allImages.map((item, idx) => `
              <div class="page">
                <div class="title">${idx + 1}.${item.title}</div>
                <img src="${window.location.origin}${item.url}" alt="Part Image" />
                <div class="footer">Halaman ${idx + 1} dari${allImages.length} | PT. Servistama Pro Indonesia</div>
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
    } else {
      alert("Belum ada data spare parts atau file katalog PDF yang tersedia.");
    }
  };

  const handleExplodedView = () => {
    const section = document.getElementById("exploded-view-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans overflow-x-hidden">
      <Head title="Spare Parts Catalog - PT. Servistama Pro Indonesia" />
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative w-full min-h-[650px] lg:min-h-[720px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('/images/hero-spare.png')`,
          }}
        />
        <div className="absolute inset-0 bg-[#071b38]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071b38]/70 via-[#071b38]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071b38]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-16 w-full py-24">
          <FadeReveal className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-[2px] bg-[#ffc107]" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-[#ffc107] font-medium">
                Spare Parts & Components
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.05] tracking-tight font-medium text-white drop-shadow-md">
              Suku Cadang <br />
              <span className="text-[#ffc107]">Original XCMG</span>
            </h1>

            <div className="mt-7 w-16 h-[3px] bg-[#ffc107]" />

            <p className="mt-7 text-sm md:text-base leading-7 text-slate-100 max-w-2xl font-normal drop-shadow">
              Temukan berbagai komponen dan suku cadang original untuk menjaga performa, keandalan, dan produktivitas alat berat Anda.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownloadCatalog}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ffc107] text-[#071b38] text-xs font-medium hover:bg-white transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer"
              >
                <DownloadIcon />
                Download Katalog
              </button>

              <a
                href="#katalog-section"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white hover:text-[#071b38] transition-all duration-300"
              >
                <EyeIcon />
                Lihat Daftar Part
              </a>
            </div>
          </FadeReveal>
        </div>
      </section>

      {/* CATALOG SECTION */}
      <section id="katalog-section" className="relative bg-[#f7f9fc] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <FadeReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 mb-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-7 h-[2px] bg-[#ffc107]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#a97800] font-medium">Parts Catalog</span>
                </div>
                <h2 className="text-3xl md:text-4xl text-[#071b38] font-medium tracking-tight">Daftar Suku Cadang</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500 max-w-xl">
                  Klik pada nama komponen atau baris part untuk melihat rincian lengkap beserta detail spesifikasi.
                </p>
              </div>

              <form onSubmit={handleSearch} className="relative w-full lg:w-[300px]">
                <input
                  type="text"
                  placeholder="Cari kode atau nama part..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full h-11 pl-4 pr-11 rounded-xl bg-white border border-slate-200 text-xs text-[#071b38] outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107]/10 transition"
                />
                <button type="submit" className="absolute right-4 top-3.5 text-slate-400 cursor-pointer"><SearchIcon /></button>
              </form>
            </div>
          </FadeReveal>

          <FadeReveal delay={100}>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-7 scrollbar-hide">
              {categories.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-normal transition-all duration-300 border cursor-pointer ${
                      active ? "bg-[#071b38] border-[#071b38] text-[#ffc107]" : "bg-white border-slate-200 text-slate-500 hover:border-[#071b38] hover:text-[#071b38]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </FadeReveal>

          <FadeReveal delay={150}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="hidden lg:grid grid-cols-[220px_1fr_180px] bg-[#071b38] text-white divide-x divide-white/10">
                <div className="px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-[#ffc107]">Nomor Part</div>
                <div className="px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300">Nama Component</div>
                <div className="px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300 text-center">Foto</div>
              </div>

              <div className="divide-y divide-slate-200">
                {spareParts.length > 0 ? (
                  spareParts.map((item) => (
                    <Link 
                      key={item.id} 
                      href={`/spare-parts/${item.id}`}
                      className="group relative grid grid-cols-1 lg:grid-cols-[220px_1fr_180px] divide-y lg:divide-y-0 lg:divide-x divide-slate-200 hover:bg-[#fffdf5] transition-all duration-300 items-center block cursor-pointer"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffc107] opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="p-6">
                        <p className="lg:hidden text-[9px] uppercase tracking-[0.16em] text-[#b27b00] font-medium mb-1">Nomor Part</p>
                        <p className="text-xs font-mono font-bold text-[#071b38]">{item.part_number}</p>
                      </div>

                      <div className="p-6">
                        <p className="lg:hidden text-[9px] uppercase tracking-[0.16em] text-slate-400 mb-1">Nama Component</p>
                        <h3 className="text-sm text-[#071b38] font-medium leading-snug group-hover:text-[#b27b00] transition-colors">{item.name}</h3>
                        <p className="text-[11px] text-slate-400 mt-1">{item.category} • {item.brand || 'XCMG'} • Klik untuk detail &rarr;</p>
                      </div>

                      <div className="p-6 flex justify-center">
                        <div className="w-24 h-24 rounded-2xl border-2 border-slate-200 bg-slate-100 overflow-hidden shrink-0 shadow-sm flex items-center justify-center p-1">
                          <img src={item.image ? `/${item.image.replace(/^\//, '')}` : 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center"><SearchIcon /></div>
                    <h3 className="mt-4 text-sm text-[#071b38] font-medium">Part tidak ditemukan</h3>
                    <p className="mt-1 text-xs text-slate-500">Coba gunakan kata kunci atau kategori lainnya.</p>
                  </div>
                )}
              </div>
            </div>
          </FadeReveal>
        </div>
      </section>

      {/* DIGITAL PARTS REFERENCE (DOWNLOAD & EXPLODED VIEW CARDS) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <FadeReveal>
            <div className="max-w-2xl mb-12">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-7 h-[2px] bg-[#ffc107]" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#a97800] font-bold">
                  Digital Parts Reference
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl text-[#071b38] font-bold tracking-tight">
                Katalog & Exploded View
              </h2>
            </div>
          </FadeReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeReveal delay={100}>
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#071b38] text-[#ffc107] flex items-center justify-center shadow-md">
                      <DownloadIcon />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#071b38] mb-3">Download Parts Catalog</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-8">
                    Simpan daftar referensi suku cadang untuk kebutuhan pengecekan kode dan kompatibilitas unit.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleDownloadCatalog}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#071b38] text-white hover:bg-[#ffc107] hover:text-[#071b38] font-bold text-xs transition-all shadow cursor-pointer"
                  >
                    <DownloadIcon />
                    Download Catalog
                  </button>
                </div>
              </div>
            </FadeReveal>

            <FadeReveal delay={200}>
              <div className="bg-[#071b38] rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffc107] text-[#071b38] flex items-center justify-center shadow-md">
                      <EyeIcon />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Exploded View</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-8">
                    Lihat struktur komponen secara lebih detail untuk membantu identifikasi posisi dan hubungan antar spare parts.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleExplodedView}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#071b38] hover:bg-[#ffc107] font-bold text-xs transition-all shadow cursor-pointer"
                  >
                    <EyeIcon />
                    Buka Exploded View
                  </button>
                </div>
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* SECTION: EXPLODED VIEW INTERAKTIF DINAMIS */}
      <section id="exploded-view-section" className="py-16 md:py-24 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <FadeReveal>
            <div className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-[2px] bg-[#ffc107]" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#a97800] font-bold">
                  Exploded View
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl text-[#071b38] font-bold tracking-tight">
                Component Reference
              </h2>
            </div>
          </FadeReveal>

          <FadeReveal delay={100}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-[#071b38] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#ffc107] font-bold block mb-1">Assembly</span>
                  <h3 className="text-lg md:text-xl font-bold text-white">{explodedSystem}</h3>
                </div>

                <div className="relative w-full sm:w-64">
                  <select
                    value={explodedSystem}
                    onChange={(e) => setExplodedSystem(e.target.value)}
                    className="w-full bg-[#0f2b5c] text-white text-xs font-semibold px-4 py-3 rounded-xl border border-white/20 outline-none focus:border-[#ffc107] cursor-pointer appearance-none"
                  >
                    {Object.keys(defaultImages).map((sys) => (
                      <option key={sys} value={sys} className="bg-[#071b38] text-white">
                        {sys}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-3.5 text-[#ffc107] pointer-events-none text-xs">▼</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Gambar Diagram Exploded View Dinamis dari Admin */}
                <div className="relative w-full h-[320px] md:h-[450px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-2">
                  <img
                    src={currentImage}
                    alt={explodedSystem}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                    Diagram Preview
                  </div>
                </div>

                {/* Tabel Komponen Interaktif Dinamis dari Session/DB */}
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] uppercase tracking-[0.16em] text-slate-400 font-bold">
                        <th className="py-3 px-4 w-20">No.</th>
                        <th className="py-3 px-4">Component</th>
                        <th className="py-3 px-4">Part Number</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {currentParts.map((part, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="py-4 px-4 font-mono font-bold text-slate-400">{part.no}</td>
                          <td className="py-4 px-4 font-bold text-[#071b38]">{part.component}</td>
                          <td className="py-4 px-4 font-mono font-semibold text-[#0f2b5c]">{part.partNumber}</td>
                          <td className="py-4 px-4 text-right">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              {part.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </FadeReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}