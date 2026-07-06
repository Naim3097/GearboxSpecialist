import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getArticles, pillars } from "@/lib/content";
import { brands } from "@/data/brands";
import { locations } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/workshops"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/brands"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/locations"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const pillarPages: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: absoluteUrl(`/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const articlePages: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: absoluteUrl(a.path),
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "monthly",
    priority: a.featured ? 0.9 : 0.7,
  }));

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: absoluteUrl(`/brands/${b.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: absoluteUrl(`/locations/${l.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...pillarPages, ...articlePages, ...brandPages, ...locationPages];
}
