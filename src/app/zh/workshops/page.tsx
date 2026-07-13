import { pageMetadata, translationsFor } from "@/lib/seo";
import { WorkshopsView } from "@/components/workshops/WorkshopsView";

export const metadata = pageMetadata({
  title: "合作修车厂 — 马来西亚波箱专家网络",
  description:
    "Gearbox Specialist 维修网络：MNA Dynamic Torque（莎阿南 Alam Impian）与 IM Dynamic Torque（槟城 Simpang Ampat）。先检测后报价，所有维修有保家。",
  path: "/zh/workshops",
  translations: translationsFor("/workshops"),
});

export default function ZhWorkshopsPage() {
  return <WorkshopsView locale="zh" />;
}
