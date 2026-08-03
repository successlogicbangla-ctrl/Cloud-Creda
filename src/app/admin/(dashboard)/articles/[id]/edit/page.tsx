import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { updateArticle } from "@/lib/actions/admin/articles";
import type { Article } from "@/lib/types";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase!.from("articles").select("*").eq("id", id).maybeSingle();
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Edit Article" description={article.title} />
      <div className="mt-6">
        <ArticleForm article={article as Article} action={updateArticle.bind(null, id)} />
      </div>
    </div>
  );
}
