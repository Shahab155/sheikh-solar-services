import React from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, IMAGES, createWhatsAppLink } from '../constants/business';
import {
  Sun, MapPin, Phone, MessageSquare, ExternalLink, ShieldCheck,
  Wrench, CheckCircle2, ChevronRight, Zap, Target
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            About SHEIKH SOLAR & ELECTRICAL ENGINEERING
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Solar energy system design, rooftop installation, electrical maintenance, and equipment supply based in North Nazimabad, Karachi.
          </p>
        </div>

        {/* Company Overview Card */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5">
              <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                Company Profile
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] leading-tight">
                Dedicated to Practical Solar & Electrical Solutions in Karachi
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                SHEIKH SOLAR & ELECTRICAL ENGINEERING is an engineering-driven business focused on delivering dependable solar power systems for residential homeowners, commercial enterprises, and industrial properties in Karachi.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our operations encompass end-to-end rooftop solar engineering, robust structure fabrication, on-grid and hybrid inverter integration, routine maintenance and diagnostic troubleshooting, non-abrasive solar panel washing, and wholesale/retail solar equipment supply.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I visited your website and would like information about your solar services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10243A] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>Contact Information</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full min-h-[320px] relative bg-slate-900">
              <img
                src={IMAGES.installation}
                alt="Solar installation engineering in Karachi"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#10243A]">Engineering-First Approach</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every property has unique electrical load patterns, roof orientation, and shading characteristics. We prioritize proper load calculation and sound electrical protection over one-size-fits-all sales pitches.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#10243A]">Electrical Safety & Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We emphasize proper DC breakers, AC isolators, surge protective devices (SPD), and certified copper earthing pits to safeguard high-value solar equipment and family homes from grid surges.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#10243A]">Lifecycle Maintenance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Solar investment yields best returns when properly maintained. We offer scheduled inverter checks, terminal retightening, and specialized cleaning services tailored for Karachi’s dusty environment.
            </p>
          </div>
        </div>

        {/* Business Office Details */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                Physical Office & Workshop
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#10243A]">
                Karachi Business Location
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Operating directly from North Nazimabad Town, we are centrally situated to serve residential and commercial solar installations across North Nazimabad, Gulberg, Federal B Area, Gulshan-e-Iqbal, PECHS, Clifton, DHA, and industrial corridors.
              </p>

              <div className="space-y-2 text-xs text-slate-700 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`} className="font-medium hover:text-emerald-700">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="pt-3">
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Verified Google Maps Listing</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-[#10243A]">Demo Information Notice</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                This website is a modern digital demo created for SHEIKH SOLAR & ELECTRICAL ENGINEERING. All listed business information, phone numbers, and coordinates are derived from verified business records. The content can be further personalized by the business management.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/budget-calculator')}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors text-center cursor-pointer"
                >
                  Try the Solar Budget Calculator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
