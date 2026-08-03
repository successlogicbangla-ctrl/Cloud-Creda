import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Refund & Delivery Policy",
  alternates: { canonical: "/refund-policy" },
};

export default async function RefundPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Refund & Delivery Policy" }]} />
      <div className="prose prose-invert mx-auto mt-6 max-w-3xl prose-headings:font-bold prose-headings:text-ink prose-p:text-ink-muted prose-a:text-accent-blue prose-strong:text-ink prose-li:text-ink-muted">
        <h1>Refund & Delivery Policy</h1>
        <ReactMarkdown>{settings.refund_policy ?? "Refund and delivery policy content coming soon."}</ReactMarkdown>
      </div>
    </div>
  );
}
