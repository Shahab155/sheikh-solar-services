import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, IMAGES, createWhatsAppLink } from '../constants/business';
import {
  Sparkles, CheckCircle2, ShieldAlert, ShieldCheck, MessageSquare,
  Clock, Droplets, Sun, AlertTriangle
} from 'lucide-react';

export const SolarCleaningPage: React.FC = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    panelCount: '18 panels',
    roofAccess: 'Easy Staircase Access',
    preferredDate: '',
    instructions: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `Assalam-o-Alaikum SHEIKH SOLAR & ELECTRICAL ENGINEERING,
I would like to book a Solar Panel Cleaning Service in Karachi:

• Name: ${formData.name}
• Phone: ${formData.phone}
• Location: ${formData.location || 'Karachi'}
• Number of Panels: ${formData.panelCount}
• Roof Accessibility: ${formData.roofAccess}
• Preferred Date: ${formData.preferredDate || 'Soonest available'}
${formData.instructions ? `• Instructions / Notes: ${formData.instructions}` : ''}

Please confirm your cleaning crew slot and charges.`;

    window.open(createWhatsAppLink(message), '_blank');
  };

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5">
              <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                Service 03 · Specialized Surface Maintenance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight leading-tight">
                Professional Solar Panel Cleaning Services in Karachi
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Restore optimal sunlight absorption with safe, non-abrasive de-ionized washing. In Karachi’s urban environment, dust accumulation can degrade photovoltaic energy generation by 15% to 30%.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I am interested in solar panel cleaning services. Please share the details.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Book Cleaning on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full min-h-[340px] relative bg-slate-900">
              <img
                src={IMAGES.cleaning}
                alt="Solar cleaning technician washing solar panels with specialized soft brush"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Safety Warning Callout */}
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mb-12 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950 block mb-0.5">Rooftop Safety Notice for Property Owners</strong>
            Cleaning elevated solar arrays involves fall hazards, wet surfaces, and high-voltage DC string electrical currents. We strongly advise homeowners against walking on wet sloped roofs or attempting dangerous DIY cleaning without certified safety harnesses and non-scratching soft tools.
          </div>
        </div>

        {/* Cleaning Guidance & Scope */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#10243A]">Pure Water & Soft Brushes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never use harsh chemicals, abrasive detergents, or high-pressure washers that can strip anti-reflective glass coatings or crack tempered glass cells. Only soft telescopic bristles and treated water are used.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#10243A]">Recommended Frequency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For Karachi conditions (construction dust, vehicle exhaust, sand), panels benefit from cleaning every 3 to 5 weeks during dry months, or whenever visual dust layers diminish inverter daytime generation.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#10243A]">Visual Inspection Included</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              While cleaning, our team inspects for cracked glass, bird droppings hot spots, loose mounting mid-clamps, and damaged exposed cabling, alerting you to potential issues early.
            </p>
          </div>
        </div>

        {/* Cleaning Request Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#10243A]">
              Book Solar Panel Cleaning
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Fill in your details below and submit to launch an immediate WhatsApp cleaning booking request.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Your Name"
                  className={`w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                    errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="0312 XXXXXXX"
                  className={`w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                    errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Karachi Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. North Nazimabad, F.B Area"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Approx. Number of Panels</label>
                <input
                  type="text"
                  value={formData.panelCount}
                  onChange={(e) => setFormData({ ...formData, panelCount: e.target.value })}
                  placeholder="e.g. 12, 18, 30 panels"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Roof Accessibility</label>
                <select
                  value={formData.roofAccess}
                  onChange={(e) => setFormData({ ...formData, roofAccess: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Easy Staircase Access">Easy Staircase Access</option>
                  <option value="Elevated Rooftop Structure">Elevated Steel Structure (requires ladder)</option>
                  <option value="Narrow Roof Access">Narrow Hatch / Spiral Staircase</option>
                  <option value="Commercial Metal Roof">Commercial Tin / Shed Roof</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Water Supply Available at Roof?</label>
                <select
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Yes">Yes, roof tap/tank connection available</option>
                  <option value="No">No, team needs hose extension from ground</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Additional Instructions</label>
              <textarea
                rows={2}
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Mention any specific timing preferences or site constraints..."
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Submit Cleaning Booking via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
