import { Inter_Tight } from "next/font/google";

/**
 * Fallback for ChatGeli (see globals.css). Once the ChatGeli files are
 * available, replace this with:
 *
 *   import localFont from "next/font/local";
 *   export const fallbackFont = localFont({
 *     src: "../../public/fonts/ChatGeli.woff2",
 *     variable: "--font-fallback",
 *   });
 */
export const fallbackFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-fallback",
  display: "swap",
});
