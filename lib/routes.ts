export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const routes = {
  home: "",
  about: "about",
  book: "moscow-diary",
  faq: "questions",
  buy: "buy",
  contact: "contact",
} as const;

export type RouteKey = keyof typeof routes;

export const navRoutes: RouteKey[] = ["home", "about", "book", "faq", "contact"];

export function localePath(locale: Locale, route: RouteKey): string {
  const slug = routes[route];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
