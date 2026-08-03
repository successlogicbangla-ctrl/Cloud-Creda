"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { Category } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/admin/form-utils";
import { Field, TextArea, FormError } from "@/components/admin/FormFields";

export function CategoryForm({
  category,
  action,
}: {
  category?: Category;
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

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
          <Field label="Name" name="name" defaultValue={category?.name} required />
          <Field label="Slug" name="slug" defaultValue={category?.slug} required placeholder="cloud-accounts" />
        </div>
        <TextArea label="Description" name="description" defaultValue={category?.description ?? ""} rows={3} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Icon (lucide-react icon name)"
            name="icon"
            defaultValue={category?.icon ?? ""}
            placeholder="Server"
          />
          <Field label="Sort Order" name="sort_order" type="number" defaultValue={category?.sort_order ?? 0} />
        </div>
        <Field label="Image URL" name="image_url" defaultValue={category?.image_url ?? ""} />
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">SEO</h2>
        <Field label="SEO Title" name="seo_title" defaultValue={category?.seo_title ?? ""} />
        <TextArea label="SEO Description" name="seo_description" defaultValue={category?.seo_description ?? ""} rows={2} />
      </section>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {category ? "Save Changes" : "Create Category"}
      </button>
    </form>
  );
}
