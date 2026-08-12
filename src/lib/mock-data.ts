/**
 * Local demo content used only when no Supabase project is connected yet
 * (see isSupabaseConfigured in lib/supabase/env.ts). Lets the site render fully
 * during setup/development. Once a project is connected and supabase/seed.sql
 * is run, real database rows take over automatically — this file is not
 * imported anywhere once that happens.
 *
 * Reviews here are placeholders for layout purposes only — replace them with
 * genuine customer reviews via /admin/reviews before launch.
 */
import type {
  Article,
  Category,
  Faq,
  HomepageSection,
  Product,
  Provider,
  Review,
  SiteSettings,
} from "./types";
import { TELEGRAM_URL } from "./telegram";

export const mockProviders: Provider[] = [
  {
    id: "prov-aws",
    slug: "aws",
    name: "Amazon Web Services",
    display_title: "Buy Amazon AWS Account",
    landing_path: "buy-aws-account",
    logo_url: "/logos/aws.svg",
    tagline: "Amazon's cloud computing platform",
    description:
      "Looking to buy an AWS account or add Amazon Web Services credit to a project? CloudCreda lists AWS accounts and credit packages across a range of tiers — from entry-level options to larger prepaid credit bundles — so you can find the right fit for your cloud computing needs. Every listing shows its price up front, and orders are completed directly with our team on Telegram.",
    website_url: "https://aws.amazon.com",
    is_active: true,
    sort_order: 1,
    seo_title: "Buy Amazon AWS Account",
    seo_description:
      "Buy an AWS account or Amazon Web Services credit package from CloudCreda. Compare AWS account tiers and credit bundles, then order directly via Telegram.",
    content: {},
  },
  {
    id: "prov-gcp",
    slug: "google-cloud",
    name: "Google Cloud Platform",
    display_title: "Buy Google Cloud Platform Account",
    landing_path: "buy-google-cloud-platform-account",
    logo_url: "/logos/google-cloud.svg",
    tagline: "Google's cloud platform for compute and data",
    description: "Google's cloud suite for compute, machine learning, and data analytics workloads.",
    website_url: "https://cloud.google.com",
    is_active: true,
    sort_order: 2,
    seo_title: "Buy Google Cloud Platform Account",
    seo_description: "Get started on Google Cloud Platform with ready-to-use accounts and credit bundles.",
    content: {},
  },
  {
    id: "prov-azure",
    slug: "azure",
    name: "Microsoft Azure",
    display_title: "Buy Microsoft Azure Cloud Account",
    landing_path: "buy-microsoft-azure-cloud-account",
    logo_url: "/logos/azure.svg",
    tagline: "Microsoft's enterprise cloud platform",
    description: "Microsoft's enterprise-grade cloud platform for building and scaling applications.",
    website_url: "https://azure.microsoft.com",
    is_active: true,
    sort_order: 3,
    seo_title: "Buy Microsoft Azure Cloud Account",
    seo_description: "Explore Azure account and credit options for startups and enterprise teams.",
    content: {},
  },
  {
    id: "prov-do",
    slug: "digitalocean",
    name: "DigitalOcean",
    display_title: "Buy DigitalOcean Droplet Account",
    landing_path: "buy-digitalocean-droplet-account",
    logo_url: "/logos/digitalocean.svg",
    tagline: "Developer-friendly cloud infrastructure",
    description: "Developer-friendly cloud infrastructure built for simplicity and speed.",
    website_url: "https://digitalocean.com",
    is_active: true,
    sort_order: 4,
    seo_title: "Buy DigitalOcean Droplet Account",
    seo_description: "Simple, affordable DigitalOcean droplets and credit packages.",
    content: {},
  },
  {
    id: "prov-oracle",
    slug: "oracle-cloud",
    name: "Oracle Cloud Infrastructure",
    display_title: "Buy Oracle Cloud Account",
    landing_path: "buy-oracle-cloud-account",
    logo_url: "/logos/oracle-cloud.svg",
    tagline: "Oracle's cloud computing platform",
    description: "High-performance cloud computing with generous always-free resources.",
    website_url: "https://oracle.com/cloud",
    is_active: true,
    sort_order: 5,
    seo_title: "Buy Oracle Cloud Account",
    seo_description: "Oracle Cloud Infrastructure accounts and credit bundles.",
    content: {},
  },
  {
    id: "prov-vultr",
    slug: "vultr",
    name: "Vultr",
    display_title: "Buy Vultr Cloud Account",
    // Vultr's dedicated landing page, generic /cloud-accounts page, and
    // entire product catalog have all been permanently discontinued (see
    // src/lib/delisted-providers.ts). This provider record is kept only so
    // unrelated content that already references it by slug — comparison
    // articles, the homepage provider write-up — keeps working; it has no
    // public product page anymore.
    landing_path: null,
    logo_url: "/logos/vultr.svg",
    tagline: "Global cloud compute infrastructure",
    description: "Global cloud compute infrastructure with predictable, transparent pricing.",
    website_url: "https://vultr.com",
    is_active: true,
    sort_order: 6,
    seo_title: "Buy Vultr Cloud Account",
    seo_description: "Vultr cloud compute accounts and credit packages, delivered fast.",
    content: {},
  },
  {
    id: "prov-linode",
    slug: "linode",
    name: "Linode (Akamai)",
    display_title: "Buy Linode Cloud Account",
    landing_path: "buy-linode-cloud-account",
    logo_url: "/logos/linode.svg",
    tagline: "Cloud compute, now part of Akamai",
    description: "Cloud compute and infrastructure services, now part of Akamai.",
    website_url: "https://www.linode.com",
    is_active: true,
    sort_order: 7,
    seo_title: "Buy Linode Cloud Account",
    seo_description: "Linode (Akamai) accounts and credit packages.",
    content: {},
  },
  {
    id: "prov-hetzner",
    slug: "hetzner-cloud",
    name: "Hetzner Cloud",
    display_title: "Buy Hetzner Cloud Account",
    landing_path: "buy-hetzner-cloud-account",
    logo_url: "/logos/hetzner-cloud.svg",
    tagline: "European cloud and server hosting",
    description: "European cloud and dedicated server hosting provider.",
    website_url: "https://www.hetzner.com",
    is_active: true,
    sort_order: 8,
    seo_title: "Buy Hetzner Cloud Account",
    seo_description: "Hetzner Cloud accounts across a range of server tiers.",
    content: {},
  },
  {
    id: "prov-ibm",
    slug: "ibm-cloud",
    name: "IBM Cloud",
    display_title: "Buy IBM Cloud Account",
    landing_path: "buy-ibm-cloud-account",
    logo_url: "/logos/ibm-cloud.svg",
    tagline: "IBM's enterprise cloud platform",
    description: "IBM's enterprise cloud computing platform.",
    website_url: "https://www.ibm.com/cloud",
    is_active: true,
    sort_order: 9,
    seo_title: "Buy IBM Cloud Account",
    seo_description: "IBM Cloud accounts, including free trial and configured options.",
    content: {},
  },
  {
    id: "prov-kamatera",
    slug: "kamatera",
    name: "Kamatera",
    display_title: "Buy Kamatera Cloud Account",
    landing_path: "buy-kamatera-cloud-account",
    logo_url: null,
    tagline: "Cloud infrastructure with global reach",
    description: "Cloud infrastructure provider with global data center coverage.",
    website_url: "https://www.kamatera.com",
    is_active: true,
    sort_order: 10,
    seo_title: "Buy Kamatera Cloud Account",
    seo_description: "Kamatera cloud accounts, including free trial and configured options.",
    content: {},
  },
  {
    id: "prov-alibaba",
    slug: "alibaba-cloud",
    name: "Alibaba Cloud",
    display_title: "Buy Alibaba Cloud Account",
    landing_path: "buy-alibaba-cloud-account",
    logo_url: "/logos/alibaba-cloud.svg",
    tagline: "Alibaba Group's cloud platform",
    description: "Alibaba Group's cloud computing platform.",
    website_url: "https://www.alibabacloud.com",
    is_active: true,
    sort_order: 11,
    seo_title: "Buy Alibaba Cloud Account",
    seo_description: "Alibaba Cloud accounts for personal and business use.",
    content: {},
  },
  {
    id: "prov-atlantic",
    slug: "atlantic-net",
    name: "Atlantic.Net",
    display_title: "Buy Atlantic.Net Cloud Account",
    landing_path: "buy-atlantic-net-cloud-account",
    logo_url: null,
    tagline: "U.S.-based cloud hosting",
    description: "U.S.-based cloud hosting provider.",
    website_url: "https://www.atlantic.net",
    is_active: true,
    sort_order: 12,
    seo_title: "Buy Atlantic.Net Cloud Account",
    seo_description: "Atlantic.Net cloud hosting accounts.",
    content: {},
  },
];

