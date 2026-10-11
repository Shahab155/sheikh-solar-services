import React, { useState } from 'react';
import { useRouter, Link } from '../utils/router';
import { BUSINESS_INFO, createWhatsAppLink } from '../constants/business';
import { Sun, Menu, X, Phone, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Solar Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
    { label: 'Budget Calculator', path: '/budget-calculator' },
    { label: 'Solar PV Calculator', path: '/solar-pv-calculator' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const whatsappQuoteUrl = createWhatsAppLink(
    'Assalam-o-Alaikum, I visited your website and would like a free quotation for solar installation.'
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar with phone and quick info */}
      <div className="hidden lg:block bg-[#10243A] text-slate-300 text-xs py-1.5 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400 font-medium">Karachi Location:</span> {BUSINESS_INFO.locationCity}
            </span>
            <span className="text-slate-500">|</span>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/solar-estimator" className="text-amber-300 hover:text-amber-200 transition-colors">
              Quick System Sizing Estimator
            </Link>
            <span className="text-slate-600">·</span>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
            >
              Find on Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Single Brand element */}
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3 shrink group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-[#10243A] flex items-center justify-center text-amber-400 shadow-sm border border-slate-800 group-hover:scale-105 transition-transform">
            <Sun className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-sm sm:text-lg font-extrabold tracking-tight text-[#10243A] leading-tight whitespace-nowrap">
              SHEIKH SOLAR
            </span>
            <span className="text-[8px] sm:text-[11px] font-semibold text-emerald-700 tracking-wide sm:tracking-wider uppercase whitespace-nowrap">
              & Electrical Engineering
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700">
          {navLinks.map((item) => {
            const isActive =
              currentPath === item.path ||
              (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                  isActive
                    ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                    : 'hover:text-[#10243A] text-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <a
            href={whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-white/20" />
            <span className="max-[360px]:hidden sm:inline">Get a Free Quote</span>
            <span className="hidden max-[360px]:inline sm:hidden">Quote</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-150">
          <div className="flex flex-col gap-1 pb-4">
            {navLinks.map((item) => {
              const isActive =
                currentPath === item.path ||
                (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('/solar-estimator')}
              className="text-left px-3 py-2.5 rounded-md text-sm font-medium text-amber-800 bg-amber-50/70 hover:bg-amber-100/70 transition-colors cursor-pointer"
            >
              Solar Sizing Estimator
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-slate-800">{BUSINESS_INFO.phoneDisplay}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              {BUSINESS_INFO.address}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
