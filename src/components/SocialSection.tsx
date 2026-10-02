import { gallery } from "@/data/media";
import { instagramLink, instagramHandle } from "@/lib/site";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/*
 * FOLLOW THE LOOK — a lookbook of varied sizes that points to Instagram.
 * Mobile: 2 columns with full-width opener and closer. Desktop: 12 × 4 composition.
 */
const cells = [
  "col-span-2 aspect-[4/5] md:col-span-5 md:row-span-4 md:aspect-auto",
  "aspect-[3/4] md:col-span-4 md:row-span-2 md:aspect-auto",
  "aspect-[3/4] md:col-span-3 md:row-span-3 md:aspect-auto",
  "aspect-square md:col-span-2 md:col-start-6 md:row-span-2 md:aspect-auto",
  "aspect-square md:col-span-2 md:row-span-2 md:aspect-auto",
  "col-span-2 aspect-[16/9] md:col-span-3 md:col-start-10 md:row-span-1 md:aspect-auto",
];

export function SocialSection() {
  return (
    <section aria-labelledby="social-title" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <h2 id="social-title" className="display text-[clamp(3rem,8vw,7rem)]">
          Follow the <span className="accent-word">look</span>
        </h2>
        <ButtonLink href={instagramLink()} external variant="text" arrow>
          {instagramHandle()}
        </ButtonLink>
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-[repeat(4,minmax(9rem,13vw))] md:gap-4">
        {gallery.map((photo, i) => (
          <Reveal as="li" key={photo.src} delay={(i % 3) * 0.06} className={`relative ${cells[i]}`}>
            <a
              href={instagramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-0 block overflow-hidden"
            >
              <Media
                src={photo.src}
                alt={photo.alt}
                tone={photo.tone}
                position={photo.position}
                sizes="(min-width: 768px) 40vw, 50vw"
                className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.03]"
              />
              <span className="sr-only">View on Instagram (opens in a new tab)</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
