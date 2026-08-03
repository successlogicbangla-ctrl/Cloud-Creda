import { createClient } from "@/lib/supabase/server";
import { mockHomepageSections, mockSiteSettings } from "@/lib/mock-data";
import type { HomepageSection, SiteSettings } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  if (!supabase) return mockSiteSettings;

  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw new Error(`Failed to load site settings: ${error.message}`);
  return data ?? mockSiteSettings;
}

export async function getHomepageSections(): Promise<HomepageSection[]> {
  const supabase = await createClient();
  if (!supabase) return mockHomepageSections.filter((s) => s.is_active);

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load homepage sections: ${error.message}`);
  return data ?? [];
}

export function getHomepageSection(
  sections: HomepageSection[],
  key: string
): HomepageSection | undefined {
  return sections.find((s) => s.section_key === key);
}
