import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import type { Locale, RouteKey } from "@/lib/routes";
import { localePath } from "@/lib/routes";
import { absoluteUrl, bookFacts, siteUrl } from "@/lib/site";

export function buildMetadata(
  locale: Locale,
  route: RouteKey,
  title: string,
  description: string,
): Metadata {
  const path = localePath(locale, route);
  const en = absoluteUrl(localePath("en", route));
  const ru = absoluteUrl(localePath("ru", route));

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: {
        en,
        ru,
        "x-default": en,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Francesca de Bardin",
      locale: locale === "en" ? "en_US" : "ru_RU",
      alternateLocale: locale === "en" ? ["ru_RU"] : ["en_US"],
      type: "website",
      images: [
        {
          url: bookFacts.hero.src,
          width: bookFacts.hero.width,
          height: bookFacts.hero.height,
          alt: getDictionary(locale).heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [bookFacts.hero.src],
    },
  };
}

export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.home.metaTitle,
      template: "%s",
    },
    description: dict.home.metaDescription,
    applicationName: "Francesca de Bardin",
    authors: [{ name: "Francesca de Bardin", url: siteUrl }],
    creator: "Francesca de Bardin",
    publisher: "Francesca de Bardin",
    category: "Books",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...buildMetadata(locale, "home", dict.home.metaTitle, dict.home.metaDescription),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}
