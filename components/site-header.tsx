"use client";

import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/routes";
import { isLocale } from "@/lib/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };
type Theme = "light" | "dark";

const THEME_KEY = "theme";
const LOCALE_KEY = "locale";

function readTheme(): Theme {
  return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

export function SiteHeader({
  locale,
  chrome,
  nav,
  buyHref,
}: {
  locale: Locale;
  chrome: Dictionary["chrome"];
  nav: NavItem[];
  buyHref: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const rest = pathname.replace(/^\/(en|ru)/, "") || "";

  useEffect(() => {
    const savedTheme = readTheme();
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const savedLocale = localStorage.getItem(LOCALE_KEY);
    if (
      (pathname === "/en" || pathname === "/ru") &&
      isLocale(savedLocale ?? "") &&
      savedLocale !== locale
    ) {
      router.replace(`/${savedLocale}`);
    }
  }, [locale, pathname, router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function chooseLocale(next: Locale) {
    localStorage.setItem(LOCALE_KEY, next);
  }

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <header className="border-b border-line bg-paper md:sticky md:top-0 md:z-40">
      <div className="h-1 bg-sky" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-start sm:justify-between md:px-8">
        <div>
          <Link href={`/${locale}`} className="text-ink no-underline">
            <span className="block font-heading text-4xl leading-none">{chrome.wordmark}</span>
            <span className="mt-1 block font-heading text-3xl italic leading-none text-gold">{chrome.series}</span>
          </Link>
          <nav className="mt-2 hidden flex-wrap items-center gap-x-5 sm:flex" aria-label={chrome.navLabel}>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:pt-1">
          <div className="flex items-center gap-3">
            <nav aria-label={chrome.languageLabel} className="flex items-center gap-3 font-interface text-lg">
              <Link
                href={`/en${rest}`}
                hrefLang="en"
                lang="en"
                aria-current={locale === "en" ? "true" : undefined}
                className={locale === "en" ? "font-bold underline decoration-gold decoration-2 underline-offset-4" : "underline-offset-4 hover:underline"}
                onClick={() => chooseLocale("en")}
              >
                English
              </Link>
              <span aria-hidden="true" className="text-gold">
                ·
              </span>
              <Link
                href={`/ru${rest}`}
                hrefLang="ru"
                lang="ru"
                aria-current={locale === "ru" ? "true" : undefined}
                className={locale === "ru" ? "font-bold underline decoration-gold decoration-2 underline-offset-4" : "underline-offset-4 hover:underline"}
                onClick={() => chooseLocale("ru")}
              >
                Русский
              </Link>
            </nav>
            <button
              type="button"
              className="btn btn-secondary min-h-11 px-4 py-2"
              aria-pressed={theme === "dark"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? chrome.themeToLight : chrome.themeToDark}
            </button>
          </div>
          <Link className="btn btn-primary no-print min-h-11 px-4 py-2" href={buyHref}>
            {chrome.buy}
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-secondary hide-from-sm w-full"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? chrome.close : chrome.menu}
        </button>
        {open ? (
          <nav className="hide-from-sm mt-1 flex w-full flex-col border-t border-line pt-2" aria-label={chrome.navLabel}>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link py-3 text-xl"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
