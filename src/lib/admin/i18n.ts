/**
 * Admin panel UI strings.
 *
 * The admin panel reuses the website's language provider, whose default is
 * Hungarian, so the panel is Hungarian by default and switches to Romanian
 * with the same HU / RO switcher used on the public site.
 */

import { useCallback } from "react";
import { useLanguage, t } from "@/lib/i18n";
import type { Localized } from "@/content/types";
import { labelFor } from "@/lib/cms/model";

export const adminUi = {
  adminTitle: { hu: "Adminisztráció", ro: "Administrare" },
  checkingAccess: { hu: "Hozzáférés ellenőrzése…", ro: "Se verifică accesul…" },
  accessDenied: { hu: "Korlátozott hozzáférés", ro: "Acces restricționat" },
  accessDeniedText: {
    hu: "A fiókodnak nincs adminisztrátori joga. Futtasd a Supabase-ben:",
    ro: "Contul tău nu are drepturi de administrator. Rulează în Supabase:",
  },
  signOut: { hu: "Kijelentkezés", ro: "Deconectare" },
  menu: { hu: "Menü", ro: "Meniu" },
  viewSite: { hu: "Weboldal megtekintése ↗", ro: "Vezi site-ul ↗" },
  dashboard: { hu: "Áttekintés", ro: "Panou general" },
  visualEditor: { hu: "Vizuális szerkesztő", ro: "Editor vizual" },
  mediaLibrary: { hu: "Médiatár", ro: "Bibliotecă media" },
  messages: { hu: "Üzenetek", ro: "Mesaje" },
  applications: { hu: "Jelentkezések", ro: "Înscrieri" },
  reviewsAdmin: { hu: "Értékelések", ro: "Recenzii" },
  sections: { hu: "Szakaszok", ro: "Secțiuni" },
  lists: { hu: "Listák", ro: "Liste" },

  dashboardIntro: {
    hu: "Szerkeszd a weboldal teljes tartalmát, magyarul és románul.",
    ro: "Editează tot conținutul site-ului, în maghiară și română.",
  },
  firstStep: { hu: "Első lépés", ro: "Primul pas" },
  firstStepText: {
    hu: "Másold be a weboldal jelenlegi tartalmát az adatbázisba, hogy innen szerkeszthesd. A már meglévő listák nem íródnak felül.",
    ro: "Copiază conținutul actual al site-ului în baza de date, ca să îl poți edita de aici. Listele deja existente nu sunt suprascrise.",
  },
  importNow: { hu: "Jelenlegi tartalom importálása", ro: "Importă conținutul actual" },
  importing: { hu: "Importálás…", ro: "Se importă…" },
  done: { hu: "Kész.", ro: "Gata." },
  error: { hu: "Hiba", ro: "Eroare" },

  save: { hu: "Mentés", ro: "Salvează" },
  saving: { hu: "Mentés…", ro: "Se salvează…" },
  saved: {
    hu: "Elmentve. Töltsd újra a weboldalt a módosítás megtekintéséhez.",
    ro: "Salvat. Reîncarcă site-ul ca să vezi modificarea.",
  },
  savedShort: { hu: "Elmentve.", ro: "Salvat." },
  loading: { hu: "Betöltés…", ro: "Se încarcă…" },
  bothLanguages: {
    hu: "Töltsd ki mindkét nyelvet (HU / RO).",
    ro: "Completează ambele limbi (HU / RO).",
  },
  delete: { hu: "Törlés", ro: "Șterge" },
  add: { hu: "+ Hozzáadás", ro: "+ Adaugă" },
  newItem: { hu: "+ Új elem", ro: "+ Element nou" },
  active: { hu: "Aktív", ro: "Activ" },
  listIntro: {
    hu: "Elemek hozzáadása, szerkesztése, átrendezése vagy kikapcsolása.",
    ro: "Adaugă, editează, reordonează sau dezactivează elementele.",
  },
  unknownList: { hu: "Ismeretlen lista.", ro: "Listă necunoscută." },
  emptyList: {
    hu: "Nincsenek elemek. Importáld a jelenlegi tartalmat az Áttekintésből, vagy adj hozzá újat.",
    ro: "Nu există elemente. Importă conținutul actual din Panoul general sau adaugă unul nou.",
  },

  /* media */
  upload: { hu: "Kép feltöltése", ro: "Încarcă imagine" },
  uploading: { hu: "Feltöltés…", ro: "Se încarcă…" },
  chooseFromLibrary: { hu: "Választás a médiatárból", ro: "Alege din bibliotecă" },
  remove: { hu: "Eltávolítás", ro: "Elimină" },
  altText: { hu: "Alternatív szöveg", ro: "Text alternativ" },
  noMedia: { hu: "Még nincs feltöltött kép.", ro: "Nu există imagini încărcate." },

  /* visual editor */
  visualIntro: {
    hu: "Ez a valódi weboldal. Kattints egy szakasz „Szerkesztés” gombjára a tartalom módosításához.",
    ro: "Aceasta este pagina reală. Apasă „Editează” la o secțiune pentru a-i modifica conținutul.",
  },
  edit: { hu: "Szerkesztés", ro: "Editează" },
  editTexts: { hu: "Szövegek", ro: "Texte" },
  editItems: { hu: "Elemek", ro: "Elemente" },

  /* submissions */
  name: { hu: "Név", ro: "Nume" },
  email: { hu: "E-mail", ro: "E-mail" },
  phone: { hu: "Telefon", ro: "Telefon" },
  message: { hu: "Üzenet", ro: "Mesaj" },
  date: { hu: "Dátum", ro: "Dată" },
  status: { hu: "Állapot", ro: "Stare" },
  unread: { hu: "Olvasatlan", ro: "Necitit" },
  read: { hu: "Olvasott", ro: "Citit" },
  markRead: { hu: "Olvasottnak jelöl", ro: "Marchează citit" },
  markUnread: { hu: "Olvasatlannak jelöl", ro: "Marchează necitit" },
  noMessages: { hu: "Még nincs beérkezett üzenet.", ro: "Nu există mesaje primite." },
  noApplications: { hu: "Még nincs jelentkezés.", ro: "Nu există înscrieri." },
  noReviews: { hu: "Még nincs beküldött értékelés.", ro: "Nu există recenzii trimise." },
  category: { hu: "Kategória", ro: "Categorie" },
  rating: { hu: "Értékelés", ro: "Notă" },
  approve: { hu: "Jóváhagyás", ro: "Aprobă" },
  unpublish: { hu: "Elrejtés", ro: "Ascunde" },
  approved: { hu: "Közzétéve", ro: "Publicat" },
  pending: { hu: "Jóváhagyásra vár", ro: "În așteptare" },
  confirmDelete: { hu: "Biztosan törlöd?", ro: "Sigur ștergi?" },
  tableMissing: {
    hu: "Ez a tábla még nem létezik az adatbázisban. Futtasd a db/002_forms_reviews.sql fájlt a Supabase SQL szerkesztőjében.",
    ro: "Acest tabel nu există încă în baza de date. Rulează fișierul db/002_forms_reviews.sql în editorul SQL Supabase.",
  },
} satisfies Record<string, Localized>;

