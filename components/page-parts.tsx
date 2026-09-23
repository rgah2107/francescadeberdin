import type { Dictionary } from "@/content/types";
import type { Locale, RouteKey } from "@/lib/routes";
import { localePath } from "@/lib/routes";
import Link from "next/link";
import { Ornament } from "@/components/ornament";

export function Breadcrumb({
  locale,
  label,
  home,
  crumb,
}: {
  locale: Locale;
  label: string;
  home: string;
  crumb: string;
}) {
  return (
    <nav aria-label={label} className="font-interface text-lg text-ink-soft">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={localePath(locale, "home")} className="text-teal-deep underline underline-offset-4">
            {home}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{crumb}</li>
      </ol>
    </nav>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title mt-3">{title}</h1>
      <Ornament />
      <p className="lead">{lead}</p>
    </header>
  );
}

export function CtaBand({
  locale,
  cta,
}: {
  locale: Locale;
  cta: Dictionary["buyCta"];
}) {
  return (
    <aside className="frame mt-16 px-6 py-8 text-center md:px-10">
      <h2 className="font-heading text-4xl">{cta.title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-ink-soft">{cta.text}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link className="btn btn-primary w-full sm:w-auto" href={localePath(locale, "buy")}>
          {cta.button}
        </Link>
        <Link className="btn btn-secondary w-full sm:w-auto" href={localePath(locale, "book")}>
          {cta.secondary}
        </Link>
      </div>
    </aside>
  );
}

const labelsFor = (chrome: Dictionary["chrome"]): Record<RouteKey, string> => ({
  home: chrome.home,
  about: chrome.about,
  book: chrome.book,
  faq: chrome.faq,
  buy: chrome.buy,
});

export function Continue({
  locale,
  title,
  chrome,
  routes,
}: {
  locale: Locale;
  title: string;
  chrome: Dictionary["chrome"];
  routes: RouteKey[];
}) {
  const labels = labelsFor(chrome);
  return (
    <nav className="mt-14" aria-label={title}>
      <h2 className="font-heading text-3xl">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {routes.map((route) => (
          <li key={route}>
            <Link className="btn btn-secondary" href={localePath(locale, route)}>
              {labels[route]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
