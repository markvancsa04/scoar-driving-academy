import type { ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { resolveMediaUrl } from "@/lib/media";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  image?: ImageAsset | null;
  className?: string;
  /** Wrapper class used both for the image and for the empty state. */
  ratioClassName?: string;
  fallbackLabel?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;

/**
 * The only component allowed to render a content image.
 * Handles URL resolution (local asset today, Supabase Storage later)
 * and renders a clean placeholder when the client has not uploaded
 * an image yet.
 */
export function SiteImage({
  image,
  className,
  ratioClassName,
  fallbackLabel,
  loading = "lazy",
  ...props
}: SiteImageProps) {
  const url = resolveMediaUrl(image);

  if (!url) {
    return (
      <div
        role="img"
        aria-label={fallbackLabel ?? image?.alt ?? "Kép hamarosan"}
        className={cn(
          "grid place-items-center bg-surface text-muted-foreground",
          ratioClassName,
          className,
        )}
      >
        <span className="flex flex-col items-center gap-2 p-6 text-center">
          <ImageOff className="h-6 w-6 opacity-50" aria-hidden="true" />
          <span className="text-xs">{fallbackLabel ?? "Kép hamarosan"}</span>
        </span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={image?.alt ?? ""}
      width={image?.width}
      height={image?.height}
      loading={loading}
      className={cn(ratioClassName, className)}
      {...props}
    />
  );
}
