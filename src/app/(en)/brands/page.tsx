import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { brands } from "@/data/brands";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";

export const metadata = pageMetadata({
  title: "Gearbox Problems & Repair by Car Brand",
  description:
    "Known gearbox issues, transmissions fitted and honest repair cost bands for every major car brand on Malaysian roads — Toyota to Porsche, Proton to Perodua.",
  path: "/brands",
});

export default function BrandsPage() {
  return (
    <>
      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Brands", path: "/brands" }]} />
          <h1 className="font-display mt-8 max-w-4xl text-4xl leading-[0.95] text-fog sm:text-6xl">
            The garage wall<span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
            Every brand has its own transmissions, its own weak points, its own repair economics.
            Pick yours.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {brands.map((b, i) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="clip-card group relative block border border-line bg-panel p-6 transition-colors hover:border-line-hi"
            >
              <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                <span className="text-red">{String(i + 1).padStart(2, "0")}</span> File
              </p>
              <p className="font-display mt-3 text-xl text-fog transition-colors group-hover:text-red-hot sm:text-2xl">
                {b.name}
              </p>
              <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted">
                {b.commonProblems[0]?.title}
              </p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ))}
        </div>

        <WorkshopCTA
          placement="brands-index"
          heading="Not sure what's fitted?"
          body="Give the workshop your model and year when you book — they'll know the gearbox, its history and its weak points before you arrive."
        />
      </div>
    </>
  );
}
