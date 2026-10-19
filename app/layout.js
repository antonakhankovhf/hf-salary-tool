import Script from "next/script";
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

// Cookie-Banner (iubenda), 1:1 aus dem Custom Code der Webflow-Site - der wird
// in die Webflow-Cloud-App nicht eingebunden.
const iubendaConfig = {
  askConsentAtCookiePolicyUpdate: true,
  gdprAppliesGlobally: false,
  perPurposeConsent: true,
  siteId: 3238465,
  whitelabel: false,
  cookiePolicyId: 65788483,
  privacyPolicyUrl: "https://www.headfound.com/datenschutz",
  privacyPolicyNoticeAtCollection: true,
  lang: "de",
  floatingPreferencesButtonDisplay: "bottom-right",
  banner: {
    acceptButtonDisplay: true,
    backgroundOverlay: true,
    closeButtonDisplay: false,
    customizeButtonDisplay: true,
    explicitWithdrawal: true,
    listPurposes: true,
    position: "bottom",
    rejectButtonDisplay: true,
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
        {/* Konfiguration muss vor iubenda_cs.js stehen, daher alle drei beforeInteractive (in dieser Reihenfolge). */}
        <Script id="iubenda-config" strategy="beforeInteractive">
          {`var _iub = _iub || []; _iub.csConfiguration = ${JSON.stringify(iubendaConfig)};`}
        </Script>
        <Script src="https://cs.iubenda.com/sync/3238465.js" strategy="beforeInteractive" />
        <Script src="https://cdn.iubenda.com/cs/iubenda_cs.js" strategy="beforeInteractive" charSet="UTF-8" />
        <Script id="dacs" src="https://download.digiaccess.org/digiaccess" strategy="afterInteractive" />
      </body>
    </html>
  );
}
