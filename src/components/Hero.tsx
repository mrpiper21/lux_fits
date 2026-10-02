"use client";

import { motion } from "motion/react";
import { photos } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Desktop: type on white at the left, a tall photograph running to the right
 * edge. Mobile: the photograph leads and the type follows below it.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-16">
      <div className="grid md:h-[calc(100svh-4rem)] md:min-h-[36rem] md:grid-cols-12">
        <div className="relative h-[68svh] min-h-[26rem] overflow-hidden md:col-span-7 md:col-start-6 md:row-start-1 md:h-full">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease }}
          >
            <Media
              src={photos.hero.src}
              alt={photos.hero.alt}
              position={photos.hero.position}
              sizes="(min-width: 768px) 58vw, 100vw"
              preload
            />
          </motion.div>
        </div>

        <div className="flex flex-col justify-end px-5 pb-16 pt-8 md:col-span-5 md:row-start-1 md:pb-14 md:pl-10 md:pr-8 md:pt-0">
          <motion.h1
            id="hero-title"
            className="display text-[clamp(3.25rem,15vw,10rem)] md:text-[clamp(3.5rem,6.6vw,8rem)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
          >
            Step into
            <span className="block">
              <span className="accent-word">your</span> <span className="md:block">style</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="mt-6 md:mt-8"
          >
            <p className="max-w-sm text-[1.0625rem] leading-relaxed text-ink/80">
              Discover footwear and Lacoste pieces selected for people who care about how they look and how they feel.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Shop collection</ButtonLink>
              <ButtonLink href="#collections" variant="outline">
                Explore
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
