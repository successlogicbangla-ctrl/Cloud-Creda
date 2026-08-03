import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { getArticles } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Articles",
  description: "Practical, vendor-neutral guides for choosing and using cloud accounts, credits, and services.",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Articles</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">
        Practical, vendor-neutral advice for choosing and getting the most out of cloud accounts, credits, and
        digital services.
      </p>

      <div className="mt-8">
        {articles.length === 0 ? (
          <EmptyState title="No articles published yet" description="Check back soon." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="card-surface card-surface-hover flex flex-col p-5">
                {article.category && <span className="section-eyebrow">{article.category}</span>}
                <h2 className="mt-2 font-semibold text-ink">{article.title}</h2>
                {article.excerpt && <p className="mt-1.5 line-clamp-3 text-sm text-ink-muted">{article.excerpt}</p>}
                {article.published_at && (
                  <p className="mt-4 text-xs text-ink-muted">{formatDate(article.published_at)}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
