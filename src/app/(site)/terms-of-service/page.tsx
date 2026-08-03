import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms-of-service" },
};

export default async function TermsOfServicePage() {
  const settings = await getSiteSettings();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <div className="prose prose-invert mx-auto mt-6 max-w-3xl prose-headings:font-bold prose-headings:text-ink prose-p:text-ink-muted prose-a:text-accent-blue prose-strong:text-ink prose-li:text-ink-muted">
        <h1>Terms of Service</h1>
        <ReactMarkdown>{settings.terms_of_service ?? "Terms of service content coming soon."}</ReactMarkdown>
      </div>
    </div>
  );
}
