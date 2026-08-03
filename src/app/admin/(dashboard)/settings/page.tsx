import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { SiteSettings } from "@/lib/types";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase!.from("site_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Site Settings" description="Site identity, contact info, and legal page content." />
      <div className="mt-6">
        <SettingsForm settings={settings as SiteSettings} />
      </div>
    </div>
  );
}
