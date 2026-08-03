"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Cloud,
  Newspaper,
  HelpCircle,
  Star,
  Inbox,
  Home,
  Settings,
  Users,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Cloud Accounts", href: "/admin/providers", icon: Cloud },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Articles", href: "/admin/articles", icon: Newspaper },
      { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Homepage", href: "/admin/homepage", icon: Home },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Leads", href: "/admin/leads", icon: Inbox },
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Users", href: "/admin/users", icon: Users },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-card/60 backdrop-blur-xl lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-line px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-secondary text-white shadow-[var(--shadow-glow-blue)]">
          <Cloud className="h-4 w-4" />
        </span>
        <span className="font-bold text-ink">CloudCreda</span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group, i) => (
          <div key={i}>
            {group.title && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">{group.title}</p>
            )}
            <ul className={cn("space-y-0.5", group.title && "mt-2")}>
              {group.items.map((item) => {
                const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-accent-blue/10 text-accent-blue" : "text-ink-muted hover:bg-white/[0.06] hover:text-ink"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:bg-white/[0.06] hover:text-ink"
        >
          <ExternalLink className="h-4 w-4" /> View Site
        </Link>
      </div>
    </aside>
  );
}
