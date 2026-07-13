import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/routing/FloatingWhatsApp";

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="zh">
      <Header locale="zh" />
      <main className="flex-1">{children}</main>
      <Footer locale="zh" />
      <FloatingWhatsApp />
    </LocaleProvider>
  );
}
