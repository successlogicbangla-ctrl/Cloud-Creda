import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cloud } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getProviders } from "@/lib/data/providers";
import { comparisons } from "@/lib/comparisons";
import { iconTileVariant } from "@/components/ui/DynamicIcon";
import type { Provider } from "@/lib/types";

export const metadata: Metadata = {
  title: "Compare Cloud Providers",
  description:
    "Compare the world's leading cloud providers side by side to find the best platform for your infrastructure, applications, pricing, scalability, and business needs.",
  alternates: { canonical: "/compare" },
};

function ComparisonLogo({ provider, index }: { provider: Provider | undefined; index: number }) {
  if (!provider) {
    return (
      <span className="icon-tile icon-tile-a h-14 w-14">
        <Cloud className="h-6 w-6" />
      </span>
    );
  }
  return provider.logo_url ? (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-[0_8px_20px_-6px_rgb(0_0_0_/_0.4)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
      {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted brand SVGs */}
      <img src={provider.logo_url} alt={`${provider.name} logo`} className="h-full w-full object-contain" loading="lazy" />
    </span>
  ) : (
    <span className={`icon-tile ${iconTileVariant(index)} h-14 w-14 group-hover:scale-110`}>
      <Cloud className="h-6 w-6" />
    </span>
  );
}

export default async function ComparePage() {
  const providers = await getProviders();
  const providerBySlug = new Map(providers.map((p) => [p.slug, p]));

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />

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
        <span className="section-eyebrow relative justify-center !text-sky-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-accent" /> Side-by-Side
        </span>
        <h1 className="relative mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Compare Cloud Providers
        </h1>
        <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/70">
          Compare the world&rsquo;s leading cloud providers side by side to find the best platform for your
          infrastructure, applications, pricing, scalability, and business needs.
        </p>
      </div>

      {/* Comparison cards */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((comparison, i) => {
          const providerA = providerBySlug.get(comparison.providerASlug);
          const providerB = providerBySlug.get(comparison.providerBSlug);

          return (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}`}
              className="card-premium group block h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-glow-blue)]"
            >
              <div className="card-premium-inner flex h-full flex-col p-6">
                <div className="flex items-center justify-center gap-3">
                  <ComparisonLogo provider={providerA} index={i} />
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-accent">
                    vs
                  </span>
                  <ComparisonLogo provider={providerB} index={i + 1} />
                </div>

                <h3 className="mt-5 text-center text-lg font-semibold text-ink transition-colors group-hover:text-accent-blue">
                  {comparison.title}
                </h3>
                <p className="mt-2 text-center text-sm leading-relaxed text-ink-muted">{comparison.description}</p>

                <div className="mt-6 pt-1">
                  <span className="btn-primary w-full justify-center">
                    View Details <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
