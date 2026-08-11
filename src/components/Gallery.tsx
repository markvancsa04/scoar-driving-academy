import { useSiteContent } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { SiteImage } from "./SiteImage";

export function Gallery() {
  const { galleryContent, galleryImages } = useSiteContent();

  return (
    <Section id="galerie" tone="surface">
      <SectionHeading
        eyebrow={galleryContent.eyebrow}
        title={galleryContent.title}
        subtitle={galleryContent.subtitle}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, i) => (
          <Reveal key={image.src ?? image.alt} delay={(i % 3) * 70}>
            <figure className="group h-full overflow-hidden rounded-2xl bg-card shadow-card">
              <SiteImage
                image={image}
                ratioClassName="aspect-[5/4] w-full"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
