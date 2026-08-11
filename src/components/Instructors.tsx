import { instructors, type Instructor } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Button";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative overflow-hidden">
        <img
          src={instructor.image.src}
          alt={instructor.image.alt}
          width={800}
          height={800}
          loading="lazy"
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
          {instructor.experience}
        </span>
      </div>
      <div className="p-7">
        <h3 className="font-display text-lg font-semibold">{instructor.name}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{instructor.role}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{instructor.bio}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {instructor.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {c} kategória
            </span>
          ))}
        </div>
        {instructor.contact && (
          <ButtonLink href={instructor.contact.href} variant="outline" className="mt-6 w-full">
            {instructor.contact.label}
          </ButtonLink>
        )}
      </div>
    </article>
  );
}

export function Instructors() {
  return (
    <Section id="instructori">
      <SectionHeading
        eyebrow="Oktatók"
        title="Az oktatóink"
        subtitle="Tapasztalt, türelmes szakemberek, akik a te tempódhoz igazodnak."
      />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor, i) => (
          <Reveal as="li" key={instructor.id} delay={(i % 3) * 80} className="h-full">
            <InstructorCard instructor={instructor} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
