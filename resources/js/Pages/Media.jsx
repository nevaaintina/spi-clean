import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* =========================================================
   INLINE SVG ICONS
========================================================= */
const IconCamera = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h7l1 1.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconWrench = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6L4 16.2V20h3.8l5.3-5.3a4 4 0 0 0 4.6-5.4l-2.6 2.6-2.2-2.2 2.6-2.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const IconExcavator = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 19h9M5 19v-4h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15 15 6l3 1.5-4.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 7.5 21 9l-2 3-2.5-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="19" r="1.3" fill="currentColor" />
  </svg>
);

const IconUsers = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="16.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14.5 14.3c2.6.2 4.5 2.2 4.5 4.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconGraduation = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M6.5 10.7v4c0 1.3 2.5 2.3 5.5 2.3s5.5-1 5.5-2.3v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 8.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconHandshake = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 12.5 6 9l3.5 2.5L12 9l2 1.7L18 8l4 4.2-3.3 3.3-2-1.7-2.3 2.2-2.4-1.9-2.3 2.1L6 13.3l-4-.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const IconCalendar = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 10h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

const IconDrone = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9.8 9.8 5 5M14.2 9.8 19 5M9.8 14.2 5 19M14.2 14.2 19 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconPlay = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

const IconGrid = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconRefresh = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8M20 8V4M20 8h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12a8 8 0 0 1-13.7 5.7L4 16M4 16v4M4 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPhoto = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="m5 17 4.5-4.5 3 3L17 11l3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconVideo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="m16.5 10 4.5-2.5v9L16.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IconShield = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const CATEGORIES = [
  { id: 'Photo Gallery', label: 'Photo Gallery', number: '01.', icon: IconCamera },
  { id: 'Workshop', label: 'Workshop', number: '02.', icon: IconWrench },
  { id: 'Mining Site', label: 'Mining Site', number: '03.', icon: IconExcavator },
  { id: 'Customer Visit', label: 'Customer Visit', number: '04.', icon: IconUsers },
  { id: 'Training', label: 'Training', number: '05.', icon: IconGraduation },
  { id: 'CSR/TJSL', label: 'CSR/TJSL', number: '06.', icon: IconHandshake },
  { id: 'Company Event', label: 'Company Event', number: '07.', icon: IconCalendar },
  { id: 'Drone Video', label: 'Drone Video', number: '08.', icon: IconDrone },
];

const MediaCard = ({ item, onImageClick }) => {
  const filePath = item.file_path ? (item.file_path.startsWith('http') ? item.file_path : `/${item.file_path}`) : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
  const isVideo = item.media_type?.toLowerCase().includes('video') || filePath.endsWith('.mp4') || filePath.endsWith('.mov') || filePath.endsWith('.avi');

  return (
    <div className="relative overflow-hidden rounded-lg group h-72 sm:h-80 shadow-md bg-slate-900 flex items-center justify-center">
      {isVideo ? (
        <video
          src={filePath}
          className="absolute inset-0 h-full w-full object-cover"
          controls
        />
      ) : (
        <img
          src={filePath}
          alt={item.title || "Media gallery item"}
          onClick={() => onImageClick(filePath, item.title || item.category)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          title="Klik untuk memperbesar foto"
        />
      )}

      {!isVideo && (
        <div 
          onClick={() => onImageClick(filePath, item.title || item.category)}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/85 text-white p-2 rounded-xl backdrop-blur-xs z-20 cursor-pointer shadow-lg"
          title="Lihat Foto Full"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      )}

      <div 
        onClick={() => !isVideo && onImageClick(filePath, item.title || item.category)}
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 z-10 cursor-pointer pointer-events-none"
      >
        <div className="pointer-events-auto">
          <p className="text-white text-sm font-bold">{item.title || item.category}</p>
          {item.description && <p className="text-white/80 text-xs mt-1 line-clamp-1">{item.description}</p>}
        </div>
      </div>
    </div>
  );
};

// Komponen Counter dengan Animasi Angka Bergerak
const CounterItem = ({ icon: Icon, targetValue, label }) => {
  const safeTargetVal = String(targetValue ?? '0');
  const numericTarget = parseInt(safeTargetVal, 10) || 0;
  const suffix = safeTargetVal.replace(/[0-9]/g, '');

  const [count, setCount] = useState(1);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 1;
          const duration = 1500;
          const steps = 30;
          const increment = Math.max(1, Math.floor((numericTarget - 1) / steps));
          const stepTime = Math.floor(duration / steps);

          const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
              setCount(numericTarget);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [numericTarget]);

  return (
    <div ref={ref} className="flex items-center gap-3 px-4 py-6 sm:py-0">
      <Icon className="h-7 w-7 text-[#F5B800]" />
      <div className="text-left">
        <p className="text-2xl font-bold text-[#F5B800] leading-none">
          {numericTarget > 0 ? `${count}${suffix}` : targetValue}
        </p>
        <p className="text-xs text-gray-300 mt-1">{label}</p>
      </div>
    </div>
  );
};

