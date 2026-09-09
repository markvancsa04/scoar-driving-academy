import { db, MEDIA_BUCKET } from "./db";

export interface MediaRow {
  id: string;
  storage_path: string;
  folder: string;
  alt: { hu: string; ro: string };
  created_at: string;
}

function safeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function uploadMedia(file: File, folder = "general"): Promise<MediaRow> {
  const path = `${folder}/${Date.now()}-${safeName(file.name)}`;

  const { error: uploadError } = await db.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (uploadError) throw new Error(uploadError.message);

  const { data, error } = await db
    .from("cms_media")
    .insert({ storage_path: path, folder, alt: { hu: "", ro: "" } })
    .select()
    .single();
  if (error) throw new Error(error.message);

  return data as MediaRow;
}

export async function listMedia(): Promise<MediaRow[]> {
  const { data, error } = await db
    .from("cms_media")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as MediaRow[];
}

export async function deleteMedia(row: MediaRow): Promise<void> {
  await db.storage.from(MEDIA_BUCKET).remove([row.storage_path]);
  const { error } = await db.from("cms_media").delete().eq("id", row.id);
  if (error) throw new Error(error.message);
}

export async function updateMediaAlt(id: string, alt: { hu: string; ro: string }): Promise<void> {
  const { error } = await db.from("cms_media").update({ alt }).eq("id", id);
  if (error) throw new Error(error.message);
}
