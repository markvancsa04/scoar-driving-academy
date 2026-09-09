import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Untyped view of the connected Supabase project, used for the CMS tables.
 * Row Level Security is the security boundary: the public site reads with
 * the anon key, administrators write with their own session.
 */
export const db = supabase as unknown as SupabaseClient<any>;

export const MEDIA_BUCKET = "site-media";

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: userData } = await db.auth.getUser();
  const user = userData?.user;
  if (!user) return false;
  const { data, error } = await db.rpc("has_role", { _user_id: user.id, _role: "admin" });
  if (error) return false;
  return data === true;
}
