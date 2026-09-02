/**
 * =============================================================
 *  AUTOSISKOLA SCOBAR — central content configuration
 * =============================================================
 *  Minden szerkeszthető tartalom itt található / tot conținutul
 *  editabil se află aici: szövegek, képek, oktatók, gépkocsik,
 *  szolgáltatások, vélemények, GYIK, kapcsolat, SEO.
 *
 *  Kétnyelvűség / bilingv:
 *  minden felhasználói szöveg `{ hu, ro }` alakú. A nyelvet a
 *  `src/lib/i18n.tsx` oldja fel — a komponensek mindig kész
 *  szövegeket kapnak.
 *
 *  Supabase: ez a fájl 1:1 megfeleltethető táblasoroknak,
 *  a `{ hu, ro }` objektumok jsonb oszlopként tárolhatók.
 * =============================================================
 */

import aboutImage from "@/assets/about.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import instructor4 from "@/assets/instructor-4.jpg";
import instructor5 from "@/assets/instructor-5.jpg";
import instructor6 from "@/assets/instructor-6.jpg";

/* Client-provided photography (CDN hosted) */
import logoAsset from "@/assets/logo-scobar.png.asset.json";
import heroAsset from "@/assets/hero-bmw.jpg.asset.json";
import vehicleFabiaAsset from "@/assets/vehicle-fabia.jpg.asset.json";
import vehicleSkodaStreetAsset from "@/assets/vehicle-skoda-street.jpg.asset.json";
import vehicleBmwParkingAsset from "@/assets/vehicle-bmw-parking.jpg.asset.json";
import gallery1Asset from "@/assets/gallery-real-1.jpg.asset.json";
import gallery2Asset from "@/assets/gallery-real-2.jpg.asset.json";
import gallery3Asset from "@/assets/gallery-real-3.jpg.asset.json";
import gallery4Asset from "@/assets/gallery-real-4.jpg.asset.json";
import gallery5Asset from "@/assets/gallery-real-5.jpg.asset.json";

/* ------------------------------------------------------------------ */
/* Types — defined in src/content/types.ts (Supabase-ready shapes)     */
/* ------------------------------------------------------------------ */

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
} from "./types";

export type * from "./types";

/* ------------------------------------------------------------------ */
/* 1. Site settings & SEO                                              */
/* ------------------------------------------------------------------ */

export const siteSettings: SiteSettings = {
  name: "AUTOSISKOLA SCOBAR",
  shortName: "SCOBAR",
  tagline: {
    hu: "Autósiskola Kézdivásárhelyen",
    ro: "Școală de șoferi în Târgu Secuiesc",
  },
  locale: "hu-RO",
  /** Szerkeszthető — a lábléc szerzői jogi éve. */
  copyrightYear: 2026,

  logo: {
    src: logoAsset.url,
    alt: { hu: "SCOBAR autósiskola logó", ro: "Logo școala de șoferi SCOBAR" },
  },

  seo: {
    title: {
      hu: "AUTOSISKOLA SCOBAR — Autósiskola Kézdivásárhelyen | B kategória",
      ro: "AUTOSISKOLA SCOBAR — Școală de șoferi în Târgu Secuiesc | Categoria B",
    },
    description: {
      hu: "B kategóriás jogosítvány Kézdivásárhelyen. Tapasztalt oktatók, modern gépkocsik, türelmes és gyakorlatorientált képzés. Jelentkezz még ma!",
      ro: "Permis categoria B în Târgu Secuiesc. Instructori cu experiență, mașini moderne, pregătire răbdătoare și practică. Înscrie-te astăzi!",
    },
    ogTitle: {
      hu: "AUTOSISKOLA SCOBAR — Tanulj vezetni magabiztosan",
      ro: "AUTOSISKOLA SCOBAR — Învață să conduci cu încredere",
    },
    ogDescription: {
      hu: "B kategóriás vezetői engedély megszerzése Kézdivásárhelyen tapasztalt oktatókkal és modern gépkocsikkal.",
      ro: "Obține permisul categoria B în Târgu Secuiesc, cu instructori experimentați și mașini moderne.",
    },
    ogImage: {
      src: heroAsset.url,
      alt: { hu: "SCOBAR oktatóautó", ro: "Mașina școlii SCOBAR" },
    },
  },
};

/* ------------------------------------------------------------------ */
/* 2. Navigation                                                       */
/* ------------------------------------------------------------------ */

export const navigation: NavItem[] = [
  { label: { hu: "Kezdőlap", ro: "Acasă" }, href: "#acasa" },
  { label: { hu: "Rólunk", ro: "Despre noi" }, href: "#despre-noi" },
  { label: { hu: "Szolgáltatások", ro: "Servicii" }, href: "#servicii" },
  { label: { hu: "Oktatók", ro: "Instructori" }, href: "#instructori" },
  { label: { hu: "Gépkocsik", ro: "Mașini" }, href: "#autovehicule" },
  { label: { hu: "Galéria", ro: "Galerie" }, href: "#galerie" },
  { label: { hu: "Vélemények", ro: "Recenzii" }, href: "#recenzii" },
  { label: { hu: "Hírek", ro: "Noutăți" }, href: "#hirek" },
  { label: { hu: "Kérdések", ro: "Întrebări" }, href: "#intrebari" },
  { label: { hu: "Kapcsolat", ro: "Contact" }, href: "#contact" },
];

export const navCta = {
  label: { hu: "Beiratkozás", ro: "Înscriere" },
  href: "#contact",
};

/* ------------------------------------------------------------------ */
/* 3. Hero                                                             */
/* ------------------------------------------------------------------ */

