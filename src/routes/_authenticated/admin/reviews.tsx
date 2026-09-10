import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useAdminT } from "@/lib/admin/i18n";
import {
  deleteRow,
  isMissingTable,
  listAllReviews,
  setRowFlag,
  type ReviewRow,
} from "@/lib/submissions";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: ReviewsPage,
});

function ReviewsPage() {
  const T = useAdminT();
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await listAllReviews());
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

  async function remove(row: ReviewRow) {
    if (!window.confirm(T("confirmDelete"))) return;
    await deleteRow("reviews", row.id);
    await load();
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">{T("reviewsAdmin")}</h1>
      </header>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="text-sm text-muted-foreground">{T("loading")}</p>
      ) : rows.length === 0 && !error ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {T("noReviews")}
        </p>
      ) : (
        <ul className="space-y-4">
          {rows.map((row) => (
            <li key={row.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{row.name}</p>
                  {row.location && <p className="text-xs text-muted-foreground">{row.location}</p>}
                  <div className="mt-1 flex gap-0.5" aria-label={`${row.rating} / 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < row.rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"
                        }
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{new Date(row.created_at).toLocaleString()}</div>
                  <div className={row.is_approved ? "font-semibold text-accent" : ""}>
                    {row.is_approved ? T("approved") : T("pending")}
                  </div>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">{row.text}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    void setRowFlag("reviews", row.id, { is_approved: !row.is_approved }).then(load)
                  }
                  className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  {row.is_approved ? T("unpublish") : T("approve")}
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
