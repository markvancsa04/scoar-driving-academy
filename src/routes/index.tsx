import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
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
import { CtaBand } from "@/components/CtaBand";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { siteSettings, contactInfo, faqItems } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteSettings.seo.title },
      { name: "description", content: siteSettings.seo.description },
      { property: "og:title", content: siteSettings.seo.ogTitle },
      { property: "og:description", content: siteSettings.seo.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "hu_RO" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DrivingSchool",
          name: siteSettings.name,
          description: siteSettings.seo.description,
          telephone: contactInfo.phone.display,
          email: contactInfo.email.display,
          address: {
            "@type": "PostalAddress",
            streetAddress: contactInfo.address.street,
            addressLocality: "Târgu Secuiesc",
            postalCode: contactInfo.address.postalCode,
            addressCountry: "RO",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "17:00",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Instructors />
        <Vehicles />
        <WhyUs />
        <Process />
        <Gallery />
        <Reviews />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
