import Link from "next/link";
import * as Icons from "lucide-react";
import { Check, Clock, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { iconTileVariant } from "@/components/ui/DynamicIcon";

const iconLibrary = Icons as unknown as Record<string, LucideIcon>;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const categoryIcon = product.category?.icon;
  const Icon = (categoryIcon && iconLibrary[categoryIcon]) || Cloud;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card-surface card-surface-hover group flex flex-col overflow-hidden"
    >
      <div className={`icon-tile ${iconTileVariant(index)} relative flex h-28 w-full items-center justify-center rounded-none`}>
        <div className="bg-grid-pattern absolute inset-0 opacity-40" />
        <Icon className="relative h-9 w-9 text-white/90 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute right-3 top-3">
          <ProductBadge badge={product.badge} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {product.provider?.name ?? "CloudCreda"}
        </span>

        <h3 className="mt-1.5 text-lg font-semibold text-ink transition-colors group-hover:text-accent-blue">
          {product.title}
        </h3>

        {product.short_description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{product.short_description}</p>
        )}

        {product.features && product.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-accent" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-ink">{formatPrice(product.price, product.currency)}</span>
              {product.compare_at_price && (
                <span className="text-sm text-ink-muted line-through">
                  {formatPrice(product.compare_at_price, product.currency)}
                </span>
              )}
            </div>
            {product.delivery_time_text && (
              <span className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
                <Clock className="h-3 w-3" />
                {product.delivery_time_text}
              </span>
            )}
          </div>
          <span className="btn-secondary !px-4 !py-2 text-xs">View Details</span>
        </div>
      </div>
    </Link>
  );
}
