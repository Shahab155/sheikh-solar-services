import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, IMAGES, createWhatsAppLink } from '../constants/business';
import {
  Sun, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, Wrench,
  Zap, Layers, Building, Home, Factory
} from 'lucide-react';

export const SolarInstallationPage: React.FC = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    propertyType: 'Residential',
    systemType: 'Hybrid Solar System',
    estimatedBudget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const message = `Assalam-o-Alaikum SHEIKH SOLAR,
I would like to request a quotation for Solar System Installation:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Location: ${formData.location || 'Karachi'}
• Property: ${formData.propertyType}
• Preferred System: ${formData.systemType}
${formData.estimatedBudget ? `• Target Budget: ${formData.estimatedBudget}` : ''}
${formData.message ? `• Requirements: ${formData.message}` : ''}

Please contact me to discuss system options and arrange a site visit.`;

    window.open(createWhatsAppLink(message), '_blank');
  };

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Banner */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5">
              <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                Service 01 · Engineering & Commissioning
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight leading-tight">
                Turnkey Solar System Installation in Karachi
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Comprehensive solar engineering design, structure fabrication, electrical protection, and high-efficiency panel mounting for residential rooftops, commercial buildings, and industrial facilities.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I am interested in a solar installation. Please guide me about system options and pricing.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <button
                  onClick={() => navigate('/budget-calculator')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#10243A] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>Calculate Installation Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full min-h-[340px] relative bg-slate-900">
              <img
                src={IMAGES.installation}
                alt="Solar rooftop installation engineering"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scope of Solutions */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">
              Installation Across Property Categories
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Engineered to meet specific load demands, roof orientations, and utility requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#10243A]">Residential Rooftops</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard or elevated rooftop structures tailored for bungalows, townhouses, and apartment terraces in Karachi. Designed to leave roof space usable for family and recreational activities.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Typical 3 kW to 15 kW arrays</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Elevated galvanized iron frames</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hybrid battery options for uninterrupted backup</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#10243A]">Commercial Facilities</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solar systems designed for offices, medical centers, schools, shopping plazas, and retail outlets with high daytime operational electricity consumption.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 15 kW to 100 kW commercial setups</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Three-phase commercial inverters</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Net metering compatibility</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#10243A]">Industrial Solar Solutions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Large-scale solar installations on industrial shed roofs, factories, and warehouses to stabilize day-time energy costs and support industrial machinery.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High-volume corrugated sheet mounting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Industrial switchgear and protection</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Synchronized diesel generator control</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4-Step Installation Process */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs mb-14">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase block">
              Step-by-Step Workflow
            </span>
            <h2 className="text-2xl font-extrabold text-[#10243A] mt-1">
              Our Professional Installation Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-slate-400">STAGE 01</span>
              <h4 className="font-bold text-sm text-[#10243A]">Site Assessment & Sizing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detailed survey of roof structure, shadow casting from neighboring structures, structural load viability, and electricity bills.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-slate-400">STAGE 02</span>
              <h4 className="font-bold text-sm text-[#10243A]">Structure Fabrication</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Erection of custom elevated or standard galvanized mounting framing engineered with accurate south-facing tilt angles for Karachi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-slate-400">STAGE 03</span>
              <h4 className="font-bold text-sm text-[#10243A]">Panel & Wiring Mounting</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mounting of monocrystalline panels, DC conduit routing, AC switchgear, breakers, surge protection devices, and copper earthing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-slate-400">STAGE 04</span>
              <h4 className="font-bold text-sm text-[#10243A]">Testing & Commissioning</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive multimeter testing, phase sequence verification, inverter configuration, load testing, and client handover.
              </p>
            </div>
          </div>
        </div>

        {/* Installation Request Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#10243A]">
              Request an Installation Assessment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Submit your property details and we will generate a prefilled WhatsApp enquiry for immediate review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0312 XXXXXXX"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Karachi Location / Area</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. North Nazimabad, Gulshan, DHA"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Property Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Residential">Residential Bungalow / House</option>
                  <option value="Commercial">Commercial Office / Building</option>
                  <option value="Industrial">Industrial Factory / Warehouse</option>
                  <option value="Apartment">Apartment Rooftop</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">System Type Desired</label>
                <select
                  value={formData.systemType}
                  onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Hybrid Solar System">Hybrid (Grid + Battery Backup)</option>
                  <option value="On-Grid Solar System">On-Grid (Net Metering)</option>
                  <option value="Off-Grid Solar System">Off-Grid Independent</option>
                  <option value="Not Sure / Need Advice">Need Engineering Advice</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Specific Requirements or Roof Details</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention desired capacity (e.g. 5kW, 10kW), current monthly electricity bill, or need for elevated structure..."
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Send Installation Enquiry via WhatsApp</span>
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              Enquiry creates a prefilled message directly on WhatsApp to {BUSINESS_INFO.phoneDisplay}. No data is stored on external servers.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
