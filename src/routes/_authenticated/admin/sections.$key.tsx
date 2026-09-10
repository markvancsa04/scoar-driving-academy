import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FieldEditor } from "@/components/admin/FieldEditor";
import { db } from "@/lib/cms/db";
import { type Json } from "@/lib/cms/model";
import { useAdminT, useLabel } from "@/lib/admin/i18n";
import { rawContent } from "@/data/content";

export const Route = createFileRoute("/_authenticated/admin/sections/$key")({
  component: SectionEditor,
});

function SectionEditor() {
  const { key } = Route.useParams();
  const T = useAdminT();
  const label = useLabel();
  const template = (rawContent as Record<string, Json>)[key];

  const [value, setValue] = useState<Json>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setMessage(null);
    void db
      .from("cms_sections")
      .select("data")
      .eq("key", key)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setMessage(error.message);
        setValue(data?.data ?? template ?? {});
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [key, template]);

  async function save() {
    setSaving(true);
    setMessage(null);
    const { error } = await db
      .from("cms_sections")
      .upsert({ key, data: value }, { onConflict: "key" });
    setSaving(false);
    setMessage(error ? error.message : T("saved"));
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">{label(key)}</h1>
          <p className="text-sm text-muted-foreground">{T("bothLanguages")}</p>
        </div>
        <button
          onClick={() => void save()}
          disabled={saving || loading}
          className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {saving ? T("saving") : T("save")}
        </button>
      </header>

      {message && <p className="text-sm text-accent">{message}</p>}

      {loading ? (
        <p className="text-sm text-muted-foreground">{T("loading")}</p>
      ) : (
        <FieldEditor name={key} template={template} value={value} onChange={setValue} />
      )}
    </div>
  );
}
