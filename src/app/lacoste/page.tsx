import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { LacosteEdit } from "@/components/LacosteEdit";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "The Lacoste Edit",
  description: "A curated selection of Lacoste pieces for effortless everyday style.",
  alternates: { canonical: "/lacoste" },
  openGraph: { url: "/lacoste", title: "The Lacoste Edit" },
};

export default async function LacostePage() {
  const products = await getProducts();
  const lacoste = products.filter((p) => p.category === "lacoste");

  return (
    <div className="pt-16">
      <LacosteEdit products={products} showLink={false} />
      <section aria-labelledby="lacoste-all" className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-36">
        <h2 id="lacoste-all" className="display mb-12 text-[clamp(2.25rem,5vw,4.5rem)] md:mb-16">
          Every <span className="accent-word">piece</span>
        </h2>
        <ProductGrid products={lacoste} animate={false} />
      </section>
    </div>
  );
}
