import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, IMAGES, createWhatsAppLink } from '../constants/business';
import { ProductItem } from '../types';
import {
  Package, Search, MessageSquare, Check, Shield, Layers,
  Zap, Info, ExternalLink
} from 'lucide-react';

const SUPPLY_ITEMS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Bifacial Dual-Glass Monocrystalline Panels (585W)',
    category: 'Solar Panels',
    specs: '585W N-Type TopCon / Tier-1 Standard / 22.6% Cell Efficiency',
    description: 'High efficiency bifacial modules generating energy from both front and rear albedo sunlight reflections, ideal for Karachi terrace structures.',
    indicativePriceRange: 'Sample Market Rate: Rs. 20,500 - 23,000 / panel',
  },
  {
    id: 'p2',
    name: 'Single & Three-Phase Hybrid Inverters (6kW - 15kW)',
    category: 'Solar Inverters',
    specs: 'Dual MPPT / IP65 Outdoor Casing / Smart App Monitoring / Generator Port',
    description: 'Advanced hybrid inverter architecture supporting simultaneous grid feed, battery backup charging, and solar self-consumption.',
    indicativePriceRange: 'Sample Market Rate: Rs. 280,000 - 450,000',
  },
  {
    id: 'p3',
    name: 'Lithium Iron Phosphate (LiFePO4) Battery Packs (5kWh - 15kWh)',
    category: 'Lithium Batteries',
    specs: '48V / 51.2V Rack or Wall Mount / 6000+ Cycles / Built-in BMS',
    description: 'Modern high-density safe lithium storage modules offering deep depth of discharge and 10+ year design life without toxic fumes.',
    indicativePriceRange: 'Sample Market Rate: Rs. 380,000 - 650,000',
  },
  {
    id: 'p4',
    name: 'Deep Cycle Heavy Tubular Batteries (180Ah - 230Ah)',
    category: 'Tubular Batteries',
    specs: 'Tall Tubular Plate Design / Low Maintenance / Fast Recovery',
    description: 'Cost-effective energy storage solution proven in local Karachi conditions for backup during scheduled load-shedding cycles.',
    indicativePriceRange: 'Sample Market Rate: Rs. 65,000 - 88,000 / unit',
  },
  {
    id: 'p5',
    name: 'Galvanized L2 & L3 Mounting Brackets',
    category: 'Mounting Structures',
    specs: 'Hot-Dip Galvanized Steel / 14-Gauge / Rust Proof / Wind Resistant',
    description: 'Standard and elevated engineered bracket sets with pre-punched slots for fast and rigid roof structural fastening.',
    indicativePriceRange: 'Sample Market Rate: Rs. 14,000 - 28,000 / set',
  },
  {
    id: 'p6',
    name: 'Custom Elevated Rooftop Framing Structures',
    category: 'Mounting Structures',
    specs: 'Heavy Girder Channel / Custom Height 8-12ft / Concrete Pier Anchored',
    description: 'Heavy structural engineering allowing homeowners full utilization of their terrace area beneath the elevated panel canopy.',
    indicativePriceRange: 'Custom Fabrication Quoted per Square Foot',
  },
  {
    id: 'p7',
    name: 'Certified Solar DC Cables (4mm² & 6mm² Tinned Copper)',
    category: 'Cables & Protection',
    specs: 'Double Insulated XLPO / UV Resistant / Flame Retardant / 1500V DC',
    description: 'Ultra-low resistance solar cables designed to withstand extreme sunlight exposure without insulation degradation.',
    indicativePriceRange: 'Sample Market Rate: Rs. 260 - 350 / meter',
  },
  {
    id: 'p8',
    name: 'DC & AC Protection Box with Surge Arresters (SPD)',
    category: 'Cables & Protection',
    specs: 'IP65 Weatherproof DB / Class II Surge Protection / DC 1000V Isolators',
    description: 'Pre-wired electrical safety boxes protecting inverters and property wiring against grid surges and lightning transients.',
    indicativePriceRange: 'Sample Market Rate: Rs. 22,000 - 45,000 / assembled set',
  },
];

export const SolarSupplyPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Solar Panels', 'Solar Inverters', 'Lithium Batteries', 'Tubular Batteries', 'Mounting Structures', 'Cables & Protection'];

  const filteredItems = SUPPLY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAskPrice = (productName: string) => {
    const msg = `Assalam-o-Alaikum SHEIKH SOLAR,
I am interested in pricing and availability for:
*${productName}*

Please share current stock availability, brand models, and quotation for Karachi.`;
    window.open(createWhatsAppLink(msg), '_blank');
  };

  const handleCheckAvailability = (productName: string) => {
    const msg = `Assalam-o-Alaikum SHEIKH SOLAR,
Please confirm current stock availability and delivery timeframe in Karachi for:
*${productName}*`;
    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5">
              <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                Service 04 · Wholesale & Retail Equipment Supply
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight leading-tight">
                Solar Equipment & Electrical Component Supply
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Supply of genuine tier-1 solar panels, on-grid and hybrid inverters, lithium and tubular battery storage, galvanized L2/L3 framing, and electrical protection accessories in Karachi.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={createWhatsAppLink('Assalam-o-Alaikum, I am inquiring about solar equipment supply and bulk availability.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Equipment Enquiry on WhatsApp</span>
                </a>
                <button
                  onClick={() => navigate('/budget-calculator')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#10243A] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>Build Total System Budget</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 lg:h-full min-h-[340px] relative bg-slate-900">
              <img
                src={IMAGES.equipment}
                alt="Solar inverters, batteries, and equipment showcase"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-8 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Equipment Notice:</strong> All product listings and pricing indicators shown below are illustrative sample data for website demonstration purposes. Actual stock, brands, and current Pakistani market rates fluctuate based on import tariffs and currency rates. Please contact SHEIKH SOLAR & ELECTRICAL ENGINEERING directly on WhatsApp to confirm live stock and exact prices.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#10243A] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-700 tracking-wide uppercase block">
                  {prod.category}
                </span>
                <h3 className="font-bold text-sm text-[#10243A] leading-snug">
                  {prod.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                  {prod.specs}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                {prod.indicativePriceRange && (
                  <span className="text-[11px] text-slate-500 block">
                    {prod.indicativePriceRange}
                  </span>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAskPrice(prod.name)}
                    className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask Price</span>
                  </button>
                  <button
                    onClick={() => handleCheckAvailability(prod.name)}
                    className="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    <span>Check Stock</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
