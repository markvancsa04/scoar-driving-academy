import { createFileRoute, Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { Pencil, List } from "lucide-react";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Instructors } from "@/components/Instructors";
import { Vehicles } from "@/components/Vehicles";
import { WhyUs } from "@/components/WhyUs";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { News } from "@/components/News";
import { CtaBand } from "@/components/CtaBand";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

import { useAdminT, useLabel } from "@/lib/admin/i18n";
import type { CollectionKey } from "@/lib/cms/model";

export const Route = createFileRoute("/_authenticated/admin/visual")({
  component: VisualEditor,
});

interface Block {
  component: ComponentType;
  /** Singleton section holding this block's headings and texts. */
  section?: string;
  /** Repeatable list rendered inside this block. */
  collection?: CollectionKey;
}

/** The real homepage, block by block, in the order the website renders it. */
const BLOCKS: Block[] = [
  { component: Hero, section: "heroContent", collection: "heroHighlights" },
  { component: About, section: "aboutContent" },
  { component: Services, section: "servicesContent", collection: "services" },
  { component: Instructors, section: "instructorsContent", collection: "instructors" },
  { component: Vehicles, section: "vehiclesContent", collection: "vehicles" },
  { component: WhyUs, section: "advantagesContent", collection: "advantages" },
  { component: Process, section: "processContent", collection: "processSteps" },
  { component: Gallery, section: "galleryContent", collection: "galleryImages" },
  { component: Reviews, section: "testimonialsContent", collection: "testimonials" },
  { component: News, section: "newsContent", collection: "newsItems" },
  { component: Faq, section: "faqContent", collection: "faqItems" },
  { component: CtaBand, section: "ctaContent" },
  { component: Contact, section: "contactInfo" },
  { component: Footer, section: "footerContent", collection: "socialLinks" },
];

function VisualEditor() {
  const T = useAdminT();
  const label = useLabel();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">{T("visualEditor")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{T("visualIntro")}</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border">
        {BLOCKS.map((block, index) => {
          const Block = block.component;
          const title = label(block.section ?? block.collection ?? "");
          return (
            <section key={index} className="border-b border-border last:border-b-0">
              <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-card/95 px-4 py-2 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {title}
                </span>
                <div className="flex flex-wrap gap-2">
                  {block.section && (
                    <Link
                      to="/admin/sections/$key"
                      params={{ key: block.section }}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      {T("editTexts")}
                    </Link>
                  )}
                  {block.collection && (
                    <Link
                      to="/admin/collections/$key"
                      params={{ key: block.collection }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold"
                    >
                      <List className="h-3.5 w-3.5" aria-hidden="true" />
                      {T("editItems")}
                    </Link>
                  )}
                </div>
              </div>

              {/* The real website block, with the real content and images. */}
              <div className="pointer-events-none select-none bg-background">
                <Block />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
