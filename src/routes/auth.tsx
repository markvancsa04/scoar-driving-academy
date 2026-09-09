import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { db } from "@/lib/cms/db";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Autentificare administrator — SCOBAR" },
      { name: "description", content: "Acces administrator pentru administrarea site-ului SCOBAR." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Autentificare administrator — SCOBAR" },
      { property: "og:description", content: "Acces administrator pentru site-ul SCOBAR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: signInError } = await db.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError("Autentificare eșuată. Verifică adresa de e-mail și parola.");
      return;
    }
    void navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-card"
      >
        <h1 className="font-display text-xl font-semibold">Administrare site</h1>
        <p className="mt-1 text-sm text-muted-foreground">Autentifică-te pentru a edita conținutul.</p>

        <label className="mt-6 block text-sm font-semibold">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold">
          Parolă
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </label>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Se conectează…" : "Autentificare"}
        </button>
      </form>
    </div>
  );
}
