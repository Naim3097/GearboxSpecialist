type JsonLdData = Record<string, unknown> | null;

/** Renders one or more JSON-LD blocks; silently skips null entries. */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean) as Record<string, unknown>[];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
