import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80dvh] max-w-[1600px] flex-col justify-end px-5 pb-20 pt-32 md:px-10">
      <h1 className="display text-[clamp(3.5rem,13vw,12rem)]">
        Wrong <span className="accent-word">size.</span>
      </h1>
      <p className="mt-8 max-w-sm text-lg text-ink/75">This page doesn&apos;t exist — but the collection does.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/shop" arrow>
          Shop collection
        </ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back home
        </ButtonLink>
      </div>
    </section>
  );
}
