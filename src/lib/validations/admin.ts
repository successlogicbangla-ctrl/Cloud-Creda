import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

const listField = z
  .string()
  .optional()
  .transform((v) =>
    (v ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
  );

export const productSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  provider_id: z.string().trim().optional().transform((v) => (v ? v : null)),
  category_id: z.string().trim().optional().transform((v) => (v ? v : null)),
  short_description: z.string().trim().optional(),
  description: z.string().trim().optional(),
  price: z.coerce.number().min(0, "Price must be zero or more"),
  compare_at_price: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : null)),
  currency: z.string().trim().min(1).default("USD"),
  badge: z.enum(["none", "popular", "hot", "best_value", "new"]).default("none"),
  is_active: z.coerce.boolean().default(true),
  is_featured: z.coerce.boolean().default(false),
  delivery_time_text: z.string().trim().optional(),
  availability_status: z.enum(["in_stock", "limited", "out_of_stock", "preorder"]).default("in_stock"),
  telegram_link: optionalUrl,
  requirements: z.string().trim().optional(),
  whats_included: listField,
  features: listField,
  seo_title: z.string().trim().optional(),
  seo_description: z.string().trim().optional(),
  og_image_url: optionalUrl,
  sort_order: z.coerce.number().default(0),
});

export const categorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  image_url: optionalUrl,
  sort_order: z.coerce.number().default(0),
  seo_title: z.string().trim().optional(),
  seo_description: z.string().trim().optional(),
});

export const providerSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().trim().min(1, "Name is required"),
  display_title: z.string().trim().optional(),
  tagline: z.string().trim().optional(),
  description: z.string().trim().optional(),
  logo_url: optionalUrl,
  website_url: optionalUrl,
  is_active: z.coerce.boolean().default(true),
  sort_order: z.coerce.number().default(0),
  seo_title: z.string().trim().optional(),
  seo_description: z.string().trim().optional(),
  // Optional landing-page content (e.g. a dedicated "Buy AWS Account" page).
  // Flat fields here are assembled into the `content` jsonb column by the
  // create/update provider actions — see parsePipeList / parseTags there.
  content_hero_subtitle: z.string().trim().optional(),
  content_details: z.string().optional(),
  content_why_choose: z.string().optional(),
  content_what_you_receive: z.string().optional(),
  content_what_is_body: z.string().trim().optional(),
  content_benefits: z.string().optional(),
  content_why_cloudcreda: z.string().optional(),
  content_tags: z.string().optional(),
});

export const articleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  excerpt: z.string().trim().optional(),
  content: z.string().trim().min(1, "Content is required"),
  cover_image_url: optionalUrl,
  author_name: z.string().trim().optional(),
  category: z.string().trim().optional(),
  tags: z
    .string()
    .optional()
    .transform((v) => (v ?? "").split(",").map((t) => t.trim()).filter(Boolean)),
  status: z.enum(["draft", "published"]).default("draft"),
  seo_title: z.string().trim().optional(),
  seo_description: z.string().trim().optional(),
});

export const faqSchema = z.object({
  question: z.string().trim().min(1, "Question is required"),
  answer: z.string().trim().min(1, "Answer is required"),
  product_id: z.string().trim().optional().transform((v) => (v ? v : null)),
  provider_id: z.string().trim().optional().transform((v) => (v ? v : null)),
  category: z.string().trim().optional(),
  sort_order: z.coerce.number().default(0),
  is_active: z.coerce.boolean().default(true),
});

export const reviewSchema = z.object({
  customer_name: z.string().trim().min(1, "Customer name is required"),
  customer_title: z.string().trim().optional(),
  avatar_url: optionalUrl,
  rating: z.coerce.number().min(1).max(5),
  quote: z.string().trim().min(1, "Quote is required"),
  product_id: z.string().trim().optional().transform((v) => (v ? v : null)),
  is_featured: z.coerce.boolean().default(false),
  is_approved: z.coerce.boolean().default(false),
  source: z.string().trim().optional(),
});

export const siteSettingsSchema = z.object({
  site_name: z.string().trim().min(1, "Site name is required"),
  logo_url: optionalUrl,
  favicon_url: optionalUrl,
  default_telegram_link: optionalUrl,
  support_email: z.string().trim().optional(),
  privacy_policy: z.string().trim().optional(),
  terms_of_service: z.string().trim().optional(),
  refund_policy: z.string().trim().optional(),
});