export const mockCategories: Category[] = [
  {
    id: "cat-accounts",
    slug: "cloud-accounts",
    name: "Cloud Accounts",
    description: "Ready-to-use cloud provider accounts across all major platforms.",
    icon: "Server",
    image_url: null,
    parent_id: null,
    sort_order: 1,
    seo_title: null,
    seo_description: "Browse cloud accounts across AWS, Google Cloud, Azure, and more.",
  },
  {
    id: "cat-credits",
    slug: "cloud-credits",
    name: "Cloud Credits",
    description: "Prepaid credit packages to run workloads on your cloud platform of choice.",
    icon: "Wallet",
    image_url: null,
    parent_id: null,
    sort_order: 2,
    seo_title: null,
    seo_description: "Prepaid cloud credit packages for AWS, Google Cloud, Azure, and more.",
  },
  {
    id: "cat-hosting",
    slug: "managed-hosting",
    name: "Managed Hosting",
    description: "Fully managed compute and hosting plans, configured and ready to deploy.",
    icon: "HardDrive",
    image_url: null,
    parent_id: null,
    sort_order: 3,
    seo_title: null,
    seo_description: "Managed hosting plans across leading cloud providers.",
  },
  {
    id: "cat-devtools",
    slug: "dev-tool-credits",
    name: "Dev Tool Credits",
    description: "Credits and licenses for developer tools and SaaS platforms.",
    icon: "Wrench",
    image_url: null,
    parent_id: null,
    sort_order: 4,
    seo_title: null,
    seo_description: "Credits and subscriptions for popular developer tools and platforms.",
  },
];

