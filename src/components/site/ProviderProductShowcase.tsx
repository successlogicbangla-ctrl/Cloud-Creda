import { Cloud, ShieldCheck, DollarSign, Clock, Globe2, Unlock, Headset, Tag, BadgeCheck, Award } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { BuyNowButton } from "@/components/site/BuyNowButton";
import {
  buildShowcaseTiers,
  showcaseProductInfo,
  showcaseWhyChoose,
  deriveShowcaseBadges,
  type BadgeTone,
} from "@/lib/provider-product-showcase";

const badgeToneClass: Record<BadgeTone, string> = {
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  neutral: "badge-neutral",
};

const whyChooseIcons = [Headset, Tag, BadgeCheck, Award];
const iconTileVariants = ["icon-tile-a", "icon-tile-b", "icon-tile-c", "icon-tile-d"];

/**
 * Same premium Product Information / Why Choose This Product / Product
 * Variants design introduced on the AWS landing page, reused for every other
 * /cloud-accounts/{slug} provider so the whole section shares one consistent
 * look — only the provider's own name, logo, and real products change.
 */
export function ProviderProductShowcase({
  providerName,
  logoUrl,
  products,
  telegramLink,
}: {
  providerName: string;
  logoUrl: string | null;
  products: Product[];
  telegramLink: string | null;
}) {
  const prices = products.map((p) => p.price);
  const startingPrice = prices.length > 0 ? Math.min(...prices) : null;
  const currency = products[0]?.currency ?? "USD";
  const tiers = buildShowcaseTiers(providerName, products);

  const infoItems = [
    { icon: ShieldCheck, title: "Trusted Product", value: "Verified" },
    {
      icon: DollarSign,
      title: "Price",
      value: startingPrice !== null ? `From ${formatPrice(startingPrice, currency)}` : "Multiple Options",
    },
    { icon: Clock, title: "Delivery Time", value: showcaseProductInfo.deliveryTime },
    { icon: Globe2, title: "Region", value: showcaseProductInfo.region },
    { icon: Unlock, title: "Full Access", value: showcaseProductInfo.fullAccess },
  ];

  return (
    <>
      {/* Product Information */}
      <section className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {infoItems.map((item) => (
            <div
              key={item.title}
              className="card-surface card-surface-hover group relative overflow-hidden p-5 text-center"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-blue/[0.06] via-transparent to-sky-accent/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="icon-tile icon-tile-a relative mx-auto h-11 w-11">
                <item.icon className="h-5 w-5" />
              </span>
              <p className="relative mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">{item.title}</p>
              <p className="relative mt-1 text-base font-bold text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose This Product */}
      <section className="mt-10">
        <div className="card-premium">
          <div className="card-premium-inner relative overflow-hidden p-6 sm:p-8">
            <div className="bg-grid-pattern absolute inset-0 opacity-[0.08]" />
            <h2 className="relative text-xl font-bold text-white">Why Choose This Product</h2>
            <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {showcaseWhyChoose.map((item, i) => {
                const Icon = whyChooseIcons[i % whyChooseIcons.length];
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-accent/30 hover:shadow-[var(--shadow-glow-cyan)]"
                  >
                    <span className={`icon-tile ${iconTileVariants[i % iconTileVariants.length]} h-11 w-11 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Product Variants */}
      {tiers.map((tier) => (
        <section key={tier.id} className="mt-14">
          <h2 className="text-gradient-premium text-2xl font-bold tracking-tight sm:text-3xl">{tier.heading}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tier.products.map((product) => (
              <ProviderVariantCard
                key={product.id}
                product={product}
                providerName={providerName}
                logoUrl={logoUrl}
                telegramLink={telegramLink}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function ProviderVariantCard({
  product,
  providerName,
  logoUrl,
  telegramLink,
}: {
  product: Product;
  providerName: string;
  logoUrl: string | null;
  telegramLink: string | null;
}) {
  const badges = deriveShowcaseBadges(product.title);
  const productTelegramLink = product.telegram_link || telegramLink || "https://t.me/";

  return (
    <div className="card-premium h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-glow-blue)]">
      <div className="card-premium-inner flex h-full flex-col p-6">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_8px_20px_-6px_rgb(0_0_0_/_0.4)] ring-1 ring-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted brand SVG, not a user-supplied remote image */}
              <img src={logoUrl} alt={`${providerName} logo`} className="h-full w-full object-contain" loading="lazy" />
            </span>
          ) : (
            <span className="icon-tile icon-tile-a h-12 w-12 shrink-0">
              <Cloud className="h-5 w-5" />
            </span>
          )}
          <h3 className="font-semibold leading-snug text-white">{product.title}</h3>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {badges.map((badge, i) => (
            <span key={`${badge.label}-${i}`} className={badgeToneClass[badge.tone]}>
              <span aria-hidden>{badge.icon}</span> {badge.label}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-1 items-end justify-between gap-3 border-t border-white/10 pt-5">
          <span className="text-2xl font-bold text-white">{formatPrice(product.price, product.currency)}</span>
          <BuyNowButton
            productId={product.id}
            telegramLink={productTelegramLink}
            label="Order Now"
            className="!py-2.5 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
