import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useAdminT } from "@/lib/admin/i18n";
import {
  deleteRow,
  isMissingTable,
  listMessages,
  setRowFlag,
  type ContactMessageRow,
} from "@/lib/submissions";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const T = useAdminT();
  const [rows, setRows] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await listMessages());
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setError(isMissingTable(msg) ? T("tableMissing") : msg);
    } finally {
      setLoading(false);
    }
  }, [T]);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleRead(row: ContactMessageRow) {
    await setRowFlag("contact_messages", row.id, { is_read: !row.is_read });
    await load();
  }

  async function remove(row: ContactMessageRow) {
    if (!window.confirm(T("confirmDelete"))) return;
    await deleteRow("contact_messages", row.id);
    await load();
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">{T("messages")}</h1>
      </header>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="text-sm text-muted-foreground">{T("loading")}</p>
      ) : rows.length === 0 && !error ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {T("noMessages")}
        </p>
      ) : (
        <ul className="space-y-4">
          {rows.map((row) => (
            <li
              key={row.id}
              className={`rounded-2xl border p-5 ${
                row.is_read ? "border-border bg-card" : "border-accent/50 bg-card"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{row.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {row.email && <span className="mr-3">{row.email}</span>}
                    {row.phone && <span>{row.phone}</span>}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{new Date(row.created_at).toLocaleString()}</div>
                  <div className={row.is_read ? "" : "font-semibold text-accent"}>
                    {row.is_read ? T("read") : T("unread")}
                  </div>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">
                {row.message}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => void toggleRead(row)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold"
                >
                  {row.is_read ? T("markUnread") : T("markRead")}
                </button>
                <button
                  onClick={() => void remove(row)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-destructive"
                >
                  {T("delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
