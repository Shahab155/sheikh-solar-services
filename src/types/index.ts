export type SystemType = 'on-grid' | 'hybrid' | 'off-grid';

export interface CalculatorState {
  systemType: SystemType;
  // Panels
  panelBrand: string;
  panelWattage: number; // in Watts (e.g. 585)
  panelPrice: number; // PKR
  panelQty: number;
  // Inverter
  inverterBrand: string;
  inverterType: SystemType;
  inverterCapacityKw: number; // in kW
  inverterPrice: number; // PKR
  inverterQty: number;
  // Battery
  batteryIncluded: boolean;
  batteryType: 'Lithium' | 'Tubular' | 'Other';
  batteryCapacity: string;
  batteryPrice: number; // PKR
  batteryQty: number;
  // Mounting Structure
  structureType: 'Standard Mounting Structure' | 'Elevated Structure' | 'L2 Bracket' | 'L3 Bracket' | 'Custom Structure';
  structurePrice: number; // PKR
  structureQty: number;
  structureBasis: string;
  // Accessories
  accessories: AccessoryItem[];
  // Installation & Labour
  installationCharges: number; // PKR
  electricalLabour: number;
  testingCommissioning: number;
  // Transportation & Logistics
  transportationCost: number;
  loadingUnloading: number;
  siteSurveyCost: number;
  miscExpenses: number;
  // Discount & Contingency
  discountAmount: number; // PKR
  contingencyPercent: number; // e.g. 5%
}

export interface AccessoryItem {
  id: string;
  name: string;
  unitPrice: number; // PKR
  quantity: number;
  unit: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  specs: string;
  description: string;
  indicativePriceRange?: string;
  image?: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential Rooftop' | 'Commercial Installation' | 'Elevated Structure' | 'Hybrid Installation' | 'Solar Panel Cleaning' | 'Equipment Installation';
  capacity?: string;
  location: string;
  description: string;
  image: string;
}
