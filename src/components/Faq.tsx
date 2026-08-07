import { useState } from "react";
import { Plus } from "lucide-react";
import { faqContent, faqItems } from "@/content/site";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="intrebari" tone="surface">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow={faqContent.eyebrow}
          title={faqContent.title}
          subtitle={faqContent.subtitle}
        />
        <ul className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={item.question} delay={i * 40}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-card transition-colors",
                    isOpen ? "border-accent/50 shadow-card" : "border-border",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-[0.95rem] font-semibold">
                      {item.question}
                    </span>
                    <Plus
                      className={cn(
                        "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
