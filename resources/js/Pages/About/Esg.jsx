import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const Esg = () => {
    return (
        <div className="min-h-screen font-sans antialiased text-slate-800 bg-gradient-to-b from-white via-green-50 to-green-200 relative overflow-x-hidden flex flex-col justify-between">
            <Head title="Environment, Social & Governance (ESG) - Komitmen Berkelanjutan" />
            
            {/* NAVBAR */}
            <Navbar />

            {/* DECORATIVE BACKGROUND IMAGES */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl"></div>
                <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-green-300/20 blur-3xl"></div>
                
                {/* Foto 1: Membentang penuh di area atas satu layar */}
                <div 
                    className="absolute top-0 inset-x-0 w-full h-[650px] opacity-25 mix-blend-multiply"
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
            <main className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-36 flex flex-col justify-center flex-grow w-full">
                
                {/* HEADER TITLE */}
                <div className="text-center mb-20 md:mb-28">
                    
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                        Sustainability & Responsibility
                    </h1>
                </div>

                {/* CONTENT BLOCKS */}
                <div className="space-y-20 md:space-y-28">
                    
                    {/* CONTENT 01: ENVIRONMENTAL COMMITMENT */}
                    <section className="bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/60 shadow-sm transition-all duration-300 hover:bg-white/60">
                        <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase block mb-3">
                            Environmental Commitment
                        </span>
                        <p className="text-base md:text-xl font-normal leading-relaxed text-[#40554A]">
                            "Komitmen dalam menjaga kelestarian lingkungan dan pengelolaan dampak operasional berdasarkan UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup."
                        </p>
                    </section>

                    {/* CONTENT 02: SOCIAL & WORKFORCE COMMITMENT */}
                    <section className="bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/60 shadow-sm transition-all duration-300 hover:bg-white/60">
                        <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase block mb-3">
                            Social & Workforce Commitment
                        </span>
                        <p className="text-base md:text-xl font-normal leading-relaxed text-[#40554A]">
                            "Komitmen terhadap kesejahteraan tenaga kerja, keselamatan kerja (K3), dan pemberdayaan masyarakat sekitar berdasarkan UU No. 13 Tahun 2003 tentang Ketenagakerjaan serta UU No. 40 Tahun 2007 tentang TJSL."
                        </p>
                    </section>

                </div>

            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Esg;