import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { FieldEditor } from "@/components/admin/FieldEditor";
import { db } from "@/lib/cms/db";
import { COLLECTIONS, labelFor, type CollectionKey, type Json } from "@/lib/cms/model";
import { rawContent } from "@/data/content";

export const Route = createFileRoute("/_authenticated/admin/collections/$key")({
  component: CollectionEditor,
});

interface Row {
  id: string;
  sort_order: number;
  is_active: boolean;
  data: Json;
}

function emptyFrom(template: Json): Json {
  if (!template || typeof template !== "object") return {};
  return JSON.parse(JSON.stringify(template, (_k, v) => (typeof v === "string" ? "" : v)));
}

function CollectionEditor() {
  const { key } = Route.useParams();
  const collectionKey = key as CollectionKey;
  const table = COLLECTIONS[collectionKey];
  const list = (rawContent as Record<string, Json>)[collectionKey];
  const template = Array.isArray(list) ? list[0] : {};

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!table) return;
    setLoading(true);
    const { data, error } = await db
      .from(table)
      .select("id, sort_order, is_active, data")
      .order("sort_order", { ascending: true });
    if (error) setMessage(error.message);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }, [table]);

  useEffect(() => {
    setMessage(null);
    void load();
  }, [load]);

  if (!table) {
    return <p className="text-sm text-destructive">Listă necunoscută.</p>;
  }

  async function saveRow(row: Row) {
    const { error } = await db
      .from(table)
      .update({ data: row.data, is_active: row.is_active, sort_order: row.sort_order })
      .eq("id", row.id);
    setMessage(error ? error.message : "Salvat.");
  }

  async function addRow() {
    const sort = (rows[rows.length - 1]?.sort_order ?? 0) + 10;
    const { error } = await db
      .from(table)
      .insert({ sort_order: sort, is_active: true, data: emptyFrom(template) });
    if (error) setMessage(error.message);
    await load();
  }

  async function removeRow(row: Row) {
    const { error } = await db.from(table).delete().eq("id", row.id);
    if (error) setMessage(error.message);
    await load();
  }

  async function move(index: number, dir: -1 | 1) {
    const a = rows[index];
    const b = rows[index + dir];
    if (!a || !b) return;
    await db.from(table).update({ sort_order: b.sort_order }).eq("id", a.id);
    await db.from(table).update({ sort_order: a.sort_order }).eq("id", b.id);
    await load();
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">{labelFor(collectionKey)}</h1>
          <p className="text-sm text-muted-foreground">
            Adaugă, editează, reordonează sau dezactivează elementele.
          </p>
        </div>
        <button
          onClick={() => void addRow()}
          className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          + Element nou
        </button>
      </header>

      {message && <p className="text-sm text-accent">{message}</p>}

      {loading ? (
        <p className="text-sm text-muted-foreground">Se încarcă…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Nu există elemente. Importă conținutul actual din Panoul general sau adaugă unul nou.
        </p>
      ) : (
        <ul className="space-y-5">
          {rows.map((row, index) => (
            <li key={row.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-muted-foreground">#{index + 1}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 text-xs font-medium">
                    <input
                      type="checkbox"
                      checked={row.is_active}
                      onChange={(e) =>
                        setRows((r) =>
                          r.map((x) => (x.id === row.id ? { ...x, is_active: e.target.checked } : x)),
                        )
                      }
                    />
                    Activ
                  </label>
                  <button
                    onClick={() => void move(index, -1)}
                    className="rounded border border-border px-2 py-1 text-xs"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => void move(index, 1)}
                    className="rounded border border-border px-2 py-1 text-xs"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => void saveRow(row)}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    Salvează
                  </button>
                  <button
                    onClick={() => void removeRow(row)}
                    className="rounded border border-border px-2 py-1 text-xs text-destructive"
                  >
                    Șterge
                  </button>
                </div>
              </div>

              <FieldEditor
                name=""
                template={template}
                value={row.data}
                onChange={(next) =>
                  setRows((r) => r.map((x) => (x.id === row.id ? { ...x, data: next } : x)))
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
