// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token || token === "undefined") {
    // Redirect to /login if the token is missing
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|login|sign-up).*)"], // now skips /api/*, /_next/*, /login
};
