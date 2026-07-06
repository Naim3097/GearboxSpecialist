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
}: {
  context?: Omit<RoutingContext, "sourcePath" | "placement">;
  heading?: string;
  body?: string;
  placement?: string;
}) {
  return (
    <aside className="not-prose clip-card relative my-16 overflow-hidden border-l-4 border-red bg-panel-2">
      <div className="stripes px-7 py-10 sm:px-10 sm:py-12">
        <p className="font-tech text-[11px] font-medium uppercase tracking-[0.24em] text-red-hot">
          Workshop network
        </p>
        <h2 className="font-display mt-4 max-w-lg text-3xl text-fog sm:text-4xl">
          {heading ?? "Get it diagnosed properly"}
        </h2>
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-muted">
          {body ??
            "Road test and specialist scan before any repair is quoted. Same-day appointments across the Klang Valley, warranty on all work."}
        </p>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <WorkshopLink
            context={context}
            placement={placement}
            label="Book a diagnosis · {workshop}"
            className="clip-btn inline-flex items-center justify-center bg-red px-8 py-4 font-tech text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hot"
          />
          <LocationPicker />
        </div>
      </div>
    </aside>
  );
}
