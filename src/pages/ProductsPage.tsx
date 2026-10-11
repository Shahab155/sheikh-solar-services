import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { createWhatsAppLink, BUSINESS_INFO } from '../constants/business';
import { ProductItem } from '../types';
import { Search, MessageSquare, Info, ShieldCheck, ChevronRight, Zap } from 'lucide-react';

const CATALOG: ProductItem[] = [
  // 1. Panels
  {
    id: 'prod-1',
    name: 'Bifacial 585W Monocrystalline PV Module',
    category: 'Solar Panels',
    specs: '585W N-Type TopCon | 144 Cells | Dual Glass | 22.6% Efficiency',
    description: 'Tier-1 bifacial panels producing additional electricity from bottom reflective surfaces. Ideal for high ambient temperature operation in Karachi.',
    indicativePriceRange: 'Indicative: Rs. 21,000 - 23,500 / panel',
  },
  {
    id: 'prod-2',
    name: 'High-Density 550W Mono PERC Half-Cell Panel',
    category: 'Solar Panels',
    specs: '550W Half-Cut | Multi-Busbar (MBB) | Anti-PID',
    description: 'Proven monocrystalline modules suitable for both rooftop residential installations and large commercial arrays.',
    indicativePriceRange: 'Indicative: Rs. 19,500 - 22,000 / panel',
  },
  // 2. Inverters
  {
    id: 'prod-3',
    name: '10 kW Three-Phase Hybrid Solar Inverter',
    category: 'Solar Inverters',
    specs: 'Dual MPPT | 48V/HV Battery Input | IP65 Weatherproof | Smart App',
    description: 'Seamless on-grid and off-grid transfer switch capabilities. Supports net metering while offering zero-transfer-delay battery backup.',
    indicativePriceRange: 'Indicative: Rs. 320,000 - 360,000',
  },
  {
    id: 'prod-4',
    name: '6 kW Single-Phase Hybrid Solar Inverter',
    category: 'Solar Inverters',
    specs: 'Single Phase | Pure Sine Wave | Generator Compatibility | Wi-Fi Kit',
    description: 'Popular residential capacity for Karachi bungalows and single-meter homes running day-time ACs and evening backup loads.',
    indicativePriceRange: 'Indicative: Rs. 240,000 - 275,000',
  },
  {
    id: 'prod-5',
    name: '15 kW Three-Phase On-Grid String Inverter',
    category: 'Solar Inverters',
    specs: '98.6% Max Efficiency | Dual MPPT | Built-in Anti-Islanding Protection',
    description: 'High-efficiency pure grid-tied inverter designed for commercial net metering properties without battery requirements.',
    indicativePriceRange: 'Indicative: Rs. 270,000 - 310,000',
  },
  // 3. Lithium Batteries
  {
    id: 'prod-6',
    name: '10.2 kWh Wall-Mount LiFePO4 Battery Pack',
    category: 'Lithium Batteries',
    specs: '51.2V 200Ah | 6,000+ Cycles @ 80% DoD | Integrated Smart BMS',
    description: 'Modern lithium iron phosphate storage with 10+ year service life, zero toxic fumes, fast 2-hour charging, and smart communication.',
    indicativePriceRange: 'Indicative: Rs. 420,000 - 480,000',
  },
  {
    id: 'prod-7',
    name: '5.12 kWh Modular Lithium Battery Rack',
    category: 'Lithium Batteries',
    specs: '51.2V 100Ah | Parallel Stackable up to 16 Units | Compact Footprint',
    description: 'Modular expansion battery block designed for residential homeowners planning gradual backup capacity scaling.',
    indicativePriceRange: 'Indicative: Rs. 240,000 - 270,000',
  },
  // 4. Tubular Batteries
  {
    id: 'prod-8',
    name: '220Ah Heavy-Duty Tall Tubular Battery',
    category: 'Tubular Batteries',
    specs: '12V 220Ah @ C20 | Deep Cycle Heavy Plates | Low Antimony Alloy',
    description: 'Reliable lead-acid tubular battery tailored for harsh load shedding conditions with robust acid volume and heat endurance.',
    indicativePriceRange: 'Indicative: Rs. 75,000 - 85,000 / unit',
  },
  {
    id: 'prod-9',
    name: '180Ah Deep Cycle Tubular Battery',
    category: 'Tubular Batteries',
    specs: '12V 180Ah | High Thermal Resistance | Electrolyte Level Indicators',
    description: 'Economical energy storage suited for 3kW - 5kW systems for night-time lighting and fan backup.',
    indicativePriceRange: 'Indicative: Rs. 64,000 - 72,000 / unit',
  },
  // 5. Mounting Structures
  {
    id: 'prod-10',
    name: 'Elevated Rooftop Galvanized Steel Framing',
    category: 'Solar Mounting Structures',
    specs: 'Heavy 12/14 Gauge Steel Channels | 8-10ft Clearance | Rust-Resistant',
    description: 'Custom engineered elevated frames preserving complete terrace walking space and rooftop accessibility.',
    indicativePriceRange: 'Quoted per panel or square-foot design',
  },
  {
    id: 'prod-11',
    name: 'Standard L2 / L3 Rooftop Mounting Brackets',
    category: 'Solar Mounting Structures',
    specs: 'Hot-Dip Galvanized | Pre-Slotted Channels | Stainless Hardware',
    description: 'Quick-install mounting hardware for sloped or flat concrete rooftops with optimal solar tilt.',
    indicativePriceRange: 'Indicative: Rs. 15,000 - 28,000 / panel pair set',
  },
  // 6. Protection Accessories
  {
    id: 'prod-12',
    name: 'DC Solar Distribution & Disconnect Box',
    category: 'Electrical Protection Accessories',
    specs: '1000V DC Isolator | 2P DC Breakers | Type 2 Surge Arresters (SPD)',
    description: 'Essential electrical isolation between the rooftop PV array and indoor solar inverter.',
    indicativePriceRange: 'Indicative: Rs. 16,000 - 24,000',
  },
  {
    id: 'prod-13',
    name: 'AC Main Distribution Board with Surge Protection',
    category: 'Electrical Protection Accessories',
    specs: '4-Pole MCCB / MCB | AC Class II SPD | Phase Indication Lights',
    description: 'Safeguards inverter AC outputs and home distribution against utility voltage spikes and grid transients.',
    indicativePriceRange: 'Indicative: Rs. 18,000 - 28,000',
  },
  // 7. Cables & Connectors
  {
    id: 'prod-14',
    name: '4mm² & 6mm² Tinned Copper Solar Cables',
    category: 'Solar Cables & Connectors',
    specs: 'TUV Certified | Halogen Free | 1500V DC Rated | UV Resistant Sheath',
    description: 'High conductivity tinned copper core minimizing resistive power drop across rooftop runs.',
    indicativePriceRange: 'Indicative: Rs. 260 - 340 / meter',
  },
  {
    id: 'prod-15',
    name: 'IP68 Waterproof MC4 Connectors (Pair)',
    category: 'Solar Cables & Connectors',
    specs: '1000V/1500V DC | Flame Retardant PPO Material | Snap-in Lock',
    description: 'Standard weather-sealed connectors ensuring tight electrical contact and zero moisture ingress.',
    indicativePriceRange: 'Indicative: Rs. 400 - 550 / pair',
  },
  // 8. Other Accessories
  {
    id: 'prod-16',
    name: 'Chemical Earthing Pit Kit with Copper Rod & Bentonite Compound',
    category: 'Other Solar Accessories',
    specs: '10ft Pure Copper Bonded Rod | Low Resistivity Earthing Compound',
    description: 'Crucial earthing system required for proper surge suppression and lightning safety compliance.',
    indicativePriceRange: 'Indicative: Rs. 22,000 - 32,000 / complete set',
  },
];

