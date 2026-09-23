import { activeSocialLinks } from "@/lib/contact";
import { getDictionary } from "@/lib/content";
import { activePurchaseLinks } from "@/lib/purchase";
import type { Locale, RouteKey } from "@/lib/routes";
import { localePath } from "@/lib/routes";
import { absoluteUrl, bookFacts, siteUrl } from "@/lib/site";

function person(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#francesca-de-bardin`,
    name: "Francesca de Bardin",
    alternateName: locale === "ru" ? "Франческа де Барден" : undefined,
    jobTitle: locale === "ru" ? "Писательница" : "Author",
    description: dict.about.lead,
    url: absoluteUrl(localePath(locale, "about")),
    image: absoluteUrl(bookFacts.hero.src),
    birthPlace: {
      "@type": "Place",
      name: "San Francisco",
    },
    homeLocation: {
      "@type": "Place",
      name: "Moscow",
    },
    nationality: locale === "ru" ? "США" : "American",
    knowsLanguage: ["en", "fr"],
    sameAs: activeSocialLinks().map((link) => link.href),
  };
}

function book(locale: Locale) {
  const dict = getDictionary(locale);
  const offers = activePurchaseLinks().map((url) => ({
    "@type": "Offer",
    url,
  }));

  return {
    "@type": "Book",
    "@id": `${siteUrl}/#moscow-diary`,
    name: "Moscow Diary",
    alternateName: ["An American Living in Moscow", "Московский дневник"],
    author: { "@id": `${siteUrl}/#francesca-de-bardin` },
    isbn: bookFacts.isbn,
    inLanguage: "en",
    datePublished: bookFacts.year,
    description: dict.book.lead,
    url: absoluteUrl(localePath(locale, "book")),
    image: absoluteUrl(bookFacts.hero.src),
    publisher: {
      "@type": "Organization",
      name: bookFacts.publisher,
    },
    ...(offers.length > 0 ? { offers } : {}),
  };
}

export function siteGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Francesca de Bardin",
        inLanguage: ["en", "ru"],
        publisher: { "@id": `${siteUrl}/#francesca-de-bardin` },
      },
      person(locale),
      book(locale),
    ],
  };
}

export function breadcrumbGraph(
  locale: Locale,
  route: Exclude<RouteKey, "home">,
  crumb: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: getDictionary(locale).chrome.home,
        item: absoluteUrl(localePath(locale, "home")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: crumb,
        item: absoluteUrl(localePath(locale, route)),
      },
    ],
  };
}

export function faqGraph(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(localePath(locale, "faq")),
    inLanguage: locale,
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
