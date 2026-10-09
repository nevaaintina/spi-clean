import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";

/* =========================================================
   POP UP SCROLL ANIMATION
========================================================= */
function PopReveal({
  children,
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`
        ${className}
        transition-all
        duration-[850ms]
        ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.78] translate-y-14"
        }
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   SOFT REVEAL ANIMATION
========================================================= */
function SoftReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  const hiddenPosition = {
    up: "translate-y-16",
    left: "-translate-x-16",
    right: "translate-x-16",
    down: "-translate-y-16",
  };

  return (
    <div
      ref={ref}
      className={`
        ${className}
        transition-all
        duration-[900ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible
            ? "opacity-100 translate-x-0 translate-y-0 scale-100"
            : `opacity-0 ${hiddenPosition[direction]} scale-[0.96]`
        }
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   CONTACT PAGE (FULL-WIDTH HEAD OFFICE CARD & MAPS + QR)
========================================================= */
export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Head title="Contact Us - PT. Servistama Pro Indonesia" />

      {/* =====================================================
         NAVBAR
      ===================================================== */}
      <Navbar />

      {/* =====================================================
         FULL HERO BANNER
      ===================================================== */}
      <section
        className="relative flex min-h-[500px] md:min-h-[560px] w-full items-center overflow-hidden bg-cover bg-center py-24"
        style={{
          backgroundImage: `url('/images/hero-contact.png')`,
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 xl:px-16 z-10">
          <SoftReveal direction="up" delay={100} className="max-w-2xl">
            {/* Heading */}
            <h1 className="text-[40px] sm:text-[48px] md:text-[56px] leading-[1.1] font-black tracking-[-0.035em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              Let's Build Something{" "}
              <span className="text-[#ffc107]">
                Great.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-[13px] md:text-[15px] leading-relaxed text-slate-100 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Hubungi tim profesional PT. Servistama Pro Indonesia untuk konsultasi alat berat, layanan purna jual, kebutuhan spare parts, maupun kerja sama bisnis.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3.5 mt-7">
              <a
                href="https://wa.me/6282258013177"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/60 text-white text-xs font-bold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 bg-black/30 backdrop-blur-sm shadow-md"
              >
                {/* Logo Resmi WhatsApp */}
                <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                WhatsApp Support
              </a>
            </div>
          </SoftReveal>
        </div>
      </section>

      {/* =====================================================
         CONTACT INFO CARD (FULL-WIDTH MEMBENTANG)
      ===================================================== */}
      <section className="relative z-30 -mt-10 md:-mt-14 mb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <PopReveal delay={0}>
            <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_35px_rgba(15,35,70,0.08)] hover:shadow-2xl hover:border-[#ffc107] transition-all duration-500 flex flex-col md:flex-row items-center">

              {/* IMAGE (Sisi Kiri) */}
              <div className="relative w-full md:w-[42%] h-[220px] md:h-[200px] overflow-hidden shrink-0">
                <img
                  src="/images/office-contact.jpeg"
                  alt="Kantor Pusat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 md:block hidden" />
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  HEAD OFFICE
                </span>
              </div>

              {/* CONTENT (Sisi Kanan - Full Lebar) */}
              <div className="p-7 md:p-8 flex flex-col justify-between flex-1 w-full">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.22em] text-[#b27b00] mb-1 uppercase">
                    PT. SERVISTAMA PRO INDONESIA
                  </p>
                  <h3 className="text-lg md:text-xl font-black text-[#071b38]">
                    HEAD OFFICE KANTOR PUSAT 
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                    Foresta Business Loft 7 (unit 6-7), Lengkong Kulon, Pagedangan, Tangerang Regency, Banten 15331.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-bold text-slate-700">
                    Hotline Utama: <span className="text-[#b27b00] font-black">+62 822-5801-3177</span>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/jWF4GkC83QECqqyAA"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#071b38] text-white text-xs font-bold hover:bg-[#ffc107] hover:text-[#071b38] transition-all duration-300 shadow-sm"
                  >
                    <span>Buka di Google Maps</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

            </div>
          </PopReveal>
        </div>
      </section>

      {/* =====================================================
         MAPS & QR CODE SECTION (SEJAJAR 1 BARIS DI MOBILE & DESKTOP)
      ===================================================== */}
      <section className="pb-20 pt-2 md:pt-4 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-3 sm:gap-7 items-stretch">

            {/* GOOGLE MAPS */}
            <PopReveal delay={100} className="h-full">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-5 md:p-6 shadow-[0_10px_35px_rgba(15,35,70,0.06)] hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#fff8df] flex items-center justify-center shrink-0 text-[#b27b00]">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <circle cx="12" cy="11" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[11px] sm:text-xs font-bold text-[#071b38]">Lokasi Kantor Pusat & Warehouse</h3>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 leading-relaxed mt-0.5 sm:mt-1 font-normal">
                        Foresta Business Loft 7, Unit 6-7, Jl. BSD Boulevard Utara, Pagedangan, Tangerang
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/jWF4GkC83QECqqyAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-[180px] sm:h-[230px] md:h-[250px] rounded-xl overflow-hidden border border-slate-200 mt-2 relative group cursor-pointer"
                  title="Klik untuk membuka lokasi di Google Maps"
                >
                  <iframe
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7441235678!2d106.638!3d-6.301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDMuNiJTIDEwNsKwMzgnMTYuOCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-[#0f2b5c] font-bold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-md">
                      Buka di Maps ↗
                    </span>
                  </div>
                </a>
              </div>
            </PopReveal>

            {/* QR CODE CARD */}
            <PopReveal delay={200} className="h-full">
              <div className="relative overflow-hidden bg-[#071b38] rounded-2xl p-3 sm:p-6 md:p-8 shadow-[0_12px_35px_rgba(7,27,56,0.18)] hover:scale-[1.01] transition-transform duration-300 h-full flex flex-col justify-between">
                <div className="absolute -right-16 -bottom-16 w-44 h-44 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute right-10 top-[-70px] w-32 h-32 rounded-full border border-[#ffc107]/10 pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#ffc107]">Scan To Connect</span>
                    <span className="hidden sm:inline-block w-8 h-[1px] bg-white/20" />
                  </div>

                  <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                    Simpan Kontak Kami
                  </h4>

                  <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed mt-1 font-normal">
                    Scan QR Code untuk menyimpan kontak resmi PT. Servistama Pro Indonesia ke ponsel Anda.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col items-center xl:flex-row gap-3 sm:gap-6 my-3 sm:my-6">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3.5 shrink-0 shadow-md">
                    <img
                      src="/images/barcode.png"
                      alt="QR Code Contact SPI"
                      className="w-[85px] h-[85px] sm:w-[120px] sm:h-[120px] object-contain"
                    />
                  </div>

                  <div className="hidden xl:flex flex-col gap-2.5">
                    <span className="flex items-center gap-2 text-[11px] font-medium text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-[#ffc107]" /> Akses Kontak Cepat
                    </span>
                    <span className="flex items-center gap-2 text-[11px] font-medium text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-[#ffc107]" /> 100% Aman & Terverifikasi
                    </span>
                    <span className="flex items-center gap-2 text-[11px] font-medium text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-[#ffc107]" /> Terhubung Langsung ke Tim SPI
                    </span>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/10 text-[9px] sm:text-[10px] text-slate-400 truncate">
                  PT. Servistama Pro Indonesia © {new Date().getFullYear()}
                </div>
              </div>
            </PopReveal>

          </div>
        </div>
      </section>

      {/* =====================================================
         FOOTER
      ===================================================== */}
      <Footer />

    </div>
  );
}