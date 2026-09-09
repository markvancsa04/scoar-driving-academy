# Visual admin panel (CMS) for SCOBAR

Everything stays on the backend project already connected to this site (`ndfhbrfcvbevbiqoawbt`). No new backend, no second project, no redesign of the public site.

## 1. What becomes editable

Full audit of the current site. Every one of these moves out of the code file and into the admin panel, in both Hungarian and Romanian:

- **Site settings** — name per language, tagline, logo, copyright year, SEO title/description/social preview
- **Menu** — labels and targets, the "Înscriere" button
- **Hero** — eyebrow, title, subtitle, both buttons (text + link), background image, the 3 highlight boxes
- **About** — heading, texts, statistics, image
- **Services** — 4 cards: icon, title, description, optional button, order, on/off
- **Instructors** — 6 people: name, role, bio, experience, categories, photo, contact, "featured on homepage" toggle, order
- **Vehicles** — 6 cards (3 currently empty): name, gearbox, fuel, description, spec rows, photo, order
- **Why us / Process** — headings and each item
- **Gallery** — images with captions, order, add/delete
- **Reviews** — name, text, rating, location, photo
- **FAQ** — question/answer pairs, order
- **News** — date, category, title, excerpt, image, button
- **Final CTA band** — title, subtitle, button
- **Contact** — business name, address, opening hours, phone numbers (any number of them), email, map link, all form labels and error messages
- **Social links** — Facebook, Instagram, TikTok, YouTube, WhatsApp and more; empty ones stay hidden on the site, exactly as today
- **Footer** — description, column titles, legal links, copyright

## 2. Database design

One table per section, mirroring the current content shapes so nothing on the site has to be redesigned.

Singleton tables (one row each, edited as a form): `site_settings`, `hero`, `about`, `contact_info`, `footer`, plus a `section_headings` table holding the eyebrow/title/subtitle of every section.

List tables (rows the admin adds, reorders, switches off): `nav_items`, `hero_highlights`, `services`, `instructors`, `vehicles`, `vehicle_specs`, `advantages`, `process_steps`, `gallery_images`, `testimonials`, `faq_items`, `news_items`, `phone_numbers`, `opening_hours`, `social_links`, `footer_links`.

Every table gets: `id` (uuid), `created_at`/`updated_at` (auto), `sort_order`, and `is_active` where hiding an item makes sense. Bilingual fields are stored as a single JSON value `{hu, ro}` per field — one row per item, never a duplicated Hungarian and Romanian row, so facts can never drift apart. Images are stored as a reference to one row in a `media` table (path in storage + alt text per language), so replacing a photo in one place updates it everywhere it is used.

Admin accounts: a separate `user_roles` table (never a role column on a profile) with a role check used by all the write rules.

## 3. Media storage

One public bucket `site-media` with folders: `logo/`, `hero/`, `about/`, `services/`, `instructors/`, `vehicles/`, `gallery/`, `news/`, `social/`. Files are uploaded as real files (never encoded into the database). Public visitors can view; only signed-in administrators can upload, replace or delete. The existing image helper already knows how to build these URLs, so the public site needs no change there.

## 4. Security

- Public visitors: read-only, and only on the content meant to be public.
- Administrators: full create/update/delete/reorder/upload, checked server-side against the roles table.
- No secret key ever reaches the browser. The owner's first admin account is created separately by us with their own email and password — never written into the code.

## 5. Admin panel

New protected area at `/admin`, with a login screen (email, password, logout) and a left sidebar:

Dashboard · Site settings · Menu · Hero · About · Services · Instructors · Vehicles · Why us · Process · Gallery · Reviews · FAQ · News · CTA band · Contact · Social media · Footer · Media library

Each screen is a plain form: text boxes, longer text areas, image pickers with preview and upload, on/off switches, drag-and-drop ordering for lists. Every text field shows a HU / RO tab pair so both languages are edited side by side, with a warning if one language is left empty. Save buttons, unsaved-change warnings, success messages. Nothing about databases is visible to the user.

## 6. How the public site connects

The site already reads all content through one single module (`src/data/content.ts`). That module switches from the static file to the backend — page by page, verifying the site looks identical after each step. Design, layout, animations, responsiveness and the HU/RO switch stay exactly as they are. The current content is copied into the backend as the starting data, so nothing is lost and the site never appears empty.

## 7. Order of work

1. Database tables + security rules + storage bucket, seeded with today's exact content.
2. Admin login and empty dashboard shell.
3. Section screens, built in batches (settings/hero/about → services/instructors/vehicles → gallery/reviews/FAQ/news → contact/social/footer), each verified live.
4. Media library.
5. Switch the public site over to the backend, section by section.
6. Create the owner's admin account and hand over.

## Technical notes

- Backend project `ndfhbrfcvbevbiqoawbt` only; content reads for the public site go through public read policies, admin writes through authenticated server functions with a role check.
- Bilingual fields as `jsonb {hu, ro}`; the existing `Loc`/`Resolved` types in `src/content/types.ts` stay the contract, so components are untouched.
- Route layout: `src/routes/_authenticated/admin/*` for the panel, public `/auth` route for login.
- Public routes keep server rendering with public read policies; no protected call in a public loader.
- `src/content/site.ts` is kept as the seed source and fallback until the switchover is complete, then retired.
