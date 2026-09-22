import React from "react";

const IconLinkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/350x500?text=Photo";

export default function Management({ managementTeam = [] }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMAGE;
  };

  // Filter & Kelompokkan berdasarkan hierarki jabatan dari database
  const ceoMember = managementTeam.find(m => m.role.toLowerCase().includes('ceo') || m.role.toLowerCase().includes('executive')) || managementTeam[0];
  
  const directors = managementTeam.filter(m => 
    m.id !== ceoMember?.id && 
    (m.role.toLowerCase().includes('director') || m.role.toLowerCase().includes('officer'))
  );

  const managers = managementTeam.filter(m => 
    m.id !== ceoMember?.id && 
    !m.role.toLowerCase().includes('director') && 
    !m.role.toLowerCase().includes('officer')
  );

  return (
    <div className="w-full pt-8">
      <span className="mb-8 block text-center text-xs font-bold uppercase tracking-wider text-[#FFC107]">
        MANAGEMENT TEAM
      </span>

      {managementTeam.length === 0 ? (
        <p className="text-center text-slate-400 text-xs py-8">Belum ada data manajemen.</p>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* ================= BARIS 1: CEO ================= */}
          {ceoMember && (
            <div className="flex w-full justify-center">
              <div className="group relative w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-amber-500/10">
                <div className="relative h-[380px] w-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={ceoMember.image_path ? `/${ceoMember.image_path}` : PLACEHOLDER_IMAGE}
                    alt={ceoMember.name}
                    className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                    onError={handleImageError}
                  />
                </div>

                <div className="mt-3.5 flex items-center justify-between px-1 pb-1">
                  <div className="overflow-hidden pr-2">
                    <h4 className="truncate text-base font-extrabold text-[#0F2B5C] transition-colors duration-300 group-hover:text-[#FFC107]">
                      {ceoMember.name}
                    </h4>
                    <p className="truncate text-xs font-medium text-slate-500">
                      {ceoMember.role}
                    </p>
                  </div>

                  {ceoMember.linkedin && ceoMember.linkedin !== "#" && (
                    <a
                      href={ceoMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-[#0077b5] hover:text-white"
                      title="LinkedIn Profile"
                    >
                      <IconLinkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= BARIS 2: DIREKTUR ================= */}
          {directors.length > 0 && (
            <div className="mb-12 grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-3 md:gap-8 lg:gap-10">
              {directors.map((member, idx) => (
                <div
                  key={member.id || `director-${idx}`}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-3 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={member.image_path ? `/${member.image_path}` : PLACEHOLDER_IMAGE}
                      alt={member.name}
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                      onError={handleImageError}
                    />
                  </div>

                  <div className="mt-3.5 flex items-center justify-between px-1 pb-1">
                    <div className="overflow-hidden pr-2">
                      <h4 className="truncate text-sm font-extrabold text-[#0F2B5C] transition-colors duration-300 group-hover:text-[#FFC107]">
                        {member.name}
                      </h4>
                      <p className="truncate text-xs font-medium text-slate-500">
                        {member.role}
                      </p>
                    </div>

                    {member.linkedin && member.linkedin !== "#" && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-[#0077b5] hover:text-white"
                        title="LinkedIn Profile"
                      >
                        <IconLinkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= BARIS 3 & 4: MANAGER ================= */}
          {managers.length > 0 && (
            <div className="grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
              {managers.map((mgr, idx) => (
                <div
                  key={mgr.id || `manager-${idx}`}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-3 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={mgr.image_path ? `/${mgr.image_path}` : PLACEHOLDER_IMAGE}
                      alt={mgr.name}
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                      onError={handleImageError}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between px-1 pb-1">
                    <div className="overflow-hidden pr-2">
                      <h4 className="truncate text-xs font-extrabold text-[#0F2B5C] transition-colors duration-300 group-hover:text-[#FFC107]">
                        {mgr.name}
                      </h4>
                      <p className="truncate text-[11px] font-medium text-slate-500">
                        {mgr.role}
                      </p>
                    </div>

                    {mgr.linkedin && mgr.linkedin !== "#" && (
                      <a
                        href={mgr.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-[#0077b5] hover:text-white"
                        title="LinkedIn Profile"
                      >
                        <IconLinkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}