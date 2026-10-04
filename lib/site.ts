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

export const PACKING_CHARGE = 250;

/** Every item is shown at this % off; the struck-through price is price / (1 - discount), as on the printed price list. */
export const DISCOUNT = 80;
export const mrp = (price: number) => Math.round((price * 100) / (100 - DISCOUNT));

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
    "Pre-order prices for 2026. Prices in the shop may vary. Packing charge ₹250.",
};

export type Combo = { title: string; price: number; free: string; items: { name: string; qty: string }[] };
export const combos = comboData.combos as Combo[];
export const giftBoxes = comboData.giftBoxes as number[];

/** Keep related crackers together (Chakkar Big / Special / Deluxe, Match Box Small / Big ...). */
export function family(name: string): string {
  const cm = name.match(/^\s*(\d+)\s*cm\b/);
  if (cm) return cm[1] + " cm";
  return name
    .replace(/^\s*[\d½¾¼.]+"\s*/, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\b(Small|Big|Special|Deluxe|Super|Asoka|Gold)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/s\b/g, "");
}

export function familyOrder(list: Product[]): Product[] {
  const groups = new Map<string, Product[]>();
  for (const p of list) {
    const k = family(p.name);
    groups.set(k, [...(groups.get(k) ?? []), p]);
  }
  const min = (g: Product[], f: (p: Product) => number) => Math.min(...g.map(f));
  return [...groups.values()]
    .sort((a, b) => min(a, (p) => p.price) - min(b, (p) => p.price) || min(a, (p) => p.id) - min(b, (p) => p.id))
    .flatMap((g) => [...g].sort((a, b) => a.price - b.price || a.id - b.id));
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
