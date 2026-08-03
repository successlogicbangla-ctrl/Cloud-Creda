import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCcw,
  Tags,
  Compass,
  ShoppingCart,
  CreditCard,
  Mail,
  Rocket,
  TrendingUp,
  Wallet,
  Globe,
  Sparkles,
  BadgeCheck,
  Send,
  Quote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HomeProductCard } from "@/components/site/HomeProductCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { getProviders } from "@/lib/data/providers";
import { getFeaturedProducts } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/settings";
import { homeContent } from "@/lib/home-content";
import { getProviderHref } from "@/lib/utils";

const whyChooseIcons: LucideIcon[] = [ShieldCheck, Zap, MessageCircle, Tags, RefreshCcw, Lock];
const howItWorksIcons: LucideIcon[] = [Compass, ShoppingCart, CreditCard, Mail, Rocket];
const cloudBenefitIcons: LucideIcon[] = [TrendingUp, Wallet, Globe, ShieldCheck, Sparkles, BadgeCheck];
const iconTileVariants = ["icon-tile-a", "icon-tile-b", "icon-tile-c", "icon-tile-d"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.default_seo?.title ?? settings.site_name,
    description: settings.default_seo?.description ?? undefined,
    alternates: { canonical: "/" },
  };
}

const organizationJsonLd = (siteName: string, siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
});

