import raw from "@/data/products.json";
import comboData from "@/data/combos.json";

export type Product = {
  id: number;
  category: string;
  name: string;
  variant: string;
  price: number;
  image: string;
};

export const products = raw as Product[];

export const categories = Array.from(new Set(products.map((p) => p.category)));

// Public address of the live site. Override with NEXT_PUBLIC_SITE_URL when you add a custom domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://friendscrackers.vercel.app").replace(/\/$/, "");

export const LOCATION = {
  lat: 11.1553421,
  lng: 76.9444809,
  embed: "https://maps.google.com/maps?q=11.1553421,76.9444809&z=16&output=embed",
  directions: "https://www.google.com/maps/dir/?api=1&destination=11.1553421,76.9444809",
  view: "https://www.google.com/maps/search/?api=1&query=11.1553421,76.9444809",
};

export const SITE = {
  name: "Friends Crackers",
  tamil: "பட்டாசு கடை",
  tagline: "Sivakasi best quality crackers · Wholesale & retail",
  group: "MK Groups",
  address: "Perinayakampalayam Main Road, near Sendhur Hotel, Coimbatore",
  // First number receives WhatsApp orders. Override with NEXT_PUBLIC_WHATSAPP (country code, digits only).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "916374817953",
  phones: [
    { label: "Santhosh", number: "63748 17953" },
    { label: "Yogaraj", number: "63826 26343" },
    { label: "Pradeep", number: "70102 62389" },
    { label: "Deepak", number: "82709 32722" },
  ],
  notice:
    "Pre-order prices for 2026. Prices in the shop may vary and packing charges may be added.",
};

export type Combo = { title: string; price: number; free: string; items: { name: string; qty: string; price: number }[] };
export const combos = comboData.combos as Combo[];
export const giftBoxes = comboData.giftBoxes as number[];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
