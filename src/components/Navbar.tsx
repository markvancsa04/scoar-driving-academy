import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/data/content";
import { useUi } from "@/lib/i18n";
import { ButtonLink } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteImage } from "./SiteImage";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { navigation, navCta, siteSettings, contactInfo } = useSiteContent();
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
        <div className="grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 xl:grid-cols-[auto_minmax(0,1fr)_auto]">
          <Link to="/" hash="acasa" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="flex min-w-0 flex-col items-start gap-1">
              <span
                className={cn(
                  "grid h-14 w-[224px] shrink-0 place-items-center rounded-xl p-1 transition-colors sm:h-16 sm:w-[256px] xl:h-[72px] xl:w-[288px]",
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
                  "block whitespace-nowrap font-display text-sm font-bold uppercase leading-tight tracking-tight sm:text-base",
                  solid ? "text-foreground" : "text-primary-foreground",
                )}
              >
                SCOBAR AUTÓSISKOLA
              </span>
            </span>
            <span
              className={cn(
                "hidden min-w-0 truncate text-[0.7rem] uppercase tracking-[0.18em] lg:block",
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
                  index >= 5 && index < navigation.length - 1 && "hidden",
                  solid
                    ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                {item.label}
              </Link>

            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contactInfo.phone.href}
              className={cn(
                "hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:inline-flex xl:hidden",
                solid ? "text-foreground hover:text-accent" : "text-primary-foreground hover:text-accent",
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {contactInfo.phone.display}
            </a>

            <LanguageSwitcher onDark={!solid} className="hidden sm:inline-flex" />
            <ButtonLink href={navCta.href} variant="accent" className="hidden md:inline-flex">
              {navCta.label}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? ui("menuClose") : ui("menuOpen")}
              aria-expanded={open}
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors xl:hidden",
                solid
                  ? "border-border text-foreground"
                  : "border-primary-foreground/25 text-primary-foreground",
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
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
          <ButtonLink
            href={navCta.href}
            variant="accent"
            size="lg"
            className="mt-3"
            onClick={() => setOpen(false)}
          >
            {navCta.label}
          </ButtonLink>
          <div className="mt-4 flex items-center justify-between gap-3">
            <a
              href={contactInfo.phone.href}
              className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-muted-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {contactInfo.phone.display}
            </a>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
