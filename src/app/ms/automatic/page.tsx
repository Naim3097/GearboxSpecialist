import { PillarPage } from "@/components/content/PillarPage";
import { getPillar } from "@/lib/content";
import { pageMetadata, translationsFor } from "@/lib/seo";

const pillar = "automatic" as const;

export function generateMetadata() {
  const info = getPillar(pillar, "ms")!;
  return pageMetadata({
    title: info.title,
    description: info.description,
    path: `/ms/${pillar}`,
    translations: translationsFor(`/${pillar}`),
  });
}

export default function Page() {
  return <PillarPage pillar={pillar} locale="ms" />;
}
