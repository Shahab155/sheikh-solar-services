import heroSolarRooftop from '../assets/images/hero_solar_rooftop_1791672510280.jpg';
import serviceSolarInstall from '../assets/images/service_solar_install_1791672523953.jpg';
import serviceSolarMaint from '../assets/images/service_solar_maint_1791672538816.jpg';
import servicePanelClean from '../assets/images/service_panel_clean_1791672553764.jpg';
import solarEquipmentGrid from '../assets/images/solar_equipment_grid_1791672571599.jpg';

export const BUSINESS_INFO = {
  name: 'SHEIKH SOLAR & ELECTRICAL ENGINEERING',
  shortName: 'SHEIKH SOLAR',
  address: 'W3W3+HWW, Block M, North Nazimabad Town, Karachi, Pakistan',
  locationCity: 'North Nazimabad Town, Karachi',
  phone: '+92 312 2791608',
  phoneDisplay: '+92 312 2791608',
  whatsappRaw: '923122791608',
  whatsappDisplay: '+92 312 2791608',
  mapsUrl: 'https://www.google.com/maps/place/SHEIKH+SOLAR+%26+ELECTRICAL+ENGINEERING/@24.9464423,67.0522376,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb34140745b3631:0x1038aea186cafe40!8m2!3d24.9464375!4d67.0548125!16s%2Fg%2F11npxxjx19',
};

export const IMAGES = {
  hero: heroSolarRooftop,
  installation: serviceSolarInstall,
  maintenance: serviceSolarMaint,
  cleaning: servicePanelClean,
  equipment: solarEquipmentGrid,
};

export function createWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encoded}`;
}

export function formatPKR(val: number): string {
  if (isNaN(val) || val === null || val === undefined) return 'Rs. 0';
  return 'Rs. ' + Math.round(val).toLocaleString('en-PK');
}
