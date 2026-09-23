import type { SocialId } from "@/lib/contact";
import type { RetailerId } from "@/lib/purchase";
import type { RouteKey } from "@/lib/routes";

export type Section = {
  heading: string;
  paragraphs: string[];
};

export type PageMeta = {
  metaTitle: string;
  metaDescription: string;
  crumb: string;
};

export type Dictionary = {
  heroAlt: string;
  breadcrumbLabel: string;
  continueLabel: string;
  chrome: {
    skip: string;
    menu: string;
    close: string;
    wordmark: string;
    series: string;
    home: string;
    about: string;
    book: string;
    faq: string;
    buy: string;
    themeLabel: string;
    themeToDark: string;
    themeToLight: string;
    languageLabel: string;
    navLabel: string;
  };
  footer: {
    tagline: string;
    motto: string;
    rights: string;
    isbn: string;
    published: string;
    socialTitle: string;
    social: Record<SocialId, string>;
  };
  buyCta: {
    title: string;
    text: string;
    button: string;
    secondary: string;
  };
  retailers: { id: RetailerId; label: string }[];
  notFound: { title: string; text: string; home: string };
  home: PageMeta & {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
    missionTitle: string;
    mission: string[];
    quote: string;
    quoteBy: string;
    hooksTitle: string;
    hooks: { title: string; text: string }[];
    videoTitle: string;
    videoText: string;
  };
  about: PageMeta & {
    eyebrow: string;
    title: string;
    lead: string;
    timelineTitle: string;
    timeline: { when: string; text: string }[];
    sections: Section[];
  };
  book: PageMeta & {
    eyebrow: string;
    title: string;
    lead: string;
    edition: string;
    sections: Section[];
    audienceTitle: string;
    audience: { title: string; text: string }[];
    doorsTitle: string;
    doors: { title: string; text: string }[];
    reviewsTitle: string;
    reviewsNote: string;
    reviews: {
      name: string;
      rating: number;
      title: string;
      text: string;
      date: string;
      place: string;
    }[];
  };
  faq: PageMeta & {
    eyebrow: string;
    title: string;
    lead: string;
    items: { id: string; question: string; answer: string }[];
  };
  buy: PageMeta & {
    eyebrow: string;
    title: string;
    lead: string;
    detailsTitle: string;
    details: { label: string; value: string }[];
  };
  related: Record<Exclude<RouteKey, "home">, RouteKey[]>;
};
