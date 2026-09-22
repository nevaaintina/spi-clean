import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app_lang') || 'id';
    }
    return 'id';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_lang', newLang);
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

  const t = {
    id: {
      home: "Home",
      homeTop: "Top of Home",
      homeIntro: "Pengenalan Perusahaan",
      homeStats: "Statistik Perusahaan",
      homeStrength: "Keunggulan Perusahaan",
      homeServices: "Layanan Unggulan",
      homeTestimonials: "Testimoni Pelanggan",
      homeProjects: "Galeri Proyek",
      homeNews: "Berita Terbaru",
      homeContact: "Informasi Kontak",
      homeBranch: "Kantor Cabang",

      about: "About Us",
      aboutOverview: "Company Profile Overview",
      aboutWhy: "Why Choose Us",
      aboutEsg: "Environment, Social & Governance (ESG)",
      aboutHse: "Health, Safety & Environment (HSE)",

      products: "Products",
      services: "Services",
      parts: "Spare Parts",
      knowledge: "Knowledge",
      media: "Media",
      career: "Career",
      contact: "Contact",
      bahasa: "Bahasa:"
    },
    en: {
      home: "Home",
      homeTop: "Top of Home",
      homeIntro: "Company Introduction",
      homeStats: "Company Statistics",
      homeStrength: "Company Strength",
      homeServices: "Featured Services",
      homeTestimonials: "Customer Testimonials",
      homeProjects: "Project Gallery",
      homeNews: "Latest News",
      homeContact: "Contact Information",
      homeBranch: "Branch Office",

      about: "About Us",
      aboutOverview: "Company Profile Overview",
      aboutWhy: "Why Choose Us",
      aboutEsg: "Environment, Social & Governance (ESG)",
      aboutHse: "Health, Safety & Environment (HSE)",

      products: "Products",
      services: "Services",
      parts: "Spare Parts",
      knowledge: "Knowledge",
      media: "Media",
      career: "Career",
      contact: "Contact",
      bahasa: "Language:"
    }
  };

  const currentText = t[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300">
      
      {/* NAVBAR CONTAINER */}
      <div 
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white/60 backdrop-blur-md border-slate-200/30 shadow-xs py-2.5' 
            : 'bg-white/85 backdrop-blur-sm border-slate-100 shadow-sm py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* LOGO SISI KIRI */}
          <a href="/" className="flex items-center group shrink-0 lg:mr-6">
            <div className="h-9 md:h-10 flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Logo PT. Servistama Pro Indonesia" 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {/* MENU UTAMA */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-bold text-xs md:text-sm text-[#0f2b5c]">
            
            {/* Home Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('home')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'home' || isActive('/') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>{currentText.home}</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'home' && (
                <div className="absolute top-full left-0 w-[420px] bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-5 mt-3 z-50">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-bold text-[#0f2b5c]">
                    <a href="/" className="hover:text-[#ffc107] transition py-1 col-span-2 border-b border-slate-100 font-black">{currentText.homeTop}</a>
                    <a href="/#about" className="hover:text-[#ffc107] transition py-1">{currentText.homeIntro}</a>
                    <a href="/#statistics" className="hover:text-[#ffc107] transition py-1">{currentText.homeStats}</a>
                    <a href="/#strength" className="hover:text-[#ffc107] transition py-1">{currentText.homeStrength}</a>
                    <a href="/#services" className="hover:text-[#ffc107] transition py-1">{currentText.homeServices}</a>
                    <a href="/#testimonials" className="hover:text-[#ffc107] transition py-1">{currentText.homeTestimonials}</a>
                    <a href="/#projects" className="hover:text-[#ffc107] transition py-1">{currentText.homeProjects}</a>
                    <a href="/#news" className="hover:text-[#ffc107] transition py-1">{currentText.homeNews}</a>
                    <a href="/#contact" className="hover:text-[#ffc107] transition py-1">{currentText.homeContact}</a>
                    <a href="/#operational-area" className="hover:text-[#ffc107] transition py-1 col-span-2">{currentText.homeBranch}</a>
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
                <span>{currentText.about}</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'about' && (
                <div className="absolute top-full left-0 w-[320px] bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-4 mt-3 z-50">
                  <div className="flex flex-col space-y-2 text-xs font-bold">
                    <a href="/about" className="text-[#0f2b5c] hover:text-[#ffc107] transition py-1.5 border-b border-slate-100 font-black">{currentText.aboutOverview}</a>
                    <a href="/why-choose-us" className="text-[#0f2b5c] hover:opacity-80 transition py-1 font-extrabold">{currentText.aboutWhy}</a>
                    <a href="/esg" className="text-[#15803d] hover:opacity-80 transition py-1 font-extrabold">{currentText.aboutEsg}</a>
                    <a href="/hse" className="text-[#0284c7] hover:opacity-80 transition py-1 font-extrabold">{currentText.aboutHse}</a>
                  </div>
                </div>
              )}
            </div>

            {/* Products */}
            <a 
              href="/products" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isParentActive(['/products']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              {currentText.products}
            </a>

            {/* Services */}
            <a 
              href="/services" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isParentActive(['/services']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              {currentText.services}
            </a>

            {/* Spare Parts (Mengarah ke folder SpareParts Index) */}
            <a href="/spare-parts" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isParentActive(['/spare-parts']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {currentText.parts}
            </a>

            {/* Knowledge */}
            <a href="/knowledge" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/knowledge') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {currentText.knowledge}
            </a>

            {/* Media */}
            <a href="/media-gallery" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/media-gallery') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {currentText.media}
            </a>

            {/* Career */}
            <a href="/career" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/career') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {currentText.career}
            </a>

            {/* Contact */}
            <a href="/contact-us" className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${isActive('/contact-us') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'}`}>
              {currentText.contact}
            </a>
          </nav>

          {/* BENDERA / PEMILIH BAHASA (DESKTOP) */}
          <div className="hidden lg:flex items-center space-x-2.5 text-sm shrink-0">
            <button 
              onClick={() => changeLanguage('id')} 
              className={`flex items-center gap-1.5 transition cursor-pointer ${lang === 'id' ? 'opacity-100 font-bold scale-105' : 'opacity-40 hover:opacity-80'}`} 
              title="Bahasa Indonesia"
            >
              <img src="https://flagcdn.com/id.svg" alt="Indonesia" className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
              <span className="text-xs font-bold text-[#0f2b5c]">ID</span>
            </button>
            
            <span className="text-slate-300 font-normal">|</span>
            
            <button 
              onClick={() => changeLanguage('en')} 
              className={`flex items-center gap-1.5 transition cursor-pointer ${lang === 'en' ? 'opacity-100 font-bold scale-105' : 'opacity-40 hover:opacity-80'}`} 
              title="English"
            >
              <img src="https://flagcdn.com/gb.svg" alt="English" className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
              <span className="text-xs font-bold text-slate-500">EN</span>
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-2xl font-black text-[#0f2b5c] focus:outline-none"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md text-[#0f2b5c] border-b border-slate-200 shadow-xl p-6 font-bold text-sm max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            <a href="/" className="py-2 border-b border-slate-100">Home</a>
            <a href="/#about" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeIntro}</a>
            <a href="/#statistics" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeStats}</a>
            <a href="/#strength" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeStrength}</a>
            <a href="/#services" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeServices}</a>
            <a href="/#testimonials" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeTestimonials}</a>
            <a href="/#projects" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeProjects}</a>
            <a href="/#news" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeNews}</a>
            <a href="/#contact" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeContact}</a>
            <a href="/#operational-area" className="py-2 border-b border-slate-100 pl-4 text-xs font-normal">{currentText.homeBranch}</a>

            <div className="py-2 border-b border-slate-100 flex flex-col space-y-2">
              <span className="text-slate-400 font-semibold">{currentText.about}</span>
              <a href="/about" className="pl-4 text-xs text-[#0f2b5c] font-black">{currentText.aboutOverview}</a>
              <a href="/why-choose-us" className="pl-4 text-xs text-[#0f2b5c] font-extrabold">{currentText.aboutWhy}</a>
              <a href="/esg" className="pl-4 text-xs text-[#15803d] font-extrabold">{currentText.aboutEsg}</a>
              <a href="/hse" className="pl-4 text-xs text-[#0284c7] font-extrabold">{currentText.aboutHse}</a>
            </div>
            
            <a href="/products" className="py-2 border-b border-slate-100">{currentText.products}</a>
            <a href="/services" className="py-2 border-b border-slate-100">{currentText.services}</a>
            <a href="/spare-parts" className="py-2 border-b border-slate-100">{currentText.parts}</a>
            <a href="/knowledge" className="py-2 border-b border-slate-100">{currentText.knowledge}</a>
            <a href="/media-gallery" className="py-2 border-b border-slate-100">{currentText.media}</a>
            <a href="/career" className="py-2 border-b border-slate-100">{currentText.career}</a>
            <a href="/contact-us" className="py-2">{currentText.contact}</a>

            {/* Pilihan Bahasa Versi Mobile */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
              <span className="text-xs text-slate-400">{currentText.bahasa}</span>
              
              <button 
                onClick={() => changeLanguage('id')} 
                className={`flex items-center gap-1 text-xs font-bold ${lang === 'id' ? 'text-[#0f2b5c]' : 'text-slate-400'}`}
              >
                <img src="https://flagcdn.com/id.svg" alt="ID" className="w-4 h-3 object-cover rounded-xs" /> ID
              </button>
              
              <button 
                onClick={() => changeLanguage('en')} 
                className={`flex items-center gap-1 text-xs font-bold ${lang === 'en' ? 'text-[#0f2b5c]' : 'text-slate-400'}`}
              >
                <img src="https://flagcdn.com/gb.svg" alt="EN" className="w-4 h-3 object-cover rounded-xs" /> EN
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}