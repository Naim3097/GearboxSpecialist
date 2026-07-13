import type { Metadata } from "next";
import { Archivo_Black, Chakra_Petch, Inter } from "next/font/google";
import { site } from "@/config/site";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  weight: ["400", "500", "600"],
  variable: "--font-chakra",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

/**
 * Root layout: document shell only. The site chrome (Header/Footer/FAB) lives
 * in the locale group layouts — (en), ms, zh — so every page renders chrome
 * in its own language. The html lang attribute stays "en" as the site
 * default; per-page hreflang alternates carry the locale signal for search.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${chakraPetch.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {children}
      </body>
    </html>
  );
}
