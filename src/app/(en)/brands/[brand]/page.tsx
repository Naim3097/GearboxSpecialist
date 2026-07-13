import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/data/brands";
import { getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { FAQ } from "@/components/content/FAQ";
import { WorkshopCTA } from "@/components/routing/WorkshopCTA";
import { StickyCTA } from "@/components/routing/StickyCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceLd } from "@/lib/jsonld";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  return pageMetadata({
    title: `${brand.name} Gearbox Problems & Repair in Malaysia`,
    description: `${brand.name} transmissions explained: known problems, repair costs and specialist advice for ${brand.popularModels.slice(0, 3).join(", ")} and more.`,
    path: `/brands/${slug}`,
  });
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const related = getArticles().filter((a) => a.brands?.includes(slug)).slice(0, 3);
  const routingContext = { brand: slug };

  return (
    <>
      <JsonLd
        data={serviceLd({
          name: `${brand.name} Gearbox Repair`,
          description: brand.intro,
          path: `/brands/${slug}`,
        })}
      />

      <header className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Brands", path: "/brands" },
              { name: brand.name, path: `/brands/${slug}` },
            ]}
          />
          <h1 className="font-display mt-8 max-w-4xl text-3xl leading-[0.95] text-fog sm:text-6xl">
            {brand.name}
            <span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{brand.intro}</p>
          <p className="mt-8 font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-fog/50">
            {brand.popularModels.join(" · ")}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Transmissions fitted — spec sheet */}
        <section>
          <h2 className="font-display text-2xl text-fog sm:text-3xl">
            {`What's fitted`}
          </h2>
          <div className="clip-card mt-6 overflow-x-auto border border-line bg-panel">
            <table className="w-full min-w-[640px] border-collapse text-[13px] leading-relaxed">
              <thead>
                <tr className="border-b-2 border-red text-left font-tech uppercase tracking-[0.08em]">
                  <th className="px-5 py-4 font-semibold text-fog">Unit</th>
                  <th className="px-5 py-4 font-semibold text-fog">Type</th>
                  <th className="px-5 py-4 font-semibold text-fog">Found in</th>
                  <th className="px-5 py-4 font-semibold text-fog">Specialist note</th>
                </tr>
              </thead>
              <tbody>
                {brand.transmissions.map((t) => (
                  <tr key={t.name} className="border-b border-line align-top last:border-0">
                    <td className="px-5 py-4 font-tech font-medium text-fog">{t.name}</td>
                    <td className="px-5 py-4 text-muted">{t.type}</td>
                    <td className="px-5 py-4 text-muted">{t.foundIn}</td>
                    <td className="px-5 py-4 text-muted">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Known problems — fault modules */}
        <section className="mt-16">
          <h2 className="font-display text-2xl text-fog sm:text-3xl">Known failure modes</h2>
          <div className="mt-6 grid gap-2 md:grid-cols-3">
            {brand.commonProblems.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="clip-card h-full border border-line border-l-red border-l-4 bg-panel p-6">
                  <p className="font-tech text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                    Fault {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-tech mt-3 text-[15px] font-semibold leading-snug text-fog">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Cost band */}
        <section className="clip-card stripes mt-16 border border-line bg-panel-2 p-8 sm:p-10">
          <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-red-hot">
            Cost band · Malaysia
          </p>
          <p className="font-display mt-4 text-2xl leading-tight text-fog sm:text-3xl">
            {brand.costBand}
          </p>
          <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-muted">
            Exact pricing depends on the diagnosis — see the{" "}
            <Link
              href="/costs/gearbox-repair-cost-malaysia"
              className="text-red-hot underline underline-offset-4 hover:text-fog"
            >
              full 2026 cost guide
            </Link>{" "}
            for how quotes are built and the questions that keep them honest.
          </p>
        </section>

        <FAQ faqs={brand.faqs} heading={`${brand.name} owners ask`} />

        <WorkshopCTA
          context={routingContext}
          placement="brand-page"
          heading={`${brand.name} gearbox diagnosis`}
          body={`Our partner workshops see ${brand.name} transmissions weekly — the known faults, the updated parts, the fixes that last. Diagnosis first, quote after.`}
        />

        {related.length > 0 && (
          <section className="mt-4">
            <h2 className="font-display text-2xl text-fog">Intel on {brand.name}</h2>
            <ul className="mt-6 space-y-3">
              {related.map((a) => (
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
        )}
      </div>

      <StickyCTA context={routingContext} label={`${brand.name} gearbox trouble?`} />
    </>
  );
}
