"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import {
  categoryLabel,
  formatPrice,
  genderLabel,
  orderMessage,
  productAlt,
  productImages,
  productTone,
} from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { ProductGallery } from "@/components/ProductGallery";
import { ButtonLink } from "@/components/ui/Button";
import { GenderLabel } from "@/components/GenderLabel";
import { cn } from "@/lib/cn";

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const images = productImages(product);
  const soldOut = product.available === false;

  const pageUrl = `${site.url}/shop/${product.id}`;
  const orderHref = whatsappLink(`${orderMessage(product, size ?? undefined)}\n${pageUrl}`);
  const askHref = whatsappLink(`Hello! I have a question about ${product.name}.\n${pageUrl}`);

  return (
    <div data-gender={product.gender} className="mx-auto max-w-[1600px] md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6">
        {/* Photographs — swipe, thumbnails, and a full-screen preview */}
        <div className="md:col-span-7">
          <ProductGallery images={images} alt={productAlt(product)} tone={productTone(product)} />
        </div>

        {/* Details */}
        <div className="px-5 pb-32 pt-8 md:col-span-4 md:col-start-9 md:px-0 md:pb-0 md:pt-0">
          <div className="md:sticky md:top-28">
            <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
              <Link href="/shop" className="link-line">Shop</Link>
              <span aria-hidden> / </span>
              <Link href={`/shop?gender=${product.gender}`} className="link-line">
                {genderLabel[product.gender]}
              </Link>
              <span aria-hidden> / </span>
              <span>{categoryLabel[product.category]}</span>
            </nav>

            <GenderLabel gender={product.gender} className="mt-10" />
            <h1 className="display mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)]">{product.name}</h1>
            <p className="mt-4 text-xl">
              {formatPrice(product.price)}
              {soldOut && <span className="ml-3 text-base text-ink/55">Sold out</span>}
            </p>

            <p className="mt-8 max-w-prose leading-relaxed text-ink/80">{product.description}</p>

            {product.sizes && product.sizes.length > 0 && (
              <fieldset className="mt-10">
                <legend className="mb-3 flex w-full justify-between text-sm">
                  <span>Size</span>
                  <span className="text-ink/55">{size ? `Selected: ${size}` : "Choose your size"}</span>
                </legend>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={size === s}
                      onClick={() => setSize(size === s ? null : s)}
                      className={cn(
                        "min-h-12 border text-sm transition-colors",
                        size === s
                          ? "border-2 border-accent font-medium"
                          : "border-ink/15 hover:border-ink/60",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-8 hidden gap-3 md:grid">
              <ButtonLink href={soldOut ? askHref : orderHref} external arrow className="min-h-14">
                {soldOut ? "Ask about availability" : "Order on WhatsApp"}
              </ButtonLink>
              <ButtonLink href={askHref} external variant="outline">
                Ask a question
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink/55">
              We&apos;ll confirm your size, availability and delivery on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: ordering always within thumb reach */}
      <div data-order-bar className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-ink/10 bg-canvas px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <p className="min-w-0 text-sm">
          <span className="block truncate">{product.name}</span>
          <span className="text-ink/60">
            {formatPrice(product.price)}
            {size && ` · ${size}`}
          </span>
        </p>
        <ButtonLink href={soldOut ? askHref : orderHref} external className="min-h-12 shrink-0 px-5">
          {soldOut ? "Ask us" : "Order on WhatsApp"}
        </ButtonLink>
      </div>
    </div>
  );
}
