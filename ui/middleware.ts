import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set(["/", "/login", "/signup"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — allow through
  if (PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  // For mock auth, we check a cookie (set by login form)
  const authToken = request.cookies.get("auth-token");

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
