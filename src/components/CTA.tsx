import { photos } from "@/data/media";
import { whatsappLink, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-ink text-canvas">
      <div className="mx-auto grid grid-cols-1 max-w-[1600px] gap-12 px-5 py-16 md:grid-cols-12 md:items-end md:gap-6 md:px-10 md:py-32">
        <Reveal className="md:col-span-7">
          <h2 id="cta-title" className="display text-[clamp(3rem,8.5vw,8.5rem)]">
            Find your next <span className="accent-word">favorite</span> pair.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-canvas/80">
            Something caught your eye? Talk to us and let&apos;s find the right one for you.
          </p>
          <div className="mt-10">
            <ButtonLink
              href={whatsappLink(`Hello ${site.name}! I'd like some help finding a pair.`)}
              external
              variant="light"
              arrow
            >
              Chat with us
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative hidden aspect-[3/4] md:col-span-4 md:col-start-9 md:block">
          <Media src={photos.cta.src} alt={photos.cta.alt} tone={photos.cta.tone}
            position={photos.cta.position} sizes="33vw" />
        </Reveal>
      </div>
    </section>
  );
}