/**
 * Product catalog data table. Title, provider, category, and price are the
 * only fields supplied by the business — everything else (description,
 * features, requirements, delivery time, badges) is intentionally left blank
 * rather than invented, and can be filled in per-product from /admin/products.
 */
interface ProductSeed {
  id: string;
  slug: string;
  title: string;
  provider_id: string;
  category_id: string;
  price: number;
  featured?: boolean;
}

const productSeeds: ProductSeed[] = [
  // Amazon Web Services
  { id: "prod-aws-free-trial", slug: "aws-account-free-trial", title: "AWS Account — Free Trial", provider_id: "prov-aws", category_id: "cat-accounts", price: 15, featured: true },
  { id: "prod-aws-8vcpu", slug: "aws-account-8-vcpu", title: "AWS Account — 8 vCPU", provider_id: "prov-aws", category_id: "cat-accounts", price: 20 },
  { id: "prod-aws-32vcpu", slug: "aws-account-32-vcpu", title: "AWS Account — 32 vCPU", provider_id: "prov-aws", category_id: "cat-accounts", price: 35 },
  { id: "prod-aws-64vcpu", slug: "aws-account-64-vcpu", title: "AWS Account — 64 vCPU", provider_id: "prov-aws", category_id: "cat-accounts", price: 60 },
  { id: "prod-aws-128vcpu", slug: "aws-account-128-vcpu", title: "AWS Account — 128 vCPU", provider_id: "prov-aws", category_id: "cat-accounts", price: 100 },
  { id: "prod-aws-256vcpu", slug: "aws-account-256-vcpu", title: "AWS Account — 256 vCPU", provider_id: "prov-aws", category_id: "cat-accounts", price: 199 },
  { id: "prod-aws-512vcpu", slug: "aws-account-512-vcpu", title: "AWS Account — 512 vCPU", provider_id: "prov-aws", category_id: "cat-accounts", price: 299 },
  { id: "prod-aws-1k-credit", slug: "aws-account-1k-credit", title: "AWS Account — $1K Credit", provider_id: "prov-aws", category_id: "cat-credits", price: 250 },
  { id: "prod-aws-5k-credit", slug: "aws-account-5k-credit", title: "AWS Account — $5K Credit", provider_id: "prov-aws", category_id: "cat-credits", price: 850 },
  { id: "prod-aws-10k-credit", slug: "aws-account-10k-credit", title: "AWS Account — $10K Credit", provider_id: "prov-aws", category_id: "cat-credits", price: 1600 },
  { id: "prod-aws-25k-credit", slug: "aws-account-25k-credit", title: "AWS Account — $25K Credit", provider_id: "prov-aws", category_id: "cat-credits", price: 3500 },
  { id: "prod-aws-100k-credit", slug: "aws-account-100k-credit", title: "AWS Account — $100K Credit", provider_id: "prov-aws", category_id: "cat-credits", price: 9999 },
  { id: "prod-aws-ai-10rpm-32vcpu", slug: "aws-account-ai-10rpm-32vcpu-nvirginia", title: "AWS Account — 10 RPM | 32 vCPU | Gmail | N. Virginia | 2FA + API", provider_id: "prov-aws", category_id: "cat-accounts", price: 70 },
  { id: "prod-aws-ai-50rpm-kiro", slug: "aws-account-ai-50rpm-kiro-32vcpu", title: "AWS Account — 50 RPM | Kiro Working | 32 vCPU | Gmail | 2FA + API", provider_id: "prov-aws", category_id: "cat-accounts", price: 220 },
  { id: "prod-aws-ai-10krpm-5vcpu", slug: "aws-account-ai-10krpm-5vcpu-aged", title: "AWS Account — 10K RPM | 4.6 Support | 5 vCPU | Multi-Year Aged", provider_id: "prov-aws", category_id: "cat-accounts", price: 220 },
  { id: "prod-aws-ai-10krpm-96vcpu", slug: "aws-account-ai-10krpm-96vcpu-aged", title: "AWS Account — 10K RPM | 4.6 Support | 96 vCPU | Multi-Year Aged", provider_id: "prov-aws", category_id: "cat-accounts", price: 350 },
  { id: "prod-aws-ai-10krpm-128vcpu", slug: "aws-account-ai-10krpm-128vcpu-aged", title: "AWS Account — 10K RPM | 4.6 Support | 128 vCPU | Multi-Year Aged", provider_id: "prov-aws", category_id: "cat-accounts", price: 850 },
  { id: "prod-aws-ai-10krpm-256vcpu", slug: "aws-account-ai-10krpm-256vcpu-aged", title: "AWS Account — 10K RPM | 4.6 Support | 256 vCPU | Multi-Year Aged", provider_id: "prov-aws", category_id: "cat-accounts", price: 900 },
  { id: "prod-aws-ai-cloud-platform", slug: "aws-account-ai-cloud-platform-384vcpu", title: "AWS Account — Cloud Platform Working | 384 vCPU | Bedrock Not Included", provider_id: "prov-aws", category_id: "cat-accounts", price: 4500 },

  // Google Cloud Platform
  { id: "prod-gcp-300-credit", slug: "google-cloud-account-300-credit", title: "Google Cloud Account — $300 Credit", provider_id: "prov-gcp", category_id: "cat-credits", price: 40, featured: true },
  { id: "prod-gcp-400-credit", slug: "google-cloud-account-400-credit", title: "Google Cloud Account — $400 Credit", provider_id: "prov-gcp", category_id: "cat-credits", price: 45 },
  { id: "prod-gcp-1k-credit", slug: "google-cloud-account-1k-credit", title: "Google Cloud Account — $1K Credit", provider_id: "prov-gcp", category_id: "cat-credits", price: 180 },
  { id: "prod-gcp-5k-credit", slug: "google-cloud-account-5k-credit", title: "Google Cloud Account — $5K Credit", provider_id: "prov-gcp", category_id: "cat-credits", price: 550 },
  { id: "prod-gcp-10k-credit", slug: "google-cloud-account-10k-credit", title: "Google Cloud Account — $10K Credit", provider_id: "prov-gcp", category_id: "cat-credits", price: 1200 },
  { id: "prod-gcp-25k-credit", slug: "google-cloud-account-25k-credit", title: "Google Cloud Account — $25K Credit", provider_id: "prov-gcp", category_id: "cat-credits", price: 2200 },

  // Microsoft Azure
  { id: "prod-azure-free-trial", slug: "azure-account-free-trial", title: "Microsoft Azure Account — Free Trial", provider_id: "prov-azure", category_id: "cat-accounts", price: 18, featured: true },
  { id: "prod-azure-payg", slug: "azure-account-pay-as-you-go", title: "Microsoft Azure Account — Azure Pay As You Go", provider_id: "prov-azure", category_id: "cat-accounts", price: 30 },
  { id: "prod-azure-1k-credit", slug: "azure-account-1k-credit", title: "Microsoft Azure Account — $1K Credit", provider_id: "prov-azure", category_id: "cat-credits", price: 175 },
  { id: "prod-azure-5k-credit", slug: "azure-account-5k-credit", title: "Microsoft Azure Account — $5K Credit", provider_id: "prov-azure", category_id: "cat-credits", price: 650 },

  // DigitalOcean
  { id: "prod-do-close-port-3", slug: "digitalocean-account-close-port-3", title: "DigitalOcean Account — Close Port 3", provider_id: "prov-do", category_id: "cat-accounts", price: 20, featured: true },
  { id: "prod-do-close-port-10", slug: "digitalocean-account-close-port-10", title: "DigitalOcean Account — Close Port 10", provider_id: "prov-do", category_id: "cat-accounts", price: 30 },
  { id: "prod-do-open-port-10", slug: "digitalocean-account-open-port-10-droplet", title: "DigitalOcean Account — Open Port 10 Droplet", provider_id: "prov-do", category_id: "cat-accounts", price: 350 },
  { id: "prod-do-open-port-25", slug: "digitalocean-account-open-port-25-droplet", title: "DigitalOcean Account — Open Port 25 Droplet", provider_id: "prov-do", category_id: "cat-accounts", price: 699 },
  { id: "prod-do-open-port-100", slug: "digitalocean-account-open-port-100-droplet", title: "DigitalOcean Account — Open Port 100 Droplet", provider_id: "prov-do", category_id: "cat-accounts", price: 2000 },
  { id: "prod-do-open-port-500", slug: "digitalocean-account-open-port-500-droplet", title: "DigitalOcean Account — Open Port 500 Droplet", provider_id: "prov-do", category_id: "cat-accounts", price: 9500 },
  { id: "prod-do-open-port-20000", slug: "digitalocean-account-open-port-20000-droplet", title: "DigitalOcean Account — Open Port 20000 Droplet", provider_id: "prov-do", category_id: "cat-accounts", price: 25000 },

  // Linode (Akamai)
  { id: "prod-linode-100-credit", slug: "linode-account-100-credit", title: "Linode Account — $100 Credit", provider_id: "prov-linode", category_id: "cat-credits", price: 20 },
  { id: "prod-linode-port-25-open", slug: "linode-account-port-25-open", title: "Linode Account — Port 25 Open", provider_id: "prov-linode", category_id: "cat-accounts", price: 100 },

  // Vultr's 3 products (vultr-account-200/250/300-credit) were permanently
  // discontinued and removed — see src/lib/delisted-providers.ts.

  // Oracle Cloud
  { id: "prod-oracle-new-account", slug: "oracle-cloud-account-new-account", title: "Oracle Cloud Account — Oracle New Account", provider_id: "prov-oracle", category_id: "cat-accounts", price: 45, featured: true },
  { id: "prod-oracle-old-account", slug: "oracle-cloud-account-old-account", title: "Oracle Cloud Account — Oracle Old Account", provider_id: "prov-oracle", category_id: "cat-accounts", price: 65 },
  { id: "prod-oracle-payg", slug: "oracle-cloud-account-pay-as-you-go", title: "Oracle Cloud Account — Oracle Pay As You Go", provider_id: "prov-oracle", category_id: "cat-accounts", price: 55 },
  { id: "prod-oracle-upgraded", slug: "oracle-cloud-account-upgraded", title: "Oracle Cloud Account — Oracle Upgraded", provider_id: "prov-oracle", category_id: "cat-accounts", price: 90 },

  // Alibaba Cloud
  { id: "prod-alibaba-personal", slug: "alibaba-cloud-account-personal", title: "Alibaba Cloud Account — Alibaba Personal", provider_id: "prov-alibaba", category_id: "cat-accounts", price: 120 },
  { id: "prod-alibaba-business", slug: "alibaba-cloud-account-business", title: "Alibaba Cloud Account — Alibaba Business", provider_id: "prov-alibaba", category_id: "cat-accounts", price: 220 },

  // IBM Cloud
  { id: "prod-ibm-free-trial", slug: "ibm-cloud-account-free-trial", title: "IBM Cloud Account — Free Trial", provider_id: "prov-ibm", category_id: "cat-accounts", price: 25 },
  { id: "prod-ibm-port-25-open", slug: "ibm-cloud-account-port-25-open", title: "IBM Cloud Account — Port 25 Open", provider_id: "prov-ibm", category_id: "cat-accounts", price: 80 },

  // Hetzner Cloud
  { id: "prod-hetzner-5-servers", slug: "hetzner-cloud-account-5-servers", title: "Hetzner Cloud Account — Hetzner 5 Servers", provider_id: "prov-hetzner", category_id: "cat-accounts", price: 40 },
  { id: "prod-hetzner-10-servers", slug: "hetzner-cloud-account-10-servers", title: "Hetzner Cloud Account — Hetzner 10 Servers", provider_id: "prov-hetzner", category_id: "cat-accounts", price: 70 },
  { id: "prod-hetzner-old-account", slug: "hetzner-cloud-account-old-account", title: "Hetzner Cloud Account — Hetzner Old Account", provider_id: "prov-hetzner", category_id: "cat-accounts", price: 100 },
  { id: "prod-hetzner-25-servers", slug: "hetzner-cloud-account-25-servers", title: "Hetzner Cloud Account — Hetzner 25 Servers", provider_id: "prov-hetzner", category_id: "cat-accounts", price: 150 },
  { id: "prod-hetzner-100-servers", slug: "hetzner-cloud-account-100-servers", title: "Hetzner Cloud Account — Hetzner 100 Servers", provider_id: "prov-hetzner", category_id: "cat-accounts", price: 750 },

  // Kamatera
  { id: "prod-kamatera-free-trial", slug: "kamatera-account-free-trial", title: "Kamatera Account — Free Trial", provider_id: "prov-kamatera", category_id: "cat-accounts", price: 20 },
  { id: "prod-kamatera-port-25-open", slug: "kamatera-account-port-25-open", title: "Kamatera Account — Port 25 Open", provider_id: "prov-kamatera", category_id: "cat-accounts", price: 35 },

  // Atlantic.Net
  { id: "prod-atlantic-free-trial", slug: "atlantic-net-account-free-trial", title: "Atlantic.Net Account — Free Trial", provider_id: "prov-atlantic", category_id: "cat-accounts", price: 55 },
  { id: "prod-atlantic-port-25-open", slug: "atlantic-net-account-port-25-open", title: "Atlantic.Net Account — Port 25 Open", provider_id: "prov-atlantic", category_id: "cat-accounts", price: 250 },
];

