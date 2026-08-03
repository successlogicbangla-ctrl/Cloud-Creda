"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { Article } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/admin/form-utils";
import { Field, TextArea, Select, FormError } from "@/components/admin/FormFields";

export function ArticleForm({
  article,
  action,
}: {
  article?: Article;
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
          <Field label="Title" name="title" defaultValue={article?.title} required />
          <Field label="Slug" name="slug" defaultValue={article?.slug} required placeholder="how-to-choose-a-cloud-provider" />
        </div>
        <TextArea label="Excerpt" name="excerpt" defaultValue={article?.excerpt ?? ""} rows={2} />
        <TextArea
          label="Content (Markdown supported)"
          name="content"
          defaultValue={article?.content ?? ""}
          rows={16}
        />
      </section>

      <section className="card-surface space-y-4 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Author Name" name="author_name" defaultValue={article?.author_name ?? ""} />
          <Field label="Category" name="category" defaultValue={article?.category ?? ""} placeholder="Guides" />
        </div>
        <Field label="Tags (comma separated)" name="tags" defaultValue={article?.tags?.join(", ") ?? ""} />
        <Field label="Cover Image URL" name="cover_image_url" defaultValue={article?.cover_image_url ?? ""} />
        <Select label="Status" name="status" defaultValue={article?.status ?? "draft"}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">SEO</h2>
        <Field label="SEO Title" name="seo_title" defaultValue={article?.seo_title ?? ""} />
        <TextArea label="SEO Description" name="seo_description" defaultValue={article?.seo_description ?? ""} rows={2} />
      </section>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {article ? "Save Changes" : "Create Article"}
      </button>
    </form>
  );
}
