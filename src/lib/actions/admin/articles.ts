"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { articleSchema } from "@/lib/validations/admin";
import { formToObject, type ActionResult } from "./form-utils";

function withPublishedAt(data: Record<string, unknown>, existingPublishedAt?: string | null) {
  if (data.status === "published" && !existingPublishedAt) {
    return { ...data, published_at: new Date().toISOString() };
  }
  return data;
}

export async function createArticle(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const parsed = articleSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { error } = await supabase.from("articles").insert(withPublishedAt(parsed.data));
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const parsed = articleSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { data: existing } = await supabase.from("articles").select("published_at").eq("id", id).maybeSingle();

  const { error } = await supabase
    .from("articles")
    .update(withPublishedAt(parsed.data, existing?.published_at))
    .eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  revalidatePath(`/articles/${parsed.data.slug}`);
  redirect("/admin/articles");
}

export async function deleteArticle(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  return { success: true };
}
