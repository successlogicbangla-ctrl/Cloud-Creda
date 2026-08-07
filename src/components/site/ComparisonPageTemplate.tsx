import Link from "next/link";
import { Fragment } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Clock,
  Cloud,
  MessageCircle,
  Minus,
  Quote as QuoteIcon,
  Sparkles,
  X,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { BuyNowButton } from "@/components/site/BuyNowButton";
import type { ArticleBlock, ComparisonContent, ScorecardRow } from "@/lib/comparison-content";
import type { ComparisonEntry } from "@/lib/comparisons";
import type { Product, Provider } from "@/lib/types";
import { formatPrice, getProviderHref } from "@/lib/utils";
import { TELEGRAM_URL } from "@/lib/telegram";

interface ComparisonPageTemplateProps {
  content: ComparisonContent;
  providerA: Provider;
  providerB: Provider;
  productsA: Product[];
  productsB: Product[];
  relatedComparisons: ComparisonEntry[];
}

/** Renders `**bold**` spans as <strong> without altering any wording. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function ProviderLogo({ provider, size = "md" }: { provider: Provider; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-16 w-16 p-3" : "h-12 w-12 p-2.5";
  return provider.logo_url ? (
    <span
      className={`flex ${dims} shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_8px_20px_-6px_rgb(0_0_0_/_0.4)] ring-1 ring-white/20`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted brand SVGs */}
      <img src={provider.logo_url} alt={`${provider.name} logo`} className="h-full w-full object-contain" loading="lazy" />
    </span>
  ) : (
    <span className={`icon-tile icon-tile-a ${size === "lg" ? "h-16 w-16" : "h-12 w-12"}`}>
      <Cloud className={size === "lg" ? "h-7 w-7" : "h-5 w-5"} />
    </span>
  );
}

