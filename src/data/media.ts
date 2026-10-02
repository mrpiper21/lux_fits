import type { Photo, ProductGender, StyleTag } from "@/types/product";
import { unsplash } from "@/data/unsplash";

/**
 * Brand photography — Ghanaian youth fashion by Accra-based photographers on
 * Unsplash (free to use under the Unsplash License). These are stand-ins:
 * replace each `src` with the business's own campaign photography.
 * `position` is the CSS object-position used when an image is cropped.
 */
type BrandPhoto = "hero" | "about" | "footwear" | "lacoste" | "editorialLarge" | "editorialSmall" | "cta";

export const photos: Record<BrandPhoto, Photo> = {
  hero: {
    src: unsplash("photo-1741606369276-288bdc4bb970", 2000),
    alt: "Three young men in cream suits seated on a sofa by a roadside in Accra",
    position: "center 55%",
  },
  about: {
    src: unsplash("photo-1621959614020-e12047c380ba"),
    alt: "Two young men in tailored suits standing on a garden stairway in Accra",
  },
  footwear: {
    src: unsplash("photo-1739064698032-ca1c58e451b6", 2000),
    alt: "Black leather shoes worn with white socks on a green floor",
    position: "center 65%",
  },
  lacoste: {
    src: unsplash("photo-1762390849218-b74de4eec259"),
    alt: "Young man in a white sweatshirt with a green emblem standing among trees",
    position: "center 30%",
  },
  editorialLarge: {
    src: unsplash("photo-1790456006342-3052715e9eef"),
    alt: "Young man in a white shirt and striped purple vest holding a leaf against a pale wall",
  },
  editorialSmall: {
    src: unsplash("photo-1500063925588-751f924d7c80"),
    alt: "Blue and white canvas sneakers seen from above on a red floor",
  },
  cta: {
    src: unsplash("photo-1750438677298-6b8b9c5e7436"),
    alt: "Smiling young woman in a red knit top sitting cross-legged",
    position: "center 35%",
  },
};

export const collections: {
  gender: ProductGender;
  title: string;
  accentWord: string;
  description: string;
  cta: string;
  photo: Photo;
}[] = [
  {
    gender: "men",
    title: "Men's",
    accentWord: "edit",
    description: "Clean lines, considered pairs and Lacoste staples for every day of the week.",
    cta: "Explore men",
    photo: {
      src: unsplash("photo-1762390644365-3b93146ef3c7"),
      alt: "Young man in a black varsity knit and jeans outdoors",
      position: "center 30%",
    },
  },
  {
    gender: "women",
    title: "Women's",
    accentWord: "edit",
    description: "Pieces with polish — from easy weekend pairs to the ones you dress up for.",
    cta: "Explore women",
    photo: {
      src: unsplash("photo-1761747439833-9ab9e385dfc5"),
      alt: "Young woman in a black leather jacket holding a helmet beside a motorcycle",
      position: "center 35%",
    },
  },
  {
    gender: "unisex",
    title: "Unisex",
    accentWord: "for everyone",
    description: "Shared silhouettes and easy classics that work for everyone.",
    cta: "Explore unisex",
    photo: {
      src: unsplash("photo-1750438920256-a0ee98d3508d"),
      alt: "Two young friends in matching green shirts in front of graffiti",
      position: "center 40%",
    },
  },
];

export const gallery: Photo[] = [
  { src: unsplash("photo-1761747439456-2ec536cc8be7"), alt: "Young woman in a leather jacket and trousers beside a motorcycle" },
  { src: unsplash("photo-1751628431207-d75c4844ce1d"), alt: "Smiling young woman in camouflage trousers posing on painted tyres", position: "center 40%" },
  { src: unsplash("photo-1781489747551-10e4240d06c9"), alt: "Young man in a denim vest and jeans posing outdoors", position: "center 35%" },
  { src: unsplash("photo-1739150566827-91af23f010dd"), alt: "Young woman with red hair in a flat cap, tie and waistcoat", position: "center 30%" },
  { src: unsplash("photo-1663375752438-cc2ed019be19"), alt: "Young man in sunglasses and a dark shirt", position: "center 30%" },
  { src: unsplash("photo-1756451182421-d2a1961638c9"), alt: "Young man in a denim outfit seated against a soft grey backdrop", position: "center 45%" },
];

export const styles: { id: StyleTag; label: string; line: string }[] = [
  { id: "everyday", label: "Everyday", line: "Easy pairs you'll reach for without thinking." },
  { id: "casual", label: "Casual", line: "Relaxed and weekend-ready, never careless." },
  { id: "smart", label: "Smart", line: "Clean lines for the moments that count." },
  { id: "statement", label: "Statement", line: "For when the outfit starts with the shoes." },
];
