import { createClient } from "@/lib/supabase/server";
import { mockFaqs } from "@/lib/mock-data";
import type { Faq } from "@/lib/types";

interface FaqScope {
  productId?: string;
  providerId?: string;
}

/**
 * Fetches FAQs scoped to a product, a provider, or neither (general,
 * site-wide FAQs shown on the homepage and /faq).
 */
export async function getFaqs(scope: FaqScope = {}): Promise<Faq[]> {
  const { productId, providerId } = scope;
  const supabase = await createClient();

  if (!supabase) {
    return mockFaqs.filter((f) => {
      if (!f.is_active) return false;
      if (productId) return f.product_id === productId;
      if (providerId) return f.provider_id === providerId;
      return !f.product_id && !f.provider_id;
    });
  }

  let query = supabase.from("faqs").select("*").eq("is_active", true).order("sort_order", { ascending: true });

  if (productId) {
    query = query.eq("product_id", productId);
  } else if (providerId) {
    query = query.eq("provider_id", providerId);
  } else {
    query = query.is("product_id", null).is("provider_id", null);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to load FAQs: ${error.message}`);
  return data ?? [];
}
