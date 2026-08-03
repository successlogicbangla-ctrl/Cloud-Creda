-- Adds a commercial/SEO display title shown in cards, page H1, breadcrumbs,
-- and the browser title (e.g. "Buy Amazon AWS Account"), kept separate from
-- `name` (the provider's real/official name, e.g. "Amazon Web Services")
-- which stays in use for grammatical prose ("Why choose {name}?") and logo
-- alt text. Falls back to `name` wherever it's blank.

alter table public.providers
  add column display_title text;
