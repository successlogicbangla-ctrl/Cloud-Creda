"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { Provider, ProviderBenefitItem } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/admin/form-utils";
import { Field, TextArea, Checkbox, FormError } from "@/components/admin/FormFields";

function itemsToPipeLines(items?: ProviderBenefitItem[]) {
  return (items ?? []).map((i) => [i.title, i.description, i.icon].filter((v) => v !== undefined).join(" | ")).join("\n");
}

export function ProviderForm({
  provider,
  action,
}: {
  provider?: Provider;
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const content = provider?.content ?? {};

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result && !result.success) setError(result.error);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <FormError error={error} />
      <section className="card-surface space-y-4 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name (official — used in prose/alt text)" name="name" defaultValue={provider?.name} required />
          <Field label="Slug (URL — unaffected by display title)" name="slug" defaultValue={provider?.slug} required placeholder="aws" />
        </div>
        <Field
          label="Display Title (commercial/SEO title — shown on cards, H1, breadcrumbs, browser title)"
          name="display_title"
          defaultValue={provider?.display_title ?? ""}
          placeholder="Buy Amazon AWS Account"
        />
        <Field
          label="Tagline (short, one line — shown on the Cloud Accounts directory card)"
          name="tagline"
          defaultValue={provider?.tagline ?? ""}
          placeholder="Amazon's cloud computing platform"
        />
        <TextArea
          label="Description / SEO Intro (longer — shown on this provider's own page)"
          name="description"
          defaultValue={provider?.description ?? ""}
          rows={3}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Logo URL" name="logo_url" defaultValue={provider?.logo_url ?? ""} />
          <Field label="Website URL" name="website_url" defaultValue={provider?.website_url ?? ""} />
        </div>
        <div className="flex items-center gap-6">
          <Field label="Sort Order" name="sort_order" type="number" defaultValue={provider?.sort_order ?? 0} />
          <Checkbox label="Active" name="is_active" defaultChecked={provider?.is_active ?? true} />
        </div>
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">SEO</h2>
        <Field label="SEO Title" name="seo_title" defaultValue={provider?.seo_title ?? ""} />
        <TextArea label="SEO Description" name="seo_description" defaultValue={provider?.seo_description ?? ""} rows={2} />
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Landing Page Content (optional)</h2>
        <p className="text-xs text-ink-muted">
          Leave blank to keep this a plain listing page. Fill these in to add the extra landing-page sections (like
          on the AWS page) — each section only appears once it has content. Provider-specific FAQs are managed from
          the FAQs screen.
        </p>
        <Field label="Hero Subtitle" name="content_hero_subtitle" defaultValue={content.hero_subtitle ?? ""} />
        <TextArea
          label="Details (one bullet per line)"
          name="content_details"
          defaultValue={(content.details ?? []).join("\n")}
          rows={4}
        />
        <TextArea
          label={`Why Choose [Provider] Cloud Services — one per line: Title | Description`}
          name="content_why_choose"
          defaultValue={itemsToPipeLines(content.why_choose)}
          rows={4}
        />
        <TextArea
          label="What Customers Receive — one per line: Title | Description"
          name="content_what_you_receive"
          defaultValue={itemsToPipeLines(content.what_you_receive)}
          rows={4}
        />
        <TextArea
          label="'What Is [Provider]?' Body (markdown supported)"
          name="content_what_is_body"
          defaultValue={content.what_is_body ?? ""}
          rows={4}
        />
        <TextArea
          label="Benefits — one per line: Title | Description | Icon (lucide-react name)"
          name="content_benefits"
          defaultValue={itemsToPipeLines(content.benefits)}
          rows={5}
        />
        <TextArea
          label="Why Choose CloudCreda — one per line: Title | Description | Icon"
          name="content_why_cloudcreda"
          defaultValue={itemsToPipeLines(content.why_cloudcreda)}
          rows={4}
        />
        <Field
          label="SEO Tags (comma separated)"
          name="content_tags"
          defaultValue={(content.tags ?? []).join(", ")}
        />
      </section>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {provider ? "Save Changes" : "Create Provider"}
      </button>
    </form>
  );
}
