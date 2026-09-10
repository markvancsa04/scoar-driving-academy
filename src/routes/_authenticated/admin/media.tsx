import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { resolveMediaUrl } from "@/lib/media";
import { useAdminExtra, useAdminT } from "@/lib/admin/i18n";
import { deleteMedia, listMedia, updateMediaAlt, uploadMedia, type MediaRow } from "@/lib/cms/media";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: MediaLibrary,
});

function MediaLibrary() {
  const T = useAdminT();
  const X = useAdminExtra();
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setRows(await listMedia());
    } catch (e) {
      setMessage(e instanceof Error ? e.message : T("error"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleFiles(files: FileList) {
    setBusy(true);
    setMessage(null);
    try {
      for (const file of Array.from(files)) await uploadMedia(file, "library");
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : X("uploadFailed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">{T("mediaLibrary")}</h1>
          <p className="text-sm text-muted-foreground">
            {X("mediaIntro")}
          </p>
        </div>
        <label className="cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          {busy ? T("uploading") : X("uploadPhotos")}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) void handleFiles(e.target.files);
            }}
          />
        </label>
      </header>

      {message && <p className="text-sm text-destructive">{message}</p>}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((row) => (
          <li key={row.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={resolveMediaUrl({ storagePath: row.storage_path }) ?? ""}
              alt=""
              className="h-36 w-full object-cover"
            />
            <div className="space-y-2 p-3">
              <p className="truncate text-[11px] text-muted-foreground">{row.storage_path}</p>
              <input
                defaultValue={row.alt?.hu ?? ""}
                placeholder={X("altHu")}
                onBlur={(e) =>
                  void updateMediaAlt(row.id, { hu: e.target.value, ro: row.alt?.ro ?? "" })
                }
                className="w-full rounded border border-border bg-background px-2 py-1 text-xs"
              />
              <input
                defaultValue={row.alt?.ro ?? ""}
                placeholder={X("altRo")}
                onBlur={(e) =>
                  void updateMediaAlt(row.id, { hu: row.alt?.hu ?? "", ro: e.target.value })
                }
                className="w-full rounded border border-border bg-background px-2 py-1 text-xs"
              />
              <button
                onClick={async () => {
                  await deleteMedia(row);
                  await load();
                }}
                className="rounded border border-border px-2 py-1 text-xs text-destructive"
              >
                {T("delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {rows.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {X("libraryEmpty")}
        </p>
      )}
    </div>
  );
}
