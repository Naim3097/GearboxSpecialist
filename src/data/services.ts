export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: "diagnosis",
    name: "Gearbox Diagnosis",
    shortName: "Diagnosis",
    description:
      "Road test, fault-code scan and physical inspection to pinpoint the actual fault before any repair is quoted.",
  },
  {
    slug: "cvt-repair",
    name: "CVT Gearbox Repair",
    shortName: "CVT Repair",
    description:
      "Belt, pulley, valve body and start-clutch repair for continuously variable transmissions, including Honda, Nissan, Proton and Perodua units.",
  },
  {
    slug: "automatic-repair",
    name: "Automatic Gearbox Repair",
    shortName: "Automatic Repair",
    description:
      "Repair of conventional torque-converter automatics — solenoids, valve bodies, clutch packs and torque converters.",
  },
  {
    slug: "dct-repair",
    name: "DCT / DSG Repair",
    shortName: "DCT Repair",
    description:
      "Dual-clutch transmission repair: mechatronic units, clutch packs and adaptation for VW DSG, Ford PowerShift, Proton 7DCT and similar units.",
  },
  {
    slug: "overhaul",
    name: "Gearbox Overhaul",
    shortName: "Overhaul",
    description:
      "Full strip-down and rebuild with new soft parts, measured against factory tolerances — the definitive fix for high-mileage gearboxes.",
  },
  {
    slug: "oil-service",
    name: "Gearbox Oil Service",
    shortName: "Oil Service",
    description:
      "Fluid and filter service with the correct specification oil — the single cheapest way to extend a gearbox's life.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