export default async function HomePage() {
  const [providers, featuredProducts, settings] = await Promise.all([
    getProviders(),
    getFeaturedProducts(9),
    getSiteSettings(),
  ]);

  const providerBySlug = new Map(providers.map((p) => [p.slug, p]));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const telegramLink = settings.default_telegram_link;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings.site_name, siteUrl)) }}
      />

      {/* Hero */}
      <section className="surface-dark">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(650px circle at 12% 15%, rgba(37,99,235,0.42), transparent 60%), radial-gradient(550px circle at 88% 5%, rgba(6,182,212,0.3), transparent 55%), radial-gradient(600px circle at 50% 100%, rgba(79,70,229,0.35), transparent 60%)",
          }}
        />
        <div
          className="animate-float pointer-events-none absolute -right-24 top-16 hidden h-72 w-72 rounded-full bg-accent-blue/20 blur-3xl lg:block"
          aria-hidden
        />
        <div
          className="animate-float-slow pointer-events-none absolute -left-24 bottom-0 hidden h-72 w-72 rounded-full bg-sky-accent/10 blur-3xl lg:block"
          aria-hidden
        />
        <div
          className="animate-glow pointer-events-none absolute left-1/2 top-1/3 hidden h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl lg:block"
          aria-hidden
        />

        <div className="container-page relative py-20 sm:py-28">
          <div className="mx-auto max-w-4xl text-center animate-fade-up">
            <span className="section-eyebrow relative justify-center gap-2 rounded-full border border-sky-accent/25 bg-sky-accent/[0.08] px-4 py-1.5 !text-sky-accent shadow-[0_0_24px_-8px_rgb(6_182_212_/_0.6)]">
              <Sparkles className="h-3.5 w-3.5" /> {homeContent.hero.tagline}
            </span>
            <h1 className="text-gradient-premium mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
              {homeContent.hero.h1}
            </h1>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-sky-accent/60 to-transparent" />

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/products" className="btn-primary w-full shrink-0 sm:w-auto">
                Browse All Products <ArrowRight className="h-4 w-4" />
              </Link>
              {telegramLink && (
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full shrink-0 !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on Telegram
                </a>
              )}
            </div>
          </div>

          <div className="card-premium mx-auto mt-14 max-w-4xl">
            <div className="card-premium-inner relative space-y-5 overflow-hidden p-7 sm:p-10">
              <Quote className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 text-sky-accent/[0.06]" aria-hidden />
              {homeContent.hero.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "relative text-base leading-relaxed text-white/90 sm:text-xl sm:leading-relaxed"
                      : "relative text-sm leading-relaxed text-white/65 sm:text-base"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CloudCreda */}
      <section className="container-page py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Why CloudCreda</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{homeContent.whyChoose.heading}</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.whyChoose.items.map((item, i) => {
            const Icon = whyChooseIcons[i % whyChooseIcons.length];
            return (
              <div
                key={item.title}
                className="card-surface card-surface-hover group relative animate-fade-up overflow-hidden p-6"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-blue via-sky-accent to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <span className={`icon-tile ${iconTileVariants[i % iconTileVariants.length]} h-14 w-14 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink-muted/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Cloud Providers */}
      <section className="section-mesh-navy relative border-y border-white/[0.06] py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow justify-center">Cloud Accounts</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{homeContent.providersSection.heading}</h2>
            <p className="mt-3 text-base text-ink-muted">{homeContent.providersSection.intro}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {homeContent.providersSection.providers.map((block) => {
              const provider = providerBySlug.get(block.providerSlug);
              return (
                <div
                  key={block.providerSlug}
                  className="card-surface card-surface-hover group flex flex-col p-6 sm:p-7"
                >
                  <div className="flex items-center gap-4">
                    {provider?.logo_url ? (
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_8px_20px_-6px_rgb(0_0_0_/_0.4)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                        {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted brand SVGs */}
                        <img src={provider.logo_url} alt={`${provider.name} logo`} className="h-full w-full object-contain" loading="lazy" />
                      </span>
                    ) : (
                      <span className="icon-tile icon-tile-a h-14 w-14 group-hover:scale-110">
                        <Globe className="h-6 w-6" />
                      </span>
                    )}
                    <div>
                      <span className="badge-info">Cloud Account</span>
                      <h3 className="mt-1.5 font-semibold text-ink transition-colors group-hover:text-accent-blue">{block.heading}</h3>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 divide-y divide-line [&>p+p]:pt-3">
                    {block.paragraphs.map((paragraph, i) => (
                      <p key={i} className="text-sm leading-relaxed text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {provider && (
                    <Link href={getProviderHref(provider)} className="btn-secondary mt-5 w-full justify-center !py-2.5 text-xs">
                      View Products <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Cloud Accounts (real product variants) */}
      {featuredProducts.length > 0 && (
        <section className="relative py-20 sm:py-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(700px circle at 50% 0%, rgba(37,99,235,0.08), transparent 60%)" }}
            aria-hidden
          />
          <div className="container-page relative">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">Handpicked</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Featured Cloud Accounts</h2>
                <p className="mt-3 max-w-2xl text-base text-ink-muted">A snapshot of our most popular verified accounts, ready to order now.</p>
              </div>
              <Link href="/products" className="btn-secondary shrink-0">
                View All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, i) => (
                <HomeProductCard key={product.id} product={product} telegramLink={telegramLink} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="section-mesh-indigo relative border-y border-white/[0.06] py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow justify-center">Process</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{homeContent.howItWorks.heading}</h2>
            <p className="mt-3 text-base text-ink-muted">{homeContent.howItWorks.intro}</p>
          </div>
          <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden border-t border-dashed border-line lg:block" aria-hidden />
            {homeContent.howItWorks.steps.map((step, index) => {
              const StepIcon = howItWorksIcons[index % howItWorksIcons.length];
              return (
                <div key={step.title} className="group relative flex flex-col items-center text-center">
                  <span className="relative z-10 inline-flex">
                    <span className="icon-tile icon-tile-a h-14 w-14 ring-8 ring-[#10142b] transition-transform duration-300 group-hover:scale-110">
                      <StepIcon className="h-6 w-6" />
                    </span>
                    <span className="absolute -right-1.5 -top-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#10142b] bg-secondary text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </span>
                  <span className="mt-4 text-xs font-bold uppercase tracking-widest text-sky-accent">Step {index + 1}</span>
                  <h3 className="mt-1.5 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 max-w-xs text-sm text-ink-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cloud Computing Benefits */}
      <section className="surface-dark py-20 sm:py-24">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.12]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(550px circle at 85% 20%, rgba(6,182,212,0.2), transparent 55%), radial-gradient(500px circle at 10% 90%, rgba(79,70,229,0.18), transparent 55%)",
          }}
        />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow justify-center !text-sky-accent">Cloud Computing Benefits</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{homeContent.cloudBenefits.heading}</h2>
            <p className="mt-3 text-base text-white/70">{homeContent.cloudBenefits.intro}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {homeContent.cloudBenefits.items.map((item, i) => {
              const Icon = cloudBenefitIcons[i % cloudBenefitIcons.length];
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-accent/30 hover:bg-white/[0.07] hover:shadow-[var(--shadow-glow-cyan)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-sky-accent via-accent-blue to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className={`icon-tile ${iconTileVariants[i % iconTileVariants.length]} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-mesh-slate relative border-y border-white/[0.06] py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="icon-tile icon-tile-c mx-auto h-12 w-12">
              <MessageCircle className="h-5 w-5" />
            </span>
            <p className="section-eyebrow mt-4 justify-center">Questions</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{homeContent.faq.heading}</h2>
          </div>
          <div className="card-premium mt-10">
            <div className="card-premium-inner overflow-hidden">
              <FaqAccordion
                faqs={homeContent.faq.items.map((faq, i) => ({
                  id: `home-faq-${i}`,
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
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page py-20 sm:py-24">
        <div className="card-premium mx-auto max-w-5xl">
          <div className="card-premium-inner relative flex flex-col items-center gap-6 overflow-hidden p-10 text-center sm:p-16">
            <div className="bg-grid-pattern absolute inset-0 opacity-[0.15]" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(550px circle at 50% 0%, rgba(6,182,212,0.28), transparent 60%), radial-gradient(450px circle at 100% 100%, rgba(79,70,229,0.2), transparent 55%)",
              }}
            />
            <span className="icon-tile icon-tile-b animate-glow relative h-14 w-14">
              <Send className="h-6 w-6" />
            </span>
            <div className="relative max-w-3xl space-y-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{homeContent.finalCta.heading}</h2>
              {homeContent.finalCta.paragraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-white/70">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative flex flex-col gap-3 sm:flex-row">
              {telegramLink && (
                <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle className="h-4 w-4" /> Chat on Telegram
                </a>
              )}
              <Link
                href="/products"
                className="btn-secondary !border-white/20 !bg-transparent !text-white hover:!border-sky-accent hover:!text-sky-accent"
              >
                Browse All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="relative max-w-2xl text-sm text-white/50">{homeContent.finalCta.tagline}</p>
          </div>
        </div>
      </section>
    </>
  );
}
