// Same switch as SITE_CLOSED in lib/site.ts: the site is closed unless NEXT_PUBLIC_SITE_OPEN=true.
const closed = process.env.NEXT_PUBLIC_SITE_OPEN !== "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 31536000 },
  // While closed, the price list PDFs are not served (the files are kept; visitors land on the closed page).
  async redirects() {
    if (!closed) return [];
    return ["/price-list.pdf", "/price-list-mobile.pdf"].map((source) => ({ source, destination: "/", permanent: false }));
  },
};

export default nextConfig;
