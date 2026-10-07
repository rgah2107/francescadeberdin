export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const routes = {
  home: "",
  about: "about",
  book: "moscow-diary",
  faq: "questions",
  discover: "discover",
  buy: "buy",
  contact: "contact",
} as const;

export type RouteKey = keyof typeof routes;

export const navRoutes: RouteKey[] = ["home", "about", "book", "faq", "discover", "contact"];

export function localePath(_locale: Locale, route: RouteKey): string {
  const slug = routes[route];
  return slug ? `/${slug}` : "/";
}
