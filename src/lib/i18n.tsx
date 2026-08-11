import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Language, Loc, Localized, Resolved } from "@/content/types";

/* ------------------------------------------------------------------ */
/* Language configuration                                              */
/* ------------------------------------------------------------------ */

export const DEFAULT_LANGUAGE: Language = "hu";

export const LANGUAGES: { code: Language; label: string; short: string; htmlLang: string }[] = [
  { code: "hu", label: "Magyar", short: "HU", htmlLang: "hu" },
  { code: "ro", label: "Română", short: "RO", htmlLang: "ro" },
];

const STORAGE_KEY = "scobar.language";

/* ------------------------------------------------------------------ */
/* Resolution helpers                                                  */
/* ------------------------------------------------------------------ */

function isLocalized(value: unknown): value is Localized {
  return (
    typeof value === "object" &&
    value !== null &&
    "hu" in (value as Record<string, unknown>) &&
    "ro" in (value as Record<string, unknown>)
  );
}

/** Resolves a single translatable value. */
export function t(value: Loc | undefined, lang: Language): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value[DEFAULT_LANGUAGE];
}

/**
 * Deeply resolves every `Loc` value inside a content tree so components
 * only ever deal with plain strings.
 */
export function resolveContent<T>(value: T, lang: Language): Resolved<T> {
  if (isLocalized(value)) return t(value, lang) as Resolved<T>;
  if (Array.isArray(value)) {
    return value.map((item) => resolveContent(item, lang)) as Resolved<T>;
  }
  if (typeof value === "object" && value !== null) {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      out[key] = resolveContent(item, lang);
    }
    return out as Resolved<T>;
  }
  return value as Resolved<T>;
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start from the default so SSR and the first client render match.
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "hu" || stored === "ro") setLanguageState(stored);
  }, []);

  useEffect(() => {
    const entry = LANGUAGES.find((l) => l.code === language);
    if (entry) document.documentElement.lang = entry.htmlLang;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — language simply is not persisted */
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** UI strings that do not belong to editable page content. */
export const ui = {
  languageSwitcherLabel: { hu: "Nyelv váltása", ro: "Schimbă limba" },
  menuOpen: { hu: "Menü megnyitása", ro: "Deschide meniul" },
  menuClose: { hu: "Menü bezárása", ro: "Închide meniul" },
} satisfies Record<string, Localized>;

export function useUi() {
  const { language } = useLanguage();
  return useCallback((key: keyof typeof ui) => t(ui[key], language), [language]);
}
