import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { ProjectItem } from '../types';
import { IMAGES, createWhatsAppLink } from '../constants/business';
import {
  X, ExternalLink, Filter, MapPin, Maximize2, Info, MessageSquare, ChevronRight
} from 'lucide-react';

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Residential Rooftop 10.5 kW Hybrid System',
    category: 'Residential Rooftop',
    capacity: '10.5 kW PV Array',
    location: 'North Nazimabad, Karachi (Sample Case)',
    description: '18 high-efficiency monocrystalline bifacial panels coupled with a 10 kW hybrid inverter and 10.2 kWh lithium storage. Designed for round-the-clock power reliability.',
    image: IMAGES.hero,
  },
  {
    id: 'proj-2',
    title: 'Elevated Rooftop Structure with Usable Terrace',
    category: 'Elevated Structure',
    capacity: '8.2 kW PV Array',
    location: 'Gulshan-e-Iqbal, Karachi (Sample Case)',
    description: 'Custom 9-foot elevated galvanized steel framing erected on a residential rooftop terrace, providing complete walking clearance beneath the panels.',
    image: IMAGES.installation,
  },
  {
    id: 'proj-3',
    title: 'Commercial 35 kW Rooftop Solar Installation',
    category: 'Commercial Installation',
    capacity: '35 kW Three-Phase Array',
    location: 'Federal B Area / Industrial Zone (Sample Case)',
    description: 'Commercial rooftop system synchronized with grid electricity to power daytime HVAC, machinery, and commercial lighting loads.',
    image: IMAGES.hero,
  },
  {
    id: 'proj-4',
    title: 'Hybrid System with Wall-Mounted Lithium Battery',
    category: 'Hybrid Installation',
    capacity: '6.5 kW Hybrid Solar',
    location: 'DHA Phase 6, Karachi (Sample Case)',
    description: 'Compact residential hybrid setup featuring dual MPPT inverter and high-cycle lithium battery storage mounted inside an electrical utility room.',
    image: IMAGES.maintenance,
  },
  {
    id: 'proj-5',
    title: 'De-ionized Water Washing & Panel Maintenance',
    category: 'Solar Panel Cleaning',
    capacity: '24 Panels Serviced',
    location: 'Block M, North Nazimabad (Sample Case)',
    description: 'Scheduled surface cleaning of dusty rooftop solar modules using soft telescopic water-fed brushes to restore peak daytime electrical generation.',
    image: IMAGES.cleaning,
  },
  {
    id: 'proj-6',
    title: 'Three-Phase Inverter & DB Protection Assembly',
    category: 'Equipment Installation',
    capacity: '15 kW Inverter & Switchgear',
    location: 'Commercial Building, Karachi (Sample Case)',
    description: 'Clean industrial installation of AC/DC surge protective breakers, MCCBs, changeover switches, and multi-string conduits.',
    image: IMAGES.equipment,
  },
];

export const ProjectsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState<ProjectItem | null>(null);

  const filters = [
    'All',
    'Residential Rooftop',
    'Commercial Installation',
    'Elevated Structure',
    'Hybrid Installation',
    'Solar Panel Cleaning',
    'Equipment Installation',
  ];

  const filteredProjects = SAMPLE_PROJECTS.filter(
    (p) => activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium">Projects Gallery</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
                Illustrative Project Gallery
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
                Explore representative types of residential, commercial, elevated, and hybrid solar installations and cleaning maintenance in Karachi.
              </p>
            </div>

            <button
              onClick={() => navigate('/budget-calculator')}
              className="self-start md:self-auto px-4 py-2.5 rounded-lg bg-[#10243A] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              Calculate Your Project Budget
            </button>
          </div>
        </div>

        {/* Clear Mandatory Disclaimer */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-8 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Demo Presentation Notice:</strong> The photographs and system scenarios displayed in this gallery represent illustrative examples and reference configurations to demonstrate installation types, elevated structural designs, and cleaning practices. They do not constitute verified completed client projects by SHEIKH SOLAR & ELECTRICAL ENGINEERING.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#10243A] text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              <div
                className="relative h-56 bg-slate-900 cursor-pointer overflow-hidden"
                onClick={() => setActiveLightbox(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-md hover:bg-black/80 transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="text-[11px] font-semibold text-white bg-emerald-700/90 px-2 py-0.5 rounded backdrop-blur-xs">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-[#10243A] group-hover:text-emerald-700 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    {project.capacity}
                  </span>
                  <a
                    href={createWhatsAppLink(`Assalam-o-Alaikum, I am inquiring about a project similar to "${project.title}".`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    <span>Enquire Like This</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveLightbox(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-72 sm:h-96 bg-slate-900">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase">
                    {activeLightbox.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {activeLightbox.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#10243A]">
                  {activeLightbox.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeLightbox.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={createWhatsAppLink(`Assalam-o-Alaikum, I am interested in a system configuration similar to: ${activeLightbox.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/20" />
                    <span>Inquire About This Setup on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setActiveLightbox(null);
                      navigate('/budget-calculator');
                    }}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Open Budget Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
