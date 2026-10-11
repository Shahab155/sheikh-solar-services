import React, { useMemo, useState } from 'react';
import { createWhatsAppLink, formatPKR } from '../constants/business';
import { ArrowRight, Calculator, CheckCircle2, Info, MessageSquare, Minus, Plus, Sun, Zap } from 'lucide-react';

type Appliance = {
  id: string;
  name: string;
  watts: number;
  hours: number;
};

type ApplianceCategory = {
  name: string;
  appliances: Appliance[];
};

const APPLIANCE_CATEGORIES: ApplianceCategory[] = [
  {
    name: 'Cooling & Fans',
    appliances: [
      { id: 'ceiling-fan', name: 'Ceiling fan', watts: 75, hours: 12 },
      { id: 'pedestal-fan', name: 'Pedestal / bracket fan', watts: 65, hours: 8 },
      { id: 'exhaust-fan', name: 'Exhaust fan', watts: 40, hours: 4 },
      { id: 'ac-1-ton', name: '1 ton inverter AC', watts: 1200, hours: 6 },
      { id: 'ac-1-5-ton', name: '1.5 ton inverter AC', watts: 1600, hours: 6 },
      { id: 'ac-2-ton', name: '2 ton inverter AC', watts: 2200, hours: 6 },
      { id: 'ac-normal', name: '1.5 ton conventional AC', watts: 2000, hours: 5 },
      { id: 'air-cooler', name: 'Air cooler', watts: 180, hours: 8 },
    ],
  },
  {
    name: 'Lighting',
    appliances: [
      { id: 'led-bulb', name: 'LED bulb (9W)', watts: 9, hours: 6 },
      { id: 'led-tube', name: 'LED tube light (20W)', watts: 20, hours: 6 },
      { id: 'outdoor-light', name: 'Outdoor light', watts: 30, hours: 10 },
    ],
  },
  {
    name: 'Kitchen & Laundry',
    appliances: [
      { id: 'refrigerator', name: 'Refrigerator', watts: 200, hours: 12 },
      { id: 'deep-freezer', name: 'Deep freezer', watts: 250, hours: 12 },
      { id: 'washing-machine', name: 'Washing machine', watts: 500, hours: 1 },
      { id: 'microwave', name: 'Microwave oven', watts: 1200, hours: 0.5 },
      { id: 'water-dispenser', name: 'Water dispenser', watts: 300, hours: 6 },
      { id: 'electric-kettle', name: 'Electric kettle', watts: 1500, hours: 0.5 },
    ],
  },
  {
    name: 'Utility & Electronics',
    appliances: [
      { id: 'water-pump', name: 'Water pump (1 HP)', watts: 750, hours: 1 },
      { id: 'television', name: 'LED television', watts: 100, hours: 5 },
      { id: 'desktop', name: 'Desktop computer', watts: 250, hours: 4 },
      { id: 'laptop', name: 'Laptop', watts: 65, hours: 6 },
      { id: 'wifi', name: 'Wi-Fi router', watts: 15, hours: 24 },
      { id: 'iron', name: 'Electric iron', watts: 1000, hours: 1 },
    ],
  },
];

const CITIES = [
  { name: 'Karachi', peakSunHours: 4.9 },
  { name: 'Lahore', peakSunHours: 4.6 },
  { name: 'Islamabad / Rawalpindi', peakSunHours: 4.5 },
  { name: 'Multan', peakSunHours: 4.9 },
  { name: 'Faisalabad', peakSunHours: 4.6 },
  { name: 'Peshawar', peakSunHours: 4.7 },
  { name: 'Quetta', peakSunHours: 5.2 },
  { name: 'Hyderabad', peakSunHours: 4.9 },
  { name: 'Other city', peakSunHours: 4.7 },
];

const STANDARD_SYSTEM_SIZES = [3, 5, 6, 8, 10, 12, 15, 20];
const SYSTEM_TYPES = [
  { id: 'on-grid', name: 'On-Grid', description: 'Grid connected, no battery' },
  { id: 'hybrid', name: 'Hybrid', description: 'Grid + battery backup' },
  { id: 'off-grid', name: 'Off-Grid', description: 'Independent of the grid' },
] as const;

