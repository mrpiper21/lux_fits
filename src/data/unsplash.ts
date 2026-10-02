/**
 * Builds an Unsplash image URL capped at a sensible source size;
 * next/image then generates the responsive sizes from it.
 * Photos are used under the Unsplash License (free, no attribution required).
 */
export function unsplash(id: string, width = 1400): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}
