import React from "react";

/* =========================================================
   INLINE SVG ICONS
   ========================================================= */
const IconTarget = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const IconHandshake = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6a1 1 0 0 0 0-1.4l-2-2" />
    <path d="m18 10 1.6-1.6a1 1 0 0 0 0-1.4l-2.2-2.2a1 1 0 0 0-1.4 0L14 7" />
    <path d="m12 8-2-2a1 1 0 0 0-1.4 0L5 9.6a1 1 0 0 0 0 1.4l2 2" />
    <path d="M2 13l4.5-4.5" />
    <path d="M22 11l-4.5 4.5" />
  </svg>
);

const IconShieldCheck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconGear = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9" />
  </svg>
);

const IconQuote = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.6 6.4C6.4 7.6 4.5 10 4.5 13.2c0 2.7 1.7 4.4 3.8 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.2-3-2.9-3.1-.1-1.5.9-3 2.9-3.8L9.6 6.4Zm9 0C15.4 7.6 13.5 10 13.5 13.2c0 2.7 1.7 4.4 3.8 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.2-3-2.9-3.1-.1-1.5.9-3 2.9-3.8l-1-1Z" />
  </svg>
);

const IconClipboardCheck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const IconLightbulb = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .4 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

/* =========================================================
   COMPONENT
   ========================================================= */
export default function VisionMission() {
  const missions = [
    { 
      icon: IconGear, 
      text: "Menyediakan jasa servis dan suku cadang alat berat terbaik serta terlengkap." 
    },
    { 
      icon: IconHandshake, 
      text: "Membangun layanan berbasis konsumen dan memberikan solusi sesuai kebutuhan pelanggan." 
    },
    { 
      icon: IconShieldCheck, 
      text: "Menjaga dan meningkatkan kualitas pelayanan secara berkesinambungan." 
    },
  ];

  const coreValues = [
    { 
      icon: IconHandshake, 
      title: "Honest", 
      desc: "Melayani klien dengan kejujuran." 
    },
    { 
      icon: IconShieldCheck, 
      title: "Integrity", 
      desc: "Bertanggung jawab atas setiap tindakan." 
    },
    { 
      icon: IconTarget, 
      title: "Perseverance", 
      desc: "Tekun mencapai tujuan jangka panjang." 
    },
    { 
      icon: IconClipboardCheck, 
      title: "Respect", 
      desc: "Menghargai klien dengan proses terarah." 
    },
    { 
      icon: IconLightbulb, 
      title: "Open-minded", 
      desc: "Menerima masukan demi evaluasi layanan." 
    },
  ];

  return (
    <section className="bg-[#F8FAFC] pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* BARIS ATAS: 2 KOLOM (OUR VISION & OUR MISSION) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
         {/* 1. VISION */}
         <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0F2B5C] p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107]/50 hover:shadow-2xl hover:shadow-[#0F2B5C]/30">
           <div className="flex flex-col h-full justify-between">
             {/* Judul di Atas */}
             <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFC107]">
               Our Vision
             </h3>

             {/* Isi Teks Visi Clean */}
             <div className="my-auto py-4">
               <p className="text-lg font-normal leading-relaxed text-white/95">
                 Menjadi perusahaan penyedia jasa servis dan suku cadang alat berat terlengkap dan terbesar dengan pelayanan terbaik di Indonesia.
               </p>
             </div>
           </div>
         </div> 

         {/* 2. MISSION */}
         <div className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-[#0F2B5C]/10">
           <div>
             <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
               Our Mission
             </h3>
             <ul className="space-y-4">
               {missions.map((m, i) => {
                 const Icon = m.icon;
                 return (
                   <li key={i} className="flex items-start gap-3.5">
                     <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F2B5C]/5 text-[#0F2B5C] transition-colors duration-300 group-hover:bg-[#FFC107] group-hover:text-[#0F2B5C]">
                       <Icon className="h-4 w-4" />
                     </span>
                     <span className="text-sm font-medium leading-relaxed text-[#64748B] transition-colors duration-300 group-hover:text-[#0F2B5C]">
                       {m.text}
                     </span>
                   </li>
                 );
               })}
             </ul>
           </div>
         </div>

        </div> 

        {/* BARIS KEDUA: CORE VALUES (MELEBAR FULL HORIZONTAL 5 KOLOM) */}
        <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-[#0F2B5C]/10">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
            Core Values (HIPRO)
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col rounded-xl border border-transparent bg-[#F8FAFC] p-4 transition-all duration-300 hover:border-[#FFC107]/40 hover:bg-[#0F2B5C]/5"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2B5C]/10 text-[#0F2B5C] transition-all duration-300 group-hover:bg-[#0F2B5C] group-hover:text-[#FFC107]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-bold text-[#0F2B5C]">{v.title}</p>
                  <p className="mt-1 text-xs leading-snug text-[#64748B]">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BARIS KETIGA: BUSINESS PHILOSOPHY (BANNER HORIZONTAL) */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F2B5C] p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107]/50 hover:shadow-2xl hover:shadow-[#0F2B5C]/30">
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#FFC107]/10 blur-2xl transition-all duration-500 group-hover:bg-[#FFC107]/20" />
          
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
            <IconQuote className="h-10 w-10 shrink-0 text-[#FFC107] transition-transform duration-300 group-hover:scale-110" />
            <div>
              <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
                Business Philosophy
              </h3>
              <p className="text-base italic leading-relaxed text-white/90">
                &ldquo;Delivering excellence in heavy equipment support and spare parts, grounded in honesty, integrity, and continuous service improvement.&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}