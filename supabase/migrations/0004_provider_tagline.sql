-- Adds a short one-line tagline for provider directory cards (the "Cloud
-- Accounts" grid), kept separate from `description` which is the longer
-- SEO introduction shown on each provider's own page.

alter table public.providers
  add column tagline text;
