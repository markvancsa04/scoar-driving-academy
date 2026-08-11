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
 *  Example future implementation:
 *
 *    export async function getInstructors(): Promise<Instructor[]> {
 *      const { data, error } = await supabase
 *        .from("instructors")
 *        .select("*")
 *        .order("sort_order");
 *      if (error) throw error;
 *      return data.map(mapInstructorRow);
 *    }
 *
 *  Note: getters are intentionally plain (synchronous) for now so the
 *  site stays fully static and SSR-safe. Swapping them for async
 *  versions consumed via route loaders + TanStack Query is a local
 *  change inside the components that read them.
 * =============================================================
 */

import * as site from "@/content/site";
import type {
  FaqItem,
  ImageAsset,
  Instructor,
  NavItem,
  NewsItem,
  Service,
  SiteSettings,
  Testimonial,
  Vehicle,
} from "@/content/types";

export const getSiteSettings = (): SiteSettings => site.siteSettings;
export const getNavigation = (): NavItem[] => site.navigation;
export const getNavCta = () => site.navCta;

export const getHeroContent = () => site.heroContent;
export const getHeroHighlights = () => site.heroHighlights;
export const getAboutContent = () => site.aboutContent;
export const getAdvantages = () => site.advantages;
export const getAdvantagesContent = () => site.advantagesContent;
export const getProcessContent = () => site.processContent;
export const getProcessSteps = () => site.processSteps;
export const getCtaContent = () => site.ctaContent;
export const getFooterContent = () => site.footerContent;

export const getServices = (): Service[] => site.services;
export const getInstructors = (): Instructor[] => site.instructors;
export const getVehicles = (): Vehicle[] => site.vehicles;
export const getTestimonials = (): Testimonial[] => site.testimonials;
export const getTestimonialsContent = () => site.testimonialsContent;
export const getFaqItems = (): FaqItem[] => site.faqItems;
export const getFaqContent = () => site.faqContent;
export const getNews = (): NewsItem[] => site.newsItems;
export const getNewsContent = () => site.newsContent;
export const getGalleryImages = (): ImageAsset[] => site.galleryImages;
export const getGalleryContent = () => site.galleryContent;

export const getContactInfo = () => site.contactInfo;
export const getSocialLinks = () => site.socialLinks;

/* ------------------------------------------------------------------ */
/* Convenience re-exports                                              */
/* ------------------------------------------------------------------ */
/**
 * Components import content from this module (never from
 * `src/content/site.ts`). These named exports are the current, static
 * implementation of the getters above. When Supabase is connected, the
 * components move to the async getters / route loaders and these
 * re-exports are removed — the import path stays the same.
 */
export type * from "@/content/types";

export const {
  siteSettings,
  navigation,
  navCta,
  heroContent,
  heroHighlights,
  aboutContent,
  advantages,
  advantagesContent,
  services,
  instructors,
  vehicles,
  processContent,
  processSteps,
  galleryContent,
  galleryImages,
  testimonials,
  testimonialsContent,
  faqContent,
  faqItems,
  newsContent,
  newsItems,
  ctaContent,
  contactInfo,
  socialLinks,
  footerContent,
} = site;
