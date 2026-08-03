import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-ink-muted">{subtitle}</p>}
    </div>
  );
}
