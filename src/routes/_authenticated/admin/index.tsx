import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { COLLECTION_KEYS, SECTION_KEYS, labelFor } from "@/lib/cms/model";
import { importStaticContent } from "@/lib/cms/seed";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runImport() {
    setBusy(true);
    setError(null);
    setLog([]);
    try {
      await importStaticContent((msg) => setLog((l) => [...l, msg]));
      setLog((l) => [...l, "Gata."]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Eroare");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold">Panou general</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Editează tot conținutul site-ului, în maghiară și română.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold">Primul pas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Copiază conținutul actual al site-ului în baza de date, ca să îl poți edita de aici.
          Listele deja existente nu sunt suprascrise.
        </p>
        <button
          onClick={() => void runImport()}
          disabled={busy}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Se importă…" : "Importă conținutul actual"}
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
          Secțiuni
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTION_KEYS.map((key) => (
            <Link
              key={key}
              to="/admin/sections/$key"
              params={{ key }}
              className="rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-accent"
            >
              {labelFor(key)}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Liste
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTION_KEYS.map((key) => (
            <Link
              key={key}
              to="/admin/collections/$key"
              params={{ key }}
              className="rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-accent"
            >
              {labelFor(key)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
