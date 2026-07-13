import { pageMetadata, translationsFor } from "@/lib/seo";
import { WorkshopsView } from "@/components/workshops/WorkshopsView";

export const metadata = pageMetadata({
  title: "Bengkel Gearbox Kami — Rangkaian Pakar Seluruh Malaysia",
  description:
    "Rangkaian bengkel Gearbox Specialist: MNA Dynamic Torque (Alam Impian, Shah Alam) dan IM Dynamic Torque (Simpang Ampat, Pulau Pinang). Diagnosis dulu, semua kerja ada warranty.",
  path: "/ms/workshops",
  translations: translationsFor("/workshops"),
});

export default function MsWorkshopsPage() {
  return <WorkshopsView locale="ms" />;
}
