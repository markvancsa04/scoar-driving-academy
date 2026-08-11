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
 *
 *  Bilingual model
 *  ---------------
 *  Every user facing string is a `Loc` value: either a plain string
 *  (same in both languages) or `{ hu, ro }`. In Supabase this maps
 *  cleanly to a jsonb column, or to `field_hu` / `field_ro` columns.
 *  Components never see `Loc` — the data layer resolves the content
 *  for the active language and hands over plain strings.
 * =============================================================
 */

export type Language = "hu" | "ro";

/** A string translated into every supported language. */
export interface Localized {
  hu: string;
  ro: string;
}

/** A translatable string: either localized or identical in both languages. */
export type Loc = string | Localized;

/**
 * Deeply replaces every `Loc` value with a plain `string`.
 * Used to type the content object that components consume.
 */
export type Resolved<T> = T extends Localized
  ? string
  : T extends string | number | boolean | null | undefined
    ? T
    : T extends ReadonlyArray<infer U>
      ? Array<Resolved<U>>
      : { [K in keyof T]: Resolved<T[K]> };

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
  alt: Loc;
  width?: number;
  height?: number;
}

export interface LinkItem {
  label: Loc;
  href: string;
}

export type NavItem = LinkItem;

export interface Service {
  id: string;
  icon: IconName;
  title: Loc;
  description: Loc;
  cta?: LinkItem;
}

export interface Instructor {
  id: string;
  name: string;
  role: Loc;
  bio: Loc;
  experience: Loc;
  categories: string[];
  image: ImageAsset;
  contact?: LinkItem;
  /** Shown in the featured (first three) block on the homepage. */
  featured?: boolean;
}

export interface Vehicle {
  id: string;
  name: Loc;
  transmission: Loc;
  fuel: Loc;
  description: Loc;
  specs: { label: Loc; value: Loc }[];
  image: ImageAsset;
}

export interface Testimonial {
  id: string;
  name: string;
  text: Loc;
  rating: number;
  location?: Loc;
  image?: ImageAsset;
}

export interface FaqItem {
  question: Loc;
  answer: Loc;
}

export interface NewsItem {
  id: string;
  /** ISO date string (YYYY-MM-DD) — never a Date object, keeps SSR deterministic. */
  date: string;
  /** Pre-formatted, human readable date in the site locale. */
  dateLabel: Loc;
  category: Loc;
  title: Loc;
  excerpt: Loc;
  image?: ImageAsset;
  cta?: LinkItem;
}

export interface SeoContent {
  title: Loc;
  description: Loc;
  ogTitle: Loc;
  ogDescription: Loc;
  ogImage?: ImageAsset;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: Loc;
  locale: string;
  copyrightYear: number;
  logo: ImageAsset;
  seo: SeoContent;
}

export interface SectionHeadingContent {
  eyebrow?: Loc;
  title: Loc;
  subtitle?: Loc;
}
