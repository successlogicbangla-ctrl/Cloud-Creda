"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export function SearchBox({
  className,
  placeholder = "Search products, providers, guides…",
  defaultValue = "",
}: {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="glass w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
      />
    </form>
  );
}
