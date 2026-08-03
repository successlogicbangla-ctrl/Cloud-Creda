import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-card py-16 text-center",
        className
      )}
    >
      <SearchX className="h-8 w-8 text-ink-muted" />
      <h3 className="mt-4 font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-muted">{description}</p>}
    </div>
  );
}