export type AdminKey = keyof typeof adminUi;

export function useAdminT() {
  const { language } = useLanguage();
  return useCallback((key: AdminKey) => t(adminUi[key], language), [language]);
}

/* Extra strings used by the media library and pickers. */
export const adminExtra = {
  mediaIntro: {
    hu: "Töltsd fel egyszer a fotókat, és használd őket bárhol az oldalon.",
    ro: "Încarcă fotografii o singură dată și folosește-le oriunde pe site.",
  },
  uploadPhotos: { hu: "Fotók feltöltése", ro: "Încarcă fotografii" },
  libraryEmpty: { hu: "A médiatár üres.", ro: "Biblioteca este goală." },
  deleteImage: { hu: "Kép törlése", ro: "Șterge imaginea" },
  noImage: { hu: "nincs kép", ro: "fără imagine" },
  pathPlaceholder: { hu: "fájlútvonal vagy https://… cím", ro: "cale fișier sau adresă https://…" },
  uploadFailed: { hu: "A feltöltés nem sikerült", ro: "Încărcare eșuată" },
  altHu: { hu: "Alternatív szöveg (HU)", ro: "Text alternativ (HU)" },
  altRo: { hu: "Alternatív szöveg (RO)", ro: "Text alternativ (RO)" },
} satisfies Record<string, Localized>;

export function useAdminExtra() {
  const { language } = useLanguage();
  return useCallback((key: keyof typeof adminExtra) => t(adminExtra[key], language), [language]);
}

/** Translated label for a content field / section key. */
export function useLabel() {
  const { language } = useLanguage();
  return useCallback((key: string) => labelFor(key, language), [language]);
}
