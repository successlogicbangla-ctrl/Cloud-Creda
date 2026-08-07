import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Google Analytics 4 measurement ID — loaded globally below via next/script
// (official Next.js App Router pattern) so every page reports page views.
const GA_MEASUREMENT_ID = "G-2H1XL5WFEP";

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
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
