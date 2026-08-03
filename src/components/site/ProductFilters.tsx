"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category, Provider } from "@/lib/types";

interface ProductFiltersProps {
  categories: Category[];
  providers: Provider[];
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export function ProductFilters({ categories, providers }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeProvider = searchParams.get("provider") ?? "";
  const activeSort = searchParams.get("sort") ?? "featured";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-ink">Sort by</h3>
        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="mt-2 w-full rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink focus:border-accent-blue focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink">Category</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => updateParam("category", "")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              !activeCategory ? "border-accent-blue/60 bg-accent-blue/15 text-sky-300" : "border-line text-ink-muted hover:border-accent-blue"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam("category", cat.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat.slug
                  ? "border-accent-blue/60 bg-accent-blue/15 text-sky-300"
                  : "border-line text-ink-muted hover:border-accent-blue"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink">Provider</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => updateParam("provider", "")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              !activeProvider ? "border-accent-blue/60 bg-accent-blue/15 text-sky-300" : "border-line text-ink-muted hover:border-accent-blue"
            )}
          >
            All
          </button>
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => updateParam("provider", provider.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeProvider === provider.slug
                  ? "border-accent-blue/60 bg-accent-blue/15 text-sky-300"
                  : "border-line text-ink-muted hover:border-accent-blue"
              )}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
