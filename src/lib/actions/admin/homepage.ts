"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { parsePipeList, type ActionResult } from "./form-utils";

export async function updateHomepageSection(sectionKey: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const title = String(formData.get("title") ?? "");
  const subtitle = String(formData.get("subtitle") ?? "");

  let content: Record<string, unknown> = {};
  if (sectionKey === "why_choose_us") {
    content = { items: parsePipeList(String(formData.get("items") ?? ""), ["title", "description", "icon"]) };
  } else if (sectionKey === "how_it_works") {
    content = { steps: parsePipeList(String(formData.get("steps") ?? ""), ["title", "description"]) };
  }

  const { error } = await supabase
    .from("homepage_sections")
    .update({ title, subtitle, content })
    .eq("section_key", sectionKey);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return { success: true };
}