export const heroContent = {
  eyebrow: "Kézdivásárhely · Târgu Secuiesc",
  title: {
    hu: "Tanulj vezetni magabiztosan, biztonságosan.",
    ro: "Învață să conduci cu încredere și în siguranță.",
  },
  subtitle: {
    hu: "B kategóriás képzés tapasztalt oktatókkal, modern gépkocsikkal és türelmes, személyre szabott gyakorlati órákkal — nemcsak a vizsgára, hanem az igazi közlekedésre készítünk fel.",
    ro: "Pregătire categoria B cu instructori experimentați, mașini moderne și ore practice personalizate — te pregătim nu doar pentru examen, ci pentru traficul real.",
  },
  primaryCta: { label: { hu: "Jelentkezem", ro: "Înscrie-te acum" }, href: "#contact" },
  secondaryCta: { label: { hu: "Tudj meg többet", ro: "Află mai multe" }, href: "#despre-noi" },
  image: {
    src: heroAsset.url,
    alt: {
      hu: "Az AUTOSISKOLA SCOBAR fehér BMW oktatóautója Kézdivásárhely belvárosában",
      ro: "Mașina de școală BMW albă a AUTOSISKOLA SCOBAR în centrul orașului Târgu Secuiesc",
    },
  } as ImageAsset,
  trustIndicators: [
    { icon: "ShieldCheck", label: { hu: "\n", ro: "Școală autorizată" } },
    { icon: "Users", label: { hu: "Tapasztalt oktatók", ro: "Instructori cu experiență" } },
    { icon: "Car", label: { hu: "Modern gépkocsik", ro: "Mașini moderne" } },
    { icon: "CalendarClock", label: { hu: "Rugalmas időpontok", ro: "Program flexibil" } },
  ],
};

