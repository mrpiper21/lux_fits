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
      <div className="grid grid-cols-1 md:h-[calc(100svh-4rem)] md:min-h-[36rem] md:grid-cols-12">
        <div className="relative h-[52svh] min-h-[20rem] overflow-hidden md:col-span-7 md:col-start-6 md:row-start-1 md:h-full">
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

        <div className="flex flex-col justify-end px-5 pb-12 pt-6 md:col-span-5 md:row-start-1 md:pb-14 md:pl-10 md:pr-8 md:pt-0">
          <motion.h1
            id="hero-title"
            className="display text-[clamp(2.75rem,13.5vw,10rem)] md:text-[clamp(3.5rem,6.6vw,8rem)]"
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
            className="mt-4 md:mt-8"
          >
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ink/80 md:text-[1.0625rem]">
              Discover footwear and Lacoste pieces selected for people who care about how they look and how they feel.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-2 min-[360px]:grid-cols-[1fr_auto] sm:flex sm:flex-wrap sm:gap-3 md:mt-7">
              <ButtonLink href="/shop" className="whitespace-nowrap px-4 sm:px-8">
                Shop collection
              </ButtonLink>
              <ButtonLink href="#collections" variant="outline" className="whitespace-nowrap px-5 sm:px-8">
                Explore
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
