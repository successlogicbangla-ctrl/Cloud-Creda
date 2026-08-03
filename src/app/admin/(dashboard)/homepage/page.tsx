import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HomepageSectionForm } from "@/components/admin/HomepageSectionForm";
import type { HomepageSection } from "@/lib/types";

const sectionTitles: Record<string, string> = {
  hero: "Hero",
  why_choose_us: "Why Choose Us",
  how_it_works: "How It Works",
  final_cta: "Final CTA",
};

export default async function AdminHomepagePage() {
  const supabase = await createClient();
  const { data } = await supabase!.from("homepage_sections").select("*").order("sort_order");
  const sections = (data ?? []) as HomepageSection[];

  return (
    <div>
      <AdminPageHeader title="Homepage Content" description="Edit the copy shown in each homepage section." />
      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <div key={section.id}>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              {sectionTitles[section.section_key] ?? section.section_key}
            </h2>
            <HomepageSectionForm section={section} />
          </div>
        ))}
      </div>
    </div>
  );
}
