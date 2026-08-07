"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cloud, Menu, MessageCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TELEGRAM_URL } from "@/lib/telegram";
import { SearchBox } from "./SearchBox";

const navItems = [
  { label: "All Products", href: "/products" },
  { label: "Cloud Accounts", href: "/cloud-accounts" },
  { label: "Compare", href: "/compare" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header({ siteName }: { siteName: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "border-line bg-primary-dark/70 shadow-[0_1px_0_0_rgb(255_255_255_/_0.06),0_16px_40px_-20px_rgb(2_6_23_/_0.9)]"
          : "border-transparent bg-primary-dark/40"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-deep-blue text-white shadow-sm">
            <Cloud className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchBox className="hidden w-60 xl:block" />
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted hover:bg-white/[0.06] xl:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary hidden sm:inline-flex">
            <MessageCircle className="h-4 w-4" /> Chat on Telegram
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted hover:bg-white/[0.06] lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line px-4 py-3 xl:hidden">
          <SearchBox />
        </div>
      )}

      {mobileOpen && (
        <nav className="animate-fade-in border-t border-line px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-white/[0.06]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle className="h-4 w-4" /> Chat on Telegram
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
