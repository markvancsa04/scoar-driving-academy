import { rawContent } from "@/data/content";
import { COLLECTIONS, SECTION_KEYS, type CollectionKey } from "./model";
import { db } from "./db";
import { isBlankRecord } from "./overlay";

/** The static items currently shown on the public website for a collection. */
export function staticItems(key: string): unknown[] {
  const items = (rawContent as Record<string, unknown>)[key];
  return Array.isArray(items) ? items : [];
}

/**
 * Copies the real website items of one collection into Supabase when the
 * table is still empty. Existing rows are never touched or duplicated.
 * Returns the number of inserted rows.
 */
export async function seedCollection(key: CollectionKey): Promise<number> {
  const table = COLLECTIONS[key];
  if (!table) return 0;
  const items = staticItems(key);
  if (items.length === 0) return 0;

  // Existing rows are never touched — except blank template rows, which
  // carry no content and would otherwise hide the real website items.
  const { data: existing, error: readError } = await db.from(table).select("id, data");
  if (readError) throw new Error(`${table}: ${readError.message}`);
  const rowsNow = existing ?? [];
  const blankIds = rowsNow.filter((r: any) => isBlankRecord(r.data)).map((r: any) => r.id);
  if (rowsNow.length > blankIds.length) return 0;
  if (blankIds.length > 0) {
    const { error: delError } = await db.from(table).delete().in("id", blankIds);
    if (delError) throw new Error(`${table}: ${delError.message}`);
  }

  const rows = items.map((data, index) => ({
    slug: `${key}-${index + 1}`,
    sort_order: (index + 1) * 10,
    is_active: true,
    data,
  }));
  const { error } = await db.from(table).insert(rows);
  if (error) throw new Error(`${table}: ${error.message}`);
  return rows.length;
}

/**
 * Copies the current website content into the Supabase project so the
 * administrator starts editing exactly what the site shows today.
 * Existing collection rows are never overwritten.
 */
export async function importStaticContent(onProgress?: (msg: string) => void): Promise<void> {
  for (const key of SECTION_KEYS) {
    const data = (rawContent as Record<string, unknown>)[key];
    if (!data) continue;
    const { error } = await db.from("cms_sections").upsert({ key, data }, { onConflict: "key" });
    if (error) throw new Error(`${key}: ${error.message}`);
    onProgress?.(key);
  }

  for (const key of Object.keys(COLLECTIONS) as CollectionKey[]) {
    const inserted = await seedCollection(key);
    onProgress?.(inserted > 0 ? key : `${key} ✓`);
  }
}
