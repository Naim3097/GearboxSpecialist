import { pageMetadata, translationsFor } from "@/lib/seo";
import { site } from "@/config/site";
import { HomeView } from "@/components/home/HomeView";

export const metadata = pageMetadata({
  title: `${site.name} — CVT & Automatic Gearbox Authority, Malaysia`,
  description: site.description,
  path: "/",
  translations: translationsFor("/"),
});

export default function HomePage() {
  return <HomeView locale="en" />;
}
