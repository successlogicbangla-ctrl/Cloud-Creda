import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FaqForm } from "@/components/admin/FaqForm";
import { createFaq } from "@/lib/actions/admin/faqs";
import type { Product, Provider } from "@/lib/types";

export default async function NewFaqPage() {
  const supabase = await createClient();
  const [{ data: products }, { data: providers }] = await Promise.all([
    supabase!.from("products").select("id, title").order("title"),
    supabase!.from("providers").select("*").order("name"),
  ]);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Add FAQ" />
      <div className="mt-6">
        <FaqForm
          products={(products ?? []) as Product[]}
          providers={(providers ?? []) as Provider[]}
          action={createFaq}
        />
      </div>
    </div>
  );
}
