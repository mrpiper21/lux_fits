import { products } from "@/data/products";
import { site, isPlaceholder } from "@/lib/site";
import type {
  CategoryFilter,
  GenderFilter,
  Product,
  ProductCategory,
  ProductGender,
  StyleTag,
  Tone,
} from "@/types/product";

/**
 * Data access layer.
 *
 * Today these read local data. When the backend arrives, replace the bodies
 * with API calls (and wrap client-side reads in TanStack Query hooks) —
 * the signatures stay the same so pages and components don't change.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const score = (p: Product) =>
    (p.gender === product.gender ? 2 : 0) + (p.category === product.category ? 1 : 0);
  return products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

/* Pure helpers — safe to use in client components on already-loaded data. */

export function filterProducts(
  list: Product[],
  { gender = "all", category = "all" }: { gender?: GenderFilter; category?: CategoryFilter },
): Product[] {
  return list.filter(
    (p) => (gender === "all" || p.gender === gender) && (category === "all" || p.category === category),
  );
}

/** Products for a style, interleaved by gender so a small selection feels varied. */
export function productsByStyle(list: Product[], style: StyleTag): Product[] {
  const matches = list.filter((p) => p.tags?.includes(style));
  const byGender = (["women", "men", "unisex"] as const).map((g) => matches.filter((p) => p.gender === g));
  const mixed: Product[] = [];
  for (let i = 0; mixed.length < matches.length; i++) {
    for (const group of byGender) if (group[i]) mixed.push(group[i]);
  }
  return mixed;
}

export const genderLabel: Record<ProductGender, string> = {
  men: "Men",
  women: "Women",
  unisex: "Unisex",
};

export const categoryLabel: Record<ProductCategory, string> = {
  footwear: "Footwear",
  lacoste: "Lacoste",
};

export const genderFilters: { id: GenderFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "unisex", label: "Unisex" },
];

export const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "footwear", label: "Footwear" },
  { id: "lacoste", label: "Lacoste" },
];

export const isGenderFilter = (v: string | null): v is GenderFilter => genderFilters.some((f) => f.id === v);
export const isCategoryFilter = (v: string | null): v is CategoryFilter => categoryFilters.some((f) => f.id === v);

export function formatPrice(price: string): string {
  return price.toUpperCase().startsWith(site.currency) ? price : `${site.currency} ${price}`;
}

/** Product photographs, primary first. */
export function productImages(product: Product): string[] {
  return [product.image, ...(product.gallery ?? [])];
}

export function productAlt(product: Product): string {
  return isPlaceholder(product.name) ? `${product.name} photograph` : product.name;
}

/** Quiet alternating placeholder fills so a grid of placeholders still has rhythm. */
export function productTone(product: Product): Tone {
  const n = Number(product.id.replace(/\D/g, "")) || 0;
  return n % 3 === 0 ? "charcoal" : "beige";
}

export function orderMessage(product: Product, size?: string): string {
  return [
    "Hello! I'd like to order:",
    `${product.name} — ${genderLabel[product.gender]}, ${categoryLabel[product.category]}`,
    size ? `Size: ${size}` : null,
    `Price: ${formatPrice(product.price)}`,
  ]
    .filter(Boolean)
    .join("\n");
}
