import React, { useState, useMemo } from 'react';
import { CalculatorState, AccessoryItem, SystemType } from '../types';
import { formatPKR, createWhatsAppLink, BUSINESS_INFO } from '../constants/business';
import {
  Calculator, RotateCcw, Printer, Download, MessageSquare, Plus,
  Trash2, Info, ChevronRight, Zap, Shield, Battery, Layers, Wrench, Truck
} from 'lucide-react';

const INITIAL_ACCESSORIES: AccessoryItem[] = [
  { id: '1', name: 'DC Solar Cables (4mm / 6mm UV-resistant)', unitPrice: 280, quantity: 80, unit: 'meters' },
  { id: '2', name: 'AC Power Cables (4-core copper)', unitPrice: 850, quantity: 25, unit: 'meters' },
  { id: '3', name: 'DC Breakers & Isolator Switches', unitPrice: 8500, quantity: 2, unit: 'units' },
  { id: '4', name: 'AC Circuit Breakers (MCCB / MCB)', unitPrice: 7500, quantity: 2, unit: 'units' },
  { id: '5', name: 'Surge Protective Devices (DC & AC SPD)', unitPrice: 9000, quantity: 2, unit: 'units' },
  { id: '6', name: 'Earthing Materials & Copper Ground Rods', unitPrice: 22000, quantity: 1, unit: 'set' },
  { id: '7', name: 'MC4 IP68 Connectors (Pairs)', unitPrice: 450, quantity: 10, unit: 'pairs' },
  { id: '8', name: 'Heavy-duty PVC Conduits & Cable Trays', unitPrice: 18000, quantity: 1, unit: 'lot' },
  { id: '9', name: 'IP65 Weatherproof Distribution Box (DB)', unitPrice: 16000, quantity: 1, unit: 'unit' },
];

const DEFAULT_STATE: CalculatorState = {
  systemType: 'hybrid',
  panelBrand: 'Tier-1 Bifacial N-Type (585W)',
  panelWattage: 585,
  panelPrice: 21500,
  panelQty: 18,

  inverterBrand: '10kW Hybrid Inverter (IP65)',
  inverterType: 'hybrid',
  inverterCapacityKw: 10,
  inverterPrice: 320000,
  inverterQty: 1,

  batteryIncluded: true,
  batteryType: 'Lithium',
  batteryCapacity: '10.2 kWh LiFePO4 Pack',
  batteryPrice: 420000,
  batteryQty: 1,

  structureType: 'Elevated Structure',
  structurePrice: 85000,
  structureQty: 1,
  structureBasis: 'Rooftop Elevated Galvanized Steel Framing',

  accessories: INITIAL_ACCESSORIES,

  installationCharges: 45000,
  electricalLabour: 25000,
  testingCommissioning: 15000,

  transportationCost: 15000,
  loadingUnloading: 6000,
  siteSurveyCost: 0,
  miscExpenses: 5000,

  discountAmount: 0,
  contingencyPercent: 3,
};

