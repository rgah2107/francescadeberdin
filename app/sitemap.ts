import type { MetadataRoute } from "next";
import { locales, localePath, routes, type RouteKey } from "@/lib/routes";
import { absoluteUrl, bookFacts } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(routes) as RouteKey[];
  const lastModified = new Date("2026-09-23");

  return keys.flatMap((key) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, key)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : key === "book" || key === "about" ? 0.8 : 0.6,
      alternates: {
        languages: {
          en: absoluteUrl(localePath("en", key)),
          ru: absoluteUrl(localePath("ru", key)),
          "x-default": absoluteUrl(localePath("en", key)),
        },
      },
      images: key === "home" ? [absoluteUrl(bookFacts.hero.src)] : undefined,
    })),
  );
}
