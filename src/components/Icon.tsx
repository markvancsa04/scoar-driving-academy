import { icons, Circle, type LucideProps } from "lucide-react";

/**
 * Data-driven icon renderer. Content files reference icons by name,
 * so icons can be swapped without touching components.
 */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const aliases: Record<string, string> = {
    SteeringWheel: "LoaderCircle",
    PlusCircle: "CirclePlus",
    UserCheck: "UserRoundCheck",
    BadgeCheck: "BadgeCheck",
  };
  const key = (aliases[name] ?? name) as keyof typeof icons;
  const Cmp = icons[key] ?? Circle;
  return <Cmp {...props} />;
}
