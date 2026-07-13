import { pageMetadata, translationsFor } from "@/lib/seo";
import { WorkshopsView } from "@/components/workshops/WorkshopsView";

export const metadata = pageMetadata({
  title: "Partner Workshops — Gearbox Specialists Across Malaysia",
  description:
    "The Gearbox Specialist workshop network: MNA Dynamic Torque (Alam Impian, Shah Alam) and IM Dynamic Torque (Simpang Ampat, Pulau Pinang). Diagnosis-first, warranty on all work.",
  path: "/workshops",
  translations: translationsFor("/workshops"),
});

export default function WorkshopsPage() {
  return <WorkshopsView locale="en" />;
}
