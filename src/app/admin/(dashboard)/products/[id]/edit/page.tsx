import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "@/lib/actions/admin/products";
import type { Category, Product, Provider } from "@/lib/types";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }, { data: providers }] = await Promise.all([
    supabase!.from("products").select("*").eq("id", id).maybeSingle(),
    supabase!.from("categories").select("*").order("sort_order"),
    supabase!.from("providers").select("*").order("sort_order"),
  ]);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, id);

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Edit Product" description={product.title} />
      <div className="mt-6">
        <ProductForm
          product={product as Product}
          categories={(categories ?? []) as Category[]}
          providers={(providers ?? []) as Provider[]}
          action={boundUpdate}
        />
      </div>
    </div>
  );
}
