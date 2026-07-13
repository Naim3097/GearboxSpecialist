import type { Locale } from "@/config/site";

/**
 * UI string dictionary for the site chrome and shared templates.
 * Page copy lives in the page files / MDX content per locale; this covers
 * everything shared (nav, CTAs, labels). BM is conversational Malaysian,
 * not stiff Baku. ZH is natural simplified Chinese.
 */

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ms: "BM",
  zh: "中文",
};

export interface Dict {
  nav: { href: string; label: string }[];
  home: string;
  bookDiagnosis: string;
  reserveBay: string; // template: {workshop}
  bookThisBay: string;
  yourArea: string;
  select: string;
  min: string;
  updated: string;
  nextUp: string;
  brandFiles: string;
  faqDefault: string;
  stickyDefault: string;
  ctaKicker: string;
  ctaHeading: string;
  ctaBody: string;
  ctaLabelIdle: string;
  whatsappSr: string;
  footerFinalKicker: string;
  footerFinalHeading: string;
  footerGuides: string;
  footerByBrand: string;
  footerAreas: string;
  footerAbout: string;
  footerWorkshops: string;
  footerAllBrands: string;
  footerAllAreas: string;
  footerTagline: string;
  footerLegal: string;
  brandRepairSuffix: string;
}

const en: Dict = {
  nav: [
    { href: "/cvt", label: "CVT" },
    { href: "/automatic", label: "Automatic" },
    { href: "/diagnostics", label: "Diagnostics" },
    { href: "/maintenance", label: "Maintenance" },
    { href: "/brands", label: "Brands" },
    { href: "/locations", label: "Locations" },
    { href: "/costs", label: "Costs" },
    { href: "/workshops", label: "Workshops" },
  ],
  home: "Home",
  bookDiagnosis: "Book a diagnosis",
  reserveBay: "Reserve a bay · {workshop}",
  bookThisBay: "Book this bay",
  yourArea: "Your area",
  select: "Select",
  min: "min",
  updated: "Updated",
  nextUp: "Next up",
  brandFiles: "Brand files:",
  faqDefault: "Common questions",
  stickyDefault: "Unsure what your gearbox is telling you?",
  ctaKicker: "Workshop network",
  ctaHeading: "Get it diagnosed properly",
  ctaBody:
    "Road test and specialist scan before any repair is quoted. Same-day appointments in the Klang Valley and Penang, warranty on all work.",
  ctaLabelIdle: "Book a diagnosis on WhatsApp",
  whatsappSr: "Chat with us on WhatsApp",
  footerFinalKicker: "Final call",
  footerFinalHeading: "Stop guessing.\nGet it diagnosed.",
  footerGuides: "Guides",
  footerByBrand: "By brand",
  footerAreas: "Areas",
  footerAbout: "About",
  footerWorkshops: "Workshops",
  footerAllBrands: "All brands",
  footerAllAreas: "All areas",
  footerTagline:
    "Expert guides on CVT and automatic gearbox problems, repair costs and maintenance in Malaysia — and the fastest route to a specialist workshop near you.",
  footerLegal: "Independent gearbox knowledge for Malaysian drivers",
  brandRepairSuffix: "gearbox repair",
};

const ms: Dict = {
  nav: [
    { href: "/ms/cvt", label: "CVT" },
    { href: "/ms/automatic", label: "Gearbox Auto" },
    { href: "/ms/diagnostics", label: "Diagnosis" },
    { href: "/ms/maintenance", label: "Maintenance" },
    { href: "/brands", label: "Jenama" },
    { href: "/locations", label: "Lokasi" },
    { href: "/ms/costs", label: "Harga" },
    { href: "/ms/workshops", label: "Bengkel" },
  ],
  home: "Utama",
  bookDiagnosis: "Book diagnosis",
  reserveBay: "Book slot · {workshop}",
  bookThisBay: "Book bengkel ini",
  yourArea: "Kawasan anda",
  select: "Pilih",
  min: "min",
  updated: "Dikemaskini",
  nextUp: "Baca lagi",
  brandFiles: "Fail jenama:",
  faqDefault: "Soalan yang selalu ditanya",
  stickyDefault: "Tak pasti apa masalah gearbox anda?",
  ctaKicker: "Rangkaian bengkel",
  ctaHeading: "Diagnosis dulu, baru repair",
  ctaBody:
    "Road test dan scan penuh dulu sebelum kami bagi harga. Appointment hari sama sekitar Lembah Klang dan Penang, semua kerja ada warranty.",
  ctaLabelIdle: "Book diagnosis ikut WhatsApp",
  whatsappSr: "WhatsApp kami",
  footerFinalKicker: "Jangan tunggu",
  footerFinalHeading: "Jangan main agak-agak.\nTerus diagnosis.",
  footerGuides: "Panduan",
  footerByBrand: "Ikut jenama",
  footerAreas: "Kawasan",
  footerAbout: "Tentang kami",
  footerWorkshops: "Bengkel",
  footerAllBrands: "Semua jenama",
  footerAllAreas: "Semua kawasan",
  footerTagline:
    "Panduan lengkap pasal masalah gearbox CVT dan auto, harga repair dan cara jaga gearbox di Malaysia, plus jalan paling cepat ke bengkel pakar dekat anda.",
  footerLegal: "Ilmu gearbox untuk pemandu Malaysia",
  brandRepairSuffix: "repair gearbox",
};

