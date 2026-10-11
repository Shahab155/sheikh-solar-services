import React from 'react';
import { useRouter } from '../utils/router';
import { IMAGES, createWhatsAppLink } from '../constants/business';
import {
  Sun, Wrench, Sparkles, Package, ArrowRight, MessageSquare,
  CheckCircle2, ChevronRight, ShieldCheck
} from 'lucide-react';

export const ServicesOverviewPage: React.FC = () => {
  const { navigate } = useRouter();

  const services = [
    {
      id: 'installation',
      title: 'Solar System Installation',
      path: '/services/installation',
      image: IMAGES.installation,
      tag: 'Service 01 · Engineering',
      desc: 'Turnkey residential and commercial rooftop solar installation with customized structural framing, DC/AC switchgear, and utility net metering compliance.',
      highlights: [
        'Residential, commercial, and industrial rooftop arrays',
        'On-grid, hybrid, and standalone off-grid engineering',
        'Custom elevated galvanized structures for usable terrace space',
        'Multimeter testing, phase sequencing, and commissioning handover',
      ],
      whatsappMsg: 'Assalam-o-Alaikum, I am interested in a solar installation. Please guide me about system options and pricing.',
    },
    {
      id: 'maintenance',
      title: 'Solar System Maintenance',
      path: '/services/maintenance',
      image: IMAGES.maintenance,
      tag: 'Service 02 · Electrical Diagnostics',
      desc: 'Routine inspection, inverter troubleshooting, electrical circuit testing, and preventative maintenance across Karachi.',
      highlights: [
        'Inverter error code diagnostics & firmware checks',
        'DC & AC circuit breaker and thermal scan inspection',
        'Lithium BMS cell balancing and tubular battery gravity tests',
        'Mounting bolt torque and earthing pit resistance verification',
      ],
      whatsappMsg: 'Assalam-o-Alaikum, I need solar system maintenance. Please contact me regarding availability and charges.',
    },
    {
      id: 'cleaning',
      title: 'Solar Panel Cleaning',
      path: '/services/cleaning',
      image: IMAGES.cleaning,
      tag: 'Service 03 · Efficiency Restoration',
      desc: 'Professional non-abrasive panel washing using soft telescopic water-fed brushes to remove urban dust, grime, and environmental residue.',
      highlights: [
        'Pure water and scratch-free soft bristle cleaning',
        'Restores sunlight absorption lost to heavy Karachi dust',
        'Visual inspection for micro-cracks and loose clamps included',
        'Safe professional crew with certified rooftop safety harnesses',
      ],
      whatsappMsg: 'Assalam-o-Alaikum, I am interested in solar panel cleaning services. Please share the details.',
    },
    {
      id: 'supply',
      title: 'Solar Equipment Supply',
      path: '/services/supply',
      image: IMAGES.equipment,
      tag: 'Service 04 · Equipment Supply',
      desc: 'Supply of tier-1 monocrystalline panels, on-grid and hybrid inverters, lithium battery banks, galvanized L2/L3 brackets, and electrical switchgear.',
      highlights: [
        'Tier-1 monocrystalline bifacial panels (585W+)',
        'Single-phase and three-phase hybrid inverters',
        'Lithium LiFePO4 and heavy-duty tubular batteries',
        'Certified solar DC cables, SPDs, breakers, and earthing kits',
      ],
      whatsappMsg: 'Assalam-o-Alaikum, I am inquiring about solar equipment supply and bulk availability.',
    },
  ];

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium">Services</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Our Solar Energy Services in Karachi
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            From initial site survey and precision structural engineering to ongoing maintenance and specialized panel washing, explore our core service offerings.
          </p>
        </div>

        {/* 4 Large Service Cards */}
        <div className="space-y-8 mb-16">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center"
              >
                <div
                  className={`lg:col-span-6 p-6 sm:p-10 space-y-4 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                    {service.tag}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">
                    {service.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="space-y-2 py-2">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate(service.path)}
                      className="px-4 py-2.5 bg-[#10243A] hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href={createWhatsAppLink(service.whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20" />
                      <span>WhatsApp Enquiry</span>
                    </a>
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 h-64 sm:h-80 lg:h-full min-h-[300px] relative bg-slate-900 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Budget Link Banner */}
        <div className="bg-[#10243A] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold">
              Looking to estimate your solar investment?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Use our interactive Solar Installation Budget Calculator to configure panels, inverters, battery storage, and accessories in Pakistani Rupees.
            </p>
          </div>
          <button
            onClick={() => navigate('/budget-calculator')}
            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            Open Budget Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
