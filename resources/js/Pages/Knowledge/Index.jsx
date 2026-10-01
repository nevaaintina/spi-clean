import React, { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* -------------------------------------------------------------------------- */
/* Inline SVG Icons                                                           */
/* -------------------------------------------------------------------------- */
const IconWrench = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z" />
    </svg>
);

const IconClock = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
    </svg>
);

const IconCalendar = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3.5" y="5" width="17" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
);

const IconArrowRight = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const IconDocument = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 15.5h6M9 9h2" />
    </svg>
);

const IconSearch = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const InstagramIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

export default function Index({ articles = [], featuredArticle = null, filters = {} }) {
    const [activeCategory, setActiveCategory] = useState(filters?.category || '');
    const [searchQuery, setSearchQuery] = useState('');

    // 11 Kategori Topik Sesuai Permintaan
    const categories = [
        "Maintenance Tips",
        "Heavy Equipment Knowledge",
        "Mining Technology",
        "Hydraulic System",
        "Engine Maintenance",
        "Lubrication Guide",
        "Predictive Maintenance",
        "Failure Analysis",
        "Safety",
        "Operator Tips",
        "Technical Bulletin"
    ];

    // Filter artikel berdasarkan kategori aktif dan kata kunci pencarian
    const filteredArticles = articles.filter(art => {
        const matchesCategory = activeCategory 
            ? art.category?.toLowerCase() === activeCategory.toLowerCase() 
            : true;
        const matchesSearch = searchQuery.trim() !== ''
            ? art.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
              art.content?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    const handleCategoryClick = (cat) => {
        const newCat = activeCategory === cat ? '' : cat;
        setActiveCategory(newCat);
        router.get('/knowledge', { category: newCat }, { preserveState: true, replace: true });
    };

    return (  
        <>
            <Head title="Knowledge Center - PT. Servistama Pro Indonesia" />
            <Navbar />

            <main>
                {/* ================= HERO (FULL SCREEN) ================= */}
                <section className="relative flex min-h-screen w-full items-center justify-center bg-white overflow-hidden pt-20">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <img 
                            src="/images/hero-know.png" 
                            alt="Heavy Equipment Banner" 
                            className="h-full w-full object-cover object-[100%_0%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent lg:w-2/3" />
                    </div>

                    <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16">
                        <div className="max-w-xl">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="text-xs font-bold tracking-[0.2em] text-[#FFC107]">KNOWLEDGE CENTER</span>
                                <span className="h-px w-10 bg-[#FFC107]" />
                            </div>

                            <h1 className="text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-[#0F2B5C] sm:text-5xl lg:text-[3.4rem]">
                                Engineering Knowledge.
                                <br />
                                Smarter Maintenance.
                            </h1>

                            <div className="mt-5 flex items-center gap-3">
                                <span className="h-px w-8 bg-[#FFC107]" />
                                <p className="text-sm font-bold text-[#0F2B5C] sm:text-base">
                                    Pengetahuan Engineering. Maintenance Lebih Cerdas.
                                </p>
                            </div>

                            <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-[#0F2B5C] drop-shadow-sm">
                                Temukan wawasan teknis, panduan maintenance, serta solusi smart service yang dirancang untuk memaksimalkan uptime alat.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ================= 1. FEATURED ARTICLE (MAINTENANCE TIPS DI ATAS) ================= */}
                {featuredArticle && (
                    <section className="bg-white px-6 py-16 sm:px-10 lg:px-16">
                        <div className="mx-auto max-w-[1440px]">
                            <div className="group grid grid-cols-1 overflow-hidden rounded-2xl bg-[#071A35] shadow-xl lg:grid-cols-2">
                                <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-12 lg:py-14">
                                    <span className="mb-4 text-xs font-bold tracking-[0.2em] text-[#FFC107]">
                                        {featuredArticle.category}
                                    </span>
                                    <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem]">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                                        {featuredArticle.excerpt || featuredArticle.content}
                                    </p>

                                    <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-white/60">
                                        <span className="flex items-center gap-1.5">
                                            <IconClock className="h-4 w-4" />
                                            {featuredArticle.read_time || "5 Menit"}
                                        </span>
                                        <span className="h-1 w-1 rounded-full bg-white/30" />
                                        <span className="flex items-center gap-1.5">
                                            <IconDocument className="h-4 w-4" />
                                            TECHNICAL INSIGHT
                                        </span>
                                    </div>

                                    <div className="mt-8 flex flex-wrap items-center gap-4">
                                        <Link
                                            href={`/knowledge/${featuredArticle.id}`}
                                            className="inline-flex items-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3 text-sm font-bold text-[#0F2B5C] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg cursor-pointer"
                                        >
                                            Baca Technical Insight
                                            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>

                                        {featuredArticle.instagram_link && (
                                            <a
                                                href={featuredArticle.instagram_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                                            >
                                                <InstagramIcon className="h-4 w-4 text-pink-400" />
                                                Lihat di Instagram
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="relative min-h-[280px] w-full overflow-hidden lg:min-h-[420px]">
                                    <img
                                        src={featuredArticle.thumbnail ? `/${featuredArticle.thumbnail}` : "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"}
                                        alt={featuredArticle.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071A35]/60 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ================= 2. CATEGORY NAVIGATION BAR (DI BAWAH FEATURED ARTICLE) ================= */}
                <section className="sticky top-20 z-30 w-full bg-[#0F2B5C] shadow-md border-b-2 border-[#FFC107]">
                    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8">
                        {/* List Menu Bar Kategori Horizontal */}
                        <div className="flex items-center overflow-x-auto scrollbar-none whitespace-nowrap py-0">
                            {/* Tombol Beranda / Semua Topik */}
                            <button
                                type="button"
                                onClick={() => handleCategoryClick('')}
                                className={`flex h-[52px] items-center px-5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                    activeCategory === ''
                                        ? 'bg-[#FFC107] text-[#0F2B5C] shadow-inner font-extrabold'
                                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                Semua Topik
                            </button>

                            {/* Daftar Kategori Berita/Artikel */}
                            {categories.map((cat, index) => {
                                const isSelected = activeCategory === cat;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleCategoryClick(cat)}
                                        className={`flex h-[52px] items-center px-4 text-xs font-semibold tracking-wide transition-all duration-200 border-l border-white/10 cursor-pointer ${
                                            isSelected
                                                ? 'bg-[#FFC107] text-[#0F2B5C] font-extrabold shadow-inner'
                                                : 'text-white/90 hover:bg-white/10 hover:text-[#FFC107]'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Icon / Quick Filter Box di Sisi Kanan */}
                        <div className="hidden lg:flex items-center pl-4">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari artikel..."
                                    className="h-8 w-44 rounded-md bg-white/10 pl-8 pr-3 text-xs text-white placeholder-white/50 border border-white/20 focus:border-[#FFC107] focus:bg-white/20 focus:outline-none focus:ring-0 transition"
                                />
                                <IconSearch className="absolute left-2.5 h-3.5 w-3.5 text-white/60 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= 3. ARTICLE GRID ================= */}
                <section className="bg-[#F8FAFC] px-6 py-16 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <span className="text-xs font-bold tracking-[0.2em] text-[#FFC107]">ARTICLES</span>
                                <h2 className="mt-2 text-2xl font-bold text-[#0F2B5C] sm:text-3xl">
                                    {activeCategory ? `Kategori: ${activeCategory}` : "Technical Insight Terbaru"}
                                </h2>
                            </div>
                            {(activeCategory || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setActiveCategory('');
                                        setSearchQuery('');
                                        router.get('/knowledge', {}, { preserveState: true, replace: true });
                                    }}
                                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                                >
                                    Reset Filter
                                </button>
                            )}
                        </div>

                        {filteredArticles.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center text-slate-500">
                                Belum ada artikel untuk kategori atau pencarian ini.
                            </div>
                        )}
                    </div>
                </section>

                {/* ================= CTA TECHNICAL SUPPORT ================= */}
                <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
                    <img
                        src="/images/cta-know.PNG"
                        alt="Technical Support Background"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#071A35]/40" />

                    <div className="relative z-10 mx-auto max-w-[1440px] text-left">
                        <div className="max-w-2xl">
                            <span className="mb-4 block h-px w-10 bg-[#FFC107]" />
                            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                                Butuh Dukungan Teknis?
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                                Terhubung dengan tim service expert kami untuk mendapatkan dukungan maintenance,
                                diagnostic, warranty, dan solusi heavy equipment profesional.
                            </p>

                            <div className="mt-8 flex flex-col justify-start gap-3 sm:flex-row">
                                <Link
                                    href="/contact-us"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3.5 text-sm font-bold text-[#0F2B5C] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                                >
                                    Hubungi Service Expert
                                    <IconArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/knowledge"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-[#FFC107] hover:text-[#FFC107]"
                                >
                                    Lihat Semua Knowledge
                                    <IconArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

/* =========================================================
   SUB COMPONENT: Article Card Dinamis
========================================================= */
function ArticleCard({ article }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107] hover:shadow-xl">
            <Link href={`/knowledge/${article.id}`} className="flex h-full flex-col cursor-pointer">
                <div className="relative h-60 w-full shrink-0 overflow-hidden bg-slate-100">
                    <img
                        src={article.thumbnail ? `/${article.thumbnail}` : "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"}
                        alt={article.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                        <span className="text-xs font-bold tracking-[0.12em] text-[#0F2B5C]">
                            {article.category}
                        </span>

                        <h3 className="mt-2.5 h-[3.5rem] line-clamp-2 text-lg font-bold leading-snug text-[#0F2B5C]">
                            {article.title}
                        </h3>

                        <p className="mt-2 h-[4.2rem] line-clamp-3 text-sm leading-relaxed text-slate-500">
                            {article.excerpt || article.content}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1">
                                <IconClock className="h-3.5 w-3.5" />
                                {article.read_time || "5 Menit"}
                            </span>
                            <span className="flex items-center gap-1">
                                <IconCalendar className="h-3.5 w-3.5" />
                                {new Date(article.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {article.instagram_link && (
                                <a 
                                    href={article.instagram_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition"
                                    title="Buka Instagram"
                                >
                                    <InstagramIcon className="h-3.5 w-3.5" />
                                </a>
                            )}
                            <span className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0F2B5C]">
                                <IconArrowRight className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}