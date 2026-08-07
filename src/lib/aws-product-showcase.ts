/**
 * Curated presentation data for the premium Product Information / Why Choose
 * This Product / Product Variants sections on the AWS landing page only
 * (/cloud-accounts/buy-aws-account — see AwsProductShowcase.tsx). Prices and
 * product identity always come live from the real product catalog (see
 * awsVariantTiers' slugs, resolved against getProducts() at render time) so
 * this page can never drift out of sync with what a visitor actually buys.
 */

export type BadgeTone = "info" | "success" | "warning" | "neutral";

export interface AwsBadge {
  icon: string;
  label: string;
  tone: BadgeTone;
}

export interface AwsVariantTier {
  id: string;
  heading: string;
  /** Product slugs in display order, matched against the real catalog. */
  slugs: string[];
}

export const awsVariantTiers: AwsVariantTier[] = [
  {
    id: "vcpu",
    heading: "AWS vCPU Accounts",
    slugs: [
      "aws-account-free-trial",
      "aws-account-8-vcpu",
      "aws-account-32-vcpu",
      "aws-account-64-vcpu",
      "aws-account-128-vcpu",
      "aws-account-256-vcpu",
      "aws-account-512-vcpu",
    ],
  },
  {
    id: "credit",
    heading: "AWS Credit Accounts",
    slugs: [
      "aws-account-1k-credit",
      "aws-account-5k-credit",
      "aws-account-10k-credit",
      "aws-account-25k-credit",
      "aws-account-100k-credit",
    ],
  },
  {
    id: "ai",
    heading: "AWS AI Accounts",
    slugs: [
      "aws-account-ai-10rpm-32vcpu-nvirginia",
      "aws-account-ai-50rpm-kiro-32vcpu",
      "aws-account-ai-10krpm-5vcpu-aged",
      "aws-account-ai-10krpm-96vcpu-aged",
      "aws-account-ai-10krpm-128vcpu-aged",
      "aws-account-ai-10krpm-256vcpu-aged",
      "aws-account-ai-cloud-platform-384vcpu",
    ],
  },
];

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
  if (/bedrock/i.test(s)) return { icon: "🧠", label: s };
  if (/working/i.test(s)) return { icon: "⚙️", label: s };
  if (/2fa/i.test(s) && /api/i.test(s)) return { icon: "🔐", label: s };
  if (/2fa/i.test(s)) return { icon: "🔐", label: s };
  if (/api/i.test(s)) return { icon: "🔑", label: s };
  return { icon: "🌎", label: s };
}

/**
 * Derives colorful pill badges straight from a product's own title — the
 * exact spec segments the business supplied (e.g. "10 RPM", "32 vCPU",
 * "2FA + API") are what gets shown, never invented claims.
 */
export function deriveAwsBadges(title: string, tierId: string): AwsBadge[] {
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

  if (tierId !== "ai") {
    badges.push({ icon: "🌎", label: "Global" });
    badges.push({ icon: "🛡", label: "24/7 Support" });
  }

  return badges.map((b, i) => ({ ...b, tone: TONE_CYCLE[i % TONE_CYCLE.length] }));
}

export const awsProductInfo = {
  deliveryTime: "30 Min – 24 Hours",
  region: "Global",
  fullAccess: "Yes",
};

export const awsWhyChoose = [
  { title: "24/7 Support", description: "Our team is available around the clock to help before and after your order." },
  { title: "Affordable Price", description: "Transparent, competitive pricing across every AWS account and credit tier." },
  { title: "Verified Account", description: "Every account is checked and verified before it's handed over to you." },
  { title: "Trusted Seller", description: "Backed by CloudCreda's track record of fast, reliable order fulfillment." },
];
