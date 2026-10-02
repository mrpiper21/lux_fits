import type { Product } from "@/types/product";
import { photos } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/cn";

const placement = [
  { cell: "md:col-span-3", ratio: "tall" },
  { cell: "md:col-span-3 md:mt-20", ratio: "portrait" },
  { cell: "md:col-span-3 md:-mt-10", ratio: "square" },
  { cell: "md:col-span-3 md:mt-10", ratio: "tall" },
] as const;

/** THE LACOSTE EDIT — a curated rail, introduced by a single campaign image. */
export function LacosteEdit({ products, showLink = true }: { products: Product[]; showLink?: boolean }) {
  const picks = products.filter((p) => p.category === "lacoste").slice(0, placement.length);

  return (
    <section aria-labelledby="lacoste-title" className="bg-white py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <Reveal className="relative aspect-[4/5] md:col-span-6 md:aspect-[5/6]">
            <Media src={photos.lacoste.src} alt={photos.lacoste.alt} tone={photos.lacoste.tone}
            position={photos.lacoste.position} sizes="(min-width: 768px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end md:col-span-5 md:col-start-8">
            <h2 id="lacoste-title" className="display text-[clamp(3rem,8vw,7rem)]">
              The Lacoste <span className="accent-word">edit</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink/75">
              A curated selection of Lacoste pieces for effortless everyday style.
            </p>
            {showLink && (
              <div className="mt-8">
                <ButtonLink href="/lacoste" variant="outline" arrow>
                  Explore Lacoste
                </ButtonLink>
              </div>
            )}
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 md:scroll-px-0 gap-4 overflow-x-auto px-5 md:mx-0 md:mt-24 md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:px-0">
          {picks.map((product, i) => (
            <Reveal
              as="li"
              key={product.id}
              delay={i * 0.06}
              className={cn("w-[66vw] shrink-0 snap-start sm:w-[40vw] md:w-auto", placement[i].cell)}
            >
              <ProductCard product={product} ratio={placement[i].ratio} sizes="(min-width: 768px) 25vw, 66vw" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
