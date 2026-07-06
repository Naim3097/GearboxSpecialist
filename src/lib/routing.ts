import workshopsConfig from "@/config/workshops.json";

/**
 * The workshop routing layer — the hub's single most important piece of logic.
 * Resolves (service × brand × location) to the best workshop landing page and
 * builds the outbound handoff URL with campaign context (never personal data).
 *
 * Config lives in src/config/workshops.json so destinations are editable
 * without touching code. It is deliberately isomorphic: the same resolver runs
 * in Server Components (static CTAs) and in the client (location-aware CTAs).
 */

export interface Workshop {
  id: string;
  name: string;
  shortName: string;
  landingUrl: string;
  town: string;
  state: string;
  region: string;
  specialties: string[];
  locations: string[];
  brands: string[];
  services: string[];
  priority: number;
}

export interface RoutingContext {
  /** Route directly to a specific workshop (workshop cards). Skips matching. */
  workshopId?: string;
  /** Service slug, e.g. "cvt-repair" */
  service?: string;
  /** Brand slug, e.g. "honda" */
  brand?: string;
  /** Location slug, e.g. "petaling-jaya" */
  location?: string;
  /** Page path that originated the click, for attribution */
  sourcePath?: string;
  /** CTA placement identifier, e.g. "sticky", "inline", "hero" */
  placement?: string;
}

interface WorkshopsConfig {
  defaultWorkshopId: string;
  utm: { source: string; medium: string };
  workshops: Workshop[];
}

const config = workshopsConfig as unknown as WorkshopsConfig;

export function getWorkshops(): Workshop[] {
  return config.workshops;
}

function matches(list: string[], value?: string): "exact" | "wildcard" | "none" {
  if (list.includes("*")) return "wildcard";
  if (value && list.includes(value)) return "exact";
  return "none";
}

/**
 * Score-based matcher. Location is the strongest signal (people choose
 * workshops by distance), then brand (continental specialists), then service.
 * A workshop is only excluded when it explicitly lists values that don't match.
 */
export function resolveWorkshop(ctx: RoutingContext = {}): Workshop {
  if (ctx.workshopId) {
    const direct = config.workshops.find((w) => w.id === ctx.workshopId);
    if (direct) return direct;
  }

  let best: { workshop: Workshop; score: number } | null = null;

  for (const w of config.workshops) {
    const loc = matches(w.locations, ctx.location);
    const brand = matches(w.brands, ctx.brand);
    const service = matches(w.services, ctx.service);

    // Exclude only when the visitor's known value contradicts an explicit list.
    if (ctx.location && loc === "none") continue;
    if (ctx.brand && brand === "none") continue;
    if (ctx.service && service === "none") continue;

    let score = 0;
    if (loc === "exact") score += 100;
    if (brand === "exact") score += 50;
    if (service === "exact") score += 20;
    // Lower priority number wins ties.
    score += Math.max(0, 10 - w.priority);

    if (!best || score > best.score) best = { workshop: w, score };
  }

  return (
    best?.workshop ??
    config.workshops.find((w) => w.id === config.defaultWorkshopId) ??
    config.workshops[0]
  );
}

/**
 * Builds the outbound handoff URL. Passes service/vehicle/location context so
 * the landing page can feel continuous — strictly no personal data.
 */
export function buildHandoffUrl(workshop: Workshop, ctx: RoutingContext = {}): string {
  const url = new URL(workshop.landingUrl);
  url.searchParams.set("utm_source", config.utm.source);
  url.searchParams.set("utm_medium", config.utm.medium);
  if (ctx.sourcePath) url.searchParams.set("utm_campaign", ctx.sourcePath);
  if (ctx.placement) url.searchParams.set("utm_content", ctx.placement);
  if (ctx.service) url.searchParams.set("service", ctx.service);
  if (ctx.brand) url.searchParams.set("vehicle", ctx.brand);
  if (ctx.location) url.searchParams.set("area", ctx.location);
  return url.toString();
}

/** One-call convenience used by CTA components. */
export function routeToWorkshop(ctx: RoutingContext = {}): {
  workshop: Workshop;
  href: string;
} {
  const workshop = resolveWorkshop(ctx);
  return { workshop, href: buildHandoffUrl(workshop, ctx) };
}
