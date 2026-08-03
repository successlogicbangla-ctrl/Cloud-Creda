-- Records which providers have a dedicated static "Buy X Account" landing
-- page (see src/lib/provider-landing-content.ts) and, if so, the URL segment
-- it lives at under /cloud-accounts/. When set, every internal link to that
-- provider (directory cards, product pages, sitemap) points here instead of
-- the generic /providers/[slug] listing page, which the provider then
-- permanently redirects away from (see next.config.ts).

alter table public.providers
  add column landing_path text;
