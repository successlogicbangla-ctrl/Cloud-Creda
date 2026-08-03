import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategories, getCategoryBySlug } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.seo_title ?? category.name,
    description: category.seo_description ?? category.description ?? undefined,
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProducts({ categorySlug: category.slug });

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories", href: "/categories" }, { label: category.name }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">{category.name}</h1>
      {category.description && <p className="mt-2 max-w-2xl text-ink-muted">{category.description}</p>}

      <div className="mt-8">
        {products.length === 0 ? (
          <EmptyState title="No products in this category yet" description="Check back soon, or browse the full catalog." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
