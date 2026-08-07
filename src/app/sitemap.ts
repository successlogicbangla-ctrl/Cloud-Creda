import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { getProviders } from "@/lib/data/providers";
import { getArticles } from "@/lib/data/articles";
import { getProviderHref } from "@/lib/utils";
import { comparisons } from "@/lib/comparisons";

// Production domain — never localhost, even if NEXT_PUBLIC_SITE_URL isn't set
// in the deploy environment. Override via NEXT_PUBLIC_SITE_URL only for a
// non-production deployment (e.g. a staging domain).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcreda.com";

const staticRoutes = [
  "",
  "/products",
  "/categories",
  "/cloud-accounts",
  "/compare",
  "/articles",
  "/about",
  "/how-it-works",
  "/faq",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, providers, articles] = await Promise.all([
    getProducts(),
    getCategories(),
    getProviders(),
    getArticles(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/categories/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const providerEntries: MetadataRoute.Sitemap = providers.map((p) => ({
    url: `${siteUrl}${getProviderHref(p)}`,
    changeFrequency: "weekly",
    priority: p.landing_path ? 0.8 : 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/articles/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${siteUrl}/compare/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...productEntries,
    ...categoryEntries,
    ...providerEntries,
    ...articleEntries,
    ...comparisonEntries,
  ];
}
