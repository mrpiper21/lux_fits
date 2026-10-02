"use client";

import type { CategoryFilter, GenderFilter } from "@/types/product";
import { categoryFilters, genderFilters } from "@/lib/products";
import { cn } from "@/lib/cn";

type CategorySelectorProps = {
  gender: GenderFilter;
  category: CategoryFilter;
  onGender: (g: GenderFilter) => void;
  onCategory: (c: CategoryFilter) => void;
};

/**
 * Collection selector. Each collection carries its own accent; the active
 * one is underlined in it. Secondary product-type switch sits quietly beside.
 */
export function CategorySelector({ gender, category, onGender, onCategory }: CategorySelectorProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div role="group" aria-label="Collection" className="flex justify-between gap-3 sm:justify-start sm:gap-8 md:gap-10">
        {genderFilters.map((f) => {
          const active = f.id === gender;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              data-gender={f.id === "all" ? undefined : f.id}
              onClick={() => onGender(f.id)}
              className={cn(
                "display shrink-0 border-b-[3px] pb-2 text-[clamp(1.25rem,6vw,1.75rem)] transition-colors duration-500 sm:text-[clamp(1.75rem,4vw,2.75rem)]",
                active ? "border-accent text-ink" : "border-transparent text-ink/30 hover:text-ink/70",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div role="group" aria-label="Product type" className="flex gap-5 pb-1 text-sm md:pb-3">
        {categoryFilters.map((f) => {
          const active = f.id === category;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => onCategory(f.id)}
              className={cn("min-h-11 transition-colors", active ? "text-ink underline underline-offset-4" : "text-ink/50 hover:text-ink")}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
