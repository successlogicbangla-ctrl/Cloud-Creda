import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const iconLibrary = Icons as unknown as Record<string, LucideIcon>;

const tileVariants = ["icon-tile-a", "icon-tile-b", "icon-tile-c", "icon-tile-d"] as const;

export function iconTileVariant(index: number) {
  return tileVariants[index % tileVariants.length];
}

export function IconTile({
  name,
  index = 0,
  className,
  iconClassName,
}: {
  name?: string | null;
  index?: number;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = (name && iconLibrary[name]) || Cloud;
  return (
    <span className={cn("icon-tile", iconTileVariant(index), className)}>
      <Icon className={cn("h-5 w-5", iconClassName)} />
    </span>
  );
}
