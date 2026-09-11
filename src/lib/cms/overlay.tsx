/**
 * Overlay layer — merges the content edited in the admin panel (stored in
 * the client's Supabase project) on top of the static content tree, so the
 * website always renders, even when the backend is empty or unreachable.
 */

import { createContext, useContext, type ReactNode } from "react";
import type { Json } from "./model";

export interface CmsSnapshot {
  sections: Record<string, Json>;
  collections: Record<string, Json[]>;
}

export const EMPTY_SNAPSHOT: CmsSnapshot = { sections: {}, collections: {} };

function isPlainObject(v: unknown): v is Record<string, Json> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

export function deepMerge(base: Json, patch: Json): Json {
  if (patch === undefined || patch === null) return base;
  if (Array.isArray(patch)) return patch;
  if (isPlainObject(base) && isPlainObject(patch)) {
    const out: Record<string, Json> = { ...base };
    for (const [k, v] of Object.entries(patch)) out[k] = deepMerge(base[k], v);
    return out;
  }
  return patch;
}

/**
 * True when a stored record carries no real content at all (every text is
 * empty). Such rows are blank templates and must never replace the real
 * website content.
 */
export function isBlankRecord(value: Json): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (typeof value === "number" || typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.every(isBlankRecord);
  if (isPlainObject(value)) return Object.values(value).every(isBlankRecord);
  return true;
}

export function applyOverlay<T extends Record<string, Json>>(raw: T, snapshot?: CmsSnapshot | null): T {
  if (!snapshot) return raw;
  const out: Record<string, Json> = { ...raw };

  for (const [key, value] of Object.entries(snapshot.sections ?? {})) {
    if (key in out && value && !isBlankRecord(value)) out[key] = deepMerge(out[key], value);
  }
  for (const [key, items] of Object.entries(snapshot.collections ?? {})) {
    if (!(key in out) || !Array.isArray(items)) continue;
    const real = items.filter((item) => !isBlankRecord(item));
    if (real.length > 0) out[key] = real;
  }

  return out as T;
}

const CmsContext = createContext<CmsSnapshot | null>(null);

export function CmsProvider({
  snapshot,
  children,
}: {
  snapshot: CmsSnapshot | null;
  children: ReactNode;
}) {
  return <CmsContext.Provider value={snapshot}>{children}</CmsContext.Provider>;
}

export function useCmsSnapshot(): CmsSnapshot | null {
  return useContext(CmsContext);
}
