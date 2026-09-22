import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import VisionMission from "./VisionMission";
import Management from "./Management";
import OurCustomers from "./OurCustomers";

function CounterNumber({ value }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const numericTarget = parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const duration = 2000;
          const steps = 60;
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
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numericTarget, hasAnimated]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
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

const IconEngineer = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="7" r="3.2" />
    <path d="M5 21c.6-4 3-6.4 7-6.4s6.4 2.4 7 6.4" />
    <path d="m9.5 8.5 1 1.2 1-1.6 1 1.6 1-1.2" />
  </svg>
);

const IconMap = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M9 4 3.5 6.2v13.3L9 17l6 2.5 5.5-2.2V3.9L15 6.5 9 4Z" />
    <path d="M9 4v13M15 6.5V19.5" />
  </svg>
);

const IconGenuine = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconClock = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.3 2" />
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

const IconProject = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M8 2.5v3M16 2.5v3M3.5 9.5h17" />
    <path d="m8 14 2.5 2.5L16 12" />
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

export default function Index({ milestones = [], managementTeam = [], customers = [] }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const whoWeAreStats = [
    { icon: IconCalendar, value: "15+", label: "Years Experience" },
    { icon: IconUsers, value: "100+", label: "Professional Engineers" },
    { icon: IconProject, value: "500+", label: "Projects Completed" },
    { icon: IconCheckBadge, value: "100%", label: "Customer Commitment" },
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

  const historyTimeline = [
    { year: "2022", title: "Authorized XCMG Dealer Indonesia" },
    { year: "2023", title: "FMC Launch & Jakarta Warehouses" },
    { year: "2024", title: "XCMG Award & Regional Expansion" },
    { year: "2025", title: "2 Balikpapan Warehouses & Integrated Asset Management System" },
    { year: "2026", title: "Full New ERP System for Operational Efficiency & Integration" },
  ];

  const companyStats = [
    { icon: IconCalendar, value: "15+", label: "Years Experience" },
    { icon: IconProject, value: "500+", label: "Projects Completed" },
    { icon: IconUsers, value: "100+", label: "Professional Engineers" },
    { icon: IconCheckBadge, value: "98%", label: "Customer Satisfaction" },
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
    { icon: IconEye, title: "Transparency", desc: "Menjamin keterbukaan informasi teknis, biaya, dan ketersediaan suku cadang secara jujur kepada klien." },
    { icon: IconCheckBadge, title: "Accountability", desc: "Menjaga integritas dan tanggung jawab penuh atas keselamatan kerja (Safety First) serta keandalan servis di lapangan." },
    { icon: IconMountain, title: "Responsibility", desc: "Tangguh dan konsisten menjaga standar operasional tinggi demi menjawab tantangan medan pertambangan." },
    { icon: IconUsers, title: "Fairness", desc: "Menghormati dan memperlakukan seluruh klien, mitra, serta tenaga ahli secara adil, profesional, dan terbuka." },
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
        className="relative flex min-h-[600px] w-full items-center overflow-hidden md:min-h-[700px]"
        style={{  
          backgroundImage: `linear-gradient(180deg, rgba(11,18,32,0.100) 0%, rgba(15,43,92,0.100) 50%, rgba(11,18,32,0.100) 100%), url('/images/hero-about.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}  
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-block w-fit text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              About Us
            </span>
            <h1 className="text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl">
              Building Trust Through Professional Heavy Equipment Services
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
              PT Servistama Pro Indonesia is committed to delivering reliable, innovative, and high-quality heavy equipment services to support Indonesia's industrial growth.
            </p> 

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a 
                href="#company-profile"
                className="group inline-flex items-center gap-2 rounded-md bg-[#FFC107] px-6 py-3 text-sm font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e6ac00] hover:shadow-lg"
              >
                Company Profile
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a> 
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Our Services
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== WHY CHOOSE US ============================== */}
      <div id="why-choose-us" className="scroll-mt-24">
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
            <div className="relative">
              <img
                src="/images/we-are.png "
                alt="SPI Engineer"
                className="w-full rounded-2xl object-cover shadow-xl"
              />
            </div>

            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
                Who We Are
              </span>
              <h2 className="text-2xl font-extrabold leading-tight text-[#0F2B5C] sm:text-3xl md:text-4xl">
                Trusted Heavy Equipment Service Company
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#64748B] md:text-base whitespace-pre-line">
                Sebagai Dealer Servis Resmi Mesin Pertambangan XCMG di Indonesia sejak tahun 2022, PT Servistama Pro Indonesia mengedepankan 
                kompetensi inti di bidang alat berat untuk membangun keandalan dan kepercayaan pelanggan. Kami menghadirkan dukungan produk yang komprehensif, 
                layanan purnajual prima, serta komitmen penuh dalam menjaga kinerja operasional dan keberlanjutan industri Anda.</p>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {whoWeAreStats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i}>
                      <Icon className="h-6 w-6 text-[#FFC107]" />
                      <p className="mt-2 text-xl font-extrabold text-[#0F2B5C] sm:text-2xl">
                        <CounterNumber value={s.value} />
                      </p>
                      <p className="text-xs text-[#64748B]">{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================== COMPANY PROFILE ============================== */}
      <section id="company-profile" className="relative overflow-hidden pt-8 pb-16 md:pt-10 md:pb-20">
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
          <div className="mb-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Profile
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companyProfile.map((row, i) => {
              const Icon = row.icon;
              return (
                <div
                  key={i}
                  className="group flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-2xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0F2B5C]/5 text-[#0F2B5C] transition-all duration-300 group-hover:bg-[#FFC107] group-hover:text-[#0F2B5C]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] transition-colors group-hover:text-[#0F2B5C]">
                      {row.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-[#0F2B5C]">
                      {row.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== COMPANY HISTORY ============================== */}
      <section className="bg-white pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
            Company History
          </span>

          <div className="relative">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-[#E2E8F0] sm:block" />

            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {historyTimeline.map((item, i) => (
                <div key={i} className="group relative flex cursor-pointer flex-col items-center text-center">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0F2B5C] text-xs font-extrabold text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FFC107] group-hover:text-[#0B1220] group-hover:shadow-lg group-hover:shadow-[#FFC107]/40">
                    {item.year ? item.year.toString().slice(-2) : ""}
                  </div>
                  <p className="mt-3 text-sm font-extrabold text-[#0F2B5C] transition-colors duration-300 group-hover:text-[#FFC107]">
                    {item.year}
                  </p>
                  <p className="mt-1 max-w-[110px] text-xs text-[#64748B] transition-colors duration-300 group-hover:text-[#0F2B5C]">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== VISION MISSION ============================== */}
      <div id="vision-mission" className="scroll-mt-24">
        <VisionMission />
      </div>

      {/* ============================== COMPANY STATISTICS ============================== */}
      <section
        className="relative overflow-hidden bg-[#0B1220] py-16 md:py-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(11,18,32,0.95), rgba(15,43,92,0.85)), url('https://placehold.co/1920x600/0B1220/0B1220?text=+')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-8 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
            Company Statistics
          </span>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {companyStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center sm:text-left">
                  <Icon className="mx-auto h-7 w-7 text-[#FFC107] sm:mx-0" />
                  <p className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                    <CounterNumber value={s.value} />
                  </p>
                  <p className="mt-1 text-xs text-white/60">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== MILESTONE / ORG STRUCTURE / MANAGEMENT ===================== */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* MILESTONES (Dinamis dari Database) */}
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Milestone
            </span>
            <h2 className="mt-1 text-2xl font-black text-[#0F2B5C]">
              OUR JOURNEY & ACHIEVEMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.length === 0 ? (
              <p className="text-center text-slate-400 text-xs col-span-3 py-6">Belum ada data milestone.</p>
            ) : (
              milestones.map((m) => (
                <div
                  key={m.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {m.image_path ? (
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
                        <img
                          src={`/${m.image_path}`}
                          alt={m.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <h4 className="text-base font-extrabold text-[#0F2B5C] line-clamp-1">
                      {m.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          </div>

       {/* =========================================================
    STRUKTUR ORGANISASI
    MODERN CORPORATE ORGANIZATION CHART
========================================================= */}
<div className="mt-16 w-full py-6">

  {/* ================= TITLE ================= */}
  <div className="mb-10 text-center">
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
      Organization Structure
    </span>

    <h3 className="mt-1 text-2xl font-black tracking-tight text-[#0F2B5C] md:text-3xl">
      STRUKTUR ORGANISASI PT SERVISTAMA PRO INDONESIA
    </h3>
  </div>


  {/* ================= CHART ================= */}
  <div className="overflow-x-auto pb-12 pt-4">

    <div
      className="
        relative mx-auto
        min-w-[1400px]
        select-none
        px-6
        font-sans
      "
      style={{ height: "560px" }}
    >


      {/* =====================================================
          CEO
      ====================================================== */}

      <div
        className="
          absolute left-1/2 top-0 z-20
          flex h-[76px] w-[270px]
          -translate-x-1/2
          flex-col items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          text-center
          shadow-[0_8px_25px_rgba(15,43,92,0.08)]
        "
      >
        <h4 className="text-sm font-extrabold text-[#0F2B5C]">
          Chief Executive Officer
        </h4>

        <div className="mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
      </div>


      {/* =====================================================
          GARIS CEO → GARIS UTAMA
      ====================================================== */}

      <div
        className="
          absolute left-1/2 top-[76px]
          h-[34px] w-[2px]
          -translate-x-1/2
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          GARIS HORIZONTAL UTAMA
      ====================================================== */}

      <div
        className="
          absolute
          left-[8%] right-[8%]
          top-[110px]
          h-[2px]
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          VERTICAL CONNECTORS LEVEL UTAMA

          1 = COO
          2 = CHRO
          3 = CFO
          4 = WH
          5 = PART
      ====================================================== */}

      {/* COO */}
      <div
        className="
          absolute left-[16%] top-[110px]
          h-[32px] w-[2px]
          bg-[#0F2B5C]
        "
      />

      {/* CHRO */}
      <div
        className="
          absolute left-[50%] top-[110px]
          h-[32px] w-[2px]
          bg-[#0F2B5C]
        "
      />

      {/* CFO */}
      <div
        className="
          absolute left-[70%] top-[110px]
          h-[32px] w-[2px]
          bg-[#0F2B5C]
        "
      />

      {/* WH */}
      <div
        className="
          absolute left-[84%] top-[110px]
          h-[32px] w-[2px]
          bg-[#0F2B5C]
        "
      />

      {/* PART */}
      <div
        className="
          absolute left-[94%] top-[110px]
          h-[32px] w-[2px]
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          COO
      ====================================================== */}

      <div
        className="
          absolute left-[16%] top-[142px]
          flex h-[76px] w-[300px]
          -translate-x-1/2
          flex-col items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          text-center
          shadow-[0_8px_25px_rgba(15,43,92,0.08)]
        "
      >
        <p className="text-sm font-bold text-[#0F2B5C]">
          Chief Operasional Officer
        </p>

        <div className="mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
      </div>


      {/* COO DOWN */}
      <div
        className="
          absolute left-[16%] top-[218px]
          h-[30px] w-[2px]
          bg-[#0F2B5C]
        "
      />


      {/* COO 3 MANAGER HORIZONTAL */}
      <div
        className="
          absolute left-[6%] top-[248px]
          h-[2px] w-[20%]
          bg-[#0F2B5C]
        "
      />


      {/* COO CHILD CONNECTORS */}

      <div
        className="
          absolute left-[6%] top-[248px]
          h-[30px] w-[2px]
          bg-[#0F2B5C]
        "
      />

      <div
        className="
          absolute left-[16%] top-[248px]
          h-[30px] w-[2px]
          bg-[#0F2B5C]
        "
      />

      <div
        className="
          absolute left-[26%] top-[248px]
          h-[30px] w-[2px]
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          OPERASIONAL MANAGER
      ====================================================== */}

      <div
        className="
          absolute left-[6%] top-[278px]
          flex h-[78px] w-[190px]
          -translate-x-1/2
          items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          p-3
          text-center
          shadow-[0_6px_18px_rgba(15,43,92,0.07)]
        "
      >
        <div>
          <p className="text-xs font-bold text-[#0F2B5C]">
            Operasional Manager
          </p>

          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
        </div>
      </div>


      {/* =====================================================
          TECHNICAL SERVICE MANAGER
      ====================================================== */}

      <div
        className="
          absolute left-[16%] top-[278px]
          flex h-[78px] w-[205px]
          -translate-x-1/2
          items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          p-3
          text-center
          shadow-[0_6px_18px_rgba(15,43,92,0.07)]
        "
      >
        <div>
          <p className="text-xs font-bold leading-tight text-[#0F2B5C]">
            Technical Service
            <br />
            Manager
          </p>

          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
        </div>
      </div>


      {/* =====================================================
          QUALITY CONTROL MANAGER
      ====================================================== */}

      <div
        className="
          absolute left-[26%] top-[278px]
          flex h-[78px] w-[200px]
          -translate-x-1/2
          items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          p-3
          text-center
          shadow-[0_6px_18px_rgba(15,43,92,0.07)]
        "
      >
        <div>
          <p className="text-xs font-bold leading-tight text-[#0F2B5C]">
            Quality Control
            <br />
            Manager
          </p>

          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
        </div>
      </div>


      {/* =====================================================
          CHRO
      ====================================================== */}

      <div
        className="
          absolute left-[50%] top-[142px]
          flex h-[76px] w-[300px]
          -translate-x-1/2
          flex-col items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          text-center
          shadow-[0_8px_25px_rgba(15,43,92,0.08)]
        "
      >
        <p className="text-sm font-bold leading-tight text-[#0F2B5C]">
          Chief Human Resources
          <br />
          Officer
        </p>

        <div className="mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
      </div>


      {/* =====================================================
          CHRO DOWN → BRANCH
      ====================================================== */}

      <div
        className="
          absolute left-[50%] top-[218px]
          h-[30px] w-[2px]
          -translate-x-1/2
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          GARIS HRGA + HSE

          HRGA = LEBIH TINGGI
          HSE  = LEBIH RENDAH
      ====================================================== */}

      <div
        className="
          absolute left-[43%] top-[248px]
          h-[2px] w-[14%]
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          HRGA CONNECTOR
      ====================================================== */}

      <div
        className="
          absolute left-[43%] top-[248px]
          h-[28px] w-[2px]
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          HRGA MANAGER
          LEBIH TINGGI
      ====================================================== */}

      <div
        className="
          absolute left-[43%] top-[276px]
          flex h-[78px] w-[210px]
          -translate-x-1/2
          items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          p-3
          text-center
          shadow-[0_6px_18px_rgba(15,43,92,0.07)]
        "
      >
        <div>
          <p className="text-xs font-bold text-[#0F2B5C]">
            HRGA Manager
          </p>

          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
        </div>
      </div>


      {/* =====================================================
          SR HSE CONNECTOR
          DIBUAT LEBIH PANJANG
      ====================================================== */}

      <div
        className="
          absolute left-[57%] top-[248px]
          h-[48px] w-[2px]
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          SR HSE OFFICER
          LEBIH RENDAH
      ====================================================== */}

      <div
        className="
          absolute left-[57%] top-[296px]
          flex h-[78px] w-[195px]
          -translate-x-1/2
          items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          p-3
          text-center
          shadow-[0_6px_18px_rgba(15,43,92,0.07)]
        "
      >
        <div>
          <p className="text-xs font-bold text-[#0F2B5C]">
            Sr HSE Officer
          </p>

          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
        </div>
      </div>


      {/* =====================================================
          CFO
      ====================================================== */}

      <div
        className="
          absolute left-[70%] top-[142px]
          flex h-[76px] w-[235px]
          -translate-x-1/2
          flex-col items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          text-center
          shadow-[0_8px_25px_rgba(15,43,92,0.08)]
        "
      >
        <p className="text-sm font-bold text-[#0F2B5C]">
          Chief Finance Officer
        </p>

        <div className="mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
      </div>


      {/* CFO DOWN */}
      <div
        className="
          absolute left-[70%] top-[218px]
          h-[60px] w-[2px]
          bg-[#0F2B5C]
        "
      />


      {/* =====================================================
          FINANCE MANAGER
      ====================================================== */}

      <div
        className="
          absolute left-[70%] top-[278px]
          flex h-[78px] w-[190px]
          -translate-x-1/2
          items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          p-3
          text-center
          shadow-[0_6px_18px_rgba(15,43,92,0.07)]
        "
      >
        <div>
          <p className="text-xs font-bold text-[#0F2B5C]">
            Finance Manager
          </p>

          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
        </div>
      </div>


      {/* =====================================================
          WH & LOGISTIC
      ====================================================== */}

      <div
        className="
          absolute left-[84%] top-[142px]
          flex h-[76px] w-[235px]
          -translate-x-1/2
          flex-col items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          text-center
          shadow-[0_8px_25px_rgba(15,43,92,0.08)]
        "
      >
        <p className="text-sm font-bold text-[#0F2B5C]">
          WH & Logistic Manager
        </p>

        <div className="mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
      </div>


      {/* =====================================================
          PART & KEY ACCOUNT
      ====================================================== */}

      <div
        className="
          absolute left-[94%] top-[142px]
          flex h-[76px] w-[235px]
          -translate-x-1/2
          flex-col items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          text-center
          shadow-[0_8px_25px_rgba(15,43,92,0.08)]
        "
      >
        <p className="text-sm font-bold leading-tight text-[#0F2B5C]">
          Part & Key Account
          <br />
          Manager
        </p>

        <div className="mt-2 h-1 w-8 rounded-full bg-[#FFC107]" />
      </div>


    </div>
  </div>
</div>


        {/* ================= MANAGEMENT TEAM DINAMIS DARI DATABASE ================= */}
        <div id="management" className="mt-12 scroll-mt-24">
          <Management managementTeam={managementTeam} />
        </div>

        {/* ================= OUR CUSTOMERS DINAMIS DARI DATABASE ================= */}
        <OurCustomers customers={customers} />
      </section>

      {/* ============================== COMPANY CULTURE + GOVERNANCE ============================== */}
      <section className="bg-[#F8FAFC] pt-6 pb-12 border-t border-slate-200">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 items-stretch">
          
          <div className="flex flex-col h-full">
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Culture
            </span>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 flex-1">
              {cultureItems.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={i}
                    className="group flex flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-xl"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F2B5C]/5 text-[#0F2B5C] transition-colors duration-300 group-hover:bg-[#FFC107]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-2.5 text-xs font-bold leading-tight text-[#0F2B5C]">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[10px] leading-snug text-[#64748B]">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Corporate Governance
            </span>
            <div className="flex flex-col justify-between flex-1 h-full rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFC107] hover:shadow-xl md:p-7">
              <p className="mb-6 text-sm leading-relaxed text-[#64748B]">
                Kami berkomitmen menerapkan prinsip Good Corporate Governance (GCG) secara konsisten demi memberikan pelayanan servis alat berat terbaik, terpercaya, dan profesional di Indonesia.
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 my-auto">
                {governancePrinciples.map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <div 
                      key={i} 
                      className="group flex items-start gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-[#F8FAFC]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFC107]/15 text-[#0F2B5C] transition-all duration-300 group-hover:bg-[#FFC107] group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#0F2B5C]">
                          {g.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-snug text-[#64748B]">
                          {g.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================== CTA BANNER ============================== */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative flex min-h-[280px] items-center overflow-hidden px-8 py-14 sm:px-12"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(11,18,32,0.70), rgba(11,18,32,0.85)), url('https://img.youtube.com/vi/qIVMKITIV7o/maxresdefault.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="max-w-md text-xl font-extrabold uppercase leading-tight text-white sm:text-2xl md:text-3xl">
              BUILDING THE FUTURE OF HEAVY EQUIPMENT SERVICES
            </h3>
            <p className="mt-3 text-sm font-semibold text-[#FFC107]">
              Menjadi fondasi menuju Smart Mining Service Ecosystem.
            </p>

            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              aria-label="Play company video"
              className="mt-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 bg-[#0B1220]/40 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#0B1220]"
            >
              <IconPlay className="ml-1 h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="relative flex min-h-[280px] items-center overflow-hidden bg-[#FFC107] px-8 py-14 sm:px-12"
          style={{
            backgroundImage: "linear-gradient(to left, rgba(255,193,7,0.35), rgba(255,193,7,0.92)), url('https://placehold.co/960x480/FFC107/FFC107?text=+')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="max-w-sm text-xl font-extrabold uppercase leading-tight text-[#0B1220] sm:text-2xl md:text-3xl">
              LET'S BUILD A BETTER FUTURE TOGETHER
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#0B1220]/80">
              We are ready to support your business with our best services and solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/6282258013177?text=Halo%20PT.%20Servistama%20Pro%20Indonesia,%20saya%20tertarik%20untuk%20menghubungi%20Anda."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#0B1220] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0F2B5C] hover:shadow-lg"
                >
                  Contact Us
                  <IconArrow className="h-4 w-4" />
                </a>
                <a
                  href="mailto:info@servistamapro.co.id?subject=Request%20Consultation%20-%20PT.%20Servistama%20Pro%20Indonesia"
                  className="inline-flex items-center gap-2 rounded-md border-2 border-[#0B1220] px-6 py-3 text-sm font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B1220] hover:text-white"
                >
                  Request Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-white hover:text-black"
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