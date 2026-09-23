import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ru"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
