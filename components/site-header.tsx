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

  function setThemeChoice(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <header className="border-b border-line bg-paper md:sticky md:top-0 md:z-40">
      <div className="h-1 bg-sky" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-x-6 gap-y-3 px-5 py-3 md:px-8">
        <div className="shrink-0">
          <Link href={`/${locale}`} className="text-ink no-underline">
            <span className="block font-heading text-4xl leading-none">{chrome.wordmark}</span>
            <span className="mt-1 block font-heading text-3xl italic leading-none text-gold">{chrome.series}</span>
          </Link>
          <nav className="mt-2 hidden flex-nowrap items-center gap-x-5 sm:flex" aria-label={chrome.navLabel}>
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

        <div className="ml-auto flex flex-nowrap items-center gap-x-4 sm:pt-1">
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
            <div className="theme-switch" role="group" aria-label={chrome.themeLabel}>
              <button
                type="button"
                aria-pressed={theme === "light"}
                aria-label={chrome.themeToLight}
                onClick={() => setThemeChoice("light")}
              >
                <SunIcon />
              </button>
              <button
                type="button"
                aria-pressed={theme === "dark"}
                aria-label={chrome.themeToDark}
                onClick={() => setThemeChoice("dark")}
              >
                <MoonIcon />
              </button>
            </div>
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

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.2v1.8M12 19v1.8M3.2 12h1.8M19 12h1.8M5.8 5.8l1.3 1.3M16.9 16.9l1.3 1.3M18.2 5.8l-1.3 1.3M7.1 16.9l-1.3 1.3" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.53 1.72a.75.75 0 0 1 .16.82A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.46-.69.75.75 0 0 1 .98.98 10.5 10.5 0 0 1-9.69 6.46c-5.8 0-10.5-4.7-10.5-10.5 0-4.37 2.67-8.11 6.46-9.7a.75.75 0 0 1 .82.17Z"
      />
    </svg>
  );
}