export const mockProducts: Product[] = productSeeds.map((seed, index) => ({
  id: seed.id,
  slug: seed.slug,
  title: seed.title,
  provider_id: seed.provider_id,
  category_id: seed.category_id,
  short_description: null,
  description: null,
  price: seed.price,
  compare_at_price: null,
  currency: "USD",
  badge: "none",
  is_active: true,
  is_featured: seed.featured ?? false,
  delivery_time_text: null,
  availability_status: "in_stock",
  telegram_link: null,
  requirements: null,
  whats_included: [],
  features: [],
  seo_title: null,
  seo_description: null,
  og_image_url: null,
  sort_order: index + 1,
}));

export const mockFaqs: Faq[] = [
  {
    id: "faq-1",
    question: "How fast will I receive my order?",
    answer:
      "Most orders are delivered within 2–8 hours during business hours. Delivery time is shown on each product page and confirmed when we get in touch on Telegram.",
    product_id: null,
    provider_id: null,
    category: "Delivery",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "faq-2",
    question: "How do I complete a purchase?",
    answer:
      "Click \"Buy Now\" on any product page — this opens a chat with our team on Telegram, where we confirm details and complete the order together.",
    product_id: null,
    provider_id: null,
    category: "Ordering",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "faq-3",
    question: "What happens if something doesn't work as expected?",
    answer:
      "Every order includes a replacement window (shown on the product page). Contact us on Telegram with your order details and we'll make it right.",
    product_id: null,
    provider_id: null,
    category: "Support",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "faq-4",
    question: "Do you take custom or bulk orders?",
    answer:
      "Yes — message us on Telegram or use the contact page for bulk or custom requests and we'll put together a quote.",
    product_id: null,
    provider_id: null,
    category: "Ordering",
    sort_order: 4,
    is_active: true,
  },
];

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    customer_name: "Sample Customer",
    customer_title: "Placeholder — replace via /admin/reviews",
    avatar_url: null,
    rating: 5,
    quote: "Replace this with a genuine customer quote from the admin dashboard before launch.",
    product_id: null,
    is_featured: true,
    is_approved: true,
    source: "Sample data",
    created_at: new Date().toISOString(),
  },
];

