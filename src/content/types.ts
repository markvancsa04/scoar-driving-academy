/**
 * =============================================================
 *  Content model — single source of truth for the site's shapes
 * =============================================================
 *  These types describe the data the UI renders. They are written
 *  so that each one can later be backed by a Supabase table with
 *  the same column names (snake_case ⇄ camelCase mapping happens
 *  in the data layer, never in components).
 *
 *  Suggested future tables:
 *    site_settings, navigation, sections, services, instructors,
 *    vehicles, testimonials, faq_items, news, gallery_images,
 *    contact_info, social_links
 * =============================================================
 */

export type IconName = string;

/**
 * A single image.
 *
 * - `src`      — a bundled local asset (temporary, development).
 * - `storagePath` — a path inside a future Supabase Storage bucket
 *   (e.g. "instructors/zoltan.jpg"). When present it wins over `src`.
 *
 * Always render through `<SiteImage />` so the resolution strategy can
 * change in one place.
 */
export interface ImageAsset {
  src?: string;
  storagePath?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkItem {
  label: string;
  href: string;
}

export type NavItem = LinkItem;

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  cta?: LinkItem;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  categories: string[];
  image: ImageAsset;
  contact?: LinkItem;
}

export interface Vehicle {
  id: string;
  name: string;
  transmission: string;
  fuel: string;
  description: string;
  specs: { label: string; value: string }[];
  image: ImageAsset;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  location?: string;
  image?: ImageAsset;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NewsItem {
  id: string;
  /** ISO date string (YYYY-MM-DD) — never a Date object, keeps SSR deterministic. */
  date: string;
  /** Pre-formatted, human readable date in the site locale. */
  dateLabel: string;
  category: string;
  title: string;
  excerpt: string;
  image?: ImageAsset;
  cta?: LinkItem;
}

export interface SeoContent {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: ImageAsset;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  locale: string;
  copyrightYear: number;
  seo: SeoContent;
}

export interface SectionHeadingContent {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}
