import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Check, Compass, MessageCircle, MousePointerClick, Send, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconTile } from "@/components/ui/DynamicIcon";
import { ProductCard } from "@/components/site/ProductCard";
import { ProviderCard } from "@/components/site/ProviderCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { ProviderLandingSection } from "@/components/site/ProviderLandingSections";
import { AwsProductShowcase } from "@/components/site/AwsProductShowcase";
import { ProviderProductShowcase } from "@/components/site/ProviderProductShowcase";
import { getProviderBySlug, getProviders } from "@/lib/data/providers";
import { getProducts } from "@/lib/data/products";
import { getFaqs } from "@/lib/data/faqs";
import { getAllProviderLandingSlugs, getProviderLandingPage } from "@/lib/provider-landing-content";
import { TELEGRAM_URL } from "@/lib/telegram";
import { DELISTED_PROVIDER_SLUGS } from "@/lib/delisted-providers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const orderSteps = [
  { icon: Compass, title: "Choose a Product", description: "Pick the account or credit tier that fits what you need." },
  { icon: MousePointerClick, title: "Click Buy Now", description: "Tap Buy Now on the listing you've chosen." },
  { icon: Send, title: "Complete It On Telegram", description: "You'll be redirected to Telegram to confirm and finish your order with our team." },
];

