import Link from "next/link";
import { Package, Newspaper, Star, Inbox, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: publishedArticleCount }, { count: pendingReviewCount }, { count: leadCount }] =
    await Promise.all([
      supabase!.from("products").select("*", { count: "exact", head: true }),
      supabase!.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase!.from("reviews").select("*", { count: "exact", head: true }).eq("is_approved", false),
      supabase!.from("leads").select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Products", value: productCount ?? 0, icon: Package, href: "/admin/products" },
    { label: "Published Articles", value: publishedArticleCount ?? 0, icon: Newspaper, href: "/admin/articles" },
    { label: "Pending Reviews", value: pendingReviewCount ?? 0, icon: Star, href: "/admin/reviews" },
    { label: "Total Leads", value: leadCount ?? 0, icon: Inbox, href: "/admin/leads" },
  ];

  const shortcuts = [
    { label: "Add a Product", href: "/admin/products/new" },
    { label: "Write a Guide", href: "/admin/articles/new" },
    { label: "Edit Homepage Content", href: "/admin/homepage" },
    { label: "Update Site Settings", href: "/admin/settings" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">A quick overview of your catalog and activity.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card-surface card-surface-hover p-5">
            <stat.icon className="h-5 w-5 text-accent-blue" />
            <p className="mt-3 text-2xl font-bold text-ink">{stat.value}</p>
            <p className="text-sm text-ink-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 card-surface p-6">
        <h2 className="font-semibold text-ink">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center justify-between rounded-lg border border-line px-4 py-3 text-sm font-medium text-ink hover:border-accent-blue hover:text-accent-blue"
            >
              {s.label} <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
