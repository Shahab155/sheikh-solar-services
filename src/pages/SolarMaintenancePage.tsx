import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, IMAGES, createWhatsAppLink } from '../constants/business';
import {
  Wrench, CheckCircle2, AlertTriangle, ShieldCheck, MessageSquare,
  ArrowRight, Phone, Activity, Gauge
} from 'lucide-react';

export const SolarMaintenancePage: React.FC = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    systemCapacity: '10 kW',
    systemType: 'Hybrid',
    problemDescription: '',
    preferredDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.problemDescription.trim()) errs.problemDescription = 'Please describe the issue or maintenance need';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `Assalam-o-Alaikum SHEIKH SOLAR & ELECTRICAL ENGINEERING,
I would like to book a Solar System Maintenance & Inspection visit:

• Full Name: ${formData.name}
• Contact Phone: ${formData.phone}
• Karachi Location: ${formData.location || 'Karachi'}
• System Capacity: ${formData.systemCapacity}
• System Architecture: ${formData.systemType}
• Preferred Date: ${formData.preferredDate || 'Earliest available'}
• Problem / Maintenance Request: ${formData.problemDescription}

Please confirm technician availability and visit charges.`;

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
                Service 02 · Electrical Diagnostics & Maintenance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight leading-tight">
                Solar System Inspection, Diagnostics & Maintenance
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Ensure peak energy harvest and safety with comprehensive inverter checks, terminal retightening, DC/AC protection audit, and precision electrical fault isolation across Karachi.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I need solar system maintenance. Please contact me regarding availability and charges.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full min-h-[340px] relative bg-slate-900">
              <img
                src={IMAGES.maintenance}
                alt="Solar technician inspecting hybrid inverter and electrical switchgear"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Maintenance Scope Checklist */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">
              Comprehensive Maintenance Scope
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our systematic approach protects your equipment investment and prevents dangerous electrical faults.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#10243A]">Inverter & Firmware Diagnostics</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Error code logs and fault memory readout</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>MPPT tracker voltage and current balance check</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Internal cooling fan cleaning and heat sink inspection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#10243A]">Electrical & Wiring Integrity</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>DC & AC breaker thermal scan to detect loose hot terminals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>MC4 connector inspection for weather corrosion or arc wear</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Earthing pit and ground resistance test</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#10243A]">Structure & Battery Bank</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Mounting clamp tension and roof anchor bolt torque check</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Lithium BMS communication & individual cell balancing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tubular battery gravity test and terminal anti-corrosion treat</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Working Maintenance Request Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#10243A]">
              Schedule a Maintenance & Inspection Visit
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Provide your system details to generate an instant WhatsApp visit booking request.
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
                  placeholder="Your Full Name"
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
                <label className="block font-medium text-slate-700 mb-1">Karachi Location / Area</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. North Nazimabad, Gulberg"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">System Capacity</label>
                <input
                  type="text"
                  value={formData.systemCapacity}
                  onChange={(e) => setFormData({ ...formData, systemCapacity: e.target.value })}
                  placeholder="e.g. 5kW / 10kW / 15kW"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">System Architecture</label>
                <select
                  value={formData.systemType}
                  onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Hybrid">Hybrid System (with battery)</option>
                  <option value="On-Grid">On-Grid (Net Metering)</option>
                  <option value="Off-Grid">Off-Grid (Standalone)</option>
                  <option value="Unsure">Unsure / Need Inspection</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Preferred Visit Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Inverter Brand (if known)</label>
                <input
                  type="text"
                  placeholder="e.g. Sungrow, Growatt, Knox, Huawei, Fronus"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Problem Description or Service Request *</label>
              <textarea
                rows={3}
                value={formData.problemDescription}
                onChange={(e) => {
                  setFormData({ ...formData, problemDescription: e.target.value });
                  if (errors.problemDescription) setErrors({ ...errors, problemDescription: '' });
                }}
                placeholder="Describe the issue (e.g. Inverter displaying Error code F05, low power output, battery not charging, routine annual inspection)..."
                className={`w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                  errors.problemDescription ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {errors.problemDescription && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.problemDescription}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Book Maintenance on WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
