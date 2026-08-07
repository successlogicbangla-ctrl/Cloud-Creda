import type { Product } from "./types";

/**
 * Generic version of the premium Product Information / Why Choose This
 * Product / Product Variants presentation introduced on the AWS landing page
 * (/cloud-accounts/buy-aws-account), reused across every other provider's
 * landing page so the whole /cloud-accounts section shares one consistent
 * premium design. AWS keeps its own bespoke copy (aws-product-showcase.ts +
 * AwsProductShowcase.tsx, with its curated vCPU/Credit/AI tiers) untouched —
 * this file only serves the other 11 providers, grouping by each product's
 * existing category exactly as it already is in the catalog.
 */

export type BadgeTone = "info" | "success" | "warning" | "neutral";

export interface ShowcaseBadge {
  icon: string;
  label: string;
  tone: BadgeTone;
}

const TONE_CYCLE: BadgeTone[] = ["info", "success", "warning", "neutral"];

function segmentBadge(segment: string): { icon: string; label: string } {
  const s = segment.trim();
  if (/rpm/i.test(s)) return { icon: "⚡", label: s };
  if (/vcpu/i.test(s)) return { icon: "🖥", label: s };
  if (/support/i.test(s)) return { icon: "🛡", label: s };
  if (/gmail/i.test(s)) return { icon: "📧", label: s };
  if (/multi-year|aged/i.test(s)) return { icon: "🚀", label: s };
  if (/credit/i.test(s)) return { icon: "💳", label: s };
  if (/free trial/i.test(s)) return { icon: "🎁", label: s };
  if (/port/i.test(s)) return { icon: "🔌", label: s };
  if (/server/i.test(s)) return { icon: "🖧", label: s };
  if (/working/i.test(s)) return { icon: "⚙️", label: s };
  if (/2fa/i.test(s)) return { icon: "🔐", label: s };
  if (/api/i.test(s)) return { icon: "🔑", label: s };
  return { icon: "🌎", label: s };
}

/**
 * Derives colorful pill badges straight from a product's own title — the
 * exact spec segment the business already gave it (e.g. "8 vCPU", "$1K
 * Credit", "Port 25 Open"), never an invented claim — plus the two trust
 * badges every card on the site already carries (Global delivery, 24/7
 * support), matching the AWS page's design exactly.
 */
export function deriveShowcaseBadges(title: string): ShowcaseBadge[] {
  const afterDash = title.split("—")[1]?.trim() ?? title;
  const rawSegments = afterDash.split("|").map((s) => s.trim()).filter(Boolean);

  const badges: { icon: string; label: string }[] = [];
  for (const segment of rawSegments) {
    if (/2fa/i.test(segment) && /api/i.test(segment) && segment.includes("+")) {
      badges.push({ icon: "🔐", label: "2FA" });
      badges.push({ icon: "🔑", label: "API" });
    } else {
      badges.push(segmentBadge(segment));
    }
  }

  badges.push({ icon: "🌎", label: "Global" });
  badges.push({ icon: "🛡", label: "24/7 Support" });

  return badges.map((b, i) => ({ ...b, tone: TONE_CYCLE[i % TONE_CYCLE.length] }));
}

export const showcaseProductInfo = {
  deliveryTime: "30 Min – 24 Hours",
  region: "Global",
  fullAccess: "Yes",
};

export const showcaseWhyChoose = [
  { title: "24/7 Support", description: "Our team is available around the clock to help before and after your order." },
  { title: "Affordable Price", description: "Transparent, competitive pricing across every account and credit tier." },
  { title: "Verified Account", description: "Every account is checked and verified before it's handed over to you." },
  { title: "Trusted Seller", description: "Backed by CloudCreda's track record of fast, reliable order fulfillment." },
];

export interface ShowcaseTier {
  id: string;
  heading: string;
  products: Product[];
}

/**
 * Splits a provider's real catalog into the same two-tier shape the AWS
 * page uses (an "Accounts" tier and a "Credit Accounts" tier), using each
 * product's existing category — no product, price, or ordering is changed,
 * and a tier is omitted entirely if the provider has none of that category.
 */
export function buildShowcaseTiers(providerName: string, products: Product[]): ShowcaseTier[] {
  const creditProducts = products.filter((p) => p.category?.slug === "cloud-credits");
  const accountProducts = products.filter((p) => p.category?.slug !== "cloud-credits");

  const tiers: ShowcaseTier[] = [];
  if (accountProducts.length > 0) {
    tiers.push({ id: "accounts", heading: `${providerName} Accounts`, products: accountProducts });
  }
  if (creditProducts.length > 0) {
    tiers.push({ id: "credits", heading: `${providerName} Credit Accounts`, products: creditProducts });
  }
  return tiers;
}
