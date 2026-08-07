import type { MetadataRoute } from "next";

// Same production fallback as src/app/sitemap.ts — this only feeds the
// `sitemap:` directive below, so the announced sitemap URL is never localhost.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcreda.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/search"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
