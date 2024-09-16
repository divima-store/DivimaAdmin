import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("Middleware is running for:", req.url);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token:", token);

  const pathname = req.nextUrl.pathname;
  console.log("Pathname:", pathname);

  const publicRoutes = ["/api/auth/signin", "/api/auth/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.includes(pathname);
  console.log("Is public route:", isPublicRoute);

  if (
    isPublicRoute ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    console.log("Allowing access to public route or static resource");
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token, redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("User authenticated, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|static|favicon.ico|auth|api/auth).*)",
  ],
};
