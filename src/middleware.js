import { NextResponse } from "next/server";

export function middleware(request) {
  const isAdmin = request.cookies.get("admin-auth")?.value === "true";

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
