-- Adds support for rich, CMS-editable provider landing pages (e.g. a
-- dedicated "Buy AWS Account" page) without changing the base schema for
-- providers that don't use it — `content` defaults to an empty object, and
-- the public site only renders the expanded layout when it's populated.

alter table public.providers
  add column content jsonb not null default '{}'::jsonb;

-- Lets FAQs be scoped to a provider (in addition to the existing per-product
-- scoping), reusing the same FAQ CRUD screen and FaqAccordion component.
alter table public.faqs
  add column provider_id uuid references public.providers (id) on delete cascade;

create index faqs_provider_id_idx on public.faqs (provider_id);
