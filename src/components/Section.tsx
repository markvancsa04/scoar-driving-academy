import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 sm:py-24 lg:py-28",
        tone === "surface" && "bg-surface",
        tone === "dark" && "bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
            invert ? "text-accent" : "text-accent",
          )}
        >
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            invert ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
