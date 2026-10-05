import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State untuk expand/collapse dropdown di versi mobile
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const [currentPath, setCurrentPath] = useState('');

  // Ambil locale dan translations dari Inertia shared props backend Laravel
  const { locale = 'id', translations = {} } = usePage().props;

  // Fungsi untuk mengganti bahasa via Google Translate (Custom Flag Trigger)
  const changeLanguage = (langCode) => {
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = langCode;
      selectField.dispatchEvent(new Event('change'));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('nav') && !event.target.closest('button')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const isActive = (path) => currentPath === path;
  const isParentActive = (paths) => paths.some((p) => currentPath.startsWith(p));

  // Fungsi helper penerjemah teks dari JSON Laravel
  const t = (key, fallback) => {
    if (translations && translations[key]) {
      return translations[key];
    }
    const fallbackDict = {
      id: {
        home: "Home", homeTop: "Top of Home", homeIntro: "Pengenalan Perusahaan", homeStats: "Statistik Perusahaan", homeStrength: "Keunggulan Perusahaan", homeServices: "Layanan Unggulan", homeTestimonials: "Testimoni Pelanggan", homeProjects: "Galeri Proyek", homeNews: "Berita Terbaru", homeContact: "Informasi Kontak", homeBranch: "Kantor Cabang",
        about: "About Us", aboutOverview: "Company Profile Overview", aboutWhy: "Why Choose Us", aboutEsg: "Environment, Social & Governance (ESG)", aboutHse: "Health, Safety & Environment (HSE)",
        products: "Products", services: "Services", parts: "Spare Parts", knowledge: "Knowledge", media: "Media", career: "Career", contact: "Contact", bahasa: "Bahasa:"
      },
      en: {
        home: "Home", homeTop: "Top of Home", homeIntro: "Company Introduction", homeStats: "Company Statistics", homeStrength: "Company Strength", homeServices: "Featured Services", homeTestimonials: "Customer Testimonials", homeProjects: "Project Gallery", homeNews: "Latest News", homeContact: "Contact Information", homeBranch: "Branch Office",
        about: "About Us", aboutOverview: "Company Profile Overview", aboutWhy: "Why Choose Us", aboutEsg: "Environment, Social & Governance (ESG)", aboutHse: "Health, Safety & Environment (HSE)",
        products: "Products", services: "Services", parts: "Spare Parts", knowledge: "Knowledge", media: "Media", career: "Career", contact: "Contact", bahasa: "Language:"
      }
    };
    return fallbackDict[locale]?.[key] || fallback || key;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300">
      
      {/* NAVBAR CONTAINER */}
      <div 
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white/60 backdrop-blur-md border-slate-200/30 shadow-xs py-2 sm:py-2.5' 
            : 'bg-white/85 backdrop-blur-sm border-slate-100 shadow-sm py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          
          {/* LOGO & NAMA PT SISI KIRI (RESPONSIF MOBILE & DESKTOP) */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 lg:mr-6 notranslate">
            <div className="h-7 sm:h-9 md:h-10 flex items-center shrink-0">
              <img 
                src="/images/logo.png" 
                alt="Logo PT. Servistama Pro Indonesia" 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs sm:text-sm md:text-base font-black text-[#0f2b5c] tracking-tight leading-none group-hover:text-[#ffc107] transition-colors">
                PT. Servistama Pro Indonesia
              </span>
            </div>
          </a>

          {/* MENU UTAMA (DESKTOP) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-bold text-xs md:text-sm text-[#0f2b5c]">
            
            {/* Home Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('home')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'home' || isActive('/') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>{t('home', 'Home')}</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'home' && (
                <div className="absolute top-full left-0 w-[420px] bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-5 mt-3 z-50">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-bold text-[#0f2b5c]">
                    <a href="/" className="hover:text-[#ffc107] transition py-1 col-span-2 border-b border-slate-100 font-black">{t('homeTop', 'Top of Home')}</a>
                    <a href="/#about" className="hover:text-[#ffc107] transition py-1">{t('homeIntro', 'Company Introduction')}</a>
                    <a href="/#statistics" className="hover:text-[#ffc107] transition py-1">{t('homeStats', 'Company Statistics')}</a>
                    <a href="/#strength" className="hover:text-[#ffc107] transition py-1">{t('homeStrength', 'Company Strength')}</a>
                    <a href="/#services" className="hover:text-[#ffc107] transition py-1">{t('homeServices', 'Featured Services')}</a>
                    <a href="/#testimonials" className="hover:text-[#ffc107] transition py-1">{t('homeTestimonials', 'Customer Testimonials')}</a>
                    <a href="/#projects" className="hover:text-[#ffc107] transition py-1">{t('homeProjects', 'Project Gallery')}</a>
                    <a href="/#news" className="hover:text-[#ffc107] transition py-1">{t('homeNews', 'Latest News')}</a>
                    <a href="/#contact" className="hover:text-[#ffc107] transition py-1">{t('homeContact', 'Contact Information')}</a>
                    <a href="/#operational-area" className="hover:text-[#ffc107] transition py-1 col-span-2">{t('homeBranch', 'Branch Office')}</a>
                  </div>
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('about')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] cursor-pointer ${
                  activeMenu === 'about' || isParentActive(['/about', '/why-choose-us', '/esg', '/hse']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>{t('about', 'About Us')}</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'about' && (
                <div className="absolute top-full left-0 w-[320px] bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-4 mt-3 z-50">
                  <div className="flex flex-col space-y-2 text-xs font-bold">
                    <a href="/about" className="text-[#0f2b5c] hover:text-[#ffc107] transition py-1.5 border-b border-slate-100 font-black">{t('aboutOverview', 'Company Profile Overview')}</a>
                    <a href="/why-choose-us" className="text-[#0f2b5c] hover:opacity-80 transition py-1 font-extrabold">{t('aboutWhy', 'Why Choose Us')}</a>
                    <a href="/esg" className="text-[#15803d] hover:opacity-80 transition py-1 font-extrabold">{t('aboutEsg', 'Environment, Social & Governance (ESG)')}</a>
                    <a href="/hse" className="text-[#0284c7] hover:opacity-80 transition py-1 font-extrabold">{t('aboutHse', 'Health, Safety & Environment (HSE)')}</a>
                  </div>
                </div>
              )}
            </div>

            {/* Products */}
            <a href="/products" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isParentActive(['/products']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {t('products', 'Products')}
            </a>

            {/* Services */}
            <a href="/services" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isParentActive(['/services']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {t('services', 'Services')}
            </a>

            {/* Spare Parts */}
            <a href="/spare-parts" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isParentActive(['/spare-parts']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {t('parts', 'Spare Parts')}
            </a>

            {/* Knowledge */}
            <a href="/knowledge" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/knowledge') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {t('knowledge', 'Knowledge')}
            </a>

            {/* Media */}
            <a href="/media-gallery" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/media-gallery') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {t('media', 'Media')}
            </a>

            {/* Career */}
            <a href="/career" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/career') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {t('career', 'Career')}
            </a>

            {/* Contact */}
            <a href="/contact-us" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/contact-us') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {t('contact', 'Contact')}
            </a>
          </nav>

          {/* BENDERA SAJA (DESKTOP) */}
          <div className="hidden lg:flex items-center space-x-2.5 text-sm shrink-0">
            <button 
              onClick={() => changeLanguage('id')} 
              className="flex items-center transition cursor-pointer opacity-100 hover:scale-110 focus:outline-none" 
              title="Bahasa Indonesia"
            >
              <img src="https://flagcdn.com/id.svg" alt="Indonesia" className="w-6 h-4 object-cover rounded-xs shadow-xs" />
            </button>
            
            <span className="text-slate-300 font-normal">|</span>
            
            <button 
              onClick={() => changeLanguage('en')} 
              className="flex items-center transition cursor-pointer opacity-100 hover:scale-110 focus:outline-none" 
              title="English"
            >
              <img src="https://flagcdn.com/gb.svg" alt="English" className="w-6 h-4 object-cover rounded-xs shadow-xs" />
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON (PROPORSIONAL) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-xl sm:text-2xl font-black text-[#0f2b5c] focus:outline-none"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

        </div>
      </div>

      {/* MOBILE MENU DRAWER (COLLAPSIBLE DROPDOWN / SEMBUNYI) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md text-[#0f2b5c] border-b border-slate-200 shadow-xl px-5 py-4 font-bold text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-2.5">
            
            {/* Home Dropdown Mobile (Collapsible) */}
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between py-1">
                <a href="/" className="flex-1">{t('home', 'Home')}</a>
                <button 
                  onClick={() => setMobileHomeOpen(!mobileHomeOpen)}
                  className="px-2 py-0.5 text-xs text-slate-500 focus:outline-none"
                >
                  {mobileHomeOpen ? '▲' : '▼'}
                </button>
              </div>
              {mobileHomeOpen && (
                <div className="flex flex-col space-y-1.5 pl-3 pt-2 bg-slate-50/70 rounded-lg p-2 mt-1 text-[11px] sm:text-xs font-normal">
                  <a href="/" className="hover:text-[#ffc107] font-black">{t('homeTop', 'Top of Home')}</a>
                  <a href="/#about" className="hover:text-[#ffc107]">{t('homeIntro', 'Company Introduction')}</a>
                  <a href="/#statistics" className="hover:text-[#ffc107]">{t('homeStats', 'Company Statistics')}</a>
                  <a href="/#strength" className="hover:text-[#ffc107]">{t('homeStrength', 'Company Strength')}</a>
                  <a href="/#services" className="hover:text-[#ffc107]">{t('homeServices', 'Featured Services')}</a>
                  <a href="/#testimonials" className="hover:text-[#ffc107]">{t('homeTestimonials', 'Customer Testimonials')}</a>
                  <a href="/#projects" className="hover:text-[#ffc107]">{t('homeProjects', 'Project Gallery')}</a>
                  <a href="/#news" className="hover:text-[#ffc107]">{t('homeNews', 'Latest News')}</a>
                  <a href="/#contact" className="hover:text-[#ffc107]">{t('homeContact', 'Contact Information')}</a>
                  <a href="/#operational-area" className="hover:text-[#ffc107]">{t('homeBranch', 'Branch Office')}</a>
                </div>
              )}
            </div>

            {/* About Us Dropdown Mobile (Collapsible) */}
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between py-1">
                <span className="flex-1 text-[#0f2b5c]">{t('about', 'About Us')}</span>
                <button 
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="px-2 py-0.5 text-xs text-slate-500 focus:outline-none"
                >
                  {mobileAboutOpen ? '▲' : '▼'}
                </button>
              </div>
              {mobileAboutOpen && (
                <div className="flex flex-col space-y-1.5 pl-3 pt-2 bg-slate-50/70 rounded-lg p-2 mt-1 text-[11px] sm:text-xs font-semibold">
                  <a href="/about" className="text-[#0f2b5c] hover:text-[#ffc107] font-black">{t('aboutOverview', 'Company Profile Overview')}</a>
                  <a href="/why-choose-us" className="text-[#0f2b5c] hover:opacity-80 font-extrabold">{t('aboutWhy', 'Why Choose Us')}</a>
                  <a href="/esg" className="text-[#15803d] hover:opacity-80 font-extrabold">{t('aboutEsg', 'Environment, Social & Governance (ESG)')}</a>
                  <a href="/hse" className="text-[#0284c7] hover:opacity-80 font-extrabold">{t('aboutHse', 'Health, Safety & Environment (HSE)')}</a>
                </div>
              )}
            </div>
            
            <a href="/products" className="py-2 border-b border-slate-100">{t('products', 'Products')}</a>
            <a href="/services" className="py-2 border-b border-slate-100">{t('services', 'Services')}</a>
            <a href="/spare-parts" className="py-2 border-b border-slate-100">{t('parts', 'Spare Parts')}</a>
            <a href="/knowledge" className="py-2 border-b border-slate-100">{t('knowledge', 'Knowledge')}</a>
            <a href="/media-gallery" className="py-2 border-b border-slate-100">{t('media', 'Media')}</a>
            <a href="/career" className="py-2 border-b border-slate-100">{t('career', 'Career')}</a>
            <a href="/contact-us" className="py-2">{t('contact', 'Contact')}</a>

            {/* Pilihan Bahasa Versi Mobile */}
            <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
              <span className="text-[11px] sm:text-xs text-slate-400">{t('bahasa', 'Language:')}</span>
              
              <button 
                onClick={() => changeLanguage('id')} 
                className="flex items-center focus:outline-none"
              >
                <img src="https://flagcdn.com/id.svg" alt="ID" className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
              </button>
              
              <button 
                onClick={() => changeLanguage('en')} 
                className="flex items-center focus:outline-none"
              >
                <img src="https://flagcdn.com/gb.svg" alt="EN" className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Elemen Wajib Google Translate (Disembunyikan agar terintegrasi dengan tombol bendera) */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

    </header>
  );
}