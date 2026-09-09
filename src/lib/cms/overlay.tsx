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

export function applyOverlay<T extends Record<string, Json>>(raw: T, snapshot?: CmsSnapshot | null): T {
  if (!snapshot) return raw;
  const out: Record<string, Json> = { ...raw };

  for (const [key, value] of Object.entries(snapshot.sections ?? {})) {
    if (key in out && value) out[key] = deepMerge(out[key], value);
  }
  for (const [key, items] of Object.entries(snapshot.collections ?? {})) {
    if (key in out && Array.isArray(items) && items.length > 0) out[key] = items;
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
