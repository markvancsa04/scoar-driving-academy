import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { COLLECTION_KEYS, SECTION_KEYS } from "@/lib/cms/model";
import { importStaticContent } from "@/lib/cms/seed";
import { useAdminT, useLabel } from "@/lib/admin/i18n";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const T = useAdminT();
  const label = useLabel();
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runImport() {
    setBusy(true);
    setError(null);
    setLog([]);
    try {
      await importStaticContent((msg) => setLog((l) => [...l, msg]));
      setLog((l) => [...l, T("done")]);
    } catch (e) {
      setError(e instanceof Error ? e.message : T("error"));
    } finally {
      setBusy(false);
    }
  }

  const cardClass =
    "rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-accent";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold">{T("dashboard")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{T("dashboardIntro")}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/admin/visual" className={cardClass}>
          {T("visualEditor")}
        </Link>
        <Link to="/admin/messages" className={cardClass}>
          {T("messages")}
        </Link>
        <Link to="/admin/applications" className={cardClass}>
          {T("applications")}
        </Link>
        <Link to="/admin/reviews" className={cardClass}>
          {T("reviewsAdmin")}
        </Link>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold">{T("firstStep")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{T("firstStepText")}</p>
        <button
          onClick={() => void runImport()}
          disabled={busy}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy ? T("importing") : T("importNow")}
        </button>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        {log.length > 0 && (
          <ul className="mt-3 max-h-40 overflow-y-auto text-xs text-muted-foreground">
            {log.map((line, i) => (
              <li key={i}>✓ {line}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {T("sections")}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTION_KEYS.map((key) => (
            <Link key={key} to="/admin/sections/$key" params={{ key }} className={cardClass}>
              {label(key)}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {T("lists")}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTION_KEYS.map((key) => (
            <Link key={key} to="/admin/collections/$key" params={{ key }} className={cardClass}>
              {label(key)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
