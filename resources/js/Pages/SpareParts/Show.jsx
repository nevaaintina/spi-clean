import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
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

function ChatIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

export default function Show({ sparePart }) {
  if (!sparePart) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4 font-sans">
        <Head title="Spare Part Tidak Ditemukan - PT. Servistama Pro Indonesia" />
        <Navbar />
        <div className="py-24">
          <h1 className="text-2xl font-black text-[#071b38] mb-2">Spare Part Tidak Ditemukan</h1>
          <p className="text-sm text-slate-500 mb-6">Maaf, komponen yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/spare-parts" className="px-6 py-3 bg-[#ffc107] text-[#071b38] font-bold text-xs rounded-xl shadow">
            Kembali ke Katalog Spare Parts
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const galleryImages = [
    ...(sparePart.image ? [`/${sparePart.image.replace(/^\//, '')}`] : []),
    ...(Array.isArray(sparePart.gallery) ? sparePart.gallery.map(img => `/${img.replace(/^\//, '')}`) : [])
  ];

  if (galleryImages.length === 0) {
    galleryImages.push("https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80");
  }

  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  const handleSendInquiry = () => {
    const message = `Halo Servistama Pro Indonesia, saya ingin mengirimkan inquiry/pertanyaan mengenai spare part: *${sparePart.name}* (Part No: ${sparePart.part_number}). Mohon informasinya lebih lanjut. Terima kasih.`;
    window.open(`https://wa.me/6281122233344?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Fungsi Download Brosur: Mengambil semua foto inputan admin (foto utama + galeri) dan menggabungkannya menjadi 1 PDF cetak
  const handleDownloadBrochure = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Mohon izinkan pop-up pada browser Anda untuk mendownload brosur PDF.");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Brosur Suku Cadang - ${sparePart.name}</title>
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
            <p>Brosur Resmi Komponen: <strong>${sparePart.name}</strong> (Part No: ${sparePart.part_number})</p>
          </div>
          ${galleryImages.map((img, idx) => `
            <div class="page">
              <div class="title">Dokumentasi Brosur #${idx + 1} -${sparePart.name}</div>
              <img src="${window.location.origin}${img}" alt="Brosur ${idx + 1}" />
              <div class="footer">Halaman ${idx + 1} dari ${galleryImages.length} \vert{} Part No:${sparePart.part_number}</div>
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
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans overflow-x-hidden">
      <Head title={`${sparePart.name} - PT. Servistama Pro Indonesia`} />
      <Navbar />

      <main className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <Link
            href="/spare-parts"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#071b38] mb-6 transition"
          >
            <ArrowLeftIcon /> Kembali ke Daftar Spareparts
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* KOTAK FOTO KIRI */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="relative w-full h-[360px] md:h-[420px] bg-white rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] select-none">
                  <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-[#071b38] text-center px-4 rotate-[-15deg]">
                    WWW.SERVISTAMAPRO.CO.ID
                  </span>
                </div>
                <img
                  src={activeImage}
                  alt={sparePart.name}
                  className="max-h-full max-w-full object-contain relative z-10 transition-all duration-300"
                />
              </div>

              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`h-20 rounded-xl border-2 bg-white p-2 flex items-center justify-center overflow-hidden cursor-pointer transition ${
                        activeImage === img ? "border-[#ffc107] shadow-md scale-105" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DETAIL / SPESIFIKASI PRODUK KANAN (100% DINAMIS) */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-[#071b38] leading-tight mb-6">
                  {sparePart.name} - {sparePart.part_number}
                </h1>

                <div className="space-y-3.5 text-xs md:text-sm border-b border-slate-100 pb-6 mb-6">
                  
                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Product Category:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.category}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Brand:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.brand || 'XCMG'}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Parts Name:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.name}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Parts No:</span>
                    <span className="font-mono font-bold text-[#0f2b5c]">{sparePart.part_number}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Delivery Time:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.delivery_time}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Supply Capacity:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.supply_capacity}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Product Origin:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.product_origin}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Package:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.package_type}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Shipping Methods:</span>
                    <span className="font-semibold text-[#071b38]">{sparePart.shipping_methods}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[#ffc107] font-bold">»</span>
                    <span className="font-bold text-slate-500 w-36 shrink-0">Rating:</span>
                    <div className="flex items-center gap-1 text-amber-400 text-sm">
                      ★★★★★
                    </div>
                    <span className="text-xs text-slate-500 font-medium ml-2">{sparePart.rating}</span>
                  </div>

                </div>

                {sparePart.description && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                    <p className="font-bold text-[#0f2b5c] mb-1">Deskripsi:</p>
                    {sparePart.description}
                  </div>
                )}

              </div>

              {/* TOMBOL AKSI */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                >
                  <SendIcon />
                  Send Inquiry
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-[#071b38] text-slate-700 hover:text-[#071b38] font-bold text-xs transition cursor-pointer bg-slate-50"
                >
                  <DownloadIcon />
                  Download Brosur
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => window.open('https://wa.me/6281122233344?text=Halo%20Servistama%20Pro%20Indonesia,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20spare%20part.', '_blank')}
          className="flex items-center gap-2.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white px-5 py-3 rounded-full shadow-2xl font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer border border-white/20"
        >
          <ChatIcon />
          <span>CHAT WITH US</span>
          <span className="text-[#ffc107] text-sm">▲</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}