import { MapPin, Phone, Mail } from "lucide-react";
import {
  siteSettings,
  navigation,
  services,
  contactInfo,
  socialLinks,
  footerContent,
} from "@/data/content";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="bg-secondary text-primary-foreground">
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent font-display text-sm font-bold text-accent-foreground">
                AS
              </span>
              <span className="font-display text-base font-bold">{siteSettings.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              {footerContent.description}
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-primary-foreground/15 text-primary-foreground/70 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={social.icon} className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={footerContent.navTitle}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              {footerContent.navTitle}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-foreground/60 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              {footerContent.servicesTitle}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#servicii"
                    className="text-sm text-primary-foreground/60 transition-colors hover:text-accent"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
              {footerContent.contactTitle}
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-primary-foreground/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <address className="not-italic">{contactInfo.address.full}</address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={contactInfo.phone.href} className="transition-colors hover:text-accent">
                  {contactInfo.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a
                  href={contactInfo.email.href}
                  className="break-all transition-colors hover:text-accent"
                >
                  {contactInfo.email.display}
                </a>
              </li>
              <li className="pt-1">
                {contactInfo.openingHours[0]?.day}: {contactInfo.openingHours[0]?.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-primary-foreground/10 pt-7 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-primary-foreground/50">{footerContent.copyright}</p>
          <ul className="flex flex-wrap gap-5">
            {footerContent.legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-primary-foreground/50 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
