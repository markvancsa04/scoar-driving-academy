import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { db, isCurrentUserAdmin } from "@/lib/cms/db";
import { COLLECTION_KEYS, SECTION_KEYS } from "@/lib/cms/model";
import { useAdminT, useLabel } from "@/lib/admin/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const T = useAdminT();
  const label = useLabel();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    void isCurrentUserAdmin().then((ok) => setStatus(ok ? "ok" : "denied"));
  }, []);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await db.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  if (status === "checking") {
    return <div className="p-10 text-sm text-muted-foreground">{T("checkingAccess")}</div>;
  }

  if (status === "denied") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-xl font-semibold">{T("accessDenied")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {T("accessDeniedText")}
            <code className="mt-2 block rounded bg-surface p-2 text-xs">
              select public.grant_admin_by_email(&apos;email@example.com&apos;);
            </code>
          </p>
          <button
            onClick={() => void signOut()}
            className="mt-5 rounded-md border border-border px-4 py-2 text-sm font-semibold"
          >
            {T("signOut")}
          </button>
        </div>
      </div>
    );
  }

  const linkClass =
    "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface [&.active]:bg-surface [&.active]:font-semibold";

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="border-b border-border bg-card lg:min-h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-2 p-5">
          <div>
            <p className="font-display text-base font-semibold">{T("adminTitle")}</p>
            <p className="text-xs text-muted-foreground">SCOBAR</p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-border px-3 py-1.5 text-xs lg:hidden"
            >
              {T("menu")}
            </button>
          </div>
        </div>

        <nav className={`${open ? "block" : "hidden"} px-3 pb-6 lg:block`}>
          <Link to="/admin" activeOptions={{ exact: true }} className={linkClass}>
            {T("dashboard")}
          </Link>
          <Link to="/admin/visual" className={linkClass}>
            {T("visualEditor")}
          </Link>
          <Link to="/admin/media" className={linkClass}>
            {T("mediaLibrary")}
          </Link>
          <Link to="/admin/messages" className={linkClass}>
            {T("messages")}
          </Link>
          <Link to="/admin/applications" className={linkClass}>
            {T("applications")}
          </Link>
          <Link to="/admin/reviews" className={linkClass}>
            {T("reviewsAdmin")}
          </Link>

          <p className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {T("sections")}
          </p>
          {SECTION_KEYS.map((key) => (
            <Link key={key} to="/admin/sections/$key" params={{ key }} className={linkClass}>
              {label(key)}
            </Link>
          ))}

          <p className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {T("lists")}
          </p>
          {COLLECTION_KEYS.map((key) => (
            <Link key={key} to="/admin/collections/$key" params={{ key }} className={linkClass}>
              {label(key)}
            </Link>
          ))}

          <div className="mt-6 space-y-2 px-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="block text-xs font-semibold text-accent"
            >
              {T("viewSite")}
            </a>
            <button
              onClick={() => void signOut()}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold"
            >
              {T("signOut")}
            </button>
          </div>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-5 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
