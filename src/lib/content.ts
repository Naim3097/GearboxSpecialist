import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/config/site";

/**
 * File-based MDX content system. EN articles live in src/content/<pillar>/,
 * translations in src/content/<locale>/<pillar>/ with the SAME slug (that's
 * how hreflang pairs are derived). Designed so a headless CMS can replace
 * the fs layer later without touching templates.
 */

export type PillarSlug = "cvt" | "automatic" | "diagnostics" | "maintenance" | "costs";

interface PillarCopy {
  name: string;
  title: string;
  description: string;
}

export interface Pillar extends PillarCopy {
  slug: PillarSlug;
  service: string; // default routing service for this pillar
  /** Native copy per non-EN locale. */
  i18n?: Partial<Record<Exclude<Locale, "en">, PillarCopy>>;
}

export const pillars: Pillar[] = [
  {
    slug: "cvt",
    name: "CVT Gearbox",
    title: "CVT Gearbox Problems, Repair & Maintenance",
    description:
      "Everything Malaysian drivers need to know about CVT gearboxes — judder, slipping, whining, repair costs and how to make a CVT last.",
    service: "cvt-repair",
    i18n: {
      ms: {
        name: "Gearbox CVT",
        title: "Masalah Gearbox CVT: Simptom, Repair & Penjagaan",
        description:
          "Semua yang pemandu Malaysia perlu tahu pasal gearbox CVT. Gegar, slip, bunyi berdengung, harga repair dan macam mana nak buat CVT tahan lama.",
      },
      zh: {
        name: "CVT 波箱",
        title: "CVT 波箱问题、维修与保养",
        description:
          "CVT 波箱抖动、打滑、异响、维修价钱，以及怎样让 CVT 更耐用。马来西亚车主必读。",
      },
    },
  },
  {
    slug: "automatic",
    name: "Automatic Gearbox",
    title: "Automatic Gearbox Repair & Problems",
    description:
      "Conventional automatic and dual-clutch gearboxes explained — shifting problems, oil leaks, overhauls and what repairs really cost in Malaysia.",
    service: "automatic-repair",
    i18n: {
      ms: {
        name: "Gearbox Auto",
        title: "Repair Gearbox Auto & Masalah Biasa",
        description:
          "Gearbox auto biasa dan dual-clutch. Masalah tukar gear, minyak bocor, overhaul dan berapa harga sebenar kat Malaysia.",
      },
      zh: {
        name: "自动波箱",
        title: "自动波箱维修与常见问题",
        description:
          "传统自动波箱和双离合波箱：换挡问题、漏油、大修，以及在马来西亚的真实维修价钱。",
      },
    },
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    title: "Gearbox Diagnostics & Warning Signs",
    description:
      "How gearbox faults are properly diagnosed — warning lights, fault codes, road tests and how to avoid paying for parts you don't need.",
    service: "diagnosis",
    i18n: {
      ms: {
        name: "Diagnosis",
        title: "Diagnosis Gearbox & Tanda-tanda Awal",
        description:
          "Macam mana masalah gearbox didiagnosis dengan betul. Lampu warning, fault code, road test dan cara elak bayar untuk part yang tak perlu.",
      },
      zh: {
        name: "检测",
        title: "波箱检测与故障征兆",
        description:
          "波箱故障如何正确检测：警告灯、故障码、路试，以及怎样避免为不需要的零件买单。",
      },
    },
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    title: "Gearbox Maintenance & Service Intervals",
    description:
      "Service schedules, fluid choices and driving habits that decide whether your gearbox lasts 100,000 km or 300,000 km.",
    service: "oil-service",
    i18n: {
      ms: {
        name: "Maintenance",
        title: "Maintenance Gearbox & Jadual Tukar Minyak",
        description:
          "Jadual servis, pilihan minyak gearbox dan cara pandu yang menentukan gearbox anda tahan 100,000 km atau 300,000 km.",
      },
      zh: {
        name: "保养",
        title: "波箱保养与换油周期",
        description: "换油周期、油品选择和驾驶习惯，决定你的波箱是撑十万公里还是三十万公里。",
      },
    },
  },
  {
    slug: "costs",
    name: "Repair Costs",
    title: "Gearbox Repair Costs in Malaysia",
    description:
      "Real-world price guides for gearbox diagnosis, repair and overhaul in Malaysia — what things cost and why.",
    service: "diagnosis",
    i18n: {
      ms: {
        name: "Harga Repair",
        title: "Harga Repair Gearbox di Malaysia",
        description:
          "Panduan harga sebenar untuk diagnosis, repair dan overhaul gearbox di Malaysia. Berapa kosnya, dan kenapa.",
      },
      zh: {
        name: "维修价钱",
        title: "马来西亚波箱维修价钱",
        description: "马来西亚波箱检测、维修与大修的真实价钱指南，让你报价前心里有数。",
      },
    },
  },
];

/** Pillar with copy resolved for a locale (falls back to EN copy). */
export function getPillar(slug: string, locale: Locale = "en"): Pillar | undefined {
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) return undefined;
  if (locale === "en") return pillar;
  const copy = pillar.i18n?.[locale];
  return copy ? { ...pillar, ...copy } : pillar;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  /** Brand slugs this article relates to (drives routing + internal links). */
  brands?: string[];
  /** Service slug used for CTA routing. Falls back to the pillar default. */
  service?: string;
  faqs?: { q: string; a: string }[];
  featured?: boolean;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  pillar: PillarSlug;
  path: string;
  content: string;
  readingMinutes: number;
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export function getArticles(pillar?: PillarSlug, locale: Locale = "en"): Article[] {
  const pillarDirs = pillar ? [pillar] : (pillars.map((p) => p.slug) as PillarSlug[]);
  const localeDir = locale === "en" ? CONTENT_DIR : path.join(CONTENT_DIR, locale);
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  const articles: Article[] = [];

  for (const dir of pillarDirs) {
    const abs = path.join(localeDir, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of fs.readdirSync(abs)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(abs, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as ArticleFrontmatter;
      articles.push({
        ...fm,
        slug,
        pillar: dir,
        path: `${pathPrefix}/${dir}/${slug}`,
        content,
        readingMinutes: Math.max(2, Math.round(content.split(/\s+/).length / 220)),
      });
    }
  }

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(pillar: PillarSlug, slug: string, locale: Locale = "en"): Article | undefined {
  return getArticles(pillar, locale).find((a) => a.slug === slug);
}
