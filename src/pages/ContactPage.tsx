import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, createWhatsAppLink } from '../constants/business';
import {
  MapPin, Phone, MessageSquare, ExternalLink, Calculator,
  Clock, Send, ChevronRight, ShieldCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    service: 'Solar System Installation',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.message.trim()) errs.message = 'Please provide details of your enquiry';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const msg = `Assalam-o-Alaikum SHEIKH SOLAR & ELECTRICAL ENGINEERING,
I have an inquiry from your website:

• Name: ${formData.name}
• Phone: ${formData.phone}
• Area/Location: ${formData.location || 'Karachi'}
• Service Required: ${formData.service}
• Message: ${formData.message}

Please get in touch with me.`;

    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium">Contact Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Get in Touch With Sheikh Solar
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Contact us for rooftop solar installation consultations, maintenance visits, panel washing, or equipment availability in Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details & Maps Link */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <h2 className="text-xl font-bold text-[#10243A]">
                Business Contact Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Workshop & Office Location</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Phone Call</span>
                    <a
                      href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-emerald-700 font-semibold hover:underline mt-0.5 block"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">WhatsApp Direct Chat</span>
                    <a
                      href={createWhatsAppLink('Assalam-o-Alaikum, I would like to enquire about your solar engineering services.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:underline mt-0.5 block"
                    >
                      {BUSINESS_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Hours of Operation</span>
                    <p className="text-slate-600 mt-0.5">
                      Monday – Saturday: 9:00 AM – 7:00 PM<br />
                      Sunday: Site visits by advance appointment
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#10243A] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Open on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Quick Budget Banner */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 shadow-xs border border-emerald-700/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Calculator className="w-4 h-4" />
                <span>Need a Fast Estimate?</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Try our self-service calculator to configure panels, inverters, battery storage, and customized accessories before submitting your enquiry.
              </p>
              <button
                onClick={() => navigate('/budget-calculator')}
                className="w-full py-2.5 px-3 bg-white text-emerald-950 hover:bg-emerald-50 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Launch Budget Calculator
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-2xs">
            <h2 className="text-xl font-bold text-[#10243A] mb-1">
              Send an Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill out this form and click submit. It validates your input and creates a pre-filled WhatsApp message for instantaneous communication.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Muhammad Ali"
                    className={`w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                      errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Contact Phone (WhatsApp) *</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Area / Location in Karachi</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. North Nazimabad, Gulshan, DHA"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Solar System Installation">Solar System Installation</option>
                    <option value="Solar System Maintenance">Solar System Maintenance & Repair</option>
                    <option value="Solar Panel Cleaning">Solar Panel Cleaning</option>
                    <option value="Solar Equipment Supply">Solar Equipment Supply (Wholesale/Retail)</option>
                    <option value="Site Survey & Consultation">Site Survey & Engineering Assessment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Your Message or Requirements *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Share details such as estimated capacity (e.g. 5kW, 10kW), electricity bill, inverter brand preference, or rooftop situation..."
                  className={`w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                    errors.message ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Send WhatsApp Enquiry</span>
              </button>

              <div className="text-[11px] text-slate-500 text-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                Notice: Form submission triggers your WhatsApp application with the pre-formatted enquiry to {BUSINESS_INFO.phoneDisplay}. No data is stored on remote demo databases.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
