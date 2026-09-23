import { PageFade } from "@/components/page-fade";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { getDictionary } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { locales, localePath, navRoutes } from "@/lib/routes";
import { siteGraph } from "@/lib/schema";
import { rootMetadata } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "../globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const reading = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const ui = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  return rootMetadata(await resolveLocale(params));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4efe4",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const nav = navRoutes.map((route) => ({
    href: localePath(locale, route),
    label: dict.chrome[route],
  }));

  return (
    <html
      lang={locale}
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${heading.variable} ${reading.variable} ${ui.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <ScrollToTop />
        <a className="skip-link" href="#content">
          {dict.chrome.skip}
        </a>
        <SiteHeader
          locale={locale}
          chrome={dict.chrome}
          nav={nav}
          buyHref={localePath(locale, "buy")}
        />
        <PageFade>{children}</PageFade>
        <SiteFooter locale={locale} chrome={dict.chrome} footer={dict.footer} />
        <JsonLd data={siteGraph(locale)} />
      </body>
    </html>
  );
}
