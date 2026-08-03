"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { updateUserRole } from "@/lib/actions/admin/users";
import type { UserRole } from "@/lib/types";

export function UserRoleSelect({ userId, role }: { userId: string; role: UserRole }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value as UserRole;
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (!result.success) window.alert(result.error);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={role}
        onChange={handleChange}
        disabled={isPending}
        className="rounded-lg border border-line bg-card px-2.5 py-1.5 text-sm text-ink focus:border-accent-blue focus:outline-none"
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="customer">Customer</option>
      </select>
      {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-ink-muted" />}
    </div>
  );
}
