import type { Metadata } from "next";
import { ShieldCheck, Users, Zap, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings } from "@/lib/data/settings";
import { TELEGRAM_URL } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn what CloudCreda is, how we work, and why customers trust us for cloud accounts and services.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Honest Listings",
    description: "Every product page states exactly what's included, what's required, and how delivery works — no vague promises.",
  },
  {
    icon: Users,
    title: "Real Human Support",
    description: "Orders are confirmed and supported by our team directly on Telegram, not an automated bot.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "We aim to confirm and deliver most orders within hours, with delivery windows shown per product.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div className="mx-auto mt-6 max-w-2xl text-center">
        <span className="section-eyebrow">About Us</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          A modern marketplace for cloud accounts, credits & digital services
        </h1>
        <p className="mt-4 text-ink-muted">
          {settings.site_name} exists to make finding and ordering cloud accounts, credit packages, and digital
          services simple and transparent — with a real team behind every order.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <SectionHeading eyebrow="Our Approach" title="How we operate" align="left" />
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          We maintain a curated catalog across major cloud providers, keep pricing and availability current, and
          handle every order personally over Telegram rather than through an automated checkout. That means you
          can ask questions before you buy, get help if something isn&apos;t right, and know exactly who you&apos;re dealing
          with.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="card-surface p-6">
            <value.icon className="h-6 w-6 text-accent-blue" />
            <h3 className="mt-4 font-semibold text-ink">{value.title}</h3>
            <p className="mt-1.5 text-sm text-ink-muted">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-primary-dark p-8 text-center text-white shadow-[var(--shadow-elevated)]">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.12]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(6,182,212,0.22), transparent 60%)" }}
        />
        <h2 className="relative text-xl font-bold">Have questions before you order?</h2>
        <p className="relative mt-2 text-white/70">
          Message our team directly — we&apos;re happy to help you choose the right product.
        </p>
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary relative mt-5">
          <MessageCircle className="h-4 w-4" /> Chat on Telegram
        </a>
      </div>
    </div>
  );
}
