import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { COLLECTIONS } from "./cms/model";
import type { CmsSnapshot } from "./cms/overlay";

/**
 * Public, read-only snapshot of the CMS content stored in the connected
 * Supabase project. Failures are non-fatal: the website then renders the
 * built-in content.
 */
export const getCmsSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmsSnapshot> => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    const empty: CmsSnapshot = { sections: {}, collections: {} };
    if (!url || !key) return empty;

    const client = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const snapshot: CmsSnapshot = { sections: {}, collections: {} };

    try {
      const { data: sections } = await client.from("cms_sections").select("key, data");
      for (const row of sections ?? []) {
        if (row && typeof row.key === "string") snapshot.sections[row.key] = row.data;
      }
    } catch {
      /* backend not ready — keep static content */
    }

    await Promise.all(
      Object.entries(COLLECTIONS).map(async ([contentKey, table]) => {
        try {
          const { data } = await client
            .from(table)
            .select("data, sort_order")
            .eq("is_active", true)
            .order("sort_order", { ascending: true });
          if (data && data.length > 0) {
            snapshot.collections[contentKey] = data.map((row: any) => row.data);
          }
        } catch {
          /* ignore a single missing table */
        }
      }),
    );

    return snapshot;
  },
);
