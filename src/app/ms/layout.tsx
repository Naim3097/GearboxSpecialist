import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/routing/FloatingWhatsApp";

export default function MsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="ms">
      <Header locale="ms" />
      <main className="flex-1">{children}</main>
      <Footer locale="ms" />
      <FloatingWhatsApp />
    </LocaleProvider>
  );
}
