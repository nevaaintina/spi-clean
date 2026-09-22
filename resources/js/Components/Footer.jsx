import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2">
            {/* LOGO FOOTER */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 md:h-12 flex items-center">
                <img 
                  src="/images/logo.png" 
                  alt="Logo PT. Servistama Pro Indonesia" 
                  className="h-full w-auto object-contain" 
                />
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4 max-w-sm">
              Authorized Dealer Service & Warranty Heavy Equipment - XCMG Brand. Penyedia Digital Service Platform terintegrasi untuk alat berat pertambangan dan konstruksi.
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <p>Foresta Business Loft 7, Unit 6-7, Jl. BSD Boulevard Utara, Pagedangan, Kab. Tangerang, Banten 15331</p>
              <p>Hotline: +62 811-XXXX-XXXX | Emergency Call 24/7</p>
              <p>Email: info@servistamapro.co.id</p>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider">
              Layanan Purna Jual
            </h4>
            <ul className="space-y-2">
              <li><a href="#preventive" className="hover:text-amber-600 transition">Preventive Maintenance</a></li>
              <li><a href="#corrective" className="hover:text-amber-600 transition">Corrective Maintenance</a></li>
              <li><a href="#breakdown" className="hover:text-amber-600 transition">Breakdown Service</a></li>
              <li><a href="#overhaul" className="hover:text-amber-600 transition">Overhaul & Rebuild</a></li>
              <li><a href="#oil-analysis" className="hover:text-amber-600 transition">Oil Analysis Laboratory</a></li>
              <li><a href="#warranty" className="hover:text-amber-600 transition">Warranty Management</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider">
              Produk XCMG
            </h4>
            <ul className="space-y-2">
              <li><a href="#excavator" className="hover:text-amber-600 transition">Mining Excavator</a></li>
              <li><a href="#wheel-loader" className="hover:text-amber-600 transition">Wheel Loader</a></li>
              <li><a href="#motor-grader" className="hover:text-amber-600 transition">Motor Grader</a></li>
              <li><a href="#dump-truck" className="hover:text-amber-600 transition">Mining Dump Truck</a></li>
              <li><a href="#crane" className="hover:text-amber-600 transition">Heavy Duty Crane</a></li>
              <li><a href="#road" className="hover:text-amber-600 transition">Road Machinery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider">
              Pusat Portal
            </h4>
            <ul className="space-y-2">
              <li><a href="#portal" className="text-amber-600 font-semibold hover:underline">Customer Service Portal</a></li>
              <li><a href="#online-request" className="hover:text-amber-600 transition">Online Service Request</a></li>
              <li><a href="#parts-catalog" className="hover:text-amber-600 transition">Genuine Spare Parts</a></li>
              <li><a href="#training" className="hover:text-amber-600 transition">Training Center</a></li>
              <li><a href="#hse" className="hover:text-amber-600 transition">HSE & Safety Policy</a></li>
              <li><a href="#career" className="hover:text-amber-600 transition">Karir & Lowongan</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[11px]">
          <p>© 2026 PT. Servistama Pro Indonesia. All rights reserved.</p>
          <p className="mt-2 md:mt-0">The Future of Smart Heavy Equipment Service</p>
        </div>
      </div>
    </footer>
  );
}