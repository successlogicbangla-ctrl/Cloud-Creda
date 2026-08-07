"use client";

import { useState, useTransition } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { updateSiteSettings } from "@/lib/actions/admin/settings";
import { Field, TextArea, FormError } from "@/components/admin/FormFields";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const result = await updateSiteSettings(formData);
      if (!result.success) setError(result.error);
      else setSaved(true);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <FormError error={error} />

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Site Identity</h2>
        <Field label="Site Name" name="site_name" defaultValue={settings.site_name} required />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Logo URL" name="logo_url" defaultValue={settings.logo_url ?? ""} />
          <Field label="Favicon URL" name="favicon_url" defaultValue={settings.favicon_url ?? ""} />
        </div>
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Contact</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Default Telegram Link"
            name="default_telegram_link"
            defaultValue={settings.default_telegram_link ?? ""}
            placeholder="https://t.me/CloudCredaSupport"
          />
          <Field label="Support Email" name="support_email" defaultValue={settings.support_email ?? ""} />
        </div>
        <p className="text-xs text-ink-muted">
          Used as the destination for Buy Now clicks on products that don&apos;t have their own Telegram link set.
        </p>
      </section>

      <section className="card-surface space-y-4 p-6">
        <h2 className="font-semibold text-ink">Legal Pages</h2>
        <TextArea label="Privacy Policy (Markdown supported)" name="privacy_policy" defaultValue={settings.privacy_policy ?? ""} rows={6} />
        <TextArea label="Terms of Service (Markdown supported)" name="terms_of_service" defaultValue={settings.terms_of_service ?? ""} rows={6} />
        <TextArea label="Refund & Delivery Policy (Markdown supported)" name="refund_policy" defaultValue={settings.refund_policy ?? ""} rows={6} />
      </section>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Settings
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
