-- CloudCreda starter content
-- Run after 0001_init.sql and 0002_rls.sql, e.g. via the Supabase SQL editor
-- or `supabase db execute -f supabase/seed.sql`.
--
-- This mirrors src/lib/mock-data.ts so the site looks the same once you
-- connect a real Supabase project as it does in local/demo mode. Replace the
-- placeholder review before launch, and freely edit everything else from
-- /admin once you've signed in.

-- =========================================================
-- SITE SETTINGS
-- =========================================================

update public.site_settings
set
  site_name = 'CloudCreda',
  default_telegram_link = 'https://t.me/your_channel',
  support_email = 'support@cloudcreda.com',
  social_links = '{"telegram": "https://t.me/your_channel"}'::jsonb,
  default_seo = '{"title": "Cloud Accounts, Credits & Digital Services", "description": "A modern marketplace for cloud accounts, credits, and digital services across every major provider."}'::jsonb,
  privacy_policy = 'Add your privacy policy from /admin/settings.',
  terms_of_service = 'Add your terms of service from /admin/settings.',
  refund_policy = 'Add your delivery & replacement policy from /admin/settings.'
where id = 1;

-- =========================================================
-- HOMEPAGE SECTIONS
-- =========================================================

insert into public.homepage_sections (section_key, title, subtitle, content, sort_order) values
('hero', 'Cloud accounts, credits & digital services — delivered by real people',
  'Browse a curated catalog across every major provider, then complete your order directly with our team on Telegram. No checkout friction, no automated guesswork.',
  '{}'::jsonb, 1),
('why_choose_us', 'Why choose CloudCreda', 'A catalog built for clarity, not hype.',
  '{"items": [
    {"title": "Curated Catalog", "description": "Every listing is reviewed and kept current by our team.", "icon": "ShieldCheck"},
    {"title": "Fast Turnaround", "description": "Most orders are confirmed and delivered within hours.", "icon": "Zap"},
    {"title": "Direct Support", "description": "Talk to a real person on Telegram before and after you order.", "icon": "MessageCircle"},
    {"title": "Replacement Window", "description": "Every order includes a clear replacement policy.", "icon": "RefreshCcw"},
    {"title": "Transparent Pricing", "description": "No hidden fees — the price shown is the price you pay.", "icon": "Tags"},
    {"title": "Growing Catalog", "description": "New providers and products added regularly.", "icon": "TrendingUp"}
  ]}'::jsonb, 2),
('how_it_works', 'How it works', 'Three simple steps from browsing to delivery.',
  '{"steps": [
    {"title": "Browse", "description": "Explore products across every provider using search, categories, or filters."},
    {"title": "Choose", "description": "Pick the product that fits your needs and review pricing, features, and requirements."},
    {"title": "Contact on Telegram", "description": "Message our team on Telegram to confirm details and complete your order."}
  ]}'::jsonb, 3),
('final_cta', 'Ready to get started?', 'Browse the full catalog or reach out with questions before you order.',
  '{}'::jsonb, 4);

-- =========================================================
-- PROVIDERS
-- =========================================================

