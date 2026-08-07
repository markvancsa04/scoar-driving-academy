import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-card hover:bg-secondary hover:shadow-lift hover:-translate-y-0.5",
  accent:
    "bg-accent text-accent-foreground shadow-card hover:shadow-accent hover:-translate-y-0.5",
  outline:
    "border border-border bg-card text-foreground hover:border-accent hover:text-accent",
  ghost: "text-foreground hover:bg-muted",
  onDark:
    "border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: { variant?: Variant; size?: Size } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: { variant?: Variant; size?: Size } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
