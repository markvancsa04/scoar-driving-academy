import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { InstructorGrid } from "@/components/Instructors";
import { Section, SectionHeading } from "@/components/Section";
import { useSiteContent } from "@/data/content";

export const Route = createFileRoute("/oktatoink")({
  head: () => ({
    meta: [
      { title: "Oktatóink — AUTOSISKOLA SCOBAR Kézdivásárhely" },
      {
        name: "description",
        content:
          "Ismerd meg az AUTOSISKOLA SCOBAR teljes oktatói csapatát Kézdivásárhelyen: tapasztalt, türelmes B kategóriás oktatók.",
      },
      { property: "og:title", content: "Oktatóink — AUTOSISKOLA SCOBAR" },
      {
        property: "og:description",
        content:
          "Az AUTOSISKOLA SCOBAR oktatói: tapasztalt szakemberek, akik a te tempódhoz igazodnak.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/oktatoink" }],
  }),
  component: InstructorsPage,
});

function InstructorsPage() {
  const { instructors, instructorsContent } = useSiteContent();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Section>
          <SectionHeading
            eyebrow={instructorsContent.eyebrow}
            title={instructorsContent.pageTitle}
            subtitle={instructorsContent.pageSubtitle}
          />
          <div className="mt-14">
            <InstructorGrid instructors={instructors} />
          </div>
          <div className="mt-12">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-card transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              {instructorsContent.backCta.label}
            </Link>
          </div>
        </Section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
