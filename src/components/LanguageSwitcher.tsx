import { Globe } from "lucide-react";
import { LANGUAGES, useLanguage, useUi } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Compact HU / RO switcher. Hungarian is the default language;
 * the choice is remembered in the browser.
 */
export function LanguageSwitcher({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  const { language, setLanguage } = useLanguage();
  const ui = useUi();

  return (
    <div
      role="group"
      aria-label={ui("languageSwitcherLabel")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5",
        onDark ? "border-primary-foreground/25 bg-primary-foreground/10" : "border-border bg-card",
        className,
      )}
    >
      <Globe
        className={cn(
          "ml-1.5 h-3.5 w-3.5 shrink-0",
          onDark ? "text-primary-foreground/70" : "text-muted-foreground",
        )}
        aria-hidden="true"
      />
      {LANGUAGES.map((entry) => {
        const active = entry.code === language;
        return (
          <button
            key={entry.code}
            type="button"
            lang={entry.htmlLang}
            onClick={() => setLanguage(entry.code)}
            aria-pressed={active}
            title={entry.label}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : onDark
                  ? "text-primary-foreground/75 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            {entry.short}
          </button>
        );
      })}
    </div>
  );
}
