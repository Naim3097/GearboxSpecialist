import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/routing/FloatingWhatsApp";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="en">
      <Header locale="en" />
      <main className="flex-1">{children}</main>
      <Footer locale="en" />
      <FloatingWhatsApp />
    </LocaleProvider>
  );
}
