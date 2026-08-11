/**
 * =============================================================
 *  Data layer — the single integration point for the backend
 * =============================================================
 *  Components import content from here, never from a content file
 *  directly. Today the content comes from the static, client-editable
 *  file `src/content/site.ts`.
 *
 *  When the client's Supabase project is connected, only this module
 *  changes: each getter below becomes a query (or a server function
 *  wrapping a query) returning the exact same shapes from
 *  `src/content/types.ts`. No UI component needs to be rewritten.
 *
 *  Bilingual model
 *  ---------------
 *  The raw content stores every translatable string as `{ hu, ro }`.
 *  `getSiteContent(language)` resolves the whole tree for the active
 *  language, so components always receive plain strings.
 * =============================================================
 */

import { useMemo } from "react";
import * as site from "@/content/site";
import { DEFAULT_LANGUAGE, resolveContent, useLanguage } from "@/lib/i18n";
import type {
  FaqItem as RawFaqItem,
  ImageAsset as RawImageAsset,
  Instructor as RawInstructor,
  Language,
  NavItem as RawNavItem,
  NewsItem as RawNewsItem,
  Resolved,
  Service as RawService,
  Testimonial as RawTestimonial,
  Vehicle as RawVehicle,
} from "@/content/types";

export type { Language, Resolved } from "@/content/types";

/* ------------------------------------------------------------------ */
/* View types — what components actually receive (plain strings)       */
/* ------------------------------------------------------------------ */

export type ImageAsset = Resolved<RawImageAsset>;
export type NavItem = Resolved<RawNavItem>;
export type Service = Resolved<RawService>;
export type Instructor = Resolved<RawInstructor>;
export type Vehicle = Resolved<RawVehicle>;
export type Testimonial = Resolved<RawTestimonial>;
export type FaqItem = Resolved<RawFaqItem>;
export type NewsItem = Resolved<RawNewsItem>;

/* ------------------------------------------------------------------ */
/* Raw content tree (Supabase replaces this object, nothing else)      */
/* ------------------------------------------------------------------ */

const rawContent = {
  siteSettings: site.siteSettings,
  navigation: site.navigation,
  navCta: site.navCta,
  heroContent: site.heroContent,
  heroHighlights: site.heroHighlights,
  aboutContent: site.aboutContent,
  servicesContent: site.servicesContent,
  services: site.services,
  instructorsContent: site.instructorsContent,
  instructors: site.instructors,
  vehiclesContent: site.vehiclesContent,
  vehicles: site.vehicles,
  advantagesContent: site.advantagesContent,
  advantages: site.advantages,
  processContent: site.processContent,
  processSteps: site.processSteps,
  galleryContent: site.galleryContent,
  galleryImages: site.galleryImages,
  testimonialsContent: site.testimonialsContent,
  testimonials: site.testimonials,
  faqContent: site.faqContent,
  faqItems: site.faqItems,
  newsContent: site.newsContent,
  newsItems: site.newsItems,
  ctaContent: site.ctaContent,
  contactInfo: site.contactInfo,
  socialLinks: site.socialLinks,
  footerContent: site.footerContent,
};

export type SiteContent = Resolved<typeof rawContent>;

/** Resolves the whole content tree for a language. */
export function getSiteContent(language: Language = DEFAULT_LANGUAGE): SiteContent {
  return resolveContent(rawContent, language);
}

/** Content in the default language — used for SSR metadata (head, JSON-LD). */
export const defaultContent = getSiteContent(DEFAULT_LANGUAGE);

/** The hook every component uses to read content. */
export function useSiteContent(): SiteContent {
  const { language } = useLanguage();
  return useMemo(() => getSiteContent(language), [language]);
}
