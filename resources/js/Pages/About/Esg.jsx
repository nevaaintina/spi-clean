import React, { useRef, useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* =========================================================
   FADE REVEAL (ANIMASI SCROLL HIDUP & DINAMIS)
========================================================= */
function FadeReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
        transition-all duration-1000 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-12 scale-[0.98]"
        }
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const Esg = () => {
    return (
        <div className="min-h-screen font-sans antialiased text-slate-800 bg-gradient-to-b from-white via-green-50 to-green-200 relative overflow-x-hidden flex flex-col justify-between">
            <Head title="Environment, Social & Governance (ESG) - Komitmen Berkelanjutan" />
            
            {/* NAVBAR */}
            <Navbar />

            {/* DECORATIVE BACKGROUND IMAGES */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-green-300/20 blur-3xl"></div>
                
                {/* Foto 1: Membentang penuh di area atas satu layar dengan animasi halus */}
                <div 
                    className="absolute top-0 inset-x-0 w-full h-[400px] sm:h-[650px] opacity-25 mix-blend-multiply transform scale-105 transition-transform duration-1000 ease-out"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)'
                    }}
                >
                    <img 
                        src="/images/section-esg1.png" 
                        alt="Sustainability Environment" 
                        className="w-full h-full object-cover object-center" 
                    />
                </div>
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-36 flex flex-col justify-center flex-grow w-full">
                
                {/* HEADER TITLE */}
                <FadeReveal>
                    <div className="text-center mb-10 sm:mb-20 md:mb-28">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-900 drop-shadow-sm">
                            Sustainability & Responsibility
                        </h1>
                    </div>
                </FadeReveal>

                {/* CONTENT BLOCKS */}
                <div className="space-y-8 sm:space-y-20 md:space-y-28">
                    
                    {/* CONTENT 01: ENVIRONMENTAL COMMITMENT */}
                    <FadeReveal delay={150}>
                        <section className="bg-white/45 backdrop-blur-sm p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/60 shadow-sm transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-1">
                            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-emerald-700 uppercase block mb-2 sm:mb-3">
                                Environmental Commitment
                            </span>
                            <p className="text-sm sm:text-base md:text-xl font-normal leading-relaxed text-[#40554A]">
                                "Komitmen dalam menjaga kelestarian lingkungan dan pengelolaan dampak operasional berdasarkan UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup."
                            </p>
                        </section>
                    </FadeReveal>

                    {/* CONTENT 02: SOCIAL & WORKFORCE COMMITMENT */}
                    <FadeReveal delay={300}>
                        <section className="bg-white/45 backdrop-blur-sm p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/60 shadow-sm transition-all duration-300 hover:bg-white/70 hover:shadow-md hover:-translate-y-1">
                            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-emerald-700 uppercase block mb-2 sm:mb-3">
                                Social & Workforce Commitment
                            </span>
                            <p className="text-sm sm:text-base md:text-xl font-normal leading-relaxed text-[#40554A]">
                                "Komitmen terhadap kesejahteraan tenaga kerja, keselamatan kerja (K3), dan pemberdayaan masyarakat sekitar berdasarkan UU No. 13 Tahun 2003 tentang Ketenagakerjaan serta UU No. 40 Tahun 2007 tentang TJSL."
                            </p>
                        </section>
                    </FadeReveal>

                </div>

            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Esg;