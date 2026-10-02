"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Product, StyleTag } from "@/types/product";
import { photos, styles } from "@/data/media";
import { productsByStyle } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

/*
 * Results layout inside the right-hand column (8 columns on desktop):
 * one large pair, two smaller ones at different heights.
 */
const placement = [
  { cell: "md:col-span-5 md:row-span-2", ratio: "tall", sizes: "(min-width: 768px) 38vw, 78vw" },
  { cell: "md:col-span-3 md:mt-24", ratio: "portrait", sizes: "(min-width: 768px) 22vw, 78vw" },
  { cell: "md:col-span-3 md:col-start-6", ratio: "square", sizes: "(min-width: 768px) 22vw, 78vw" },
] as const;

/** FIND YOUR PAIR — a stylist-led way into the footwear. */
export function FindYourPair({ products }: { products: Product[] }) {
  const footwear = useMemo(() => products.filter((p) => p.category === "footwear"), [products]);
  const [style, setStyle] = useState<StyleTag | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = style ? productsByStyle(footwear, style).slice(0, placement.length) : [];
  const current = styles.find((s) => s.id === style);

  function choose(next: StyleTag) {
    setStyle(next === style ? null : next);
    // On small screens the results sit below the choices — bring them into view.
    if (window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  return (
    <section id="find-your-pair" aria-labelledby="fyp-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="fyp-title" className="display text-[clamp(3rem,9vw,8rem)] md:col-span-8">
            Find your <span className="accent-word">pair</span>
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-ink/75 md:col-span-4 md:justify-self-end">
            From everyday essentials to pieces that make a statement, discover your next pair.
          </p>
        </header>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-6">
          {/* The stylist's question */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <p className="label text-ink/60">What&apos;s your style?</p>
              <ul
                role="group"
                aria-label="Choose a style"
                className="no-scrollbar -mx-5 mt-5 flex gap-6 overflow-x-auto px-5 md:mx-0 md:mt-8 md:block md:space-y-1 md:px-0"
              >
                {styles.map((s) => {
                  const active = s.id === style;
                  return (
                    <li key={s.id} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => choose(s.id)}
                        className={cn(
                          "display min-h-11 text-left text-[clamp(2rem,4.6vw,4.25rem)] transition-colors duration-500",
                          active ? "text-ink" : "text-ink/25 hover:text-ink/60",
                        )}
                      >
                        {s.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={style ?? "none"}
                  className="accent-word mt-6 max-w-xs text-2xl leading-snug text-ink/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {current ? current.line : "Choose one — we'll pull the pairs."}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* The edit */}
          <div ref={resultsRef} className="scroll-mt-24 md:col-span-8">
            <p aria-live="polite" className="sr-only">
              {current ? `Showing ${results.length} pairs for ${current.label}.` : ""}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              {!style ? (
                <motion.div
                  key="campaign"
                  className="relative aspect-[4/5] md:aspect-[16/11]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <Media
                    src={photos.footwear.src}
                    alt={photos.footwear.alt}
                    tone={photos.footwear.tone}
            position={photos.footwear.position}
                    sizes="(min-width: 768px) 66vw, 100vw"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={style}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 md:scroll-px-0 gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-8 md:gap-6 md:overflow-visible md:px-0">
                    {results.map((product, i) => (
                      <motion.li
                        key={product.id}
                        className={cn("w-[78vw] shrink-0 snap-start sm:w-[44vw] md:w-auto", placement[i].cell)}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease }}
                      >
                        <ProductCard product={product} ratio={placement[i].ratio} sizes={placement[i].sizes} />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10">
              <ButtonLink href="/shop?category=footwear" variant="text" arrow>
                Shop all footwear
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