export const mockArticles: Article[] = [
  {
    id: "art-1",
    slug: "how-to-choose-a-cloud-provider",
    title: "How to Choose the Right Cloud Provider for Your Project",
    excerpt: "A practical framework for comparing AWS, Google Cloud, Azure, and smaller providers.",
    content:
      "# How to Choose the Right Cloud Provider\n\nChoosing a cloud provider comes down to three things: workload fit, budget, and ecosystem. This guide walks through a simple framework to evaluate AWS, Google Cloud, Azure, and smaller providers like DigitalOcean or Vultr for your specific project.\n\n## 1. Start with workload fit\n\nIf you're running containerized workloads, most major providers work well. If you need specific managed services (like BigQuery or DynamoDB), that narrows the choice quickly.\n\n## 2. Consider your budget\n\nSmaller providers are often more predictable and cheaper for simple compute needs, while hyperscalers offer more depth at a higher cost.\n\n## 3. Factor in your team's existing experience\n\nThe fastest path to production is usually the platform your team already knows.",
    cover_image_url: null,
    author_name: "CloudCreda Team",
    author_avatar_url: null,
    category: "Guides",
    tags: ["comparison", "getting-started"],
    status: "published",
    published_at: new Date().toISOString(),
    related_product_ids: ["prod-aws-free-trial", "prod-gcp-300-credit"],
    seo_title: "How to Choose the Right Cloud Provider",
    seo_description: "A practical framework for comparing cloud providers before you buy.",
  },
  {
    id: "art-2",
    slug: "getting-the-most-from-cloud-credits",
    title: "Getting the Most From Your Cloud Credit Package",
    excerpt: "Tips for stretching prepaid cloud credits further across dev, staging, and production.",
    content:
      "# Getting the Most From Your Cloud Credit Package\n\nPrepaid cloud credits are most effective when paired with good cost hygiene. Here are a few practical habits that help credits go further.\n\n## Set budget alerts\n\nMost providers let you configure budget alerts — set these as soon as credit is applied.\n\n## Right-size your instances\n\nStart smaller than you think you need, and scale up based on real usage data.\n\n## Turn off what you're not using\n\nDev and staging environments rarely need to run 24/7.",
    cover_image_url: null,
    author_name: "CloudCreda Team",
    author_avatar_url: null,
    category: "Guides",
    tags: ["credits", "cost-optimization"],
    status: "published",
    published_at: new Date().toISOString(),
    related_product_ids: ["prod-aws-1k-credit", "prod-azure-1k-credit"],
    seo_title: "Getting the Most From Cloud Credits",
    seo_description: "Practical tips for making prepaid cloud credits last longer.",
  },
];

