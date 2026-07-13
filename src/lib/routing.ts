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
  /** Optional photo path under /public (e.g. "/workshops/mna.jpg"). Cards show a styled placeholder until set. */
  image?: string;
  /** Google Business Profile share link — surfaces as "Google Reviews" on cards. */
  gbpUrl?: string;
  /** Location slug stored when the visitor picks this workshop's region. */
  pickerValue?: string;
  /** Region-selector label per locale (en/ms/zh). */
  pickerLabel?: Record<string, string>;
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
  /** Page locale — sets the language of the WhatsApp pre-fill. */
  locale?: "en" | "ms" | "zh";
}

interface WorkshopsConfig {
  defaultWorkshopId: string;
  contact?: {
    mode: "landing" | "whatsapp";
    whatsappNumber: string;
  };
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

/** Slugs → human words ("cvt-repair" → "CVT Repair"). */
const ACRONYMS = new Set(["cvt", "dct", "dsg", "at", "bmw", "vw", "kl"]);
export function slugTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/** Pre-filled WhatsApp message in the page's language, built from context. */
function buildWhatsappMessage(workshop: Workshop, ctx: RoutingContext): string {
  const templates = {
    en: {
      greeting: `Hi Gearbox Specialist! I'd like to book a gearbox diagnosis at ${workshop.name} (${workshop.town}).`,
      service: "Service",
      car: "Car",
      area: "My area",
    },
    ms: {
      greeting: `Hi Gearbox Specialist! Saya nak book diagnosis gearbox di ${workshop.name} (${workshop.town}).`,
      service: "Servis",
      car: "Kereta",
      area: "Kawasan saya",
    },
    zh: {
      greeting: `你好！我想在 ${workshop.name}（${workshop.town}）预约波箱检测。`,
      service: "服务",
      car: "车型",
      area: "我的地区",
    },
  };
  const t = templates[ctx.locale ?? "en"];

  const lines = [t.greeting];
  if (ctx.service) lines.push(`${t.service}: ${slugTitle(ctx.service)}`);
  if (ctx.brand) lines.push(`${t.car}: ${slugTitle(ctx.brand)}`);
  if (ctx.location) lines.push(`${t.area}: ${slugTitle(ctx.location)}`);
  if (ctx.sourcePath && ctx.sourcePath !== "/") lines.push(`Ref: ${ctx.sourcePath}`);
  return lines.join("\n");
}

/**
 * Builds the outbound handoff URL. Passes service/vehicle/location context so
 * the handoff feels continuous — strictly no personal data.
 *
 * While contact.mode is "whatsapp" (landing pages not live yet), every CTA
 * resolves to a wa.me link with a pre-filled, context-aware message instead.
 */
export function buildHandoffUrl(workshop: Workshop, ctx: RoutingContext = {}): string {
  if (config.contact?.mode === "whatsapp") {
    const text = buildWhatsappMessage(workshop, ctx);
    return `https://wa.me/${config.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

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
