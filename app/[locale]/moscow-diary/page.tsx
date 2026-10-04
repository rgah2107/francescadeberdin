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
