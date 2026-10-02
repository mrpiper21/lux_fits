import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoryLabel,
  genderLabel,
  getProduct,
  getProducts,
  getRelatedProducts,
  productAlt,
} from "@/lib/products";
import { isPlaceholder, site } from "@/lib/site";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/ui/Reveal";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};

  const title = `${product.name} — ${genderLabel[product.gender]} ${categoryLabel[product.category]}`;
  const description = isPlaceholder(product.description)
    ? `${product.name}: ${genderLabel[product.gender].toLowerCase()}'s ${categoryLabel[product.category].toLowerCase()} from ${site.name}. Order on WhatsApp.`
    : product.description;
  const image = isPlaceholder(product.image) ? undefined : product.image;

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.id}` },
    openGraph: {
      title,
      description,
      url: `/shop/${product.id}`,
      ...(image && { images: [{ url: image, alt: productAlt(product) }] }),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[id]">) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const price = Number(product.price.replace(/[^\d.]/g, ""));
  const url = `${site.url}/shop/${product.id}`;

  return (
    <div className="pt-16 md:pt-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          category: `${genderLabel[product.gender]} ${categoryLabel[product.category]}`,
          sku: product.id,
          url,
          ...(!isPlaceholder(product.image) && { image: new URL(product.image, site.url).toString() }),
          // An Offer is only emitted once a real numeric price is supplied.
          ...(price > 0 && {
            offers: {
              "@type": "Offer",
              price,
              priceCurrency: site.currency,
              url,
              ...(product.available !== undefined && {
                availability: `https://schema.org/${product.available ? "InStock" : "OutOfStock"}`,
              }),
            },
          }),
        }}
      />

      <ProductDetail product={product} />

      <section aria-labelledby="related-title" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <h2 id="related-title" className="display mb-10 text-[clamp(2.25rem,5vw,4.5rem)] md:mb-14">
          You may <span className="accent-word">also</span> like
        </h2>
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 md:scroll-px-0 gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:px-0">
          {related.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 0.06}
              className={`w-[70vw] shrink-0 snap-start md:w-auto ${["md:col-span-5", "md:col-span-3 md:mt-20", "md:col-span-4"][i]}`}
            >
              <ProductCard product={p} ratio={i === 1 ? "square" : "portrait"} sizes="(min-width: 768px) 40vw, 70vw" />
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
