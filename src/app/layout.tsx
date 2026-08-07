import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Production domain — never localhost, even if NEXT_PUBLIC_SITE_URL isn't set
// in the deploy environment. This only resolves relative canonical/OG URLs
// against the right base; it doesn't change any page's canonical path itself.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcreda.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CloudCreda — Cloud Accounts, Credits & Digital Services",
    template: "%s | CloudCreda",
  },
  description:
    "A modern marketplace for cloud accounts, credits, and digital services across every major provider.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">{children}</body>
    </html>
  );
}
