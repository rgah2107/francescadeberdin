import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/routes";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
      <path
        d="M10 1.6 12.5 7.1l6 .6-4.5 3.9 1.4 5.8L10 14.6 4.6 17.4l1.4-5.8L1.5 7.7l6-.6L10 1.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReaderReviews({
  locale,
  page,
}: {
  locale: Locale;
  page: Dictionary["book"];
}) {
  const dateFormat = new Intl.DateTimeFormat(locale === "ru" ? "ru" : "en", {
    dateStyle: "long",
  });

  return (
    <section className="mt-16">
      <h2 className="text-center font-heading text-4xl md:text-5xl">{page.reviewsTitle}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-ink-soft">{page.reviewsNote}</p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {page.reviews.map((review) => {
          const ratingLabel =
            locale === "ru"
              ? `${review.rating} из 5`
              : `${review.rating} out of 5 stars`;
          const when = dateFormat.format(new Date(`${review.date}T00:00:00`));

          return (
            <li key={review.name} className="border border-line bg-paper-raised px-6 py-7">
              <p className="flex items-center gap-2 text-gold">
                <span className="flex gap-0.5" aria-label={ratingLabel}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} filled={index < review.rating} />
                  ))}
                </span>
                <span className="font-interface text-base font-semibold text-ink">{ratingLabel}</span>
              </p>
              <h3 className="mt-3 font-heading text-2xl">{review.title}</h3>
              <blockquote className="mt-3 text-ink-soft">
                <p>{review.text}</p>
              </blockquote>
              <p className="mt-4 font-interface text-base text-ink">
                {review.name}
                <span className="text-ink-soft">
                  {" · "}
                  {review.place}
                  {" · "}
                  {when}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
