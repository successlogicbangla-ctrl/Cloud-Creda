import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { createReview } from "@/lib/actions/admin/reviews";
import type { Product } from "@/lib/types";

export default async function NewReviewPage() {
  const supabase = await createClient();
  const { data: products } = await supabase!.from("products").select("id, title").order("title");

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Add Review" />
      <div className="mt-6">
        <ReviewForm products={(products ?? []) as Product[]} action={createReview} />
      </div>
    </div>
  );
}
