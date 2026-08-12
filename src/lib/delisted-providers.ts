/**
 * Providers whose public /cloud-accounts page and entire product catalog
 * have been permanently discontinued. The provider record itself (name,
 * logo, slug) is deliberately kept in the data layer — unrelated content
 * that already references it (comparison articles, the homepage provider
 * write-ups) still needs it to render correctly — but every place a visitor
 * could browse to or land on its now-nonexistent page must exclude it.
 *
 * Add a slug here (and nowhere else) to fully delist a provider's page.
 */
export const DELISTED_PROVIDER_SLUGS: ReadonlySet<string> = new Set(["vultr"]);
