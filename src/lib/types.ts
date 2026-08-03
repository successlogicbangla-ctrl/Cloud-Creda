export type UserRole = "admin" | "editor" | "customer";
export type ProductBadge = "none" | "popular" | "hot" | "best_value" | "new";
export type AvailabilityStatus = "in_stock" | "limited" | "out_of_stock" | "preorder";
export type ArticleStatus = "draft" | "published";
export type LeadEventType = "buy_click" | "contact_form" | "newsletter_signup";

export interface ProviderBenefitItem {
  title: string;
  description: string;
  icon?: string;
}

/**
 * Optional rich landing-page content for a provider (e.g. a dedicated
 * "Buy AWS Account" page). Left as `{}` by default — the public provider
 * page only renders the expanded sections when these are populated, so
 * providers without this content keep the plain listing page unchanged.
 */
export interface ProviderContent {
  hero_subtitle?: string;
  details?: string[];
  why_choose?: ProviderBenefitItem[];
  what_you_receive?: ProviderBenefitItem[];
  what_is_body?: string;
  benefits?: ProviderBenefitItem[];
  why_cloudcreda?: ProviderBenefitItem[];
  tags?: string[];
}

export interface Provider {
  id: string;
  slug: string;
  /** Real/official platform name — used for prose and logo alt text. */
  name: string;
  /**
   * Commercial/SEO title (e.g. "Buy Amazon AWS Account") shown in directory
   * cards, page H1, breadcrumbs, and the browser title. Falls back to
   * `name` wherever it's blank.
   */
  display_title: string | null;
  /**
   * URL segment under /cloud-accounts/ for this provider's dedicated
   * landing page (e.g. "buy-aws-account"), if it has one. When set, all
   * internal links use /cloud-accounts/{landing_path} instead of the
   * generic /cloud-accounts/{slug} — see getProviderHref in lib/utils.ts.
   */
  landing_path: string | null;
  logo_url: string | null;
  /** Short one-line blurb shown on the Cloud Accounts directory card. */
  tagline: string | null;
  /** Longer SEO introduction paragraph shown on the provider's own page. */
  description: string | null;
  website_url: string | null;
  is_active: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  content: ProviderContent;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  provider_id: string | null;
  category_id: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  currency: string;
  badge: ProductBadge;
  is_active: boolean;
  is_featured: boolean;
  delivery_time_text: string | null;
  availability_status: AvailabilityStatus;
  telegram_link: string | null;
  requirements: string | null;
  whats_included: string[];
  features: string[];
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  sort_order: number;
  provider?: Provider | null;
  category?: Category | null;
  images?: ProductImage[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  product_id: string | null;
  provider_id: string | null;
  category: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_name: string | null;
  author_avatar_url: string | null;
  category: string | null;
  tags: string[];
  status: ArticleStatus;
  published_at: string | null;
  related_product_ids: string[];
  seo_title: string | null;
  seo_description: string | null;
}

export interface Review {
  id: string;
  customer_name: string;
  customer_title: string | null;
  avatar_url: string | null;
  rating: number;
  quote: string;
  product_id: string | null;
  is_featured: boolean;
  is_approved: boolean;
  source: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  product_id: string | null;
  event_type: LeadEventType;
  name: string | null;
  email: string | null;
  message: string | null;
  referrer: string | null;
  created_at: string;
}

export interface SocialLinks {
  telegram?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteSettings {
  id: number;
  site_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  default_telegram_link: string | null;
  support_email: string | null;
  social_links: SocialLinks;
  footer_columns: FooterColumn[];
  default_seo: { title?: string; description?: string };
  privacy_policy: string | null;
  terms_of_service: string | null;
  refund_policy: string | null;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  content: Record<string, unknown>;
  is_active: boolean;
  sort_order: number;
}

export interface Profile {
  id: string;
  role: UserRole;
  name: string | null;
  avatar_url: string | null;
}
