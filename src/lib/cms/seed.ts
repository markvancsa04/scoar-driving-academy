import { rawContent } from "@/data/content";
import { COLLECTIONS, SECTION_KEYS, type CollectionKey } from "./model";
import { db } from "./db";

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

  const { count, error: countError } = await db
    .from(table)
    .select("id", { count: "exact", head: true });
  if (countError) throw new Error(`${table}: ${countError.message}`);
  if ((count ?? 0) > 0) return 0;

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
