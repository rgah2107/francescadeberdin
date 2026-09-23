import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, Continue, CtaBand, PageIntro } from "@/components/page-parts";
import { SocialLinks } from "@/components/social-links";
import { getDictionary } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { breadcrumbGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = getDictionary(locale).about;
  return buildMetadata(locale, "about", page.metaTitle, page.metaDescription);
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const page = dict.about;

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

        <section className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-4xl">{page.timelineTitle}</h2>
          <ol className="mt-8 border-l-2 border-gold pl-6">
            {page.timeline.map((item) => (
              <li key={item.when} className="relative pb-10">
                <span
                  className="absolute -left-[1.95rem] top-2 h-3 w-3 bg-gold"
                  aria-hidden="true"
                />
                <h3 className="font-heading text-3xl">{item.when}</h3>
                <p className="mt-2 text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mx-auto mt-4 max-w-3xl space-y-12">
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

        <SocialLinks
          title={dict.footer.socialTitle}
          labels={dict.footer.social}
          className="mx-auto mt-14 max-w-3xl border border-line bg-paper-raised px-6 py-7"
          linkClassName="text-teal-deep underline underline-offset-4"
        />

        <Continue
          locale={locale}
          title={dict.continueLabel}
          chrome={dict.chrome}
          routes={dict.related.about}
        />
        <CtaBand locale={locale} cta={dict.buyCta} />
      </article>
      <JsonLd data={breadcrumbGraph(locale, "about", page.crumb)} />
    </main>
  );
}
