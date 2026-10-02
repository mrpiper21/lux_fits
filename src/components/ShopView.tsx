"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { CategoryFilter, GenderFilter, Product } from "@/types/product";
import { filterProducts, genderLabel, isCategoryFilter, isGenderFilter } from "@/lib/products";
import { CategorySelector } from "@/components/CategorySelector";
import { ProductGrid } from "@/components/ProductGrid";

const intro: Record<GenderFilter, { title: string; accent: string; line: string }> = {
  all: { title: "The", accent: "collection", line: "Footwear and Lacoste, selected piece by piece." },
  men: { title: "Men's", accent: "edit", line: "Clean lines, considered pairs and everyday staples." },
  women: { title: "Women's", accent: "edit", line: "Pieces with polish, from weekend pairs to evenings out." },
  unisex: { title: "Unisex", accent: "for everyone", line: "Shared silhouettes and easy classics." },
};

/**
 * The shop. Collection and product type live in the URL
 * (/shop?gender=women&category=lacoste) so links can be shared,
 * but switching never reloads the page. The page accent follows the collection.
 */
export function ShopView({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const g = params.get("gender");
  const c = params.get("category");
  const gender: GenderFilter = isGenderFilter(g) ? g : "all";
  const category: CategoryFilter = isCategoryFilter(c) ? c : "all";

  const visible = useMemo(() => filterProducts(products, { gender, category }), [products, gender, category]);

  function update(next: { gender?: GenderFilter; category?: CategoryFilter }) {
    const q = new URLSearchParams();
    const ng = next.gender ?? gender;
    const nc = next.category ?? category;
    if (ng !== "all") q.set("gender", ng);
    if (nc !== "all") q.set("category", nc);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `/shop?${qs}` : "/shop");
  }

  const copy = intro[gender];

  return (
    <div data-gender={gender === "all" ? undefined : gender} className="accent-transition">
      <header className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-12 md:items-end">
        <h1 className="display text-[clamp(3.25rem,10vw,9rem)] md:col-span-8">
          {copy.title} <span className="accent-word text-accent-text transition-colors">{copy.accent}</span>
        </h1>
        <p className="max-w-xs text-lg leading-relaxed text-ink/75 md:col-span-4 md:justify-self-end">{copy.line}</p>
      </header>

      <div className="sticky top-16 z-20 -mx-5 bg-canvas px-5 pt-3 md:-mx-10 md:px-10">
        <CategorySelector
          gender={gender}
          category={category}
          onGender={(ng) => update({ gender: ng })}
          onCategory={(nc) => update({ category: nc })}
        />
        <div aria-hidden className="h-px bg-ink/10" />
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} pieces{gender !== "all" ? ` in ${genderLabel[gender]}` : ""}.
      </p>

      <div className="pt-12 md:pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${gender}-${category}`} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            <ProductGrid products={visible} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
