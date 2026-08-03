"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { Faq, Product, Provider } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/admin/form-utils";
import { Field, TextArea, Select, Checkbox, FormError } from "@/components/admin/FormFields";

export function FaqForm({
  faq,
  products,
  providers,
  action,
}: {
  faq?: Faq;
  products: Product[];
  providers: Provider[];
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
        <Field label="Question" name="question" defaultValue={faq?.question} required />
        <TextArea label="Answer" name="answer" defaultValue={faq?.answer} rows={4} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Product (leave blank unless product-specific)" name="product_id" defaultValue={faq?.product_id ?? ""}>
            <option value="">— None —</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </Select>
          <Select label="Provider (leave blank unless provider-specific)" name="provider_id" defaultValue={faq?.provider_id ?? ""}>
            <option value="">— None —</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </div>
        <p className="text-xs text-ink-muted">
          Leave both blank for a general FAQ shown on the homepage and /faq. Set a product OR provider to scope
          this FAQ to that page instead.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Category (e.g. Delivery, Ordering)" name="category" defaultValue={faq?.category ?? ""} />
          <Field label="Sort Order" name="sort_order" type="number" defaultValue={faq?.sort_order ?? 0} />
        </div>
        <Checkbox label="Active" name="is_active" defaultChecked={faq?.is_active ?? true} />
      </section>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {faq ? "Save Changes" : "Create FAQ"}
      </button>
    </form>
  );
}
