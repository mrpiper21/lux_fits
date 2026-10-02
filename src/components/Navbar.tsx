"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site, whatsappLink, instagramLink, instagramHandle } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const mobileLinks = [{ label: "Shop all", href: "/shop" }, ...nav, { label: "Contact", href: "/#contact" }];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b bg-canvas transition-colors duration-500",
        scrolled ? "border-ink/10" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="label sr-only bg-ink px-4 py-3 text-canvas focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
      >
        Skip to content
      </a>
      <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-6 px-5 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="truncate text-[0.9375rem] font-semibold uppercase tracking-[0.18em]">
          {site.name}
        </Link>

        <nav aria-label="Collections" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-gender={"gender" in item ? item.gender : undefined}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="link-line text-[0.8125rem] uppercase tracking-[0.1em] [--underline:var(--accent)] after:h-[2px]!"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-7">
          <Link href="/#contact" className="link-line hidden text-[0.8125rem] uppercase tracking-[0.1em] lg:inline">
            Contact
          </Link>
          <div className="hidden sm:block">
            <ButtonLink href="/shop" className="min-h-10 px-6">
              Shop
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="min-h-11 text-[0.8125rem] uppercase tracking-[0.1em] lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-canvas lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="truncate text-[0.9375rem] font-semibold uppercase tracking-[0.18em]">{site.name}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 text-[0.8125rem] uppercase tracking-[0.1em]"
              >
                Close
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5">
              <ul>
                {mobileLinks.map((item, i) => {
                  const gender = "gender" in item ? item.gender : undefined;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.05 + i * 0.04, ease }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        data-gender={gender}
                        className="flex items-center gap-4 py-1.5"
                      >
                        <span className="display text-[clamp(2.5rem,11vw,4.5rem)]">{item.label}</span>
                        {gender && <span aria-hidden className="h-2.5 w-2.5 bg-accent" />}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="grid gap-4 px-5 pb-8">
              <ButtonLink href={whatsappLink()} external arrow>
                Chat on WhatsApp
              </ButtonLink>
              <div className="flex justify-between text-sm text-ink/60">
                <span>{site.location}</span>
                <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="link-line">
                  {instagramHandle()}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
