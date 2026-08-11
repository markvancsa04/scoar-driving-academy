import { Check } from "lucide-react";
import { aboutContent } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="despre-noi">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-first lg:order-last">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={aboutContent.image.src}
              alt={aboutContent.image.alt}
              width={1200}
              height={1408}
              loading="lazy"
              className="h-[380px] w-full object-cover sm:h-[520px]"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-[70%] sm:grid-cols-2">
            {aboutContent.stats.slice(0, 2).map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow={aboutContent.eyebrow} title={aboutContent.title} />
          <Reveal delay={80}>
            {aboutContent.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {aboutContent.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm font-medium">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {aboutContent.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-surface p-4">
                  <div className="font-display text-2xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
