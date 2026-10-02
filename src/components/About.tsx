import { photos } from "@/data/media";
import { site } from "@/lib/site";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <Reveal className="relative aspect-[4/5] md:col-span-5">
          <Media src={photos.about.src} alt={photos.about.alt} tone={photos.about.tone}
            position={photos.about.position} sizes="(min-width: 768px) 42vw, 100vw" />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <h2 id="about-title" className="display text-[clamp(3rem,7vw,6.5rem)]">
            Style that feels <span className="accent-word">like you.</span>
          </h2>
          {/* The brand story is intentionally a placeholder — see src/lib/site.ts */}
          <p className="mt-10 max-w-lg text-lg leading-relaxed text-ink/80">{site.aboutStory}</p>
          <p className="mt-10 text-sm text-ink/60">
            {site.location} <span aria-hidden>—</span> Orders and enquiries on WhatsApp
          </p>
        </Reveal>
      </div>
    </section>
  );
}
