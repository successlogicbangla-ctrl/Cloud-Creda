"use client";

import { useState, useTransition } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import type { HomepageSection } from "@/lib/types";
import { updateHomepageSection } from "@/lib/actions/admin/homepage";
import { Field, TextArea, FormError } from "@/components/admin/FormFields";

function itemsToLines(items: { title: string; description: string; icon?: string }[] | undefined) {
  return (items ?? []).map((i) => [i.title, i.description, i.icon].filter((v) => v !== undefined).join(" | ")).join("\n");
}

export function HomepageSectionForm({ section }: { section: HomepageSection }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const content = section.content as { items?: { title: string; description: string; icon?: string }[]; steps?: { title: string; description: string }[] };

  function handleSubmit(formData: FormData) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const result = await updateHomepageSection(section.section_key, formData);
      if (!result.success) setError(result.error);
      else setSaved(true);
    });
  }

  return (
    <form action={handleSubmit} className="card-surface space-y-4 p-6">
      <FormError error={error} />
      <Field label="Title" name="title" defaultValue={section.title ?? ""} />
      <TextArea label="Subtitle" name="subtitle" defaultValue={section.subtitle ?? ""} rows={2} />

      {section.section_key === "why_choose_us" && (
        <TextArea
          label="Items — one per line: Title | Description | Icon (lucide-react name)"
          name="items"
          defaultValue={itemsToLines(content.items)}
          rows={7}
        />
      )}

      {section.section_key === "how_it_works" && (
        <TextArea
          label="Steps — one per line: Title | Description"
          name="steps"
          defaultValue={(content.steps ?? []).map((s) => `${s.title} | ${s.description}`).join("\n")}
          rows={5}
        />
      )}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Save
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
