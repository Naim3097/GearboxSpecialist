"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/config/site";
import { localeNames, localePath, isTranslated, stripLocale } from "@/lib/i18n";
import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * EN / BM / 中文 toggle. Links to the same page in the other language when a
 * translation exists, otherwise to that language's home.
 */
export function LanguageSwitcher() {
  const current = useLocale();
  const pathname = usePathname();
  const { path } = stripLocale(pathname);

  const locales: Locale[] = ["en", "ms", "zh"];

  return (
    <div className="flex items-center gap-2 font-tech text-[11px] font-semibold uppercase tracking-[0.12em]">
      {locales.map((l, i) => {
        const href = isTranslated(l, path) ? localePath(l, path) : localePath(l, "/");
        return (
          <span key={l} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-line-hi">
                /
              </span>
            )}
            {l === current ? (
              <span aria-current="true" className="text-red-hot">
                {localeNames[l]}
              </span>
            ) : (
              <Link
                href={href}
                lang={l}
                className="text-muted transition-colors hover:text-fog"
              >
                {localeNames[l]}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
