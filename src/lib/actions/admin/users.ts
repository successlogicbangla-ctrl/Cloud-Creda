"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResult } from "./form-utils";

const inviteSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  role: z.enum(["admin", "editor"]),
});

export async function inviteStaffUser(formData: FormData): Promise<ActionResult> {
  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const adminClient = createAdminClient();
  if (!adminClient) {
    return {
      success: false,
      error: "Inviting users requires SUPABASE_SERVICE_ROLE_KEY to be set in your server environment.",
    };
  }

  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(parsed.data.email);
  if (error) return { success: false, error: error.message };

  if (data.user) {
    const { error: profileError } = await adminClient
      .from("profiles")
      .update({ role: parsed.data.role })
      .eq("id", data.user.id);
    if (profileError) return { success: false, error: profileError.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateUserRole(id: string, role: "admin" | "editor" | "customer"): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Supabase is not connected." };

  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/users");
  return { success: true };
}
