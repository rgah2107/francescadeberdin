import type { Dictionary } from "@/content/types";
import type { Locale, RouteKey } from "@/lib/routes";
import { localePath } from "@/lib/routes";
import { SocialLinks } from "@/components/social-links";
import Link from "next/link";

const links: RouteKey[] = ["home", "about", "book", "faq", "contact", "buy"];

export function SiteFooter({
  locale,
  chrome,
  footer,
}: {
  locale: Locale;
  chrome: Dictionary["chrome"];
  footer: Dictionary["footer"];
}) {
  const labels: Record<RouteKey, string> = {
    home: chrome.home,
    about: chrome.about,
    book: chrome.book,
    faq: chrome.faq,
    contact: chrome.contact,
    buy: chrome.buy,
  };

  return (
    <footer className="mt-auto border-t-4 border-gold bg-footer text-footer-ink">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
        <p className="font-heading text-4xl">{chrome.wordmark}</p>
        <p className="mt-1 font-heading text-2xl italic text-gold">{chrome.series}</p>
        <p className="mt-5 max-w-2xl text-footer-muted">{footer.tagline}</p>
        <p className="mt-3 italic">{footer.motto}</p>
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-interface text-lg" aria-label={chrome.navLabel}>
          {links.map((route) => (
            <Link
              key={route}
              href={localePath(locale, route)}
              className="text-footer-ink underline decoration-gold/70 underline-offset-4"
            >
              {labels[route]}
            </Link>
          ))}
        </nav>
        <SocialLinks
          title={footer.socialTitle}
          labels={footer.social}
          className="mt-8"
          linkClassName="text-footer-ink underline decoration-gold/70 underline-offset-4"
        />
        <p className="mt-8 text-footer-muted">
          {footer.isbn}
          <span aria-hidden="true"> · </span>
          {footer.published}
        </p>
        <p className="mt-2 text-footer-muted">© {new Date().getFullYear()} {footer.rights}</p>
      </div>
    </footer>
  );
}
