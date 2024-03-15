import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// import { match } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth);
    // let locales = ["en", "es"];
    // let defaultLocale = "en";
    if (
      (req.nextUrl.pathname.startsWith("/en/admin") &&
        req.nextauth.token.role !== 1) ||
      (req.nextUrl.pathname.startsWith("/es/admin") &&
        req.nextauth.token.role !== 1)
    ) {
      return new NextResponse("No autorizado");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: [
    "/en/dashboard",
    "/en/dashboard/:path*",
    "/en/admin",
    "/en/admin/:path*",
    "/es/dashboard",
    "/es/dashboard/:path*",
    "/es/admin",
    "/es/admin/:path*",
  ],
  // matcher: ["/dashboard", "/dashboard/:path*", "/app/:path*", ""],
};
