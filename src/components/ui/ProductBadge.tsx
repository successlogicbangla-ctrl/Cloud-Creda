import { cn } from "@/lib/utils";
import type { ProductBadge as ProductBadgeType } from "@/lib/types";

const badgeConfig: Record<Exclude<ProductBadgeType, "none">, { label: string; className: string }> = {
  popular: { label: "Popular", className: "bg-accent-blue/15 text-sky-300 ring-1 ring-accent-blue/25" },
  hot: { label: "Hot", className: "bg-orange-400/15 text-orange-300 ring-1 ring-orange-400/20" },
  best_value: { label: "Best Value", className: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20" },
  new: { label: "New", className: "bg-sky-accent/15 text-cyan-300 ring-1 ring-sky-accent/25" },
};

export function ProductBadge({ badge }: { badge: ProductBadgeType }) {
  if (badge === "none") return null;
  const config = badgeConfig[badge];
  return <span className={cn("badge backdrop-blur-sm", config.className)}>{config.label}</span>;
}

const availabilityConfig = {
  in_stock: { label: "In Stock", className: "badge-success" },
  limited: { label: "Limited Availability", className: "badge-warning" },
  out_of_stock: { label: "Out of Stock", className: "badge-danger" },
  preorder: { label: "Pre-order", className: "badge-info" },
} as const;

export function AvailabilityBadge({ status }: { status: keyof typeof availabilityConfig }) {
  const config = availabilityConfig[status];
  return <span className={config.className}>{config.label}</span>;
}
