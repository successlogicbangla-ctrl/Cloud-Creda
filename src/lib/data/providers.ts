import { createClient } from "@/lib/supabase/server";
import { mockProviders } from "@/lib/mock-data";
import type { Provider } from "@/lib/types";

export async function getProviders(): Promise<Provider[]> {
  const supabase = await createClient();
  if (!supabase) return mockProviders;

  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load providers: ${error.message}`);
  return data ?? [];
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const supabase = await createClient();
  if (!supabase) return mockProviders.find((p) => p.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw new Error(`Failed to load provider: ${error.message}`);
  return data;
}