insert into public.providers (slug, name, display_title, landing_path, logo_url, tagline, description, website_url, sort_order, seo_title, seo_description) values
('aws', 'Amazon Web Services', 'Buy Amazon AWS Account', 'buy-aws-account', '/logos/aws.svg', 'Amazon''s cloud computing platform', 'The world''s most broadly adopted cloud platform, offering compute, storage, and AI services.', 'https://aws.amazon.com', 1, 'Buy Amazon AWS Account', 'Browse verified AWS cloud accounts and credit packages with fast delivery.'),
('google-cloud', 'Google Cloud Platform', 'Buy Google Cloud Platform Account', 'buy-google-cloud-platform-account', '/logos/google-cloud.svg', 'Google''s cloud platform for compute and data', 'Google''s cloud suite for compute, machine learning, and data analytics workloads.', 'https://cloud.google.com', 2, 'Buy Google Cloud Platform Account', 'Get started on Google Cloud Platform with ready-to-use accounts and credit bundles.'),
('azure', 'Microsoft Azure', 'Buy Microsoft Azure Cloud Account', 'buy-microsoft-azure-cloud-account', '/logos/azure.svg', 'Microsoft''s enterprise cloud platform', 'Microsoft''s enterprise-grade cloud platform for building and scaling applications.', 'https://azure.microsoft.com', 3, 'Buy Microsoft Azure Cloud Account', 'Explore Azure account and credit options for startups and enterprise teams.'),
('digitalocean', 'DigitalOcean', 'Buy DigitalOcean Droplet Account', 'buy-digitalocean-droplet-account', '/logos/digitalocean.svg', 'Developer-friendly cloud infrastructure', 'Developer-friendly cloud infrastructure built for simplicity and speed.', 'https://digitalocean.com', 4, 'Buy DigitalOcean Droplet Account', 'Simple, affordable DigitalOcean droplets and credit packages.'),
('oracle-cloud', 'Oracle Cloud Infrastructure', 'Buy Oracle Cloud Account', 'buy-oracle-cloud-account', '/logos/oracle-cloud.svg', 'Oracle''s cloud computing platform', 'High-performance cloud computing with generous always-free resources.', 'https://oracle.com/cloud', 5, 'Buy Oracle Cloud Account', 'Oracle Cloud Infrastructure accounts and credit bundles.'),
('vultr', 'Vultr', 'Buy Vultr Cloud Account', 'buy-vultr-cloud-account', '/logos/vultr.svg', 'Global cloud compute infrastructure', 'Global cloud compute infrastructure with predictable, transparent pricing.', 'https://vultr.com', 6, 'Buy Vultr Cloud Account', 'Vultr cloud compute accounts and credit packages, delivered fast.'),
('linode', 'Linode (Akamai)', 'Buy Linode Cloud Account', 'buy-linode-cloud-account', '/logos/linode.svg', 'Cloud compute, now part of Akamai', 'Cloud compute and infrastructure services, now part of Akamai.', 'https://www.linode.com', 7, 'Buy Linode Cloud Account', 'Linode (Akamai) accounts and credit packages.'),
('hetzner-cloud', 'Hetzner Cloud', 'Buy Hetzner Cloud Account', 'buy-hetzner-cloud-account', '/logos/hetzner-cloud.svg', 'European cloud and server hosting', 'European cloud and dedicated server hosting provider.', 'https://www.hetzner.com', 8, 'Buy Hetzner Cloud Account', 'Hetzner Cloud accounts across a range of server tiers.'),
('ibm-cloud', 'IBM Cloud', 'Buy IBM Cloud Account', 'buy-ibm-cloud-account', '/logos/ibm-cloud.svg', 'IBM''s enterprise cloud platform', 'IBM''s enterprise cloud computing platform.', 'https://www.ibm.com/cloud', 9, 'Buy IBM Cloud Account', 'IBM Cloud accounts, including free trial and configured options.'),
('kamatera', 'Kamatera', 'Buy Kamatera Cloud Account', 'buy-kamatera-cloud-account', null, 'Cloud infrastructure with global reach', 'Cloud infrastructure provider with global data center coverage.', 'https://www.kamatera.com', 10, 'Buy Kamatera Cloud Account', 'Kamatera cloud accounts, including free trial and configured options.'),
('alibaba-cloud', 'Alibaba Cloud', 'Buy Alibaba Cloud Account', 'buy-alibaba-cloud-account', '/logos/alibaba-cloud.svg', 'Alibaba Group''s cloud platform', 'Alibaba Group''s cloud computing platform.', 'https://www.alibabacloud.com', 11, 'Buy Alibaba Cloud Account', 'Alibaba Cloud accounts for personal and business use.'),
('atlantic-net', 'Atlantic.Net', 'Buy Atlantic.Net Cloud Account', 'buy-atlantic-net-cloud-account', null, 'U.S.-based cloud hosting', 'U.S.-based cloud hosting provider.', 'https://www.atlantic.net', 12, 'Buy Atlantic.Net Cloud Account', 'Atlantic.Net cloud hosting accounts.');

