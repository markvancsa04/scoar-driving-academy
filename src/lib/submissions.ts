/**
 * Visitor submissions — contact messages, course applications and reviews.
 * All reads and writes go through the single existing Supabase client
 * (`src/lib/cms/db.ts`); Row Level Security is the security boundary.
 */

import { db } from "@/lib/cms/db";
import type { Language } from "@/content/types";

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  language: string;
  is_read: boolean;
  created_at: string;
}

export interface ApplicationRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  category: string | null;
  message: string | null;
  language: string;
  status: string;
  is_read: boolean;
  created_at: string;
}

export interface ReviewRow {
  id: string;
  name: string;
  location: string | null;
  text: string;
  rating: number;
  language: string;
  is_approved: boolean;
  created_at: string;
}

export function isMissingTable(message?: string | null): boolean {
  return !!message && /does not exist|PGRST205|schema cache/i.test(message);
}

/* ------------------------------ public writes ---------------------- */

export async function submitContactMessage(input: {
  name: string;
  email?: string;
  phone?: string;
  message: string;
  language: Language;
}): Promise<void> {
  const { error } = await db.from("contact_messages").insert({
    name: input.name.trim().slice(0, 120),
    email: input.email?.trim().slice(0, 200) || null,
    phone: input.phone?.trim().slice(0, 60) || null,
    message: input.message.trim().slice(0, 4000),
    language: input.language,
  });
  if (error) throw new Error(error.message);
}

export async function submitApplication(input: {
  name: string;
  email?: string;
  phone?: string;
  category?: string;
  message?: string;
  language: Language;
}): Promise<void> {
  const { error } = await db.from("applications").insert({
    name: input.name.trim().slice(0, 120),
    email: input.email?.trim().slice(0, 200) || null,
    phone: input.phone?.trim().slice(0, 60) || null,
    category: input.category?.trim().slice(0, 60) || null,
    message: input.message?.trim().slice(0, 4000) || null,
    language: input.language,
  });
  if (error) throw new Error(error.message);
}

export async function submitReview(input: {
  name: string;
  location?: string;
  text: string;
  rating: number;
  language: Language;
}): Promise<void> {
  const { error } = await db.from("reviews").insert({
    name: input.name.trim().slice(0, 120),
    location: input.location?.trim().slice(0, 120) || null,
    text: input.text.trim().slice(0, 2000),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    language: input.language,
    is_approved: false,
  });
  if (error) throw new Error(error.message);
}

/* ------------------------------ public reads ----------------------- */

/** Approved reviews only — enforced both by the query and by RLS. */
export async function listApprovedReviews(): Promise<ReviewRow[]> {
  const { data, error } = await db
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as ReviewRow[];
}

/* ------------------------------ admin ------------------------------ */

export async function listMessages(): Promise<ContactMessageRow[]> {
  const { data, error } = await db
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ContactMessageRow[];
}

export async function listApplications(): Promise<ApplicationRow[]> {
  const { data, error } = await db
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ApplicationRow[];
}

export async function listAllReviews(): Promise<ReviewRow[]> {
  const { data, error } = await db
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ReviewRow[];
}

export async function setRowFlag(
  table: "contact_messages" | "applications" | "reviews",
  id: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const { error } = await db.from(table).update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteRow(
  table: "contact_messages" | "applications" | "reviews",
  id: string,
): Promise<void> {
  const { error } = await db.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}
