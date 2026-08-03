"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="glass divide-y divide-line overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-[1.125rem] text-left transition-colors hover:bg-white/[0.04]"
              aria-expanded={isOpen}
            >
              <span className={cn("font-medium transition-colors", isOpen ? "text-accent-blue" : "text-ink")}>
                {faq.question}
              </span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-ink-muted transition-all duration-300",
                  isOpen && "rotate-45 bg-accent-blue/20 text-sky-300"
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            {isOpen && (
              <div className="animate-fade-in px-5 pb-5 text-sm leading-relaxed text-ink-muted">{faq.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