const zh: Dict = {
  nav: [
    { href: "/zh/cvt", label: "CVT" },
    { href: "/zh/automatic", label: "自动波箱" },
    { href: "/zh/diagnostics", label: "检测" },
    { href: "/zh/maintenance", label: "保养" },
    { href: "/brands", label: "品牌" },
    { href: "/locations", label: "地区" },
    { href: "/zh/costs", label: "价钱" },
    { href: "/zh/workshops", label: "修车厂" },
  ],
  home: "首页",
  bookDiagnosis: "预约检测",
  reserveBay: "预约 · {workshop}",
  bookThisBay: "预约这家",
  yourArea: "你的地区",
  select: "选择",
  min: "分钟",
  updated: "更新于",
  nextUp: "接着读",
  brandFiles: "品牌档案：",
  faqDefault: "车主常问",
  stickyDefault: "不确定波箱出了什么问题？",
  ctaKicker: "维修网络",
  ctaHeading: "先检测，才报价",
  ctaBody: "报价之前一定先路试加电脑扫描。巴生谷和槟城一带都可当天预约，所有维修都有保家。",
  ctaLabelIdle: "WhatsApp 预约检测",
  whatsappSr: "WhatsApp 联系我们",
  footerFinalKicker: "别再拖了",
  footerFinalHeading: "别靠猜。\n先检测。",
  footerGuides: "指南",
  footerByBrand: "按品牌",
  footerAreas: "服务地区",
  footerAbout: "关于我们",
  footerWorkshops: "修车厂",
  footerAllBrands: "所有品牌",
  footerAllAreas: "所有地区",
  footerTagline:
    "马来西亚 CVT 与自动波箱问题、维修价钱与保养的专业指南，帮你最快找到附近可靠的波箱专家。",
  footerLegal: "为马来西亚车主而写的波箱知识",
  brandRepairSuffix: "波箱维修",
};

const dictionaries: Record<Locale, Dict> = { en, ms, zh };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? en;
}

/** Prefix a path for a locale ("/cvt" + ms → "/ms/cvt"). */
export function localePath(locale: Locale, path: string): string {
  return locale === "en" ? path : `/${locale}${path === "/" ? "" : path}` || `/${locale}`;
}

/**
 * Pages that exist per locale. The language switcher, hreflang pairs,
 * cross-locale links and sitemap all derive from these registries.
 * Article slugs are shared across locales. As of the parity milestone all
 * 20 articles + hubs exist in every language, so both sets share one list;
 * they stay separate exports so a future untranslated page can diverge.
 */
const fullyTranslatedPaths = [
  "/",
  "/workshops",
  "/cvt",
  "/automatic",
  "/diagnostics",
  "/maintenance",
  "/costs",
  "/cvt/cvt-gearbox-problems-symptoms",
  "/cvt/honda-cvt-jerking-judder",
  "/cvt/cvt-oil-change-guide",
  "/cvt/proton-saga-2026-punch-cvt-return",
  "/cvt/cvt-fuel-consumption-budi95",
  "/cvt/chinese-car-gearboxes-malaysia",
  "/cvt/perodua-dcvt-100k-km",
  "/automatic/gearbox-wont-shift-causes",
  "/automatic/automatic-gearbox-overhaul-guide",
  "/automatic/gearbox-oil-leak",
  "/automatic/hybrid-ecvt-dht-explained",
  "/diagnostics/gearbox-warning-light",
  "/diagnostics/how-gearbox-diagnosis-works",
  "/diagnostics/gearbox-fault-codes-explained",
  "/maintenance/gearbox-service-schedule-malaysia",
  "/maintenance/make-your-gearbox-last",
  "/maintenance/flooded-gearbox-what-to-do",
  "/costs/gearbox-repair-cost-malaysia",
  "/costs/overhaul-vs-replace-gearbox",
  "/costs/cvt-repair-vs-trade-in",
];

export const msTranslatedPaths = new Set(fullyTranslatedPaths);
export const zhTranslatedPaths = new Set(fullyTranslatedPaths);

/** Does this EN-canonical path exist in the given locale? */
export function isTranslated(locale: Locale, enPath: string): boolean {
  if (locale === "en") return true;
  if (locale === "ms") return msTranslatedPaths.has(enPath);
  return zhTranslatedPaths.has(enPath);
}

/** In-locale href when the page exists there, else the EN page. */
export function localeHref(locale: Locale, enPath: string): string {
  return isTranslated(locale, enPath) ? localePath(locale, enPath) : enPath;
}

/** Strip a locale prefix from a pathname → canonical EN path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  for (const l of ["ms", "zh"] as Locale[]) {
    if (pathname === `/${l}`) return { locale: l, path: "/" };
    if (pathname.startsWith(`/${l}/`)) return { locale: l, path: pathname.slice(l.length + 1) };
  }
  return { locale: "en", path: pathname };
}
