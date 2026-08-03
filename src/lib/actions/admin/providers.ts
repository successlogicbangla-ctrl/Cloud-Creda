"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { providerSchema } from "@/lib/validations/admin";
import { formToObject, parseLines, parsePipeList, parseTags, type ActionResult } from "./form-utils";

/**
 * Splits the flat provider form fields into the base `providers` columns
 * plus an assembled `content` jsonb object (optional landing-page content,
 * e.g. a dedicated "Buy AWS Account" page). Sections are only included when
 * the admin has actually filled them in, so unrelated providers keep an
 * empty `content` and render the plain listing page unchanged.
 */
function splitProviderFields(data: Record<string, unknown>) {
  const {
    content_hero_subtitle,
    content_details,
    content_why_choose,
    content_what_you_receive,
    content_what_is_body,
    content_benefits,
    content_why_cloudcreda,
    content_tags,
    ...providerFields
  } = data as Record<string, string | undefined>;

  const content: Record<string, unknown> = {};
  if (content_hero_subtitle) content.hero_subtitle = content_hero_subtitle;
  if (content_details) content.details = parseLines(content_details);
  if (content_why_choose) content.why_choose = parsePipeList(content_why_choose, ["title", "description"]);
  if (content_what_you_receive)
    content.what_you_receive = parsePipeList(content_what_you_receive, ["title", "description"]);
  if (content_what_is_body) content.what_is_body = content_what_is_body;
  if (content_benefits) content.benefits = parsePipeList(content_benefits, ["title", "description", "icon"]);
  if (content_why_cloudcreda)
    content.why_cloudcreda = parsePipeList(content_why_cloudcreda, ["title", "description", "icon"]);
  if (content_tags) content.tags = parseTags(content_tags);

  return { ...providerFields, content };
}

export async function createProvider(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const parsed = providerSchema.safeParse(formToObject(formData, ["is_active"]));
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { error } = await supabase.from("providers").insert(splitProviderFields(parsed.data));
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/providers");
  revalidatePath("/cloud-accounts");
  redirect("/admin/providers");
}

export async function updateProvider(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const parsed = providerSchema.safeParse(formToObject(formData, ["is_active"]));
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { error } = await supabase.from("providers").update(splitProviderFields(parsed.data)).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/providers");
  revalidatePath("/cloud-accounts");
  revalidatePath(`/cloud-accounts/${parsed.data.slug}`);
  redirect("/admin/providers");
}

export async function deleteProvider(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const { error } = await supabase.from("providers").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/providers");
  revalidatePath("/cloud-accounts");
  return { success: true };
}