export default function Media({ mediaGalleries = [] }) {
  const [activeCategory, setActiveCategory] = useState('Photo Gallery');
  const [visibleCount, setVisibleCount] = useState(6);
  const [modalImage, setModalImage] = useState(null);

  const fallbackMediaItems = [
    { id: 1, category: 'Photo Gallery', title: 'Heavy Equipment Showcase', description: 'Unit alat berat siap operasional di lapangan.', file_path: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
    { id: 2, category: 'Photo Gallery', title: 'Hydraulic System Check', description: 'Pemeriksaan rutin komponen hidrolik.', file_path: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' },
    { id: 3, category: 'Photo Gallery', title: 'On-Site Technical Support', description: 'Dukungan teknisi profesional langsung di site.', file_path: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' },
    { id: 4, category: 'Photo Gallery', title: 'Spare Parts Management', description: 'Gudang penyimpanan suku cadang original.', file_path: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
    { id: 5, category: 'Photo Gallery', title: 'Mining Fleet Operation', description: 'Operasional armada di area pertambangan.', file_path: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' },
    { id: 6, category: 'Photo Gallery', title: 'Engine Maintenance', description: 'Perawatan mesin berat secara berkala.', file_path: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
    { id: 7, category: 'Workshop', title: 'Workshop Overhaul Area', description: 'Fasilitas perbaikan dan overhaul mesin berat.', file_path: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
    { id: 8, category: 'Mining Site', title: 'Open Pit Mining Operation', description: 'Aktivitas pertambangan skala besar di Kalimantan.', file_path: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' },
    { id: 9, category: 'Customer Visit', title: 'Kunjungan Klien Korporat', description: 'Diskusi strategis bersama mitra bisnis.', file_path: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
    { id: 10, category: 'Training', title: 'Pelatihan Operator XCMG', description: 'Sesi pelatihan teori dan praktik bagi operator.', file_path: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' },
    { id: 11, category: 'CSR/TJSL', title: 'Program Sosial Perusahaan', description: 'Kontribusi nyata bagi masyarakat sekitar wilayah operasional.', file_path: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80' },
    { id: 12, category: 'Company Event', title: 'Annual Gathering SPI', description: 'Acara kebersamaan seluruh karyawan dan manajemen.', file_path: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
    { id: 13, category: 'Drone Video', title: 'Aerial Survey Project', description: 'Pemantauan udara area proyek konstruksi.', file_path: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80' },
  ];

  const activeMediaList = mediaGalleries && mediaGalleries.length > 0 ? mediaGalleries : fallbackMediaItems;

  const getRandomStoryImages = () => {
    const shuffled = [...activeMediaList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [randomStoryImages] = useState(getRandomStoryImages);

  const droneVideoList = activeMediaList.filter(item => 
    item.category?.trim().toLowerCase() === 'drone video'
  );

  const fallbackDroneVideos = [
    { id: 1, title: 'Overview Area Pertambangan Kalimantan', description: 'Kalimantan Timur', file_path: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=85' },
    { id: 2, title: 'Inspeksi Udara Fleet Alat Berat', description: 'Site Project A', file_path: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=85' },
    { id: 3, title: 'Dokumentasi Workshop & Warehouse', description: 'Head Office Tangerang', file_path: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=85' },
  ];

  const activeDroneList = droneVideoList.length > 0 ? droneVideoList : fallbackDroneVideos;

  const getRandomDroneVideos = () => {
    const shuffled = [...activeDroneList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [randomDroneVideos] = useState(getRandomDroneVideos);

  const [selectedMainVideo, setSelectedMainVideo] = useState(null);
  const currentMainVideo = selectedMainVideo || randomDroneVideos[0] || null;
  const sideDroneVideos = randomDroneVideos.filter(vid => vid.id !== currentMainVideo?.id);

  // Perhitungan Otomatis Statistik
  const totalPhotos = activeMediaList.filter(item => {
    const cat = item.category?.trim().toLowerCase() || '';
    const path = item.file_path || '';
    const isVid = item.media_type?.toLowerCase().includes('video') || path.endsWith('.mp4') || path.endsWith('.mov') || path.endsWith('.avi');
    return !isVid && cat !== 'drone video';
  }).length;

  const totalDroneVideos = activeMediaList.filter(item => {
    const cat = item.category?.trim().toLowerCase() || '';
    const path = item.file_path || '';
    const isVid = item.media_type?.toLowerCase().includes('video') || path.endsWith('.mp4') || path.endsWith('.mov') || path.endsWith('.avi');
    return isVid || cat === 'drone video';
  }).length;

  const statistics = [
    { icon: IconPhoto, targetValue: `${totalPhotos}+`, label: 'Photo Documentation' },
    { icon: IconVideo, targetValue: `${totalDroneVideos}+`, label: 'Video Drone' },
    { icon: IconCalendar, targetValue: '99%', label: 'Kepuasan Pelanggan' },
    { icon: IconShield, targetValue: '100%', label: 'Commitment' },
  ];

  const filteredMedia = activeMediaList.filter(item => {
    const itemCat = item.category?.trim().toLowerCase() || '';
    const activeCat = activeCategory.trim().toLowerCase();

    if (activeCat === 'csr/tjsl') {
      return itemCat === 'csr' || itemCat === 'csr/tjsl';
    }
    return itemCat === activeCat;
  });
  
  const displayedMedia = filteredMedia.slice(0, visibleCount);

  return (
    <>
      <Head title="Media Gallery - PT. Servistama Pro Indonesia" />
      <Navbar />

      <div className="bg-white">
        {/* ============ 1. HERO SECTION ============ */}
        <section className="relative flex min-h-screen w-full items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero-media.png"
              alt="Heavy equipment technician"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D] via-[#0B1E3D]/85 to-[#0B1E3D]/20" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 sm:py-40 lg:pl-24">
            <p className="text-sm font-semibold tracking-wide text-[#F5B800]">
              MEDIA GALLERY
            </p>
            <p className="mt-3 text-base text-white/90">
              Visual Stories. Real Service. Real Performance.
            </p>

            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Behind Every Machine, There Is a Story of Performance.
            </h1>

            <span className="mt-6 block h-1 w-14 bg-[#F5B800]" />

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
              Jelajahi dokumentasi aktivitas PT. Servistama Pro Indonesia dalam menghadirkan layanan heavy equipment, maintenance, customer support, training dan smart service solution.
            </p>
          </div>
        </section>

        {/* ============ 2. CATEGORY TABS ============ */}
        <section className="relative z-10 -mt-8 sm:-mt-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-t-2xl bg-white p-6 shadow-xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {CATEGORIES.map((cat) => {
                  const IconComponent = cat.icon;
                  const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setVisibleCount(6);
                      }}
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#FFC107] text-[#0F2B5C] shadow-md'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 hover:text-[#0F2B5C]'
                      }`}
                    >
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                      <span className="text-xs font-bold tracking-wide">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. FEATURED STORY ============ */}
        <section className="bg-white py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-center">
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-700">FEATURED STORY</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-[#0B1E3D] sm:text-3xl">
                  Maintenance Excellence at <span className="text-[#F5B800]">Mining Site</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Dokumentasi visual terpilih dari aktivitas operasional di lapangan secara acak.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {randomStoryImages[0] && (
                  <div 
                    onClick={() => {
                      const path = randomStoryImages[0].file_path;
                      const fullUrl = path.startsWith('http') ? path : `/${path}`;
                      setModalImage({ url: fullUrl, title: randomStoryImages[0].title || 'Featured Story 1' });
                    }}
                    className="relative col-span-1 row-span-2 overflow-hidden rounded-lg h-72 bg-slate-100 cursor-pointer group"
                  >
                    <img 
                      src={randomStoryImages[0].file_path.startsWith('http') ? randomStoryImages[0].file_path : `/${randomStoryImages[0].file_path}`} 
                      alt={randomStoryImages[0].title || "Story 1"} 
                      className="h-full w-full object-cover group-hover:scale-105 transition" 
                    />
                  </div>
                )}
                {randomStoryImages[1] && (
                  <div 
                    onClick={() => {
                      const path = randomStoryImages[1].file_path;
                      const fullUrl = path.startsWith('http') ? path : `/${path}`;
                      setModalImage({ url: fullUrl, title: randomStoryImages[1].title || 'Featured Story 2' });
                    }}
                    className="overflow-hidden rounded-lg h-[138px] bg-slate-100 cursor-pointer group"
                  >
                    <img 
                      src={randomStoryImages[1].file_path.startsWith('http') ? randomStoryImages[1].file_path : `/${randomStoryImages[1].file_path}`} 
                      alt={randomStoryImages[1].title || "Story 2"} 
                      className="h-full w-full object-cover group-hover:scale-105 transition" 
                    />
                  </div>
                )}
                {randomStoryImages[2] && (
                  <div 
                    onClick={() => {
                      const path = randomStoryImages[2].file_path;
                      const fullUrl = path.startsWith('http') ? path : `/${path}`;
                      setModalImage({ url: fullUrl, title: randomStoryImages[2].title || 'Featured Story 3' });
                    }}
                    className="overflow-hidden rounded-lg h-[138px] bg-slate-100 cursor-pointer group"
                  >
                    <img 
                      src={randomStoryImages[2].file_path.startsWith('http') ? randomStoryImages[2].file_path : `/${randomStoryImages[2].file_path}`} 
                      alt={randomStoryImages[2].title || "Story 3"} 
                      className="h-full w-full object-cover group-hover:scale-105 transition" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 4. MEDIA FILTER BAR ============ */}
        <section className="border-t border-gray-100 bg-white py-6">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button className="flex items-center gap-2 rounded-md bg-[#0B1E3D] px-4 py-2 text-xs font-semibold text-white">
                <IconGrid />
                {activeCategory.toUpperCase()}
              </button>
              <span className="text-xs font-medium text-gray-500">
                Menampilkan {displayedMedia.length} dari {filteredMedia.length} item
              </span>
            </div>
          </div>
        </section>

        {/* ============ 5. MEDIA GRID ============ */}
        <section className="bg-white pb-12">
          <div className="mx-auto max-w-7xl px-6">
            {displayedMedia.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedMedia.map((item) => (
                  <MediaCard 
                    key={item.id} 
                    item={item} 
                    onImageClick={(url, title) => setModalImage({ url, title })} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                Belum ada media yang diunggah untuk kategori <span className="font-bold text-[#0B1E3D]">"{activeCategory}"</span>.
              </div>
            )}

            {visibleCount < filteredMedia.length && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="flex items-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-[#0B1E3D] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Load More Media
                  <IconRefresh />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ============ 6. STATS BAR (ANIMASI COUNTER) ============ */}
        <section className="bg-[#0B1E3D] py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
              {statistics.map((stat, index) => (
                <CounterItem key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7. DRONE VIDEO HIGHLIGHT ============ */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.8fr)] items-center">
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-700">DRONE VIDEO HIGHLIGHT</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-[#0B1E3D] sm:text-3xl">
                  See the <span className="text-[#F5B800]">Bigger Picture</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Dokumentasi udara dari berbagai project dan aktivitas kami di seluruh Indonesia.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
                {currentMainVideo ? (
                  <div key={currentMainVideo.id} className="relative overflow-hidden rounded-lg h-72 bg-slate-900 shadow-md flex items-center justify-center">
                    <video 
                      src={currentMainVideo.file_path.startsWith('http') ? currentMainVideo.file_path : `/${currentMainVideo.file_path}`} 
                      className="absolute inset-0 h-full w-full object-cover" 
                      controls
                      autoPlay
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white pointer-events-none p-2">
                      <div>
                        <p className="text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">{currentMainVideo.title}</p>
                        <p className="text-xs text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{currentMainVideo.description || 'Drone Footage'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-72 bg-slate-50 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-4">
                    Belum ada video utama drone.
                  </div>
                )}

                {/* Sisi Kanan: Daftar video yang bisa diklik untuk diputar di kiri */}
                <div className="flex flex-col justify-center gap-4">
                  {sideDroneVideos.length > 0 ? (
                    sideDroneVideos.map((vid) => (
                      <div 
                        key={vid.id} 
                        onClick={() => setSelectedMainVideo(vid)}
                        className="flex items-center gap-3 group bg-slate-50 p-2.5 rounded-lg border border-slate-100 shadow-xs cursor-pointer hover:border-[#F5B800] transition"
                        title="Klik untuk putar video ini"
                      >
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-slate-900 flex items-center justify-center">
                          <video 
                            src={vid.file_path.startsWith('http') ? vid.file_path : `/${vid.file_path}`} 
                            className="h-full w-full object-cover pointer-events-none" 
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                            <IconPlay className="w-4 h-4 text-white" />
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#0B1E3D] group-hover:text-[#F5B800] transition-colors line-clamp-1">
                            {vid.title}
                          </p>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            {vid.description || 'Drone Footage'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400 italic p-4 text-center border border-dashed rounded-lg bg-slate-50">
                      Belum ada video drone tambahan.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============ MODAL LIGHTBOX UNTUK FOTO FULL ============ */}
      {modalImage && (
        <div 
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 w-10 h-10 flex items-center justify-center font-bold text-lg transition cursor-pointer"
            >
              &times;
            </button>
            <img 
              src={modalImage.url} 
              alt={modalImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
            />
            <p className="text-white text-sm font-semibold mt-4 text-center">{modalImage.title}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}