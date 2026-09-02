import { useCallback, useState, type FormEvent, type FocusEvent } from "react";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { useSiteContent } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { Icon } from "./Icon";

const fieldClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function Contact() {
  const { contactInfo, socialLinks } = useSiteContent();
  const [sent, setSent] = useState(false);
  const form = contactInfo.form;

  /** Localized native validation messages (browser defaults are OS-language). */
  const applyValidity = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement) => {
      el.setCustomValidity("");
      if (el.validity.valueMissing) {
        el.setCustomValidity(form.requiredMessage);
      } else if (el.validity.typeMismatch) {
        el.setCustomValidity(
          el.getAttribute("type") === "email" ? form.invalidEmailMessage : form.invalidPhoneMessage,
        );
      }
    },
    [form],
  );

  const validationProps = {
    onInvalid: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      applyValidity(e.currentTarget),
    onInput: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => applyValidity(e.currentTarget),
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => applyValidity(e.currentTarget),
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow={contactInfo.eyebrow}
        title={contactInfo.title}
        subtitle={contactInfo.subtitle}
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.05fr]">
        <Reveal className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-semibold">{contactInfo.businessName}</h3>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="font-medium">{contactInfo.labels.address}</div>
                  <address className="not-italic text-muted-foreground">
                    {contactInfo.address.full}
                  </address>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="font-medium">{contactInfo.labels.phone}</div>
                  <div className="flex flex-col gap-1">
                    {contactInfo.phones.map((entry) => (
                      <a
                        key={entry.href}
                        href={entry.href}
                        className="w-fit text-muted-foreground transition-colors hover:text-accent"
                      >
                        {entry.display}
                      </a>
                    ))}
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="font-medium">{contactInfo.labels.email}</div>
                  <a
                    href={contactInfo.email.href}
                    className="break-all text-muted-foreground transition-colors hover:text-accent"
                  >
                    {contactInfo.email.display}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{contactInfo.labels.openingHours}</div>
                  <dl className="mt-1 space-y-1 text-muted-foreground">
                    {contactInfo.openingHours.map((row) => (
                      <div key={row.day} className="flex justify-between gap-4">
                        <dt>{row.day}</dt>
                        <dd>{row.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>

            {socialLinks.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2 border-t border-border pt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name={social.icon} className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <iframe
              src={contactInfo.mapEmbedUrl}
              title={`${contactInfo.businessName} — ${contactInfo.labels.map}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0"
            />
          </div>
          <a
            href={contactInfo.mapLinkUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-accent"
          >
            {contactInfo.labels.directions}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={80}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-surface p-7 shadow-card sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  {contactInfo.form.nameLabel}
                </label>
                <input
                  id="name"
                  {...validationProps}
                  name="name"
                  required
                  placeholder={contactInfo.form.namePlaceholder}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  {contactInfo.form.phoneLabel}
                </label>
                <input
                  id="phone"
                  {...validationProps}
                  name="phone"
                  type="tel"
                  required
                  placeholder={contactInfo.form.phonePlaceholder}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  {contactInfo.form.emailLabel}
                </label>
                <input
                  id="email"
                  {...validationProps}
                  name="email"
                  type="email"
                  placeholder={contactInfo.form.emailPlaceholder}
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  {contactInfo.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  {...validationProps}
                  name="message"
                  rows={5}
                  required
                  placeholder={contactInfo.form.messagePlaceholder}
                  className={`${fieldClass} resize-none`}
                />
              </div>
            </div>

            <Button type="submit" variant="accent" size="lg" className="mt-7 w-full">
              {contactInfo.form.submitLabel}
            </Button>

            {sent && (
              <p
                role="status"
                className="mt-4 rounded-xl bg-accent/15 px-4 py-3 text-sm font-medium text-foreground"
              >
                {contactInfo.form.successMessage}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
