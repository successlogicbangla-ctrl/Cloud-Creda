import { createClient } from "@/lib/supabase/server";
import { mockCategories } from "@/lib/mock-data";
import type { Category } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  if (!supabase) return mockCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  if (!supabase) return mockCategories.find((c) => c.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load category: ${error.message}`);
  return data;
}
