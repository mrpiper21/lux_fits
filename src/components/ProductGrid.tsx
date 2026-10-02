"use client";

import { motion } from "motion/react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/cn";

/*
 * A repeating five-beat rhythm with mixed proportions:
 * one feature, then four supporting pieces at staggered heights.
 * Mobile: feature full width, the rest in pairs.
 */
const rhythm = [
  { cell: "col-span-2 md:col-span-6", ratio: "portrait", sizes: "(min-width: 768px) 50vw, 100vw" },
  { cell: "md:col-span-4 md:col-start-8 md:mt-32", ratio: "tall", sizes: "(min-width: 768px) 33vw, 50vw" },
  { cell: "md:col-span-3 md:mt-8", ratio: "square", sizes: "(min-width: 768px) 25vw, 50vw" },
  { cell: "md:col-span-4 md:col-start-5 md:mt-24", ratio: "tall", sizes: "(min-width: 768px) 33vw, 50vw" },
  { cell: "md:col-span-3 md:col-start-10", ratio: "portrait", sizes: "(min-width: 768px) 25vw, 50vw" },
] as const;

type ProductGridProps = {
  products: Product[];
  /** Disable entrance animation (e.g. for the static fallback). */
  animate?: boolean;
};

export function ProductGrid({ products, animate = true }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="py-24 text-lg text-ink/70">Nothing here just yet — new pieces are on the way.</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-12 md:gap-x-6 md:gap-y-20">
      {products.map((product, i) => {
        const beat = rhythm[i % rhythm.length];
        return (
          <motion.li
            key={product.id}
            className={cn(beat.cell)}
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={product} ratio={beat.ratio} sizes={beat.sizes} headingLevel="h2" />
          </motion.li>
        );
      })}
    </ul>
  );
}
