import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/site/ContactForm";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Contact / Support",
  description: "Get in touch with the CloudCreda team via Telegram, email, or the contact form.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <div className="mx-auto mt-6 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Contact / Support</h1>
        <p className="mt-4 text-ink-muted">
          The fastest way to reach us is Telegram. You can also send a message below and we&apos;ll follow up by email.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {settings.default_telegram_link && (
          <a
            href={settings.default_telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface card-surface-hover flex items-center gap-3 p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-ink">Telegram</p>
              <p className="text-sm text-ink-muted">Fastest response, usually within minutes</p>
            </div>
          </a>
        )}
        {settings.support_email && (
          <a
            href={`mailto:${settings.support_email}`}
            className="card-surface card-surface-hover flex items-center gap-3 p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-indigo-300">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-ink">Email</p>
              <p className="text-sm text-ink-muted">{settings.support_email}</p>
            </div>
          </a>
        )}
      </div>

      <div className="mx-auto mt-10 max-w-lg">
        <ContactForm />
      </div>
    </div>
  );
}
