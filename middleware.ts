// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = req.cookies.get("admin-auth")?.value === "true";
  const isProtected = req.nextUrl.pathname.startsWith("/admin") &&
                      !req.nextUrl.pathname.startsWith("/admin/page") &&
                      !req.nextUrl.pathname.startsWith("/admin/signup");

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // protect all /admin/** routes
};
// This will apply the middleware to all routes under /admin
// except for /admin/page and /admin/signup