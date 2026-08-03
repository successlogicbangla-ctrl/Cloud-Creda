import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCategory } from "@/lib/actions/admin/categories";
import type { Category } from "@/lib/types";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase!.from("categories").select("*").order("sort_order");
  const categories = (data ?? []) as Category[];

  return (
    <div>
      <AdminPageHeader title="Categories" description={`${categories.length} categories`} newHref="/admin/categories/new" newLabel="Add Category" />
      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-white/[0.03] text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3 font-medium text-ink">{category.name}</td>
                <td className="px-4 py-3 text-ink-muted">/{category.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/categories/${category.id}/edit`} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-white/[0.06] hover:text-ink">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deleteCategory.bind(null, category.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-ink-muted">
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
