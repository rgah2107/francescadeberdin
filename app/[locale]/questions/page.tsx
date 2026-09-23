import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, Continue, CtaBand, PageIntro } from "@/components/page-parts";
import { getDictionary } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { breadcrumbGraph, faqGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/questions">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = getDictionary(locale).faq;
  return buildMetadata(locale, "faq", page.metaTitle, page.metaDescription);
}

export default async function QuestionsPage({
  params,
}: PageProps<"/[locale]/questions">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const page = dict.faq;

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
        </div>
        <div className="mx-auto mt-14 max-w-3xl space-y-10">
          {page.items.map((item) => (
            <section key={item.id} id={item.id} className="scroll-mt-28">
              <h2 className="font-heading text-3xl md:text-4xl">{item.question}</h2>
              <p className="mt-3 text-ink-soft">{item.answer}</p>
            </section>
          ))}
        </div>
        <Continue
          locale={locale}
          title={dict.continueLabel}
          chrome={dict.chrome}
          routes={dict.related.faq}
        />
        <CtaBand locale={locale} cta={dict.buyCta} />
      </article>
      <JsonLd data={breadcrumbGraph(locale, "faq", page.crumb)} />
      <JsonLd data={faqGraph(locale)} />
    </main>
  );
}
