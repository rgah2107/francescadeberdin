import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function withoutLanguagePrefix(pathname: string): string | null {
  for (const prefix of ["/en", "/ru"]) {
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return null;
}

export function proxy(request: NextRequest) {
  const nextPath = withoutLanguagePrefix(request.nextUrl.pathname);
  if (!nextPath) return;

  const url = request.nextUrl.clone();
  url.pathname = nextPath;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
