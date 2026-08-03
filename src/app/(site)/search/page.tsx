import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/site/ProductCard";
import { SearchBox } from "@/components/layout/SearchBox";
import { getProducts } from "@/lib/data/products";
import { getArticles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;

  const [products, articles] = q
    ? await Promise.all([getProducts({ search: q }), getArticles()])
    : [[], []];

  const matchingArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q.toLowerCase()) ||
          a.excerpt?.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Search</h1>
      <SearchBox defaultValue={q} className="mt-5 max-w-lg" />

      {!q ? (
        <p className="mt-8 text-ink-muted">Enter a search term above to find products and guides.</p>
      ) : (
        <div className="mt-8 space-y-12">
          <section>
            <h2 className="text-lg font-semibold text-ink">Products ({products.length})</h2>
            {products.length === 0 ? (
              <EmptyState title={`No products match "${q}"`} className="mt-4" />
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </section>

          {matchingArticles.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-ink">Guides ({matchingArticles.length})</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {matchingArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`} className="card-surface card-surface-hover p-5">
                    <h3 className="font-semibold text-ink">{article.title}</h3>
                    {article.excerpt && <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{article.excerpt}</p>}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
