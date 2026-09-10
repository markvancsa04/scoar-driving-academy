import { useState } from "react";
import { resolveMediaUrl } from "@/lib/media";
import { listMedia, uploadMedia, type MediaRow } from "@/lib/cms/media";
import type { Json } from "@/lib/cms/model";
import { useAdminExtra, useAdminT } from "@/lib/admin/i18n";

interface Props {
  value: Json;
  onChange: (v: Json) => void;
  label: string;
}

export function MediaPicker({ value, onChange, label }: Props) {
  const T = useAdminT();
  const X = useAdminExtra();
  const image = (value ?? {}) as Record<string, Json>;
  const alt = (image["alt"] ?? { hu: "", ro: "" }) as { hu?: string; ro?: string };
  const url = resolveMediaUrl(image as { src?: string; storagePath?: string });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [library, setLibrary] = useState<MediaRow[] | null>(null);

  function patch(next: Record<string, Json>) {
    onChange({ ...image, ...next });
  }

  async function handleUpload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const row = await uploadMedia(file, "site");
      patch({ storagePath: row.storage_path, src: undefined });
    } catch (e) {
      setError(e instanceof Error ? e.message : X("uploadFailed"));
    } finally {
      setBusy(false);
    }
  }

  async function openLibrary() {
    setBusy(true);
    try {
      setLibrary(await listMedia());
    } catch (e) {
      setError(e instanceof Error ? e.message : T("error"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-semibold">{label}</p>

      <div className="mt-3 flex flex-wrap items-start gap-4">
        <div className="h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
          {url ? (
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              {X("noImage")}
            </div>
          )}
        </div>

        <div className="flex min-w-[240px] flex-1 flex-col gap-2">
          <label className="inline-flex w-fit cursor-pointer items-center rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            {busy ? T("uploading") : T("upload")}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
              }}
            />
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void openLibrary()}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium"
            >
              {T("chooseFromLibrary")}
            </button>
            {(image["storagePath"] || image["src"]) && (
              <button
                type="button"
                onClick={() => patch({ storagePath: undefined, src: undefined })}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-destructive"
              >
                {X("deleteImage")}
              </button>
            )}
          </div>

          <input
            type="text"
            value={(image["storagePath"] as string) ?? (image["src"] as string) ?? ""}
            onChange={(e) => patch({ storagePath: e.target.value, src: undefined })}
            placeholder={X("pathPlaceholder")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
          />

          <div className="grid gap-2 sm:grid-cols-2">
            <input
              type="text"
              value={alt.hu ?? ""}
              onChange={(e) => patch({ alt: { ...alt, hu: e.target.value } })}
              placeholder={X("altHu")}
              className="rounded-md border border-border bg-background px-3 py-2 text-xs"
            />
            <input
              type="text"
              value={alt.ro ?? ""}
              onChange={(e) => patch({ alt: { ...alt, ro: e.target.value } })}
              placeholder={X("altRo")}
              className="rounded-md border border-border bg-background px-3 py-2 text-xs"
            />
          </div>
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      {library && (
        <div className="mt-4 grid max-h-64 grid-cols-3 gap-2 overflow-y-auto rounded-lg border border-border p-2 sm:grid-cols-5">
          {library.length === 0 && (
            <p className="col-span-full p-2 text-xs text-muted-foreground">
              {X("libraryEmpty")}
            </p>
          )}
          {library.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => {
                patch({ storagePath: row.storage_path, src: undefined });
                setLibrary(null);
              }}
              className="overflow-hidden rounded-md border border-border"
            >
              <img
                src={resolveMediaUrl({ storagePath: row.storage_path }) ?? ""}
                alt=""
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
