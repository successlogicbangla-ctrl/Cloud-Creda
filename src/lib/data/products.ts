import { createClient } from "@/lib/supabase/server";
import { mockCategories, mockProducts, mockProviders } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

export interface ProductFilters {
  search?: string;
  categorySlug?: string;
  providerSlug?: string;
  featuredOnly?: boolean;
  sort?: "featured" | "price_asc" | "price_desc" | "newest";
  limit?: number;
}

function attachRelations(product: Product): Product {
  return {
    ...product,
    provider: mockProviders.find((p) => p.id === product.provider_id) ?? null,
    category: mockCategories.find((c) => c.id === product.category_id) ?? null,
  };
}

function filterMockProducts(filters: ProductFilters): Product[] {
  let items = mockProducts.filter((p) => p.is_active).map(attachRelations);

  if (filters.categorySlug) {
    items = items.filter((p) => p.category?.slug === filters.categorySlug);
  }
  if (filters.providerSlug) {
    items = items.filter((p) => p.provider?.slug === filters.providerSlug);
  }
  if (filters.featuredOnly) {
    items = items.filter((p) => p.is_featured);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.provider?.name.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case "price_asc":
      items = [...items].sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      items = [...items].sort((a, b) => b.price - a.price);
      break;
    default:
      items = [...items].sort((a, b) => a.sort_order - b.sort_order);
  }

  return filters.limit ? items.slice(0, filters.limit) : items;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = await createClient();
  if (!supabase) return filterMockProducts(filters);

  let query = supabase
    .from("products")
    .select("*, provider:providers(*), category:categories(*)")
    .eq("is_active", true);

  if (filters.categorySlug) {
    query = query.eq("category.slug", filters.categorySlug);
  }
  if (filters.providerSlug) {
    query = query.eq("provider.slug", filters.providerSlug);
  }
  if (filters.featuredOnly) {
    query = query.eq("is_featured", true);
  }
  if (filters.search) {
    query = query.textSearch("search_vector", filters.search, { type: "websearch" });
  }

  switch (filters.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("sort_order", { ascending: true });
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to load products: ${error.message}`);
  return (data ?? []) as unknown as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  if (!supabase) {
    const found = mockProducts.find((p) => p.slug === slug);
    return found ? attachRelations(found) : null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, provider:providers(*), category:categories(*), images:product_images(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data as unknown as Product | null;
}

export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const all = await getProducts({ categorySlug: product.category?.slug, limit: limit + 1 });
  return all.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return getProducts({ featuredOnly: true, limit });
}
