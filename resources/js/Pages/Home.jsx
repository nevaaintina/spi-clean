import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';

// Komponen Helper untuk Counter yang Berputar Ulang Setiap Kali di-Scroll ke Layar
function AnimatedCounter({ targetNumber, suffix = "" }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(0);
          let startTime;
          const duration = 2000;

          const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const currentCount = Math.min(Math.floor((progress / duration) * targetNumber), targetNumber);
            
            setCount(currentCount);

            if (progress < duration) {
              animationFrameId = requestAnimationFrame(updateCount);
            }
          };

          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetNumber]);

  return <span ref={counterRef}>{count}{suffix}</span>;
}

// Komponen Helper Khusus Slider Testimoni (Dinamis dari Database)
function TestimonialsSlider({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-slate-400 text-xs mt-10">Belum ada testimoni customer yang ditambahkan.</p>;
  }

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
      setFade(true);
    }, 200);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
      setFade(true);
    }, 200);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center">
      
      {testimonials.length > itemsPerPage && (
        <button 
          onClick={handlePrev} 
          className="absolute -left-3 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-100 text-[#0f2b5c] border border-slate-200 flex items-center justify-center shadow-md hover:bg-[#ffc107] transition cursor-pointer"
          aria-label="Previous"
        >
          ←
        </button>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-2 sm:px-6 transition-opacity duration-300 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {visibleTestimonials.map((t, idx) => {
          const profileImg = t.image_path ? (t.image_path.startsWith('http') ? t.image_path : `/${t.image_path}`) : null;
          return (
            <div key={t.id || idx} className="w-full flex justify-center">
              <div className="group relative flex flex-col justify-between p-8 rounded-[24px] bg-slate-50/80 shadow-[0_10px_30px_rgba(15,43,92,0.06)] border border-slate-200/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,43,92,0.12)] hover:bg-white w-full max-w-[380px] min-h-[360px]">
                
                <div className="overflow-hidden">
                  <div className="text-[#ffc107] mb-2 text-4xl font-serif font-black leading-none select-none">“</div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal break-words overflow-hidden">
                    {t.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 mt-auto flex items-center gap-3.5">
                  {profileImg && (
                    <img src={profileImg} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0 shadow-sm" />
                  )}
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#0f2b5c] truncate">
                      {t.name}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5 truncate">
                      {t.role}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {testimonials.length > itemsPerPage && (
        <button 
          onClick={handleNext} 
          className="absolute -right-3 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-100 text-[#0f2b5c] border border-slate-200 flex items-center justify-center shadow-md hover:bg-[#ffc107] transition cursor-pointer"
          aria-label="Next"
        >
          →
        </button>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 z-20">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setFade(true);
                }, 200);
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${currentIndex === idx ? 'w-8 bg-[#ffc107]' : 'w-2.5 bg-slate-300'}`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home({ homeSetting, projects = [], branches = [], testimonials = [], activePoster, latestPosts = [] }) {
  const [showAll, setShowAll] = useState(false);

  // State & Timer 3 Detik untuk Popup Poster
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    if (activePoster) {
      const timer = setTimeout(() => {
        setShowPoster(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activePoster]);

  const getEmbedYouTubeUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed')) {
      return `${url}?autoplay=1&mute=1&loop=1&controls=0&playlist=${url.split('/embed/')[1]?.split('?')[0]}`;
    }
    let videoId = '';
    if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}` : url;
  };

  const staticStatistics = [
    { target: 5, suffix: "+", label: "Tahun Pengalaman", desc: "Melayani kebutuhan alat berat di berbagai proyek nasional." },
    { target: 500, suffix: "+", label: "Unit Terawat", desc: "Dukungan armada unit handal dan siap operasional." },
    { target: 200, suffix: "+", label: "Mekanik Bersertifikat", desc: "Tenaga ahli profesional di bidang perawatan alat berat." },
    { target: 99, suffix: "%", label: "Kepuasan Pelanggan", desc: "Komitmen memberikan pelayanan terbaik bagi mitra." },
    { target: 200, suffix: "+", label: "Professional", desc: "Tim solid yang berpengalaman menangani proyek besar." },
  ];

  const staticStrengths = [
    { label: "Tahun Pengalaman", desc: "Melayani kebutuhan alat berat di berbagai proyek nasional." },
    { label: "Unit Terawat", desc: "Dukungan armada unit handal dan siap operasional." },
    { label: "Mekanik Bersertifikat", desc: "Tenaga ahli profesional di bidang perawatan alat berat." },
    { label: "Kepuasan Pelanggan", desc: "Komitmen memberikan pelayanan terbaik bagi mitra." },
    { label: "Professional", desc: "Tim solid yang berpengalaman menangani proyek besar." },
  ];

  const staticFeaturedItems = [
    { id: 1, slug: "pelatihan-operator", title: "Pelatihan Operator", description: "Kami memberikan pelatihan khusus kepada operator anda untuk unit XCMG pertambangan...", image_path: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" },
    { id: 2, slug: "layanan-maintenance", title: "Heavy Equipment Maintenance & Overhaul", description: "Layanan pemeliharaan menyeluruh dan overhaul komponen alat berat...", image_path: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80" },
    { id: 3, slug: "suplai-suku-cadang", title: "Suplai Suku Cadang", description: "Ketersediaan suku cadang original XCMG lengkap dengan jaminan kualitas terbaik...", image_path: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80" },
    { id: 4, slug: "konsultasi-teknis", title: "Konsultasi Teknis", description: "Layanan konsultasi pemilihan unit dan analisis kebutuhan operasional proyek...", image_path: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80" },
  ];

  // Inisialisasi Peta Interaktif Leaflet Publik
  useEffect(() => {
    let mapInstance = null;

    const initMap = () => {
      if (window.L) {
        const mapContainer = document.getElementById('public-leaflet-map');
        if (mapContainer && !mapContainer._leaflet_id) {
          mapInstance = window.L.map('public-leaflet-map', {
            scrollWheelZoom: false
          }).setView([-2.5489, 118.0149], 5);

          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstance);

          branches.forEach((b) => {
            if (b.latitude && b.longitude) {
              const customIcon = window.L.divIcon({
                className: 'custom-map-marker',
                html: `<div style="background-color: #d92323; width: 18px; height: 18px; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 10px rgba(217,35,35,0.5);"></div>`,
                iconSize: [18, 18],
                iconAnchor: [9, 9]
              });

              window.L.marker([b.latitude, b.longitude], { icon: customIcon })
                .addTo(mapInstance)
                .bindPopup(`
                  <div style="font-family: inherit; padding: 6px; min-width: 190px; color: #0b2348;">
                    <span style="font-size: 9px; font-weight: 900; text-transform: uppercase; color: #b27b00; letter-spacing: 0.1em; display: block; margin-bottom: 2px;">
                      ${b.category}
                    </span>
                    <h4 style="font-weight: 900; color: #0b2348; margin-bottom: 4px; font-size: 13px;">
                      ${b.name} (${b.city})
                    </h4>
                    <p style="font-size: 11px; color: #475569; line-height: 1.4; margin-bottom: 8px;">
                      ${b.description}
                    </p>
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 6px; font-size: 11px; color: #0b2348;">
                      <div><b>Hotline:</b> <a href="tel:${b.phone}" style="color: #d92323; font-weight: bold; text-decoration: none;">${b.phone}</a></div>
                    </div>
                  </div>
                `);
            }
          });
        }
      }
    };

    const timer = setTimeout(initMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [branches]);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      <Head title="Home - PT. Servistama Pro Indonesia" />
      
      {/* 1. NAVBAR HEADER */}
      <Navbar />

      {/* 2. HERO BANNER DINAMIS */}
      <section id="home" className="relative w-full h-[550px] sm:h-[650px] lg:h-[720px] bg-slate-900 overflow-hidden pb-24">
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900">
          {homeSetting?.video_path ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={`/${homeSetting.video_path}`} type="video/mp4" />
            </video>
          ) : homeSetting?.youtube_url ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <iframe 
                src={getEmbedYouTubeUrl(homeSetting.youtube_url)} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full pointer-events-none scale-125" 
                allow="autoplay; encrypted-media" 
                title="Hero Video"
              />
            </div>
          ) : (
            <img src="/images/contact.jpg" alt="Heavy Equipment Banner" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
      </section>

      {/* 3. COMPANY INTRODUCTION & SERVICES */}
      <section id="about" className="relative w-full bg-[#f8fafc]/60 overflow-hidden pt-20 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-700 bg-slate-200/80 px-3.5 py-1.5 rounded-full border border-slate-300 uppercase tracking-wider">
                  LAYANAN KAMI
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0f2b5c] leading-[1.12] mb-5 tracking-tight">
                Solusi Tepat untuk <br />
                <span className="text-[#ffc107]">Setiap Kebutuhan Anda</span>
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-normal max-w-xl">
                Kami hadir dengan berbagai layanan untuk mendukung produktivitas alat berat Anda agar tetap optimal di setiap pekerjaan.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80">
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">Berpengalaman</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Lebih dari 10 tahun melayani berbagai industri</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">Profesional</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Tim ahli dan bersertifikasi di bidangnya</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">Terpercaya</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Layanan berkualitas dengan komitmen terbaik</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full h-[380px] sm:h-[440px] rounded-[40px] overflow-hidden shadow-xl border border-slate-200/60 group">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/layanan-kami.png')` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 3 CARD LAYANAN BESAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('/images/suku-cadang.jpg')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />
              <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
                <h3 className="font-black text-xl text-white drop-shadow-md mb-1">Suku Cadang</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                  <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">Suku cadang original dengan kualitas terjamin dan bergaransi.</p>
                  <Link href="/spare-parts" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">Selengkapnya <span>→</span></Link>
                </div>
              </div>
            </div>

            <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('/images/layanan-purnajual.jpg')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />
              <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
                <h3 className="font-black text-xl text-white drop-shadow-md mb-1">Layanan Purna Jual</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                  <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">Perawatan dan perbaikan alat berat oleh teknisi berpengalaman.</p>
                  <Link href="/services" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">Selengkapnya <span>→</span></Link>
                </div>
              </div>
            </div>

            <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('/images/kemitraan.jpg')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />
              <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
                <h3 className="font-black text-xl text-white drop-shadow-md mb-1">Kemitraan</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                  <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">Bersinergi bersama mitra untuk pertumbuhan berkelanjutan.</p>
                  <Link href="/contact-us" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">Selengkapnya <span>→</span></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/services" className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#0f2b5c] text-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white font-bold text-xs rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              <span>Lihat Semua Layanan</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. SECTION COMPANY STATISTICS */}
      <section id="statistics" className="relative w-full bg-[#0f2b5c] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-80 pointer-events-none" style={{ backgroundImage: `url('/images/statistik.png')` }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Rekam Jejak &{' '}
              <span className="relative inline-block mx-1">
                <span className="absolute inset-0 bg-gradient-to-r from-[#ffc107] via-amber-400 to-[#ffc107] -skew-x-6 -rotate-1 rounded-2xl shadow-sm shadow-amber-500/20"></span>
                <span className="relative text-[#0f2b5c] px-4 py-0.5 z-10 font-black">Statistik</span>
              </span> <br />
              Perusahaan
            </h2>
            <p className="text-white text-xs md:text-sm mt-4 font-normal leading-relaxed max-w-2xl mx-auto">
              Komitmen kami dalam memberikan layanan terbaik bagi sektor pertambangan dan konstruksi di seluruh Indonesia.
            </p>
          </div> 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {staticStatistics.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center pt-6 lg:pt-0 lg:px-3 group">
                <div className="relative w-44 h-44 rounded-full border-4 border-white/10 border-t-[#ffc107] border-r-[#ffc107] p-2 flex flex-col items-center justify-center bg-[#0f2b5c]/40 backdrop-blur-sm shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl sm:text-4xl font-black text-white leading-none mb-1.5">
                    <AnimatedCounter targetNumber={item.target} suffix={item.suffix} />
                  </div>
                  <div className="text-xs font-bold text-[#ffc107] px-2">{item.label}</div>
                </div>
                <p className="text-white text-xs leading-relaxed mt-4 max-w-[180px]">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {["Terpercaya & Profesional", "Layanan Cepat & Tepat", "Mitra Jangka Panjang"].map((text, i) => (
              <div key={i} className="px-5 py-2.5 bg-[#0f2b5c]/50 backdrop-blur-md border border-white/20 rounded-full flex items-center shadow-sm">
                <span className="text-xs font-bold text-white">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION COMPANY STRENGTH */}
      <section id="strength" className="relative w-full bg-[#f8fafc]/80 py-24 overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">COMPANY STRENGTH</span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              Kekuatan Kami, <span className="text-[#ffc107]">Komitmen Kami</span>
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-4 font-normal leading-relaxed max-w-xl mx-auto">
              Dengan pengalaman, sumber daya, dan dedikasi tinggi, kami siap menjadi mitra terbaik dalam setiap proyek Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
            {staticStrengths.map((item, i) => (
              <div key={i} className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0f2b5c]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
                <div className="w-full h-1 bg-[#0f2b5c] absolute bottom-0 left-0"></div>
                <div>
                  <h3 className="font-bold text-xs text-[#0f2b5c] uppercase tracking-wider mb-3">{item.label}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden">
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[360px] overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/mengapa-memilihkami.jpg')` }}></div>
            </div>
            <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center bg-white pr-12">
              <h3 className="text-2xl font-black text-[#0f2b5c] mb-2">Mengapa Memilih Kami?</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8 max-w-xl">
                Kami tidak hanya menyediakan layanan, tetapi juga menghadirkan nilai tambah melalui kualitas, inovasi, dan komitmen berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* 6. SECTION FEATURED SERVICES */}
      <section id="featured-services" className="relative w-full py-24 overflow-hidden border-b border-slate-800 bg-[#0f2b5c]">
        {/* Latar Belakang Section Menggunakan Foto featured-service.jpg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src="/images/featured-service.jpg" alt="Featured Services Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0f2b5c]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">OUR SERVICES</span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Featured <span className="text-[#ffc107]">Services</span>
            </h2>
            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>
            <p className="text-slate-200 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Kami menyediakan berbagai layanan unggulan untuk mendukung kebutuhan proyek pertambangan dan konstruksi Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                id: 1,
                slug: "pelatihan-operator",
                title: "Pelatihan Operator",
                description: "Kami memberikan pelatihan khusus kepada operator anda untuk unit XCMG pertambangan...",
                image_path: "/images/featured-service1.jpg"
              },
              {
                id: 2,
                slug: "layanan-maintenance",
                title: "Heavy Equipment Maintenance & Overhaul",
                description: "Layanan pemeliharaan menyeluruh dan overhaul komponen alat berat...",
                image_path: "/images/featured-service2.jpg"
              },
              {
                id: 3,
                slug: "suplai-suku-cadang",
                title: "Suplai Suku Cadang",
                description: "Ketersediaan suku cadang original XCMG lengkap dengan jaminan kualitas terbaik...",
                image_path: "/images/featured-service3.jpg"
              },
              {
                id: 4,
                slug: "konsultasi-teknis",
                title: "Konsultasi Teknis",
                description: "Layanan konsultasi pemilihan unit dan analisis kebutuhan operasional proyek...",
                image_path: "/images/featured-service4.jpg"
              }
            ].map((srv) => (
              <div key={srv.id} className="group relative h-[360px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/40 bg-slate-900 transition-all duration-500 hover:-translate-y-2">
                <img src={srv.image_path} alt={srv.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white bg-[#0f2b5c]/90 backdrop-blur-sm translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#ffc107] mb-1">LAYANAN UNGGULAN</span>
                  <h3 className="text-base font-extrabold text-white leading-snug mb-2">{srv.title}</h3>
                  <div className="w-8 h-[2px] bg-[#ffc107] mb-3 rounded-full" />
                  <p className="text-slate-200 text-xs leading-relaxed mb-5 line-clamp-3">{srv.description}</p>
                  <Link href={`/featured-services/${srv.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#ffc107]">Pelajari Selengkapnya →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION CUSTOMER TESTIMONIALS (DINAMIS DARI DATABASE) */}
      <section id="testimonials" className="relative w-full overflow-hidden bg-white py-24 md:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 xl:px-14">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="h-[2px] w-8 bg-[#ffc107]"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffc107]">CUSTOMER TESTIMONIALS</span>
              <span className="h-[2px] w-8 bg-[#ffc107]"></span>
            </div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[#0f2b5c] sm:text-4xl md:text-5xl">
              Apa Kata <span className="text-[#ffc107]">Mereka?</span>
            </h2>
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#ffc107]"></div>
            <p className="mx-auto mt-5 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600">
              Kepercayaan pelanggan adalah bagian penting dari perjalanan kami. Berikut pengalaman mereka bekerja sama dengan tim kami.
            </p>
          </div>
          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>

      {/* 8. SECTION PROJECT GALLERY (DINAMIS DATABASE + BACKGROUND STATIS) */}
      <section id="projects" className="relative w-full text-slate-800 py-24 overflow-hidden border-b border-slate-200 bg-[#0f2b5c]">
        {/* Latar Belakang Section (Statis dengan foto kita.jpg & overlay biru semi-transparan tanpa blur) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src="/images/back-project.png" alt="Projects Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0f2b5c]/50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14"> 
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Proyek yang Telah <span className="text-[#ffc107]">Kami Kerjakan</span>
            </h2>
            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-6 rounded-full"></div>
            <p className="text-slate-200 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Berbagai proyek konstruksi dan pertambangan yang telah kami selesaikan dengan standar kualitas tinggi dan komitmen terbaik.
            </p>
          </div>

          {/* Grid Proyek Tetap Dinamis Mengambil dari Database */}
          {projects.length === 0 ? (
            <p className="text-center text-slate-300 text-xs">Belum ada proyek yang ditambahkan.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((proj, idx) => {
                if (!showAll && idx >= 6) return null;
                return (
                  <div key={proj.id || idx} className="group relative h-[260px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/40 bg-slate-900 transition-all duration-500 hover:-translate-y-2">
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                      style={{ backgroundImage: `url('/${proj.image}')` }}
                      loading="lazy"
                    ></div>
                    <div className="absolute inset-x-0 bottom-0 top-1/2 z-10 flex flex-col justify-end p-5 text-slate-900 bg-white/95 backdrop-blur-md translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2 leading-snug line-clamp-1">{proj.title}</h3>
                      <div className="w-8 h-[2px] bg-[#ffc107] mb-2.5 rounded-full"></div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span>{proj.location}</span>
                        <span>{proj.year}</span> 
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {projects.length > 6 && (
            <div className="text-center">
              <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ffc107] text-[#0f2b5c] font-bold text-xs rounded-full transition-all duration-300 shadow-md cursor-pointer">
                <span>{showAll ? "Tutup Sebagian Proyek" : "Lihat Semua Proyek"}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 9. SECTION LATEST NEWS (BERITA TERBARU - TERHUBUNG DINAMIS DARI DATABASE KNOWLEDGE) */}
      <section id="news" className="relative w-full bg-white text-slate-800 py-24 overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">LATEST NEWS</span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              Berita <span className="text-[#ffc107]">Terbaru</span>
            </h2>
            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>
            <p className="text-slate-600 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Dapatkan informasi terbaru seputar kegiatan perusahaan, proyek, inovasi, dan berbagai update lainnya.
            </p>
          </div>

          <div className="flex justify-end mb-16 border-b border-slate-200/80 pb-6">
            <Link href="/knowledge" className="text-xs font-extrabold text-[#0f2b5c] hover:text-amber-600 transition flex items-center gap-1.5 shrink-0">
              <span>Lihat Semua Berita</span>
              <span>→</span>
            </Link>
          </div>

          {latestPosts.length === 0 ? (
            <p className="text-center text-slate-400 text-xs py-10">Belum ada berita atau artikel knowledge terbaru.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Berita Utama (index 0) */}
              <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-10 group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 z-0" 
                  style={{ backgroundImage: `url('${latestPosts[0].thumbnail ? `/${latestPosts[0].thumbnail}` : 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80'}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent z-10"></div>
                <div className="relative z-20 text-white">
                  <span className="text-xs text-slate-300 block mb-2">
                    {new Date(latestPosts[0].created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3">{latestPosts[0].title}</h3>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 max-w-xl line-clamp-2">{latestPosts[0].excerpt || latestPosts[0].content}</p>
                  <Link href={`/knowledge/${latestPosts[0].id}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#ffc107]">Baca Selengkapnya →</Link>
                </div>
              </div>

              {/* Berita Samping (index 1 & 2) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                {latestPosts.slice(1, 3).map((post) => (
                  <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 group">
                    <div className="flex items-center gap-4">
                      <img 
                        src={post.thumbnail ? `/${post.thumbnail}` : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80'} 
                        alt={post.title} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md shrink-0" 
                      />
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">
                          {new Date(post.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </span>
                        <h4 className="font-extrabold text-xs text-[#0f2b5c] group-hover:text-amber-600 transition leading-snug line-clamp-1">{post.title}</h4>
                        <p className="text-slate-500 text-[10px] line-clamp-1 mt-1">{post.excerpt || post.content}</p>
                      </div>
                    </div>
                    <Link href={`/knowledge/${post.id}`} className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0">→️</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. SECTION KONTAK & ALAMAT KAMI */}
      <section id="contact" className="relative w-full py-24 overflow-hidden border-b border-slate-200 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(7,27,56,0.10), rgba(7,27,56,0.95)), url('/images/kontak-alamat.jpg')" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">GET IN TOUCH</span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Kontak & <span className="text-[#ffc107]">Alamat Kami</span>
            </h2>
            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-6 rounded-full"></div>
            <p className="text-white text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Kunjungi kantor pusat kami atau hubungi tim layanan pelanggan kami untuk informasi lebih lanjut mengenai produk dan layanan alat berat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Alamat Kantor Pusat</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-line">
                  Foresta Business Loft 7, Unit 6-7{'\n'}Jl. BSD Boulevard Utara, Lengkong Kulon, Tangerang, Banten 15331
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a href="https://maps.app.goo.gl/vhd1bVxrsv2YdCfH9" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">Lihat Maps →</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Jam Operasional</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-line">Senin - Jumat: 09.00 - 18.00</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400">Dukungan 24/7 Darurat</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Informasi Kontak</h3>
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <p>Hotline: <span className="font-medium text-[#0f2b5c]">+62 822-5801-3177</span></p>
                  <p>Email: <span className="font-medium text-[#0f2b5c]">info@servistamapro.com</span></p>
                  
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a href="mailto:info@servistamapro.com" className="text-[11px] font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">Kirim Email →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. SECTION BRANCH OFFICE & LEAFLET MAP (DINAMIS) */}
      <section id="operational-area" className="relative w-full bg-white text-[#0b2348] overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src="/images/branch.jpg" alt="Operational Area Background" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/85" />
        </div>

        <div className="relative z-10 max-w-[1450px] mx-auto px-6 md:px-10 xl:px-14 py-20 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div className="max-w-[720px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-[2px] bg-[#ffc107]" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-[#b27b00]">BRANCH OFFICE & NETWORK</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.05] text-[#0b2348]">
                Operational Area<br />
                <span className="text-[#b27b00]">& Branch Distribution</span>
              </h2>
              <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-[650px]">
                Dengan pengalaman lebih dari 10 tahun, kami terus memperluas jaringan layanan, workshop, dan dukungan teknis ke berbagai wilayah strategis di Indonesia.
              </p>
            </div>
          </div>

          <div className="relative w-full min-h-[500px] md:min-h-[580px] lg:min-h-[630px] flex items-center justify-center my-6">
            <div className="absolute w-[60%] max-w-[850px] h-[260px] rounded-[50%] bg-[#ffc107]/10 blur-[80px] pointer-events-none" />
            <div className="relative w-full max-w-[1200px] h-[500px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <div id="public-leaflet-map" className="w-full h-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP POSTER MODAL (CLEAN, TANPA BLUR, UKURAN MENGIKUTI ASLI) */}
      {showPoster && activePoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative max-w-fit max-h-[90vh] flex items-center justify-center">
            <button 
              onClick={() => setShowPoster(false)}
              className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-slate-900/90 text-white hover:bg-red-600 flex items-center justify-center font-bold text-sm transition shadow-lg cursor-pointer"
              aria-label="Close Poster"
            >
              ✕
            </button>
            <img 
              src={`/${activePoster.image_path}`} 
              alt="Popup Poster" 
              className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl" 
            />
          </div>
        </div>
      )}

      {/* 12. FOOTER */}
      <Footer />
    </div>
  );
}