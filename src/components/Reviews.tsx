import { Star, Quote } from "lucide-react";
import { testimonials, testimonialsContent, type Testimonial } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { SiteImage } from "./SiteImage";


export function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Quote className="h-7 w-7 text-accent/40" aria-hidden="true" />
      <div className="mt-4 flex gap-0.5" aria-label={`${review.rating} / 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < review.rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"
            }
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

export function Reviews() {
  return (
    <Section id="recenzii">
      <SectionHeading
        eyebrow={testimonialsContent.eyebrow}
        title={testimonialsContent.title}
        subtitle={testimonialsContent.subtitle}
        align="center"
      />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((review, i) => (
          <Reveal as="li" key={review.id} delay={(i % 3) * 80} className="h-full">
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
