import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFaq } from "@/lib/actions/admin/faqs";
import type { Faq } from "@/lib/types";

export default async function AdminFaqsPage() {
  const supabase = await createClient();
  const { data } = await supabase!
    .from("faqs")
    .select("*, product:products(title), provider:providers(name)")
    .order("sort_order");
  const faqs = (data ?? []) as (Faq & { product: { title: string } | null; provider: { name: string } | null })[];

  return (
    <div>
      <AdminPageHeader title="FAQs" description={`${faqs.length} FAQs`} newHref="/admin/faqs/new" newLabel="Add FAQ" />
      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-white/[0.03] text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Scope</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="px-4 py-3 font-medium text-ink">{faq.question}</td>
                <td className="px-4 py-3 text-ink-muted">{faq.product?.title ?? faq.provider?.name ?? "General"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/faqs/${faq.id}/edit`} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-white/[0.06] hover:text-ink">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deleteFaq.bind(null, faq.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {faqs.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-ink-muted">
                  No FAQs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
