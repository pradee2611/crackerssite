import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const base = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/price-list`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
