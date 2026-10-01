import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* LOGO & INFORMASI PERUSAHAAN */}
          <div className="lg:col-span-2">
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
              Authorized Dealer Service & Warranty Heavy Equipment - XCMG Brand. Penyedia Digital Service Platform Terintegrasi untuk Alat Berat Pertambangan dan Konstruksi.
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <p>Foresta Business Loft 7, Unit 6-7, Jl. BSD Boulevard Utara, Pagedangan, Kab. Tangerang, Banten 15331</p>
              <p>Hotline: +62 822-5801-3177</p>
              <p>Email: info@servistamapro.com</p>
            </div>
          </div>

          {/* 1. LAYANAN PURNA JUAL */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider">
              Layanan Purna Jual
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services" className="hover:text-amber-600 transition">
                  Maintenance & Repair
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-600 transition">
                  Installation & Commissioning
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-600 transition">
                  Overhaul & Rebuild
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-600 transition">
                  Inspection & Testing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-600 transition">
                  Contract & Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. PRODUK XCMG (DIARAHKAN KE HALAMAN PRODUCTS) */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider">
              XCMG Products
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  GR 3005T-Pro
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  XDA 45
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  XDE130
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  XDR 80T-AT
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  XE1250
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  XE2000
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  XGA 105
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-600 transition">
                  XGA 4251 D2WC
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. PORTAL CENTER (DIARAHKAN KE SECTION ID YANG SESUAI DENGAN NAVBAR DROPDOWN) */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 border-b border-slate-200 pb-2 uppercase tracking-wider">
              Portal Center
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-600 transition">
                  Top of Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-600 transition">
                  Company Introduction
                </Link>
              </li>
              <li>
                <Link href="/#statistics" className="hover:text-amber-600 transition">
                  Company Statistics
                </Link>
              </li>
              <li>
                <Link href="/#strength" className="hover:text-amber-600 transition">
                  Company Strength
                </Link>
              </li>
              <li>
                <Link href="/#featured-services" className="hover:text-amber-600 transition">
                  Featured Services
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-amber-600 transition">
                  Customer Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-amber-600 transition">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/#news" className="hover:text-amber-600 transition">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-amber-600 transition">
                  Contact Information
                </Link>
              </li>
              <li>
                <Link href="/#operational-area" className="hover:text-amber-600 transition">
                  Branch Office
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[11px]">
          <p>© 2026 PT. Servistama Pro Indonesia. All rights reserved.</p>
          <p className="mt-2 md:mt-0">The Future of Smart Heavy Equipment Service</p>
        </div>
      </div>
    </footer>
  );
}