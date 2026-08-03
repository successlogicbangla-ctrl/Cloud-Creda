import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { IconTile } from "@/components/ui/DynamicIcon";

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="card-surface card-surface-hover group relative flex flex-col gap-4 overflow-hidden p-6"
    >
      <div className="flex items-start justify-between">
        <IconTile name={category.icon} index={index} className="group-hover:scale-110" />
        <ArrowUpRight className="h-4 w-4 text-ink-muted/0 transition-all duration-300 group-hover:text-accent-blue group-hover:opacity-100 opacity-0" />
      </div>
      <div>
        <h3 className="font-semibold text-ink transition-colors group-hover:text-accent-blue">{category.name}</h3>
        {category.description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
