"use client";

import { useEffect, useState } from "react";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { getDict } from "@/lib/i18n";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { RoutingContext } from "@/lib/routing";

/**
 * Persistent booking action for long-form pages. Appears after meaningful
 * scroll depth; a pit-wall strip, not a banner.
 */
export function StickyCTA({
  context = {},
  label,
}: {
  context?: Omit<RoutingContext, "sourcePath" | "placement">;
  label?: string;
}) {
  const [visible, setVisible] = useState(false);
  const locale = useLocale();
  const t = getDict(locale);

  useEffect(() => {
    const onScroll = () => {
      const depth = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      setVisible(depth > 0.18 && depth < 0.92);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 border-t-2 border-red bg-carbon/95 px-5 py-4 backdrop-blur-md sm:mb-6 sm:border-x sm:border-x-line">
        <p className="hidden font-tech text-[12px] uppercase tracking-[0.1em] text-muted sm:block">
          {label ?? t.stickyDefault}
        </p>
        <WorkshopLink
          context={context}
          placement="sticky"
          className="clip-btn w-full whitespace-nowrap bg-red px-7 py-3 text-center font-tech text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot sm:w-auto"
        >
          {t.bookDiagnosis}
        </WorkshopLink>
      </div>
    </div>
  );
}
