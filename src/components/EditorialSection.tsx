import { photos } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

/** A magazine spread between the shopping moments. */
export function EditorialSection() {
  return (
    <section aria-labelledby="editorial-title" className="bg-beige py-16 md:py-36">
      <div className="mx-auto grid grid-cols-1 max-w-[1600px] gap-10 px-5 md:grid-cols-12 md:gap-6 md:px-10">
        <Reveal className="relative aspect-[4/5] md:col-span-7 md:aspect-[5/6]">
          <Media
            src={photos.editorialLarge.src}
            alt={photos.editorialLarge.alt}
            tone={photos.editorialLarge.tone}
            position={photos.editorialLarge.position}
            sizes="(min-width: 768px) 58vw, 100vw"
          />
        </Reveal>

        <div className="flex flex-col justify-between gap-12 md:col-span-4 md:col-start-9">
          <Reveal>
            <h2 id="editorial-title" className="display text-[clamp(3rem,7vw,6.5rem)]">
              More
              <br />
              than <span className="accent-word">a</span>
              <br />
              pair.
            </h2>
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-ink/80">
              Style is in the details. Discover pieces selected for people who want their everyday look to say a
              little more.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative ml-auto aspect-[3/4] w-3/4 md:w-full">
            <Media
              src={photos.editorialSmall.src}
              alt={photos.editorialSmall.alt}
              tone="white"
              sizes="(min-width: 768px) 33vw, 75vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
