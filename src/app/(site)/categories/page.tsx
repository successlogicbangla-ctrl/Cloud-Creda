import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryCard } from "@/components/site/CategoryCard";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse cloud accounts, credits, and digital services by category.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Categories</h1>
      <p className="mt-2 text-ink-muted">Find products organized by how they&apos;re typically used.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => (
          <CategoryCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </div>
  );
}
