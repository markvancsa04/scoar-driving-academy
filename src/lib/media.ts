import type { ImageAsset } from "@/content/types";

/**
 * Media resolution layer.
 *
 * Today images are bundled local assets. Later they will live in a
 * Supabase Storage bucket and every record will carry a `storagePath`
 * instead of a `src`. Only this file needs to change:
 *
 *   const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
 *   return data.publicUrl;
 *
 * Components must never build image URLs themselves.
 */

/** Bucket name to use once Supabase Storage is connected. */
export const MEDIA_BUCKET = "site-media";

/** Base URL for storage-hosted media, injected at build time when available. */
const storagePublicBase = import.meta.env["VITE_SUPABASE_URL"]
  ? `${import.meta.env["VITE_SUPABASE_URL"]}/storage/v1/object/public/${MEDIA_BUCKET}`
  : null;

/**
 * Returns a usable URL for an image, or `null` when nothing is available yet
 * (so the UI can render a proper empty state instead of a broken image).
 */
export function resolveMediaUrl(image?: ImageAsset | null): string | null {
  if (!image) return null;

  if (image.storagePath) {
    if (/^https?:\/\//.test(image.storagePath)) return image.storagePath;
    if (storagePublicBase) {
      return `${storagePublicBase}/${image.storagePath.replace(/^\/+/, "")}`;
    }
    // Storage not connected yet — fall through to the local asset if present.
  }

  return image.src ?? null;
}

export function hasMedia(image?: ImageAsset | null): boolean {
  return resolveMediaUrl(image) !== null;
}
