import { featuredVideo } from "@/lib/contact";

export function FeaturedVideo({ title, text }: { title: string; text: string }) {
  return (
    <section className="mt-16">
      <h2 className="text-center font-heading text-4xl md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">{text}</p>
      <div className="frame mx-auto mt-8 max-w-4xl p-3 md:p-4">
        <div className="relative aspect-video w-full bg-ink">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={featuredVideo.embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