export async function generateStaticParams() {
  const [landingSlugs, providers] = await Promise.all([
    Promise.resolve(getAllProviderLandingSlugs()),
    getProviders(),
  ]);
  // Providers with a dedicated landing page are served by that content below;
  // providers without one fall through to the generic detail view — both
  // live at this same /cloud-accounts/{slug} route. Delisted providers are
  // never prerendered here, so this exact slug 404s.
  const genericSlugs = providers
    .filter((p) => !p.landing_path && !DELISTED_PROVIDER_SLUGS.has(p.slug))
    .map((p) => p.slug);
  return [...landingSlugs, ...genericSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (DELISTED_PROVIDER_SLUGS.has(slug)) return {};

  const landingPage = getProviderLandingPage(slug);
  if (landingPage) {
    return {
      title: landingPage.seoTitle,
      description: landingPage.metaDescription,
      alternates: { canonical: `/cloud-accounts/${landingPage.slug}` },
    };
  }

  const provider = await getProviderBySlug(slug);
  if (!provider) return {};
  return {
    title: provider.seo_title ?? provider.name,
    description: provider.seo_description ?? provider.description ?? undefined,
    alternates: { canonical: `/cloud-accounts/${provider.slug}` },
  };
}

export default async function CloudAccountPage({ params }: PageProps) {
  const { slug } = await params;

  if (DELISTED_PROVIDER_SLUGS.has(slug)) notFound();

  const landingPage = getProviderLandingPage(slug);
  if (landingPage) {
    const isAwsLanding = landingPage.slug === "buy-aws-account";
    const [showcaseProducts, showcaseProvider] = await Promise.all([
      getProducts({ providerSlug: landingPage.providerSlug }),
      isAwsLanding ? Promise.resolve(null) : getProviderBySlug(landingPage.providerSlug),
    ]);
    const productsHref = `/products?provider=${landingPage.providerSlug}`;

    return (
      <div className="container-page py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cloud Accounts", href: "/cloud-accounts" },
            { label: landingPage.h1 },
          ]}
        />

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
          <h1 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{landingPage.h1}</h1>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/70">{landingPage.heroSubtitle}</p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-4 w-4" /> Chat on Telegram
            </a>
            <Link
              href={productsHref}
              className="btn-secondary !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {isAwsLanding && <AwsProductShowcase products={showcaseProducts} />}
        {!isAwsLanding && showcaseProvider && (
          <ProviderProductShowcase
            providerName={showcaseProvider.name}
            logoUrl={showcaseProvider.logo_url}
            products={showcaseProducts}
          />
        )}

        <div className="mx-auto max-w-3xl">
          {landingPage.sections.map((section) => (
            <ProviderLandingSection key={section.heading} section={section} />
          ))}
        </div>

        {/* Final CTA */}
        <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-primary-dark p-8 text-center shadow-[var(--shadow-elevated)] sm:p-12">
          <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(500px circle at 50% 0%, rgba(6,182,212,0.25), transparent 60%)" }}
          />
          <p className="relative text-lg text-white/85">{landingPage.closingCta}</p>
          <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-4 w-4" /> Chat on Telegram
            </a>
            <Link
              href={productsHref}
              className="btn-secondary !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const provider = await getProviderBySlug(slug);
  if (!provider) notFound();

  const content = provider.content ?? {};
  const hasRichContent = Object.keys(content).length > 0;
  const pageTitle = provider.display_title ?? provider.name;

  const [products, allProviders] = await Promise.all([
    getProducts({ providerSlug: provider.slug }),
    hasRichContent ? getProviders() : Promise.resolve([]),
  ]);

  const faqs = hasRichContent ? await getFaqs({ providerId: provider.id }) : [];
  const alternativeProviders = allProviders.filter(
    (p) => p.id !== provider.id && !DELISTED_PROVIDER_SLUGS.has(p.slug)
  );

  let relatedProducts: typeof products = [];
  if (hasRichContent) {
    const featured = await getProducts({ featuredOnly: true, limit: 8 });
    relatedProducts = featured.filter((p) => p.provider_id !== provider.id).slice(0, 3);
  }

  // Production domain — never localhost, even if NEXT_PUBLIC_SITE_URL isn't
  // set in the deploy environment. Matches the fallback used in
  // src/app/layout.tsx, sitemap.ts, and robots.ts.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcreda.com";
  const itemListJsonLd = hasRichContent && products.length > 0 && {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.title,
        url: `${siteUrl}/products/${p.slug}`,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: p.currency,
          url: `${siteUrl}/products/${p.slug}`,
        },
      },
    })),
  };

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cloud Accounts", href: "/cloud-accounts" }, { label: pageTitle }]} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}

      {/* Hero + short intro */}
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{pageTitle}</h1>
      {content.hero_subtitle && <p className="mt-3 max-w-2xl text-lg text-ink-muted">{content.hero_subtitle}</p>}
      {provider.description && <p className="mt-3 max-w-2xl text-ink-muted">{provider.description}</p>}

      {/* Existing products & variants */}
      <section className="mt-10">
        {hasRichContent && <h2 className="text-xl font-bold text-ink">Available Account Types</h2>}
        <div className={hasRichContent ? "mt-5" : ""}>
          {products.length === 0 ? (
            <EmptyState title="No products for this provider yet" description="Check back soon, or browse the full catalog." />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {hasRichContent && (
        <>
          {/* Details */}
          {content.details && content.details.length > 0 && (
            <section className="mt-16 max-w-3xl">
              <h2 className="text-xl font-bold text-ink">Details of {provider.name} Accounts</h2>
              <ul className="mt-4 space-y-2.5">
                {content.details.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-accent" /> {line}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Why choose this provider */}
          {content.why_choose && content.why_choose.length > 0 && (
            <section className="mt-16">
              <SectionHeading title={`Why Choose ${provider.name} Cloud Services?`} />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {content.why_choose.map((item) => (
                  <div key={item.title} className="card-surface p-6">
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* What customers receive */}
          {content.what_you_receive && content.what_you_receive.length > 0 && (
            <section className="mt-16">
              <SectionHeading title="What Customers Receive" />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {content.what_you_receive.map((item) => (
                  <div key={item.title} className="card-surface p-6">
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* What is [provider]? */}
          {content.what_is_body && (
            <section className="mt-16 max-w-3xl">
              <h2 className="text-xl font-bold text-ink">What is {provider.name}?</h2>
              <div className="prose prose-invert mt-4 max-w-none prose-p:text-ink-muted prose-a:text-accent-blue">
                <ReactMarkdown>{content.what_is_body}</ReactMarkdown>
              </div>
            </section>
          )}

          {/* Benefits */}
          {content.benefits && content.benefits.length > 0 && (
            <section className="mt-16">
              <SectionHeading title={`Benefits of ${provider.name} Cloud Services`} />
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {content.benefits.map((item, i) => (
                  <div key={item.title} className="card-surface p-6">
                    <IconTile name={item.icon} index={i} />
                    <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Why CloudCreda */}
          {content.why_cloudcreda && content.why_cloudcreda.length > 0 && (
            <section className="surface-dark relative mt-16 overflow-hidden rounded-2xl">
              <div className="bg-grid-pattern absolute inset-0 opacity-[0.12]" />
              <div className="relative p-8 sm:p-10">
                <SectionHeading
                  title="Why Choose CloudCreda"
                  className="[&_h2]:text-white"
                />
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {content.why_cloudcreda.map((item, i) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <IconTile name={item.icon} index={i} />
                      <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* How to order */}
          <section className="mt-16">
            <SectionHeading align="center" title="How to Order" className="mx-auto" />
            <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="pointer-events-none absolute left-0 right-0 top-6 hidden border-t border-dashed border-line sm:block" aria-hidden />
              {orderSteps.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <span className="icon-tile icon-tile-a relative z-10 h-12 w-12 ring-8 ring-surface">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="mt-4 text-xs font-bold uppercase tracking-widest text-sky-accent">Step {index + 1}</span>
                  <h3 className="mt-1.5 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 max-w-xs text-sm text-ink-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Alternatives */}
          {alternativeProviders.length > 0 && (
            <section className="mt-16">
              <SectionHeading title="Related Providers" subtitle={`Comparing options beyond ${provider.name}? CloudCreda also lists these cloud accounts.`} />
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {alternativeProviders.slice(0, 6).map((p, i) => (
                  <ProviderCard key={p.id} provider={p} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <section className="mt-16 max-w-3xl">
              <SectionHeading title="Frequently Asked Questions" />
              <div className="mt-6">
                <FaqAccordion faqs={faqs} />
              </div>
            </section>
          )}

          {/* Final CTA */}
          <section className="mt-16">
            <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-line bg-primary-dark p-10 text-center shadow-[var(--shadow-elevated)] sm:p-14">
              <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
              <h2 className="relative text-2xl font-bold text-white sm:text-3xl">Ready to buy your {provider.name} account?</h2>
              <p className="relative max-w-xl text-white/70">
                Browse the listings above, or message our team on Telegram if you have questions first.
              </p>
              <div className="relative flex flex-col gap-3 sm:flex-row">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle className="h-4 w-4" /> Chat on Telegram
                </a>
                <Link
                  href="/products"
                  className="btn-secondary !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent"
                >
                  Browse All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-ink">Related Products</h2>
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <section className="mt-16">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Related Searches</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-accent-blue hover:text-accent-blue"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
