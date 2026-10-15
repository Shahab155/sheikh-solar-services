import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, IMAGES, createWhatsAppLink, formatPKR } from '../constants/business';
import {
  Sun, Wrench, Sparkles, Package, ArrowRight, MessageSquare, CheckCircle2,
  ChevronDown, ChevronUp, ShieldCheck, Zap, Layers, Calculator, Building,
  Home, Factory, Battery, HelpCircle, Phone, Maximize2, ExternalLink
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');
  const [previewLightbox, setPreviewLightbox] = useState<string | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const services = [
    {
      title: 'Solar System Installation',
      path: '/services/installation',
      image: IMAGES.installation,
      desc: 'Turnkey residential, commercial, and industrial rooftop installations tailored for Karachi properties.',
      highlights: ['Custom elevated framing', 'On-grid, hybrid & off-grid', 'Multimeter testing & commissioning'],
      whatsappMsg: 'Assalam-o-Alaikum, I am interested in a solar installation. Please guide me about system options and pricing.',
    },
    {
      title: 'Solar System Maintenance',
      path: '/services/maintenance',
      image: IMAGES.maintenance,
      desc: 'Preventative inspection, inverter diagnostics, thermal breaker scans, and performance fault isolation.',
      highlights: ['Inverter code diagnosis', 'Breaker & wiring audit', 'Battery bank balancing'],
      whatsappMsg: 'Assalam-o-Alaikum, I need solar system maintenance. Please contact me regarding availability and charges.',
    },
    {
      title: 'Solar Panel Cleaning',
      path: '/services/cleaning',
      image: IMAGES.cleaning,
      desc: 'Restorative surface cleaning with de-ionized water and specialized non-abrasive soft brushes.',
      highlights: ['Removes Karachi grime & dust', 'Scratch-free telescopic wash', 'Visual clamp & glass check'],
      whatsappMsg: 'Assalam-o-Alaikum, I am interested in solar panel cleaning services. Please share the details.',
    },
    {
      title: 'Solar Equipment Supply',
      path: '/services/supply',
      image: IMAGES.equipment,
      desc: 'Supply of tier-1 monocrystalline panels, hybrid inverters, lithium batteries, and galvanized brackets.',
      highlights: ['585W+ bifacial panels', 'Hybrid & on-grid inverters', 'DC/AC breakers & cables'],
      whatsappMsg: 'Assalam-o-Alaikum, I am inquiring about solar equipment supply and bulk availability.',
    },
  ];

  const faqs = [
    {
      q: 'Which solar system is suitable for my home?',
      a: 'The ideal system depends on your goals and daytime load profile. If your area experiences load shedding and you require uninterrupted electricity for ACs, fans, and refrigeration, a Hybrid Solar System with battery storage is recommended. If your primary objective is reducing your utility bill and your grid connection rarely drops, an On-Grid Net Metering system offers a lower initial investment.',
    },
    {
      q: 'What is the difference between on-grid and hybrid systems?',
      a: 'On-grid systems synchronize directly with utility lines and export excess power back via net metering. However, for line worker safety, standard on-grid inverters immediately shut down during utility power cuts. Hybrid systems combine grid synchronization with dedicated battery storage and an automatic transfer switch, powering essential circuits during outages.',
    },
    {
      q: 'Do I need batteries?',
      a: 'Batteries are only required if you want electricity during grid outages or desire nighttime solar self-consumption. For pure on-grid net metering setups, batteries can be omitted, which significantly reduces the initial installation budget.',
    },
    {
      q: 'How can I estimate my installation budget?',
      a: 'You can use our interactive Solar Installation Budget Calculator on this website. It allows you to select system capacity, inverter type, battery quantity, elevated framing, and customized electrical accessories with live PKR calculations.',
    },
    {
      q: 'How often should solar panels be cleaned?',
      a: 'In urban Karachi environments where dust, vehicle exhaust, and construction particles settle on glass surfaces, cleaning every 3 to 5 weeks during dry weather is recommended. Routine cleaning prevents light obstruction that can diminish power generation by 15% to 30%.',
    },
    {
      q: 'What does solar system maintenance include?',
      a: 'Maintenance includes testing DC string voltages, reading inverter error history, thermal camera scanning for loose breaker terminals, tightening structural mounting bolts, verifying battery cycle health, and testing earthing pit resistance.',
    },
    {
      q: 'Can I request a site survey?',
      a: 'Yes. SHEIKH SOLAR & ELECTRICAL ENGINEERING provides site evaluations across Karachi to examine roof orientation, structural viability, shadow casting from water tanks or taller structures, and electrical main distribution boards.',
    },
    {
      q: 'How can I obtain an exact quotation?',
      a: 'You can build an initial estimate using our online Budget Calculator and click "Send Estimate to WhatsApp", or message us directly with your property location and average monthly electricity bill to schedule a site review.',
    },
  ];

  const featuredProducts = [
    { name: 'Bifacial 585W Monocrystalline PV Panel', category: 'Solar Panels', specs: 'N-Type TopCon / Tier-1 Standard', price: 'Sample Rate: Rs. 21,500' },
    { name: '10 kW Hybrid Three-Phase Inverter', category: 'Inverters', specs: 'Dual MPPT / IP65 / Smart Wi-Fi', price: 'Sample Rate: Rs. 320,000' },
    { name: '10.2 kWh LiFePO4 Lithium Battery Rack', category: 'Lithium Storage', specs: '51.2V 200Ah / 6000+ Cycles', price: 'Sample Rate: Rs. 420,000' },
    { name: 'Galvanized L2 & L3 Mounting Brackets', category: 'Framing', specs: 'Hot-Dip Galvanized / 14-Gauge', price: 'Sample Rate: Rs. 14,000 / pair' },
  ];

  const galleryItems = [
    { title: 'Elevated Rooftop Structure', cat: 'Elevated Structure', image: IMAGES.installation },
    { title: 'Residential 10 kW Hybrid System', cat: 'Residential Rooftop', image: IMAGES.hero },
    { title: 'Inverter & DB Diagnostic Service', cat: 'Maintenance', image: IMAGES.maintenance },
    { title: 'Telescopic Water-Fed Panel Wash', cat: 'Cleaning', image: IMAGES.cleaning },
  ];

  return (
    <div className="bg-white">
      {/* SECTION A: HERO SECTION */}
      <section className="relative min-h-[680px] overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-950/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-28 lg:py-32">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-slate-950/45 px-3 py-1 text-xs font-semibold text-emerald-200">
              {/* <Sun className="w-3.5 h-3.5 text-amber-400" /> */}
              {/* <span>Solar Solutions for Homes & Businesses in Karachi</span> */}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Power Your Home. <br />
              <span className="text-amber-400">Reduce Your Energy Costs.</span>
            </h1>

            <p className="text-slate-100 text-sm sm:text-base max-w-xl leading-relaxed">
              Explore solar installation, maintenance, panel cleaning, and quality solar equipment for residential and commercial needs in Karachi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate('/budget-calculator')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#10243A] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Installation Budget</span>
              </button>

              <a
                href={createWhatsAppLink('Assalam-o-Alaikum, I visited your website and would like to chat about solar system options for my Karachi home.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-white/30 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-100">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>North Nazimabad, Karachi Based</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Custom Elevated Structures</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>On-Grid & Hybrid Configurations</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: SERVICES OVERVIEW */}
      <section className="py-16 sm:py-24 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Our Professional Solar Services
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Comprehensive solar engineering solutions tailored for homes, commercial establishments, and industrial premises in Karachi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-[#10243A] group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => navigate(item.path)}
                    className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={createWhatsAppLink(item.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: SOLAR SYSTEM TYPES & COMPARISON TABLE */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Architecture Guide
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Understanding Solar System Types
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Choosing the right system design depends on your grid stability, backup needs, and capital budget.
            </p>
          </div>

          {/* 3 Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#F4F7FA] rounded-xl p-6 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Option 01</span>
              <h3 className="text-xl font-bold text-[#10243A]">On-Grid Solar System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designed to work with the utility grid, subject to applicable system and safety requirements. Excess electricity can be fed into the grid through net metering.
              </p>
              <div className="p-3 bg-white rounded-lg text-xs border border-slate-200 text-slate-700">
                <strong className="text-slate-900 block mb-0.5">Key Characteristic:</strong>
                Lowest upfront cost without batteries. Shuts down during power outages to protect utility lines (anti-islanding).
              </div>
            </div>

            <div className="bg-[#F4F7FA] rounded-xl p-6 border border-emerald-300 shadow-2xs space-y-3 relative">
              <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                Most Popular
              </div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Option 02</span>
              <h3 className="text-xl font-bold text-[#10243A]">Hybrid Solar System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Combines grid-connected solar with battery storage when configured appropriately. Supplies emergency loads seamlessly during grid outages while exporting daytime surplus.
              </p>
              <div className="p-3 bg-white rounded-lg text-xs border border-slate-200 text-slate-700">
                <strong className="text-slate-900 block mb-0.5">Key Characteristic:</strong>
                Provides uninterrupted backup for lights, fans, refrigerators, and ACs during local load shedding.
              </div>
            </div>

            <div className="bg-[#F4F7FA] rounded-xl p-6 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Option 03</span>
              <h3 className="text-xl font-bold text-[#10243A]">Off-Grid Solar System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designed to operate independently of the utility grid with suitable energy storage and system sizing. Suited for remote farms, standalone houses, or sites without grid connectivity.
              </p>
              <div className="p-3 bg-white rounded-lg text-xs border border-slate-200 text-slate-700">
                <strong className="text-slate-900 block mb-0.5">Key Characteristic:</strong>
                Requires large battery capacity and generator integration to guarantee reliable 24/7 power.
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h4 className="font-bold text-sm text-[#10243A]">System Comparison Matrix</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Feature / Parameter</th>
                    <th className="py-3 px-4 font-semibold">On-Grid Solar</th>
                    <th className="py-3 px-4 font-semibold">Hybrid Solar</th>
                    <th className="py-3 px-4 font-semibold">Off-Grid Solar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Utility Grid Connection</td>
                    <td className="py-3 px-4 text-emerald-700 font-medium">Required</td>
                    <td className="py-3 px-4 text-emerald-700 font-medium">Connected (Grid + Battery)</td>
                    <td className="py-3 px-4 text-slate-500">Not Connected (Independent)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Operation During Outages</td>
                    <td className="py-3 px-4 text-rose-600 font-medium">Shuts off (Safety Protocol)</td>
                    <td className="py-3 px-4 text-emerald-700 font-medium">Automatic Backup Active</td>
                    <td className="py-3 px-4 text-emerald-700 font-medium">Operates from Batteries</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Battery Requirement</td>
                    <td className="py-3 px-4">None required</td>
                    <td className="py-3 px-4">Optional or Recommended (Lithium / Tubular)</td>
                    <td className="py-3 px-4">Mandatory (Sized for continuous runtime)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Net Metering Eligibility</td>
                    <td className="py-3 px-4">Subject to local regulations</td>
                    <td className="py-3 px-4">Subject to local regulations</td>
                    <td className="py-3 px-4">Not applicable</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Capital Investment Level</td>
                    <td className="py-3 px-4">Economical initial cost</td>
                    <td className="py-3 px-4">Moderate (Inverter + Batteries)</td>
                    <td className="py-3 px-4">Higher (Substantial storage capacity)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: RESIDENTIAL, COMMERCIAL & INDUSTRIAL SOLUTIONS */}
      <section className="py-16 sm:py-24 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Sector Specializations
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Tailored Engineering for Every Property
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From residential bungalows requiring elevated rooftop recreation space to commercial three-phase loads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#10243A]">Residential Solar Solutions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tailored for houses, bungalows, and apartment terraces across Karachi. Designed to balance daytime air-conditioning demands with evening battery backup needs.
                </p>
                <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Typical 5kW to 15kW installations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Usable terrace elevated structures</li>
                </ul>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I am inquiring about residential solar options for my house in Karachi.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                  <span>Enquire Residential</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#10243A]">Commercial Solar Solutions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered for commercial offices, clinics, schools, and retail outlets operating heavily during sunlit peak billing hours.
                </p>
                <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 15kW to 50kW commercial setups</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Three-phase grid integration</li>
                </ul>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I would like to inquire about commercial solar solutions for our business premises.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                  <span>Enquire Commercial</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#10243A]">Industrial Solar Solutions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Large-scale solar arrays on factory roofs and industrial warehouses to stabilize operational overhead and offset rising electricity tariffs.
                </p>
                <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> High capacity shed mounting</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Diesel generator synchronization</li>
                </ul>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I am interested in an industrial solar feasibility assessment for our facility in Karachi.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                  <span>Enquire Industrial</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: WHY CONSIDER SOLAR? */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Practical Advantages
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Why Consider Solar Energy?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Realistic, responsible reasons why households and commercial operations invest in photovoltaic engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-[#10243A]">Better Visibility Into Energy Costs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                By generating your own electricity during sunny hours, you gain greater control and predictability over your monthly utility billing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-[#10243A]">Reduced Dependence on Grid Electricity</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Whenever solar irradiance is available, your electrical loads draw power directly from the sun, minimizing reliance on the utility company.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-[#10243A]">Potential Long-Term Energy Savings</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                While equipment requires an initial capital outlay, solar modules continue generating clean electricity over their multi-decade design lifespan.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-[#10243A]">Flexible System Sizing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Systems can start from a compact 3 kW or 5 kW setup and expand gradually as electrical demands and budget evolve over time.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-[#10243A]">Optional Battery Backup</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configuring lithium or tubular energy storage enables continuous power for vital loads during unexpected or scheduled load shedding.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-[#10243A]">Ongoing Maintenance & Cleaning</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern solar systems have no moving engine parts. Periodic surface cleaning and electrical inspections keep performance optimized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: FEATURED SOLAR PRODUCTS PREVIEW */}
      <section className="py-16 sm:py-24 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                Equipment Supply
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                Featured Solar Equipment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Sample equipment models available for supply and turnkey installation in Karachi.
              </p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
            >
              <span>View Full Product Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">{p.category}</span>
                  <h3 className="font-bold text-sm text-[#10243A]">{p.name}</h3>
                  <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded">{p.specs}</p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 block">{p.price}</span>
                  <a
                    href={createWhatsAppLink(`Assalam-o-Alaikum, I am inquiring about price and availability for: ${p.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                    <span>Ask for Price</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: BUDGET CALCULATOR PREVIEW */}
      <section className="py-16 sm:py-24 bg-[#10243A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-slate-900 to-[#10243A] rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Interactive Budget Tool
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Plan Your Solar Installation Budget
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Estimate the cost of your solar system by selecting components, quantities, and installation requirements with real-time arithmetic, printable estimates, and instant WhatsApp export.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate('/budget-calculator')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Open Budget Calculator</span>
                  </button>

                  <button
                    onClick={() => navigate('/solar-estimator')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-colors border border-slate-700 cursor-pointer"
                  >
                    <span>Quick System Sizing Estimator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-800/80 p-6 rounded-xl border border-slate-700 text-xs space-y-3">
                <span className="text-amber-400 font-bold block text-sm">Calculator Features:</span>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">✓ Real-time PKR arithmetic</li>
                  <li className="flex items-center gap-2">✓ Custom accessories & breakers</li>
                  <li className="flex items-center gap-2">✓ Optional battery configurations</li>
                  <li className="flex items-center gap-2">✓ Print/PDF & CSV data download</li>
                  <li className="flex items-center gap-2">✓ Direct itemized WhatsApp quote</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: RECENT PROJECTS / ILLUSTRATIVE GALLERY PREVIEW */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                Portfolio Preview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                Illustrative Project Gallery
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Representative examples of residential rooftops, elevated structures, and cleaning maintenance in Karachi.
              </p>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-sm transition-all group cursor-pointer"
                onClick={() => setPreviewLightbox(item.image)}
              >
                <div className="h-48 relative overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.cat}</span>
                  <h3 className="font-bold text-sm text-[#10243A]">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <span className="text-[11px] text-slate-500">
              Note: Gallery content is illustrative demonstration material to demonstrate system types and elevated framing.
            </span>
          </div>
        </div>

        {/* Lightbox preview modal */}
        {previewLightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setPreviewLightbox(null)}
          >
            <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden">
              <img src={previewLightbox} alt="Solar showcase" className="w-full h-auto max-h-[80vh] object-cover" />
              <div className="p-4 text-center">
                <button
                  onClick={() => setPreviewLightbox(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION I: HOW IT WORKS */}
      <section className="py-16 sm:py-24 bg-[#F4F7FA] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Clear Roadmap
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From your initial inquiry to final handover, our process is straightforward and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3 relative">
              <span className="text-xs font-extrabold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">01</span>
              <h3 className="font-bold text-base text-[#10243A]">Share Your Requirements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your property location in Karachi, your monthly electricity bill, or your preferred system capacity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3 relative">
              <span className="text-xs font-extrabold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">02</span>
              <h3 className="font-bold text-base text-[#10243A]">Discuss System Options</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We review on-grid vs hybrid configurations, elevated framing needs, and battery choices suited for your roof.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3 relative">
              <span className="text-xs font-extrabold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">03</span>
              <h3 className="font-bold text-base text-[#10243A]">Confirm Your Quotation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an itemized equipment and labour breakdown with transparent pricing and component specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3 relative">
              <span className="text-xs font-extrabold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">04</span>
              <h3 className="font-bold text-base text-[#10243A]">Schedule Installation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our technicians execute structure fabrication, wiring, multimeter testing, and complete system commissioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION J: FAQ */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Practical and technically grounded answers to common solar questions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#10243A] flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION K: FINAL CTA */}
      <section className="py-16 sm:py-20 bg-[#10243A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Take The Next Step
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Explore Solar for Your Property?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Build your estimated equipment and labour budget right now, or message our team directly on WhatsApp to discuss your Karachi property.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/budget-calculator')}
              className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
            >
              Calculate My Budget
            </button>

            <a
              href={createWhatsAppLink('Assalam-o-Alaikum, I am ready to discuss solar installation for my property in Karachi.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Contact Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
