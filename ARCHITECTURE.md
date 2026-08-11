# Architecture — AUTOSISKOLA SCOBAR

The site is a static, Supabase-ready TanStack Start app. Content and UI are
strictly separated so the client's own Supabase project can be plugged in
later without rewriting the frontend.

```
src/
  content/
    types.ts     Content model (shapes = future Supabase table rows)
    site.ts      The current, fully editable content (all texts + images)
  data/
    content.ts   THE integration point. Components read content only from here.
  lib/
    media.ts     Image URL resolution (local asset now, Storage later)
  components/
    SiteImage.tsx  The only component that renders a content image
    <Section>.tsx  Presentational sections, no business data inside
  routes/
    index.tsx    Page assembly + SEO/JSON-LD (values come from the data layer)
```

## Rules

- Components never import from `src/content/*` — always from `@/data/content`.
- Components never build image URLs — always `<SiteImage image={...} />`.
- No dates computed at render time (SSR determinism): pre-formatted strings
  live in the content (`dateLabel`, `siteSettings.copyrightYear`).

## Connecting Supabase later

1. Enable the client's Supabase project and generate the client.
2. Create tables mirroring `src/content/types.ts`
   (`site_settings`, `navigation`, `services`, `instructors`, `vehicles`,
   `testimonials`, `faq_items`, `news`, `gallery_images`, `contact_info`,
   `social_links`, `seo`), with RLS: public `SELECT`, admin-only writes.
3. Replace the getters in `src/data/content.ts` with queries returning the
   same shapes; components switch from the named re-exports to the getters
   (via route loaders + TanStack Query).
4. Create the `site-media` Storage bucket; give image records a
   `storagePath`. `src/lib/media.ts` already resolves it — no component
   changes needed.
5. Add the protected `/admin` area (`src/routes/_authenticated/`) that writes
   to the same tables.

Nothing in the codebase depends on a specific Supabase project, key or
account today.
