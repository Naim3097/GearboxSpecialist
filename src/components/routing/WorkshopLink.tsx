"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { routeToWorkshop, type RoutingContext } from "@/lib/routing";
import { trackWorkshopClick } from "@/lib/analytics";
import { getStoredLocation, getServerLocation, subscribeLocation } from "@/lib/location";
import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * The atomic outbound link. Every path to a workshop landing page goes
 * through this component: it resolves the best workshop for the current
 * context (including the visitor's remembered location), builds the handoff
 * URL and reports the click as the primary conversion event.
 */
export function WorkshopLink({
  context = {},
  placement,
  className,
  label,
  labelIdle,
  children,
}: {
  context?: Omit<RoutingContext, "sourcePath" | "placement">;
  placement: string;
  className?: string;
  /** Alternative to children: a template where "{workshop}" becomes the resolved workshop's short name. Serializable, so usable from Server Components. */
  label?: string;
  /** Shown instead of `label` while nothing pins the workshop choice (no picked area, no explicit workshop) — avoids presenting the default bay as if the visitor chose it. */
  labelIdle?: string;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const storedLocation = useSyncExternalStore(subscribeLocation, getStoredLocation, getServerLocation);

  const ctx: RoutingContext = {
    ...context,
    location: context.location ?? storedLocation ?? undefined,
    sourcePath: pathname,
    placement,
    locale,
  };
  const { workshop, href } = routeToWorkshop(ctx);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() =>
        trackWorkshopClick({
          workshopId: workshop.id,
          href,
          sourcePath: pathname,
          placement,
          service: ctx.service,
          brand: ctx.brand,
          location: ctx.location,
          locale,
        })
      }
    >
      {label
        ? !ctx.workshopId && !ctx.location && labelIdle
          ? labelIdle
          : label.replace("{workshop}", workshop.shortName)
        : children}
    </a>
  );
}
