import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-5 py-20 text-center md:px-8">
        <h1 className="page-title">This page is not here</h1>
        <p className="mt-3 font-heading text-3xl italic">Такой страницы нет</p>
        <p className="lead mt-6">
          The author, and the door into her book, are still on the home page.
        </p>
        <p className="mt-3 text-ink-soft">Автор и дверь в её книгу по-прежнему на главной.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link className="btn btn-primary" href="/en">
            Return home
          </Link>
          <Link className="btn btn-secondary" href="/ru">
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
