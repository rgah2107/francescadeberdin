import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, Continue, PageIntro } from "@/components/page-parts";
import { RetailerButtons } from "@/components/retailer-buttons";
import { getDictionary } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { breadcrumbGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/buy">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = getDictionary(locale).buy;
  return buildMetadata(locale, "buy", page.metaTitle, page.metaDescription);
}

export default async function BuyPage({ params }: PageProps<"/[locale]/buy">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const page = dict.buy;

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

        <section className="mx-auto mt-12 max-w-3xl">
          <h2 className="font-heading text-4xl">{page.detailsTitle}</h2>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {page.details.map((detail) => (
              <div key={detail.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-interface font-semibold">{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <RetailerButtons retailers={dict.retailers} />
          </div>
        </section>

        <Continue
          locale={locale}
          title={dict.continueLabel}
          chrome={dict.chrome}
          routes={dict.related.buy}
        />
      </article>
      <JsonLd data={breadcrumbGraph(locale, "buy", page.crumb)} />
    </main>
  );
}
