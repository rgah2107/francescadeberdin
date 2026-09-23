import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, Continue, CtaBand, PageIntro } from "@/components/page-parts";
import { ReaderReviews } from "@/components/reader-reviews";
import { getDictionary } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { breadcrumbGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/moscow-diary">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = getDictionary(locale).book;
  return buildMetadata(locale, "book", page.metaTitle, page.metaDescription);
}

export default async function BookPage({
  params,
}: PageProps<"/[locale]/moscow-diary">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const page = dict.book;

  return (
    <main id="content" className="flex-1">
      <article className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <Breadcrumb
          locale={locale}
          label={dict.breadcrumbLabel}
          home={dict.chrome.home}
          crumb={page.crumb}
        />
        <div className="mt-8">
          <PageIntro eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
          <p className="mt-6 text-center font-interface text-lg text-ink-soft">{page.edition}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-12">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-4xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-ink-soft">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-center font-heading text-4xl md:text-5xl">{page.audienceTitle}</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {page.audience.map((item) => (
              <li key={item.title} className="border border-line bg-paper-raised px-6 py-7">
                <h3 className="font-heading text-3xl">{item.title}</h3>
                <p className="mt-3 text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-4xl md:text-5xl">{page.doorsTitle}</h2>
          <ol className="mt-8 space-y-8">
            {page.doors.map((door, index) => (
              <li key={door.title} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-heading text-4xl text-gold" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-3xl">{door.title}</h3>
                  <p className="mt-2 text-ink-soft">{door.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <ReaderReviews locale={locale} page={page} />

        <Continue
          locale={locale}
          title={dict.continueLabel}
          chrome={dict.chrome}
          routes={dict.related.book}
        />
        <CtaBand locale={locale} cta={dict.buyCta} />
      </article>
      <JsonLd data={breadcrumbGraph(locale, "book", page.crumb)} />
    </main>
  );
}
