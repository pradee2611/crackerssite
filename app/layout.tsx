import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = "Friends Crackers – Sivakasi Crackers in Coimbatore | 2026 Diwali Pre-order";
const DESC =
  "Friends Crackers (MK Groups), Perinayakampalayam, Coimbatore. 85 Sivakasi crackers and combo offers at pre-order prices. Wholesale & retail, bulk orders, delivery available. Order on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Friends Crackers" },
  description: DESC,
  applicationName: "Friends Crackers",
  keywords: [
    "Friends Crackers",
    "crackers Coimbatore",
    "Sivakasi crackers",
    "Diwali crackers 2026",
    "crackers pre-order",
    "wholesale crackers Coimbatore",
    "fireworks shop Perinayakampalayam",
    "MK Groups crackers",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Friends Crackers",
    url: "/",
    title: "Friends Crackers – 2026 Diwali Pre-order",
    description: "Sivakasi best quality crackers in Coimbatore. Wholesale & retail. Order on WhatsApp.",
    images: [{ url: "/banner.jpg", width: 1400, height: 933, alt: "Friends Crackers shop banner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Friends Crackers – 2026 Diwali Pre-order",
    description: "Sivakasi best quality crackers in Coimbatore. Order on WhatsApp.",
    images: ["/banner.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#8e0010",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: SITE.name,
  alternateName: SITE.tamil,
  description: DESC,
  url: SITE_URL,
  image: `${SITE_URL}/banner.jpg`,
  telephone: "+91" + SITE.phones[0].number.replace(/\s/g, ""),
  parentOrganization: { "@type": "Organization", name: SITE.group },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Perinayakampalayam Main Road, near Sendhur Hotel",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: "Coimbatore",
  priceRange: "₹",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
