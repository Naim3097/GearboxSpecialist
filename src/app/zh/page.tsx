import { pageMetadata, translationsFor } from "@/lib/seo";
import { HomeView } from "@/components/home/HomeView";

export const metadata = pageMetadata({
  title: "Gearbox Specialist — 马来西亚 CVT 与自动波箱专家",
  description:
    "CVT 和自动波箱问题、2026 年维修价钱、保养知识，为马来西亚车主而写。直接 WhatsApp 预约附近的波箱专家检测。",
  path: "/zh",
  translations: translationsFor("/"),
});

export default function ZhHomePage() {
  return <HomeView locale="zh" />;
}
