import React from 'react';
import { useRouter, Link } from '../utils/router';
import { BUSINESS_INFO, createWhatsAppLink } from '../constants/business';
import { Sun, Phone, MapPin, MessageSquare, ExternalLink, Calculator, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const services = [
    { label: 'Solar System Installation', path: '/services/installation' },
    { label: 'Solar System Maintenance', path: '/services/maintenance' },
    { label: 'Solar Panel Cleaning', path: '/services/cleaning' },
    { label: 'Solar Equipment Supply', path: '/services/supply' },
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'All Services', path: '/services' },
    { label: 'Solar Products', path: '/products' },
    { label: 'Illustrative Projects', path: '/projects' },
    { label: 'Installation Budget Calculator', path: '/budget-calculator' },
    { label: 'Solar PV Calculator', path: '/solar-pv-calculator' },
    { label: 'Solar Sizing Estimator', path: '/solar-estimator' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const productCategories = [
    'Tier-1 Solar Panels',
    'On-Grid & Hybrid Inverters',
    'Lithium & Tubular Batteries',
    'Elevated & Standard Structures',
    'DC/AC Protection & Breakers',
    'Solar Cables & Connectors',
  ];

  return (
    <footer className="bg-[#10243A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-amber-400">
                <Sun className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-white font-extrabold tracking-tight text-lg">
                  {BUSINESS_INFO.name}
                </h3>
                <span className="text-xs text-emerald-400 font-medium">
                  Karachi, Pakistan
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Specialized solar energy and electrical engineering services in Karachi. Providing rooftop solar installations, scheduled inverter and system maintenance, specialized panel cleaning, and quality solar equipment supply for homes and commercial facilities.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I would like to enquire about your solar services in Karachi.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                >
                  WhatsApp: {BUSINESS_INFO.whatsappDisplay}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wide uppercase">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {services.map((s) => (
                <li key={s.path}>
                  <button
                    onClick={() => navigate(s.path)}
                    className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={() => navigate('/budget-calculator')}
                className="w-full text-left p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Budget Calculator</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Calculate estimated setup costs live with custom items.
                </p>
              </button>
            </div>
          </div>

          {/* Col 4: Solar Equipment Supply */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wide uppercase">
              Equipment Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {productCategories.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <button
                    onClick={() => navigate('/products')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Quick Navigation & Working Hours */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.slice(0, 5).map((q) => (
                <li key={q.path}>
                  <button
                    onClick={() => navigate(q.path)}
                    className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {q.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium text-slate-300">Engineering Advisory</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Detailed site evaluation and customized solar engineering designs for residential and commercial structures.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500 text-center md:text-right max-w-xl">
            Notice: Gallery projects and default calculator equipment rates are presented as illustrative samples for demonstration. Final project pricing and specifications require site assessment and formal quotation.
          </p>
        </div>
      </div>
    </footer>
  );
};
