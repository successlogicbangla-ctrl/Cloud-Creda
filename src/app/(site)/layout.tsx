import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/data/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header siteName={settings.site_name} telegramLink={settings.default_telegram_link} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
