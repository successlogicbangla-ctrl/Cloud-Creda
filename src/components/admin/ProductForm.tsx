"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { Category, Product, Provider } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/admin/form-utils";
import { Field, TextArea, Select, Checkbox, FormError } from "@/components/admin/FormFields";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  providers: Provider[];
  action: (formData: FormData) => Promise<ActionResult>;
}

const badges = ["none", "popular", "hot", "best_value", "new"] as const;
const availability = ["in_stock", "limited", "out_of_stock", "preorder"] as const;

export function ProductForm({ product, categories, providers, action }: ProductFormProps) {
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
    <form action={handleSubmit} className="space-y-8">
      <FormError error={error} />

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Basics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={product?.title} required />
          <Field label="Slug" name="slug" defaultValue={product?.slug} required placeholder="aws-starter-account" />
        </div>
        <Field
          label="Short Description"
          name="short_description"
          defaultValue={product?.short_description ?? ""}
        />
        <TextArea label="Full Description" name="description" defaultValue={product?.description ?? ""} rows={5} />
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Classification</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Provider" name="provider_id" defaultValue={product?.provider_id ?? ""}>
            <option value="">— None —</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
          <Select label="Category" name="category_id" defaultValue={product?.category_id ?? ""}>
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Pricing & Availability</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Price (USD)" name="price" type="number" step="0.01" defaultValue={product?.price ?? 0} required />
          <Field
            label="Compare-at Price"
            name="compare_at_price"
            type="number"
            step="0.01"
            defaultValue={product?.compare_at_price ?? ""}
          />
          <Field label="Sort Order" name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select label="Badge" name="badge" defaultValue={product?.badge ?? "none"}>
            {badges.map((b) => (
              <option key={b} value={b}>
                {b.replace("_", " ")}
              </option>
            ))}
          </Select>
          <Select label="Availability" name="availability_status" defaultValue={product?.availability_status ?? "in_stock"}>
            {availability.map((a) => (
              <option key={a} value={a}>
                {a.replace("_", " ")}
              </option>
            ))}
          </Select>
          <Field label="Delivery Time" name="delivery_time_text" defaultValue={product?.delivery_time_text ?? ""} placeholder="2–8 hours" />
        </div>
        <div className="flex flex-wrap gap-6">
          <Checkbox label="Active (visible on site)" name="is_active" defaultChecked={product?.is_active ?? true} />
          <Checkbox label="Featured on homepage" name="is_featured" defaultChecked={product?.is_featured ?? false} />
        </div>
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Ordering</h2>
        <Field
          label="Telegram Link (overrides site default)"
          name="telegram_link"
          defaultValue={product?.telegram_link ?? ""}
          placeholder="https://t.me/CloudCredaSupport"
        />
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Details</h2>
        <TextArea label="Requirements" name="requirements" defaultValue={product?.requirements ?? ""} rows={2} />
        <TextArea
          label="What's Included (one per line)"
          name="whats_included"
          defaultValue={product?.whats_included?.join("\n") ?? ""}
          rows={4}
        />
        <TextArea
          label="Features (one per line)"
          name="features"
          defaultValue={product?.features?.join("\n") ?? ""}
          rows={4}
        />
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">SEO</h2>
        <Field label="SEO Title" name="seo_title" defaultValue={product?.seo_title ?? ""} />
        <TextArea label="SEO Description" name="seo_description" defaultValue={product?.seo_description ?? ""} rows={2} />
        <Field label="OG Image URL" name="og_image_url" defaultValue={product?.og_image_url ?? ""} />
      </section>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {product ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
