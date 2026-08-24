import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/site/ProductCard";
import { getArticleBySlug, getArticles } from "@/lib/data/articles";
import { getProducts } from "@/lib/data/products";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.seo_title ?? article.title,
    description: article.seo_description ?? article.excerpt ?? undefined,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => article.related_product_ids.includes(p.id));

  // Production domain — never localhost, even if NEXT_PUBLIC_SITE_URL isn't
  // set in the deploy environment. Matches the fallback used in
  // src/app/layout.tsx, sitemap.ts, and robots.ts.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcreda.com";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: article.author_name ? { "@type": "Person", name: article.author_name } : undefined,
    datePublished: article.published_at,
    url: `${siteUrl}/articles/${article.slug}`,
  };

  return (
    <div className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles", href: "/articles" }, { label: article.title }]} />

      <article className="mx-auto mt-6 max-w-3xl">
        {article.category && <span className="section-eyebrow">{article.category}</span>}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{article.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          {article.author_name && <span>By {article.author_name}</span>}
          {article.published_at && <span>· {formatDate(article.published_at)}</span>}
        </div>

        <div className="prose prose-invert mt-8 max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-ink-muted prose-a:text-accent-blue prose-strong:text-ink prose-li:text-ink-muted">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="badge-neutral">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relatedProducts.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-xl font-bold text-ink">Related Products</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
