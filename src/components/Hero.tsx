import { heroContent, heroHighlights } from "@/data/content";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SiteImage } from "./SiteImage";

export function Hero() {
  return (
    <section id="acasa" className="relative isolate overflow-hidden bg-primary">
      <SiteImage
        image={heroContent.image}
        loading="eager"
        ratioClassName="absolute inset-0 -z-20 h-full w-full"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,oklch(0.22_0.03_255/0.94)_0%,oklch(0.22_0.03_255/0.78)_45%,oklch(0.22_0.03_255/0.35)_100%)]"
        aria-hidden="true"
      />

      <div className="container-page relative flex min-h-[92svh] flex-col justify-center pb-16 pt-32 sm:pb-24 sm:pt-36">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 backdrop-blur">
            {heroContent.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl lg:text-[4rem]">
            {heroContent.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            {heroContent.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={heroContent.primaryCta.href} variant="accent" size="lg">
              {heroContent.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={heroContent.secondaryCta.href} variant="onDark" size="lg">
              {heroContent.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {heroContent.trustIndicators.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80"
              >
                <Icon name={item.icon} className="h-4 w-4 text-accent" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Value strip */}
      <div className="relative border-t border-primary-foreground/10 bg-secondary/60 backdrop-blur">
        <div className="container-page grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {heroHighlights.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="flex gap-4 py-7 sm:pr-8 lg:py-9"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon name={item.icon} className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-primary-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-primary-foreground/65">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
