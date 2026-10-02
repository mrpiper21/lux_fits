/**
 * Business information.
 *
 * Every value wrapped in [BRACKETS] is a placeholder. Replace them with the
 * real details — nothing else in the codebase needs to change.
 */
export const site = {
  name: "Luxfits",
  description: "[SHORT BUSINESS DESCRIPTION]",
  location: "[BUSINESS LOCATION]",
  whatsapp: "[WHATSAPP NUMBER]", // international format, e.g. 233XXXXXXXXX
  phone: "[PHONE NUMBER]",
  instagram: "[INSTAGRAM HANDLE]", // without the @
  aboutStory: "[ABOUT THE BUSINESS / BRAND STORY]",
  currency: "GHS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Primary navigation. Ordering happens on WhatsApp, so there is no cart. */
export const nav = [
  { label: "Men", href: "/shop?gender=men", gender: "men" },
  { label: "Women", href: "/shop?gender=women", gender: "women" },
  { label: "Unisex", href: "/shop?gender=unisex", gender: "unisex" },
  { label: "Lacoste", href: "/lacoste" },
  { label: "About", href: "/#about" },
] as const;

/** True while a value is still an unfilled [PLACEHOLDER]. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

/**
 * Builds a WhatsApp chat link. While the number is still a placeholder,
 * wa.me opens the contact picker with the message prefilled.
 */
export function whatsappLink(message?: string): string {
  const number = isPlaceholder(site.whatsapp)
    ? ""
    : site.whatsapp.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}

export function instagramLink(): string {
  if (isPlaceholder(site.instagram)) return "https://www.instagram.com/";
  return `https://www.instagram.com/${site.instagram.replace(/^@/, "")}/`;
}

export function instagramHandle(): string {
  return isPlaceholder(site.instagram)
    ? site.instagram
    : `@${site.instagram.replace(/^@/, "")}`;
}

export function phoneLink(): string | null {
  if (isPlaceholder(site.phone)) return null;
  return `tel:${site.phone.replace(/[^\d+]/g, "")}`;
}
