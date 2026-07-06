const ITEMS = [
  "Honda CVT judder",
  "JATCO rebuild",
  "ZF 8HP",
  "DSG mechatronic",
  "722.9 conductor plate",
  "Punch CVT",
  "Torque converter",
  "Valve body",
  "PowerShift DPS6",
  "D-CVT",
  "7DCT clutch",
  "Multitronic",
];

/**
 * Pit-wall data strip. Pure CSS marquee — pauses under reduced motion,
 * duplicated list is aria-hidden so screen readers hear it once.
 */
export function Ticker() {
  const strip = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 pr-6 font-tech text-[12px] font-medium uppercase tracking-[0.2em] text-muted"
        >
          {item}
          <span className="text-red">{"//"}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-line bg-panel py-3">
      <div className="marquee">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
