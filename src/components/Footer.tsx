import Link from "next/link";
import { nav, site, whatsappLink, instagramLink, instagramHandle, phoneLink } from "@/lib/site";

export function Footer() {
  const tel = phoneLink();

  return (
    <footer id="contact" className="bg-canvas pb-10 pt-20 md:pt-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <h2 className="display text-[clamp(2.25rem,4vw,3.5rem)]">
              Say <span className="accent-word">hello</span>
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-ink/75">{site.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[0.9375rem] md:col-span-5">
            <div>
              <h3 className="label mb-2 text-ink/50">Visit</h3>
              <p>{site.location}</p>
            </div>
            <div>
              <h3 className="label mb-2 text-ink/50">Call</h3>
              <p>{tel ? <a href={tel} className="link-line">{site.phone}</a> : site.phone}</p>
            </div>
            <div>
              <h3 className="label mb-2 text-ink/50">WhatsApp</h3>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-line">
                {site.whatsapp}
              </a>
            </div>
            <div>
              <h3 className="label mb-2 text-ink/50">Instagram</h3>
              <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="link-line">
                {instagramHandle()}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <ul className="space-y-2 text-[0.9375rem]">
              <li>
                <Link href="/shop" className="link-line">Shop all</Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-2 border-t border-ink/10 pt-6 text-sm text-ink/50 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Footwear &amp; Lacoste</span>
        </div>
      </div>
    </footer>
  );
}
