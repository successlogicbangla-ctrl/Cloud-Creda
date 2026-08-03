"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createLead } from "@/lib/actions/leads";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    const ok = await createLead({
      eventType: "contact_form",
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    });

    setStatus(ok ? "success" : "error");
    if (ok) e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="card-surface flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        <h3 className="font-semibold text-ink">Message sent</h3>
        <p className="text-sm text-ink-muted">Thanks for reaching out — our team will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-4 p-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="glass mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm text-ink transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="glass mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm text-ink transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="glass mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm text-ink transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
        />
      </div>
      {status === "error" && (
        <p className="alert-danger">Something went wrong — please try again or message us on Telegram.</p>
      )}
      <button type="submit" disabled={status === "submitting"} className="btn-primary">
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
      </button>
    </form>
  );
}
