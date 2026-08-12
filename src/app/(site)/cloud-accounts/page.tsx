import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProviderCard } from "@/components/site/ProviderCard";
import { getProviders } from "@/lib/data/providers";
import { getProducts } from "@/lib/data/products";
import { DELISTED_PROVIDER_SLUGS } from "@/lib/delisted-providers";

export const metadata: Metadata = {
  title: "Cloud Accounts",
  description: "Browse every cloud provider CloudCreda offers accounts, credits, and services for.",
  alternates: { canonical: "/cloud-accounts" },
};

export default async function CloudAccountsPage() {
  const allProviders = await getProviders();
  const providers = allProviders.filter((p) => !DELISTED_PROVIDER_SLUGS.has(p.slug));
  const counts = await Promise.all(providers.map((p) => getProducts({ providerSlug: p.slug })));

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cloud Accounts" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Cloud Accounts</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">
        Browse every cloud platform CloudCreda offers accounts and credits for, then view a provider&apos;s listings
        to find the right account type.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {providers.map((provider, i) => (
          <ProviderCard key={provider.id} provider={provider} productCount={counts[i]?.length ?? 0} index={i} />
        ))}
      </div>
    </div>
  );
}
