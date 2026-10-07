import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, Continue, CtaBand, PageIntro } from "@/components/page-parts";
import { getDictionary } from "@/lib/content";
import type { Locale } from "@/lib/routes";
import { breadcrumbGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";

const locale: Locale = "en";

export async function generateMetadata(): Promise<Metadata> {
  const page = getDictionary(locale).discover;
  return buildMetadata(locale, "discover", page.metaTitle, page.metaDescription);
}

export default async function DiscoverPage() {
  const dict = getDictionary(locale);
  const page = dict.discover;

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

        {page.places.map((place) => {
          const [leadPhoto, ...photos] = place.photos;
          return (
            <section key={place.title} className="mx-auto mt-16 max-w-3xl">
              <h2 className="font-heading text-4xl md:text-5xl">{place.title}</h2>
              <p className="mt-2 font-heading text-2xl italic text-gold">{place.city}</p>
              {leadPhoto ? (
                <figure className="frame mt-8 p-3 md:p-4">
                  <Image
                    src={leadPhoto.src}
                    alt={leadPhoto.alt}
                    width={leadPhoto.width}
                    height={leadPhoto.height}
                    className="h-auto w-full"
                    sizes="(min-width: 768px) 768px, 100vw"
                  />
                  <figcaption className="mt-3 font-interface text-lg text-ink-soft">{leadPhoto.caption}</figcaption>
                </figure>
              ) : null}
              <div className="mt-8 space-y-4 text-ink-soft">
                {place.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>
                  <a
                    className="text-teal-deep underline underline-offset-4"
                    href={place.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {place.link.label}
                  </a>
                </p>
              </div>
              {photos.length > 0 ? (
                <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                  {photos.map((photo) => (
                    <li key={photo.src} className="frame p-3">
                      <figure>
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.width}
                          height={photo.height}
                          className="h-auto w-full"
                          sizes="(min-width: 640px) 360px, 100vw"
                        />
                        <figcaption className="mt-3 font-interface text-lg text-ink-soft">{photo.caption}</figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          );
        })}

        <Continue
          locale={locale}
          title={dict.continueLabel}
          chrome={dict.chrome}
          routes={dict.related.discover}
        />
        <CtaBand locale={locale} cta={dict.buyCta} />
      </article>
      <JsonLd data={breadcrumbGraph(locale, "discover", page.crumb)} />
    </main>
  );
}
