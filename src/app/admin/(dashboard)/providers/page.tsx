import Link from "next/link";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProvider } from "@/lib/actions/admin/providers";
import type { Provider } from "@/lib/types";

export default async function AdminProvidersPage() {
  const supabase = await createClient();
  const { data } = await supabase!.from("providers").select("*").order("sort_order");
  const providers = (data ?? []) as Provider[];

  return (
    <div>
      <AdminPageHeader title="Cloud Accounts" description={`${providers.length} providers`} newHref="/admin/providers/new" newLabel="Add Provider" />
      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-white/[0.03] text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td className="px-4 py-3 font-medium text-ink">{provider.name}</td>
                <td className="px-4 py-3 text-ink-muted">/{provider.slug}</td>
                <td className="px-4 py-3">
                  <span className={provider.is_active ? "badge-success" : "badge-neutral"}>
                    {provider.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/providers/${provider.id}/edit`} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-white/[0.06] hover:text-ink">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton action={deleteProvider.bind(null, provider.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {providers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-muted">
                  No providers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
