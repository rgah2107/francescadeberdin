export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://francescadeberdin.com"
).replace(/\/$/, "");

export const bookFacts = {
  isbn: "978-5-0064-8702-4",
  year: "2024",
  publisher: "Ridero",
  hero: {
    src: "/images/francesca-de-bardin-hero.png",
    width: 2172,
    height: 724,
  },
} as const;

export function absoluteUrl(path: string): string {
  if (path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
