import React, { useEffect, useState } from 'react';
import { useRouter, Link } from '../utils/router';
import { BUSINESS_INFO, createWhatsAppLink } from '../constants/business';
import { Sun, Menu, X, Phone, MessageSquare, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = currentPath === '/';

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 10);

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Solar Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
  ];
  const calculatorLinks = [
    { label: 'Budget Calculator', path: '/budget-calculator' },
    { label: 'Solar PV Calculator', path: '/solar-pv-calculator' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setCalculatorsOpen(false);
  };

  const isCalculatorActive = calculatorLinks.some((item) => currentPath === item.path);

  const whatsappQuoteUrl = createWhatsAppLink(
    'Assalam-o-Alaikum, I visited your website and would like a free quotation for solar installation.'
  );

  return (
    <header
      className={`sticky top-[5vh] z-40 mt-[4vh] mx-auto w-[95%] overflow-visible rounded-[10%] border border-slate-200 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-md'
          : 'bg-white/95 backdrop-blur-none shadow-xs'
      } ${
        isHomePage ? '-mb-[calc(5vh+4rem)] sm:-mb-[calc(5vh+5rem)]' : ''
      }`}
    >
      
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
            <span className="text-[8px] sm:text-[9px] font-semibold text-emerald-700 tracking-wide sm:tracking-wider uppercase whitespace-nowrap">
              & Electrical Engineering
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-bold text-slate-700">
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
          <div className="relative">
            <button
              type="button"
              onClick={() => setCalculatorsOpen(!calculatorsOpen)}
              aria-expanded={calculatorsOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1 whitespace-nowrap py-1 transition-colors cursor-pointer ${
                isCalculatorActive || calculatorsOpen
                  ? 'text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-[#10243A]'
              }`}
            >
              Calculators
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`} />
            </button>
            {calculatorsOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 min-w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {calculatorLinks.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      currentPath === item.path
                        ? 'bg-emerald-50 font-semibold text-emerald-800'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => handleNavClick('/contact')}
            className={`whitespace-nowrap py-1 transition-colors cursor-pointer ${
              currentPath === '/contact'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-[#10243A]'
            }`}
          >
            Contact
          </button>
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
              type="button"
              onClick={() => setCalculatorsOpen(!calculatorsOpen)}
              aria-expanded={calculatorsOpen}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                isCalculatorActive || calculatorsOpen
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Calculators
              <ChevronDown className={`h-4 w-4 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`} />
            </button>
            {calculatorsOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l-2 border-emerald-100 pl-2">
                {calculatorLinks.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`rounded-md px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      currentPath === item.path
                        ? 'bg-emerald-50 font-semibold text-emerald-800'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/contact'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
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
