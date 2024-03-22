import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // Si la ruta no tiene el prefijo /en o /es, redirigir a /en
    if (
      !req.nextUrl.pathname.startsWith("/en") &&
      !req.nextUrl.pathname.startsWith("/es")
    ) {
      return NextResponse.redirect(new URL("/en", req.url));
    }

    // Verificar permisos solo si el usuario está autenticado
    if (req.nextauth?.token) {
      if (
        (req.nextUrl.pathname.startsWith("/en/admin") &&
          req.nextauth.token.role !== 1) ||
        (req.nextUrl.pathname.startsWith("/es/admin") &&
          req.nextauth.token.role !== 1)
      ) {
        return new NextResponse("No autorizado");
      }
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
    "/",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
