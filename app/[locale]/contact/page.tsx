import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, Continue, PageIntro } from "@/components/page-parts";
import { getDictionary } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { breadcrumbGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = getDictionary(locale).contact;
  return buildMetadata(locale, "contact", page.metaTitle, page.metaDescription);
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const page = dict.contact;

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
        <div className="mx-auto mt-12 max-w-xl">
          <ContactForm copy={page} />
        </div>
        <Continue
          locale={locale}
          title={dict.continueLabel}
          chrome={dict.chrome}
          routes={dict.related.contact}
        />
      </article>
      <JsonLd data={breadcrumbGraph(locale, "contact", page.crumb)} />
    </main>
  );
}
