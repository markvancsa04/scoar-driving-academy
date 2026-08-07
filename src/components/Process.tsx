import { processContent, processSteps } from "@/content/site";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

export function Process() {
  return (
    <Section>
      <SectionHeading
        eyebrow={processContent.eyebrow}
        title={processContent.title}
        align="center"
      />
      <ol className="relative mt-14 grid gap-6 lg:grid-cols-4">
        <div
          className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-border lg:block"
          aria-hidden="true"
        />
        {processSteps.map((step, i) => (
          <Reveal as="li" key={step.step} delay={i * 90} className="relative">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon name={step.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-3xl font-bold text-border">{step.step}</span>
              </div>
              <h3 className="mt-6 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
