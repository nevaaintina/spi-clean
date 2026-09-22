import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* -------------------------------------------------------------------------- */
/* SVG ICONS PER KATEGORI & SUB-LAYANAN                                       */
/* -------------------------------------------------------------------------- */
const IconChevronRight = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6"/></svg>;
const IconArrowRight = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
const IconCheckCircle = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const IconClipboard = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>;
const IconGear = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06A1.65 1.65 0 0 0 19.32 9c.13.36.36.68.66.93.3.24.53.56.66.93A1.65 1.65 0 0 0 21.91 11H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>;
const IconHeadset = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M20 13v3a2 2 0 0 1-2 2h-1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M15 18a2 2 0 0 1-2 2h-2"/></svg>;

export default function Show({ category = { name: "Preventive Maintenance", description: "Layanan pemeliharaan berkala dan preventif untuk memastikan unit alat berat Anda selalu dalam kondisi prima." }, serviceList = [] }) {
    // Jika data dari database kosong, sediakan fallback data agar tampilan tetap aman
    const activeServices = serviceList.length > 0 ? serviceList : [
        {
            id: 1,
            title: "Routine Inspection & Servicing",
            description: "Pemeriksaan menyeluruh komponen kritis alat berat secara berkala sesuai standar pabrikan guna mendeteksi potensi keausan dini.",
            what_we_do: [
                "Pemeriksaan tingkat cairan (oli engine, hidrolik, coolant, dan transaxle).",
                "Penggantian filter berkala (filter oli, solar, udara, dan hidrolik).",
                "Inspeksi sistem kelistrikan, aki, dan alternator.",
                "Pengecekan ketegangan track/ban serta sistem pengereman."
            ],
            key_benefits: [
                "Mencegah kerusakan fatal pada komponen utama mesin.",
                "Menjaga efisiensi konsumsi bahan bakar tetap optimal.",
                "Meminimalkan risiko unexpected downtime di lapangan."
            ]
        }
    ];

    const [selectedItem, setSelectedItem] = useState(activeServices[0]);

    // Update selected item jika props serviceList berubah/di-load
    useEffect(() => {
        if (activeServices.length > 0) {
            setSelectedItem(activeServices[0]);
        }
    }, [serviceList]);

    return (
        <>
            <Head title={`${category.name} - PT. Servistama Pro Indonesia`} />

            <div className="min-h-screen bg-[#F8FAFC]">
                <Navbar />

                {/* Sub-header Navigation Bar (Tanpa Tombol Back) */}
                <div className="border-b border-gray-200 bg-white pt-24 pb-6">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
                                <Link href="/" className="hover:text-[#FDC02F]">HOME</Link>
                                <span>/</span>
                                <Link href="/services" className="hover:text-[#FDC02F]">SERVICES</Link>
                                <span>/</span>
                                <span className="text-[#FDC02F]">{category.name}</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-[#0B1B32]">
                                {category.name}
                            </h1>
                            <p className="mt-1 text-xs text-gray-500 max-w-2xl">
                                {category.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Interactive Content */}
                <main className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                        {/* LEFT SIDEBAR: Sub-services Navigation */}
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sticky top-28">
                                <h2 className="mb-4 text-xs font-extrabold tracking-widest text-[#0B1B32] uppercase">
                                    OUR SERVICES
                                </h2>

                                <div className="space-y-2">
                                    {activeServices.map((item, index) => {
                                        const isSelected = selectedItem?.id === item.id;
                                        const itemNum = String(index + 1).padStart(2, '0');

                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setSelectedItem(item)}
                                                className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-xs font-bold transition-all duration-300 ease-in-out cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-amber-50 text-[#0B1B32] border-l-4 border-[#FDC02F] shadow-sm'
                                                        : 'bg-transparent border border-transparent text-gray-600 hover:bg-white hover:border-amber-400 hover:text-amber-600 hover:shadow-md hover:-translate-y-0.5'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`grid h-8 w-8 place-items-center rounded-lg transition-all duration-300 ${
                                                            isSelected
                                                                ? 'bg-[#FDC02F] text-[#0B1B32]'
                                                                : 'bg-gray-100 text-gray-500 group-hover:bg-[#FDC02F] group-hover:text-[#0B1B32] group-hover:scale-110'
                                                        }`}
                                                    >
                                                        <span className="text-[10px] font-extrabold">{itemNum}</span>
                                                    </span>
                                                    <span className="transition-colors duration-300 group-hover:text-amber-600">
                                                        {item.title}
                                                    </span>
                                                </div>

                                                <IconChevronRight
                                                    className={`h-4 w-4 transition-all duration-300 ${
                                                        isSelected
                                                            ? 'text-[#0B1B32] translate-x-0.5'
                                                            : 'text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT AREA: Selected Sub-service Detail (Tanpa Foto & Video) */}
                        <div className="space-y-8 lg:col-span-8">
                            {selectedItem && (
                                <>
                                    {/* TOP CARD: Overview */}
                                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
                                        <span className="text-xl font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-lg inline-block">
                                            {String(activeServices.findIndex(s => s.id === selectedItem.id) + 1).padStart(2, '0')}
                                        </span>
                                        <h2 className="text-2xl font-extrabold text-[#0B1B32]">
                                            {selectedItem.title}
                                        </h2>
                                        <p className="text-xs leading-relaxed text-gray-500">
                                            {selectedItem.description}
                                        </p>
                                        <span className="block h-0.5 w-12 rounded-full bg-[#FDC02F]" />
                                    </div>

                                    {/* BOTTOM GRID: What We Do & Key Benefits */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        
                                        {/* What We Do */}
                                        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-500">
                                                    <IconClipboard className="h-5 w-5" />
                                                </span>
                                                <div>
                                                    <h3 className="text-base font-extrabold text-[#0B1B32]">What We Do</h3>
                                                    <p className="text-[11px] text-gray-400">Comprehensive scope of work</p>
                                                </div>
                                            </div>

                                            <ul className="mt-6 space-y-3">
                                                {(selectedItem.what_we_do || []).map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                                                        <IconCheckCircle className="h-4 w-4 shrink-0 text-[#FDC02F] mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Key Benefits */}
                                        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-500">
                                                    <IconGear className="h-5 w-5" />
                                                </span>
                                                <div>
                                                    <h3 className="text-base font-extrabold text-[#0B1B32]">Key Benefits</h3>
                                                    <p className="text-[11px] text-gray-400">Why choose this service</p>
                                                </div>
                                            </div>

                                            <ul className="mt-6 space-y-3">
                                                {(selectedItem.key_benefits || []).map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                                                        <IconCheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* CALL TO ACTION BANNER */}
                                    <div className="rounded-2xl bg-[#0B1B32] p-8 shadow-lg text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#FDC02F]/50 text-[#FDC02F]">
                                                <IconHeadset className="h-6 w-6" />
                                            </span>
                                            <div>
                                                <h3 className="text-base font-extrabold text-white">
                                                    Need {selectedItem.title} Support?
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-300">
                                                    Our technical team is ready to help you maintain your equipment reliability.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex w-full sm:w-auto items-center gap-3 shrink-0">
                                            <Link
                                                href="/contact-us"
                                                className="flex-1 sm:flex-initial text-center rounded-xl bg-[#FDC02F] px-5 py-3 text-xs font-bold text-[#0B1B32] hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                                            >
                                                REQUEST SERVICE
                                                <IconArrowRight className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href="/contact-us"
                                                className="flex-1 sm:flex-initial text-center rounded-xl border border-white/30 px-5 py-3 text-xs font-bold text-white hover:border-[#FDC02F] hover:text-[#FDC02F] transition-colors flex items-center justify-center gap-2"
                                            >
                                                TALK TO OUR EXPERT
                                                <IconArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}