export const heroHighlights = [
  {
    icon: "GraduationCap",
    title: { hu: "Tapasztalt oktatók", ro: "Instructori cu experiență" },
    description: {
      hu: "1990 óta a helyi közlekedésben tanítunk, nyugodt, érthető magyarázatokkal.",
      ro: "Predăm de ani buni în traficul local, cu explicații calme și clare.",
    },
  },
  {
    icon: "Car",
    title: { hu: "Modern gépkocsik", ro: "Mașini moderne" },
    description: {
      hu: "Jól karbantartott, biztonságos oktatóautók, dupla pedállal felszerelve.",
      ro: "Mașini de școală întreținute și sigure, dotate cu dublă comandă.",
    },
  },
  {
    icon: "SteeringWheel",
    title: { hu: "Gyakorlatias képzés", ro: "Pregătire practică" },
    description: {
      hu: "Valós városi és országúti helyzetek, nem csak vizsgaútvonalak.",
      ro: "Situații reale în oraș și pe drum național, nu doar trasee de examen.",
    },
  },
  {
    icon: "HeartHandshake",
    title: { hu: "Személyes figyelem", ro: "Atenție personală" },
    description: {
      hu: "A tempódhoz igazítjuk az órákat — nálunk nincs rohanás.",
      ro: "Adaptăm orele la ritmul tău — la noi nu se grăbește nimeni.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 4. About                                                            */
/* ------------------------------------------------------------------ */

export const aboutContent = {
  eyebrow: { hu: "Rólunk", ro: "Despre noi" },
  title: {
    hu: "Egy iskola, ahol a biztonság a legfontosabb tantárgy",
    ro: "O școală unde siguranța este materia cea mai importantă",
  },
  paragraphs: [
    {
      hu: "Az AUTOSISKOLA SCOBAR célja, hogy Kézdivásárhelyen és környékén olyan sofőröket képezzen, akik nemcsak a vizsgát teljesítik sikeresen, hanem magabiztosan és felelősen közlekednek éveken át.",
      ro: "AUTOSISKOLA SCOBAR își propune să formeze în Târgu Secuiesc și în împrejurimi șoferi care nu doar promovează examenul, ci conduc responsabil și cu încredere ani la rând.",
    },
    {
      hu: "Oktatóink türelmesek, érthetően magyaráznak, és minden tanulóval a saját tempójában haladnak. A modern oktatási módszereket a helyi utak valós ismeretével kötjük össze — ott gyakorolsz, ahol később vezetni fogsz.",
      ro: "Instructorii noștri sunt răbdători, explică pe înțelesul tuturor și avansează cu fiecare cursant în ritmul propriu. Îmbinăm metodele moderne de predare cu cunoașterea reală a drumurilor locale — exersezi acolo unde vei conduce.",
    },
  ],
  bullets: [
    { hu: "Türelmes, nyugodt oktatási stílus", ro: "Stil de predare calm și răbdător" },
    { hu: "Korszerű elméleti felkészítés", ro: "Pregătire teoretică modernă" },
    { hu: "Valós forgalmi helyzetek gyakorlása", ro: "Exersare în trafic real" },
    { hu: "Folyamatos visszajelzés és haladáskövetés", ro: "Feedback constant și urmărirea progresului" },
  ],
  image: {
    src: aboutImage,
    alt: {
      hu: "Oktató magyaráz egy tanulónak vezetés közben",
      ro: "Instructor explicând unui cursant în timpul conducerii",
    },
  } as ImageAsset,
  /** Szerkeszthető adatok — cseréld a valós számokra. */
  stats: [
    { value: "36+", label: { hu: "év tapasztalat", ro: "ani de experiență" } },
    { value: "7000+", label: { hu: "sikeres tanuló", ro: "cursanți reușiți" } },
    { value: "3", label: { hu: "oktató gépkocsi", ro: "mașini de școală" } },
    { value: "B", label: { hu: "fő kategória", ro: "categorie principală" } },
  ],
};

/* ------------------------------------------------------------------ */
/* 5. Services                                                         */
/* ------------------------------------------------------------------ */

export const servicesContent = {
  eyebrow: { hu: "Szolgáltatások", ro: "Servicii" },
  title: { hu: "Képzési kínálatunk", ro: "Oferta noastră de pregătire" },
  subtitle: {
    hu: "Az első érdeklődéstől a sikeres vizsgáig minden lépésben melletted vagyunk.",
    ro: "De la prima întrebare până la examenul promovat, suntem alături de tine.",
  },
};

export const services: Service[] = [
  {
    id: "categoria-b",
    icon: "Car",
    title: { hu: "B kategóriás jogosítvány", ro: "Permis categoria B" },
    description: {
      hu: "Teljes körű képzés a személygépkocsi-vezetői engedély megszerzéséhez, az iratkozástól a vizsgáig.",
      ro: "Pregătire completă pentru obținerea permisului auto, de la înscriere până la examen.",
    },
    cta: { label: { hu: "Jelentkezem", ro: "Mă înscriu" }, href: "#contact" },
  },
  {
    id: "teorie",
    icon: "BookOpen",
    title: { hu: "Elméleti felkészítés", ro: "Pregătire teoretică" },
    description: {
      hu: "Strukturált tananyag, közlekedési szabályok, tesztgyakorlás és folyamatos konzultáció az oktatóval.",
      ro: "Materie structurată, legislație rutieră, exerciții de teste și consultanță permanentă cu instructorul.",
    },
  },
  {
    id: "practica",
    icon: "SteeringWheel",
    title: { hu: "Gyakorlati vezetés", ro: "Conducere practică" },
    description: {
      hu: "Városi és országúti órák, manőverek, parkolás és forgalmi helyzetek biztonságos környezetben.",
      ro: "Ore în oraș și pe drum național, manevre, parcare și situații de trafic într-un mediu sigur.",
    },
  },
  {
    id: "examen",
    icon: "ClipboardCheck",
    title: { hu: "Vizsgafelkészítés", ro: "Pregătire pentru examen" },
    description: {
      hu: "Vizsgaszimuláció, tipikus hibák kijavítása és mentális felkészítés a vizsganapra.",
      ro: "Simulare de examen, corectarea greșelilor tipice și pregătire mentală pentru ziua examenului.",
    },
  },
  {
    id: "ore-suplimentare",
    icon: "PlusCircle",
    title: { hu: "Pótórák", ro: "Ore suplimentare" },
    description: {
      hu: "További vezetési órák igény szerint, ha még biztosabbnak szeretnéd érezni magad a volánnál.",
      ro: "Ore de conducere suplimentare la cerere, dacă vrei să te simți și mai sigur la volan.",
    },
  },
  {
    id: "incepatori",
    icon: "Sparkles",
    title: { hu: "Kezdő támogatás", ro: "Sprijin pentru începători" },
    description: {
      hu: "Ha még sosem ültél volán mögött: nyugodt tempójú indulás, alapoktól, extra türelemmel.",
      ro: "Dacă nu ai fost niciodată la volan: începem lent, de la bază, cu multă răbdare.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 6. Instructors                                                      */
/* ------------------------------------------------------------------ */

export const instructorsContent = {
  eyebrow: { hu: "Oktatók", ro: "Instructori" },
  title: { hu: "Az oktatóink", ro: "Instructorii noștri" },
  subtitle: {
    hu: "Tapasztalt, türelmes szakemberek, akik a te tempódhoz igazodnak.",
    ro: "Profesioniști răbdători și experimentați, care se adaptează ritmului tău.",
  },
  moreCta: { label: { hu: "Továbbiak", ro: "Vezi mai mulți" }, href: "/oktatoink" },
  backCta: { label: { hu: "Vissza a főoldalra", ro: "Înapoi la pagina principală" }, href: "/" },
  pageTitle: { hu: "Minden oktatónk", ro: "Toți instructorii noștri" },
  pageSubtitle: {
    hu: "Csapatunk teljes névsora — mindannyian a biztonságos, magabiztos vezetésre készítenek fel.",
    ro: "Întreaga noastră echipă — toți te pregătesc pentru o conducere sigură și încrezătoare.",
  },
};

export const instructors: Instructor[] = [
  {
    id: "instructor-1",
    name: "Szabó Zoltán",
    role: { hu: "Vezető oktató", ro: "Instructor coordonator" },
    bio: {
      hu: "Nyugodt, precíz oktatási stílus. Szakterülete a kezdő tanulók magabiztos elindítása és a városi vezetés.",
      ro: "Stil de predare calm și precis. Specializat în pornirea sigură a începătorilor și conducerea urbană.",
    },
    experience: { hu: "15 év tapasztalat", ro: "15 ani experiență" },
    categories: ["B"],
    image: {
      src: instructor1,
      alt: { hu: "Szabó Zoltán vezető oktató", ro: "Instructorul coordonator Szabó Zoltán" },
    },
    contact: { label: { hu: "Kapcsolat", ro: "Contact" }, href: "#contact" },
    featured: true,
  },
  {
    id: "instructor-2",
    name: "Kovács Emese",
    role: { hu: "Gyakorlati oktató", ro: "Instructor practic" },
    bio: {
      hu: "Türelmes és bátorító megközelítés. Szívesen dolgozik azokkal, akik szoronganak a vezetéstől.",
      ro: "Abordare răbdătoare și încurajatoare. Lucrează cu plăcere cu cei care au emoții la volan.",
    },
    experience: { hu: "8 év tapasztalat", ro: "8 ani experiență" },
    categories: ["B"],
    image: {
      src: instructor2,
      alt: { hu: "Kovács Emese gyakorlati oktató", ro: "Instructoarea practică Kovács Emese" },
    },
    contact: { label: { hu: "Kapcsolat", ro: "Contact" }, href: "#contact" },
    featured: true,
  },
  {
    id: "instructor-3",
    name: "Bartha András",
    role: { hu: "Gyakorlati oktató", ro: "Instructor practic" },
    bio: {
      hu: "Gyakorlatorientált képzés: manőverek, parkolás és vizsgaszimuláció valós forgalmi körülmények között.",
      ro: "Pregătire orientată spre practică: manevre, parcare și simulare de examen în trafic real.",
    },
    experience: { hu: "10 év tapasztalat", ro: "10 ani experiență" },
    categories: ["B"],
    image: {
      src: instructor3,
      alt: { hu: "Bartha András gyakorlati oktató", ro: "Instructorul practic Bartha András" },
    },
    contact: { label: { hu: "Kapcsolat", ro: "Contact" }, href: "#contact" },
    featured: true,
  },
  {
    id: "instructor-4",
    name: "Nagy Attila",
    role: { hu: "Gyakorlati oktató", ro: "Instructor practic" },
    bio: {
      hu: "Higgadt, tapasztalt oktató. Erőssége a vizsgaútvonalak alapos átvétele és a hibák türelmes javítása.",
      ro: "Instructor calm și experimentat. Punctul lui forte: parcurgerea temeinică a traseelor de examen.",
    },
    experience: { hu: "12 év tapasztalat", ro: "12 ani experiență" },
    categories: ["B"],
    image: {
      src: instructor4,
      alt: { hu: "Nagy Attila gyakorlati oktató", ro: "Instructorul practic Nagy Attila" },
    },
    contact: { label: { hu: "Kapcsolat", ro: "Contact" }, href: "#contact" },
  },
  {
    id: "instructor-5",
    name: "Fazakas Tünde",
    role: { hu: "Elméleti oktató", ro: "Instructor teorie" },
    bio: {
      hu: "Az elméleti órák és a tesztfelkészítés felelőse. Érthetően, példákkal magyarázza a szabályokat.",
      ro: "Responsabilă cu orele de teorie și pregătirea pentru teste. Explică regulile clar, cu exemple.",
    },
    experience: { hu: "9 év tapasztalat", ro: "9 ani experiență" },
    categories: ["B"],
    image: {
      src: instructor5,
      alt: { hu: "Fazakas Tünde elméleti oktató", ro: "Instructoarea de teorie Fazakas Tünde" },
    },
    contact: { label: { hu: "Kapcsolat", ro: "Contact" }, href: "#contact" },
  },
  {
    id: "instructor-6",
    name: "Molnár Csaba",
    role: { hu: "Gyakorlati oktató", ro: "Instructor practic" },
    bio: {
      hu: "Fiatalos, energikus oktatási stílus. Sokat gyakorol éjszakai és rossz időjárási körülmények között is.",
      ro: "Stil de predare tânăr și energic. Exersează des și pe timp de noapte sau vreme nefavorabilă.",
    },
    experience: { hu: "6 év tapasztalat", ro: "6 ani experiență" },
    categories: ["B"],
    image: {
      src: instructor6,
      alt: { hu: "Molnár Csaba gyakorlati oktató", ro: "Instructorul practic Molnár Csaba" },
    },
    contact: { label: { hu: "Kapcsolat", ro: "Contact" }, href: "#contact" },
  },
];

/* ------------------------------------------------------------------ */
/* 7. Vehicles                                                         */
/* ------------------------------------------------------------------ */

export const vehiclesContent = {
  eyebrow: { hu: "Gépkocsik", ro: "Mașini" },
  title: { hu: "Oktatóautóink", ro: "Mașinile noastre de școală" },
  subtitle: {
    hu: "Karbantartott, biztonságos gépkocsik, amelyekkel könnyű megtanulni vezetni.",
    ro: "Mașini întreținute și sigure, cu care înveți ușor să conduci.",
  },
};

export const vehicles: Vehicle[] = [
  {
    id: "vehicle-1",
    name: { hu: "Škoda Fabia", ro: "Škoda Fabia" },
    transmission: { hu: "Manuális", ro: "Manuală" },
    fuel: { hu: "Benzin", ro: "Benzină" },
    description: {
      hu: "Könnyen kezelhető, kis méretű gépkocsi — ideális az első órákhoz és a szűk utcai manőverekhez.",
      ro: "Mașină compactă, ușor de manevrat — ideală pentru primele ore și pentru străzile înguste.",
    },
    specs: [
      { label: { hu: "Sebességváltó", ro: "Cutie de viteze" }, value: { hu: "5 fokozatú manuális", ro: "Manuală, 5 trepte" } },
      { label: { hu: "Üzemanyag", ro: "Combustibil" }, value: { hu: "Benzin", ro: "Benzină" } },
      { label: { hu: "Felszereltség", ro: "Dotări" }, value: { hu: "Dupla pedál, ABS", ro: "Dublă comandă, ABS" } },
    ],
    image: {
      src: vehicleFabiaAsset.url,
      alt: {
        hu: "Ezüst Škoda Fabia oktatóautó a parkolóban",
        ro: "Škoda Fabia argintie, mașină de școală, în parcare",
      },
    },
  },
  {
    id: "vehicle-2",
    name: { hu: "Škoda Fabia — vizsgaautó", ro: "Škoda Fabia — mașină de examen" },
    transmission: { hu: "Manuális", ro: "Manuală" },
    fuel: { hu: "Benzin", ro: "Benzină" },
    description: {
      hu: "Kényelmes utastér és jó kilátás — a városi és országúti órák megbízható munkatársa.",
      ro: "Interior confortabil și vizibilitate bună — partenerul de încredere pentru orele în oraș și pe drum.",
    },
    specs: [
      { label: { hu: "Sebességváltó", ro: "Cutie de viteze" }, value: { hu: "Manuális", ro: "Manuală" } },
      { label: { hu: "Üzemanyag", ro: "Combustibil" }, value: { hu: "Benzin", ro: "Benzină" } },
      { label: { hu: "Felszereltség", ro: "Dotări" }, value: { hu: "Dupla pedál, klíma", ro: "Dublă comandă, climă" } },
    ],
    image: {
      src: vehicleSkodaStreetAsset.url,
      alt: {
        hu: "Fehér Škoda Fabia oktatóautó EXAMEN táblával a városban",
        ro: "Škoda Fabia albă cu semn EXAMEN pe stradă",
      },
    },
  },
  {
    id: "vehicle-3",
    name: { hu: "BMW 1-es sorozat", ro: "BMW Seria 1" },
    transmission: { hu: "Manuális", ro: "Manuală" },
    fuel: { hu: "Benzin", ro: "Benzină" },
    description: {
      hu: "Stabil úttartás és kiváló áttekinthetőség — biztonságos érzés a forgalomban és a manővereknél.",
      ro: "Ținută de drum stabilă și vizibilitate excelentă — siguranță în trafic și la manevre.",
    },
    specs: [
      { label: { hu: "Sebességváltó", ro: "Cutie de viteze" }, value: { hu: "Manuális", ro: "Manuală" } },
      { label: { hu: "Üzemanyag", ro: "Combustibil" }, value: { hu: "Benzin", ro: "Benzină" } },
      { label: { hu: "Felszereltség", ro: "Dotări" }, value: { hu: "Dupla pedál, tolatóradar", ro: "Dublă comandă, senzori de parcare" } },
    ],
    image: {
      src: vehicleBmwParkingAsset.url,
      alt: {
        hu: "Fehér BMW oktatóautó SCOALA táblával a parkolóban",
        ro: "BMW alb cu semn ȘCOALA în parcare",
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/* 8. Advantages (Why choose us)                                       */
/* ------------------------------------------------------------------ */

export const advantagesContent = {
  eyebrow: { hu: "Miért mi?", ro: "De ce noi?" },
  title: { hu: "Amiért érdemes nálunk tanulni", ro: "De ce merită să înveți la noi" },
  subtitle: {
    hu: "Nem futószalag-oktatás. Emberi tempó, valódi felkészítés.",
    ro: "Nu predare pe bandă rulantă. Ritm uman, pregătire reală.",
  },
};

export const advantages = [
  {
    icon: "GraduationCap",
    title: { hu: "Tapasztalt oktatók", ro: "Instructori cu experiență" },
    description: {
      hu: "Évek óta helyben tanítunk, ismerjük a vizsgaútvonalakat és a helyi közlekedést.",
      ro: "Predăm de ani buni aici, cunoaștem traseele de examen și traficul local.",
    },
  },
  {
    icon: "HeartHandshake",
    title: { hu: "Türelmes hozzáállás", ro: "Atitudine răbdătoare" },
    description: {
      hu: "Nyugodt légkör, bátorító visszajelzés — a hibából is tanulunk.",
      ro: "Atmosferă calmă, feedback încurajator — învățăm și din greșeli.",
    },
  },
  {
    icon: "Car",
    title: { hu: "Modern gépkocsik", ro: "Mașini moderne" },
    description: {
      hu: "Karbantartott, biztonságos autók, dupla pedállal és korszerű felszereltséggel.",
      ro: "Mașini întreținute și sigure, cu dublă comandă și dotări moderne.",
    },
  },
  {
    icon: "UserCheck",
    title: { hu: "Egyéni figyelem", ro: "Atenție individuală" },
    description: {
      hu: "A haladásodhoz igazított óraterv, személyre szabott gyakorlás.",
      ro: "Plan de ore adaptat progresului tău, exersare personalizată.",
    },
  },
  {
    icon: "Route",
    title: { hu: "Gyakorlatias képzés", ro: "Pregătire practică" },
    description: {
      hu: "A képzés elméleti felkészítésből és gyakorlati vezetési órákból áll. Az elmélet során átvesszük a vizsgához szükséges teljes tananyagot, a gyakorlaton pedig fokozatosan haladunk a manőverektől a valós forgalomig.",
      ro: "Trafic real, conducere pe timp de noapte și vreme rea, ca să fii pregătit de orice.",
    },
  },
  {
    icon: "Trophy",
    title: { hu: "Vizsgára fókuszált", ro: "Focus pe examen" },
    description: {
      hu: "Célzott vizsgafelkészítés, szimulált vizsgahelyzetekkel.",
      ro: "Pregătire țintită pentru examen, cu simulări reale.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 9. Process                                                          */
/* ------------------------------------------------------------------ */

export const processContent = {
  eyebrow: { hu: "Hogyan működik", ro: "Cum funcționează" },
  title: { hu: "Négy lépés a jogosítványig", ro: "Patru pași până la permis" },
};

export const processSteps = [
  {
    step: "01",
    icon: "Phone",
    title: { hu: "Kapcsolatfelvétel", ro: "Ne contactezi" },
    description: {
      hu: "Hívj minket vagy írj egy üzenetet — átbeszéljük a részleteket és a lehetőségeket.",
      ro: "Sună-ne sau scrie-ne un mesaj — discutăm detaliile și opțiunile.",
    },
  },
  {
    step: "02",
    icon: "FileText",
    title: { hu: "Beiratkozás", ro: "Înscrierea" },
    description: {
      hu: "Összeállítjuk a szükséges iratokat, és rögzítjük a kezdési időpontot.",
      ro: "Pregătim actele necesare și stabilim data de început.",
    },
  },
  {
    step: "03",
    icon: "BookOpen",
    title: { hu: "Elmélet és gyakorlat", ro: "Teorie și practică" },
    description: {
      hu: "Elméleti felkészítés és vezetési órák a saját tempódban, rugalmas beosztással.",
      ro: "Pregătire teoretică și ore de conducere în ritmul tău, cu program flexibil.",
    },
  },
  {
    step: "04",
    icon: "BadgeCheck",
    title: { hu: "Vizsga és jogosítvány", ro: "Examen și permis" },
    description: {
      hu: "Vizsgafelkészítés, majd a sikeres vizsga után jöhet az önálló vezetés.",
      ro: "Pregătire pentru examen, iar după promovare urmează conducerea pe cont propriu.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 10. Gallery                                                         */
/* ------------------------------------------------------------------ */

export const galleryContent = {
  eyebrow: { hu: "Galéria", ro: "Galerie" },
  title: { hu: "Pillanatképek a képzésről", ro: "Momente din cursuri" },
  subtitle: {
    hu: "Sikeres tanulóink, oktatóink és gépkocsijaink.",
    ro: "Cursanții noștri reușiți, instructorii și mașinile școlii.",
  },
};

export const galleryImages: ImageAsset[] = [
  {
    src: gallery1Asset.url,
    alt: {
      hu: "Oktató és két sikeres tanuló az oktatóautó mellett",
      ro: "Instructorul și doi cursanți reușiți lângă mașina școlii",
    },
  },
  {
    src: gallery2Asset.url,
    alt: {
      hu: "Tanuló a Škoda Fabia oktatóautó mellett a sikeres vizsga után",
      ro: "Cursant lângă Škoda Fabia după examenul promovat",
    },
  },
  {
    src: gallery3Asset.url,
    alt: {
      hu: "Tanuló az oktatóautó mellett a parkolóban",
      ro: "Cursant lângă mașina de școală în parcare",
    },
  },
  {
    src: gallery4Asset.url,
    alt: {
      hu: "Tanuló a vizsgairatokkal az oktatóautó mellett",
      ro: "Cursant cu documentele de examen lângă mașina școlii",
    },
  },
  {
    src: gallery5Asset.url,
    alt: {
      hu: "Boldog tanuló a sikeres vizsga után az iskola autójával",
      ro: "Cursant fericit după examen, lângă mașina școlii",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 11. Testimonials                                                    */
/* ------------------------------------------------------------------ */

export const testimonialsContent = {
  eyebrow: { hu: "Vélemények", ro: "Recenzii" },
  title: { hu: "Amit a tanulóink mondanak", ro: "Ce spun cursanții noștri" },
  subtitle: {
    hu: "Tanulói visszajelzések a képzésről.",
    ro: "Impresiile cursanților despre pregătire.",
  },
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Andrea B.",
    location: { hu: "Kézdivásárhely", ro: "Târgu Secuiesc" },
    rating: 5,
    text: {
      hu: "Nagyon türelmes oktatás. Az első óra után eltűnt a félelmem a volántól, és az első vizsgán sikerült.",
      ro: "Predare foarte răbdătoare. După prima oră mi-a trecut frica de volan și am luat examenul din prima.",
    },
  },
  {
    id: "t2",
    name: "Csaba M.",
    location: { hu: "Kézdivásárhely", ro: "Târgu Secuiesc" },
    rating: 5,
    text: {
      hu: "Rugalmas időpontok, korrekt hozzáállás. A vizsgaútvonalakat alaposan átvettük.",
      ro: "Program flexibil, atitudine corectă. Am parcurs temeinic traseele de examen.",
    },
  },
  {
    id: "t3",
    name: "Timea K.",
    location: { hu: "Kovászna", ro: "Covasna" },
    rating: 5,
    text: {
      hu: "Az elméleti felkészítés érthető és jól strukturált volt. Bátran ajánlom kezdőknek is.",
      ro: "Pregătirea teoretică a fost clară și bine structurată. O recomand și începătorilor.",
    },
  },
  {
    id: "t4",
    name: "Levente P.",
    location: { hu: "Kézdivásárhely", ro: "Târgu Secuiesc" },
    rating: 5,
    text: {
      hu: "Az autók tiszták és jól karbantartottak. Az oktató végig nyugodt maradt, ez sokat segített.",
      ro: "Mașinile sunt curate și bine întreținute. Instructorul a rămas calm tot timpul, ceea ce m-a ajutat mult.",
    },
  },
  {
    id: "t5",
    name: "Réka S.",
    location: { hu: "Bereck", ro: "Brețcu" },
    rating: 5,
    text: {
      hu: "Nemcsak a vizsgára készítettek fel, hanem a valós forgalomra is. Ma is hasznát veszem.",
      ro: "M-au pregătit nu doar pentru examen, ci și pentru traficul real. Și azi îmi folosește.",
    },
  },
  {
    id: "t6",
    name: "Zsolt D.",
    location: { hu: "Kézdivásárhely", ro: "Târgu Secuiesc" },
    rating: 5,
    text: {
      hu: "Pótórákat kértem, és rögtön be tudtak illeszteni. Profi és emberi hozzáállás.",
      ro: "Am cerut ore suplimentare și m-au programat imediat. Atitudine profesionistă și umană.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 12. FAQ                                                             */
/* ------------------------------------------------------------------ */

export const faqContent = {
  eyebrow: { hu: "GYIK", ro: "Întrebări frecvente" },
  title: { hu: "Gyakori kérdések", ro: "Întrebări frecvente" },
  subtitle: {
    hu: "Ha nem találod a választ, hívj minket bizalommal.",
    ro: "Dacă nu găsești răspunsul, sună-ne cu încredere.",
  },
};

export const faqItems: FaqItem[] = [
  {
    question: { hu: "Hogyan tudok beiratkozni?", ro: "Cum mă pot înscrie?" },
    answer: {
      hu: "Hívj minket telefonon, vagy küldj üzenetet a kapcsolati űrlapon. Egyeztetünk egy időpontot, és személyesen intézzük a beiratkozást az irodánkban.",
      ro: "Sună-ne sau trimite un mesaj prin formularul de contact. Stabilim o întâlnire și finalizăm înscrierea la biroul nostru.",
    },
  },
  {
    question: { hu: "Milyen iratokra van szükség?", ro: "Ce acte sunt necesare?" },
    answer: {
      hu: "Személyi igazolvány másolat szükséges. A pontos listát a beiratkozáskor részletesen átbeszéljük.",
      ro: "Carte de identitate, fișă medicală, aviz psihologic și formularul de înscriere. Lista exactă o discutăm detaliat la înscriere.",
    },
  },
  {
    question: { hu: "Hogyan zajlik a B kategóriás képzés?", ro: "Cum decurge pregătirea pentru categoria B?" },
    answer: {
      hu: "A képzés elméleti felkészítésből és gyakorlati vezetési órákból áll. Az elmélet során a közlekedési szabályokat és a tesztkérdéseket vesszük át, a gyakorlaton pedig fokozatosan haladunk a manőverektől a valós forgalomig.",
      ro: "Pregătirea cuprinde ore de teorie și ore practice de conducere. La teorie parcurgem legislația și chestionarele, iar la practică avansăm treptat de la manevre la traficul real.",
    },
  },
  {
    question: { hu: "Hogyan történik a vezetési órák beosztása?", ro: "Cum se programează orele de conducere?" },
    answer: {
      hu: "Az órákat közösen egyeztetjük az oktatóddal, a te időbeosztásodhoz igazítva. Hétköznap délelőtt és délután is van lehetőség vezetésre.",
      ro: "Orele se stabilesc împreună cu instructorul tău, în funcție de programul tău. În timpul săptămânii se poate conduce dimineața și după-amiaza.",
    },
  },
  {
    question: { hu: "Mennyi ideig tart a tanfolyam?", ro: "Cât durează cursul?" },
    answer: {
      hu: "Ez a haladási tempódtól és a vizsgaidőpontoktól függ. A legtöbb tanuló néhány hónap alatt jut el a beiratkozástól a sikeres vizsgáig.",
      ro: "Depinde de ritmul tău și de datele de examen. Majoritatea cursanților ajung de la înscriere la examen în câteva luni.",
    },
  },
  {
    question: { hu: "Hogyan zajlik a vizsga?", ro: "Cum decurge examenul?" },
    answer: {
      hu: "A vizsga elméleti (számítógépes teszt) és gyakorlati (forgalmi) részből áll. A vizsga előtt szimulált vizsgahelyzetekkel készítünk fel.",
      ro: "Examenul are o parte teoretică (chestionar pe calculator) și una practică (traseu). Înainte te pregătim cu simulări de examen.",
    },
  },
  {
    question: { hu: "Kérhetek pótórákat?", ro: "Pot cere ore suplimentare?" },
    answer: {
      hu: "Természetesen. Bármikor kérhetsz további vezetési órákat, ha úgy érzed, még több gyakorlásra van szükséged.",
      ro: "Desigur. Poți cere oricând ore suplimentare de conducere, dacă simți nevoia de mai multă practică.",
    },
  },
  {
    question: { hu: "Hol zajlik a gyakorlati képzés?", ro: "Unde se desfășoară pregătirea practică?" },
    answer: {
      hu: "Kézdivásárhelyen és környékén, a valós vizsgaútvonalakon, valamint gyakorlópályán a manőverek elsajátításához.",
      ro: "În Târgu Secuiesc și în împrejurimi, pe traseele reale de examen și pe poligon pentru manevre.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 13. News & announcements                                            */
/* ------------------------------------------------------------------ */

export const newsContent = {
  eyebrow: { hu: "Hírek", ro: "Noutăți" },
  title: { hu: "Aktuális hírek és tájékoztatók", ro: "Noutăți și informații" },
  subtitle: {
    hu: "Induló csoportok, vizsgaidőpontok és fontos tudnivalók.",
    ro: "Grupe noi, date de examen și informații importante.",
  },
  emptyLabel: {
    hu: "Jelenleg nincs friss hír. Nézz vissza hamarosan!",
    ro: "Momentan nu există noutăți. Revino în curând!",
  },
};

/**
 * A dátumokat előre formázott szövegként tároljuk (`dateLabel`),
 * hogy a szerver és a böngésző mindig ugyanazt jelenítse meg.
 */
export const newsItems: NewsItem[] = [
  {
    id: "hir-1",
    date: "2026-08-01",
    dateLabel: { hu: "2026. augusztus 1.", ro: "1 august 2026" },
    category: { hu: "Beiratkozás", ro: "Înscriere" },
    title: {
      hu: "Új B kategóriás csoport indul szeptemberben",
      ro: "Grupă nouă de categoria B în septembrie",
    },
    excerpt: {
      hu: "Szeptemberi indulással új elméleti csoportot hirdetünk. A helyek száma korlátozott, jelentkezni telefonon vagy a kapcsolati űrlapon lehet.",
      ro: "Deschidem o grupă nouă de teorie din septembrie. Locurile sunt limitate, înscrierile se fac telefonic sau prin formular.",
    },
    cta: { label: { hu: "Jelentkezem", ro: "Mă înscriu" }, href: "#contact" },
  },
  {
    id: "hir-2",
    date: "2026-07-15",
    dateLabel: { hu: "2026. július 15.", ro: "15 iulie 2026" },
    category: { hu: "Vizsga", ro: "Examen" },
    title: {
      hu: "Vizsgafelkészítő szimulációk minden hónapban",
      ro: "Simulări de examen în fiecare lună",
    },
    excerpt: {
      hu: "A vizsga előtt álló tanulóinknak havonta szervezünk teljes vizsgaszimulációt valós útvonalakon, oktatói értékeléssel.",
      ro: "Pentru cursanții aflați înaintea examenului organizăm lunar simulări complete pe trasee reale, cu evaluarea instructorului.",
    },
  },
  {
    id: "hir-3",
    date: "2026-06-20",
    dateLabel: { hu: "2026. június 20.", ro: "20 iunie 2026" },
    category: { hu: "Iskola", ro: "Școală" },
    title: { hu: "Megújult oktatóautó-parkunk", ro: "Parcul auto reînnoit" },
    excerpt: {
      hu: "Frissítettük gépkocsijainkat: minden autónk dupla pedállal, klímával és korszerű biztonsági rendszerekkel felszerelt.",
      ro: "Ne-am reînnoit mașinile: toate au dublă comandă, climatizare și sisteme moderne de siguranță.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 14. Final CTA                                                       */
/* ------------------------------------------------------------------ */

export const ctaContent = {
  title: {
    hu: "Készen állsz az első vezetési órádra?",
    ro: "Ești gata pentru prima oră de conducere?",
  },
  subtitle: {
    hu: "Hívj minket, és néhány percben átbeszéljük, hogyan indulhatsz el a jogosítvány felé. Nálunk mindig van hely egy új tanulónak.",
    ro: "Sună-ne și în câteva minute discutăm cum poți începe drumul spre permis. La noi este mereu loc pentru un cursant nou.",
  },
  primaryCta: { label: { hu: "Jelentkezem", ro: "Înscrie-te acum" }, href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* 15. Contact & business info                                         */
/* ------------------------------------------------------------------ */

export const contactInfo = {
  eyebrow: { hu: "Kapcsolat", ro: "Contact" },
  title: { hu: "Vedd fel velünk a kapcsolatot", ro: "Ia legătura cu noi" },
  subtitle: {
    hu: "Írj vagy hívj minket — szívesen válaszolunk a kérdéseidre.",
    ro: "Scrie-ne sau sună-ne — răspundem cu plăcere la întrebările tale.",
  },
  labels: {
    address: { hu: "Cím", ro: "Adresă" },
    phone: { hu: "Telefon", ro: "Telefon" },
    email: { hu: "E-mail", ro: "E-mail" },
    openingHours: { hu: "Nyitvatartás", ro: "Program" },
    directions: { hu: "Útvonaltervezés", ro: "Vezi traseul" },
    map: { hu: "térkép", ro: "hartă" },
  },
  businessName: "AUTOSISKOLA SCOBAR",
  address: {
    street: "Curtea 39",
    city: "Târgu Secuiesc (Kézdivásárhely)",
    postalCode: "525400",
    country: { hu: "Románia", ro: "România" },
    full: {
      hu: "Curtea 39, Târgu Secuiesc 525400, Románia",
      ro: "Curtea 39, Târgu Secuiesc 525400, România",
    },
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
    { day: { hu: "Hétfő – Péntek", ro: "Luni – Vineri" }, hours: "09:00 – 17:00" },
    { day: { hu: "Szombat", ro: "Sâmbătă" }, hours: { hu: "Zárva", ro: "Închis" } },
    { day: { hu: "Vasárnap", ro: "Duminică" }, hours: { hu: "Zárva", ro: "Închis" } },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=Curtea%2039,%20T%C3%A2rgu%20Secuiesc%20525400,%20Romania&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Curtea+39,+T%C3%A2rgu+Secuiesc+525400,+Romania",
  form: {
    nameLabel: { hu: "Név", ro: "Nume" },
    namePlaceholder: { hu: "Teljes neved", ro: "Numele tău complet" },
    phoneLabel: { hu: "Telefonszám", ro: "Număr de telefon" },
    phonePlaceholder: "+40 ...",
    emailLabel: { hu: "E-mail", ro: "E-mail" },
    emailPlaceholder: "nume@example.com",
    messageLabel: { hu: "Üzenet", ro: "Mesaj" },
    messagePlaceholder: { hu: "Miben segíthetünk?", ro: "Cu ce te putem ajuta?" },
    submitLabel: { hu: "Üzenet küldése", ro: "Trimite mesajul" },
    successMessage: {
      hu: "Köszönjük! Hamarosan felvesszük veled a kapcsolatot.",
      ro: "Mulțumim! Te vom contacta în curând.",
    },
  },
};

export const socialLinks = [
  { label: "Facebook", icon: "Facebook", href: "https://facebook.com" },
];

/* ------------------------------------------------------------------ */
/* 16. Footer                                                          */
/* ------------------------------------------------------------------ */

export const footerContent = {
  description: {
    hu: "Autósiskola Kézdivásárhelyen. B kategóriás képzés tapasztalt oktatókkal, modern gépkocsikkal és emberi hozzáállással.",
    ro: "Școală de șoferi în Târgu Secuiesc. Pregătire categoria B cu instructori experimentați, mașini moderne și atitudine umană.",
  },
  navTitle: { hu: "Navigáció", ro: "Navigare" },
  servicesTitle: { hu: "Szolgáltatások", ro: "Servicii" },
  contactTitle: { hu: "Kapcsolat", ro: "Contact" },
  copyright: {
    hu: `© ${siteSettings.copyrightYear} AUTOSISKOLA SCOBAR. Minden jog fenntartva.`,
    ro: `© ${siteSettings.copyrightYear} AUTOSISKOLA SCOBAR. Toate drepturile rezervate.`,
  },
  legalLinks: [
    { label: { hu: "Adatvédelmi tájékoztató", ro: "Politica de confidențialitate" }, href: "#contact" },
    { label: { hu: "Felhasználási feltételek", ro: "Termeni și condiții" }, href: "#contact" },
  ],
};
