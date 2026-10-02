import type { ProductGender } from "@/types/product";
import { genderLabel } from "@/lib/products";
import { cn } from "@/lib/cn";

/**
 * MEN / WOMEN / UNISEX tag in its collection colour: a swatch in the true
 * accent, the word in the readable accent shade.
 */
export function GenderLabel({ gender, className }: { gender: ProductGender; className?: string }) {
  return (
    <span data-gender={gender} className={cn("label inline-flex items-center gap-2 text-accent-text", className)}>
      <span aria-hidden className="h-2 w-2 shrink-0 bg-accent" />
      {genderLabel[gender]}
    </span>
  );
}
