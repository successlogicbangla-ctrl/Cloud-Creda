"use client";

import { useState, useTransition } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { inviteStaffUser } from "@/lib/actions/admin/users";
import { FormError } from "@/components/admin/FormFields";

export function InviteUserForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(formData: FormData) {
    setError(null);
    setSent(false);
    startTransition(async () => {
      const result = await inviteStaffUser(formData);
      if (!result.success) setError(result.error);
      else setSent(true);
    });
  }

  return (
    <form action={handleSubmit} className="card-surface flex flex-col gap-3 p-6 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="invite-email" className="text-sm font-medium text-ink">
          Email address
        </label>
        <input
          id="invite-email"
          name="email"
          type="email"
          required
          placeholder="teammate@example.com"
          className="mt-1.5 w-full rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
        />
      </div>
      <div>
        <label htmlFor="invite-role" className="text-sm font-medium text-ink">
          Role
        </label>
        <select
          id="invite-role"
          name="role"
          defaultValue="editor"
          className="mt-1.5 w-full rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>
      </div>
      <button type="submit" disabled={isPending} className="btn-primary shrink-0">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
        Send Invite
      </button>
      {error && <FormError error={error} />}
      {sent && <p className="text-sm text-emerald-400">Invite sent.</p>}
    </form>
  );
}
