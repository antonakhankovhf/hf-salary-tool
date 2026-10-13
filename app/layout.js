import { Barlow } from "next/font/google";
import "@/webflow/css/global.css";
import "./globals.css";
import { DevLinkProvider } from "@/webflow/DevLinkProvider";
import { Navbar } from "@/webflow/Navbar";
import { Footer } from "@/webflow/Footer";
import CalendlyPopup from "@/components/CalendlyPopup";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const PAGE_URL = "https://www.headfound.com/gehalts-check";
const TITLE = "Kostenloser Gehalts-Check für Arbeitgeber | HEADFOUND";
const DESCRIPTION =
  "Was musst du zahlen, um deine Stelle zu besetzen? Jobtitel und Standort eingeben und in Sekunden das marktübliche Gehalt im DACH-Raum sehen. Kostenlos.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    locale: "de_DE",
  },
};

// #website und #organization sind im Schema der Hauptseite headfound.com definiert.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": PAGE_URL,
      url: PAGE_URL,
      name: "Kostenloser Gehalts-Check für Arbeitgeber",
      description: DESCRIPTION,
      inLanguage: "de-DE",
      isPartOf: { "@id": "https://www.headfound.com/#website" },
      about: { "@id": "https://www.headfound.com/#organization" },
      mainEntity: {
        "@type": "WebApplication",
        name: "HEADFOUND Gehalts-Check",
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Gehaltsprognose für Arbeitgeber auf Basis aktueller Stellenanzeigen und Vergütungsdaten im DACH-Raum, nach Jobtitel, Region und Suchradius.",
        inLanguage: "de-DE",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        provider: { "@id": "https://www.headfound.com/#organization" },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.headfound.com/" },
        { "@type": "ListItem", position: 2, name: "Gehalts-Check", item: PAGE_URL },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="de-DE">
      <body className={barlow.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <DevLinkProvider>
          <Navbar />
          {children}
          <Footer />
          <CalendlyPopup />
        </DevLinkProvider>
      </body>
    </html>
  );
}
