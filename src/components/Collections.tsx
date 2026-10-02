import Link from "next/link";
import { collections } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/*
 * MEN / WOMEN / UNISEX as campaigns, not filters.
 * Mobile: a swipeable strip. Desktop: a staggered triptych of portraits.
 */
const layout: { item: string; image: string; sizes: string; inner?: string; text?: string }[] = [
  { item: "md:col-span-4", image: "aspect-[4/5] md:aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 84vw" },
  { item: "md:col-span-4 md:mt-28", image: "aspect-[4/5] md:aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 84vw" },
  { item: "md:col-span-4 md:mt-56", image: "aspect-[4/5] md:aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 84vw" },
];

export function Collections() {
  return (
    <section id="collections" aria-labelledby="collections-title" className="py-16 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <h2 id="collections-title" className="display mb-8 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] md:mb-20">
          Three collections, <span className="accent-word">one</span> point of view
        </h2>
      </div>

      <ul className="no-scrollbar mx-auto flex max-w-[1600px] snap-x snap-mandatory scroll-px-5 md:scroll-px-0 gap-4 overflow-x-auto px-5 md:grid md:grid-cols-12 md:gap-x-6 md:overflow-visible md:px-10">
        {collections.map((c, i) => {
          const l = layout[i];
          return (
            <li
              key={c.gender}
              data-gender={c.gender}
              className={cn("w-[84vw] shrink-0 snap-start md:w-auto", l.item)}
            >
              <Reveal className={l.inner}>
                <Link
                  href={`/shop?gender=${c.gender}`}
                  className={cn("group relative block overflow-hidden", l.image)}
                  aria-hidden
                  tabIndex={-1}
                >
                  <Media
                    src={c.photo.src}
                    alt={c.photo.alt}
                    tone={c.photo.tone}
                    position={c.photo.position}
                    sizes={l.sizes}
                    className="transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.03]"
                  />
                </Link>
                <div className={cn("pt-6", l.text)}>
                  <span aria-hidden className="mb-5 block h-0.5 w-10 bg-accent" />
                  <h3 className="display text-[clamp(2.25rem,5vw,4rem)]">
                    {c.title} <span className="accent-word text-accent-text">{c.accentWord}</span>
                  </h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-ink/75">{c.description}</p>
                  <Link
                    href={`/shop?gender=${c.gender}`}
                    className="group mt-6 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[0.8125rem] font-medium uppercase tracking-[0.12em]"
                  >
                    {c.cta}
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
