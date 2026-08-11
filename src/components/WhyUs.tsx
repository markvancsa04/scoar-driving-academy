import { advantages, advantagesContent } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

export function WhyUs() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow={advantagesContent.eyebrow}
        title={advantagesContent.title}
        subtitle={advantagesContent.subtitle}
        align="center"
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((item, i) => (
          <Reveal as="li" key={item.title} delay={(i % 3) * 70}>
            <div className="group h-full bg-card p-8 transition-colors duration-300 hover:bg-primary-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon name={item.icon} className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
