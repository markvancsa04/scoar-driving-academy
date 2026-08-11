import { Fuel, Cog } from "lucide-react";
import { vehicles, type Vehicle } from "@/data/content";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { SiteImage } from "./SiteImage";


export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-primary-foreground/10 bg-primary-foreground/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="overflow-hidden">
        <SiteImage
          image={vehicle.image}
          ratioClassName="aspect-[3/2] w-full"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

      </div>
      <div className="p-7">
        <h3 className="font-display text-lg font-semibold text-primary-foreground">
          {vehicle.name}
        </h3>
        <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-primary-foreground/70">
          <span className="inline-flex items-center gap-1.5">
            <Cog className="h-4 w-4 text-accent" aria-hidden="true" />
            {vehicle.transmission}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-accent" aria-hidden="true" />
            {vehicle.fuel}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
          {vehicle.description}
        </p>
        {vehicle.specs.length > 0 && (
          <dl className="mt-6 space-y-2 border-t border-primary-foreground/10 pt-5">
            {vehicle.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4 text-xs">
                <dt className="text-primary-foreground/55">{spec.label}</dt>
                <dd className="text-right font-medium text-primary-foreground/90">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export function Vehicles() {
  return (
    <Section id="autovehicule" tone="dark">
      <SectionHeading
        eyebrow="Gépkocsik"
        title="Oktatóautóink"
        subtitle="Karbantartott, biztonságos gépkocsik, amelyekkel könnyű megtanulni vezetni."
        invert
      />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle, i) => (
          <Reveal as="li" key={vehicle.id} delay={(i % 3) * 80} className="h-full">
            <VehicleCard vehicle={vehicle} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
