/**
 * =============================================================
 *  AUTOSISKOLA SCOBAR — central content configuration
 * =============================================================
 *  Minden szerkeszthető tartalom itt található.
 *  Everything on the website is driven by this file:
 *  texts, images, instructors, vehicles, services, reviews,
 *  FAQ, contact details, opening hours, social links, SEO.
 *
 *  Új nyelv hozzáadása / adding a language later:
 *  duplicate this file (e.g. site.ro.ts) and switch the export
 *  in src/content/index.ts.
 * =============================================================
 */

import heroImage from "@/assets/hero.jpg";
import aboutImage from "@/assets/about.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import vehicle1 from "@/assets/vehicle-1.jpg";
import vehicle2 from "@/assets/vehicle-2.jpg";
import vehicle3 from "@/assets/vehicle-3.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type IconName = string;

export interface NavItem {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  cta?: { label: string; href: string };
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  categories: string[];
  image: ImageAsset;
  contact?: { label: string; href: string };
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

/* ------------------------------------------------------------------ */
/* 1. Site settings & SEO                                              */
/* ------------------------------------------------------------------ */

export const siteSettings = {
  name: "AUTOSISKOLA SCOBAR",
  shortName: "SCOBAR",
  tagline: "Autósiskola Kézdivásárhelyen",
  locale: "hu-RO",
  seo: {
    title: "AUTOSISKOLA SCOBAR — Autósiskola Kézdivásárhelyen | B kategória",
    description:
      "B kategóriás jogosítvány Kézdivásárhelyen. Tapasztalt oktatók, modern gépkocsik, türelmes és gyakorlatorientált képzés. Jelentkezz még ma!",
    ogTitle: "AUTOSISKOLA SCOBAR — Tanulj vezetni magabiztosan",
    ogDescription:
      "B kategóriás vezetői engedély megszerzése Kézdivásárhelyen tapasztalt oktatókkal és modern gépkocsikkal.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 2. Navigation                                                       */
/* ------------------------------------------------------------------ */

export const navigation: NavItem[] = [
  { label: "Kezdőlap", href: "#acasa" },
  { label: "Rólunk", href: "#despre-noi" },
  { label: "Szolgáltatások", href: "#servicii" },
  { label: "Oktatók", href: "#instructori" },
  { label: "Gépkocsik", href: "#autovehicule" },
  { label: "Galéria", href: "#galerie" },
  { label: "Vélemények", href: "#recenzii" },
  { label: "Kérdések", href: "#intrebari" },
  { label: "Kapcsolat", href: "#contact" },
];

export const navCta = { label: "Înscriere", href: "#contact" };

/* ------------------------------------------------------------------ */
/* 3. Hero                                                             */
/* ------------------------------------------------------------------ */

export const heroContent = {
  eyebrow: "Kézdivásárhely · Târgu Secuiesc",
  title: "Tanulj vezetni magabiztosan, biztonságosan.",
  subtitle:
    "B kategóriás képzés tapasztalt oktatókkal, modern gépkocsikkal és türelmes, személyre szabott gyakorlati órákkal — nemcsak a vizsgára, hanem az igazi közlekedésre készítünk fel.",
  primaryCta: { label: "Înscrie-te acum", href: "#contact" },
  secondaryCta: { label: "Află mai multe", href: "#despre-noi" },
  image: {
    src: heroImage,
    alt: "Az AUTOSISKOLA SCOBAR oktatóautója egy erdélyi úton naplementében",
  } as ImageAsset,
  trustIndicators: [
    { icon: "ShieldCheck", label: "Engedélyezett képzés" },
    { icon: "Users", label: "Tapasztalt oktatók" },
    { icon: "Car", label: "Modern gépkocsik" },
    { icon: "CalendarClock", label: "Rugalmas időpontok" },
  ],
};

export const heroHighlights = [
  {
    icon: "GraduationCap",
    title: "Tapasztalt oktatók",
    description: "Évek óta a helyi közlekedésben tanítunk, nyugodt, érthető magyarázatokkal.",
  },
  {
    icon: "Car",
    title: "Modern gépkocsik",
    description: "Jól karbantartott, biztonságos oktatóautók, dupla pedállal felszerelve.",
  },
  {
    icon: "SteeringWheel",
    title: "Gyakorlatias képzés",
    description: "Valós városi és országúti helyzetek, nem csak vizsgaútvonalak.",
  },
  {
    icon: "HeartHandshake",
    title: "Személyes figyelem",
    description: "A tempódhoz igazítjuk az órákat — nálunk nincs rohanás.",
  },
];

/* ------------------------------------------------------------------ */
/* 4. About                                                            */
/* ------------------------------------------------------------------ */

export const aboutContent = {
  eyebrow: "Rólunk",
  title: "Egy iskola, ahol a biztonság a legfontosabb tantárgy",
  paragraphs: [
    "Az AUTOSISKOLA SCOBAR célja, hogy Kézdivásárhelyen és környékén olyan sofőröket képezzen, akik nemcsak a vizsgát teljesítik sikeresen, hanem magabiztosan és felelősen közlekednek éveken át.",
    "Oktatóink türelmesek, érthetően magyaráznak, és minden tanulóval a saját tempójában haladnak. A modern oktatási módszereket a helyi utak valós ismeretével kötjük össze — ott gyakorolsz, ahol később vezetni fogsz.",
  ],
  bullets: [
    "Türelmes, nyugodt oktatási stílus",
    "Korszerű elméleti felkészítés",
    "Valós forgalmi helyzetek gyakorlása",
    "Folyamatos visszajelzés és haladáskövetés",
  ],
  image: {
    src: aboutImage,
    alt: "Oktató magyaráz egy tanulónak vezetés közben",
  } as ImageAsset,
  /** Szerkeszthető adatok — cseréld a valós számokra. */
  stats: [
    { value: "15+", label: "év tapasztalat" },
    { value: "1200+", label: "sikeres tanuló" },
    { value: "3", label: "oktató gépkocsi" },
    { value: "B", label: "fő kategória" },
  ],
};

/* ------------------------------------------------------------------ */
/* 5. Services                                                         */
/* ------------------------------------------------------------------ */

export const services: Service[] = [
  {
    id: "categoria-b",
    icon: "Car",
    title: "B kategóriás jogosítvány",
    description:
      "Teljes körű képzés a személygépkocsi-vezetői engedély megszerzéséhez, az iratkozástól a vizsgáig.",
    cta: { label: "Jelentkezem", href: "#contact" },
  },
  {
    id: "teorie",
    icon: "BookOpen",
    title: "Elméleti felkészítés",
    description:
      "Strukturált tananyag, közlekedési szabályok, tesztgyakorlás és folyamatos konzultáció az oktatóval.",
  },
  {
    id: "practica",
    icon: "SteeringWheel",
    title: "Gyakorlati vezetés",
    description:
      "Városi és országúti órák, manőverek, parkolás és forgalmi helyzetek biztonságos környezetben.",
  },
  {
    id: "examen",
    icon: "ClipboardCheck",
    title: "Vizsgafelkészítés",
    description:
      "Vizsgaszimuláció, tipikus hibák kijavítása és mentális felkészítés a vizsganapra.",
  },
  {
    id: "ore-suplimentare",
    icon: "PlusCircle",
    title: "Pótórák",
    description:
      "További vezetési órák igény szerint, ha még biztosabbnak szeretnéd érezni magad a volánnál.",
  },
  {
    id: "incepatori",
    icon: "Sparkles",
    title: "Kezdő támogatás",
    description:
      "Ha még sosem ültél volán mögött: nyugodt tempójú indulás, alapoktól, extra türelemmel.",
  },
];

/* ------------------------------------------------------------------ */
/* 6. Instructors                                                      */
/* ------------------------------------------------------------------ */

export const instructors: Instructor[] = [
  {
    id: "instructor-1",
    name: "Szabó Zoltán",
    role: "Vezető oktató",
    bio: "Nyugodt, precíz oktatási stílus. Szakterülete a kezdő tanulók magabiztos elindítása és a városi vezetés.",
    experience: "15 év tapasztalat",
    categories: ["B"],
    image: { src: instructor1, alt: "Szabó Zoltán vezető oktató portréja" },
    contact: { label: "Kapcsolat", href: "#contact" },
  },
  {
    id: "instructor-2",
    name: "Kovács Emese",
    role: "Gyakorlati oktató",
    bio: "Türelmes és bátorító megközelítés. Szívesen dolgozik azokkal, akik szoronganak a vezetéstől.",
    experience: "8 év tapasztalat",
    categories: ["B"],
    image: { src: instructor2, alt: "Kovács Emese gyakorlati oktató portréja" },
    contact: { label: "Kapcsolat", href: "#contact" },
  },
  {
    id: "instructor-3",
    name: "Bartha András",
    role: "Gyakorlati oktató",
    bio: "Gyakorlatorientált képzés: manőverek, parkolás és vizsgaszimuláció valós forgalmi körülmények között.",
    experience: "10 év tapasztalat",
    categories: ["B"],
    image: { src: instructor3, alt: "Bartha András gyakorlati oktató portréja" },
    contact: { label: "Kapcsolat", href: "#contact" },
  },
];

/* ------------------------------------------------------------------ */
/* 7. Vehicles                                                         */
/* ------------------------------------------------------------------ */

export const vehicles: Vehicle[] = [
  {
    id: "vehicle-1",
    name: "Városi hatchback",
    transmission: "Manuális",
    fuel: "Benzin",
    description:
      "Könnyen kezelhető, kis méretű gépkocsi — ideális az első órákhoz és a szűk utcai manőverekhez.",
    specs: [
      { label: "Sebességváltó", value: "5 fokozatú manuális" },
      { label: "Üzemanyag", value: "Benzin" },
      { label: "Felszereltség", value: "Dupla pedál, ABS" },
    ],
    image: { src: vehicle1, alt: "Ezüst oktató hatchback gépkocsi" },
  },
  {
    id: "vehicle-2",
    name: "Kompakt oktatóautó",
    transmission: "Manuális",
    fuel: "Benzin",
    description:
      "Kényelmes utastér és jó kilátás — a városi és országúti órák megbízható munkatársa.",
    specs: [
      { label: "Sebességváltó", value: "Manuális" },
      { label: "Üzemanyag", value: "Benzin" },
      { label: "Felszereltség", value: "Dupla pedál, tolatóradar" },
    ],
    image: { src: vehicle2, alt: "Fehér kompakt oktatóautó" },
  },
  {
    id: "vehicle-3",
    name: "Kisautó kezdőknek",
    transmission: "Manuális",
    fuel: "Benzin",
    description:
      "Rövid karosszéria, kiváló áttekinthetőség — a parkolás és a manőverek gyakorlásához.",
    specs: [
      { label: "Sebességváltó", value: "Manuális" },
      { label: "Üzemanyag", value: "Benzin" },
      { label: "Felszereltség", value: "Dupla pedál, klíma" },
    ],
    image: { src: vehicle3, alt: "Sötétszürke kisautó oktatáshoz" },
  },
];

/* ------------------------------------------------------------------ */
/* 8. Advantages (Why choose us)                                       */
/* ------------------------------------------------------------------ */

export const advantagesContent = {
  eyebrow: "Miért mi?",
  title: "Amiért érdemes nálunk tanulni",
  subtitle: "Nem futószalag-oktatás. Emberi tempó, valódi felkészítés.",
};

export const advantages = [
  {
    icon: "GraduationCap",
    title: "Tapasztalt oktatók",
    description: "Évek óta helyben tanítunk, ismerjük a vizsgaútvonalakat és a helyi közlekedést.",
  },
  {
    icon: "HeartHandshake",
    title: "Türelmes hozzáállás",
    description: "Nyugodt légkör, bátorító visszajelzés — a hibából is tanulunk.",
  },
  {
    icon: "Car",
    title: "Modern gépkocsik",
    description: "Karbantartott, biztonságos autók, dupla pedállal és korszerű felszereltséggel.",
  },
  {
    icon: "UserCheck",
    title: "Egyéni figyelem",
    description: "A haladásodhoz igazított óraterv, személyre szabott gyakorlás.",
  },
  {
    icon: "Route",
    title: "Gyakorlatias képzés",
    description: "Valós forgalom, éjszakai és rossz idős vezetés, hogy készen állj mindenre.",
  },
  {
    icon: "Trophy",
    title: "Vizsgára fókuszált",
    description: "Célzott vizsgafelkészítés, szimulált vizsgahelyzetekkel.",
  },
];

/* ------------------------------------------------------------------ */
/* 9. Process                                                          */
/* ------------------------------------------------------------------ */

export const processContent = {
  eyebrow: "Hogyan működik",
  title: "Négy lépés a jogosítványig",
};

export const processSteps = [
  {
    step: "01",
    icon: "Phone",
    title: "Kapcsolatfelvétel",
    description: "Hívj minket vagy írj egy üzenetet — átbeszéljük a részleteket és a lehetőségeket.",
  },
  {
    step: "02",
    icon: "FileText",
    title: "Beiratkozás",
    description: "Összeállítjuk a szükséges iratokat, és rögzítjük a kezdési időpontot.",
  },
  {
    step: "03",
    icon: "BookOpen",
    title: "Elmélet és gyakorlat",
    description: "Elméleti felkészítés és vezetési órák a saját tempódban, rugalmas beosztással.",
  },
  {
    step: "04",
    icon: "BadgeCheck",
    title: "Vizsga és jogosítvány",
    description: "Vizsgafelkészítés, majd a sikeres vizsga után jöhet az önálló vezetés.",
  },
];

/* ------------------------------------------------------------------ */
/* 10. Gallery                                                         */
/* ------------------------------------------------------------------ */

export const galleryContent = {
  eyebrow: "Galéria",
  title: "Pillanatképek a képzésről",
  subtitle: "Oktatás, gépkocsik, tanulók és a helyi utak.",
};

export const galleryImages: ImageAsset[] = [
  { src: gallery1, alt: "Tanuló keze a kormányon vezetés közben" },
  { src: gallery2, alt: "Elméleti óra az iskola tantermében" },
  { src: gallery3, alt: "Parkolási gyakorlat a gyakorlópályán" },
  { src: gallery4, alt: "Frissen megszerzett vezetői engedély" },
  { src: gallery5, alt: "Országúti vezetési gyakorlat Erdélyben" },
  { src: gallery6, alt: "Oktató és tanuló kézfogása az oktatóautó mellett" },
];

/* ------------------------------------------------------------------ */
/* 11. Testimonials                                                    */
/* ------------------------------------------------------------------ */

export const testimonialsContent = {
  eyebrow: "Vélemények",
  title: "Amit a tanulóink mondanak",
  subtitle: "Tanulói visszajelzések a képzésről.",
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Andrea B.",
    location: "Kézdivásárhely",
    rating: 5,
    text: "Nagyon türelmes oktatás. Az első óra után eltűnt a félelmem a volántól, és az első vizsgán sikerült.",
  },
  {
    id: "t2",
    name: "Csaba M.",
    location: "Kézdivásárhely",
    rating: 5,
    text: "Rugalmas időpontok, korrekt hozzáállás. A vizsgaútvonalakat alaposan átvettük.",
  },
  {
    id: "t3",
    name: "Timea K.",
    location: "Kovászna",
    rating: 5,
    text: "Az elméleti felkészítés érthető és jól strukturált volt. Bátran ajánlom kezdőknek is.",
  },
  {
    id: "t4",
    name: "Levente P.",
    location: "Kézdivásárhely",
    rating: 5,
    text: "Az autók tiszták és jól karbantartottak. Az oktató végig nyugodt maradt, ez sokat segített.",
  },
  {
    id: "t5",
    name: "Réka S.",
    location: "Bereck",
    rating: 5,
    text: "Nemcsak a vizsgára készítettek fel, hanem a valós forgalomra is. Ma is hasznát veszem.",
  },
  {
    id: "t6",
    name: "Zsolt D.",
    location: "Kézdivásárhely",
    rating: 5,
    text: "Pótórákat kértem, és rögtön be tudtak illeszteni. Profi és emberi hozzáállás.",
  },
];

/* ------------------------------------------------------------------ */
/* 12. FAQ                                                             */
/* ------------------------------------------------------------------ */

export const faqContent = {
  eyebrow: "GYIK",
  title: "Gyakori kérdések",
  subtitle: "Ha nem találod a választ, hívj minket bizalommal.",
};

export const faqItems = [
  {
    question: "Hogyan tudok beiratkozni?",
    answer:
      "Hívj minket telefonon, vagy küldj üzenetet a kapcsolati űrlapon. Egyeztetünk egy időpontot, és személyesen intézzük a beiratkozást az irodánkban.",
  },
  {
    question: "Milyen iratokra van szükség?",
    answer:
      "Személyi igazolvány, orvosi alkalmassági igazolás, pszichológiai vizsgálat, valamint a beiratkozási űrlap. A pontos listát a beiratkozáskor részletesen átbeszéljük.",
  },
  {
    question: "Hogyan zajlik a B kategóriás képzés?",
    answer:
      "A képzés elméleti felkészítésből és gyakorlati vezetési órákból áll. Az elmélet során a közlekedési szabályokat és a tesztkérdéseket vesszük át, a gyakorlaton pedig fokozatosan haladunk a manőverektől a valós forgalomig.",
  },
  {
    question: "Hogyan történik a vezetési órák beosztása?",
    answer:
      "Az órákat közösen egyeztetjük az oktatóddal, a te időbeosztásodhoz igazítva. Hétköznap délelőtt és délután is van lehetőség vezetésre.",
  },
  {
    question: "Mennyi ideig tart a tanfolyam?",
    answer:
      "Ez a haladási tempódtól és a vizsgaidőpontoktól függ. A legtöbb tanuló néhány hónap alatt jut el a beiratkozástól a sikeres vizsgáig.",
  },
  {
    question: "Hogyan zajlik a vizsga?",
    answer:
      "A vizsga elméleti (számítógépes teszt) és gyakorlati (forgalmi) részből áll. A vizsga előtt szimulált vizsgahelyzetekkel készítünk fel.",
  },
  {
    question: "Kérhetek pótórákat?",
    answer:
      "Természetesen. Bármikor kérhetsz további vezetési órákat, ha úgy érzed, még több gyakorlásra van szükséged.",
  },
  {
    question: "Hol zajlik a gyakorlati képzés?",
    answer:
      "Kézdivásárhelyen és környékén, a valós vizsgaútvonalakon, valamint gyakorlópályán a manőverek elsajátításához.",
  },
];

/* ------------------------------------------------------------------ */
/* 13. Final CTA                                                       */
/* ------------------------------------------------------------------ */

export const ctaContent = {
  title: "Készen állsz az első vezetési órádra?",
  subtitle:
    "Hívj minket, és néhány percben átbeszéljük, hogyan indulhatsz el a jogosítvány felé. Nálunk mindig van hely egy új tanulónak.",
  primaryCta: { label: "Înscrie-te acum", href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* 14. Contact & business info                                         */
/* ------------------------------------------------------------------ */

export const contactInfo = {
  eyebrow: "Kapcsolat",
  title: "Vedd fel velünk a kapcsolatot",
  subtitle: "Írj vagy hívj minket — szívesen válaszolunk a kérdéseidre.",
  businessName: "AUTOSISKOLA SCOBAR",
  address: {
    street: "Curtea 39",
    city: "Târgu Secuiesc (Kézdivásárhely)",
    postalCode: "525400",
    country: "Románia",
    full: "Curtea 39, Târgu Secuiesc 525400, Románia",
  },
  phone: {
    display: "+40 724 527 584",
    href: "tel:+40724527584",
  },
  email: {
    display: "info@autosiskolascobar.ro",
    href: "mailto:info@autosiskolascobar.ro",
  },
  openingHours: [
    { day: "Hétfő – Péntek", hours: "09:00 – 17:00" },
    { day: "Szombat", hours: "Zárva" },
    { day: "Vasárnap", hours: "Zárva" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=Curtea%2039,%20T%C3%A2rgu%20Secuiesc%20525400,%20Romania&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Curtea+39,+T%C3%A2rgu+Secuiesc+525400,+Romania",
  form: {
    nameLabel: "Név",
    namePlaceholder: "Teljes neved",
    phoneLabel: "Telefonszám",
    phonePlaceholder: "+40 ...",
    emailLabel: "E-mail",
    emailPlaceholder: "nev@example.com",
    messageLabel: "Üzenet",
    messagePlaceholder: "Miben segíthetünk?",
    submitLabel: "Üzenet küldése",
    successMessage: "Köszönjük! Hamarosan felvesszük veled a kapcsolatot.",
  },
};

export const socialLinks = [
  { label: "Facebook", icon: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", icon: "Instagram", href: "https://instagram.com" },
  { label: "WhatsApp", icon: "MessageCircle", href: "https://wa.me/40724527584" },
];

/* ------------------------------------------------------------------ */
/* 15. Footer                                                          */
/* ------------------------------------------------------------------ */

export const footerContent = {
  description:
    "Autósiskola Kézdivásárhelyen. B kategóriás képzés tapasztalt oktatókkal, modern gépkocsikkal és emberi hozzáállással.",
  navTitle: "Navigáció",
  servicesTitle: "Szolgáltatások",
  contactTitle: "Kapcsolat",
  copyright: `© ${new Date().getFullYear()} AUTOSISKOLA SCOBAR. Minden jog fenntartva.`,
  legalLinks: [
    { label: "Adatvédelmi tájékoztató", href: "#contact" },
    { label: "Felhasználási feltételek", href: "#contact" },
  ],
};
