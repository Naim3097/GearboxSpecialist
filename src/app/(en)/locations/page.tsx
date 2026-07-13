import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { locations } from "@/data/locations";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";

export const metadata = pageMetadata({
  title: "Gearbox Specialist Near You — Klang Valley & Penang",
  description:
    "Find gearbox diagnosis and repair near you: Kuala Lumpur, Petaling Jaya, Shah Alam, Klang, Puchong, Cheras and the Klang Valley — plus Simpang Ampat and Penang up north.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }]} />
          <h1 className="font-display mt-8 max-w-4xl text-4xl leading-[0.95] text-fog sm:text-6xl">
            Pick your sector<span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
            Two regions, one standard: the Klang Valley from our Shah Alam bay, Penang and the
            north from Simpang Ampat — diagnosis-first, written warranty, wherever you drive.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l, i) => (
            <Link
              key={l.slug}
              href={`/locations/${l.slug}`}
              className="clip-card group relative block border border-line bg-panel p-6 transition-colors hover:border-line-hi"
            >
              <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                <span className="text-red">{String(i + 1).padStart(2, "0")}</span> {l.state}
              </p>
              <p className="font-display mt-3 text-2xl text-fog transition-colors group-hover:text-red-hot">
                {l.name}
              </p>
              <p className="mt-2 font-tech text-[11px] uppercase tracking-[0.1em] text-muted">
                {l.areas.slice(0, 4).join(" · ")}
              </p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ))}
          {/* Northern region — no area landing pages yet, so route to the workshop. */}
          <Link
            href="/workshops"
            className="clip-card group relative block border border-line border-l-4 border-l-red bg-panel p-6 transition-colors hover:border-line-hi"
          >
            <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              <span className="text-red">{String(locations.length + 1).padStart(2, "0")}</span>{" "}
              Pulau Pinang
            </p>
            <p className="font-display mt-3 text-2xl text-fog transition-colors group-hover:text-red-hot">
              Northern · Penang
            </p>
            <p className="mt-2 font-tech text-[11px] uppercase tracking-[0.1em] text-muted">
              Simpang Ampat · Seberang Perai · Bukit Mertajam · Butterworth
            </p>
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
            />
          </Link>
        </div>

        <WorkshopCTA
          placement="locations-index"
          heading="Off the map?"
          body="If your area isn't listed, book anyway — the network routes you to the nearest bay, and collection can often be arranged for cars that shouldn't be driven."
        />
      </div>
    </>
  );
}
