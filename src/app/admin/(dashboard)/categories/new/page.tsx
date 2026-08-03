import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { createCategory } from "@/lib/actions/admin/categories";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Add Category" />
      <div className="mt-6">
        <CategoryForm action={createCategory} />
      </div>
    </div>
  );
}
