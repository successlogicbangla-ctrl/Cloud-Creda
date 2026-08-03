-- CloudCreda Row Level Security policies
-- Public visitors get read-only access to published/active content.
-- Admins and editors get full read/write access to everything.
-- Customers can only manage their own profile and wishlist.

-- =========================================================
-- Helper: is the current user an admin or editor?
-- =========================================================

create function public.is_staff()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- =========================================================
-- PROFILES
-- =========================================================

alter table public.profiles enable row level security;

create policy "profiles: self read" on public.profiles
  for select using (auth.uid() = id or public.is_staff());

create policy "profiles: self update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "profiles: staff manage" on public.profiles
  for all using (public.is_staff()) with check (public.is_staff());

-- =========================================================
-- PROVIDERS
-- =========================================================

alter table public.providers enable row level security;

create policy "providers: public read active" on public.providers
  for select using (is_active or public.is_staff());

create policy "providers: staff write" on public.providers
  for insert with check (public.is_staff());
create policy "providers: staff update" on public.providers
  for update using (public.is_staff()) with check (public.is_staff());
create policy "providers: staff delete" on public.providers
  for delete using (public.is_staff());

-- =========================================================
-- CATEGORIES
-- =========================================================

alter table public.categories enable row level security;

create policy "categories: public read" on public.categories
  for select using (true);

create policy "categories: staff write" on public.categories
  for insert with check (public.is_staff());
create policy "categories: staff update" on public.categories
  for update using (public.is_staff()) with check (public.is_staff());
create policy "categories: staff delete" on public.categories
  for delete using (public.is_staff());

-- =========================================================
-- PRODUCTS
-- =========================================================

alter table public.products enable row level security;

create policy "products: public read active" on public.products
  for select using (is_active or public.is_staff());

create policy "products: staff write" on public.products
  for insert with check (public.is_staff());
create policy "products: staff update" on public.products
  for update using (public.is_staff()) with check (public.is_staff());
create policy "products: staff delete" on public.products
  for delete using (public.is_staff());

-- =========================================================
-- PRODUCT IMAGES
-- =========================================================

alter table public.product_images enable row level security;

create policy "product_images: public read" on public.product_images
  for select using (true);

create policy "product_images: staff write" on public.product_images
  for insert with check (public.is_staff());
create policy "product_images: staff update" on public.product_images
  for update using (public.is_staff()) with check (public.is_staff());
create policy "product_images: staff delete" on public.product_images
  for delete using (public.is_staff());

-- =========================================================
-- FAQS
-- =========================================================

alter table public.faqs enable row level security;

create policy "faqs: public read active" on public.faqs
  for select using (is_active or public.is_staff());

create policy "faqs: staff write" on public.faqs
  for insert with check (public.is_staff());
create policy "faqs: staff update" on public.faqs
  for update using (public.is_staff()) with check (public.is_staff());
create policy "faqs: staff delete" on public.faqs
  for delete using (public.is_staff());

-- =========================================================
-- ARTICLES
-- =========================================================

alter table public.articles enable row level security;

create policy "articles: public read published" on public.articles
  for select using (status = 'published' or public.is_staff());

create policy "articles: staff write" on public.articles
  for insert with check (public.is_staff());
create policy "articles: staff update" on public.articles
  for update using (public.is_staff()) with check (public.is_staff());
create policy "articles: staff delete" on public.articles
  for delete using (public.is_staff());

-- =========================================================
-- REVIEWS
-- =========================================================

alter table public.reviews enable row level security;

create policy "reviews: public read approved" on public.reviews
  for select using (is_approved or public.is_staff());

create policy "reviews: staff write" on public.reviews
  for insert with check (public.is_staff());
create policy "reviews: staff update" on public.reviews
  for update using (public.is_staff()) with check (public.is_staff());
create policy "reviews: staff delete" on public.reviews
  for delete using (public.is_staff());

-- =========================================================
-- LEADS (write-only for the public, read-only for staff)
-- =========================================================

alter table public.leads enable row level security;

create policy "leads: anyone can create" on public.leads
  for insert with check (true);

create policy "leads: staff read" on public.leads
  for select using (public.is_staff());

create policy "leads: staff delete" on public.leads
  for delete using (public.is_staff());

-- =========================================================
-- SITE SETTINGS
-- =========================================================

alter table public.site_settings enable row level security;

create policy "site_settings: public read" on public.site_settings
  for select using (true);

create policy "site_settings: staff update" on public.site_settings
  for update using (public.is_staff()) with check (public.is_staff());

-- =========================================================
-- HOMEPAGE SECTIONS
-- =========================================================

alter table public.homepage_sections enable row level security;

create policy "homepage_sections: public read active" on public.homepage_sections
  for select using (is_active or public.is_staff());

create policy "homepage_sections: staff write" on public.homepage_sections
  for insert with check (public.is_staff());
create policy "homepage_sections: staff update" on public.homepage_sections
  for update using (public.is_staff()) with check (public.is_staff());
create policy "homepage_sections: staff delete" on public.homepage_sections
  for delete using (public.is_staff());

-- =========================================================
-- WISHLISTS
-- =========================================================

alter table public.wishlists enable row level security;

create policy "wishlists: self manage" on public.wishlists
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "wishlists: staff read" on public.wishlists
  for select using (public.is_staff());
