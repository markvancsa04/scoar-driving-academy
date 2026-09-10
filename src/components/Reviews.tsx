import { useEffect, useState, type FormEvent } from "react";
import { Star, Quote } from "lucide-react";
import { useSiteContent, type Testimonial } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { SiteImage } from "./SiteImage";
import { Button } from "./Button";
import { useLanguage, useUi } from "@/lib/i18n";
import { listApprovedReviews, submitReview } from "@/lib/submissions";

export function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Quote className="h-7 w-7 text-accent/40" aria-hidden="true" />
      <div className="mt-4 flex gap-0.5" aria-label={`${review.rating} / 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < review.rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">“{review.text}”</p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {review.image ? (
          <SiteImage
            image={review.image}
            ratioClassName="h-10 w-10 shrink-0 rounded-full"
            className="object-cover"
          />
        ) : (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
            {review.name.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{review.name}</div>
          {review.location && (
            <div className="truncate text-xs text-muted-foreground">{review.location}</div>
          )}
        </div>
      </div>
    </article>
  );
}

/** Visitor review form — stored in Supabase, published only after approval. */
function ReviewForm() {
  const ui = useUi();
  const { language } = useLanguage();
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fieldClass =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const values = new FormData(formEl);
    setError(null);
    setSending(true);
    try {
      await submitReview({
        name: String(values.get("review-name") ?? ""),
        location: String(values.get("review-location") ?? ""),
        text: String(values.get("review-text") ?? ""),
        rating,
        language,
      });
      setSent(true);
      formEl.reset();
      setRating(5);
    } catch {
      setError(ui("sendFailed"));
    } finally {
      setSending(false);
    }
  }

  return (
    <Reveal className="mx-auto mt-12 max-w-2xl">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="rounded-3xl border border-border bg-surface p-7 shadow-card"
      >
        <h3 className="font-display text-lg font-semibold">{ui("reviewFormTitle")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{ui("reviewFormIntro")}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input
            name="review-name"
            required
            aria-label={ui("reviewName")}
            placeholder={ui("reviewName")}
            className={fieldClass}
          />
          <input
            name="review-location"
            aria-label={ui("reviewLocation")}
            placeholder={ui("reviewLocation")}
            className={fieldClass}
          />
          <textarea
            name="review-text"
            required
            rows={4}
            aria-label={ui("reviewText")}
            placeholder={ui("reviewText")}
            className={`${fieldClass} resize-none sm:col-span-2`}
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-sm font-medium">{ui("reviewRating")}</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                aria-label={`${i + 1} / 5`}
                aria-pressed={rating === i + 1}
              >
                <Star
                  className={
                    i < rating ? "h-5 w-5 fill-accent text-accent" : "h-5 w-5 text-border"
                  }
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" variant="accent" size="lg" className="mt-6 w-full" disabled={sending}>
          {sending ? ui("sending") : ui("reviewSubmit")}
        </Button>

        {sent && (
          <p
            role="status"
            className="mt-4 rounded-xl bg-accent/15 px-4 py-3 text-sm font-medium text-foreground"
          >
            {ui("reviewThanks")}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          >
            {error}
          </p>
        )}
      </form>
    </Reveal>
  );
}

export function Reviews() {
  const { testimonials, testimonialsContent } = useSiteContent();
  const [published, setPublished] = useState<Testimonial[]>([]);

  // Approved visitor reviews from Supabase (RLS only exposes approved rows).
  useEffect(() => {
    let cancelled = false;
    void listApprovedReviews().then((rows) => {
      if (cancelled) return;
      setPublished(
        rows.map((row) => ({
          id: row.id,
          name: row.name,
          text: row.text,
          rating: row.rating,
          ...(row.location ? { location: row.location } : {}),
        })),
      );
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const all = [...testimonials, ...published];

  return (
    <Section id="recenzii">
      <SectionHeading
        eyebrow={testimonialsContent.eyebrow}
        title={testimonialsContent.title}
        subtitle={testimonialsContent.subtitle}
        align="center"
      />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((review, i) => (
          <Reveal as="li" key={review.id} delay={(i % 3) * 80} className="h-full">
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </ul>
      <ReviewForm />
    </Section>
  );
}
