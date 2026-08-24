import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Clock, PackageCheck, ShieldQuestion, Cloud } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductBadge, AvailabilityBadge } from "@/components/ui/ProductBadge";
import { ProductCard } from "@/components/site/ProductCard";
import { BuyNowButton } from "@/components/site/BuyNowButton";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data/products";
import { getFaqs } from "@/lib/data/faqs";
import { getArticles } from "@/lib/data/articles";
import { formatPrice, getProviderHref } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seo_title ?? product.title,
    description: product.seo_description ?? product.short_description ?? undefined,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: product.og_image_url ? { images: [product.og_image_url] } : undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [faqs, related, articles] = await Promise.all([
    getFaqs({ productId: product.id }),
    getRelatedProducts(product),
    getArticles(),
  ]);

  const relatedArticles = articles.filter((a) => a.related_product_ids.includes(product.id));

  // Production domain — never localhost, even if NEXT_PUBLIC_SITE_URL isn't
  // set in the deploy environment. Matches the fallback used in
  // src/app/layout.tsx, sitemap.ts, and robots.ts.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcreda.com";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.short_description ?? product.description,
    url: `${siteUrl}/products/${product.slug}`,
    brand: product.provider ? { "@type": "Brand", name: product.provider.name } : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.availability_status === "in_stock"
          ? "https://schema.org/InStock"
          : product.availability_status === "out_of_stock"
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/LimitedAvailability",
      url: `${siteUrl}/products/${product.slug}`,
    },
  };

  return (
    <div className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "All Products", href: "/products" },
          ...(product.category ? [{ label: product.category.name, href: `/categories/${product.category.slug}` }] : []),
          { label: product.title },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.provider && (
              <Link
                href={getProviderHref(product.provider)}
                className="flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-accent-blue"
              >
                <Cloud className="h-3.5 w-3.5" /> {product.provider.name}
              </Link>
            )}
            <ProductBadge badge={product.badge} />
            <AvailabilityBadge status={product.availability_status} />
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{product.title}</h1>
          {product.short_description && <p className="mt-3 text-lg text-ink-muted">{product.short_description}</p>}

          {product.description && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ink">Description</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-muted">{product.description}</p>
            </div>
          )}

          {product.features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ink">Features</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-accent" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.whats_included.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ink">What&apos;s Included</h2>
              <ul className="mt-3 space-y-2">
                {product.whats_included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                    <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.requirements && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ink">Requirements</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-ink-muted">
                <ShieldQuestion className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" /> {product.requirements}
              </p>
            </div>
          )}

          {faqs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">Product FAQs</h2>
              <div className="mt-3">
                <FaqAccordion faqs={faqs} />
              </div>
            </div>
          )}
        </div>

        {/* Order card */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="card-premium shadow-[var(--shadow-elevated)]">
            <div className="card-premium-inner p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-ink">{formatPrice(product.price, product.currency)}</span>
                {product.compare_at_price && (
                  <span className="text-base text-ink-muted line-through">
                    {formatPrice(product.compare_at_price, product.currency)}
                  </span>
                )}
              </div>

              {product.delivery_time_text && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
                  <Clock className="h-4 w-4" /> Delivery: {product.delivery_time_text}
                </p>
              )}

              <BuyNowButton
                productId={product.id}
                size="lg"
                className="mt-5"
              />
              <p className="mt-3 text-center text-xs text-ink-muted">
                Orders are confirmed and completed directly with our team on Telegram.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-ink">Related Products</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-ink">Related Guides</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="card-surface card-surface-hover p-5">
                <h3 className="font-semibold text-ink">{article.title}</h3>
                {article.excerpt && <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{article.excerpt}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
