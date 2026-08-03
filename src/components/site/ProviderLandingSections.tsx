import { CheckCircle2, HelpCircle, Quote } from "lucide-react";
import type { LandingBlock, LandingSection } from "@/lib/provider-landing-content";

function BulletList({ intro, items }: { intro?: string; items: string[] }) {
  return (
    <>
      {intro && <p className="not-prose mt-4 font-semibold text-ink">{intro}</p>}
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted sm:text-base">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-accent" /> {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function Steps({ items }: { items: { label: string; text: string }[] }) {
  return (
    <ol className="not-prose mt-4 space-y-4">
      {items.map((step, i) => (
        <li key={step.label} className="flex gap-4">
          <span className="icon-tile icon-tile-a h-9 w-9 shrink-0 text-sm font-bold">{i + 1}</span>
          <p className="text-sm text-ink-muted sm:text-base">
            <span className="font-semibold text-ink">{step.label}</span> {step.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

function Testimonials({ items }: { items: { quote: string; author: string }[] }) {
  return (
    <div className="not-prose mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map((t) => (
        <div key={t.author} className="card-surface p-6">
          <Quote className="h-6 w-6 text-sky-accent/50" />
          <p className="mt-3 text-sm leading-relaxed text-ink">“{t.quote}”</p>
          <p className="mt-4 text-sm font-semibold text-ink-muted">— {t.author}</p>
        </div>
      ))}
    </div>
  );
}

function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="not-prose mt-4 space-y-4">
      {items.map((item) => (
        <div key={item.question} className="card-surface p-5">
          <p className="flex items-start gap-2.5 font-semibold text-ink">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-sky-accent" /> {item.question}
          </p>
          <div className="mt-2 space-y-2 pl-[30px]">
            {item.answer.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-muted sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Block({ block }: { block: LandingBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "subheading":
      return <h3 className="mt-6 text-lg font-bold text-ink sm:text-xl">{block.text}</h3>;
    case "bullets":
      return <BulletList intro={block.intro} items={block.items} />;
    case "steps":
      return <Steps items={block.items} />;
    case "testimonials":
      return <Testimonials items={block.items} />;
    case "faq":
      return <Faq items={block.items} />;
  }
}

export function ProviderLandingSection({ section }: { section: LandingSection }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{section.heading}</h2>
      <div className="prose prose-invert mt-4 max-w-none prose-p:text-ink-muted prose-p:leading-relaxed">
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </section>
  );
}