-- Note: the AWS provider's rich landing-page `content` (and its dedicated
-- FAQs) that used to live here have been removed. /providers/aws is back to
-- a plain listing page like every other provider. The full "Buy AWS
-- Account" marketing page now lives at /cloud-accounts/buy-aws-account as a
-- standalone static page (see src/app/(site)/cloud-accounts/buy-aws-account)
-- rather than CMS-driven content, since its copy must be preserved verbatim.

-- =========================================================
-- CATEGORIES
-- =========================================================

insert into public.categories (slug, name, description, icon, sort_order, seo_title, seo_description) values
('cloud-accounts', 'Cloud Accounts', 'Ready-to-use cloud provider accounts across all major platforms.', 'Server', 1, null, 'Browse cloud accounts across AWS, Google Cloud, Azure, and more.'),
('cloud-credits', 'Cloud Credits', 'Prepaid credit packages to run workloads on your cloud platform of choice.', 'Wallet', 2, null, 'Prepaid cloud credit packages for AWS, Google Cloud, Azure, and more.'),
('managed-hosting', 'Managed Hosting', 'Fully managed compute and hosting plans, configured and ready to deploy.', 'HardDrive', 3, null, 'Managed hosting plans across leading cloud providers.'),
('dev-tool-credits', 'Dev Tool Credits', 'Credits and licenses for developer tools and SaaS platforms.', 'Wrench', 4, null, 'Credits and subscriptions for popular developer tools and platforms.');

-- =========================================================
-- PRODUCTS
-- =========================================================
-- Only slug, title, provider, category, price, and sort order are supplied
-- by the business — every other field (description, features, requirements,
-- delivery time, badges) is intentionally left at its default/blank rather
-- than invented, and can be filled in per-product from /admin/products.

