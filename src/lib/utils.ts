import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Provider } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Canonical URL for a provider: its dedicated /cloud-accounts/{landing_path}
 * page when it has one, otherwise the generic /cloud-accounts/{slug} page.
 */
export function getProviderHref(provider: Pick<Provider, "slug" | "landing_path">) {
  return `/cloud-accounts/${provider.landing_path ?? provider.slug}`;
}

export function formatPrice(price: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
