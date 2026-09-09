import { rawContent } from "@/data/content";
import { COLLECTIONS, SECTION_KEYS } from "./model";
import { db } from "./db";

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

  for (const [key, table] of Object.entries(COLLECTIONS)) {
    const items = (rawContent as Record<string, unknown>)[key];
    if (!Array.isArray(items)) continue;

    const { count, error: countError } = await db
      .from(table)
      .select("id", { count: "exact", head: true });
    if (countError) throw new Error(`${table}: ${countError.message}`);
    if ((count ?? 0) > 0) {
      onProgress?.(`${key} — există deja`);
      continue;
    }

    const rows = items.map((data, index) => ({
      slug: `${key}-${index + 1}`,
      sort_order: (index + 1) * 10,
      is_active: true,
      data,
    }));
    const { error } = await db.from(table).insert(rows);
    if (error) throw new Error(`${table}: ${error.message}`);
    onProgress?.(key);
  }
}
