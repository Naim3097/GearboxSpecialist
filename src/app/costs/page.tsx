import { PillarPage } from "@/components/content/PillarPage";
import { getPillar } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const pillar = "costs" as const;

export function generateMetadata() {
  const info = getPillar(pillar)!;
  return pageMetadata({ title: info.title, description: info.description, path: `/${pillar}` });
}

export default function Page() {
  return <PillarPage pillar={pillar} />;
}