function ArticleBlockView({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{renderInline(block.text)}</h2>
      ) : (
        <h3 className="mt-8 text-lg font-bold text-ink sm:text-xl">{renderInline(block.text)}</h3>
      );
    case "paragraph":
      return <p className="mt-4 leading-relaxed text-ink-muted">{renderInline(block.text)}</p>;
    case "callout":
      return (
        <div className="not-prose mt-6 flex items-start gap-3 rounded-xl border border-accent-blue/25 bg-accent-blue/[0.07] p-5">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-sky-accent" />
          <p className="text-sm leading-relaxed text-ink sm:text-base">{renderInline(block.text)}</p>
        </div>
      );
    case "quote":
      return (
        <blockquote className="not-prose card-surface relative mt-6 p-6 pl-14 sm:p-7 sm:pl-16">
          <QuoteIcon className="absolute left-5 top-6 h-7 w-7 text-sky-accent/40 sm:left-6" />
          <p className="text-base italic leading-relaxed text-ink sm:text-lg">{renderInline(block.text)}</p>
          {block.attribution && <footer className="mt-3 text-sm font-medium text-ink-muted">— {block.attribution}</footer>}
        </blockquote>
      );
    case "bullets":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted sm:text-base">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="not-prose card-surface mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-white/[0.03]">
                {block.headers.map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-line last:border-0 hover:bg-white/[0.03]">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-ink-muted">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function ScoreBar({ winner }: { winner: "A" | "B" | "tie" }) {
  const aWidth = winner === "A" ? "70%" : winner === "B" ? "30%" : "50%";
  const bWidth = winner === "A" ? "30%" : winner === "B" ? "70%" : "50%";
  return (
    <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
      <div
        className={`h-full rounded-l-full transition-all duration-700 ${winner === "A" ? "bg-gradient-to-r from-accent-blue to-secondary shadow-[0_0_12px_rgb(37_99_235_/_0.6)]" : "bg-white/15"}`}
        style={{ width: aWidth }}
      />
      <div
        className={`h-full rounded-r-full transition-all duration-700 ${winner === "B" ? "bg-gradient-to-r from-sky-accent to-accent-blue shadow-[0_0_12px_rgb(6_182_212_/_0.6)]" : "bg-white/15"}`}
        style={{ width: bWidth }}
      />
    </div>
  );
}

function ScoreCard({
  row,
  index,
  providerA,
  providerB,
}: {
  row: ScorecardRow;
  index: number;
  providerA: Provider;
  providerB: Provider;
}) {
  const winnerProvider = row.winner === "A" ? providerA : row.winner === "B" ? providerB : null;
  return (
    <div
      className="card-surface card-surface-hover animate-fade-up p-5"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{row.category}</p>
        {winnerProvider ? (
          <span className="badge-info shrink-0">
            <Award className="h-3 w-3" /> {winnerProvider.name}
          </span>
        ) : (
          <span className="badge-neutral shrink-0">Tie</span>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <p className="line-clamp-2 text-ink-muted">
          <span className="font-medium text-ink">{providerA.name}:</span> {row.valueA}
        </p>
        <p className="line-clamp-2 text-ink-muted">
          <span className="font-medium text-ink">{providerB.name}:</span> {row.valueB}
        </p>
      </div>
      <ScoreBar winner={row.winner} />
    </div>
  );
}

function FeatureTable({
  scorecard,
  providerA,
  providerB,
}: {
  scorecard: ScorecardRow[];
  providerA: Provider;
  providerB: Provider;
}) {
  return (
    <div className="card-surface overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-line bg-[#0d1326]">
            <th className="px-4 py-3.5 font-semibold text-ink">Category</th>
            <th className="px-4 py-3.5 font-semibold text-ink">{providerA.name}</th>
            <th className="px-4 py-3.5 font-semibold text-ink">{providerB.name}</th>
            <th className="px-4 py-3.5 font-semibold text-ink">Winner</th>
          </tr>
        </thead>
        <tbody>
          {scorecard.map((row) => (
            <tr key={row.category} className="border-b border-line last:border-0 hover:bg-white/[0.03]">
              <td className="px-4 py-3.5 font-medium text-ink">{row.category}</td>
              <td className={`px-4 py-3.5 ${row.winner === "A" ? "font-semibold text-ink" : "text-ink-muted"}`}>
                {row.valueA}
              </td>
              <td className={`px-4 py-3.5 ${row.winner === "B" ? "font-semibold text-ink" : "text-ink-muted"}`}>
                {row.valueB}
              </td>
              <td className="px-4 py-3.5">
                {row.winner === "tie" ? (
                  <span className="badge-neutral">
                    <Minus className="h-3 w-3" /> Tie
                  </span>
                ) : (
                  <span className="badge-info">
                    <Award className="h-3 w-3" /> {row.winner === "A" ? providerA.name : providerB.name}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProsConsCard({
  provider,
  pros,
  cons,
  variant,
}: {
  provider: Provider;
  pros: string[];
  cons: string[];
  variant: "a" | "b";
}) {
  return (
    <div className="card-surface p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <ProviderLogo provider={provider} />
        <h3 className="text-lg font-bold text-ink">{provider.name}</h3>
      </div>

      <div className="mt-6">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
          <Check className="h-3.5 w-3.5" /> Pros
        </p>
        <ul className="mt-3 space-y-2">
          {pros.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-300">
          <X className="h-3.5 w-3.5" /> Cons
        </p>
        <ul className="mt-3 space-y-2">
          {cons.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <span className={`mt-6 block h-1 w-16 rounded-full ${variant === "a" ? "bg-gradient-to-r from-accent-blue to-secondary" : "bg-gradient-to-r from-sky-accent to-accent-blue"}`} />
    </div>
  );
}

function RecommendationCard({
  provider,
  items,
}: {
  provider: Provider;
  items: string[];
}) {
  return (
    <div className="card-premium h-full">
      <div className="card-premium-inner flex h-full flex-col p-6 sm:p-8">
        <ProviderLogo provider={provider} size="lg" />
        <h3 className="mt-5 text-xl font-bold text-ink">Choose {provider.name}</h3>
        <ul className="mt-5 flex-1 space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-accent" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link href={getProviderHref(provider)} className="btn-primary flex-1 justify-center">
            View {provider.name} <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary justify-center">
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function VariantCard({ product, provider }: { product: Product; provider: Provider }) {
  return (
    <div className="card-surface card-surface-hover group flex flex-col p-5">
      <div className="flex items-center gap-3">
        <ProviderLogo provider={provider} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{provider.name}</p>
          <h4 className="font-semibold text-ink transition-colors group-hover:text-accent-blue">{product.title}</h4>
        </div>
      </div>

      {product.features.length > 0 && (
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
          <span className="text-xl font-bold text-ink">{formatPrice(product.price, product.currency)}</span>
          {product.delivery_time_text && (
            <span className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="h-3 w-3" /> {product.delivery_time_text}
            </span>
          )}
        </div>
        <Link href={`/products/${product.slug}`} className="btn-secondary !px-3 !py-2 text-xs">
          View Details
        </Link>
      </div>

      <BuyNowButton productId={product.id} label="Order Now" className="mt-3 w-full justify-center" />
    </div>
  );
}

export function ComparisonPageTemplate({
  content,
  providerA,
  providerB,
  productsA,
  productsB,
  relatedComparisons,
}: ComparisonPageTemplateProps) {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: content.h1 }]} />

      {/* Hero */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-primary-dark p-8 text-center shadow-[var(--shadow-elevated)] sm:p-14">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(650px circle at 15% 10%, rgba(37,99,235,0.38), transparent 60%), radial-gradient(550px circle at 88% 90%, rgba(79,70,229,0.3), transparent 55%), radial-gradient(500px circle at 50% 0%, rgba(6,182,212,0.2), transparent 55%)",
          }}
        />
        <div className="relative flex items-center justify-center gap-4">
          <ProviderLogo provider={providerA} size="lg" />
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-accent">
            vs
          </span>
          <ProviderLogo provider={providerB} size="lg" />
        </div>

        <h1 className="relative mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{content.h1}</h1>
        <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/70">{content.heroIntro}</p>

        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {["Expert Analysis", "Real-World Data", "2026 Buyer's Guide"].map((badge) => (
            <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
              {badge}
            </span>
          ))}
        </div>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#overview" className="btn-primary w-full shrink-0 sm:w-auto">
            Compare Now <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#order-now" className="btn-secondary !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent w-full shrink-0 sm:w-auto">
            Order Now <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Quick Comparison Overview */}
      <section id="overview" className="mt-16 scroll-mt-24">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Quick Comparison</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">At a Glance</h2>
          <p className="mt-3 text-base text-ink-muted">
            A category-by-category snapshot of how {providerA.name} and {providerB.name} stack up.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.scorecard.map((row, i) => (
            <ScoreCard key={row.category} row={row} index={i} providerA={providerA} providerB={providerB} />
          ))}
        </div>
      </section>

      {/* Executive Summary */}
      <section className="mt-16">
        <div className="card-premium">
          <div className="card-premium-inner flex flex-col gap-4 p-7 sm:flex-row sm:items-start sm:p-9">
            <span className="icon-tile icon-tile-d h-14 w-14 shrink-0">
              <Sparkles className="h-6 w-6" />
            </span>
            <div>
              <p className="section-eyebrow">Executive Summary</p>
              <div className="mt-2 space-y-3">
                {content.executiveSummary.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-ink-muted sm:text-lg">
                    {renderInline(paragraph)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Article Content */}
      <article className="mx-auto mt-16 max-w-3xl">
        <p className="section-eyebrow justify-center text-center">Full Comparison</p>
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl">{content.articleTitle}</h2>
        <div className="prose prose-invert mt-8 max-w-none prose-p:text-ink-muted prose-p:leading-relaxed">
          {content.articleBlocks.map((block, i) => (
            <ArticleBlockView key={i} block={block} />
          ))}
        </div>
        {content.authorNote && <p className="mt-10 border-t border-line pt-6 text-sm italic text-ink-muted">{content.authorNote}</p>}
      </article>

      {/* Pros and Cons */}
      <section className="mx-auto mt-16 max-w-5xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Weigh It Up</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Pros and Cons</h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ProsConsCard provider={providerA} pros={content.prosConsA.pros} cons={content.prosConsA.cons} variant="a" />
          <ProsConsCard provider={providerB} pros={content.prosConsB.pros} cons={content.prosConsB.cons} variant="b" />
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="mx-auto mt-16 max-w-5xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Side by Side</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Feature Comparison</h2>
        </div>
        <div className="mt-8">
          <FeatureTable scorecard={content.scorecard} providerA={providerA} providerB={providerB} />
        </div>
      </section>

      {/* Which Should You Choose */}
      <section className="mx-auto mt-16 max-w-5xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Decision Time</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Which Should You Choose?</h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RecommendationCard provider={providerA} items={content.recommendationA} />
          <RecommendationCard provider={providerB} items={content.recommendationB} />
        </div>
      </section>

      {/* Order Now */}
      <section id="order-now" className="mx-auto mt-16 max-w-5xl scroll-mt-24">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Ready When You Are</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Order Now</h2>
          <p className="mt-3 text-base text-ink-muted">
            Browse available {providerA.name} and {providerB.name} account variants and order directly on Telegram.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2.5">
              <ProviderLogo provider={providerA} />
              <h3 className="font-semibold text-ink">{providerA.name} Variants</h3>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {productsA.map((product) => (
                <VariantCard key={product.id} product={product} provider={providerA} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <ProviderLogo provider={providerB} />
              <h3 className="font-semibold text-ink">{providerB.name} Variants</h3>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {productsB.map((product) => (
                <VariantCard key={product.id} product={product} provider={providerB} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-16 max-w-3xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Questions</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-8">
          <FaqAccordion
            faqs={content.faqs.map((faq, i) => ({
              id: `${content.slug}-faq-${i}`,
              question: faq.question,
              answer: faq.answer,
              product_id: null,
              provider_id: null,
              category: null,
              sort_order: i,
              is_active: true,
            }))}
          />
        </div>
      </section>

      {/* Closing CTA */}
      <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-primary-dark p-8 text-center shadow-[var(--shadow-elevated)] sm:p-12">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(500px circle at 50% 0%, rgba(6,182,212,0.25), transparent 60%)" }}
        />
        <h2 className="relative text-2xl font-bold text-white sm:text-3xl">Ready to Order?</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/70">
          Message our team on Telegram or browse {providerA.name} and {providerB.name} listings directly.
        </p>
        <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" /> Order {providerA.name}
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" /> Order {providerB.name}
          </a>
          <Link
            href="/compare"
            className="btn-secondary !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent"
          >
            Back to Compare <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Keep Exploring</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Related Comparisons</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="card-surface card-surface-hover group flex items-center justify-between gap-3 p-5"
              >
                <span className="font-medium text-ink transition-colors group-hover:text-accent-blue">{c.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-accent-blue" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
