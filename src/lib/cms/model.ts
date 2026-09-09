/**
 * CMS model — describes which parts of the website are editable and how
 * each value should be rendered in the admin panel.
 *
 * The shape of the editable data is derived automatically from the static
 * content tree (`src/content/site.ts`), so nothing has to be maintained
 * twice: every text, link, number and image that the website renders is
 * editable, in both languages.
 */

export type Json = any;

/** Singleton sections — exactly one editable record each. */
export const SECTION_KEYS = [
  "siteSettings",
  "navCta",
  "heroContent",
  "aboutContent",
  "servicesContent",
  "instructorsContent",
  "vehiclesContent",
  "advantagesContent",
  "processContent",
  "galleryContent",
  "testimonialsContent",
  "faqContent",
  "newsContent",
  "ctaContent",
  "contactInfo",
  "footerContent",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

/** Repeatable collections — content key → Supabase table. */
export const COLLECTIONS = {
  navigation: "cms_navigation",
  heroHighlights: "cms_hero_highlights",
  services: "cms_services",
  instructors: "cms_instructors",
  vehicles: "cms_vehicles",
  advantages: "cms_advantages",
  processSteps: "cms_process_steps",
  galleryImages: "cms_gallery_images",
  testimonials: "cms_testimonials",
  faqItems: "cms_faq_items",
  newsItems: "cms_news_items",
  socialLinks: "cms_social_links",
} as const;

export type CollectionKey = keyof typeof COLLECTIONS;
export const COLLECTION_KEYS = Object.keys(COLLECTIONS) as CollectionKey[];

/** Admin navigation labels (Romanian). */
export const LABELS: Record<string, string> = {
  siteSettings: "Setări site și SEO",
  navCta: "Buton meniu",
  heroContent: "Secțiunea principală (Hero)",
  aboutContent: "Despre noi",
  servicesContent: "Servicii — titluri",
  instructorsContent: "Instructori — titluri",
  vehiclesContent: "Mașini — titluri",
  advantagesContent: "Avantaje — titluri",
  processContent: "Pași — titluri",
  galleryContent: "Galerie — titluri",
  testimonialsContent: "Recenzii — titluri",
  faqContent: "Întrebări frecvente — titluri",
  newsContent: "Noutăți — titluri",
  ctaContent: "Bandă de îndemn (CTA)",
  contactInfo: "Date de contact",
  footerContent: "Subsol (footer)",

  navigation: "Meniu de navigare",
  heroHighlights: "Evidențieri Hero",
  services: "Servicii",
  instructors: "Instructori",
  vehicles: "Mașini",
  advantages: "Avantaje",
  processSteps: "Pașii înscrierii",
  galleryImages: "Galerie foto",
  testimonials: "Recenzii",
  faqItems: "Întrebări frecvente",
  newsItems: "Noutăți",
  socialLinks: "Rețele sociale",

  // frequent field names
  title: "Titlu",
  subtitle: "Subtitlu",
  eyebrow: "Etichetă",
  description: "Descriere",
  label: "Text",
  href: "Link",
  name: "Nume",
  role: "Rol",
  bio: "Prezentare",
  experience: "Experiență",
  categories: "Categorii",
  image: "Imagine",
  alt: "Text alternativ",
  src: "Adresă imagine",
  storagePath: "Fișier încărcat",
  icon: "Pictogramă",
  featured: "Afișat pe pagina principală",
  rating: "Notă",
  location: "Localitate",
  question: "Întrebare",
  answer: "Răspuns",
  excerpt: "Rezumat",
  category: "Categorie",
  date: "Dată (AAAA-LL-ZZ)",
  dateLabel: "Dată afișată",
  cta: "Buton",
  primaryCta: "Buton principal",
  secondaryCta: "Buton secundar",
  specs: "Specificații",
  value: "Valoare",
  transmission: "Cutie de viteze",
  fuel: "Combustibil",
  phones: "Telefoane",
  email: "E-mail",
  address: "Adresă",
  openingHours: "Program",
  form: "Formular",
  seo: "SEO",
  copyrightYear: "An copyright",
  logo: "Logo",
};

export function labelFor(key: string): string {
  if (LABELS[key]) return LABELS[key]!;
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export function isLocalized(v: unknown): v is { hu: string; ro: string } {
  return (
    !!v && typeof v === "object" && !Array.isArray(v) && ("hu" in (v as object) || "ro" in (v as object))
  );
}

export function isImage(v: unknown): boolean {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const o = v as Record<string, unknown>;
  return "src" in o || "storagePath" in o || ("alt" in o && Object.keys(o).length <= 4);
}
