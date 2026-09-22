import React, { useRef, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head, useForm } from "@inertiajs/react";

/* =========================================================
   FADE REVEAL
========================================================= */
function FadeReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
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
      className={`
        ${className}
        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function Career({ jobVacancies = [], careerTestimonials = [] }) {
  // Inertia Form untuk Aplikasi Lamaran Kerja Online
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    position: '',
    portfolio_link: '',
    message: '',
  });

  const submitApplication = (e) => {
    e.preventDefault();
    post('/career/apply-submit', {
      preserveScroll: true,
      onSuccess: () => {
        alert("Lamaran berhasil dikirim! Tim HRD kami akan segera menghubungi Anda.");
        reset();
      },
    });
  };

  // Data Fallback Statis jika database jobVacancies masih kosong
  const fallbackJobListings = [
    {
      id: 1,
      title: "Senior Heavy Equipment Mechanic",
      department: "Service & Maintenance",
      location: "Tangerang (Head Office) / On-Site",
      job_type: "Full-time",
      education: "Pendidikan min. D3 Teknik",
      description: "Melakukan perawatan, perbaikan, dan overhaul alat berat XCMG sesuai standar operasional dan prosedur K3.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      requirements: "Pengalaman min. 3 tahun di bidang alat berat, Memahami sistem hidrolik elektrik dan engine, Bersedia ditempatkan di site",
    },
    {
      id: 2,
      title: "XCMG Product Specialist",
      department: "Sales & Marketing",
      location: "Jakarta / BSD",
      job_type: "Full-time",
      education: "Pendidikan min. S1 Teknik / Manajemen",
      description: "Mengelola klien korporat dan memberikan konsultasi teknis spesifikasi unit alat berat.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      requirements: "Pengalaman di bidang sales alat berat min. 2 tahun, Memiliki komunikasi dan negosiasi yang baik, Bersedia melakukan perjalanan dinas",
    },
  ];

  // Gunakan data dari database jika ada, jika tidak gunakan fallback
  const activeJobListings = jobVacancies && jobVacancies.length > 0 ? jobVacancies : fallbackJobListings;

  // Filter Testimoni Karyawan (employee) & Magang (intern) dari Database
  const employeeStories = careerTestimonials.filter(t => t.category === 'employee');
  const internTestimonials = careerTestimonials.filter(t => t.category === 'intern');

  // Fallback Statis jika database masih kosong
  const fallbackStories = [
    { name: "Budi Santoso", role: "Lead Service Mechanic · Join 2019", quote: "Bekerja di SPI memberikan banyak kesempatan belajar teknologi alat berat terbaru langsung dari standar pabrikan global.", image_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=90" },
    { name: "Siti Rahma", role: "Senior Sales Executive · Join 2021", quote: "Lingkungan kerja yang suportif dan jenjang karier yang jelas membuat saya terus termotivasi untuk berkembang.", image_path: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=90" },
  ];

  const fallbackInterns = [
    { name: "Alya Rahmawati", role: "Web Development Intern", university: "Universitas Brawijaya", quote: "Selama magang di SPI, saya mendapatkan banyak ilmu baru, terutama tentang dunia kerja di industri alat berat. Pembimbingnya sangat baik dan suportif.", image_path: "/images/testimonial-1.jpg" },
    { name: "Rizky Pratama", role: "IT Support Intern", university: "Politeknik Negeri Malang", quote: "Program magang ini benar-benar membantu saya mengembangkan skill, terutama dalam bidang teknis dan kerja tim. Pengalamannya sangat berharga.", image_path: "/images/testimonial-2.jpg" },
  ];

  const activeStories = employeeStories.length > 0 ? employeeStories : fallbackStories;
  const activeInterns = internTestimonials.length > 0 ? internTestimonials : fallbackInterns;

  // Data Statis Budaya Perusahaan
  const cultureList = [
    { title: "Integritas", description: "Selalu bertindak jujur, transparan, dan profesional dalam setiap pekerjaan demi membangun kepercayaan." },
    { title: "Safety First", description: "Penerapan standar K3 yang ketat untuk menciptakan lingkungan kerja yang aman, sehat, dan bebas dari kecelakaan." },
    { title: "Innovation", description: "Mendorong ide kreatif dan penggunaan teknologi terbaru untuk memberikan solusi terbaik dan nilai tambah bagi pelanggan." },
  ];

  // Data Statis Jenjang Karier
  const pathList = [
    { level: "01", title: "Junior / Staff", description: "Periode orientasi, pelatihan dasar keahlian, dan pendampingan mentor senior." },
    { level: "02", title: "Specialist / Senior Staff", description: "Penguasaan teknis mendalam, penanganan proyek mandiri, dan evaluasi kinerja." },
    { level: "03", title: "Supervisor / Leader", description: "Memimpin tim operasional, koordinasi lapangan, dan tanggung jawab strategis." },
    { level: "04", title: "Manager / Head of Dept", description: "Pengambilan keputusan tingkat lanjut dan pengembangan divisi perusahaan." },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-x-hidden">
      <Head title="Career - PT Servistama Pro Indonesia" />
      <Navbar />

      {/* =========================================================
          HERO BANNER
      ===================================================== */}
      <section className="relative bg-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-100 pointer-events-none"
          style={{ backgroundImage: "url('/images/karir.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 py-20 md:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#ffc107]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#0f2b5c] uppercase">
                  Career at SPI
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-[#0f2b5c] tracking-tight">
                Build Your
                <br />
                <span className="text-[#ffc107]">Future With Us.</span>
              </h1>

              <p className="mt-7 max-w-xl text-sm md:text-base leading-7 text-slate-600">
                Temukan kesempatan untuk berkembang, berkolaborasi, dan membangun karier bersama perusahaan penyedia layanan alat berat terkemuka di Indonesia.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <a
                  href="#vacancies"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0f2b5c] text-white rounded-xl font-bold text-sm hover:bg-[#ffc107] hover:text-[#0f2b5c] transition-all duration-300 shadow-md"
                >
                  Lihat Lowongan
                  <span>→</span>
                </a>

                <a
                  href="#culture"
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-slate-300 text-[#0f2b5c] rounded-xl font-semibold text-sm hover:bg-slate-100 transition-all duration-300"
                >
                  Our Culture
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 border border-[#ffc107]/30 rounded-[2rem] rotate-2" />

              <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="/images/karir2.jpg"
                  alt="SPI Team"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2348]/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="backdrop-blur-md bg-white/90 border border-slate-200 rounded-2xl p-5 shadow-lg">
                    <p className="text-[#0f2b5c] text-[10px] font-bold uppercase tracking-widest mb-1">
                      Join Our Team
                    </p>
                    <p className="text-[#0f2b5c] font-black text-lg">
                      Grow. Contribute. Make an Impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          OUR CULTURE
      ===================================================== */}
      <section id="culture" className="relative bg-white py-20 md:py-24 overflow-hidden border-t border-slate-200">
        <div
          className="absolute left-0 top-10 w-32 h-32 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#d9dee7 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.55fr] gap-10 lg:gap-14 mb-14 md:mb-16">
            <div className="relative min-h-[620px] flex flex-col">
              <div className="flex items-center gap-3 mb-7">
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase text-[#b07b00]">
                  OUR CULTURE
                </span>
                <span className="w-8 h-[2px] bg-[#dca500]" />
              </div>

              <h2 className="text-[42px] md:text-[48px] lg:text-[50px] font-black leading-[1.08] tracking-[-0.025em] text-[#0b2348]">
                Where People
                <br />
                <span className="text-[#dca500]">
                  Grow Together.
                </span>
              </h2>

              <div className="w-10 h-[2px] bg-[#dca500] mt-7 mb-6" />

              <p className="max-w-[430px] text-[13px] md:text-[14px] text-[#536782] leading-[1.9]">
                Di SPI, kami percaya bahwa kesuksesan perusahaan dibangun oleh manusia yang bertumbuh bersama. Budaya kerja kami mencerminkan komitmen terhadap integritas, keselamatan, kolaborasi, dan inovasi berkelanjutan dalam setiap langkah.
              </p>

              <div className="absolute left-[-48px] right-[-30px] bottom-[-55px] h-[320px] pointer-events-none overflow-hidden">
                <img
                  src="/images/karir-culture.jpg"
                  alt="Open pit mining with heavy equipment"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cultureList.map((item, index) => (
                <div key={index} className="group relative bg-white rounded-[18px] border border-[#edf0f4] shadow-[0_5px_25px_rgba(11,35,72,0.07)] min-h-[475px] px-7 pt-9 pb-7 flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(11,35,72,0.12)] transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#e5ad00]" />
                  <div className="flex items-start justify-between">
                    <div
                      className="w-[92px] h-[92px] bg-[#0b2348] flex items-center justify-center shadow-md relative"
                      style={{
                        clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
                      }}
                    >
                      <svg className="w-10 h-10 text-[#ffc107]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="pt-2">
                      <span className="text-[30px] font-black text-[#b17d00]">{String(index + 1).padStart(2, "0")}</span>
                      <div className="w-9 h-[2px] bg-[#dca500] mt-3" />
                    </div>
                  </div>
                  <h3 className="mt-9 text-[20px] font-black text-[#0b2348]">
                    {item.title}
                  </h3>
                  <div className="w-11 h-[2px] bg-[#e1ad00] mt-4 mb-6" />
                  <p className="text-[13px] leading-[2] text-[#62728a]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-20 bg-[#0b2348] rounded-[18px] shadow-[0_15px_35px_rgba(11,35,72,0.22)] px-6 md:px-8 lg:px-10 py-6 md:py-7 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-6 lg:gap-0 items-center">
              <div className="flex items-center gap-4 lg:pr-8">
                <div className="w-14 h-14 rounded-full bg-[#172f55] border border-[#ffc107]/20 flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 text-[#ffc107]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <p className="text-[12px] md:text-[13px] text-slate-200 leading-[1.6]">
                  <strong className="block text-white text-sm">Bersama SPI,</strong>
                  mari tumbuh, berinovasi, dan memberikan dampak yang lebih besar.
                </p>
              </div>

              <div className="lg:border-l lg:border-white/20 lg:pl-8">
                <div className="flex items-center gap-4">
                  <svg className="w-9 h-9 text-[#ffc107] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="9" cy="7" r="4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-2a6 6 0 016-6h0a6 6 0 016 6v2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 100-8" />
                  </svg>
                  <div>
                    <div className="text-[27px] font-black leading-none text-[#ffc107]">1.500+</div>
                    <div className="text-[10px] text-slate-300 mt-2 font-semibold">Talenta Profesional</div>
                  </div>
                </div>
              </div>

              <div className="lg:border-l lg:border-white/20 lg:pl-8">
                <div className="flex items-center gap-4">
                  <svg className="w-9 h-9 text-[#ffc107] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <div className="text-[27px] font-black leading-none text-[#ffc107]">0</div>
                    <div className="text-[10px] text-slate-300 mt-2 font-semibold">Kecelakaan Kerja</div>
                  </div>
                </div>
              </div>

              <div className="lg:border-l lg:border-white/20 lg:pl-8">
                <div className="flex items-center gap-4">
                  <svg className="w-9 h-9 text-[#ffc107] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div>
                    <div className="text-[27px] font-black leading-none text-[#ffc107]">10+</div>
                    <div className="text-[10px] text-slate-300 mt-2 font-semibold">Tahun Pengalaman</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          JOB VACANCY
      ===================================================== */}
      <section id="vacancies" className="py-20 md:py-24 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a97800]">
              Job Vacancy
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#0b2348]">
              Find Your <span className="text-[#d89f00]">Next Role.</span>
            </h2>

            <p className="mt-4 text-xs md:text-sm text-slate-500 leading-6">
              Temukan posisi yang sesuai dengan keahlian dan jadilah bagian dari perjalanan sukses PT. Servistama Pro Indonesia.
            </p>
          </div>

          <div className="space-y-6">
            {activeJobListings.map((job, index) => {
              const jobImage = job.image ? (job.image.startsWith('http') ? job.image : `/${job.image}`) : "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80";
              const requirementsList = job.requirements ? job.requirements.split(',').map(r => r.trim()).filter(Boolean) : [];

              return (
                <div
                  key={job.id}
                  className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-[#ffc107] hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-[340px_1fr]"
                >
                  <div className="relative h-56 lg:h-full min-h-[220px] overflow-hidden">
                    <img
                      src={jobImage}
                      alt={job.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-10 h-10 rounded-xl bg-[#0b2348] flex items-center justify-center text-[#ffc107] font-black text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="px-3 py-1 rounded-md bg-[#fff4cc] text-[#947000] text-[10px] font-bold uppercase tracking-wide">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                            {job.job_type}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-extrabold text-[#0b2348] group-hover:text-[#a97800] transition-colors mb-2">
                        {job.title}
                      </h3>

                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-5">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 mb-6 pb-6 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0b2348] tracking-wider uppercase text-[10px] bg-slate-100 px-2.5 py-1 rounded">Lokasi</span>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0b2348] tracking-wider uppercase text-[10px] bg-slate-100 px-2.5 py-1 rounded">Kualifikasi</span>
                          <span>{job.education}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
                      <div>
                        {requirementsList.length > 0 && (
                          <>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                              Requirements:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {requirementsList.map((req, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                  <span className="text-amber-500 font-bold shrink-0">✓</span>
                                  <span>{req}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="shrink-0 pt-4 md:pt-0">
                        <a
                          href="#apply"
                          onClick={() => setData('position', job.title)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0b2348] text-white text-xs font-bold hover:bg-[#ffc107] hover:text-[#0b2348] transition-all duration-300 shadow-md w-full md:w-auto"
                        >
                          Apply Now
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 relative overflow-hidden rounded-3xl bg-[#0b2348] p-8 md:p-10 shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-[#ffc107]/40 flex items-center justify-center p-2.5 shrink-0 shadow-inner">
                  <img 
                    src="/images/logo-spi.png" 
                    alt="Logo SPI" 
                    className="w-full h-full object-contain filter brightness-0 invert" 
                  />
                </div>

                <div>
                  <h3 className="text-white font-black text-lg md:text-xl">
                    Tidak menemukan posisi yang sesuai?
                  </h3>
                  <p className="text-slate-300 text-xs md:text-sm mt-1">
                    Kirimkan CV Anda dan kami akan menyimpannya untuk peluang karier selanjutnya.
                  </p>
                </div>
              </div>

              <a
                href="#apply"
                className="shrink-0 px-8 py-4 rounded-xl bg-[#ffc107] text-[#0b2348] text-xs font-black hover:bg-white transition-all duration-300 shadow-lg"
              >
                Kirim CV Anda →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAREER PATH
      ===================================================== */}
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a97800]">
              Career Development
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#0b2348]">
              Your Career <span className="text-[#d89f00]">Journey.</span>
            </h2>

            <p className="mt-4 text-xs md:text-sm text-slate-500 leading-6">
              Kami menyediakan jalur pengembangan karier yang transparan dan terstruktur bagi setiap karyawan.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-[1px] bg-slate-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pathList.map((path, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-[#0b2348] border-4 border-white shadow-lg flex items-center justify-center text-[#ffc107] font-black text-sm">
                    {path.level}
                  </div>

                  <h3 className="mt-6 font-extrabold text-[#0b2348]">
                    {path.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500 max-w-xs mx-auto">
                    {path.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EMPLOYEE STORIES (DINAMIS DARI DATABASE KATEGORI: employee)
      ===================================================== */}
      <section className="relative py-24 md:py-28 bg-[#071b38] overflow-hidden border-t border-b border-slate-800">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/employee.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b38]/5 via-[#071b38]/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ffc107]">
              Employee Stories
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-black text-white">
              Hear From <span className="text-[#ffc107]">Our People.</span>
            </h2>

            <p className="mt-4 text-xs md:text-sm text-white leading-6">
              Pengalaman dan cerita dari orang-orang yang menjadi bagian dari perjalanan SPI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {activeStories.map((story, index) => {
              const imgUrl = story.image_path ? (story.image_path.startsWith('http') ? story.image_path : `/${story.image_path}`) : (story.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=90");
              return (
                <div
                  key={story.id || index}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 md:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-2xl hover:border-[#ffc107] transition-all duration-300"
                >
                  <div className="absolute top-5 right-6 text-4xl font-serif text-[#ffc107]/40">
                    “
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 leading-6 pr-6 min-h-[95px]">
                    "{story.quote}"
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full overflow-hidden ring-2 ring-[#ffc107] shrink-0 shadow-sm">
                      <img
                        src={imgUrl}
                        alt={story.name}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#0b2348]">
                        {story.name}
                      </h4>
                      <p className="text-[10px] font-medium text-[#b27b00] mt-0.5">
                        {story.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERNSHIP PROGRAM & TESTIMONIAL SECTION (DINAMIS DARI DATABASE KATEGORI: intern)
      ===================================================== */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <div className="relative overflow-hidden min-h-[520px] md:min-h-[560px] bg-slate-50 border border-slate-200/80 rounded-[2rem]">
            <div className="absolute left-0 bottom-0 w-[250px] h-[180px] bg-[#0b2348]/5 rounded-tr-[100px] opacity-70 pointer-events-none" />

            <div className="relative z-10 max-w-[1600px] mx-auto min-h-[520px] md:min-h-[560px]">
              <div className="relative z-20 w-full lg:w-[52%] px-8 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 lg:py-24">
                <div className="flex items-center gap-4 mb-7">
                  <span className="w-12 h-[2px] bg-[#ffc107]" />
                  <span className="text-[11px] md:text-xs font-bold tracking-[0.22em] uppercase text-[#0b2348]">
                    INTERNSHIP PROGRAM
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-[58px] xl:text-[64px] font-black leading-[1.02] tracking-[-0.03em] text-[#0b2348]">
                  Start Your Career
                  <br />
                  <span className="text-[#b27b00]">
                    With Real Experience.
                  </span>
                </h2>

                <p className="mt-7 max-w-[600px] text-sm md:text-base lg:text-[16px] leading-7 text-slate-600">
                  Buka kesempatan bagi mahasiswa/i SMK atau Perguruan Tinggi untuk merasakan pengalaman kerja nyata di industri alat berat bersama para ahli dan profesional SPI.
                </p>

                <div className="mt-8 flex flex-col xl:flex-row xl:items-center gap-8">
                  <a
                    href="#apply"
                    className="inline-flex w-fit items-center justify-center gap-4 px-7 py-4 rounded-xl bg-[#0b2348] text-white text-xs md:text-sm font-medium shadow-sm hover:bg-[#ffc107] hover:text-[#0b2348] hover:-translate-y-1 transition-all duration-300"
                  >
                    Daftar Internship
                    <span className="text-lg leading-none text-[#ffc107]">→</span>
                  </a>

                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3">
                      <div className="text-[#0b2348]">
                        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="7" width="18" height="13" rx="2" />
                          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M3 12h18" />
                        </svg>
                      </div>
                      <div className="text-[10px] md:text-xs text-slate-600 leading-4">
                        Real Work<br />Experience
                      </div>
                    </div>

                    <span className="hidden xl:block w-px h-8 bg-slate-300" />

                    <div className="flex items-center gap-3">
                      <div className="text-[#0b2348]">
                        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div className="text-[10px] md:text-xs text-slate-600 leading-4">
                        Professional<br />Mentorship
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-full lg:w-[52%] h-full pointer-events-none">
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: "polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                >
                  <img
                    src="/images/internship.png"
                    alt="Internship Program SPI"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0b2348]/15" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-12 overflow-hidden bg-white px-6 py-16 md:px-12 lg:px-16">
            <div className="relative z-10 text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#ffc107]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.22em] uppercase text-[#0b2348]">
                  TESTIMONI MAHASISWA MAGANG
                </span>
                <span className="w-8 h-[2px] bg-[#ffc107]" />
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-[#0b2348]">
                Pengalaman Berharga, <span className="text-[#ffc107]">untuk Masa Depan</span>
              </h3>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeInterns.map((testi, index) => {
                const testiImg = testi.image_path ? (testi.image_path.startsWith('http') ? testi.image_path : `/${testi.image_path}`) : (testi.image || "/images/testimonial-1.jpg");
                return (
                  <div key={testi.id || index} className="bg-[#0b2348] text-white rounded-3xl p-7 shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shrink-0 border border-white/20 shadow-md">
                          <img src={testiImg} alt={testi.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-3xl font-serif font-black text-[#ffc107]">“</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        "{testi.quote}"
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-xs text-white">{testi.name}</h4>
                        <p className="text-[10px] text-slate-300">{testi.university || testi.role}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#ffc107] text-[#0b2348] text-[9px] font-extrabold">
                        {testi.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          APPLICATION FORM
      ===================================================== */}
      <section id="apply" className="relative bg-[#f4f6f9] overflow-hidden pb-20 md:pb-28">
        <div className="relative min-h-[360px] md:min-h-[390px] overflow-hidden bg-[#071d3b]">
          <div className="absolute inset-0 flex justify-end">
            <div className="relative w-full lg:w-[65%] h-full">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1800&q=85"
                alt="Mining and Heavy Equipment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071d3b] via-[#071d3b]/70 to-transparent lg:block" />
            </div>
          </div>

          <div className="absolute inset-0 bg-[#071d3b]/60 lg:bg-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-16 pt-14 md:pt-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#ffc107]">
                  Online Application
                </span>
                <span className="w-10 h-[2px] bg-[#ffc107]" />
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.08] text-white">
                Ready to <span className="text-[#ffc107]">Join Us?</span>
              </h2>

              <div className="w-16 h-[3px] bg-[#ffc107] mt-5 mb-4" />

              <p className="text-sm md:text-[15px] text-slate-200 leading-7 max-w-xl">
                Lengkapi data berikut untuk mengirimkan lamaran Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 max-w-[1120px] mx-auto px-5 md:px-8 -mt-12 md:-mt-14">
          <form
            onSubmit={submitApplication}
            className="relative bg-white rounded-[26px] md:rounded-[30px] border border-slate-200 shadow-[0_18px_50px_rgba(11,35,72,0.12)] px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-11"
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-7">
              <div className="relative w-[68px] h-[68px] rounded-full bg-[#0b2348] border-[2px] border-[#ffc107] flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-[#ffc107]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 11h6M9 15h4M7 3h8l4 4v14H5V3h2z"
                  />
                  <circle cx="9" cy="8" r="1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 8h2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l1.5 1.5L20 16" />
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-5">
              <div>
                <label className="flex items-center gap-3 text-xs font-bold text-[#0b2348] mb-2.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full h-12 px-4 rounded-xl border border-[#dfe5ee] bg-[#f8fafc] text-xs text-[#0b2348] outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#0b2348] focus:ring-2 focus:ring-[#0b2348]/5"
                />
                {errors.name && <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>}
              </div>

              <div>
                <label className="flex items-center gap-3 text-xs font-bold text-[#0b2348] mb-2.5">
                  Email Aktif
                </label>
                <input
                  type="email"
                  required
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full h-12 px-4 rounded-xl border border-[#dfe5ee] bg-[#f8fafc] text-xs text-[#0b2348] outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#0b2348] focus:ring-2 focus:ring-[#0b2348]/5"
                />
                {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}
              </div>

              <div>
                <label className="flex items-center gap-3 text-xs font-bold text-[#0b2348] mb-2.5">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={data.phone}
                  onChange={e => setData('phone', e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full h-12 px-4 rounded-xl border border-[#dfe5ee] bg-[#f8fafc] text-xs text-[#0b2348] outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#0b2348] focus:ring-2 focus:ring-[#0b2348]/5"
                />
                {errors.phone && <span className="text-red-500 text-[10px] mt-1 block">{errors.phone}</span>}
              </div>

              <div>
                <label className="flex items-center gap-3 text-xs font-bold text-[#0b2348] mb-2.5">
                  Posisi / Program yang Dilamar
                </label>
                <select
                  required
                  value={data.position}
                  onChange={e => setData('position', e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#dfe5ee] bg-[#f8fafc] text-xs text-slate-500 outline-none transition-all duration-200 focus:bg-white focus:border-[#0b2348] focus:ring-2 focus:ring-[#0b2348]/5"
                >
                  <option value="" disabled>
                    Pilih posisi atau program
                  </option>
                  {activeJobListings.map((job) => (
                    <option key={job.id} value={job.title}>{job.title}</option>
                  ))}
                  <option value="Internship Program (Magang)">Internship Program (Magang)</option>
                  <option value="Spontaneous Application (Lainnya)">Spontaneous Application (Lainnya)</option>
                </select>
                {errors.position && <span className="text-red-500 text-[10px] mt-1 block">{errors.position}</span>}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 text-xs font-bold text-[#0b2348] mb-2.5">
                  <span>
                    Link Portofolio / LinkedIn / CV
                    <span className="font-normal text-slate-400"> (Opsional)</span>
                  </span>
                </label>
                <input
                  type="url"
                  value={data.portfolio_link}
                  onChange={e => setData('portfolio_link', e.target.value)}
                  placeholder="https://linkedin.com/in/username atau link CV Anda"
                  className="w-full h-12 px-4 rounded-xl border border-[#dfe5ee] bg-[#f8fafc] text-xs text-[#0b2348] outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#0b2348] focus:ring-2 focus:ring-[#0b2348]/5"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 text-xs font-bold text-[#0b2348] mb-2.5">
                  Pesan / Motivasi Singkat
                </label>
                <textarea
                  rows={4}
                  value={data.message}
                  onChange={e => setData('message', e.target.value)}
                  placeholder="Ceritakan secara singkat mengapa Anda tertarik bergabung dengan SPI..."
                  className="w-full px-4 py-3.5 rounded-xl border border-[#dfe5ee] bg-[#f8fafc] text-xs text-[#0b2348] outline-none resize-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#0b2348] focus:ring-2 focus:ring-[#0b2348]/5"
                />
              </div>

            </div>

            <div className="mt-7 pt-6 border-t border-slate-100">
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
                <div className="flex items-center gap-4 bg-[#f5f7fa] rounded-2xl px-5 py-4 max-w-[500px]">
                  <div className="w-11 h-11 rounded-xl bg-[#0b2348] flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-[#ffc107]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 4.5-3.1 8.6-8 10-4.9-1.4-8-5.5-8-10V7l8-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0b2348]">
                      Data Anda Aman
                    </p>
                    <p className="text-[10px] text-slate-500 leading-4 mt-1 max-w-[330px]">
                      Informasi yang Anda berikan akan kami jaga kerahasiaannya dan hanya digunakan untuk proses rekrutmen.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full md:w-[270px] h-[54px] rounded-xl bg-[#0b2348] text-white font-black text-xs flex items-center justify-center gap-4 hover:bg-[#ffc107] hover:text-[#0b2348] transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  <span>{processing ? 'Mengirim...' : 'Kirim Lamaran'}</span>
                  <span className="text-[#ffc107] text-lg">→</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}