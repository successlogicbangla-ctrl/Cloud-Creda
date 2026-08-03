import { createClient } from "@/lib/supabase/server";
import { mockReviews } from "@/lib/mock-data";
import type { Review } from "@/lib/types";

export async function getReviews(featuredOnly = false, limit?: number): Promise<Review[]> {
  const supabase = await createClient();
  if (!supabase) {
    let items = mockReviews.filter((r) => r.is_approved);
    if (featuredOnly) items = items.filter((r) => r.is_featured);
    return limit ? items.slice(0, limit) : items;
  }

  let query = supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (featuredOnly) query = query.eq("is_featured", true);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to load reviews: ${error.message}`);
  return data ?? [];
}
