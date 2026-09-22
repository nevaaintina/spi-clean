import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { 
    Megaphone, 
    ShieldCheck, 
    Sparkles, 
    Clock, 
    Award, 
    Activity, 
    AlertTriangle, 
    FileText, 
    CheckCircle2, 
    Send, 
    Search,
    PhoneCall,
    Ambulance,
    Flame,
    Siren,
    MapPin,
    Phone
} from 'lucide-react';

export default function Hse() {
    // 1. Safety Policy
    const safetyPolicies = [
        {
            title: "Zero Accident Culture",
            desc: "Menerapkan standar prosedur keselamatan kerja yang ketat di seluruh lini operasional bengkel, lapangan, maupun proyek klien untuk mencapai nihil kecelakaan kerja."
        },
        {
            title: "Environmental Protection",
            desc: "Pengelolaan limbah B3 (bahan berbahaya dan beracun) secara profesional, pencegahan tumpahan oli/pelumas, serta penghematan sumber daya alam di area kerja."
        },
        {
            title: "Health & Safety Compliance",
            desc: "Mematuhi seluruh regulasi K3 nasional (SMK3 PP No. 50/2012) serta standar internasional demi memberikan jaminan perlindungan maksimal bagi seluruh tenaga kerja dan mitra."
        }
    ];

    // 2. Safety Campaign
    const safetyCampaigns = [
        {
            icon: Megaphone,
            tag: "RUTIN HARIAN",
            title: "Toolbox Meeting 10 Menit",
            desc: "Briefing keselamatan harian sebelum shift dimulai untuk mengidentifikasi bahaya area kerja, memeriksa kondisi teknisi, dan review SOP pekerjaan."
        },
        {
            icon: ShieldCheck,
            tag: "STANDAR WAJIB",
            title: "100% Mandatory APD",
            desc: "Kampanye disiplin penggunaan Alat Pelindung Diri lengkap (Helm Sertifikasi, Kacamata Safety, Sepatu Steel-Toe, Rompi Reflektif, & Sarung Tangan) tanpa toleransi."
        },
        {
            icon: Sparkles,
            tag: "BUDAYA WORKSHOP",
            title: "Penerapan Budaya 5S",
            desc: "Menggalakkan Seiri, Seiton, Seiso, Seiketsu, Shitsuke di area bengkel untuk mencegah kecelakaan tersandung, terpeleset, atau tertimpa perkakas."
        }
    ];

    // 3. Near Miss Workflow
    const nearMissSteps = [
        {
            number: "01",
            icon: AlertTriangle,
            title: "Temukan Bahaya / Incident",
            desc: "Identifikasi kondisi tidak aman (Unsafe Condition) atau tindakan tidak aman (Unsafe Act) yang berpotensi menimbulkan kecelakaan."
        },
        {
            number: "02",
            icon: Send,
            title: "Laporkan Segera",
            desc: "Isi formulir Near Miss Report secara digital atau fisik kepada tim Safety Officer/P2K3 dalam kurun waktu kurang dari 24 jam."
        },
        {
            number: "03",
            icon: Search,
            title: "Investigasi & Analisa",
            desc: "Tim K3 menganalisis akar penyebab masalah (Root Cause Analysis) dan merumuskan tindakan perbaikan yang tepat."
        },
        {
            number: "04",
            icon: CheckCircle2,
            title: "Tindakan Korektif (CAPA)",
            desc: "Eksekusi tindakan pencegahan agar insiden serupa tidak terulang kembali di masa depan demi menjaga operasional aman."
        }
    ];

    // 4. Safety Training & Certification
    const safetyTrainings = [
        {
            title: "Sertifikasi K3 Umum & Spesialis",
            type: "Wajib / Lisensi Kemnaker",
            desc: "Pelatihan resmi untuk Ahli K3 Umum, K3 Listrik, dan K3 LOTO demi memastikan kepatuhan regulasi di area operasional.",
            schedules: ["Tiap Kuartal", "Durasi: 12 Hari", "Sertifikat Kemnaker"]
        },
        {
            title: "Operator Alat Berat & Rigging",
            type: "Kompetensi Operasional",
            desc: "Sertifikasi SIO (Surat Izin Operasi) untuk operator forklift, crane, dan teknisi rigging guna meminimalisir risiko kerja fatal.",
            schedules: ["Berkala / Sesuai Proyek", "Durasi: 3-5 Hari", "SIO Aktif"]
        },
        {
            title: "First Aid & Fire Fighting",
            type: "Tanggap Darurat",
            desc: "Pelatihan penanganan P3K, evakuasi medis, serta penggunaan APAR dan instalasi pemadam bagi seluruh tim ERT.",
            schedules: ["6 Bulan Sekali", "Simulasi Lapangan", "Sertifikat Internal/External"]
        }
    ];

    // 5. Emergency Contacts & Team
    const emergencyExternal = [
        { name: "Pemadam Kebakaran (Damkar)", number: "113 / 112", icon: Flame, color: "bg-red-500 text-white" },
        { name: "Ambulans / Medis Darurat", number: "118 / 119", icon: Ambulance, color: "bg-emerald-600 text-white" },
        { name: "Kepolisian (Polri)", number: "110", icon: Siren, color: "bg-blue-600 text-white" },
        { name: "Basarnas (SAR)", number: "115", icon: ShieldCheck, color: "bg-amber-600 text-white" },
    ];

    const emergencyInternal = [
        { role: "Commander Tanggap Darurat", name: "Bpk. Rahmat Hidayat", phone: "+62 812-3456-7890" },
        { role: "Safety Officer / P2K3", name: "Ibu Anita Wijaya", phone: "+62 813-9876-5432" },
        { role: "Tim First Aid (P3K) Workshop", name: "Bpk. Hendra Kurniawan", phone: "+62 811-2233-4455" },
        { role: "Tim Penanggulangan Kebakaran", name: "Bpk. Dimas Pratama", phone: "+62 815-6677-8899" },
    ];

    // 6. Emergency Evacuation Steps
    const evacuationSteps = [
        { title: "Tetap Tenang & Hentikan Pekerjaan", desc: "Matikan mesin, alat berat, dan sumber listrik utama. Jangan panik." },
        { title: "Dengar Suara Sirine Darurat", desc: "Jika sirine berbunyi panjang, segera tinggalkan peralatan kerja Anda." },
        { title: "Ikuti Jalur Evakuasi (Evacuation Route)", desc: "Berjalan cepat ikuti petunjuk arah hijau. Jangan berlari atau menggunakan lift." },
        { title: "Berkumpul di Titik Kumpul (Assembly Point)", desc: "Segera menuju Assembly Point di halaman utama. Lakukan absensi/presensi dengan tim K3." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
            <Head title="Health, Safety & Environment (HSE) - PT Servistama Pro Indonesia" />
            <Navbar />

           {/* HERO BANNER */}
            <section className="relative bg-[#0f2b5c] text-white pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('/images/internship.png')" }} />
                <div className="relative max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[3px] bg-[#ffc107]" />
                        <span className="text-xs font-black tracking-widest text-[#ffc107] uppercase">SAFETY FIRST POLICY</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight max-w-3xl">
                        Health, Safety & Environment <span className="text-[#ffc107]">(HSE)</span>
                    </h1>
                    <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl font-light leading-relaxed">
                        Prioritas utama kami adalah keselamatan setiap pekerja, perlindungan lingkungan kerja, serta standar kesehatan operasional bertaraf internasional.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-20 max-w-7xl mx-auto px-6 md:px-10">
                {/* OVERVIEW SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                    <div className="lg:col-span-6 relative">
                        <div className="absolute -inset-3 bg-gradient-to-r from-[#ffc107] to-[#0f2b5c] rounded-[2.5rem] blur-xl opacity-20 -z-10" />
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
                            <img 
                                src="/images/internship.png" 
                                alt="HSE PT Servistama Pro Indonesia" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b5c]/80 via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                    <div className="lg:col-span-6 space-y-6">
                        <span className="text-xs font-black tracking-widest text-slate-400 uppercase">
                            STANDAR KERJA TINGGI
                        </span>
                        <h2 className="text-3xl font-black text-[#0f2b5c]">Standar Keselamatan Tanpa Kompromi</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Operasional pemeliharaan alat berat, perbaikan komponen mesin, dan rekayasa teknik di PT Servistama Pro Indonesia selalu berpedoman pada regulasi Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3) yang ketat.
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Setiap personil dibekali Alat Pelindung Diri (APD) lengkap dan diwajibkan mematuhi prosedur mitigasi risiko sebelum memulai tugas pemeliharaan di lokasi pertambangan maupun proyek konstruksi.
                        </p>
                    </div>
                </div>

                {/* SAFETY POLICY SECTION */}
                <div className="pt-12 border-t border-slate-200 mb-24">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3.5 py-1.5 rounded-lg inline-block mb-3 border border-emerald-200">
                            Kebijakan Utama
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-[#0f2b5c]">
                            Safety Policy & Komitmen K3
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 mt-2">
                            Tiga pilar utama kebijakan keselamatan dan kelestarian lingkungan yang menjadi pedoman kerja seluruh tim kami.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {safetyPolicies.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="relative bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden group"
                            >
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#ffc107]/10 rounded-full blur-2xl group-hover:bg-[#ffc107]/20 transition-all" />
                                
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center font-black text-xl shadow-lg shadow-[#0f2b5c]/20 group-hover:scale-110 transition-transform">
                                            0{idx + 1}
                                        </div>
                                        <span className="text-xs font-black text-slate-300 tracking-widest uppercase">
                                            SPI POLICY
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-black text-[#0f2b5c] mb-3 group-hover:text-amber-600 transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed relative z-10">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[11px] font-black tracking-wider text-[#0f2b5c] uppercase">
                                        Pilar K3 #{idx + 1}
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SAFETY CAMPAIGN SECTION */}
                <div className="pt-12 border-t border-slate-200">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-sky-800 uppercase bg-sky-100 px-3.5 py-1.5 rounded-lg inline-block mb-3 border border-sky-200">
                            Budaya Keselamatan
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-[#0f2b5c]">
                            Safety Campaign (Kampanye K3)
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 mt-2">
                            Inisiatif harian dan sosialisasi berkala untuk meningkatkan kesadaran keselamatan kerja seluruh personil.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {safetyCampaigns.map((campaign, idx) => {
                            const IconComponent = campaign.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className="relative bg-[#0f2b5c] text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden border border-slate-800 hover:border-[#ffc107] transition-all group"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#ffc107]" />

                                    <div className="flex items-start md:items-center gap-6 pl-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#ffc107] shrink-0 group-hover:scale-110 group-hover:bg-[#ffc107] group-hover:text-[#0f2b5c] transition-all">
                                            <IconComponent className="w-8 h-8" />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black tracking-wider text-[#ffc107] uppercase bg-[#ffc107]/10 px-2.5 py-0.5 rounded border border-[#ffc107]/20">
                                                    {campaign.tag}
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">Langkah 0{idx + 1}</span>
                                            </div>
                                            <h4 className="text-xl font-black text-white group-hover:text-[#ffc107] transition-colors">
                                                {campaign.title}
                                            </h4>
                                            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed font-light">
                                                {campaign.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pl-4 md:pl-0 border-l md:border-l-0 border-slate-800 shrink-0">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            Program Aktif
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* STATISTICS SECTION */}
                <div className="pt-16 border-t border-slate-200 mt-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="max-w-2xl">
                            <span className="text-xs font-black tracking-widest text-amber-900 uppercase bg-amber-100 px-3.5 py-1.5 rounded-lg inline-block mb-3 border border-amber-200">
                                Pencapaian Keselamatan
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-[#0f2b5c]">
                                Lost Time Injury (LTI) & Safety Metrics
                            </h3>
                            <p className="text-xs md:text-sm text-slate-600 mt-2">
                                Rekam jejak performa keselamatan kerja dan akumulasi jam kerja selamat tanpa kecelakaan fatal (*Zero LTI*).
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            Status Operasional: Safe Condition
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="relative bg-[#0f2b5c] text-white p-6 rounded-3xl border border-slate-800 shadow-xl overflow-hidden group">
                            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#ffc107]/10 rounded-full blur-xl group-hover:bg-[#ffc107]/20 transition-all" />
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#ffc107]">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black tracking-wider text-[#ffc107] uppercase bg-[#ffc107]/10 px-2 py-1 rounded border border-[#ffc107]/20">
                                    AKUMULASI
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-3xl font-black text-[#ffc107] tracking-tight">
                                    1.250.000+
                                </h4>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                    Safe Working Hours
                                </p>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-white/10 font-light">
                                Total jam kerja tanpa adanya kecelakaan kerja yang menghilangkan waktu kerja.
                            </p>
                        </div>

                        <div className="relative bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black tracking-wider text-emerald-700 uppercase bg-emerald-100 px-2 py-1 rounded border border-emerald-200">
                                    TARGET PENCAPAIAN
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-3xl font-black text-[#0f2b5c] tracking-tight">
                                    0 <span className="text-sm font-semibold text-slate-400">Kasus</span>
                                </h4>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Zero LTI Record
                                </p>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100 font-light">
                                Mempertahankan rekor *Zero Accident* di seluruh workshop dan area proyek teknis.
                            </p>
                        </div>

                        <div className="relative bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black tracking-wider text-sky-700 uppercase bg-sky-100 px-2 py-1 rounded border border-sky-200">
                                    STANDAR K3
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-3xl font-black text-[#0f2b5c] tracking-tight">
                                    0.00
                                </h4>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    LTIFR Rate
                                </p>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100 font-light">
                                *Lost Time Injury Frequency Rate* dihitung berdasarkan 1.000.000 jam kerja.
                            </p>
                        </div>

                        <div className="relative bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                                    <Award className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black tracking-wider text-amber-800 uppercase bg-amber-100 px-2 py-1 rounded border border-amber-200">
                                    AUDIT K3
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-3xl font-black text-[#0f2b5c] tracking-tight">
                                    100%
                                </h4>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Kepatuhan SMK3
                                </p>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100 font-light">
                                Kepatuhan penuh pada audit Sistem Manajemen K3 (SMK3) & regulasi Kemnaker RI.
                            </p>
                        </div>
                    </div>
                </div>

                {/* NEAR MISS REPORT SECTION */}
                <div id="near-miss-form" className="pt-16 border-t border-slate-200 mt-20">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-rose-800 uppercase bg-rose-100 px-3.5 py-1.5 rounded-lg inline-block mb-3 border border-rose-200">
                            Pencegahan Proaktif
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-[#0f2b5c]">
                            Near Miss Report (Pelaporan Hampir Celaka)
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 mt-2">
                            Membangun kesadaran insiden tanpa rasa takut (*No Blame Culture*). Pelaporan kejadian hampir celaka membantu kita mencegah kecelakaan fatal sebelum terjadi.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#0f2b5c] to-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-12">
                        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#ffc107]/10 blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div className="space-y-3 max-w-2xl">
                                <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold">
                                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                                    <span>Mengapa Harus Melapor?</span>
                                </div>
                                <h4 className="text-2xl font-black text-white">
                                    Setiap Laporan Anda Menyelamatkan Nyawa Rekan Kerja
                                </h4>
                                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                                    *Near Miss* adalah kejadian tak terduga yang tidak menyebabkan cedera atau kerusakan harta benda, namun berpotensi fatal jika diabaikan. Laporkan segera hal sekecil apa pun di workshop atau lokasi kerja.
                                </p>
                            </div>
                            <div className="shrink-0">
                                <a 
                                    href="#near-miss-form" 
                                    className="inline-flex items-center gap-2 bg-[#ffc107] hover:bg-amber-400 text-[#0f2b5c] font-black text-xs uppercase tracking-wider px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                >
                                    <FileText className="w-4 h-4" />
                                    Buat Laporan Near Miss
                                </a>
                            </div>
                        </div>
                    </div>

                    <h4 className="text-lg font-black text-[#0f2b5c] mb-6 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ffc107]" />
                        Prosedur & Alur Pelaporan Near Miss
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {nearMissSteps.map((step, idx) => {
                            const IconComp = step.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:border-[#0f2b5c] transition-all relative flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-[#0f2b5c] group-hover:text-[#ffc107] text-[#0f2b5c] flex items-center justify-center transition-all">
                                                <IconComp className="w-6 h-6" />
                                            </div>
                                            <span className="text-2xl font-black text-slate-200 group-hover:text-[#ffc107] transition-colors">
                                                {step.number}
                                            </span>
                                        </div>
                                        <h5 className="text-base font-black text-[#0f2b5c] mb-2">
                                            {step.title}
                                        </h5>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        <span>SOP Langkah</span> #{idx + 1}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* SAFETY TRAINING & CERTIFICATION SECTION */}
                <div className="pt-16 border-t border-slate-200 mt-20">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-indigo-800 uppercase bg-indigo-100 px-3.5 py-1.5 rounded-lg inline-block mb-3 border border-indigo-200">
                            Pengembangan Kompetensi
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-[#0f2b5c]">
                            Safety Training & Sertifikasi K3
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 mt-2">
                            Program pelatihan berkelanjutan untuk memastikan seluruh teknisi dan personel memiliki lisensi resmi serta kompetensi tanggap bahaya yang tinggi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {safetyTrainings.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                            {item.type}
                                        </span>
                                        <span className="text-xs font-black text-slate-300">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-black text-[#0f2b5c] mb-3">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed mb-6 font-light">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 space-y-2">
                                    {item.schedules.map((sch, sIdx) => (
                                        <div key={sIdx} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            <span>{sch}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EMERGENCY RESPONSE SECTION */}
                <div className="pt-16 border-t border-slate-200 mt-20">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-black tracking-widest text-red-800 uppercase bg-red-100 px-3.5 py-1.5 rounded-lg inline-block mb-3 border border-red-200">
                            Penanganan Cepat 24/7
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-[#0f2b5c]">
                            Emergency Response & Evacuation
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 mt-2">
                            Kesiapsiagaan penuh dalam menghadapi situasi kritis, bencana alam, kebakaran, serta darurat medis di area kerja.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* BAGIAN ATAS: 2 KOLOM LEBAR */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                            
                            {/* KOTAK 1: Darurat Nasional (24 Jam) */}
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <h4 className="text-xl font-black text-[#0f2b5c] mb-8 flex items-center gap-3">
                                        <PhoneCall className="w-6 h-6 text-red-600" />
                                        Darurat Nasional (24 Jam)
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {emergencyExternal.map((ext, idx) => {
                                            const ExtIcon = ext.icon;
                                            return (
                                                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:border-red-400 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ext.color}`}>
                                                            <ExtIcon className="w-5 h-5" />
                                                        </div>
                                                        <p className="text-xs font-bold text-slate-700 leading-tight">{ext.name}</p>
                                                    </div>
                                                    <a href={`tel:${ext.number}`} className="text-sm font-black text-[#0f2b5c] hover:text-red-600 transition-colors shrink-0 ml-2">
                                                        {ext.number}
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="mt-8 pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-400 font-medium">
                                        *Gunakan nomor di atas untuk panggilan darurat di luar area workshop.
                                    </p>
                                </div>
                            </div>

                            {/* KOTAK 2: Tim ERT Internal SPI */}
                            <div className="bg-[#0f2b5c] text-white p-8 md:p-10 rounded-[2.5rem] border border-slate-800 relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
                                <div>
                                    <h4 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                        <Siren className="w-6 h-6 text-[#ffc107]" />
                                        Tim ERT Internal SPI
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {emergencyInternal.map((team, idx) => (
                                            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-2">
                                                <span className="text-[10px] font-black text-[#ffc107] uppercase tracking-wider">{team.role}</span>
                                                <div className="space-y-1">
                                                    <h5 className="text-xs font-bold text-white">{team.name}</h5>
                                                    <a 
                                                        href={`tel:${team.phone}`} 
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-[#ffc107] transition-colors"
                                                    >
                                                        <Phone className="w-3.5 h-3.5 text-[#ffc107]" />
                                                        {team.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8 pt-4 border-t border-white/10">
                                    <span className="inline-flex items-center gap-2 text-xs text-emerald-400 font-bold">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Tim Siaga On-Site 24/7
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* BAGIAN BAWAH: FULL WIDTH PROSEDUR EVAKUASI */}
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <div>
                                    <span className="text-[10px] font-black tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200">
                                        STANDARD OPERATING PROCEDURE
                                    </span>
                                    <h4 className="text-xl font-black text-[#0f2b5c] flex items-center gap-2 mt-2">
                                        <MapPin className="w-6 h-6 text-emerald-600" />
                                        Prosedur Evakuasi Darurat
                                    </h4>
                                </div>
                                <div className="bg-amber-50 px-4 py-3 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2 shrink-0">
                                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                                    <span>Assembly Point Utama: Halaman Depan Workshop A</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {evacuationSteps.map((step, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                                        <div>
                                            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200 mb-4">
                                                0{idx + 1}
                                            </div>
                                            <h5 className="text-xs font-black text-[#0f2b5c] uppercase leading-snug mb-2">{step.title}</h5>
                                            <p className="text-xs text-slate-600 leading-relaxed font-light">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />
        </div>
    );
}