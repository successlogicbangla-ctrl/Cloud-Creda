import Link from "next/link";
import { Cloud, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Catalog",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Cloud Accounts", href: "/cloud-accounts" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Compare", href: "/compare" },
      { label: "FAQ", href: "/faq" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact / Support", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Refund & Delivery Policy", href: "/refund-policy" },
    ],
  },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="section-mesh-indigo relative mt-24 overflow-hidden border-t border-white/10">
      <div className="bg-grid-pattern absolute inset-0 opacity-20" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-accent/70 to-transparent"
        aria-hidden
      />
      <div
        className="animate-float-slow pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-sky-accent text-white shadow-sm">
                <Cloud className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-white">{settings.site_name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A modern catalog of cloud accounts, credits, and digital services — every order is confirmed
              directly with our team on Telegram.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm">
              {settings.default_telegram_link && (
                <a
                  href={settings.default_telegram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/80 transition-colors hover:border-sky-accent/40 hover:bg-white/10 hover:text-sky-accent"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on Telegram
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              )}
              {settings.support_email && (
                <a
                  href={`mailto:${settings.support_email}`}
                  className="flex items-center gap-2 text-white/60 hover:text-sky-accent"
                >
                  <Mail className="h-4 w-4" /> {settings.support_email}
                </a>
              )}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-sky-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.site_name}. All rights reserved.
          </p>
          <p>Products and services listed are provided at our discretion and subject to our policies.</p>
        </div>
      </div>
    </footer>
  );
}
