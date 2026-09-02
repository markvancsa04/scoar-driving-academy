import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import * as site from "@/content/site";
import { t, useLanguage } from "@/lib/i18n";

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
}

/**
 * Keeps document title / meta description in sync with the active
 * language. Route `head()` output is static (server rendered in the
 * default language), this re-applies it client side on HU ⇄ RO switch.
 */
export function LocalizedHead() {
  const { language } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const seo = pathname.startsWith("/oktatoink")
      ? site.instructorsContent.seo
      : site.siteSettings.seo;

    document.title = t(seo.title, language);
    setMeta('meta[name="description"]', t(seo.description, language));
    setMeta('meta[property="og:title"]', t(seo.ogTitle, language));
    setMeta('meta[property="og:description"]', t(seo.ogDescription, language));
    setMeta('meta[property="og:locale"]', language === "ro" ? "ro_RO" : "hu_RO");
  }, [language, pathname]);

  return null;
}
