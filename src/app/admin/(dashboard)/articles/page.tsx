import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteArticle } from "@/lib/actions/admin/articles";
import type { Article } from "@/lib/types";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data } = await supabase!.from("articles").select("*").order("created_at", { ascending: false });
  const articles = (data ?? []) as Article[];

  return (
    <div>
      <AdminPageHeader title="Articles" description={`${articles.length} articles`} newHref="/admin/articles/new" newLabel="Add Article" />
      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-white/[0.03] text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{article.title}</p>
                  <p className="text-xs text-ink-muted">/articles/{article.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={article.status === "published" ? "badge-success" : "badge-warning"}>
                    {article.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/articles/${article.id}/edit`} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-white/[0.06] hover:text-ink">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deleteArticle.bind(null, article.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-ink-muted">
                  No articles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
