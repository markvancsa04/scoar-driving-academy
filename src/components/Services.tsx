import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

export function Services() {
  const { services, servicesContent } = useSiteContent();

  return (
    <Section id="servicii" tone="surface">
      <SectionHeading
        eyebrow={servicesContent.eyebrow}
        title={servicesContent.title}
        subtitle={servicesContent.subtitle}
        align="center"
      />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal as="li" key={service.id} delay={(i % 3) * 80}>
            <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon name={service.icon} className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              {service.cta && (
                <a
                  href={service.cta.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {service.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
