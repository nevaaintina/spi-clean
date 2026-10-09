import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import VisionMission from "./VisionMission";
import Management from "./Management";
import OurCustomers from "./OurCustomers";

// Komponen Counter Angka Otomatis saat di-scroll (Dilindungi dari Translate Browser)
function CounterNumber({ value }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Pastikan angka target diambil murni dari prop asli (tidak terpengaruh translate browser)
  const numericTarget = parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const duration = 3500; // Sangat santai dan halus
          const steps = 90;
          const increment = numericTarget / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= numericTarget) {
              setCount(numericTarget);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numericTarget, hasAnimated]);

  return (
    <span ref={elementRef} translate="no" className="notranslate">
      {count}
      {suffix}
    </span>
  );
}

// Komponen Pembantu Animasi Scroll Masuk (Durasi 2000ms - Sangat Lembut & Tenang)
function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getDirectionClasses = () => {
    if (direction === "left") {
      return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 sm:-translate-x-20";
    }
    if (direction === "right") {
      return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 sm:translate-x-20";
    }
    if (direction === "scale") {
      return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";
    }
    // Default up
    return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 sm:translate-y-20";
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.12,1,0.2,1)] ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inline SVG Icons                                                   */
/* ------------------------------------------------------------------ */

const IconAward = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.5-1.6 6.5L12 17l5.1 3-1.6-6.5" />
  </svg>
);

const IconMap = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M9 4 3.5 6.2v13.3L9 17l6 2.5 5.5-2.2V3.9L15 6.5 9 4Z" />
    <path d="M9 4v13M15 6.5V19.5" />
  </svg>
);

const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

const IconUsers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="8.5" cy="8" r="2.8" />
    <circle cx="16" cy="9" r="2.2" />
    <path d="M3 19c.6-3 2.7-4.6 5.5-4.6S13.4 16 14 19" />
    <path d="M14.5 14.6c2.3.1 4 1.6 4.5 4.4" />
  </svg>
);

const IconCheckBadge = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconBuilding = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M8 7h1.5M8 11h1.5M8 15h1.5M14.5 7H16M14.5 11H16M14.5 15H16M9 21v-4h6v4" />
  </svg>
);

const IconIndustry = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M3 20V10l5 3.5V10l5 3.5V10l5 3.5V20H3Z" />
    <path d="M3 20h18" />
  </svg>
);

const IconFocus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const IconMountain = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const IconPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.4" />
  </svg>
);

const IconShieldSafety = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
  </svg>
);

const IconTrend = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M3 17 9.5 10.5 13.5 14.5 21 6" />
    <path d="M15 6h6v6" />
  </svg>
);

const IconTarget2 = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const IconEye = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);

const IconPlay = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconArrow = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function OrganizationCard({ children, className = "" }) {
  return (
    <div className={`absolute bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center p-2 text-center transition-all hover:border-[#FFC107] hover:shadow-md ${className}`}>
      <span className="text-[11px] font-extrabold text-[#0F2B5C] leading-tight">{children}</span>
    </div>
  );
}

