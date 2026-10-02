import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "light" | "outline" | "outline-light" | "text";

const base =
  "group inline-flex min-h-[3.25rem] items-center justify-center gap-3 px-8 text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-canvas hover:bg-ink/85",
  light: "bg-canvas text-ink hover:bg-beige",
  outline: "border border-ink text-ink hover:bg-ink hover:text-canvas",
  "outline-light": "border border-canvas text-canvas hover:bg-canvas hover:text-ink",
  text: "min-h-0 justify-start px-0 text-ink",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  external?: boolean;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

/** Rectangular call to action. */
export function ButtonLink({
  href,
  variant = "solid",
  external,
  arrow = false,
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  const content = (
    <>
      <span className={variant === "text" ? "link-line" : undefined}>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  const classes = cn(base, variants[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

export function Arrow({ direction = "right" }: { direction?: "right" | "left" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-500 ease-editorial",
        direction === "right" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1",
      )}
    >
      {direction === "right" ? "→" : "←"}
    </span>
  );
}