type SystemType = (typeof SYSTEM_TYPES)[number]['id'];

export const SolarPvCalculatorPage: React.FC = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [dailyHours, setDailyHours] = useState<Record<string, number>>({});
  const [systemType, setSystemType] = useState<SystemType>('hybrid');
  const [city, setCity] = useState('Karachi');
  const [electricityRate, setElectricityRate] = useState(45);
  const [monthlyUnits, setMonthlyUnits] = useState('');
  const [hasCalculated, setHasCalculated] = useState(false);

  const selectedCity = CITIES.find((item) => item.name === city) ?? CITIES[0];
  const dailyConsumption = useMemo(
    () => APPLIANCE_CATEGORIES.flatMap((category) => category.appliances).reduce(
      (total, appliance) => total
        + (quantities[appliance.id] ?? 0)
          * appliance.watts
          * (dailyHours[appliance.id] ?? appliance.hours)
          / 1000,
      0,
    ),
    [dailyHours, quantities],
  );

  const sizingCapacity = dailyConsumption / selectedCity.peakSunHours / 0.78
    * (systemType === 'off-grid' ? 1.3 : 1);
  const recommendedCapacity = sizingCapacity > 0
    ? STANDARD_SYSTEM_SIZES.find((size) => size >= sizingCapacity)
      ?? Math.ceil(sizingCapacity / 5) * 5
    : 0;
  const panelCount = recommendedCapacity > 0 ? Math.ceil(recommendedCapacity / 0.65) : 0;
  const monthlyGeneration = recommendedCapacity * selectedCity.peakSunHours * 0.78 * 30;
  const estimatedMonthlyUse = monthlyUnits === ''
    ? dailyConsumption * 30
    : Math.max(0, Number(monthlyUnits) || 0);
  const savings = Math.min(monthlyGeneration, estimatedMonthlyUse) * Math.max(0, electricityRate);
  const activeApplianceCount = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);

  const updateQuantity = (id: string, change: number) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(20, (current[id] ?? 0) + change)),
    }));
  };

  const whatsappUrl = createWhatsAppLink(
    `Assalam-o-Alaikum, I used your Solar PV Calculator.\n`
    + `City: ${city}\nSystem type: ${systemType}\n`
    + `Daily estimated usage: ${dailyConsumption.toFixed(1)} kWh\n`
    + `Recommended system: ${recommendedCapacity || 0} kW (${panelCount} panels)\n`
    + `Estimated monthly generation: ${Math.round(monthlyGeneration)} kWh\n`
    + `Please help me confirm the system size and quotation.`,
  );

  return (
    <div className="min-h-screen bg-[#F4F7FA] py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <Sun className="h-4 w-4" />
            Solar PV calculator
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
            Find the Right Solar System for Your Home
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Select your appliances and typical daily usage to estimate your solar system size,
            monthly generation, and potential bill savings. No bill upload required.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#10243A]">What&apos;s in your home?</h2>
                  <p className="mt-1 text-sm text-slate-500">Set appliance quantities and average hours of use per day.</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {activeApplianceCount} selected
                </span>
              </div>
            </div>

            {APPLIANCE_CATEGORIES.map((category) => (
              <fieldset key={category.name} className="overflow-hidden rounded-xl border border-slate-200">
                <legend className="sr-only">{category.name}</legend>
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <h3 className="font-bold text-[#10243A]">{category.name}</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {category.appliances.map((appliance) => {
                    const quantity = quantities[appliance.id] ?? 0;
                    const hours = dailyHours[appliance.id] ?? appliance.hours;
                    return (
                      <div key={appliance.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_180px]">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{appliance.name}</div>
                          <div className="text-xs text-slate-500">{appliance.watts} W</div>
                        </div>
                        <div className="flex items-center gap-3" aria-label={`${appliance.name} quantity`}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(appliance.id, -1)}
                            disabled={quantity === 0}
                            aria-label={`Remove one ${appliance.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold tabular-nums text-slate-800">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(appliance.id, 1)}
                            disabled={quantity === 20}
                            aria-label={`Add one ${appliance.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <label className="col-span-2 flex items-center gap-3 text-xs text-slate-500 sm:col-span-1">
                          <span className="w-12 shrink-0">{hours} hr/day</span>
                          <input
                            type="range"
                            min="0"
                            max="24"
                            step="0.5"
                            value={hours}
                            aria-label={`${appliance.name} daily usage hours`}
                            onChange={(event) => setDailyHours((current) => ({
                              ...current,
                              [appliance.id]: Number(event.target.value),
                            }))}
                            className="h-2 w-full cursor-pointer accent-emerald-600"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div>
              <h3 className="mb-3 text-sm font-bold text-[#10243A]">System type</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {SYSTEM_TYPES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={systemType === item.id}
                    onClick={() => setSystemType(item.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      systemType === item.id
                        ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <span className="block text-sm font-bold text-[#10243A]">{item.name}</span>
                    <span className="mt-1 block text-xs text-slate-500">{item.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold text-slate-700">
                City
                <select
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {CITIES.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
                </select>
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Electricity rate (PKR per unit)
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={electricityRate}
                  onChange={(event) => setElectricityRate(Math.max(0, Number(event.target.value) || 0))}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
                <span className="mt-1 block font-normal text-slate-500">Adjust this to match your electricity bill.</span>
              </label>
              <label className="block text-xs font-bold text-slate-700 sm:col-span-2">
                Last month&apos;s units (optional)
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={monthlyUnits}
                  onChange={(event) => setMonthlyUnits(event.target.value.replace(/[^\d]/g, ''))}
                  placeholder="Enter monthly units from your bill"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
                <span className="mt-1 block font-normal text-slate-500">If entered, this is used instead of estimated appliance usage for the savings estimate.</span>
              </label>
            </div>

            <div className="rounded-xl bg-[#10243A] p-5 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <Zap className="h-4 w-4" />
                Estimated system size
              </div>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <span className="text-4xl font-extrabold tabular-nums">{recommendedCapacity.toFixed(1)}</span>
                  <span className="ml-2 text-sm text-slate-300">kW</span>
                </div>
                <span className="pb-1 text-right text-xs text-slate-300">
                  {panelCount} panels · {dailyConsumption.toFixed(1)} kWh/day
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasCalculated(true)}
                disabled={dailyConsumption <= 0}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-3 text-sm font-bold text-[#10243A] transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Calculator className="h-4 w-4" />
                See my savings & system size
                <ArrowRight className="h-4 w-4" />
              </button>
              {dailyConsumption <= 0 && (
                <p className="mt-3 text-center text-xs text-slate-300">Add at least one appliance to calculate a system size.</p>
              )}
            </div>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Your estimate</span>
              <h2 className="mt-1 text-xl font-extrabold text-[#10243A]">Solar system summary</h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-600">Daily energy use</span>
                  <strong className="text-sm tabular-nums text-slate-900">{dailyConsumption.toFixed(1)} kWh</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-600">Recommended array</span>
                  <strong className="text-sm tabular-nums text-slate-900">{recommendedCapacity.toFixed(1)} kW</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-600">Solar panels (650 W)</span>
                  <strong className="text-sm tabular-nums text-slate-900">{panelCount}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-600">Est. monthly generation</span>
                  <strong className="text-sm tabular-nums text-slate-900">{Math.round(monthlyGeneration)} kWh</strong>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Potential monthly bill offset</span>
                  <strong className="mt-1 block text-2xl font-extrabold tabular-nums text-emerald-700">
                    {formatPKR(savings)}
                  </strong>
                </div>
              </div>

              {hasCalculated && dailyConsumption > 0 && (
                <div className="mt-5 space-y-3 border-t border-slate-200 pt-5">
                  <div className="flex items-start gap-2 text-xs leading-relaxed text-emerald-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      For {city}, a {recommendedCapacity} kW {systemType} array is estimated to generate
                      {' '}{Math.round(monthlyGeneration)} kWh per month using 650 W panels.
                    </p>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Discuss this estimate
                  </a>
                </div>
              )}
            </section>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <p>
                This is a preliminary estimate, not a quotation. It uses typical appliance wattages,
                average peak sun hours, and a 0.78 system-efficiency factor. Actual output and savings
                depend on equipment, roof orientation, shading, weather, usage, and applicable utility tariffs.
                A site assessment is recommended before choosing a system.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
