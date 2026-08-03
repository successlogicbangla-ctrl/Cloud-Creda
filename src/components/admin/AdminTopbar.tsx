"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminTopbar({ userEmail, onMenuClick }: { userEmail: string | null; onMenuClick?: () => void }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase?.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="glass sticky top-0 z-10 flex h-16 items-center justify-between px-4 lg:px-6">
      <button type="button" onClick={onMenuClick} className="text-ink-muted lg:hidden" aria-label="Toggle menu">
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        {userEmail && <span className="hidden text-sm text-ink-muted sm:inline">{userEmail}</span>}
        <button
          type="button"
          onClick={handleSignOut}
          className="btn-ghost !px-3 !py-1.5 text-xs"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign Out
        </button>
      </div>
    </header>
  );
}
