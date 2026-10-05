import React from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* =========================================================
   INLINE SVG ICONS
   ========================================================= */
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

const IconDocument = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 15.5h6M9 9h2" />
    </svg>
);

const IconArrowRight = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const IconArrowLeft = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
);

const IconWrench = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z" />
    </svg>
);

const InstagramIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

/* =========================================================
   PAGE COMPONENT (DINAMIS DARI DATABASE)
   ========================================================= */
export default function Show({ article, relatedArticles = [] }) {
    if (!article) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
                <Head title="Artikel Tidak Ditemukan - Knowledge Center" />
                <Navbar />
                <div className="py-24">
                    <h1 className="text-2xl font-black text-[#0F2B5C] mb-2">Artikel Tidak Ditemukan</h1>
                    <p className="text-sm text-slate-500 mb-6">Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
                    <Link href="/knowledge" className="px-6 py-3 bg-[#FFC107] text-[#0F2B5C] font-bold text-xs rounded-xl shadow">
                        Kembali ke Knowledge Center
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const formattedDate = article.created_at 
        ? new Date(article.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) 
        : '';

    return (
        <>
            <Head title={`${article.title} - Knowledge Center`} />
            <Navbar />

            <main>
                {/* ================= ARTICLE HERO (DITAMBAHKAN PADDING ATAS AGAR TIDAK TERTUTUP NAVBAR) ================= */}
                <section className="bg-white px-6 pb-10 pt-24 sm:px-10 sm:pt-28 lg:px-16 lg:pt-32">
                    <div className="mx-auto max-w-[960px]">
        
                        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#0F2B5C] sm:text-4xl lg:text-[2.75rem]">
                            {article.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#64748B]">
                            {formattedDate && (
                                <>
                                    <span className="flex items-center gap-1.5">
                                        <IconCalendar className="h-4 w-4" />
                                        {formattedDate}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-[#E2E8F0]" />
                                </>
                            )}
                            <span className="flex items-center gap-1.5">
                                <IconClock className="h-4 w-4" />
                                {article.read_time || "5 Menit"}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-[#E2E8F0]" />
                            <span className="flex items-center gap-1.5">
                                <IconDocument className="h-4 w-4" />
                                Technical Insight
                            </span>
                        </div>

                        {article.instagram_link && (
                            <div className="mt-6">
                                <a
                                    href={article.instagram_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl bg-pink-50 border border-pink-200 px-4 py-2.5 text-xs font-bold text-pink-600 hover:bg-pink-100 transition shadow-sm"
                                >
                                    <InstagramIcon className="h-4 w-4 text-pink-500" />
                                    Lihat Diskusi / Postingan di Instagram
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="mx-auto mt-8 max-w-[1100px] overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm bg-slate-100">
                        <img
                            src={article.thumbnail ? `/${article.thumbnail}` : "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"}
                            alt={article.title}
                            className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[460px]"
                        />
                    </div>
                </section>

                {/* ================= ARTICLE CONTENT ================= */}
                <section className="bg-white px-6 py-12 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-[820px]">
                        {article.excerpt && (
                            <p className="text-lg font-medium leading-relaxed text-[#334155] mb-8 p-6 bg-slate-50 border-l-4 border-[#FFC107] rounded-r-2xl">
                                {article.excerpt}
                            </p>
                        )}

                        <div 
                            className="text-base leading-[1.9] text-[#334155] space-y-4"
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {article.content}
                        </div>
                    </div>
                </section>

                {/* ================= RELATED ARTICLES ================= */}
                {relatedArticles.length > 0 && (
                    <section className="bg-[#F8FAFC] px-6 py-16 sm:px-10 lg:px-16">
                        <div className="mx-auto max-w-[1440px]">
                            <div className="mb-10 flex items-center gap-3">
                                <span className="h-px w-8 bg-[#FFC107]" />
                                <h2 className="text-2xl font-bold text-[#0F2B5C] sm:text-3xl">Related Knowledge</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedArticles.map((related, index) => {
                                    const formattedNum = index + 1 < 10 ? `0${index + 1}` : index + 1;
                                    const relatedDate = related.created_at ? new Date(related.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
                                    
                                    return (
                                        <article
                                            key={related.id}
                                            className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107] hover:shadow-lg"
                                        >
                                            <Link href={`/knowledge/${related.id}`} className="block">
                                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                                    <img
                                                        src={related.thumbnail ? `/${related.thumbnail}` : "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"}
                                                        alt={related.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <span className="absolute left-4 top-4 rounded-md bg-[#FFC107] px-2.5 py-1 text-xs font-extrabold text-[#0F2B5C]">
                                                        {formattedNum}
                                                    </span>
                                                </div>
                                                <div className="p-6">
                                                    <span className="text-xs font-bold tracking-[0.12em] text-[#0F2B5C]">
                                                        {related.category}
                                                    </span>
                                                    <h3 className="mt-2 text-base font-bold leading-snug text-[#0F2B5C] line-clamp-2">
                                                        {related.title}
                                                    </h3>
                                                    <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                                                        <div className="flex items-center gap-3 text-xs font-semibold text-[#64748B]">
                                                            <span className="flex items-center gap-1">
                                                                <IconClock className="h-3.5 w-3.5" />
                                                                {related.read_time || "5 Menit"}
                                                            </span>
                                                            {relatedDate && (
                                                                <span className="flex items-center gap-1">
                                                                    <IconCalendar className="h-3.5 w-3.5" />
                                                                    {relatedDate}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8FAFC] text-[#0F2B5C] transition-all duration-300 group-hover:bg-[#FFC107]">
                                                            <IconArrowRight className="h-4 w-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ================= CTA SECTION ================= */}
                <section className="relative overflow-hidden bg-[#071A35] px-6 py-16 sm:px-10 lg:px-16">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                        aria-hidden="true"
                        style={{
                            backgroundImage:
                                'linear-gradient(#FFC107 1px, transparent 1px), linear-gradient(90deg, #FFC107 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            
                            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                                Butuh Dukungan Teknis untuk Alat Anda?
                            </h2>
                            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                                Terhubung dengan tim service expert kami untuk mendapatkan dukungan maintenance,
                                diagnostic, warranty, dan solusi heavy equipment profesional.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-shrink-0 sm:flex-row">
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3.5 text-sm font-bold text-[#0F2B5C] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Hubungi Service Expert
                                <IconArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/knowledge"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-[#FFC107] hover:text-[#FFC107]"
                            >
                                Lihat Semua Knowledge
                                <IconArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}