export default function Index({ companyHistories = [], milestones = [], managementTeam = [], customers = [] }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const whoWeAreStats = [
    { icon: IconCheckBadge, value: "100%", label: "Dukungan Teknis" },
    { icon: IconCalendar, value: "4+", label: "Tahun Pengalaman" },
    { icon: IconUsers, value: "99%", label: "Kepuasan Pelanggan" },
    { icon: IconAward, value: "100%", label: "Layanan Terpercaya" },
  ];

  const companyProfile = [
    { icon: IconBuilding, label: "Company Name", value: "PT Servistama Pro Indonesia" },
    { icon: IconCalendar, label: "Established", value: "2022" },
    { icon: IconIndustry, label: "Industry", value: "Heavy Equipment Support & Services" },
    { icon: IconFocus, label: "Business Focus", value: "Service, Maintenance, Warranty, Spare Parts, & Support" },
    { icon: IconAward, label: "Authorized Partner", value: "XCMG (Xuzhou Construction Machinery Group)" },
    { icon: IconMap, label: "Coverage Area", value: "Nationwide - Indonesia" },
    { icon: IconPin, label: "Head Office", value: "Tangerang, Banten, Indonesia" },
  ];

  const companyStats = [
    { icon: IconCheckBadge, value: "100%", label: "Dukungan Teknis" },
    { icon: IconCalendar, value: "4+", label: "Tahun Pengalaman" },
    { icon: IconUsers, value: "99%", label: "Kepuasan Pelanggan" },
    { icon: IconAward, value: "100%", label: "Layanan Terpercaya" },
  ];

  const cultureItems = [
    { icon: IconShieldSafety, title: "Safety First", desc: "Mengutamakan keselamatan kerja sebagai fondasi utama operasional servis pertambangan." },
    { icon: IconCheckBadge, title: "Integrity & Honesty", desc: "Menjunjung kejujuran dan integritas sebagai bentuk tanggung jawab penuh kepada klien." },
    { icon: IconTarget2, title: "Customer Centric", desc: "Membangun layanan berbasis konsumen yang berfokus pada kebutuhan spesifik pelanggan." },
    { icon: IconTrend, title: "Continuous Improvement", desc: "Meningkatkan kualitas pelayanan secara berkesinambungan demi hasil terbaik di Indonesia." },
    { icon: IconMountain, title: "Perseverance", desc: "Tekun dan tangguh menghadapi tantangan serta rintangan di medan pertambangan." },
    { icon: IconUsers, title: "Respect & Open-Minded", desc: "Menghormati proses terarah dan terbuka menerima masukan klien demi evaluasi bersama." },
  ];

  const governancePrinciples = [
    { icon: IconEye, title: "Transparency", desc: "Menjamin keterbukaan informasi teknis, biaya dan ketersediaan suku cadang secara jujur kepada klien." },
    { icon: IconCheckBadge, title: "Accountability", desc: "Menjaga integritas dan tanggung jawab penuh atas keselamatan kerja (Safety First) serta keandalan servis di lapangan." },
    { icon: IconMountain, title: "Responsibility", desc: "Tangguh dan konsisten menjaga standar operasional tinggi demi menjawab tantangan medan pertambangan." },
    { icon: IconUsers, title: "Fairness", desc: "Menghormati dan memperlakukan seluruh klien, mitra, serta tenaga ahli secara adil, profesional dan terbuka." },
  ];

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <>
      <Head title="About Us - PT Servistama Pro Indonesia" />
      <Navbar />

      {/* ============================== HERO ============================== */}
      <section
        className="relative flex min-h-[380px] sm:min-h-[500px] w-full items-center overflow-hidden md:min-h-[700px]"
        style={{  
          backgroundImage: `linear-gradient(180deg, rgba(7,27,56,0.15) 0%, rgba(7,27,56,0.30) 50%, rgba(7,27,56,0.20) 100%), url('/images/about-hero.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col justify-center">
            
            <span 
              className={`mb-2 sm:mb-4 inline-block w-fit text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107] transition-all duration-[1800ms] ease-[cubic-bezier(0.12,1,0.2,1)] ${
                isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
              }`}
            >
              About Us
            </span>

            <h1 
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-white transition-all duration-[1900ms] delay-300 ease-[cubic-bezier(0.12,1,0.2,1)] ${
                isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Building Trust Through Professional Heavy Equipment Services
            </h1>

            <p 
              className={`mt-3 sm:mt-5 max-w-lg text-xs sm:text-sm md:text-base leading-relaxed text-white/95 transition-all duration-[2000ms] delay-500 ease-[cubic-bezier(0.12,1,0.2,1)] ${
                isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              PT Servistama Pro Indonesia is committed to delivering reliable, innovative and high-quality heavy equipment services to support Indonesia's industrial growth.
            </p> 

            <div 
              className={`mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 transition-all duration-[2000ms] delay-700 ease-[cubic-bezier(0.12,1,0.2,1)] ${
                isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <a 
                href="#company-profile"
                className="group inline-flex items-center gap-2 rounded-md bg-[#FFC107] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#0B1220] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#e6ac00] hover:shadow-lg"
              >
                Company Profile
                <IconArrow className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a> 
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-md border border-white/40 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all duration-500 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Our Services
                <IconArrow className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* STATISTIK DI HERO BANNER */}
            <div 
              className={`mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-6 border-t border-white/20 pt-6 sm:pt-8 sm:grid-cols-4 transition-all duration-[2200ms] delay-[900ms] ease-[cubic-bezier(0.12,1,0.2,1)] ${
                isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {whoWeAreStats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href="#why-choose-us"
                    className="group flex flex-col items-start transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  >
                    <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-[#FFC107] transition-transform duration-500 group-hover:scale-110" />
                    <p className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                      <CounterNumber value={s.value} />
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm font-medium text-white/90 transition-colors group-hover:text-white" translate="no">
                      {s.label}
                    </p>
                  </a>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ============================== WHY CHOOSE US ============================== */}
      <div id="why-choose-us" className="scroll-mt-24">
        <section className="bg-white py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
            
            <Reveal direction="left">
              <div className="relative group">
                <img
                  src="/images/we-are.png"
                  alt="SPI Engineer"
                  className="w-full rounded-xl sm:rounded-2xl object-cover shadow-xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>

            <Reveal direction="right">
              <div>
                <span className="mb-2 sm:mb-3 inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
                  Who We Are
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-[#0F2B5C]">
                  Trusted Heavy Equipment Service Company
                </h2>
                <p className="mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-[#64748B] whitespace-pre-line">
                  Sebagai Dealer Servis Resmi Mesin Pertambangan XCMG di Indonesia sejak tahun 2022, PT Servistama Pro Indonesia mengedepankan 
                  kompetensi inti di bidang alat berat untuk membangun keandalan dan kepercayaan pelanggan. Kami menghadirkan dukungan produk yang komprehensif, 
                  layanan purnajual prima, serta komitmen penuh dalam menjaga kinerja operasional dan keberlanjutan industri Anda.
                </p>
                
                <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
                  {whoWeAreStats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={i} className="transition-transform duration-500 hover:-translate-y-1">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFC107]" />
                        <p className="mt-1.5 sm:mt-2 text-lg sm:text-xl md:text-2xl font-extrabold text-[#0F2B5C]">
                          <CounterNumber value={s.value} />
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#64748B]" translate="no">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

          </div>
        </section>
      </div>

      {/* ============================== COMPANY PROFILE ============================== */}
      <section id="company-profile" className="relative overflow-hidden py-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/com-profile.jpg" 
            alt="Mining Heavy Equipment Background" 
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 45%' }}
          />
          <div className="absolute inset-0 bg-[#0F2B5C]/65"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
                Company Profile
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companyProfile.map((row, i) => {
              const Icon = row.icon;
              return (
                <Reveal key={i} delay={i * 200} direction="up">
                  <div
                    className="group flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-lg transition-all duration-700 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-2xl"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#0F2B5C]/5 text-[#0F2B5C] transition-all duration-500 group-hover:bg-[#FFC107] group-hover:text-[#0F2B5C]">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#64748B] transition-colors group-hover:text-[#0F2B5C]">
                        {row.label}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#0F2B5C] truncate">
                        {row.value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== COMPANY HISTORY ============================== */}
<section className="bg-white py-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 overflow-hidden">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <Reveal direction="up">
      <span className="mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
        Company History
      </span>
    </Reveal>

    <div className="relative mt-3 sm:mt-4">
      <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-[#E2E8F0] sm:block" />

      <div className="grid grid-cols-1 gap-y-8 sm:gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {companyHistories.length === 0 ? (
          <p className="text-center text-slate-400 text-xs col-span-full py-6">Belum ada data company history.</p>
        ) : (
          companyHistories.map((item, i) => (
            <Reveal key={item.id || i} delay={i * 220} direction="up">
              <div className="group relative flex cursor-pointer flex-col items-center text-center px-2">
                <div className="z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#0F2B5C] text-[11px] sm:text-xs font-extrabold text-white shadow-md transition-all duration-700 group-hover:scale-110 group-hover:bg-[#FFC107] group-hover:text-[#0B1220] group-hover:shadow-lg group-hover:shadow-[#FFC107]/45 shrink-0">
                  {item.year ? String(item.year).slice(-2) : ""}
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-extrabold text-[#0F2B5C] transition-colors duration-500 group-hover:text-[#FFC107]">
                  {item.year}
                </p>
                {/* max-w-[150px] mempersempit lebar kotak agar teks pendek langsung turun ke baris kedua */}
                <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-[#64748B] transition-colors duration-500 group-hover:text-[#0F2B5C] whitespace-pre-line leading-relaxed break-words w-full max-w-[150px] mx-auto">
                  {item.title || item.description}
                </p>
              </div>
            </Reveal>
          ))
        )}
      </div>
    </div>
  </div>
</section>

      {/* ============================== VISION MISSION ============================== */}
      <div id="vision-mission" className="scroll-mt-24">
        <Reveal direction="up">
          <VisionMission />
        </Reveal>
      </div>

      {/* ============================== COMPANY STATISTICS ============================== */}
      <section
        className="relative overflow-hidden bg-[#0B1220] py-12 sm:py-16 md:py-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(11,18,32,0.95), rgba(15,43,92,0.85)), url('https://placehold.co/1920x600/0B1220/0B1220?text=+')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <span className="mb-6 sm:mb-8 inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Statistics
            </span>
          </Reveal>
          
          <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4">
            {companyStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={i * 200} direction="scale">
                  <div className="text-center sm:text-left transition-transform duration-500 hover:-translate-y-1">
                    <Icon className="mx-auto h-6 w-6 sm:h-7 sm:w-7 text-[#FFC107] sm:mx-0" />
                    <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-extrabold text-white md:text-4xl text-[#FFC107]">
                      <CounterNumber value={s.value} />
                    </p>
                    <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-bold text-white" translate="no">{s.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== MILESTONE / ORG STRUCTURE / MANAGEMENT ===================== */}
      <section className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* MILESTONES (DARI DATABASE MILESTONES) */}
          <Reveal direction="up">
            <div className="text-center mb-6 sm:mb-10">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
                Company Milestone
              </span>
              <h2 className="mt-1 text-lg sm:text-2xl font-black text-[#0F2B5C]">
                OUR JOURNEY & ACHIEVEMENTS
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12 sm:mb-20">
            {milestones.length === 0 ? (
              <p className="text-center text-slate-400 text-xs col-span-3 py-6">Belum ada data milestone.</p>
            ) : (
              milestones.map((m, i) => (
                <Reveal key={m.id} delay={i * 220} direction="up">
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-5 shadow-sm transition-all duration-700 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-xl flex flex-col justify-between h-full"
                  >
                    <div>
                      {m.image_path ? (
                        <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
                          <img
                            src={`/${m.image_path}`}
                            alt={m.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="inline-block rounded-lg bg-[#0F2B5C]/90 backdrop-blur-sm px-3 py-1 text-xs font-extrabold text-[#FFC107] shadow">
                              {m.year}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <span className="inline-block rounded-lg bg-[#0F2B5C] px-3 py-1 text-xs font-extrabold text-[#FFC107] shadow">
                            {m.year}
                          </span>
                        </div>
                      )}
                      <h4 className="text-base font-extrabold text-[#0F2B5C]">
                        {m.title}
                      </h4>
                      <p className="mt-2 text-xs sm:text-xs leading-relaxed text-slate-600">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>

          {/* ================= STRUKTUR ORGANISASI ================= */}
          <Reveal direction="scale">
            <section className="w-full overflow-hidden bg-white py-10 sm:py-16 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm mb-12 sm:mb-16">
              <div className="w-full overflow-x-auto overflow-y-hidden">
                <div className="relative mx-auto min-w-[1380px] w-[1380px] h-[370px] bg-white">

                  <div className="absolute top-[0px] left-0 w-full text-center text-[11px] font-medium tracking-[0.12em] text-[#0F2B5C]">
                    Organization Structure
                  </div>

                  <h2 className="absolute top-[20px] left-0 w-full text-center text-[17px] font-semibold text-[#111827]">
                    STRUKTUR ORGANISASI PT SERVISTAMA PRO INDONESIA
                  </h2>

                  {/* CEO -> MAIN HORIZONTAL LINE */}
                  <div className="absolute left-[700px] top-[90px] h-[12px] w-px bg-[#111827]" />
                  <div className="absolute left-[295px] top-[101px] h-px w-[946px] bg-[#111827]" />

                  {/* MAIN LEVEL VERTICAL CONNECTORS */}
                  <div className="absolute left-[295px] top-[101px] h-[13px] w-px bg-[#111827]" />
                  <div className="absolute left-[700px] top-[101px] h-[13px] w-px bg-[#111827]" />
                  <div className="absolute left-[943px] top-[101px] h-[13px] w-px bg-[#111827]" />
                  <div className="absolute left-[1104px] top-[101px] h-[68px] w-px bg-[#111827]" />
                  <div className="absolute left-[1241px] top-[101px] h-[68px] w-px bg-[#111827]" />

                  {/* COO CHILD CONNECTOR */}
                  <div className="absolute left-[295px] top-[147px] h-[12px] w-px bg-[#111827]" />
                  <div className="absolute left-[106px] top-[159px] h-px w-[342px] bg-[#111827]" />
                  <div className="absolute left-[106px] top-[159px] h-[10px] w-px bg-[#111827]" />
                  <div className="absolute left-[295px] top-[159px] h-[10px] w-px bg-[#111827]" />
                  <div className="absolute left-[448px] top-[159px] h-[10px] w-px bg-[#111827]" />

                  {/* HR CHILD CONNECTOR */}
                  <div className="absolute left-[700px] top-[147px] h-[12px] w-px bg-[#111827]" />
                  <div className="absolute left-[621px] top-[159px] h-px w-[144px] bg-[#111827]" />
                  <div className="absolute left-[621px] top-[159px] h-[10px] w-px bg-[#111827]" />
                  <div className="absolute left-[765px] top-[159px] h-[63px] w-px bg-[#111827]" />

                  {/* FINANCE CHILD CONNECTOR */}
                  <div className="absolute left-[943px] top-[147px] h-[22px] w-px bg-[#111827]" />

                  {/* CARDS LAYER */}
                  <OrganizationCard className="left-[621px] top-[51px] w-[158px] h-[39px]">
                    Chief Executive Officer
                  </OrganizationCard>

                  <OrganizationCard className="left-[201.5px] top-[114px] w-[187px] h-[33px]">
                    Chief Operasional Officer
                  </OrganizationCard>

                  <OrganizationCard className="left-[621px] top-[114px] w-[158px] h-[33px]">
                    Chief Human Resources <br /> Officer
                  </OrganizationCard>

                  <OrganizationCard className="left-[880px] top-[114px] w-[125px] h-[33px]">
                    Chief Finance Officer
                  </OrganizationCard>

                  <OrganizationCard className="left-[43px] top-[169px] w-[126px] h-[42px]">
                    Operasional Manager
                  </OrganizationCard>

                  <OrganizationCard className="left-[233px] top-[169px] w-[124px] h-[42px]">
                    Technical Service <br /> Manager
                  </OrganizationCard>

                  <OrganizationCard className="left-[397px] top-[169px] w-[101px] h-[42px]">
                    Quality Control <br /> Manager
                  </OrganizationCard>

                  <OrganizationCard className="left-[560px] top-[169px] w-[123px] h-[42px]">
                    HRGA Manager
                  </OrganizationCard>

                  <OrganizationCard className="left-[717px] top-[222px] w-[96px] h-[31px]">
                    Sr HSE Officer
                  </OrganizationCard>

                  <OrganizationCard className="left-[880px] top-[169px] w-[125px] h-[42px]">
                    Finance Manager
                  </OrganizationCard>

                  <OrganizationCard className="left-[1041px] top-[169px] w-[126px] h-[42px]">
                    WH & Logistic Manager
                  </OrganizationCard>

                  <OrganizationCard className="left-[1178px] top-[169px] w-[126px] h-[42px]">
                    Part & Key Account <br /> Manager
                  </OrganizationCard>

                </div>
              </div>
            </section>
          </Reveal>

        </div>
      </section>

      {/* ================= MANAGEMENT TEAM ================= */}
      <div id="management" className="scroll-mt-24">
        <Reveal direction="up">
          <Management managementTeam={managementTeam} />
        </Reveal>
      </div>

      {/* ================= OUR CUSTOMERS ================= */}
      <Reveal direction="up">
        <OurCustomers customers={customers} />
      </Reveal>

      {/* ============================== COMPANY CULTURE + GOVERNANCE ============================== */}
      <section className="bg-[#F8FAFC] pt-6 pb-12 border-t border-slate-200 overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 items-stretch">
          
          <Reveal direction="left" className="flex flex-col h-full">
            <span className="mb-3 sm:mb-5 inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Culture
            </span>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 flex-1">
              {cultureItems.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={i}
                    className="group flex flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-white p-3 sm:p-4 text-center shadow-sm transition-all duration-700 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-xl"
                  >
                    <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#0F2B5C]/5 text-[#0F2B5C] transition-colors duration-500 group-hover:bg-[#FFC107]">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <p className="mt-2 text-[11px] sm:text-xs font-bold leading-tight text-[#0F2B5C]">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[9px] sm:text-[10px] leading-snug text-[#64748B]">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal direction="right" className="flex flex-col h-full">
            <span className="mb-3 sm:mb-5 inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Corporate Governance
            </span>
            <div className="flex flex-col justify-between flex-1 h-full rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-sm transition-all duration-700 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-xl md:p-7">
              <p className="mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed text-[#64748B]">
                Kami berkomitmen menerapkan prinsip Good Corporate Governance (GCG) secara konsisten demi memberikan pelayanan servis alat berat terbaik, terpercaya, dan profesional di Indonesia.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 my-auto">
                {governancePrinciples.map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <div 
                      key={i} 
                      className="group flex items-start gap-2.5 sm:gap-3 rounded-xl p-2 transition-all duration-500 hover:bg-[#F8FAFC]"
                    >
                      <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFC107]/15 text-[#0F2B5C] transition-all duration-500 group-hover:bg-[#FFC107] group-hover:scale-105">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#0F2B5C]">
                          {g.title}
                        </p>
                        <p className="mt-0.5 text-[11px] sm:text-xs leading-snug text-[#64748B]">
                          {g.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ============================== CTA BANNER ============================== */}
      <Reveal direction="scale">
        <section className="grid grid-cols-2">
          <div
            className="relative flex min-h-[180px] sm:min-h-[280px] items-center overflow-hidden px-3 py-6 sm:px-8 sm:py-14"
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(11,18,32,0.70), rgba(11,18,32,0.85)), url('https://img.youtube.com/vi/qIVMKITIV7o/maxresdefault.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="max-w-md text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase leading-tight text-white">
                BUILDING THE FUTURE OF HEAVY EQUIPMENT SERVICES
              </h3>
              <p className="mt-1 sm:mt-3 text-[8px] sm:text-sm font-semibold text-[#FFC107] hidden sm:block">
                Menjadi fondasi menuju Smart Mining Service Ecosystem.
              </p>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play company video"
                className="mt-3 sm:mt-6 flex h-8 w-8 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 bg-[#0B1220]/40 text-white backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-white hover:text-[#0B1220] cursor-pointer"
              >
                <IconPlay className="ml-0.5 sm:ml-1 h-3 w-3 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative flex min-h-[180px] sm:min-h-[280px] items-center overflow-hidden bg-[#FFC107] px-3 py-6 sm:px-8 sm:py-14"
            style={{
              backgroundImage: "linear-gradient(to left, rgba(255,193,7,0.35), rgba(255,193,7,0.92)), url('https://placehold.co/960x480/FFC107/FFC107?text=+')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="max-w-sm text-[10px] sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase leading-tight text-[#0B1220]">
                LET'S BUILD A BETTER FUTURE TOGETHER
              </h3>
              <p className="mt-1 sm:mt-3 max-w-sm text-[8px] sm:text-sm leading-relaxed text-[#0B1220]/80 hidden sm:block">
                We are ready to support your business with our best services and solutions.
              </p>
              <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row gap-1.5 sm:gap-4">
                <a
                  href="https://wa.me/6282258013177?text=Halo%20PT.%20Servistama%20Pro%20Indonesia,%20saya%20tertarik%20untuk%20menghubungi%20Anda."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded bg-[#0B1220] px-2.5 py-1.5 sm:px-6 sm:py-3 text-[9px] sm:text-sm font-bold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#0F2B5C] hover:shadow-lg"
                >
                  Contact Us
                  <IconArrow className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@servistamapro.com&su=Request%20Consultation%20-%20PT.%20Servistama%20Pro%20Indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded border-2 border-[#0B1220] px-2.5 py-1.5 sm:px-6 sm:py-3 text-[9px] sm:text-sm font-bold text-[#0B1220] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#0B1220] hover:text-white"
                >
                  Request Consultation
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ============================== MODAL POP-UP VIDEO ============================== */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-white hover:text-black cursor-pointer"
            >
              ✕
            </button>

            <div className="relative aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/qIVMKITIV7o?autoplay=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}