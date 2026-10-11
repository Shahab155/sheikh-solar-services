import React, { useState } from 'react';
import { useRouter } from '../utils/router';
import { BUSINESS_INFO, createWhatsAppLink, formatPKR } from '../constants/business';
import { Zap, Sun, Info, ArrowRight, MessageSquare, CheckCircle, Calculator } from 'lucide-react';

export const SolarEstimatorPage: React.FC = () => {
  const { navigate } = useRouter();
  const [monthlyBill, setMonthlyBill] = useState<number | ''>(55000);
  const [dailyUnits, setDailyUnits] = useState<number | ''>('');
  const [propertyType, setPropertyType] = useState('residential');
  const [backupRequirement, setBackupRequirement] = useState('essential'); // minimal, essential, heavy

  // Karachi approximate electricity tariff calculation (around Rs. 50-65 per unit average with taxes and surcharges in recent tiers)
  const averageUnitRate = propertyType === 'commercial' ? 68 : 55;

  const estimatedMonthlyUnits = typeof monthlyBill === 'number' && monthlyBill > 0
    ? Math.round(monthlyBill / averageUnitRate)
    : (typeof dailyUnits === 'number' ? dailyUnits * 30 : 0);

  // In Karachi, 1 kW solar array generates approx 3.8 - 4.3 units (kWh) per day on average throughout the year (approx 120 units/month per kW)
  const estimatedKwNeeded = estimatedMonthlyUnits > 0
    ? Math.max(3, Math.round((estimatedMonthlyUnits / 120) * 10) / 10)
    : 0;

  const getSystemRecommendation = (kw: number) => {
    if (kw <= 0) return null;
    if (kw <= 4) {
      return {
        label: 'Small Domestic Array (3 - 5 kW)',
        panels: '6 to 9 Bifacial Panels (585W)',
        inverter: '5 kW On-Grid or Hybrid Inverter',
        battery: backupRequirement === 'none' ? 'No battery needed' : '1x 200Ah Tubular or 5kWh Lithium',
        roofArea: 'Approx 220 - 350 sq ft',
        typicalLoads: 'Fans, LED lights, refrigerators, 1 inverter AC during daytime',
      };
    }
    if (kw <= 8) {
      return {
        label: 'Medium Residential System (6 - 8 kW)',
        panels: '11 to 14 Bifacial Panels (585W)',
        inverter: '6 kW to 8 kW Hybrid / On-Grid Inverter',
        battery: backupRequirement === 'none' ? 'No battery' : '10kWh Lithium Battery or 2x Tubular units',
        roofArea: 'Approx 420 - 550 sq ft',
        typicalLoads: '2 inverter ACs, refrigerator, deep freezer, water motor, lighting & fans',
      };
    }
    if (kw <= 15) {
      return {
        label: 'Large Domestic / Commercial (10 - 15 kW)',
        panels: '18 to 26 Bifacial Panels (585W)',
        inverter: '10 kW to 15 kW Three-Phase Inverter',
        battery: backupRequirement === 'none' ? 'No battery' : '10kWh to 15kWh LiFePO4 rack battery',
        roofArea: 'Approx 700 - 1,100 sq ft',
        typicalLoads: '3-4 inverter ACs, water pumps, domestic / commercial equipment',
      };
    }
    return {
      label: 'Commercial & Industrial Sizing (18 kW+)',
      panels: '32+ High-Efficiency Solar Panels',
      inverter: '20 kW to 50 kW Industrial Three-Phase Inverter',
      battery: backupRequirement === 'none' ? 'Net-metered without battery' : 'Modular Lithium battery bank',
      roofArea: '1,400+ sq ft roof or warehouse canopy',
      typicalLoads: 'Commercial machinery, multi-zone HVAC, continuous commercial loads',
    };
  };

  const recommendation = getSystemRecommendation(estimatedKwNeeded);

  const getWhatsAppMessage = () => {
    return `Assalam-o-Alaikum SHEIKH SOLAR,
I checked your Solar Sizing Estimator with the following details:
• Property: ${propertyType.toUpperCase()}
• Monthly Electricity Bill: ${typeof monthlyBill === 'number' ? formatPKR(monthlyBill) : 'Not specified'}
• Estimated Monthly Units: ~${estimatedMonthlyUnits} kWh
• Preliminary Sizing Result: ~${estimatedKwNeeded} kW system
• Backup Requirement: ${backupRequirement}

Please advise if this system size suits my roof space in Karachi.`;
  };

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-1 block">
            System Sizing Tool
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Solar Requirement Estimator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Enter your average monthly electricity bill to calculate an approximate solar system capacity tailored for Karachi properties.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Bill input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Average Monthly Electricity Bill (PKR)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-semibold text-slate-400">
                  Rs.
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 tabular-nums"
                  placeholder="e.g. 50000"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1.5 block">
                Based on current residential/commercial electricity tariff schedules
              </span>
            </div>

            {/* Daily Units */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Estimated Daily Units (kWh) (Optional)
              </label>
              <input
                type="number"
                min="0"
                value={dailyUnits}
                onChange={(e) => setDailyUnits(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 tabular-nums"
                placeholder="e.g. 25-40 units"
              />
              <span className="text-[11px] text-slate-500 mt-1.5 block">
                Leave empty to deduce automatically from bill
              </span>
            </div>

            {/* Property type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Property Category
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="residential">Residential House / Bungalow / Terrace</option>
                <option value="apartment">Apartment / Penthouse Roof</option>
                <option value="commercial">Commercial Office / Retail / School</option>
                <option value="industrial">Industrial Unit / Warehouse</option>
              </select>
            </div>

            {/* Backup requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Backup Requirement During Outages
              </label>
              <select
                value={backupRequirement}
                onChange={(e) => setBackupRequirement(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="none">Net Metering Only (No battery storage)</option>
                <option value="essential">Essential Load Backup (Fans, Lights, Fridge, Wi-Fi)</option>
                <option value="heavy">Heavy Backup (ACs, Water Pumps, Complete Load)</option>
              </select>
            </div>
          </div>

          {/* Results section */}
          {estimatedKwNeeded > 0 && recommendation && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="bg-[#10243A] text-white rounded-xl p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                      Preliminary Sizing Suggestion
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      Recommended System: ~{estimatedKwNeeded.toFixed(1)} kW
                    </h2>
                  </div>
                  <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 text-right">
                    <span className="text-[11px] text-slate-400 block">Est. Monthly Consumption</span>
                    <span className="text-base font-bold text-emerald-400 tabular-nums">
                      ~{estimatedMonthlyUnits} units (kWh)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 py-3 border-y border-slate-800 my-4">
                  <div>
                    <span className="text-slate-400 font-medium block">Array Configuration:</span>
                    <span className="text-white font-semibold">{recommendation.panels}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Inverter Sizing:</span>
                    <span className="text-white font-semibold">{recommendation.inverter}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Battery Provision:</span>
                    <span className="text-white font-semibold">{recommendation.battery}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Roof Area Needed:</span>
                    <span className="text-white font-semibold">{recommendation.roofArea}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 mb-5">
                  <span className="text-slate-400 font-medium block mb-1">Indicative Day-Time Loads Handled:</span>
                  <p>{recommendation.typicalLoads}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => navigate('/budget-calculator')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Open Budget Calculator With This Size</span>
                  </button>
                  <a
                    href={createWhatsAppLink(getWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/20" />
                    <span>Discuss Sizing on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Engineering Notice:</strong> This sizing tool provides a preliminary estimate based on average solar generation patterns in Karachi and estimated electricity unit tariffs. Actual energy output depends on rooftop orientation, tilt angle, shading from water tanks or neighboring buildings, and consumer peak load timing. A formal site survey by SHEIKH SOLAR & ELECTRICAL ENGINEERING is recommended prior to equipment procurement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
