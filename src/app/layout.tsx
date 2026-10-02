import type { Metadata, Viewport } from "next";
import { fallbackFont } from "@/lib/fonts";
import { site } from "@/lib/site";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const description =
  "Footwear and Lacoste pieces for men and women, selected for people who care about how they look and how they feel.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Footwear & Lacoste`,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Footwear & Lacoste`,
    description,
    url: "/",
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Footwear & Lacoste`,
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fallbackFont.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
