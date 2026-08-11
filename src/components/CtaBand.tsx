import { Phone } from "lucide-react";
import { useSiteContent } from "@/data/content";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

export function CtaBand() {
  const { ctaContent, contactInfo } = useSiteContent();

  return (
    <section className="bg-primary py-20 text-primary-foreground sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {ctaContent.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/70">
            {ctaContent.subtitle}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={ctaContent.primaryCta.href} variant="accent" size="lg">
              {ctaContent.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={contactInfo.phone.href} variant="onDark" size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {contactInfo.phone.display}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
