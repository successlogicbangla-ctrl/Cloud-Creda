/**
 * Registry of provider head-to-head comparisons shown on /compare and
 * rendered individually at /compare/{slug}. Descriptions are deliberately
 * generic/neutral (no invented pricing, specs, or "winner" claims) — the
 * detail page draws its actual facts from the real provider + product data.
 */

export interface ComparisonEntry {
  slug: string;
  providerASlug: string;
  providerBSlug: string;
  title: string;
  description: string;
}

export const comparisons: ComparisonEntry[] = [
  {
    slug: "aws-vs-google-cloud",
    providerASlug: "aws",
    providerBSlug: "google-cloud",
    title: "AWS vs Google Cloud",
    description: "See how AWS and Google Cloud compare on infrastructure, services, and pricing models to choose the right platform for your workloads.",
  },
  {
    slug: "aws-vs-azure",
    providerASlug: "aws",
    providerBSlug: "azure",
    title: "AWS vs Azure",
    description: "Compare AWS and Microsoft Azure across compute options, enterprise tooling, and global infrastructure reach.",
  },
  {
    slug: "aws-vs-digitalocean",
    providerASlug: "aws",
    providerBSlug: "digitalocean",
    title: "AWS vs DigitalOcean",
    description: "Weigh AWS's broad service catalog against DigitalOcean's simpler, developer-friendly approach to cloud hosting.",
  },
  {
    slug: "aws-vs-oracle-cloud",
    providerASlug: "aws",
    providerBSlug: "oracle-cloud",
    title: "AWS vs Oracle Cloud",
    description: "Compare AWS's mature cloud ecosystem with Oracle Cloud's enterprise database and infrastructure strengths.",
  },
  {
    slug: "google-cloud-vs-azure",
    providerASlug: "google-cloud",
    providerBSlug: "azure",
    title: "Google Cloud vs Azure",
    description: "See how Google Cloud and Microsoft Azure stack up on data, AI tooling, and enterprise integration.",
  },
  {
    slug: "digitalocean-vs-vultr",
    providerASlug: "digitalocean",
    providerBSlug: "vultr",
    title: "DigitalOcean vs Vultr",
    description: "Compare two developer-focused VPS providers on simplicity, global regions, and pricing structure.",
  },
  {
    slug: "digitalocean-vs-linode",
    providerASlug: "digitalocean",
    providerBSlug: "linode",
    title: "DigitalOcean vs Linode",
    description: "See how DigitalOcean and Linode compare for straightforward, affordable cloud hosting.",
  },
  {
    slug: "aws-vs-alibaba-cloud",
    providerASlug: "aws",
    providerBSlug: "alibaba-cloud",
    title: "AWS vs Alibaba Cloud",
    description: "Compare AWS's global infrastructure with Alibaba Cloud's strength across Asia-Pacific markets.",
  },
  {
    slug: "aws-vs-hetzner",
    providerASlug: "aws",
    providerBSlug: "hetzner-cloud",
    title: "AWS vs Hetzner",
    description: "Weigh AWS's extensive service catalog against Hetzner's budget-friendly European infrastructure.",
  },
  {
    slug: "azure-vs-digitalocean",
    providerASlug: "azure",
    providerBSlug: "digitalocean",
    title: "Azure vs DigitalOcean",
    description: "Compare Microsoft Azure's enterprise platform with DigitalOcean's lightweight, developer-first hosting.",
  },
  {
    slug: "aws-vs-vultr",
    providerASlug: "aws",
    providerBSlug: "vultr",
    title: "AWS vs Vultr",
    description: "See how AWS's full-service cloud compares with Vultr's fast, straightforward VPS hosting.",
  },
  {
    slug: "google-cloud-vs-oracle-cloud",
    providerASlug: "google-cloud",
    providerBSlug: "oracle-cloud",
    title: "Google Cloud vs Oracle Cloud",
    description: "Compare Google Cloud's data and AI focus with Oracle Cloud's enterprise database heritage.",
  },
  {
    slug: "hetzner-vs-digitalocean",
    providerASlug: "hetzner-cloud",
    providerBSlug: "digitalocean",
    title: "Hetzner vs DigitalOcean",
    description: "Compare two budget-friendly hosting providers on regions, pricing, and ease of use.",
  },
  {
    slug: "vultr-vs-linode",
    providerASlug: "vultr",
    providerBSlug: "linode",
    title: "Vultr vs Linode",
    description: "See how Vultr and Linode compare for fast, affordable virtual private servers.",
  },
  {
    slug: "aws-vs-ibm-cloud",
    providerASlug: "aws",
    providerBSlug: "ibm-cloud",
    title: "AWS vs IBM Cloud",
    description: "Compare AWS's broad ecosystem with IBM Cloud's enterprise and Watson AI capabilities.",
  },
];

export function getComparisonBySlug(slug: string): ComparisonEntry | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
