import Link from "next/link";
import { ArrowRight, Cloud } from "lucide-react";
import type { Provider } from "@/lib/types";
import { getProviderHref } from "@/lib/utils";
import { iconTileVariant } from "@/components/ui/DynamicIcon";

export function ProviderCard({
  provider,
  productCount,
  index = 0,
}: {
  provider: Provider;
  productCount?: number;
  index?: number;
}) {
  const title = provider.display_title ?? provider.name;

  return (
    <Link
      href={getProviderHref(provider)}
      className="card-surface card-surface-hover group flex flex-col items-start gap-4 p-6"
    >
      {provider.logo_url ? (
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2.5 shadow-[0_8px_20px_-6px_rgb(0_0_0_/_0.4)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted brand SVGs, not user-supplied remote images */}
          <img src={provider.logo_url} alt={`${provider.name} logo`} className="h-full w-full object-contain" loading="lazy" />
        </span>
      ) : (
        <span className={`icon-tile ${iconTileVariant(index)} group-hover:scale-110`}>
          <Cloud className="h-5 w-5" />
        </span>
      )}

      <div className="flex-1">
        <h3 className="font-semibold text-ink transition-colors group-hover:text-accent-blue">{title}</h3>
        {provider.tagline && <p className="mt-1 line-clamp-1 text-sm text-ink-muted">{provider.tagline}</p>}
        {typeof productCount === "number" && (
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
            {productCount} Account Type{productCount === 1 ? "" : "s"}
          </p>
        )}
      </div>

      <span className="btn-secondary w-full !py-2 text-xs">
        View Products <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
