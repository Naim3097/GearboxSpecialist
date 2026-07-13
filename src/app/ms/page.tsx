import { pageMetadata, translationsFor } from "@/lib/seo";
import { HomeView } from "@/components/home/HomeView";

export const metadata = pageMetadata({
  title: "Gearbox Specialist — Pakar Gearbox CVT & Auto Malaysia",
  description:
    "Panduan lengkap masalah gearbox CVT dan auto, harga repair 2026 dan cara jaga gearbox, ditulis untuk pemandu Malaysia. Terus book diagnosis di bengkel pakar dekat anda.",
  path: "/ms",
  translations: translationsFor("/"),
});

export default function MsHomePage() {
  return <HomeView locale="ms" />;
}
