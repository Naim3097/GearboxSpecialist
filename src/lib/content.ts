import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-based MDX content system. Articles live in src/content/<pillar>/<slug>.mdx
 * with typed frontmatter. Designed so a headless CMS (Sanity/Payload) can
 * replace the fs layer in Phase 2 without touching templates.
 */

export type PillarSlug = "cvt" | "automatic" | "diagnostics" | "maintenance" | "costs";

export interface Pillar {
  slug: PillarSlug;
  name: string;
  title: string;
  description: string;
  service: string; // default routing service for this pillar
}

export const pillars: Pillar[] = [
  {
    slug: "cvt",
    name: "CVT Gearbox",
    title: "CVT Gearbox Problems, Repair & Maintenance",
    description:
      "Everything Malaysian drivers need to know about CVT gearboxes — judder, slipping, whining, repair costs and how to make a CVT last.",
    service: "cvt-repair",
  },
  {
    slug: "automatic",
    name: "Automatic Gearbox",
    title: "Automatic Gearbox Repair & Problems",
    description:
      "Conventional automatic and dual-clutch gearboxes explained — shifting problems, oil leaks, overhauls and what repairs really cost in Malaysia.",
    service: "automatic-repair",
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    title: "Gearbox Diagnostics & Warning Signs",
    description:
      "How gearbox faults are properly diagnosed — warning lights, fault codes, road tests and how to avoid paying for parts you don't need.",
    service: "diagnosis",
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    title: "Gearbox Maintenance & Service Intervals",
    description:
      "Service schedules, fluid choices and driving habits that decide whether your gearbox lasts 100,000 km or 300,000 km.",
    service: "oil-service",
  },
  {
    slug: "costs",
    name: "Repair Costs",
    title: "Gearbox Repair Costs in Malaysia",
    description:
      "Real-world price guides for gearbox diagnosis, repair and overhaul in Malaysia — what things cost and why.",
    service: "diagnosis",
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
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

export function getArticles(pillar?: PillarSlug): Article[] {
  const pillarDirs = pillar ? [pillar] : (pillars.map((p) => p.slug) as PillarSlug[]);
  const articles: Article[] = [];

  for (const dir of pillarDirs) {
    const abs = path.join(CONTENT_DIR, dir);
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
        path: `/${dir}/${slug}`,
        content,
        readingMinutes: Math.max(2, Math.round(content.split(/\s+/).length / 220)),
      });
    }
  }

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(pillar: PillarSlug, slug: string): Article | undefined {
  return getArticles(pillar).find((a) => a.slug === slug);
}
