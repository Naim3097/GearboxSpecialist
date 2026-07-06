"use client";

/**
 * Outbound workshop clicks are the site's primary conversion event.
 * Every CTA must report through trackWorkshopClick — no silent exits.
 *
 * Events go to (1) the GTM dataLayer if present, and (2) a first-party
 * beacon endpoint so we own the raw event stream regardless of tag setup.
 */

export interface WorkshopClickEvent {
  workshopId: string;
  href: string;
  sourcePath: string;
  placement: string;
  service?: string;
  brand?: string;
  location?: string;
  locale?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackWorkshopClick(event: WorkshopClickEvent): void {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "workshop_click",
      ...event,
    });

    const payload = JSON.stringify({
      type: "workshop_click",
      ts: Date.now(),
      ...event,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  } catch {
    // Analytics must never block the handoff.
  }
}
