import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav
        aria-label="Breadcrumb"
        className="font-tech text-[11px] font-medium uppercase tracking-[0.16em] text-muted"
      >
        <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2.5">
                {last ? (
                  <span aria-current="page" className="text-fog/50">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-fog">
                      {item.name}
                    </Link>
                    <span aria-hidden className="text-red">
                      {"//"}
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
