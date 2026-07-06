# GearboxSpecialist.com

Malaysia's gearbox authority hub. Captures organic search traffic with specialist content and routes high-intent visitors to workshop landing pages — that outbound click is the site's primary conversion event.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · MDX (gray-matter + next-mdx-remote) · fully static output (SSG).

```bash
npm run dev     # local dev on :3000
npm run build   # production build (55 static pages)
npm run lint
```

## The one thing to understand first: the routing layer

Every path to a workshop goes through one pipeline:

```
src/config/workshops.json   ← EDIT THIS to change destinations (no code changes)
src/lib/routing.ts          ← resolver: (service × brand × location) → workshop + handoff URL
src/components/routing/WorkshopLink.tsx  ← the only component that renders outbound links
```

- **`workshops.json`** holds the real workshop network — MNA Dynamic Torque (Shah Alam), IM Dynamic Torque (Pulau Pinang), Overhaulin Yard (Kedah), D7Teen (Johor) — with display metadata (`town`, `state`, `region`, `specialties`) that also drives the homepage network section and `/workshops` directory. `landingUrl` values are **placeholders** (`workshop.example.com`) until the real landing-page URLs are supplied — swap them there and redeploy. Matching supports `"*"` wildcards; location beats brand beats service; passing `workshopId` in the routing context (used by workshop cards) short-circuits straight to that workshop.
- **Handoff URLs** carry `utm_source/medium/campaign/content` plus `service`, `vehicle`, `area` params so the landing page can feel continuous. **Never add personal data.**
- **Location memory:** visitors pick an area once (`LocationPicker`, persisted in localStorage as `gs-location`); every CTA site-wide re-resolves live. Visiting a location page sets it implicitly (`SetLocation`) without overwriting an explicit choice.
- **Analytics:** every outbound click fires `trackWorkshopClick` → GTM `dataLayer` (`workshop_click` event) **and** a first-party beacon to `/api/track` (currently a stub — wire to an event store in `src/app/api/track/route.ts`).

CTA components: `WorkshopCTA` (editorial block closing every content page), `StickyCTA` (scroll-depth bar on long pages), plus header/footer/mobile placements. Placement names flow into `utm_content` for per-CTA attribution.

## Content system

Articles are MDX files in `src/content/<pillar>/<slug>.mdx` with typed frontmatter (see `src/lib/content.ts`): `title`, `description`, `date`, `updated`, `service` (CTA routing), `brands` (routing + internal links), `faqs` (rendered + FAQPage JSON-LD), `featured`.

Pillars: `cvt` · `automatic` · `diagnostics` · `maintenance` · `costs` — defined in `src/lib/content.ts`. Adding an `.mdx` file to a pillar folder publishes it (routes, sitemap, pillar hub, related-article links all pick it up automatically). The fs loader is deliberately isolated so a headless CMS (Sanity/Payload) can replace it in Phase 2 without touching templates.

Programmatic pages are data-driven:
- `/brands/[brand]` ← `src/data/brands.ts` (16 brands: transmissions fitted, known faults, cost bands, FAQs)
- `/locations/[location]` ← `src/data/locations.ts` (12 Klang Valley areas)

## SEO baseline

- Per-page canonical + OG + Twitter metadata via `src/lib/seo.ts` (`pageMetadata`)
- JSON-LD everywhere via `src/lib/jsonld.ts`: Organization + WebSite (root layout), Article, FAQPage, BreadcrumbList, Service (pillars/brands), AutoRepair (locations)
- `sitemap.ts` / `robots.ts` generate `/sitemap.xml` and `/robots.txt`
- **i18n (Phase 2-ready):** locales configured in `src/config/site.ts`. Only `en` is in `activeLocales`; adding `ms`/`zh` emits hreflang alternates site-wide automatically. Planned URL shape: `/ms/...`, `/zh/...`.

## Architecture decisions on record

- **Feeder sites (coexist vs 301-consolidate):** undecided upstream. The hub is safe under both: every page has a self-referencing canonical, URLs are stable/semantic, and nothing assumes a single-domain history. If consolidation happens, 301 feeder URLs to the closest hub guide.
- **Booking/payment stays on workshop landing pages** (v1) — the hub only routes.
- **Design:** hand-built motorsport system — carbon blacks (`carbon`/`panel`/`panel-2`), racing red (`red`/`red-hot`), Archivo Black display (always uppercase via `.font-display`), Chakra Petch technical labels (`.font-tech`), Inter body. Angular language via `.clip-card`/`.clip-btn` clip-paths, `.stripes` hazard texture, `.text-outline` ghost numerals, `.marquee` ticker. Tokens in `src/app/globals.css` under `@theme`. Homepage is a bento grid of visual modules; hierarchy is visual, copy is minimal. Unsplash placeholders until brand photography arrives (allowed host configured in `next.config.ts`).
- Site identity, phone, socials: `src/config/site.ts` (phone is a placeholder).

## Known gotcha

Turbopack's JSX transform in Next 16.2 drops the boundary space between a `{expression}` and adjacent text **when that text run contains HTML entities** (`&amp;`, `&ldquo;`…). Symptom: "Volkswagengearbox". Workaround used in this codebase: template literals for mixed expression+entity runs. Check new templates for swallowed spaces.

## Phase 1 status

Shipped: motorsport design system, routing layer + analytics events, 11 EN cornerstone articles, 5 pillar hubs, 16 brand pages, 12 location pages, `/workshops` directory + homepage network section (4 real workshops), about, SEO baseline, 56-page static build.
Awaiting from us: real workshop landing-page URLs (names/towns are in; URLs still placeholders), branding/photography, analytics event store choice, feeder-site decision. Note: the LocationPicker still lists Klang Valley areas only — Penang/Kedah/Johor location pages are a Phase 2 content task; until then, northern/southern visitors reach their workshop via the workshop cards.
