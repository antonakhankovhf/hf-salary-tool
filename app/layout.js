import { Barlow } from "next/font/google";
import "@/webflow/css/global.css";
import "./globals.css";
import { DevLinkProvider } from "@/webflow/DevLinkProvider";
import { Navbar } from "@/webflow/Navbar";
import { Footer } from "@/webflow/Footer";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Gehaltsanalyse anfordern",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={barlow.className}>
        <DevLinkProvider>
          <Navbar />
          {children}
          <Footer />
        </DevLinkProvider>
      </body>
    </html>
  );
}
