import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import type { Lead } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const eventLabels: Record<string, string> = {
  buy_click: "Buy Now Click",
  contact_form: "Contact Form",
  newsletter_signup: "Newsletter Signup",
};

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data } = await supabase!
    .from("leads")
    .select("*, product:products(title)")
    .order("created_at", { ascending: false })
    .limit(200);

  const leads = (data ?? []) as (Lead & { product: { title: string } | null })[];

  return (
    <div>
      <AdminPageHeader title="Leads" description="Buy Now clicks and contact form submissions (most recent 200)." />
      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-white/[0.03] text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-3">
                  <span className="badge-info">{eventLabels[lead.event_type] ?? lead.event_type}</span>
                </td>
                <td className="px-4 py-3 text-ink-muted">{lead.product?.title ?? "—"}</td>
                <td className="px-4 py-3 text-ink-muted">
                  {lead.name && <p>{lead.name}</p>}
                  {lead.email && <p className="text-xs">{lead.email}</p>}
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-ink-muted">{lead.message ?? "—"}</td>
                <td className="px-4 py-3 text-ink-muted">{formatDate(lead.created_at)}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-muted">
                  No leads yet — they&apos;ll show up here as visitors click Buy Now or submit the contact form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
