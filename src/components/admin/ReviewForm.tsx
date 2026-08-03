"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { Product, Review } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/admin/form-utils";
import { Field, TextArea, Select, Checkbox, FormError } from "@/components/admin/FormFields";

export function ReviewForm({
  review,
  products,
  action,
}: {
  review?: Review;
  products: Product[];
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
        <p className="alert-warning !text-xs">
          Only publish reviews from real customers. Approving a review makes it visible on the public site.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Customer Name" name="customer_name" defaultValue={review?.customer_name} required />
          <Field label="Customer Title / Company" name="customer_title" defaultValue={review?.customer_title ?? ""} />
        </div>
        <TextArea label="Quote" name="quote" defaultValue={review?.quote} rows={3} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Rating (1-5)" name="rating" type="number" defaultValue={review?.rating ?? 5} required />
          <Field label="Avatar URL" name="avatar_url" defaultValue={review?.avatar_url ?? ""} />
          <Field label="Source (e.g. Telegram, email)" name="source" defaultValue={review?.source ?? ""} />
        </div>
        <Select label="Related Product (optional)" name="product_id" defaultValue={review?.product_id ?? ""}>
          <option value="">— None —</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </Select>
        <div className="flex items-center gap-6">
          <Checkbox label="Featured on homepage" name="is_featured" defaultChecked={review?.is_featured ?? false} />
          <Checkbox label="Approved (visible on site)" name="is_approved" defaultChecked={review?.is_approved ?? false} />
        </div>
      </section>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {review ? "Save Changes" : "Create Review"}
      </button>
    </form>
  );
}
