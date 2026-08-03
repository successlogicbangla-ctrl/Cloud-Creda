"use server";

import { createClient } from "@/lib/supabase/server";
import type { LeadEventType } from "@/lib/types";

interface CreateLeadInput {
  productId?: string | null;
  eventType: LeadEventType;
  name?: string;
  email?: string;
  message?: string;
  referrer?: string;
}

/**
 * Logs a lead event (Buy Now click, contact form, newsletter signup) so the
 * admin dashboard has demand analytics even though purchases are completed
 * manually on Telegram rather than through an on-site checkout.
 * Fails silently (returns false) when no Supabase project is connected so it
 * never blocks the Buy Now -> Telegram redirect during local development.
 */
export async function createLead(input: CreateLeadInput): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;

  const { error } = await supabase.from("leads").insert({
    product_id: input.productId ?? null,
    event_type: input.eventType,
    name: input.name ?? null,
    email: input.email ?? null,
    message: input.message ?? null,
    referrer: input.referrer ?? null,
  });

  return !error;
}
