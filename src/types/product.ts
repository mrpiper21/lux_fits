export type ProductGender = "men" | "women" | "unisex";

export type ProductCategory = "footwear" | "lacoste";

/** Styles used by FIND YOUR PAIR. Stored in `tags`. */
export type StyleTag = "everyday" | "casual" | "smart" | "statement";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  gender: ProductGender;
  price: string;
  /** Path in /public, a remote URL, or a "[PLACEHOLDER]" label. */
  image: string;
  description: string;
  sizes?: string[];
  available?: boolean;
  tags?: string[];
  /** Optional extra photographs for the product page. */
  gallery?: string[];
}

export type GenderFilter = "all" | ProductGender;
export type CategoryFilter = "all" | ProductCategory;

/** A brand photograph (hero, campaigns, gallery). */
export type Photo = {
  src: string;
  alt: string;
  tone?: Tone;
  /** CSS object-position for cropping, e.g. "center 30%". */
  position?: string;
};

/** Placeholder fill used until the real photograph is supplied. */
export type Tone = "beige" | "white" | "charcoal" | "canvas";
