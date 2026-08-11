import { CalendarDays, ArrowRight } from "lucide-react";
import { newsContent, newsItems } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { SiteImage } from "./SiteImage";

export function News() {
  return (
    <Section id="hirek">
      <SectionHeading
        eyebrow={newsContent.eyebrow}
        title={newsContent.title}
        subtitle={newsContent.subtitle}
        align="center"
      />

      {newsItems.length === 0 ? (
        <p className="mt-14 rounded-3xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
          {newsContent.emptyLabel}
        </p>
      ) : (
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 80} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                {item.image && (
                  <SiteImage
                    image={item.image}
                    ratioClassName="aspect-[3/2] w-full"
                    className="object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-accent/15 px-3 py-1 font-semibold uppercase tracking-wider text-accent">
                      {item.category}
                    </span>
                    <time
                      dateTime={item.date}
                      className="inline-flex items-center gap-1.5 font-medium"
                    >
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.dateLabel}
                    </time>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                  {item.cta && (
                    <a
                      href={item.cta.href}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-accent"
                    >
                      {item.cta.label}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
