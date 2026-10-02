import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice, productAlt, productTone } from "@/lib/products";
import { Media } from "@/components/ui/Media";
import { GenderLabel } from "@/components/GenderLabel";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
  /** Image proportion — vary it to build editorial rhythm. */
  ratio?: "portrait" | "tall" | "square";
  sizes?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

const ratioClass = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

/** A catalogue entry: the photograph first, then just enough text. */
export function ProductCard({
  product,
  ratio = "portrait",
  sizes = "(min-width: 768px) 33vw, 80vw",
  headingLevel: Heading = "h3",
  className,
}: ProductCardProps) {
  const second = product.gallery?.[0];

  return (
    <article data-gender={product.gender} className={cn("group [--underline:var(--accent)]", className)}>
      <Link href={`/shop/${product.id}`} className="block">
        <div className={cn("relative overflow-hidden", ratioClass[ratio])}>
          <Media
            src={product.image}
            alt={productAlt(product)}
            tone={productTone(product)}
            sizes={sizes}
            className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.03]"
          />
          {product.gallery && product.gallery.length > 0 && (
            <span className="absolute bottom-3 right-3 z-10 bg-canvas px-2 py-1 text-[0.6875rem] tracking-[0.06em] text-ink">
              {product.gallery.length + 1} photos
            </span>
          )}
          {second && (
            <Media
              src={second}
              alt=""
              sizes={sizes}
              decorative
              className="opacity-0 transition-opacity duration-700 group-hover:opacity-100 [@media(hover:none)]:hidden"
            />
          )}
        </div>

        <div className="mt-4 space-y-1.5">
          <GenderLabel gender={product.gender} />
          <Heading className="text-[1.0625rem] leading-snug md:text-lg">{product.name}</Heading>
          <p className="text-[0.9375rem] text-ink/70">
            {formatPrice(product.price)}
            {product.available === false && <span className="ml-3 text-ink/50">Sold out</span>}
          </p>
          <p aria-hidden className="label pt-2 text-ink">
            <span className="link-line">View product</span> <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
