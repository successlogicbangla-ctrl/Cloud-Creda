import { createClient } from "@/lib/supabase/server";
import { mockArticles } from "@/lib/mock-data";
import type { Article } from "@/lib/types";

export async function getArticles(limit?: number): Promise<Article[]> {
  const supabase = await createClient();
  if (!supabase) {
    const items = mockArticles.filter((a) => a.status === "published");
    return limit ? items.slice(0, limit) : items;
  }

  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to load articles: ${error.message}`);
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  if (!supabase) return mockArticles.find((a) => a.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw new Error(`Failed to load article: ${error.message}`);
  return data;
}
