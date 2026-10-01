import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

// 1. KOMPONEN HERO BANNER (DURASI MASUK LAMA & TEGAS)
function AnimatedHeroBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative h-screen w-full flex items-center justify-start overflow-hidden border-b-2 border-slate-300">
            {/* Background Zoom-Out Halus */}
            <img 
                src="/images/hero-esg.png" 
                alt="Hero HSE Background"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] ease-[cubic-bezier(0.12,1,0.2,1)] ${
                    isVisible ? 'scale-100' : 'scale-115'
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full pt-16">
                <div 
                    className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.12,1,0.2,1)] ${
                        isVisible 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-24 scale-95'
                    }`}
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight drop-shadow-2xl leading-tight text-[#0284c7]">
                        Safety First
                    </h1>
                </div>

                <div 
                    className={`transition-all duration-[2200ms] delay-300 ease-[cubic-bezier(0.12,1,0.2,1)] ${
                        isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-20'
                    }`}
                >
                    <p className="mt-4 text-base sm:text-xl text-slate-100 max-w-2xl font-light leading-relaxed drop-shadow">
                        Prioritas utama PT Servistama Pro Indonesia adalah keselamatan setiap pekerja, kepatuhan regulasi lingkungan, dan kesehatan operasional tanpa kompromi.
                    </p>
                </div>
            </div>
        </section>
    );
}

// 2. KOMPONEN 8 SECTION PROGRAM (DURASI MASUK 2 DETIK LEBIH - SANGAT KELIHATAN & TEGAS)
function AnimatedHseSection({ program, isEven }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.15,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 sm:px-12 lg:px-16 overflow-hidden"
        >
            {/* 1. Background Image Full Screen */}
            <img 
                src={program.bgImage} 
                alt={`Background ${program.heading}`}
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* 2. White Overlay Tipis */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-[1]" />

            {/* 3. Gradient Blend Seamless Antar Section */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-[2] pointer-events-none opacity-90" />

            {/* 4. Konten dengan Durasi Masuk 2000ms - 2200ms */}
            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className={`flex flex-col lg:items-center gap-12 lg:gap-20 ${
                    isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}>
                    
                    {/* ANIMASI FOTO: Durasi 2000ms, Meluncur Jauh */}
                    <div 
                        className={`w-full lg:w-1/2 flex justify-center transition-all duration-[2000ms] ease-[cubic-bezier(0.12,1,0.2,1)] ${
                            isVisible 
                                ? 'opacity-100 translate-x-0 scale-100' 
                                : isEven 
                                    ? 'opacity-0 translate-x-36 scale-90' 
                                    : 'opacity-0 -translate-x-36 scale-90'
                        }`}
                    >
                        <div className="relative w-full max-w-[500px] p-6 sm:p-8">
                            {/* Garis Aksen Kuning Di Luar Foto */}
                            <svg 
                                className={`absolute -top-1 -bottom-1 ${isEven ? '-right-1 -left-3' : '-left-1 -right-3'} h-[calc(100%+8px)] w-[calc(100%+16px)] pointer-events-none transition-transform duration-1000 ease-in-out ${
                                    isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                                }`}
                                viewBox="0 0 530 430" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                            >
                                <path 
                                    d="M 40 16 C 16 16 16 40 16 70 V 350 C 16 380 40 404 70 404 H 460 C 490 404 514 380 514 350 V 70 C 514 40 490 16 460 16 H 120" 
                                    stroke="#ffc107" 
                                    strokeWidth="4" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>

                            {/* Kotak Foto Utama */}
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200 group z-10">
                                <img 
                                    src={program.image} 
                                    alt={program.heading}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ANIMASI TEKS: Durasi 2200ms, Naik Perlahan */}
                    <div 
                        className={`w-full lg:w-1/2 flex flex-col justify-center transition-all duration-[2200ms] delay-200 ease-[cubic-bezier(0.12,1,0.2,1)] ${
                            isVisible 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-28'
                        }`}
                    >
                        <h2 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-[#0f2b5c] leading-tight mb-6">
                            {program.heading}
                        </h2>

                        <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal text-justify">
                            {program.desc}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

// 3. KOMPONEN GALLERY BERSIH (TANPA KETERANGAN), SUDUT LANCIP, & PREVIEW MODAL FULL LAYAR
function HseGallerySection() {
    const galleryScrollRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // 6 Foto Galeri
    const galleryImages = [
        "/images/galleryhse1.jpeg",
        "/images/galleryhse2.jpeg",
        "/images/galleryhse3.jpeg",
        "/images/galleryhse4.jpeg",
        "/images/galleryhse5.jpeg",
        "/images/galleryhse6.jpeg"
    ];

    const scroll = (direction) => {
        if (galleryScrollRef.current) {
            const cardWidth = galleryScrollRef.current.clientWidth / 3;
            galleryScrollRef.current.scrollBy({
                left: direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="relative w-full bg-white py-20 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
            <div className="max-w-7xl mx-auto w-full">
                
                {/* Header Galeri & Tombol Navigasi Scroll */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-xs font-black tracking-widest text-[#0284c7] uppercase bg-sky-50 px-3 py-1 rounded-none border-l-4 border-[#0284c7] inline-block mb-2">
                            Dokumentasi
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c] tracking-tight">
                            Galeri HSE
                        </h2>
                    </div>

                    {/* Tombol Panah Kiri dan Kanan (Sudut Lancip) */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => scroll('left')}
                            aria-label="Scroll Sebelumnya"
                            className="w-11 h-11 bg-white text-[#0f2b5c] border-2 border-slate-300 hover:border-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white rounded-none flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            aria-label="Scroll Selanjutnya"
                            className="w-11 h-11 bg-white text-[#0f2b5c] border-2 border-slate-300 hover:border-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white rounded-none flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Baris Foto Bersih (Tampil 3 Foto di Layar Desktop, Total 6 Foto, Sudut Lancip) */}
                <div 
                    ref={galleryScrollRef}
                    className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {galleryImages.map((imgSrc, idx) => (
                        <div 
                            key={idx}
                            onClick={() => setSelectedImage(imgSrc)}
                            className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group cursor-pointer"
                        >
                            {/* Kotak Foto Polos, Sudut Lancip (rounded-none), Border Persegi */}
                            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden rounded-none border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                                <img 
                                    src={imgSrc} 
                                    alt={`Dokumentasi HSE ${idx + 1}`} 
                                    className="w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* Aksen Garis Kuning Lancip Saat Hover */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ffc107] transition-colors duration-300 pointer-events-none rounded-none" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* MODAL LIGHTBOX FULL LAYAR SAAT FOTO DIKLIK */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Tombol Tutup (X) */}
                    <button 
                        onClick={() => setSelectedImage(null)}
                        aria-label="Tutup Tampilan Penuh"
                        className="absolute top-6 right-6 text-white hover:text-[#ffc107] bg-white/10 hover:bg-white/20 w-12 h-12 rounded-none flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer z-50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Foto Ukuran Besar (Full Layar Max) */}
                    <div 
                        className="relative max-w-6xl max-h-[90vh] flex items-center justify-center rounded-none shadow-2xl overflow-hidden border-2 border-white/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedImage} 
                            alt="Full View" 
                            className="max-w-full max-h-[90vh] object-contain rounded-none select-none"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

export default function Hse() {
    const hsePrograms = [
        {
            heading: "General Safety Talk (GST): Membangun Budaya K3 Secara Berkelanjutan",
            desc: "General Safety Talk (GST) merupakan forum pertemuan berkala antara pihak pengawas dan seluruh karyawan guna menegaskan kembali pentingnya Keselamatan dan Kesehatan Kerja (K3) di lingkungan operasional. Sebagai mitra kerja BSS yang berkomitmen terhadap keselamatan kerja, kami secara rutin menghadiri agenda ini setiap awal bulan sebagai langkah strategis dalam memitigasi risiko kerja.",
            image: "/images/hseprog1.jpeg",
            bgImage: "/images/HSE-01.png"
        },
        {
            heading: "Komite Keselamatan Pertambangan (KKP): Sinergi & Koordinasi Antar Mitra",
            desc: "Pertemuan rutin Komite Keselamatan Pertambangan (KKP) diselenggarakan setiap bulan bersama seluruh mitra kerja BSS. Forum ini menjadi sarana diskusi strategis dalam membahas isu-isu keselamatan di area operasional pertambangan, sekaligus wadah pemantauan dan evaluasi progres program kerja HSE dari masing-masing mitra kerja demi terciptanya standardisasi operasional yang unggul.",
            image: "/images/hseprog2.jpeg",
            bgImage: "/images/HSE-02.jpeg"
        },
        {
            heading: "Pertemuan 5 Menit (P5M): Pengarahan Singkat untuk Keselamatan Kerja",
            desc: "P5M (Pertemuan / Pembicaraan 5 Menit) adalah sesi briefing harian yang wajib dilaksanakan sebelum seluruh aktivitas pekerjaan dimulai. Melalui sesi singkat ini, pengawas memberikan instruksi kerja teknis serta mengingatkan kembali kepatuhan terhadap standar keselamatan dan kesehatan kerja (K3), memastikan setiap personil memulai pekerjaan dalam kondisi siap dan sadar bahaya.",
            image: "/images/hseprog3.jpeg",
            bgImage: "/images/HSE-03.png"
        },
        {
            heading: "Sosialisasi Kebijakan K3: Penyelarasan Standar Keselamatan Operasional",
            desc: "Kegiatan sosialisasi kebijakan keselamatan diselenggarakan secara berkelanjutan guna memastikan seluruh personil memahami dan mematuhi regulasi K3 yang ditetapkan oleh BSS. Langkah ini merupakan perwujudan komitmen nyata dalam menyelaraskan visi keselamatan perusahaan dengan implementasi praktis di lapangan.",
            image: "/images/hseprog4.jpeg",
            bgImage: "/images/HSE-04.png"
        },
        {
            heading: "Pemeriksaan & Pengecekan Harian (P2H): Kesiapan Unit Menjelang Operasi",
            desc: "P2H merupakan prosedur inspeksi wajib yang dilaksanakan oleh setiap pengemudi atau operator sebelum mengoperasikan unit armada, khususnya unit Light Vehicle (LV) operasional. Pengecekan berkala ini bertujuan memastikan seluruh sarana mobilisasi berada dalam kondisi prima, layak operasi, serta aman digunakan dalam aktivitas kerja sehari-hari.",
            image: "/images/hseprog5.jpeg",
            bgImage: "/images/HSE-05.jpeg"
        },
        {
            heading: "Pelatihan Berkala: Penguatan Kapasitas dan Kompetensi Personel",
            desc: "Kami senantiasa berpartisipasi aktif dalam rangkaian kegiatan training dan pembekalan keselamatan yang diselenggarakan oleh pihak site. Program ini berfokus pada peningkatan keahlian, penyegaran pemahaman prosedur darurat, serta penanaman standar profesionalisme kerja demi mendukung keselamatan tanpa kompromi.",
            image: "/images/hseprog6.jpeg",
            bgImage: "/images/HSE-06.png"
        },
        {
            heading: "Fatigue Test: Menjaga Kebugaran Fisik dan Fokus Kerja Personel",
            desc: "Fatigue test merupakan prosedur pengujian kesehatan harian untuk memonitor tingkat kelelahan fisik maupun kesiapan mental tenaga kerja sebelum bertugas. Melalui pemeriksaan tekanan darah menggunakan tensimeter serta pemantauan kondisi fisik, program ini memastikan seluruh pekerja beroperasi dalam kondisi fit dan bebas dari risiko kelelahan ekstrem di area kerja.",
            image: "/images/hseprog7.jpeg",
            bgImage: "/images/HSE-07.png"
        },
        {
            heading: "Alcohol Test: Disiplin dan Kesiapan Penuh Tanpa Kompromi",
            desc: "Pemeriksaan skrining alkohol dilakukan secara berkala dan ketat untuk memastikan tidak ada personil yang bekerja di bawah pengaruh alkohol maupun zat terlarang. Pengujian ini merupakan langkah protektif fundamental dalam menjamin kewaspadaan penuh serta menekan potensi insiden kerja hingga tingkat zero accident.",
            image: "/images/hseprog8.jpeg",
            bgImage: "/images/HSE-08.jpeg"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
            <Head title="Health, Safety & Environment (HSE) - PT Servistama Pro Indonesia" />
            <Navbar />

            {/* HERO BANNER SECTION */}
            <AnimatedHeroBanner />

            {/* LIST 8 SECTION PROGRAM HSE */}
            <div className="flex flex-col w-full">
                {hsePrograms.map((program, index) => (
                    <AnimatedHseSection 
                        key={index}
                        program={program}
                        isEven={index % 2 === 1}
                    />
                ))}
            </div>

            {/* SECTION GALLERY BERSIH (SUDUT LANCIP & KLIK PREVIEW FULL LAYAR) */}
            <HseGallerySection />

            <Footer />
        </div>
    );
}