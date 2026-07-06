import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, getLocation } from "@/data/locations";
import { getArticles } from "@/lib/content";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";
import { StickyCTA } from "@/components/routing/StickyCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { autoRepairLd } from "@/lib/jsonld";
import { SetLocation } from "@/components/routing/SetLocation";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();
  return pageMetadata({
    title: `Gearbox Specialist ${loc.name} — CVT & Automatic Repair`,
    description: `Gearbox diagnosis and repair for ${loc.name}: ${loc.areas.slice(0, 4).join(", ")} and surrounding areas. CVT, automatic and DSG specialists with warranty.`,
    path: `/locations/${slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const routingContext = { location: slug };
  const guides = getArticles().slice(0, 4);

  return (
    <>
      {/* Visiting a location page is a location signal — remember it. */}
      <SetLocation slug={slug} />
      <JsonLd
        data={autoRepairLd({
          locationName: loc.name,
          path: `/locations/${slug}`,
          description: loc.intro,
        })}
      />

      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Locations", path: "/locations" },
              { name: loc.name, path: `/locations/${slug}` },
            ]}
          />
          <p className="mt-8 font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-red-hot">
            {loc.state}
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-4xl leading-[0.95] text-fog sm:text-6xl">
            {loc.name}
            <span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{loc.intro}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <section className="clip-card border border-line bg-panel p-6 sm:p-8">
          <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
            <span className="text-red">{"//"}</span> Sector coverage
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {loc.areas.map((a) => (
              <span
                key={a}
                className="clip-btn border border-line bg-panel-2 px-3.5 py-1.5 font-tech text-[12px] font-medium uppercase tracking-[0.1em] text-fog/80"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-muted">
            And everywhere between. If the car shouldn&apos;t be driven, say so when booking —
            collection can usually be arranged.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-fog sm:text-3xl">Bay services</h2>
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.slug} className="clip-card border border-line bg-panel p-6">
                <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                  <span className="text-red">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <p className="font-tech mt-2 text-[15px] font-semibold uppercase tracking-[0.04em] text-fog">
                  {s.name}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQ faqs={loc.faqs} heading={`Asked in ${loc.name}`} />

        <WorkshopCTA
          context={routingContext}
          placement="location-page"
          heading={`Book near ${loc.name}`}
          body="Road test, specialist scan and written findings before any repair is quoted. Same-week appointments, warranty on all work."
        />

        <section className="mt-4">
          <h2 className="font-display text-2xl text-fog">Read before you book</h2>
          <ul className="mt-6 space-y-3">
            {guides.map((a) => (
              <li key={a.path} className="flex items-baseline gap-3">
                <span aria-hidden className="font-tech text-[12px] text-red">
                  {"//"}
                </span>
                <Link
                  href={a.path}
                  className="font-tech text-[15px] font-medium text-fog underline decoration-red/50 underline-offset-4 transition-colors hover:text-red-hot"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <StickyCTA context={routingContext} label={`Gearbox trouble in ${loc.name}?`} />
    </>
  );
}
