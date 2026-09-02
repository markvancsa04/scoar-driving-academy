import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/data/content";
import { useUi } from "@/lib/i18n";
import { ActionButtonLink, ActionLink, isDeadHref } from "./ActionLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteImage } from "./SiteImage";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { navigation, navCta, siteSettings, contactInfo, socialLinks } = useSiteContent();
  const ui = useUi();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page">
        <div className="grid h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:h-28 sm:gap-4 xl:grid-cols-[auto_minmax(0,1fr)_auto]">
          <Link to="/" hash="acasa" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="flex min-w-0 flex-col items-center gap-1">
              <span
                className={cn(
                  "grid aspect-[4/1] w-[8.5rem] min-w-[7.5rem] max-w-full place-items-center rounded-xl p-0.5 transition-colors sm:w-[15rem] sm:p-1 xl:w-[18rem]",
                  solid ? "bg-card ring-1 ring-border" : "bg-primary-foreground/90 backdrop-blur",
                )}
              >
                <SiteImage
                  image={siteSettings.logo}
                  loading="eager"
                  ratioClassName="h-full w-full"
                  className="object-contain"
                />
              </span>
              <span
                className={cn(
                  "block max-w-full truncate text-center font-display text-[0.6rem] font-bold uppercase leading-tight tracking-tight sm:text-sm md:text-base",
                  solid ? "text-foreground" : "text-primary-foreground",
                )}
              >
                {siteSettings.name}
              </span>
            </span>
            <span
              className={cn(
                "hidden min-w-0 truncate text-[0.7rem] uppercase tracking-[0.18em] 2xl:block",
                solid ? "text-muted-foreground" : "text-primary-foreground/70",
              )}
            >
              {siteSettings.tagline}
            </span>
          </Link>

          <nav className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                to="/"
                hash={item.href.replace("#", "")}
                className={cn(
                  "whitespace-nowrap rounded-full px-2 py-2 text-[0.78rem] font-medium transition-colors 2xl:px-3 2xl:text-sm",
                  // Secondary links only appear once there is room for them.
                  index >= 4 && index < navigation.length - 1 && "hidden 2xl:block",
                  solid
                    ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden shrink-0 flex-col items-end gap-0.5 sm:flex">
              {contactInfo.phones.map((entry) => (
                <a
                  key={entry.href}
                  href={entry.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold leading-tight transition-colors sm:gap-2",
                    solid
                      ? "text-foreground hover:text-accent"
                      : "text-primary-foreground hover:text-accent",
                  )}
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {entry.display}
                </a>
              ))}
            </div>

            <span className="hidden sm:block">
              <LanguageSwitcher onDark={!solid} />
            </span>

            <ActionButtonLink href={navCta.href} variant="accent" className="hidden md:inline-flex">
              {navCta.label}
            </ActionButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? ui("menuClose") : ui("menuOpen")}
              aria-expanded={open}
              className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors sm:h-11 sm:w-11 xl:hidden",
                solid
                  ? "border-border text-foreground"
                  : "border-primary-foreground/25 text-primary-foreground",
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile utility row: prominent phones + language switcher */}
        <div
          className={cn(
            "flex items-center justify-between gap-3 pb-3 sm:hidden",
            solid ? "border-t border-border" : "border-t border-primary-foreground/15",
          )}
        >
          <div className="flex flex-col gap-1">
            {contactInfo.phones.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold leading-tight transition-colors",
                  solid
                    ? "text-foreground hover:text-accent"
                    : "text-primary-foreground hover:text-accent",
                )}
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {entry.display}
              </a>
            ))}
          </div>
          <LanguageSwitcher onDark={!solid} />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 xl:hidden",
          open ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-page flex flex-col gap-1 overflow-y-auto py-5">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to="/"
              hash={item.href.replace("#", "")}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <ActionButtonLink
            href={navCta.href}
            variant="accent"
            size="lg"
            className="mt-3"
            onClick={() => setOpen(false)}
          >
            {navCta.label}
          </ActionButtonLink>

          {/* Mobile menu contact block: clickable phones, email, socials, language */}
          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
            {contactInfo.phones.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {entry.display}
              </a>
            ))}
            <a
              href={contactInfo.email.href}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 break-all rounded-xl px-4 py-2.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {contactInfo.email.display}
            </a>
            <div className="mt-2 flex items-center gap-2 px-2">
              {socialLinks
                .filter((social) => !isDeadHref(social.href))
                .map((social) => (
                  <ActionLink
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    onClick={() => setOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name={social.icon} className="h-4 w-4" aria-hidden="true" />
                  </ActionLink>
                ))}
              <span className="ml-auto">
                <LanguageSwitcher />
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
