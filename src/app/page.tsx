import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { Collections } from "@/components/Collections";
import { FindYourPair } from "@/components/FindYourPair";
import { EditorialSection } from "@/components/EditorialSection";
import { LacosteEdit } from "@/components/LacosteEdit";
import { About } from "@/components/About";
import { SocialSection } from "@/components/SocialSection";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";

/*
 * The walk through the boutique:
 * window (hero) → the collections → a stylist (find your pair) → a spread
 * (editorial) → the Lacoste rail → who we are → the lookbook → the counter (WhatsApp).
 */
export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: site.name,
          description: site.description,
          url: site.url,
          address: site.location,
          telephone: site.phone,
        }}
      />
      <Hero />
      <Collections />
      <FindYourPair products={products} />
      <EditorialSection />
      <LacosteEdit products={products} />
      <About />
      <SocialSection />
      <CTA />
    </>
  );
}
