import { isImage, isLocalized, type Json } from "@/lib/cms/model";
import { useAdminT, useLabel } from "@/lib/admin/i18n";
import { MediaPicker } from "./MediaPicker";

interface Props {
  name: string;
  template: Json;
  value: Json;
  onChange: (v: Json) => void;
  depth?: number;
}

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

export function FieldEditor({ name, template, value, onChange, depth = 0 }: Props) {
  const T = useAdminT();
  const label = useLabel()(name);
  const shape = value ?? template;

  /* ---- bilingual text ---------------------------------------------- */
  if (isLocalized(shape)) {
    const v = (value ?? { hu: "", ro: "" }) as { hu?: string; ro?: string };
    const long = ((v.hu ?? "") + (v.ro ?? "")).length > 90;
    const Field = long ? "textarea" : "input";
    return (
      <div className="space-y-2">
        <p className="text-sm font-semibold">{label}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {(["hu", "ro"] as const).map((lang) => (
            <label key={lang} className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {lang}
              </span>
              <Field
                rows={long ? 4 : undefined}
                value={v[lang] ?? ""}
                onChange={(e: { target: { value: string } }) =>
                  onChange({ ...v, [lang]: e.target.value })
                }
                className={inputClass}
              />
            </label>
          ))}
        </div>
      </div>
    );
  }

  /* ---- image -------------------------------------------------------- */
  if (isImage(shape)) {
    return <MediaPicker label={label} value={value} onChange={onChange} />;
  }

  /* ---- list --------------------------------------------------------- */
  if (Array.isArray(shape)) {
    const items = (Array.isArray(value) ? value : []) as Json[];
    const itemTemplate =
      (Array.isArray(template) && template[0]) || (items.length > 0 ? items[0] : "");
    const isStringList = typeof itemTemplate === "string";

    function emptyItem(): Json {
      if (isStringList) return "";
      if (itemTemplate && typeof itemTemplate === "object") {
        return JSON.parse(
          JSON.stringify(itemTemplate, (_k, v) => (typeof v === "string" ? "" : v)),
        );
      }
      return "";
    }

    function setItem(index: number, next: Json) {
      const copy = [...items];
      copy[index] = next;
      onChange(copy);
    }

    function move(index: number, dir: -1 | 1) {
      const target = index + dir;
      if (target < 0 || target >= items.length) return;
      const copy = [...items];
      const [row] = copy.splice(index, 1);
      copy.splice(target, 0, row);
      onChange(copy);
    }

    return (
      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-semibold">{label}</p>
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border border-border p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-muted-foreground">#{index + 1}</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  className="rounded border border-border px-2 py-1 text-xs"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  className="rounded border border-border px-2 py-1 text-xs"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                  className="rounded border border-border px-2 py-1 text-xs text-destructive"
                >
                  {T("delete")}
                </button>
              </div>
            </div>
            {isStringList ? (
              <input
                value={(item as string) ?? ""}
                onChange={(e) => setItem(index, e.target.value)}
                className={inputClass}
              />
            ) : (
              <FieldEditor
                name=""
                template={itemTemplate}
                value={item}
                onChange={(next) => setItem(index, next)}
                depth={depth + 1}
              />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, emptyItem()])}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold"
        >
          {T("add")}
        </button>
      </div>
    );
  }

  /* ---- object group -------------------------------------------------- */
  if (shape && typeof shape === "object") {
    const tmpl = (template ?? {}) as Record<string, Json>;
    const val = (value ?? {}) as Record<string, Json>;
    const keys = Array.from(new Set([...Object.keys(tmpl), ...Object.keys(val)]));
    return (
      <div className={depth === 0 ? "space-y-5" : "space-y-4 rounded-xl border border-border p-4"}>
        {depth > 0 && name && <p className="text-sm font-semibold">{label}</p>}
        {keys.map((key) => (
          <FieldEditor
            key={key}
            name={key}
            template={tmpl[key]}
            value={val[key]}
            onChange={(next) => onChange({ ...val, [key]: next })}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  }

  /* ---- primitives ---------------------------------------------------- */
  if (typeof shape === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    );
  }

  if (typeof shape === "number") {
    return (
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{label}</span>
        <input
          type="number"
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className={inputClass}
        />
      </label>
    );
  }

  const text = (value as string) ?? "";
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {text.length > 90 ? (
        <textarea
          rows={4}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      ) : (
        <input value={text} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </label>
  );
}
