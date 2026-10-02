import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import { ShopView } from "@/components/ShopView";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop men's, women's and unisex footwear and Lacoste pieces.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop the collection" },
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-10 md:pb-36 md:pt-36">
      {/* The static fallback renders the whole collection for crawlers and first paint. */}
      <Suspense
        fallback={
          <>
            <h1 className="display mb-12 text-[clamp(3.25rem,10vw,9rem)] md:mb-16">
              The <span className="accent-word">collection</span>
            </h1>
            <div className="h-20 border-b border-ink/10" />
            <div className="pt-12 md:pt-16">
              <ProductGrid products={products} animate={false} />
            </div>
          </>
        }
      >
        <ShopView products={products} />
      </Suspense>
    </div>
  );
}
