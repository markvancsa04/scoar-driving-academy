import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./Button";

/**
 * ActionLink — the single link primitive of the site.
 *
 * It guarantees that every clickable element actually goes somewhere:
 *  - "#section"        → router link to the homepage anchor (works from any page)
 *  - "/route"          → internal router link
 *  - "tel:" / "mailto:"→ native anchor (opens phone / mail app)
 *  - "http(s)://"      → external anchor in a new tab
 *  - empty / "#"       → nothing is rendered (never a dead link)
 */
export type ActionLinkProps = {
  href?: string | null;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function isDeadHref(href?: string | null): boolean {
  if (!href) return true;
  const value = href.trim();
  return value === "" || value === "#" || value.startsWith("javascript:");
}

export function ActionLink({ href, children, ...props }: ActionLinkProps) {
  if (isDeadHref(href)) return null;
  const value = href!.trim();

  if (value.startsWith("#")) {
    return (
      <Link to="/" hash={value.slice(1)} {...(props as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }

  if (value.startsWith("/")) {
    return (
      <Link to={value} {...(props as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }

  const external = /^https?:\/\//i.test(value);

  return (
    <a
      href={value}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

export function ActionButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: { variant?: ButtonVariant; size?: ButtonSize } & ActionLinkProps) {
  return <ActionLink className={buttonClass(variant, size, className)} {...props} />;
}