insert into public.products (slug, title, provider_id, category_id, price, sort_order) values
-- Amazon Web Services
('aws-account-free-trial', 'AWS Account — Free Trial', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 15, 1),
('aws-account-8-vcpu', 'AWS Account — 8 vCPU', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 20, 2),
('aws-account-32-vcpu', 'AWS Account — 32 vCPU', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 35, 3),
('aws-account-64-vcpu', 'AWS Account — 64 vCPU', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 60, 4),
('aws-account-128-vcpu', 'AWS Account — 128 vCPU', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 100, 5),
('aws-account-256-vcpu', 'AWS Account — 256 vCPU', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 199, 6),
('aws-account-512-vcpu', 'AWS Account — 512 vCPU', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 299, 7),
('aws-account-1k-credit', 'AWS Account — $1K Credit', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-credits'), 250, 8),
('aws-account-5k-credit', 'AWS Account — $5K Credit', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-credits'), 850, 9),
('aws-account-10k-credit', 'AWS Account — $10K Credit', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-credits'), 1600, 10),
('aws-account-25k-credit', 'AWS Account — $25K Credit', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-credits'), 3500, 11),
('aws-account-100k-credit', 'AWS Account — $100K Credit', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-credits'), 9999, 12),

-- Google Cloud Platform
('google-cloud-account-300-credit', 'Google Cloud Account — $300 Credit', (select id from public.providers where slug = 'google-cloud'), (select id from public.categories where slug = 'cloud-credits'), 40, 13),
('google-cloud-account-400-credit', 'Google Cloud Account — $400 Credit', (select id from public.providers where slug = 'google-cloud'), (select id from public.categories where slug = 'cloud-credits'), 45, 14),
('google-cloud-account-1k-credit', 'Google Cloud Account — $1K Credit', (select id from public.providers where slug = 'google-cloud'), (select id from public.categories where slug = 'cloud-credits'), 180, 15),
('google-cloud-account-5k-credit', 'Google Cloud Account — $5K Credit', (select id from public.providers where slug = 'google-cloud'), (select id from public.categories where slug = 'cloud-credits'), 550, 16),
('google-cloud-account-10k-credit', 'Google Cloud Account — $10K Credit', (select id from public.providers where slug = 'google-cloud'), (select id from public.categories where slug = 'cloud-credits'), 1200, 17),
('google-cloud-account-25k-credit', 'Google Cloud Account — $25K Credit', (select id from public.providers where slug = 'google-cloud'), (select id from public.categories where slug = 'cloud-credits'), 2200, 18),

-- Microsoft Azure
('azure-account-free-trial', 'Microsoft Azure Account — Free Trial', (select id from public.providers where slug = 'azure'), (select id from public.categories where slug = 'cloud-accounts'), 18, 19),
('azure-account-pay-as-you-go', 'Microsoft Azure Account — Azure Pay As You Go', (select id from public.providers where slug = 'azure'), (select id from public.categories where slug = 'cloud-accounts'), 30, 20),
('azure-account-1k-credit', 'Microsoft Azure Account — $1K Credit', (select id from public.providers where slug = 'azure'), (select id from public.categories where slug = 'cloud-credits'), 175, 21),
('azure-account-5k-credit', 'Microsoft Azure Account — $5K Credit', (select id from public.providers where slug = 'azure'), (select id from public.categories where slug = 'cloud-credits'), 650, 22),

-- DigitalOcean
('digitalocean-account-close-port-3', 'DigitalOcean Account — Close Port 3', (select id from public.providers where slug = 'digitalocean'), (select id from public.categories where slug = 'cloud-accounts'), 20, 23),
('digitalocean-account-close-port-10', 'DigitalOcean Account — Close Port 10', (select id from public.providers where slug = 'digitalocean'), (select id from public.categories where slug = 'cloud-accounts'), 30, 24),
('digitalocean-account-open-port-10-droplet', 'DigitalOcean Account — Open Port 10 Droplet', (select id from public.providers where slug = 'digitalocean'), (select id from public.categories where slug = 'cloud-accounts'), 350, 25),
('digitalocean-account-open-port-25-droplet', 'DigitalOcean Account — Open Port 25 Droplet', (select id from public.providers where slug = 'digitalocean'), (select id from public.categories where slug = 'cloud-accounts'), 699, 26),
('digitalocean-account-open-port-100-droplet', 'DigitalOcean Account — Open Port 100 Droplet', (select id from public.providers where slug = 'digitalocean'), (select id from public.categories where slug = 'cloud-accounts'), 2000, 27),
('digitalocean-account-open-port-500-droplet', 'DigitalOcean Account — Open Port 500 Droplet', (select id from public.providers where slug = 'digitalocean'), (select id from public.categories where slug = 'cloud-accounts'), 9500, 28),
('digitalocean-account-open-port-20000-droplet', 'DigitalOcean Account — Open Port 20000 Droplet', (select id from public.providers where slug = 'digitalocean'), (select id from public.categories where slug = 'cloud-accounts'), 25000, 29),

-- Linode (Akamai)
('linode-account-100-credit', 'Linode Account — $100 Credit', (select id from public.providers where slug = 'linode'), (select id from public.categories where slug = 'cloud-credits'), 20, 30),
('linode-account-port-25-open', 'Linode Account — Port 25 Open', (select id from public.providers where slug = 'linode'), (select id from public.categories where slug = 'cloud-accounts'), 100, 31),

-- Vultr
('vultr-account-200-credit', 'Vultr Account — $200 Credit', (select id from public.providers where slug = 'vultr'), (select id from public.categories where slug = 'cloud-credits'), 22, 32),
('vultr-account-250-credit', 'Vultr Account — $250 Credit', (select id from public.providers where slug = 'vultr'), (select id from public.categories where slug = 'cloud-credits'), 25, 33),
('vultr-account-300-credit', 'Vultr Account — $300 Credit', (select id from public.providers where slug = 'vultr'), (select id from public.categories where slug = 'cloud-credits'), 30, 34),

-- Oracle Cloud
('oracle-cloud-account-new-account', 'Oracle Cloud Account — Oracle New Account', (select id from public.providers where slug = 'oracle-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 45, 35),
('oracle-cloud-account-old-account', 'Oracle Cloud Account — Oracle Old Account', (select id from public.providers where slug = 'oracle-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 65, 36),
('oracle-cloud-account-pay-as-you-go', 'Oracle Cloud Account — Oracle Pay As You Go', (select id from public.providers where slug = 'oracle-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 55, 37),
('oracle-cloud-account-upgraded', 'Oracle Cloud Account — Oracle Upgraded', (select id from public.providers where slug = 'oracle-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 90, 38),

-- Alibaba Cloud
('alibaba-cloud-account-personal', 'Alibaba Cloud Account — Alibaba Personal', (select id from public.providers where slug = 'alibaba-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 120, 39),
('alibaba-cloud-account-business', 'Alibaba Cloud Account — Alibaba Business', (select id from public.providers where slug = 'alibaba-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 220, 40),

-- IBM Cloud
('ibm-cloud-account-free-trial', 'IBM Cloud Account — Free Trial', (select id from public.providers where slug = 'ibm-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 25, 41),
('ibm-cloud-account-port-25-open', 'IBM Cloud Account — Port 25 Open', (select id from public.providers where slug = 'ibm-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 80, 42),

-- Hetzner Cloud
('hetzner-cloud-account-5-servers', 'Hetzner Cloud Account — Hetzner 5 Servers', (select id from public.providers where slug = 'hetzner-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 40, 43),
('hetzner-cloud-account-10-servers', 'Hetzner Cloud Account — Hetzner 10 Servers', (select id from public.providers where slug = 'hetzner-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 70, 44),
('hetzner-cloud-account-old-account', 'Hetzner Cloud Account — Hetzner Old Account', (select id from public.providers where slug = 'hetzner-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 100, 45),
('hetzner-cloud-account-25-servers', 'Hetzner Cloud Account — Hetzner 25 Servers', (select id from public.providers where slug = 'hetzner-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 150, 46),
('hetzner-cloud-account-100-servers', 'Hetzner Cloud Account — Hetzner 100 Servers', (select id from public.providers where slug = 'hetzner-cloud'), (select id from public.categories where slug = 'cloud-accounts'), 750, 47),

-- Kamatera
('kamatera-account-free-trial', 'Kamatera Account — Free Trial', (select id from public.providers where slug = 'kamatera'), (select id from public.categories where slug = 'cloud-accounts'), 20, 48),
('kamatera-account-port-25-open', 'Kamatera Account — Port 25 Open', (select id from public.providers where slug = 'kamatera'), (select id from public.categories where slug = 'cloud-accounts'), 35, 49),

-- Atlantic.Net
('atlantic-net-account-free-trial', 'Atlantic.Net Account — Free Trial', (select id from public.providers where slug = 'atlantic-net'), (select id from public.categories where slug = 'cloud-accounts'), 55, 50),
('atlantic-net-account-port-25-open', 'Atlantic.Net Account — Port 25 Open', (select id from public.providers where slug = 'atlantic-net'), (select id from public.categories where slug = 'cloud-accounts'), 250, 51),

-- Amazon Web Services — AI Accounts (curated variants for the /cloud-accounts/buy-aws-account catalog)
('aws-account-ai-10rpm-32vcpu-nvirginia', 'AWS Account — 10 RPM | 32 vCPU | Gmail | N. Virginia | 2FA + API', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 70, 52),
('aws-account-ai-50rpm-kiro-32vcpu', 'AWS Account — 50 RPM | Kiro Working | 32 vCPU | Gmail | 2FA + API', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 220, 53),
('aws-account-ai-10krpm-5vcpu-aged', 'AWS Account — 10K RPM | 4.6 Support | 5 vCPU | Multi-Year Aged', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 220, 54),
('aws-account-ai-10krpm-96vcpu-aged', 'AWS Account — 10K RPM | 4.6 Support | 96 vCPU | Multi-Year Aged', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 350, 55),
('aws-account-ai-10krpm-128vcpu-aged', 'AWS Account — 10K RPM | 4.6 Support | 128 vCPU | Multi-Year Aged', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 850, 56),
('aws-account-ai-10krpm-256vcpu-aged', 'AWS Account — 10K RPM | 4.6 Support | 256 vCPU | Multi-Year Aged', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 900, 57),
('aws-account-ai-cloud-platform-384vcpu', 'AWS Account — Cloud Platform Working | 384 vCPU | Bedrock Not Included', (select id from public.providers where slug = 'aws'), (select id from public.categories where slug = 'cloud-accounts'), 4500, 58);

-- Spotlight one entry-level product per major provider on the homepage.
-- Change anytime from /admin/products.
update public.products set is_featured = true
where slug in (
  'aws-account-free-trial',
  'google-cloud-account-300-credit',
  'azure-account-free-trial',
  'digitalocean-account-close-port-3',
  'vultr-account-200-credit',
  'oracle-cloud-account-new-account'
);

-- =========================================================
-- FAQS (general, site-wide)
-- =========================================================

insert into public.faqs (question, answer, category, sort_order) values
('How fast will I receive my order?', 'Most orders are delivered within 2–8 hours during business hours. Delivery time is shown on each product page and confirmed when we get in touch on Telegram.', 'Delivery', 1),
('How do I complete a purchase?', 'Click "Buy Now" on any product page — this opens a chat with our team on Telegram, where we confirm details and complete the order together.', 'Ordering', 2),
('What happens if something doesn''t work as expected?', 'Every order includes a replacement window (shown on the product page). Contact us on Telegram with your order details and we''ll make it right.', 'Support', 3),
('Do you take custom or bulk orders?', 'Yes — message us on Telegram or use the contact page for bulk or custom requests and we''ll put together a quote.', 'Ordering', 4);

-- =========================================================
-- ARTICLES
-- =========================================================

insert into public.articles (slug, title, excerpt, content, author_name, category, tags, status, published_at, related_product_ids, seo_title, seo_description) values
('how-to-choose-a-cloud-provider', 'How to Choose the Right Cloud Provider for Your Project',
  'A practical framework for comparing AWS, Google Cloud, Azure, and smaller providers.',
  E'# How to Choose the Right Cloud Provider\n\nChoosing a cloud provider comes down to three things: workload fit, budget, and ecosystem. This guide walks through a simple framework to evaluate AWS, Google Cloud, Azure, and smaller providers like DigitalOcean or Vultr for your specific project.\n\n## 1. Start with workload fit\n\nIf you''re running containerized workloads, most major providers work well. If you need specific managed services (like BigQuery or DynamoDB), that narrows the choice quickly.\n\n## 2. Consider your budget\n\nSmaller providers are often more predictable and cheaper for simple compute needs, while hyperscalers offer more depth at a higher cost.\n\n## 3. Factor in your team''s existing experience\n\nThe fastest path to production is usually the platform your team already knows.',
  'CloudCreda Team', 'Guides', array['comparison', 'getting-started'], 'published', now(),
  array[(select id from public.products where slug = 'aws-account-free-trial'), (select id from public.products where slug = 'google-cloud-account-300-credit')],
  'How to Choose the Right Cloud Provider', 'A practical framework for comparing cloud providers before you buy.'),

('getting-the-most-from-cloud-credits', 'Getting the Most From Your Cloud Credit Package',
  'Tips for stretching prepaid cloud credits further across dev, staging, and production.',
  E'# Getting the Most From Your Cloud Credit Package\n\nPrepaid cloud credits are most effective when paired with good cost hygiene. Here are a few practical habits that help credits go further.\n\n## Set budget alerts\n\nMost providers let you configure budget alerts — set these as soon as credit is applied.\n\n## Right-size your instances\n\nStart smaller than you think you need, and scale up based on real usage data.\n\n## Turn off what you''re not using\n\nDev and staging environments rarely need to run 24/7.',
  'CloudCreda Team', 'Guides', array['credits', 'cost-optimization'], 'published', now(),
  array[(select id from public.products where slug = 'aws-account-1k-credit'), (select id from public.products where slug = 'azure-account-1k-credit')],
  'Getting the Most From Cloud Credits', 'Practical tips for making prepaid cloud credits last longer.');

-- =========================================================
-- REVIEWS
-- =========================================================
-- Placeholder only — replace with a genuine customer quote via /admin/reviews
-- before launch. Leaving is_approved = false keeps it hidden from the public
-- site until you either edit or remove it.

insert into public.reviews (customer_name, customer_title, rating, quote, is_featured, is_approved, source) values
('Sample Customer', 'Placeholder — replace via /admin/reviews', 5, 'Replace this with a genuine customer quote from the admin dashboard before launch.', true, false, 'Sample data');
