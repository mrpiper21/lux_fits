# Fashion Boutique

Next.js 16 · TypeScript · Tailwind CSS v4 · Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # every page is statically prerendered
```

## Replacing placeholders

Placeholders are written as `[LIKE THIS]`. Real information is only needed in these files:

| What | Where |
| --- | --- |
| Business name, description, location, WhatsApp, phone, Instagram, brand story | `src/lib/site.ts` |
| Products (name, gender, category, price, image, sizes, availability, style tags). Currently a **dummy catalogue** | `src/data/products.ts` |
| Hero, collection campaigns, editorial, Lacoste, about and gallery photography (currently Unsplash stand-ins); collection and style copy | `src/data/media.ts` |
| Primary font (ChatGeli) | `src/lib/fonts.ts` + `src/app/globals.css` |
| Production URL (for SEO, sitemap, WhatsApp links) | `NEXT_PUBLIC_SITE_URL` env var |

**Images:** put files in `public/images/` and replace the `"[PLACEHOLDER]"` string with the path (e.g. `image: "/images/shoe-001.jpg"`). Any value still in brackets shows a quiet placeholder. For remote images (a CMS or CDN), add the host to `images.remotePatterns` in `next.config.ts`.

**WhatsApp:** use the international format without `+` (e.g. `233XXXXXXXXX`). Order buttons pre-fill the product, the chosen size, the price and the page link.

**Gender:** every product needs `gender: "men" | "women" | "unisex"`. It sets the label colour on cards and the accent on the product page.

**Find Your Pair:** footwear only. A product's `tags` decide which style it appears under: `everyday`, `casual`, `smart`, `statement`.

**Dummy catalogue:** 26 products (19 footwear, 7 Lacoste) with illustrative names, GHS prices, sizes and availability. Each product's photos come from a single [Unsplash](https://unsplash.com/license) shoot of the same item, so its gallery shows genuine extra angles (2–5 photos each). The brand photography in `src/data/media.ts` is Ghanaian youth fashion by Accra-based photographers on Unsplash. All images are served from `images.unsplash.com` (allowed in `next.config.ts`). Replace it all with real stock and the business's own photos before launch.

**Product photos:** `image` is the main photo and `gallery` holds the rest, in order. The product page shows them as a swipeable viewer with thumbnails and a full-screen preview (arrows, swipe, keyboard, Esc), and cards show "N photos".

**Structured data:** a schema.org `Offer` is emitted only once `price` contains a real number.

## Structure

```
src/
  app/                 routes: /, /shop, /shop/[id], /lacoste, sitemap, robots, 404
  components/          Navbar, Hero, Collections, FindYourPair, EditorialSection,
                       LacosteEdit, About, SocialSection, CTA, Footer, ProductCard,
                       GenderLabel, ProductGrid, ProductDetail, ProductGallery,
                       CategorySelector, ShopView
  components/ui/       Media, Button, Reveal
  data/                local content (swap for the API later)
  lib/products.ts      data access layer, the only module that reads product data
  lib/site.ts          business config + WhatsApp/Instagram link helpers
  types/product.ts     shared types
```

## Adding the API later

Planned flow: Next.js → TanStack Query → API → backend → database.

1. Replace the bodies of `getProducts`, `getProduct` and `getRelatedProducts` in `src/lib/products.ts` with `fetch` calls. Server pages keep working unchanged.
2. For client-side data (live stock, for example), install `@tanstack/react-query`, add a `QueryClientProvider` in `src/components/Providers.tsx`, and wrap the same functions in `useQuery` hooks.
3. Components depend only on the `Product` type, so they don't need to change.

## Design rules

- Neutral base: white canvas `#FFFFFF`, charcoal `#20201E`, beige `#E8E1D5`. No gradients.
- Collection accents: men `#102A43`, women `#D98CA3`, unisex `#3B82B6`. Any element inside `data-gender="…"` picks up `--accent` (true colour, for swatches, rules and borders) and `--accent-text` (the same hue deepened so small text passes WCAG AA, because raw pink and blue are too light for small type on white). The shop animates between them when the collection changes.
- Typography: sans-serif only. ChatGeli (Inter Tight until it's supplied) in uppercase for display; one word per headline drops to a light weight as the accent (`.accent-word`).
- Every Tailwind radius token is set to `0`, so all corners stay sharp.
- Motion respects `prefers-reduced-motion`. The layout doesn't depend on animation.
# lux_fits
