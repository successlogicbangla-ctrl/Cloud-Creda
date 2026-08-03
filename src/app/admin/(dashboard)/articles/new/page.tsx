import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticle } from "@/lib/actions/admin/articles";

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title="Add Article" />
      <div className="mt-6">
        <ArticleForm action={createArticle} />
      </div>
    </div>
  );
}
