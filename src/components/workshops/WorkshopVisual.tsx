import Image from "next/image";
import type { Workshop } from "@/lib/routing";

/**
 * Workshop photo slot. Renders the real photo when `image` is set in
 * workshops.json; until then, a deliberate placeholder that holds the
 * layout so photos can drop in without a redesign.
 */
export function WorkshopVisual({ workshop, index }: { workshop: Workshop; index: string }) {
  if (workshop.image) {
    return (
      <div className="relative h-44 overflow-hidden border-b border-line sm:h-52">
        <Image
          src={workshop.image}
          alt={`${workshop.name} — ${workshop.town}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
      </div>
    );
  }
  return (
    <div className="stripes relative flex h-44 items-center justify-between border-b border-line bg-panel-2 px-7 sm:h-52">
      <p aria-hidden className="font-display text-outline text-7xl sm:text-8xl">
        {index}
      </p>
      <p className="font-tech text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        Bay photo <span className="text-red">{"//"}</span> incoming
      </p>
    </div>
  );
}
