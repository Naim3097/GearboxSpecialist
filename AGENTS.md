<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CVTSpecialist.com — project rules

Read README.md for architecture. The non-negotiables:

1. **Every page must route to a workshop.** No dead ends: content pages end in `WorkshopCTA`; long pages add `StickyCTA`. All outbound workshop links go through `WorkshopLink` (never a raw `<a>`), so the click is tracked and the URL resolved from `src/config/workshops.json`.
2. **Workshop landing-page URLs live in `src/config/workshops.json` only.** Never hard-code them. Never put personal data in handoff URLs.
3. **The hub never links out to feeder sites as a CTA.** Feeders link in; the hub routes to workshops only.
4. **SEO is load-bearing:** new pages use `pageMetadata()` from `src/lib/seo.ts` and emit appropriate JSON-LD from `src/lib/jsonld.ts`; add them to `sitemap.ts` sources if they aren't generated from content/data files.
5. **Design system:** dark motorsport identity — tokens in `globals.css` `@theme` (carbon/panel/fog/muted/red, Archivo Black display + Chakra Petch labels + Inter body). Angular: `.clip-card`, `.clip-btn`, `.stripes`, red `//` separators, numbered labels. Visual-first, minimal copy, no editorial/news-site formatting, no emoji or decorative icons. Match the register of the homepage bento modules.
6. **Content:** articles are MDX in `src/content/<pillar>/` with typed frontmatter (`src/lib/content.ts`). Programmatic pages must stay genuinely useful — no thin templating.
7. **Turbopack gotcha:** a space between `{expr}` and text vanishes when the text run contains HTML entities — use template literals there (see README "Known gotcha").

