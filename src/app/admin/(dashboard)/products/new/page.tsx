import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/actions/admin/products";
import type { Category, Provider } from "@/lib/types";

export default async function NewProductPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: providers }] = await Promise.all([
    supabase!.from("categories").select("*").order("sort_order"),
    supabase!.from("providers").select("*").order("sort_order"),
  ]);

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Add Product" description="Create a new product listing." />
      <div className="mt-6">
        <ProductForm
          categories={(categories ?? []) as Category[]}
          providers={(providers ?? []) as Provider[]}
          action={createProduct}
        />
      </div>
    </div>
  );
}