export const ProductsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCat, setSelectedCat] = useState('All');
  const [query, setQuery] = useState('');

  const categories = [
    'All',
    'Solar Panels',
    'Solar Inverters',
    'Lithium Batteries',
    'Tubular Batteries',
    'Solar Mounting Structures',
    'Electrical Protection Accessories',
    'Solar Cables & Connectors',
    'Other Solar Accessories',
  ];

  const filtered = CATALOG.filter((p) => {
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
                       p.specs.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleAskPrice = (productName: string) => {
    const msg = `Assalam-o-Alaikum SHEIKH SOLAR & ELECTRICAL ENGINEERING,
I would like to inquire about current price and availability for:
*${productName}*

Please share current models, warranty specifications, and Karachi delivery details.`;
    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium">Solar Products</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
                Solar Products & Equipment Catalog
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
                Browse solar panels, inverters, batteries, galvanized structures, and electrical accessories available for supply and installation in Karachi.
              </p>
            </div>

            <button
              onClick={() => navigate('/budget-calculator')}
              className="self-start md:self-auto px-4 py-2.5 rounded-lg bg-[#10243A] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              Open Budget Calculator
            </button>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-8 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Catalog Information:</strong> All equipment specifications and indicative rates listed below represent realistic sample equipment configurations for demonstration. Exact pricing, brand stock (e.g. tier-1 models), and availability must be confirmed directly with SHEIKH SOLAR & ELECTRICAL ENGINEERING on WhatsApp.
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCat === c
                    ? 'bg-[#10243A] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow space-y-4"
            >
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                  {prod.category}
                </span>

                <h3 className="font-bold text-sm sm:text-base text-[#10243A] leading-snug">
                  {prod.name}
                </h3>

                <div className="text-[11px] font-medium text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {prod.specs}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                {prod.indicativePriceRange && (
                  <span className="text-[11px] font-medium text-slate-500 block">
                    {prod.indicativePriceRange}
                  </span>
                )}

                <button
                  onClick={() => handleAskPrice(prod.name)}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                  <span>Ask for Price on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
