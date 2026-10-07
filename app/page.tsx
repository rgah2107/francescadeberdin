import { FeaturedVideo } from "@/components/featured-video";
import { JsonLd } from "@/components/json-ld";
import { Ornament } from "@/components/ornament";
import { CtaBand } from "@/components/page-parts";
import { getDictionary } from "@/lib/content";
import { localePath, type Locale } from "@/lib/routes";
import { featuredVideo } from "@/lib/contact";
import { bookFacts, siteUrl } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const locale: Locale = "en";

export async function generateMetadata(): Promise<Metadata> {
  const page = getDictionary(locale).home;
  return buildMetadata(locale, "home", page.metaTitle, page.metaDescription);
}

export default async function HomePage() {
  const dict = getDictionary(locale);
  const page = dict.home;

  return (
    <main id="content" className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <figure className="frame p-3 md:p-4">
          <Image
            src={bookFacts.hero.src}
            alt={dict.heroAlt}
            width={bookFacts.hero.width}
            height={bookFacts.hero.height}
            priority
            quality={100}
            className="h-auto w-full"
            sizes="(min-width: 1152px) 2172px, 100vw"
          />
        </figure>

        <header className="mx-auto mt-12 max-w-3xl text-center">
          <p className="font-heading text-[2.34rem] font-semibold uppercase tracking-[0.06em] text-ink md:text-[2.925rem]">
            {page.eyebrow}
          </p>
          <h1 className="page-title mt-3">{page.title}</h1>
          <p className="mt-3 font-heading text-3xl italic text-sky-deep md:text-4xl">
            {page.subtitle}
          </p>
          <Ornament />
          <p className="lead">{page.lead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link className="btn btn-primary w-full sm:w-auto" href={localePath(locale, "buy")}>
              {dict.chrome.buy}
            </Link>
            <Link className="btn btn-secondary w-full sm:w-auto" href={localePath(locale, "about")}>
              {dict.chrome.about}
            </Link>
          </div>
        </header>

        <section className="mt-16 grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-heading text-4xl md:text-5xl">{page.missionTitle}</h2>
            <div className="mt-5 space-y-5 text-ink-soft">
              {page.mission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <blockquote className="frame px-6 py-8 lg:col-span-2">
            <p className="font-heading text-3xl italic leading-snug text-ink">
              {`“${page.quote}”`}
            </p>
            <footer className="mt-5 text-ink-soft">{page.quoteBy}</footer>
          </blockquote>
        </section>

        <section className="mx-auto mt-16 max-w-3xl space-y-5 text-ink-soft">
          {page.invitation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {page.readers.map((reader) => (
            <li key={reader.title} className="border border-line bg-paper-raised px-6 py-7">
              <h2 className="font-heading text-3xl">{reader.title}</h2>
              <p className="mt-3 text-ink-soft">{reader.text}</p>
            </li>
          ))}
        </ul>

        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-4xl md:text-5xl">{page.doorsTitle}</h2>
          <p className="mt-5 text-ink-soft">{page.doorsIntro}</p>
          <ol className="mt-8 space-y-8">
            {page.doors.map((door) => (
              <li key={door.title}>
                <h3 className="font-heading text-3xl">{door.title}</h3>
                <p className="mt-2 text-ink-soft">{door.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <FeaturedVideo title={page.videoTitle} text={page.videoText} />

        <section className="mt-16">
          <h2 className="text-center font-heading text-4xl md:text-5xl">{page.hooksTitle}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {page.hooks.map((hook, index) => (
              <li key={hook.title} className="border border-line bg-paper-raised px-6 py-7">
                <p className="font-heading text-5xl text-gold">{index + 1}</p>
                <h3 className="mt-2 font-heading text-3xl">{hook.title}</h3>
                <p className="mt-3 text-ink-soft">{hook.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <CtaBand locale={locale} cta={dict.buyCta} />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          dateModified: "2026-09-23",
          mainEntity: { "@id": `${siteUrl}/#francesca-de-bardin` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: page.videoTitle,
          description: page.videoText,
          thumbnailUrl: `https://i.ytimg.com/vi/${featuredVideo.id}/hqdefault.jpg`,
          embedUrl: featuredVideo.embedUrl,
          url: featuredVideo.watchUrl,
          publisher: { "@id": `${siteUrl}/#francesca-de-bardin` },
        }}
      />
    </main>
  );
}
