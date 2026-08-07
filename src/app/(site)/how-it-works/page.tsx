import type { Metadata } from "next";
import Link from "next/link";
import { Search, MessageCircle, PackageCheck, LifeBuoy, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TELEGRAM_URL } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How ordering on CloudCreda works, from browsing the catalog to receiving your order.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    icon: Search,
    title: "1. Browse the catalog",
    description:
      "Use categories, providers, or search to find the right cloud account, credit package, or service. Every product page lists pricing, what's included, requirements, and delivery time up front.",
  },
  {
    icon: MessageCircle,
    title: "2. Message us on Telegram",
    description:
      "Tap \"Buy Now\" on any product to open a chat with our team. We'll confirm the details of your order and answer any questions before anything is finalized.",
  },
  {
    icon: PackageCheck,
    title: "3. Receive your order",
    description:
      "Once confirmed, your order is delivered within the stated delivery window — most orders within 2–8 hours.",
  },
  {
    icon: LifeBuoy,
    title: "4. Get support if you need it",
    description:
      "Every order includes a replacement window. If something isn't working as expected, message us on Telegram with your order details.",
  },
];

export default async function HowItWorksPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />
      <div className="mx-auto mt-6 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">How It Works</h1>
        <p className="mt-4 text-ink-muted">
          No cart, no automated checkout — every order is confirmed and delivered by a real person on our team.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-2xl space-y-8">
        {steps.map((step) => (
          <div key={step.title} className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
              <step.icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-semibold text-ink">{step.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-line bg-card p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-semibold text-ink">Ready to browse the catalog?</h2>
          <p className="mt-1 text-sm text-ink-muted">See every product across all providers.</p>
        </div>
        <Link href="/products" className="btn-primary shrink-0">
          Browse Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Prefer to ask first?{" "}
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-accent-blue">
          Message us on Telegram
        </a>
        .
      </p>
    </div>
  );
}
