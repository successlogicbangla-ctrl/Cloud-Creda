import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { getFaqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ordering, delivery, and support on CloudCreda.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    const key = faq.category ?? "General";
    acc[key] = acc[key] ? [...acc[key], faq] : [faq];
    return acc;
  }, {});

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <div className="mx-auto mt-6 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-ink-muted">Everything you need to know about ordering, delivery, and support.</p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-10">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold text-ink">{category}</h2>
            <div className="mt-4">
              <FaqAccordion faqs={items} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
