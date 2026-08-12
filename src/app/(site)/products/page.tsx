import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductFilters } from "@/components/site/ProductFilters";
import { getCategories } from "@/lib/data/categories";
import { getProviders } from "@/lib/data/providers";
import { getProducts, type ProductFilters as ProductFiltersType } from "@/lib/data/products";
import { DELISTED_PROVIDER_SLUGS } from "@/lib/delisted-providers";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse cloud accounts, credits, and digital services across every major provider.",
  alternates: { canonical: "/products" },
};

interface PageProps {
  searchParams: Promise<{ category?: string; provider?: string; sort?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters: ProductFiltersType = {
    categorySlug: params.category,
    providerSlug: params.provider,
    search: params.q,
    sort: (params.sort as ProductFiltersType["sort"]) ?? "featured",
  };

  const [products, categories, allProviders] = await Promise.all([
    getProducts(filters),
    getCategories(),
    getProviders(),
  ]);
  const providers = allProviders.filter((p) => !DELISTED_PROVIDER_SLUGS.has(p.slug));

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Products" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink">All Products</h1>
        <p className="mt-2 text-ink-muted">{products.length} products available across every provider.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="card-surface h-fit p-5 lg:sticky lg:top-24">
          <ProductFilters categories={categories} providers={providers} />
        </aside>

        <div>
          {products.length === 0 ? (
            <EmptyState
              title="No products match these filters"
              description="Try a different category, provider, or search term."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
