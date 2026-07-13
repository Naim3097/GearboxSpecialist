import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { WorkshopLink } from "@/components/routing/WorkshopLink";
import { LocationPicker } from "@/components/routing/LocationPicker";
import type { RoutingContext } from "@/lib/routing";

/**
 * The routing module that closes every content page. Angular panel,
 * pit-lane texture, one unmistakable action. Server wrapper — the
 * interactive parts are client islands.
 */
export function WorkshopCTA({
  context = {},
  heading,
  body,
  placement = "inline",
  locale = "en",
}: {
  context?: Omit<RoutingContext, "sourcePath" | "placement">;
  heading?: string;
  body?: string;
  placement?: string;
  locale?: Locale;
}) {
  const t = getDict(locale);

  return (
    <aside className="not-prose clip-card relative my-16 overflow-hidden border-l-4 border-red bg-panel-2">
      <div className="stripes px-7 py-10 sm:px-10 sm:py-12">
        <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-red-hot">
          {t.ctaKicker}
        </p>
        <h2 className="font-display mt-4 max-w-lg text-3xl text-fog sm:text-4xl">
          {heading ?? t.ctaHeading}
        </h2>
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-muted">{body ?? t.ctaBody}</p>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Static label — resolved workshop shows in the picker and the WhatsApp
              pre-fill, not in this text, to avoid post-hydration label flips. */}
          <WorkshopLink
            context={context}
            placement={placement}
            label={t.ctaLabelIdle}
            className="clip-btn inline-flex items-center justify-center bg-red px-8 py-4 font-tech text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot"
          />
          <LocationPicker />
        </div>
      </div>
    </aside>
  );
}
