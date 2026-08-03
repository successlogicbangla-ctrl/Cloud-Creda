import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProduct } from "@/lib/actions/admin/products";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data } = await supabase!
    .from("products")
    .select("*, provider:providers(name), category:categories(name)")
    .order("sort_order", { ascending: true });

  const products = (data ?? []) as unknown as Product[];

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description={`${products.length} products`}
        newHref="/admin/products/new"
        newLabel="Add Product"
      />

      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-white/[0.03] text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{product.title}</p>
                  <p className="text-xs text-ink-muted">/{product.slug}</p>
                </td>
                <td className="px-4 py-3 text-ink-muted">{product.provider?.name ?? "—"}</td>
                <td className="px-4 py-3 text-ink-muted">{formatPrice(product.price, product.currency)}</td>
                <td className="px-4 py-3">
                  <span className={product.is_active ? "badge-success" : "badge-neutral"}>
                    {product.is_active ? "Active" : "Hidden"}
                  </span>
                  {product.is_featured && <span className="badge-info ml-1">Featured</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-white/[0.06] hover:text-ink"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deleteProduct.bind(null, product.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-muted">
                  No products yet.{" "}
                  <Link href="/admin/products/new" className="text-accent-blue">
                    Add your first product
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
