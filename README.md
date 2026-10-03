# Friends Crackers website (Next.js)

Catalogue + cart + WhatsApp ordering for the 2026 pre-order price list.

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Edit
- Products & prices: `data/products.json` (id, category, name, variant, price, image)
- Product photos: `public/products/NN.jpg` (NN = product id)
- WhatsApp number / phones / address / notice: `lib/site.ts`
  (or set `NEXT_PUBLIC_WHATSAPP=91XXXXXXXXXX` in `.env.local`)
- Price list files: `public/price-list.pdf` and `public/price-list-mobile.pdf`
- The live address defaults to `https://friendscrackers.vercel.app` (see `SITE_URL` in `lib/site.ts`). When you add a custom domain, set `NEXT_PUBLIC_SITE_URL=https://your-domain` so SEO links and share previews use it.

## Deploy
Push to GitHub and import in Vercel (zero config), or run `npm run build && npm start` on any Node 18+ server.

## Deploy on Vercel (free)

Vercel serves your images from a global CDN and converts them to AVIF/WebP automatically, so the site loads much faster than on localhost.

1. **Put the project on GitHub.** Create a free account at github.com, create a new repository, and upload the contents of `6_Website` (do not upload `node_modules` or `.next`; `.gitignore` already excludes them).
2. **Import it into Vercel.** Sign in at vercel.com with GitHub, click **Add New → Project**, choose the repository, and leave the defaults (Framework: Next.js). Click **Deploy**.
3. **Set environment variables** (Project → Settings → Environment Variables), then redeploy:
   - `NEXT_PUBLIC_SITE_URL` = your final address, for example `https://friendscrackers.in` (used for SEO, sitemap and share previews)
   - `NEXT_PUBLIC_WHATSAPP` = number that receives orders, country code and digits only, for example `916374817953`
4. **Add your own domain** (optional): Project → Settings → Domains → add the domain and copy the DNS records Vercel shows into your domain provider.
5. **Check it.** Open `https://your-site/robots.txt` and `/sitemap.xml`, then add the site in Google Search Console and submit the sitemap.

### Updating products or images
Edit `data/products.json` and put new images in `public/products/` (JPG, around 800 px wide, under 200 KB each). Push to GitHub and Vercel redeploys automatically in about a minute.

### Keep it fast
- Resize photos before adding them. Phone photos are often 3–10 MB, which is far more than needed.
- Keep the price list PDFs in `public/`; they only download when someone taps the button.
