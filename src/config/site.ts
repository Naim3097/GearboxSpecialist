/**
 * Global site configuration.
 * The hub's single source of truth for identity, URLs and locale strategy.
 */
export const site = {
  name: "Gearbox Specialist",
  legalName: "Gearbox Specialist Malaysia",
  domain: "cvtspecialist.com",
  url: "https://cvtspecialist.com",
  tagline: "Malaysia's definitive gearbox authority",
  description:
    "Expert guides on CVT and automatic gearbox problems, repair costs and maintenance in Malaysia — and the fastest route to a specialist workshop near you.",
  locale: "en_MY",
  /** GA4 measurement ID — the Google tag renders once in the root layout. */
  gaId: "G-WW1FQWNPQX",
  phoneDisplay: "+60 3-0000 0000", // placeholder until supplied
  areaServed: ["Kuala Lumpur", "Selangor", "Klang Valley", "Pulau Pinang"],
  social: {
    /** Shared page for both workshops — soon rebranding to Dynamic Torque Ventures. */
    facebook: "https://www.facebook.com/share/18cpCsJAQT/?mibextid=wwXIfr",
  },
} as const;

/** Locales the hub is architected for. EN ships first; BM and ZH activate in Phase 2. */
export const locales = ["en", "ms", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
/** Only locales listed here are emitted in hreflang alternates / sitemaps. */
export const activeLocales: Locale[] = ["en"];

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