export const mockSiteSettings: SiteSettings = {
  id: 1,
  site_name: "CloudCreda",
  logo_url: null,
  favicon_url: null,
  default_telegram_link: TELEGRAM_URL,
  support_email: "support@cloudcreda.com",
  social_links: { telegram: TELEGRAM_URL },
  footer_columns: [],
  default_seo: {
    title: "Cloud Accounts, Credits & Digital Services",
    description:
      "A modern marketplace for cloud accounts, credits, and digital services across every major provider.",
  },
  privacy_policy: "Add your privacy policy from /admin/settings.",
  terms_of_service: "Add your terms of service from /admin/settings.",
  refund_policy: "Add your delivery & replacement policy from /admin/settings.",
};

export const mockHomepageSections: HomepageSection[] = [
  {
    id: "hs-hero",
    section_key: "hero",
    title: "Cloud accounts, credits & digital services — delivered by real people",
    subtitle:
      "Browse a curated catalog across every major provider, then complete your order directly with our team on Telegram. No checkout friction, no automated guesswork.",
    content: {},
    is_active: true,
    sort_order: 1,
  },
  {
    id: "hs-why",
    section_key: "why_choose_us",
    title: "Why choose CloudCreda",
    subtitle: "A catalog built for clarity, not hype.",
    content: {
      items: [
        { title: "Curated Catalog", description: "Every listing is reviewed and kept current by our team.", icon: "ShieldCheck" },
        { title: "Fast Turnaround", description: "Most orders are confirmed and delivered within hours.", icon: "Zap" },
        { title: "Direct Support", description: "Talk to a real person on Telegram before and after you order.", icon: "MessageCircle" },
        { title: "Replacement Window", description: "Every order includes a clear replacement policy.", icon: "RefreshCcw" },
        { title: "Transparent Pricing", description: "No hidden fees — the price shown is the price you pay.", icon: "Tags" },
        { title: "Growing Catalog", description: "New providers and products added regularly.", icon: "TrendingUp" },
      ],
    },
    is_active: true,
    sort_order: 2,
  },
  {
    id: "hs-how",
    section_key: "how_it_works",
    title: "How it works",
    subtitle: "Three simple steps from browsing to delivery.",
    content: {
      steps: [
        { title: "Browse", description: "Explore products across every provider using search, categories, or filters." },
        { title: "Choose", description: "Pick the product that fits your needs and review pricing, features, and requirements." },
        { title: "Contact on Telegram", description: "Message our team on Telegram to confirm details and complete your order." },
      ],
    },
    is_active: true,
    sort_order: 3,
  },
  {
    id: "hs-cta",
    section_key: "final_cta",
    title: "Ready to get started?",
    subtitle: "Browse the full catalog or reach out with questions before you order.",
    content: {},
    is_active: true,
    sort_order: 4,
  },
];
