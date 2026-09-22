import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Esg() {
    // Data Statis Inisiatif CSR
    const csrList = [
        { 
            category: 'Edukasi', 
            title: 'Pelatihan Teknisi Gratis', 
            desc: 'Program pembekalan keterampilan mekanik alat berat gratis bagi pemuda lokal untuk mendorong kesiapan kerja industri.',
            image: '/images/internship.png'
        },
        { 
            category: 'Infrastruktur', 
            title: 'Bantuan Fasilitas Umum', 
            desc: 'Perbaikan dan dukungan sarana publik bagi warga sekitar area kerja untuk mendukung kenyamanan kehidupan bermasyarakat.',
            image: '/images/internship.png'
        },
        { 
            category: 'Kemanusiaan', 
            title: 'Tanggap Bencana & Sembako', 
            desc: 'Aksi cepat tanggap penyerahan bantuan logistik dan sembako bagi masyarakat terdampak kondisi darurat bencana.',
            image: '/images/internship.png'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
            <Head title="Environment, Social & Governance (ESG) - PT Servistama Pro Indonesia" />
            <Navbar />

            {/* HERO BANNER */}
            <section className="relative bg-[#0f2b5c] text-white pt-32 pb-24 overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-15 bg-cover bg-center" 
                    style={{ backgroundImage: `url('/images/internship.png')` }} 
                />
                <div className="relative max-w-7xl mx-auto px-6 md:px-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#ffc107]" />
                        <span className="text-xs font-bold text-[#ffc107] uppercase tracking-wider">Sustainability Framework</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl leading-tight">
                        Environment, Social & Governance <span className="text-[#ffc107]">(ESG)</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
                        Membangun pertumbuhan bisnis jangka panjang yang bertanggung jawab terhadap kelestarian lingkungan, keselamatan insan kerja, dan tata kelola perusahaan yang transparan.
                    </p>
                </div>
            </section>

            {/* MAIN OVERVIEW SECTION */}
            <section className="py-20 max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <span className="text-xs font-black tracking-widest text-[#0f2b5c]/60 uppercase">VISI MASA DEPAN</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#0f2b5c] leading-tight">
                            Komitmen Keberlanjutan Dalam Setiap Operasional
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            Di PT Servistama Pro Indonesia, kami percaya bahwa efisiensi alat berat XCMG harus berjalan selaras dengan kepedulian lingkungan dan dampak positif bagi masyarakat.
                        </p>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            Integrasi prinsip ESG menjadi standar operasional utama kami—mulai dari manajemen workshop, keselamatan teknisi, hingga transparansi sistem layanan garansi.
                        </p>
                    </div>
                    <div className="lg:col-span-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                            <img 
                                src="/images/internship.png" 
                                alt="ESG PT Servistama Pro Indonesia" 
                                className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b5c]/80 via-transparent to-transparent flex items-end p-8">
                                <span className="text-white font-bold text-sm tracking-wide">
                                    Standar Operasional Berkelanjutan & Terpercaya
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 1. ENVIRONMENTAL PROGRAM */}
            <section className="py-20 bg-emerald-950/5 border-t border-emerald-900/10">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-100 px-3 py-1 rounded-md inline-block mb-3">
                            Pilar 01 — Environment
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#0f2b5c]">Environmental Program</h2>
                        <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                            Inisiatif hijau dalam menekan jejak karbon serta pengelolaan limbah operasional alat berat secara bertanggung jawab.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CARD 01 */}
                        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xl mb-6">01</div>
                                <h3 className="text-xl font-black text-[#0f2b5c] mb-3">Efisiensi Energi Workshop</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Optimalisasi energi melalui pemanfaatan pencahayaan alami, penggunaan sistem LED efisiensi tinggi, serta pengaturan daya otomatis di fasilitas workshop.</p>
                            </div>
                        </div>

                        {/* CARD 02 */}
                        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xl mb-6">02</div>
                                <h3 className="text-xl font-black text-[#0f2b5c] mb-3">Pengelolaan Limbah B3</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Sistem pengolahan dan penampungan berstandar ISO untuk limbah berbahaya seperti oli bekas, pelumas, dan komponen habis pakai.</p>
                            </div>
                        </div>

                        {/* CARD 03 */}
                        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xl mb-6">03</div>
                                <h3 className="text-xl font-black text-[#0f2b5c] mb-3">Material Ramah Lingkungan</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Penggunaan bahan pendukung eco-friendly serta penerapan digitalisasi dokumen administratif servis secara menyeluruh (Paperless System).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SOCIAL RESPONSIBILITY */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-sky-700 uppercase bg-sky-100 px-3 py-1 rounded-md inline-block mb-3">
                            Pilar 02 — Social
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#0f2b5c]">Social Responsibility</h2>
                        <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                            Prioritas utama kami terletak pada keselamatan kerja teknis, pengembangan kapabilitas tim, serta iklim kerja yang inklusif.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="border-t border-slate-200 pt-6">
                            <span className="text-sky-600 text-xs font-black tracking-widest uppercase block mb-2">01. Safety & HSE</span>
                            <h3 className="text-lg font-black text-[#0f2b5c] mb-3">Standar K3 / HSE Ketat</h3>
                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">Penerapan Prosedur Keselamatan Kerja tingkat tinggi bagi setiap mekanik di lapangan demi mencapai target Zero Accident.</p>
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                            <span className="text-sky-600 text-xs font-black tracking-widest uppercase block mb-2">02. Well-being</span>
                            <h3 className="text-lg font-black text-[#0f2b5c] mb-3">Kesejahteraan & SDM</h3>
                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">Jaminan perlindungan kesehatan kerja komprehensif, sertifikasi kompetensi berkala, dan jenjang karir yang terukur.</p>
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                            <span className="text-sky-600 text-xs font-black tracking-widest uppercase block mb-2">03. Inclusivity</span>
                            <h3 className="text-lg font-black text-[#0f2b5c] mb-3">Lingkungan Kerja Inklusif</h3>
                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">Membangun budaya kerja yang saling menghargai, adil tanpa diskriminasi, serta menjamin hak-hak seluruh karyawan.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. GOVERNANCE */}
            <section className="py-20 bg-[#0f2b5c] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-[#ffc107] uppercase bg-white/10 px-3 py-1 rounded-md inline-block mb-3">
                            Pilar 03 — Governance
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white">Good Governance</h2>
                        <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed font-light">
                            Menjaga kepercayaan klien melalui tata kelola perusahaan yang berintegritas dan transparan.
                        </p>
                    </div>

                    <div className="divide-y divide-white/10">
                        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-4 flex items-center gap-3">
                                <span className="text-[#ffc107] font-mono text-sm">01/</span>
                                <h3 className="text-lg font-black text-white">Kepatuhan Hukum</h3>
                            </div>
                            <p className="md:col-span-8 text-slate-300 text-sm leading-relaxed font-light">
                                Menjamin seluruh alur bisnis dan distribusi alat berat mematuhi regulasi hukum serta norma industri yang berlaku secara penuh tanpa kompromi.
                            </p>
                        </div>

                        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-4 flex items-center gap-3">
                                <span className="text-[#ffc107] font-mono text-sm">02/</span>
                                <h3 className="text-lg font-black text-white">Transparansi Garansi</h3>
                            </div>
                            <p className="md:col-span-8 text-slate-300 text-sm leading-relaxed font-light">
                                Sistem klaim garansi unit XCMG yang terbuka, terstruktur, dan dapat diawasi tahapan prosesnya secara jelas oleh setiap mitra operasional.
                            </p>
                        </div>

                        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-4 flex items-center gap-3">
                                <span className="text-[#ffc107] font-mono text-sm">03/</span>
                                <h3 className="text-lg font-black text-white">Etika Bisnis & Anti-Korupsi</h3>
                            </div>
                            <p className="md:col-span-8 text-slate-300 text-sm leading-relaxed font-light">
                                Menjunjung tinggi asas kejujuran, integritas moral, dan profesionalisme dalam setiap hubungan kerja sama bisnis jangka panjang.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CSR ACTIVITIES */}
            <section className="py-20 bg-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-amber-700 uppercase bg-amber-100 px-3 py-1 rounded-md inline-block mb-3">
                            Inisiatif Sosial
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#0f2b5c]">CSR Activities</h2>
                        <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                            Aksi nyata perusahaan dalam memberikan manfaat langsung bagi masyarakat di sekitar wilayah operasional.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {csrList.map((item, index) => (
                            <div key={index} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover" 
                                    />
                                    <span className="absolute top-4 left-4 bg-[#0f2b5c] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-black text-[#0f2b5c] mb-2">{item.title}</h3>
                                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CARBON REDUCTION STRATEGY */}
            <section className="py-16 bg-gradient-to-r from-[#064e3b] via-[#0f3854] to-[#0f2b5c] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5 space-y-3">
                            <span className="text-[10px] font-black tracking-widest text-[#ffc107] uppercase bg-white/10 px-3 py-1 rounded-md inline-block border border-white/10">
                                Special Initiative
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-white">Carbon Reduction Strategy</h2>
                            <p className="text-emerald-100/80 text-sm font-light">
                                Langkah terukur perusahaan dalam menekan emisi karbon operasional.
                            </p>
                        </div>

                        <div className="md:col-span-7 bg-white/15 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/20">
                            <p className="text-slate-200 text-sm leading-relaxed mb-6 font-light">
                                Strategi penekanan emisi karbon diterapkan secara nyata melalui beberapa langkah utama:
                            </p>
                            
                            <div className="space-y-4">
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-4">
                                    <span className="w-3 h-3 rounded-full bg-[#ffc107] mt-1 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1">Digital Maintenance System</h4>
                                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                                            Digitalisasi alur pemeliharaan unit untuk efisiensi penggunaan kertas serta optimalisasi waktu tempuh teknisi.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-4">
                                    <span className="w-3 h-3 rounded-full bg-emerald-400 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1">Eco-Efficient Service Fleet</h4>
                                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                                            Penggunaan armada servis yang efisien bahan bakar untuk menjangkau lokasi kerja konsumen secara ramah lingkungan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. SUSTAINABILITY REPORT */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-indigo-200 transition-all shadow-sm">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-black tracking-widest text-indigo-700 uppercase bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                                    Laporan Resmi ESG
                                </span>
                                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full">
                                    PDF Dokumen
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-[#0f2b5c] mb-3">Sustainability Report Terbaru</h2>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                Unduh dokumen laporan resmi mengenai pencapaian efisiensi energi, keselamatan kerja, pengelolaan limbah B3, dan standar Good Governance PT Servistama Pro Indonesia.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <a 
                                href="#" 
                                onClick={(e) => e.preventDefault()}
                                className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-[#0f2b5c] text-white font-bold text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                            >
                                <svg className="w-5 h-5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Unduh Laporan ESG (PDF)
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}