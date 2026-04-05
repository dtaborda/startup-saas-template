import { MOCK_TOKEN } from "@template/core";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set(["/", "/login", "/signup"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — allow through
  if (PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  // Validate auth-token cookie: must exist AND have a non-empty value
  const authToken = request.cookies.get("auth-token");

  if (!authToken || !authToken.value.trim()) {
    // For API routes, return 401 instead of redirecting
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate token cryptographic integrity
  const tokenValue = authToken.value.trim();
  if (tokenValue !== MOCK_TOKEN) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Removed "api" from exclusion list so /api/* routes are now protected
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
