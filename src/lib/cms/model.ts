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

/** Admin navigation labels — Hungarian first, Romanian available. */
export const LABELS: Record<string, { hu: string; ro: string }> = {
  siteSettings: { hu: "Oldalbeállítások és SEO", ro: "Setări site și SEO" },
  navCta: { hu: "Menü gomb", ro: "Buton meniu" },
  heroContent: { hu: "Főszakasz (Hero)", ro: "Secțiunea principală (Hero)" },
  aboutContent: { hu: "Rólunk", ro: "Despre noi" },
  servicesContent: { hu: "Szolgáltatások — címek", ro: "Servicii — titluri" },
  instructorsContent: { hu: "Oktatók — címek", ro: "Instructori — titluri" },
  vehiclesContent: { hu: "Autók — címek", ro: "Mașini — titluri" },
  advantagesContent: { hu: "Előnyök — címek", ro: "Avantaje — titluri" },
  processContent: { hu: "Lépések — címek", ro: "Pași — titluri" },
  galleryContent: { hu: "Galéria — címek", ro: "Galerie — titluri" },
  testimonialsContent: { hu: "Értékelések — címek", ro: "Recenzii — titluri" },
  faqContent: { hu: "Gyakori kérdések — címek", ro: "Întrebări frecvente — titluri" },
  newsContent: { hu: "Hírek — címek", ro: "Noutăți — titluri" },
  ctaContent: { hu: "Felhívás sáv (CTA)", ro: "Bandă de îndemn (CTA)" },
  contactInfo: { hu: "Kapcsolati adatok", ro: "Date de contact" },
  footerContent: { hu: "Lábléc", ro: "Subsol (footer)" },

  navigation: { hu: "Navigációs menü", ro: "Meniu de navigare" },
  heroHighlights: { hu: "Hero kiemelések", ro: "Evidențieri Hero" },
  services: { hu: "Szolgáltatások", ro: "Servicii" },
  instructors: { hu: "Oktatók", ro: "Instructori" },
  vehicles: { hu: "Autók", ro: "Mașini" },
  advantages: { hu: "Előnyök", ro: "Avantaje" },
  processSteps: { hu: "A beiratkozás lépései", ro: "Pașii înscrierii" },
  galleryImages: { hu: "Galéria képek", ro: "Galerie foto" },
  testimonials: { hu: "Értékelések", ro: "Recenzii" },
  faqItems: { hu: "Gyakori kérdések", ro: "Întrebări frecvente" },
  newsItems: { hu: "Hírek", ro: "Noutăți" },
  socialLinks: { hu: "Közösségi oldalak", ro: "Rețele sociale" },

  // frequent field names
  title: { hu: "Cím", ro: "Titlu" },
  subtitle: { hu: "Alcím", ro: "Subtitlu" },
  eyebrow: { hu: "Címke", ro: "Etichetă" },
  description: { hu: "Leírás", ro: "Descriere" },
  label: { hu: "Szöveg", ro: "Text" },
  href: { hu: "Hivatkozás", ro: "Link" },
  name: { hu: "Név", ro: "Nume" },
  role: { hu: "Beosztás", ro: "Rol" },
  bio: { hu: "Bemutatkozás", ro: "Prezentare" },
  experience: { hu: "Tapasztalat", ro: "Experiență" },
  categories: { hu: "Kategóriák", ro: "Categorii" },
  image: { hu: "Kép", ro: "Imagine" },
  alt: { hu: "Alternatív szöveg", ro: "Text alternativ" },
  src: { hu: "Kép címe", ro: "Adresă imagine" },
  storagePath: { hu: "Feltöltött fájl", ro: "Fișier încărcat" },
  icon: { hu: "Ikon", ro: "Pictogramă" },
  featured: { hu: "Megjelenik a főoldalon", ro: "Afișat pe pagina principală" },
  rating: { hu: "Osztályzat", ro: "Notă" },
  location: { hu: "Helység", ro: "Localitate" },
  question: { hu: "Kérdés", ro: "Întrebare" },
  answer: { hu: "Válasz", ro: "Răspuns" },
  excerpt: { hu: "Kivonat", ro: "Rezumat" },
  category: { hu: "Kategória", ro: "Categorie" },
  date: { hu: "Dátum (ÉÉÉÉ-HH-NN)", ro: "Dată (AAAA-LL-ZZ)" },
  dateLabel: { hu: "Megjelenített dátum", ro: "Dată afișată" },
  cta: { hu: "Gomb", ro: "Buton" },
  primaryCta: { hu: "Fő gomb", ro: "Buton principal" },
  secondaryCta: { hu: "Másodlagos gomb", ro: "Buton secundar" },
  specs: { hu: "Jellemzők", ro: "Specificații" },
  value: { hu: "Érték", ro: "Valoare" },
  transmission: { hu: "Váltó", ro: "Cutie de viteze" },
  fuel: { hu: "Üzemanyag", ro: "Combustibil" },
  price: { hu: "Ár", ro: "Preț" },
  phones: { hu: "Telefonszámok", ro: "Telefoane" },
  email: { hu: "E-mail", ro: "E-mail" },
  address: { hu: "Cím", ro: "Adresă" },
  openingHours: { hu: "Nyitvatartás", ro: "Program" },
  form: { hu: "Űrlap", ro: "Formular" },
  seo: { hu: "SEO", ro: "SEO" },
  copyrightYear: { hu: "Copyright év", ro: "An copyright" },
  logo: { hu: "Logó", ro: "Logo" },
};

export function labelFor(key: string, lang: "hu" | "ro" = "hu"): string {
  const entry = LABELS[key];
  if (entry) return entry[lang] || entry.hu;
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