export const BudgetCalculatorPage: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE);
  const [newAccName, setNewAccName] = useState('');
  const [newAccPrice, setNewAccPrice] = useState(1000);
  const [newAccQty, setNewAccQty] = useState(1);
  const [newAccUnit, setNewAccUnit] = useState('item');
  const [showAddAccessory, setShowAddAccessory] = useState(false);

  // System type switcher updates defaults
  const handleSystemTypeChange = (type: SystemType) => {
    setState((prev) => {
      const isOffGrid = type === 'off-grid';
      const isHybrid = type === 'hybrid';
      const shouldIncludeBattery = isHybrid || isOffGrid;
      return {
        ...prev,
        systemType: type,
        inverterType: type,
        batteryIncluded: shouldIncludeBattery,
        batteryQty: shouldIncludeBattery ? (prev.batteryQty === 0 ? 1 : prev.batteryQty) : 0,
      };
    });
  };

  // Safe number inputs
  const parseNum = (val: string, fallback = 0) => {
    const n = parseFloat(val);
    return isNaN(n) || n < 0 ? fallback : n;
  };

  // Computations
  const panelCapacityKw = useMemo(() => {
    return (state.panelWattage * state.panelQty) / 1000;
  }, [state.panelWattage, state.panelQty]);

  const totalPanelCost = useMemo(() => {
    return state.panelPrice * state.panelQty;
  }, [state.panelPrice, state.panelQty]);

  const totalInverterCost = useMemo(() => {
    return state.inverterPrice * state.inverterQty;
  }, [state.inverterPrice, state.inverterQty]);

  const totalBatteryCost = useMemo(() => {
    if (!state.batteryIncluded) return 0;
    return state.batteryPrice * state.batteryQty;
  }, [state.batteryIncluded, state.batteryPrice, state.batteryQty]);

  const totalStructureCost = useMemo(() => {
    return state.structurePrice * state.structureQty;
  }, [state.structurePrice, state.structureQty]);

  const accessoriesSubtotal = useMemo(() => {
    return state.accessories.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [state.accessories]);

  const totalInstallationLabour = useMemo(() => {
    return state.installationCharges + state.electricalLabour + state.testingCommissioning;
  }, [state.installationCharges, state.electricalLabour, state.testingCommissioning]);

  const totalLogistics = useMemo(() => {
    return state.transportationCost + state.loadingUnloading + state.siteSurveyCost + state.miscExpenses;
  }, [state.transportationCost, state.loadingUnloading, state.siteSurveyCost, state.miscExpenses]);

  const equipmentSubtotal = useMemo(() => {
    return totalPanelCost + totalInverterCost + totalBatteryCost + totalStructureCost + accessoriesSubtotal;
  }, [totalPanelCost, totalInverterCost, totalBatteryCost, totalStructureCost, accessoriesSubtotal]);

  const preContingencySubtotal = useMemo(() => {
    const raw = equipmentSubtotal + totalInstallationLabour + totalLogistics - (state.discountAmount || 0);
    return Math.max(0, raw);
  }, [equipmentSubtotal, totalInstallationLabour, totalLogistics, state.discountAmount]);

  const contingencyAmount = useMemo(() => {
    return Math.max(0, (preContingencySubtotal * (state.contingencyPercent || 0)) / 100);
  }, [preContingencySubtotal, state.contingencyPercent]);

  const grandTotal = useMemo(() => {
    return Math.max(0, preContingencySubtotal + contingencyAmount);
  }, [preContingencySubtotal, contingencyAmount]);

  // Accessories management
  const handleUpdateAccessory = (id: string, field: 'unitPrice' | 'quantity' | 'name', value: any) => {
    setState((prev) => ({
      ...prev,
      accessories: prev.accessories.map((acc) => {
        if (acc.id === id) {
          return {
            ...acc,
            [field]: field === 'name' ? value : parseNum(value, 0),
          };
        }
        return acc;
      }),
    }));
  };

  const handleRemoveAccessory = (id: string) => {
    setState((prev) => ({
      ...prev,
      accessories: prev.accessories.filter((a) => a.id !== id),
    }));
  };

  const handleAddCustomAccessory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccName.trim()) return;
    const newItem: AccessoryItem = {
      id: Date.now().toString(),
      name: newAccName.trim(),
      unitPrice: Math.max(0, newAccPrice),
      quantity: Math.max(1, newAccQty),
      unit: newAccUnit.trim() || 'item',
    };
    setState((prev) => ({
      ...prev,
      accessories: [...prev.accessories, newItem],
    }));
    setNewAccName('');
    setNewAccPrice(1000);
    setNewAccQty(1);
    setShowAddAccessory(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset calculator to default sample configuration?')) {
      setState(DEFAULT_STATE);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const rows = [
      ['SHEIKH SOLAR & ELECTRICAL ENGINEERING - ESTIMATED BUDGET BREAKDOWN'],
      ['Location: ' + BUSINESS_INFO.address],
      ['Contact: ' + BUSINESS_INFO.phoneDisplay],
      ['Date Generated: ' + new Date().toLocaleDateString('en-PK')],
      [''],
      ['Item Category', 'Specification', 'Unit Price (PKR)', 'Quantity', 'Subtotal (PKR)'],
      ['System Type', state.systemType.toUpperCase(), '-', '-', '-'],
      ['Solar Panels', `${state.panelBrand} (${state.panelWattage}W)`, state.panelPrice, state.panelQty, totalPanelCost],
      ['Inverter', `${state.inverterBrand} (${state.inverterCapacityKw}kW)`, state.inverterPrice, state.inverterQty, totalInverterCost],
      ['Battery Storage', state.batteryIncluded ? `${state.batteryType} (${state.batteryCapacity})` : 'Not Included', state.batteryIncluded ? state.batteryPrice : 0, state.batteryIncluded ? state.batteryQty : 0, totalBatteryCost],
      ['Mounting Structure', `${state.structureType} - ${state.structureBasis}`, state.structurePrice, state.structureQty, totalStructureCost],
      [''],
      ['ACCESSORIES & PROTECTION'],
      ...state.accessories.map((acc) => [
        acc.name,
        acc.unit,
        acc.unitPrice,
        acc.quantity,
        acc.unitPrice * acc.quantity,
      ]),
      ['Total Accessories Subtotal', '', '', '', accessoriesSubtotal],
      [''],
      ['LABOUR & COMMISSIONING'],
      ['Installation Labour', '', '', '', state.installationCharges],
      ['Electrical Work', '', '', '', state.electricalLabour],
      ['Testing & Commissioning', '', '', '', state.testingCommissioning],
      ['Total Installation Charges', '', '', '', totalInstallationLabour],
      [''],
      ['LOGISTICS & EXPENSES'],
      ['Transportation', '', '', '', state.transportationCost],
      ['Loading/Unloading', '', '', '', state.loadingUnloading],
      ['Site Survey & Misc', '', '', '', state.siteSurveyCost + state.miscExpenses],
      ['Total Logistics & Expenses', '', '', '', totalLogistics],
      [''],
      ['SUMMARY'],
      ['Equipment Subtotal', '', '', '', equipmentSubtotal],
      ['Discount Applied', '', '', '', state.discountAmount],
      ['Pre-Contingency Subtotal', '', '', '', preContingencySubtotal],
      [`Contingency (${state.contingencyPercent}%)`, '', '', '', contingencyAmount],
      ['ESTIMATED TOTAL INSTALLATION BUDGET', '', '', '', grandTotal],
      [''],
      ['DISCLAIMER: Indicative budget based on user-entered values. Market prices and site conditions may vary.'],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((cell) => `"${cell}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sheikh_Solar_Estimate_${state.systemType}_${panelCapacityKw.toFixed(1)}kW.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWhatsAppMessage = () => {
    return `Assalam-o-Alaikum SHEIKH SOLAR & ELECTRICAL ENGINEERING,
I used your online Solar Budget Calculator and would like an official quotation based on these estimated specifications:

*System Configuration:*
• System Type: ${state.systemType.toUpperCase()}
• Solar PV Array: ${panelCapacityKw.toFixed(2)} kW (${state.panelQty}x ${state.panelWattage}W panels)
• Inverter: ${state.inverterCapacityKw} kW ${state.inverterType} inverter (${state.inverterBrand})
• Battery: ${state.batteryIncluded ? `${state.batteryQty}x ${state.batteryCapacity} (${state.batteryType})` : 'None / On-Grid'}
• Mounting: ${state.structureType}

*Estimated Budget Summary:*
• Equipment Subtotal: ${formatPKR(equipmentSubtotal)}
• Installation & Electrical Labour: ${formatPKR(totalInstallationLabour)}
• Logistics & Transport: ${formatPKR(totalLogistics)}
• Contingency (${state.contingencyPercent}%): ${formatPKR(contingencyAmount)}
*Estimated Total Budget: ${formatPKR(grandTotal)}*

Please arrange a site assessment or review my equipment selection in Karachi.`;
  };

  const whatsappQuoteUrl = createWhatsAppLink(getWhatsAppMessage());

  return (
    <div className="bg-[#F4F7FA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb & Titles */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium">Budget Calculator</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                Solar Installation Budget Calculator
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
                Build an estimated solar system budget by choosing your system type and adjusting equipment, quantities, and installation costs in Pakistani Rupees.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start lg:self-auto no-print">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                title="Restore default sample configuration"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                title="Export estimate as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Print-only branding banner */}
        <div className="print-only mb-6 border-b border-slate-400 pb-4">
          <h2 className="text-xl font-bold text-slate-900">{BUSINESS_INFO.name}</h2>
          <p className="text-xs text-slate-600">{BUSINESS_INFO.address}</p>
          <p className="text-xs text-slate-600">Phone: {BUSINESS_INFO.phoneDisplay} | Karachi</p>
          <p className="text-xs text-slate-600 mt-1">Generated: {new Date().toLocaleDateString('en-PK')}</p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Area (Steps 1-9) */}
          <div className="lg:col-span-8 space-y-6">

            {/* STEP 1: System Type */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h2 className="text-base font-bold text-[#10243A]">Select System Type</h2>
                </div>
                <span className="text-xs font-medium text-slate-500">Architecture</span>
              </div>

              {/* Segmented Selector */}
              <div className="grid grid-cols-3 gap-2.5 p-1 bg-slate-100 rounded-lg mb-4">
                {(['on-grid', 'hybrid', 'off-grid'] as SystemType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleSystemTypeChange(type)}
                    className={`py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer capitalize ${
                      state.systemType === type
                        ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type === 'on-grid' ? 'On-Grid' : type === 'hybrid' ? 'Hybrid' : 'Off-Grid'}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                {state.systemType === 'on-grid' && (
                  <p>
                    <strong className="text-slate-800">On-Grid Solar:</strong> Designed to synchronize directly with the utility grid (K-Electric/WAPDA) for net metering export. Does not require batteries, lowering initial setup budget. Note: Standard on-grid inverters shut down during grid outages for anti-islanding line safety.
                  </p>
                )}
                {state.systemType === 'hybrid' && (
                  <p>
                    <strong className="text-slate-800">Hybrid Solar:</strong> Combines grid synchronization with battery storage. Delivers power during outages to essential load circuits while still capable of feeding excess solar into the utility grid.
                  </p>
                )}
                {state.systemType === 'off-grid' && (
                  <p>
                    <strong className="text-slate-800">Off-Grid Solar:</strong> Operates entirely independently of the utility grid. Requires adequate battery storage and generator integration to supply power 24/7.
                  </p>
                )}
              </div>
            </section>

            {/* STEP 2: Solar Panels */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h2 className="text-base font-bold text-[#10243A]">Solar Panels (PV Array)</h2>
                </div>
                <div className="text-xs text-right">
                  <span className="text-slate-500">Array Capacity: </span>
                  <span className="font-bold text-emerald-700 tabular-nums">{panelCapacityKw.toFixed(2)} kW</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Panel Brand / Model</label>
                  <input
                    type="text"
                    value={state.panelBrand}
                    onChange={(e) => setState({ ...state, panelBrand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 text-xs"
                    placeholder="e.g. 585W Monocrystalline"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Wattage per Panel (W)</label>
                  <input
                    type="number"
                    min="100"
                    max="1000"
                    step="5"
                    value={state.panelWattage || ''}
                    onChange={(e) => setState({ ...state, panelWattage: parseNum(e.target.value, 585) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Price per Panel (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={state.panelPrice || ''}
                    onChange={(e) => setState({ ...state, panelPrice: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Quantity of Panels</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={state.panelQty || ''}
                    onChange={(e) => setState({ ...state, panelQty: parseNum(e.target.value, 1) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Formula: {state.panelWattage}W × {state.panelQty} panels = {(state.panelWattage * state.panelQty / 1000).toFixed(2)} kW
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Subtotal: {formatPKR(totalPanelCost)}
                </span>
              </div>
            </section>

            {/* STEP 3: Inverter */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h2 className="text-base font-bold text-[#10243A]">Solar Inverter</h2>
                </div>
                <span className="text-xs font-bold text-emerald-700 tabular-nums">
                  Capacity: {state.inverterCapacityKw} kW
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Inverter Model / Brand</label>
                  <input
                    type="text"
                    value={state.inverterBrand}
                    onChange={(e) => setState({ ...state, inverterBrand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs"
                    placeholder="e.g. 10kW Hybrid Inverter"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Capacity (kW)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="0.5"
                    value={state.inverterCapacityKw || ''}
                    onChange={(e) => setState({ ...state, inverterCapacityKw: parseNum(e.target.value, 1) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Unit Price (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={state.inverterPrice || ''}
                    onChange={(e) => setState({ ...state, inverterPrice: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={state.inverterQty || ''}
                    onChange={(e) => setState({ ...state, inverterQty: parseNum(e.target.value, 1) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Matches {state.systemType.toUpperCase()} architecture specifications
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Subtotal: {formatPKR(totalInverterCost)}
                </span>
              </div>
            </section>

            {/* STEP 4: Batteries */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h2 className="text-base font-bold text-[#10243A]">Battery Storage</h2>
                </div>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.batteryIncluded}
                    onChange={(e) => setState({ ...state, batteryIncluded: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                  <span>Include Batteries</span>
                </label>
              </div>

              {state.batteryIncluded ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Battery Chemistry</label>
                      <select
                        value={state.batteryType}
                        onChange={(e) => setState({ ...state, batteryType: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs bg-white"
                      >
                        <option value="Lithium">Lithium Iron Phosphate (LiFePO4)</option>
                        <option value="Tubular">Deep Cycle Tubular Battery</option>
                        <option value="Other">Other Battery Chemistry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Capacity / Model</label>
                      <input
                        type="text"
                        value={state.batteryCapacity}
                        onChange={(e) => setState({ ...state, batteryCapacity: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs"
                        placeholder="e.g. 10.2 kWh / 200Ah"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Unit Price (PKR)</label>
                      <input
                        type="number"
                        min="0"
                        step="5000"
                        value={state.batteryPrice || ''}
                        onChange={(e) => setState({ ...state, batteryPrice: parseNum(e.target.value, 0) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Quantity (Units)</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={state.batteryQty || ''}
                        onChange={(e) => setState({ ...state, batteryQty: parseNum(e.target.value, 0) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Configured for {state.batteryQty} unit(s) of {state.batteryType} storage
                    </span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      Subtotal: {formatPKR(totalBatteryCost)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300 text-xs text-slate-600 text-center">
                  Battery storage excluded from this configuration (standard for direct On-Grid Net Metering). Check the box above if backup storage is desired.
                </div>
              )}
            </section>

            {/* STEP 5: Mounting Structure */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">5</span>
                  <h2 className="text-base font-bold text-[#10243A]">Mounting Structure & Framing</h2>
                </div>
                <span className="text-xs text-slate-500">Site-Specific</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Structure Type</label>
                  <select
                    value={state.structureType}
                    onChange={(e) => setState({ ...state, structureType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs bg-white"
                  >
                    <option value="Standard Mounting Structure">Standard Flush Ground / Roof Mount</option>
                    <option value="Elevated Structure">Elevated Heavy-duty Structure (Usable Roof)</option>
                    <option value="L2 Bracket">L2 Galvanized Brackets</option>
                    <option value="L3 Bracket">L3 Heavy Galvanized Brackets</option>
                    <option value="Custom Structure">Custom Heavy Fabrication</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Structure Price / Estimate (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={state.structurePrice || ''}
                    onChange={(e) => setState({ ...state, structurePrice: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Structure Sets / Multiplier</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={state.structureQty || ''}
                    onChange={(e) => setState({ ...state, structureQty: parseNum(e.target.value, 1) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Notice: Actual structure specifications depend on roof orientation, elevation height requirements (to keep roof accessible in Karachi homes), wind load resistance, and site engineering design.
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{state.structureType}</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Subtotal: {formatPKR(totalStructureCost)}
                </span>
              </div>
            </section>

            {/* STEP 6: Accessories and Electrical Components */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">6</span>
                  <h2 className="text-base font-bold text-[#10243A]">Accessories & Electrical Protection</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAccessory(!showAddAccessory)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Item</span>
                </button>
              </div>

              {/* Add Custom Item Form */}
              {showAddAccessory && (
                <form
                  onSubmit={handleAddCustomAccessory}
                  className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs items-end"
                >
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 mb-1">Item Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Changeover Switch / Monitoring Dongle"
                      value={newAccName}
                      onChange={(e) => setNewAccName(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Unit Price (PKR)</label>
                    <input
                      type="number"
                      min="0"
                      value={newAccPrice}
                      onChange={(e) => setNewAccPrice(parseNum(e.target.value, 0))}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Qty & Unit</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        min="1"
                        value={newAccQty}
                        onChange={(e) => setNewAccQty(parseNum(e.target.value, 1))}
                        className="w-16 px-2 py-1.5 border border-slate-300 rounded bg-white text-xs tabular-nums"
                      />
                      <input
                        type="text"
                        value={newAccUnit}
                        onChange={(e) => setNewAccUnit(e.target.value)}
                        className="w-16 px-2 py-1.5 border border-slate-300 rounded bg-white text-xs"
                        placeholder="unit"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700 transition-colors text-xs cursor-pointer"
                    >
                      Save Row
                    </button>
                  </div>
                </form>
              )}

              {/* Accessories Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-medium">
                      <th className="py-2 pr-2">Item Description</th>
                      <th className="py-2 px-2 text-right">Unit Price (PKR)</th>
                      <th className="py-2 px-2 text-center">Qty / Measure</th>
                      <th className="py-2 px-2 text-right">Subtotal</th>
                      <th className="py-2 pl-2 text-center w-8 no-print"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {state.accessories.map((acc) => {
                      const itemSubtotal = acc.unitPrice * acc.quantity;
                      return (
                        <tr key={acc.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 pr-2 font-medium text-slate-800">
                            {acc.name}
                          </td>
                          <td className="py-2.5 px-2 text-right tabular-nums">
                            <input
                              type="number"
                              min="0"
                              value={acc.unitPrice}
                              onChange={(e) => handleUpdateAccessory(acc.id, 'unitPrice', e.target.value)}
                              className="w-24 px-1.5 py-0.5 text-right border border-slate-200 rounded text-slate-800 tabular-nums focus:border-emerald-500"
                            />
                          </td>
                          <td className="py-2.5 px-2 text-center tabular-nums">
                            <div className="inline-flex items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                value={acc.quantity}
                                onChange={(e) => handleUpdateAccessory(acc.id, 'quantity', e.target.value)}
                                className="w-14 px-1.5 py-0.5 text-center border border-slate-200 rounded text-slate-800 tabular-nums focus:border-emerald-500"
                              />
                              <span className="text-[11px] text-slate-500">{acc.unit}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-2 text-right font-semibold text-slate-900 tabular-nums">
                            {formatPKR(itemSubtotal)}
                          </td>
                          <td className="py-2.5 pl-2 text-center no-print">
                            <button
                              type="button"
                              onClick={() => handleRemoveAccessory(acc.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                              title="Delete row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Total Accessories & Safety Component Items ({state.accessories.length})
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Subtotal: {formatPKR(accessoriesSubtotal)}
                </span>
              </div>
            </section>

            {/* STEP 7: Installation & Engineering Charges */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">7</span>
                  <h2 className="text-base font-bold text-[#10243A]">Installation, Fabrication & Labour</h2>
                </div>
                <span className="text-xs text-slate-500">Professional Services</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Mounting & Structural Labour (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={state.installationCharges || ''}
                    onChange={(e) => setState({ ...state, installationCharges: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Electrical Wiring Labour (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={state.electricalLabour || ''}
                    onChange={(e) => setState({ ...state, electricalLabour: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Testing & Commissioning (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={state.testingCommissioning || ''}
                    onChange={(e) => setState({ ...state, testingCommissioning: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Covers electrical certified craftsmanship and safe testing
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Labour Total: {formatPKR(totalInstallationLabour)}
                </span>
              </div>
            </section>

            {/* STEP 8: Transportation & Logistics */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">8</span>
                  <h2 className="text-base font-bold text-[#10243A]">Transportation, Handling & Expenses</h2>
                </div>
                <span className="text-xs text-slate-500">Karachi & Suburbs</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Transportation (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={state.transportationCost || ''}
                    onChange={(e) => setState({ ...state, transportationCost: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Loading & Rooftop Crane/Labour</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={state.loadingUnloading || ''}
                    onChange={(e) => setState({ ...state, loadingUnloading: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Site Survey (if applicable)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={state.siteSurveyCost || ''}
                    onChange={(e) => setState({ ...state, siteSurveyCost: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Miscellaneous / Consumables</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={state.miscExpenses || ''}
                    onChange={(e) => setState({ ...state, miscExpenses: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Site transport and material delivery</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Logistics Total: {formatPKR(totalLogistics)}
                </span>
              </div>
            </section>

            {/* STEP 9: Discount & Contingency */}
            <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#10243A] text-white text-xs font-bold flex items-center justify-center">9</span>
                  <h2 className="text-base font-bold text-[#10243A]">Discount & Contingency Buffer</h2>
                </div>
                <span className="text-xs text-slate-500">Adjustment</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Special Discount / Rebate (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={state.discountAmount || ''}
                    onChange={(e) => setState({ ...state, discountAmount: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                    placeholder="0"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Direct reduction deducted from subtotal
                  </span>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Contingency Buffer (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={state.contingencyPercent || ''}
                    onChange={(e) => setState({ ...state, contingencyPercent: parseNum(e.target.value, 0) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-slate-800 text-xs tabular-nums"
                    placeholder="3"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Calculated on pre-contingency subtotal ({formatPKR(contingencyAmount)})
                  </span>
                </div>
              </div>
            </section>

          </div>

          {/* Right Sticky Cost Summary Panel (Step 10 & 11) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-[#10243A] text-white rounded-xl p-5 sm:p-6 shadow-md border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-sm tracking-wide uppercase text-white">
                    Estimated Cost Summary
                  </h3>
                </div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-300 border border-emerald-500/30">
                  {state.systemType}
                </span>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-2 pb-4 mb-4 border-b border-slate-800/80 text-xs">
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <span className="text-[11px] text-slate-400 block">Total Solar PV</span>
                  <span className="text-sm font-bold text-amber-300 tabular-nums">
                    {panelCapacityKw.toFixed(2)} kW
                  </span>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg">
                  <span className="text-[11px] text-slate-400 block">Inverter Sizing</span>
                  <span className="text-sm font-bold text-emerald-300 tabular-nums">
                    {state.inverterCapacityKw} kW
                  </span>
                </div>
              </div>

              {/* Line Items Breakdown */}
              <div className="space-y-2 text-xs text-slate-300 pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Solar Panels ({state.panelQty}x):</span>
                  <span className="font-medium text-white tabular-nums">{formatPKR(totalPanelCost)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Solar Inverter:</span>
                  <span className="font-medium text-white tabular-nums">{formatPKR(totalInverterCost)}</span>
                </div>

                {state.batteryIncluded && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Batteries ({state.batteryType}):</span>
                    <span className="font-medium text-white tabular-nums">{formatPKR(totalBatteryCost)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mounting Structure:</span>
                  <span className="font-medium text-white tabular-nums">{formatPKR(totalStructureCost)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Accessories & Safety:</span>
                  <span className="font-medium text-white tabular-nums">{formatPKR(accessoriesSubtotal)}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center font-semibold text-slate-200">
                  <span>Equipment Subtotal:</span>
                  <span className="tabular-nums text-amber-200">{formatPKR(equipmentSubtotal)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Installation & Labour:</span>
                  <span className="font-medium text-white tabular-nums">{formatPKR(totalInstallationLabour)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Transport & Handling:</span>
                  <span className="font-medium text-white tabular-nums">{formatPKR(totalLogistics)}</span>
                </div>

                {state.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>Discount:</span>
                    <span className="tabular-nums">- {formatPKR(state.discountAmount)}</span>
                  </div>
                )}

                {state.contingencyPercent > 0 && (
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Contingency ({state.contingencyPercent}%):</span>
                    <span className="font-medium text-white tabular-nums">{formatPKR(contingencyAmount)}</span>
                  </div>
                )}
              </div>

              {/* Total Figure */}
              <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/30 mb-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 block mb-0.5">
                  Estimated Total Budget
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  {formatPKR(grandTotal)}
                </div>
                <span className="text-[10px] text-emerald-300/80 mt-1 block">
                  Includes equipment, fabrication, cabling, testing & logistics
                </span>
              </div>

              {/* Step 11: Primary Action Button */}
              <div className="space-y-2.5 no-print">
                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Send Estimate to WhatsApp</span>
                </a>

                <div className="text-center">
                  <span className="text-[11px] text-slate-400">
                    Enquiry opens directly on WhatsApp (+92 312 2791608)
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer Box */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <div className="flex items-start gap-2 mb-1">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="font-bold text-amber-900">Important Calculator Disclaimer</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Disclaimer: This calculator provides an indicative budget based on the prices and quantities entered by the user. Actual costs may vary depending on equipment brands, market prices, roof conditions, system design, structure requirements, transportation, and installation complexity. Final quotations must be confirmed by SHEIKH SOLAR & ELECTRICAL ENGINEERING.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
