-- CloudCreda initial schema
-- Run via Supabase CLI: supabase db push
-- or paste into the Supabase SQL editor.

create extension if not exists "pgcrypto";

-- =========================================================
-- ENUM TYPES
-- =========================================================

create type public.user_role as enum ('admin', 'editor', 'customer');
create type public.product_badge as enum ('none', 'popular', 'hot', 'best_value', 'new');
create type public.availability_status as enum ('in_stock', 'limited', 'out_of_stock', 'preorder');
create type public.article_status as enum ('draft', 'published');
create type public.lead_event_type as enum ('buy_click', 'contact_form', 'newsletter_signup');

-- =========================================================
-- PROFILES (extends auth.users)
-- =========================================================

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'customer',
  name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row when a new auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, name)
  values (new.id, 'customer', new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- PROVIDERS
-- =========================================================

create table public.providers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  logo_url text,
  description text,
  website_url text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- CATEGORIES
-- =========================================================

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  icon text,
  image_url text,
  parent_id uuid references public.categories (id) on delete set null,
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- PRODUCTS
-- =========================================================

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  provider_id uuid references public.providers (id) on delete set null,
  category_id uuid references public.categories (id) on delete set null,
  short_description text,
  description text,
  price numeric(12, 2) not null default 0,
  compare_at_price numeric(12, 2),
  currency text not null default 'USD',
  badge public.product_badge not null default 'none',
  is_active boolean not null default true,
  is_featured boolean not null default false,
  delivery_time_text text,
  availability_status public.availability_status not null default 'in_stock',
  telegram_link text,
  requirements text,
  whats_included jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  og_image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_provider_id_idx on public.products (provider_id);
create index products_category_id_idx on public.products (category_id);
create index products_is_active_idx on public.products (is_active);

-- Full-text search
alter table public.products add column search_vector tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(short_description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C')
  ) stored;

create index products_search_idx on public.products using gin (search_vector);

-- =========================================================
-- PRODUCT IMAGES
-- =========================================================

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index product_images_product_id_idx on public.product_images (product_id);

-- =========================================================
-- FAQS (global or product-specific)
-- =========================================================

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  product_id uuid references public.products (id) on delete cascade,
  category text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index faqs_product_id_idx on public.faqs (product_id);

-- =========================================================
-- ARTICLES (Guides/Blog)
-- =========================================================

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  author_name text,
  author_avatar_url text,
  category text,
  tags text[] not null default '{}',
  status public.article_status not null default 'draft',
  published_at timestamptz,
  related_product_ids uuid[] not null default '{}',
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_status_idx on public.articles (status);

alter table public.articles add column search_vector tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) stored;

create index articles_search_idx on public.articles using gin (search_vector);

-- =========================================================
-- REVIEWS (genuine, admin-curated)
-- =========================================================

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_title text,
  avatar_url text,
  rating int not null check (rating between 1 and 5),
  quote text not null,
  product_id uuid references public.products (id) on delete set null,
  is_featured boolean not null default false,
  is_approved boolean not null default false,
  source text,
  created_at timestamptz not null default now()
);

create index reviews_is_approved_idx on public.reviews (is_approved);

-- =========================================================
-- LEADS (Buy Now clicks + contact submissions; no payments on-site)
-- =========================================================

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products (id) on delete set null,
  event_type public.lead_event_type not null,
  name text,
  email text,
  message text,
  referrer text,
  created_at timestamptz not null default now()
);

create index leads_product_id_idx on public.leads (product_id);
create index leads_created_at_idx on public.leads (created_at desc);

-- =========================================================
-- SITE SETTINGS (singleton)
-- =========================================================

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  site_name text not null default 'CloudCreda',
  logo_url text,
  favicon_url text,
  default_telegram_link text,
  support_email text,
  social_links jsonb not null default '{}'::jsonb,
  footer_columns jsonb not null default '[]'::jsonb,
  default_seo jsonb not null default '{}'::jsonb,
  privacy_policy text,
  terms_of_service text,
  refund_policy text,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1);

-- =========================================================
-- HOMEPAGE SECTIONS (CMS-editable content blocks)
-- =========================================================

create table public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title text,
  subtitle text,
  content jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- =========================================================
-- WISHLISTS (optional customer accounts, phase 3)
-- =========================================================

create table public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- =========================================================
-- updated_at triggers
-- =========================================================

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.providers
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.categories
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.products
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.faqs
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.articles
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.site_settings
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.homepage_sections
  for each row execute procedure public.set_updated_at();
