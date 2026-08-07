import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Cloud, ExternalLink, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComparisonPageTemplate } from "@/components/site/ComparisonPageTemplate";
import { comparisons, getAllComparisonSlugs, getComparisonBySlug } from "@/lib/comparisons";
import { getComparisonContent } from "@/lib/comparison-content";
import { getProviderBySlug } from "@/lib/data/providers";
import { getProducts } from "@/lib/data/products";
import { formatPrice, getProviderHref } from "@/lib/utils";
import { TELEGRAM_URL } from "@/lib/telegram";
import type { Provider, Product } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getComparisonContent(slug);
  if (content) {
    return {
      title: content.h1,
      description: content.metaDescription,
      alternates: { canonical: `/compare/${slug}` },
    };
  }
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};
  return {
    title: `${comparison.title} — Comparison`,
    description: comparison.description,
    alternates: { canonical: `/compare/${comparison.slug}` },
  };
}

function FallbackProviderLogo({ provider }: { provider: Provider }) {
  return provider.logo_url ? (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_8px_20px_-6px_rgb(0_0_0_/_0.4)] ring-1 ring-white/20">
      {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted brand SVGs */}
      <img src={provider.logo_url} alt={`${provider.name} logo`} className="h-full w-full object-contain" loading="lazy" />
    </span>
  ) : (
    <span className="icon-tile icon-tile-a h-16 w-16">
      <Cloud className="h-7 w-7" />
    </span>
  );
}

function FallbackProviderColumn({ provider, products }: { provider: Provider; products: Product[] }) {
  return (
    <div className="card-surface flex flex-col p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <FallbackProviderLogo provider={provider} />
        <div>
          <h2 className="text-xl font-bold text-ink">{provider.name}</h2>
          {provider.tagline && <p className="mt-0.5 text-sm text-ink-muted">{provider.tagline}</p>}
        </div>
      </div>

      {provider.description && <p className="mt-5 text-sm leading-relaxed text-ink-muted">{provider.description}</p>}

      {products.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-accent">Popular Listings</p>
          <ul className="mt-3 space-y-2.5">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/[0.06]"
                >
                  <span className="text-ink-muted transition-colors hover:text-ink">{product.title}</span>
                  <span className="shrink-0 font-semibold text-ink">{formatPrice(product.price, product.currency)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2.5 pt-1 sm:flex-row">
        <Link href={getProviderHref(provider)} className="btn-primary flex-1 justify-center">
          View {provider.name} <ArrowRight className="h-4 w-4" />
        </Link>
        {provider.website_url && (
          <a
            href={provider.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary justify-center"
            aria-label={`${provider.name} official website`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Comparisons without full article content yet fall back to this lighter,
 * real-data-only layout (same visual language, no invented copy) until
 * their article content is supplied and added to comparison-content.ts.
 */
async function FallbackComparisonPage({ slug }: { slug: string }) {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const [providerA, providerB] = await Promise.all([
    getProviderBySlug(comparison.providerASlug),
    getProviderBySlug(comparison.providerBSlug),
  ]);
  if (!providerA || !providerB) notFound();

  const [productsA, productsB] = await Promise.all([
    getProducts({ providerSlug: providerA.slug, sort: "price_asc", limit: 4 }),
    getProducts({ providerSlug: providerB.slug, sort: "price_asc", limit: 4 }),
  ]);

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: comparison.title }]} />

      {/* Hero */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-primary-dark p-8 text-center shadow-[var(--shadow-elevated)] sm:p-14">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(500px circle at 90% 100%, rgba(6,182,212,0.2), transparent 55%)",
          }}
        />
        <div className="relative flex items-center justify-center gap-4">
          <FallbackProviderLogo provider={providerA} />
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-accent">
            vs
          </span>
          <FallbackProviderLogo provider={providerB} />
        </div>
        <h1 className="relative mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">{comparison.title}</h1>
        <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/70">{comparison.description}</p>
      </div>

      {/* Side-by-side */}
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        <FallbackProviderColumn provider={providerA} products={productsA} />
        <FallbackProviderColumn provider={providerB} products={productsB} />
      </div>

      {/* Closing CTA */}
      <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-primary-dark p-8 text-center shadow-[var(--shadow-elevated)] sm:p-12">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(500px circle at 50% 0%, rgba(6,182,212,0.25), transparent 60%)" }}
        />
        <p className="relative text-lg text-white/85">
          Not sure which one fits your project? Message our team and we&rsquo;ll help you choose.
        </p>
        <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" /> Chat on Telegram
          </a>
          <Link
            href="/compare"
            className="btn-secondary !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent"
          >
            All Comparisons <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getComparisonContent(slug);

  if (!content) {
    return <FallbackComparisonPage slug={slug} />;
  }

  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const [providerA, providerB] = await Promise.all([
    getProviderBySlug(comparison.providerASlug),
    getProviderBySlug(comparison.providerBSlug),
  ]);
  if (!providerA || !providerB) notFound();

  const [productsA, productsB] = await Promise.all([
    getProducts({ providerSlug: providerA.slug, sort: "price_asc", limit: 6 }),
    getProducts({ providerSlug: providerB.slug, sort: "price_asc", limit: 6 }),
  ]);

  const relatedComparisons = comparisons
    .filter(
      (c) =>
        c.slug !== slug &&
        (c.providerASlug === comparison.providerASlug ||
          c.providerBSlug === comparison.providerASlug ||
          c.providerASlug === comparison.providerBSlug ||
          c.providerBSlug === comparison.providerBSlug)
    )
    .slice(0, 6);

  return (
    <ComparisonPageTemplate
      content={content}
      providerA={providerA}
      providerB={providerB}
      productsA={productsA}
      productsB={productsB}
      relatedComparisons={relatedComparisons}
    />
  );
}
