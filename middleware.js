import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Simple cache store
const cache = new Map();
const CACHE_DURATION = 10000; // 10 seconds cache duration

export async function middleware(request) {
  // Check authentication first
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/api/auth/signin", "/api/auth/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.includes(pathname);

  console.log('Authentication check:', {
    pathname,
    hasToken: !!token,
    isPublicRoute
  });

  // Handle public routes and static resources
  if (
    isPublicRoute ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    console.log('Allowing public route access:', pathname);
    return NextResponse.next();
  }

  // Redirect to signin if no token
  if (!token) {
    console.log('No token found, redirecting to signin');
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // Only apply caching logic to orders routes
  if (pathname.startsWith('/orders')) {
    console.log('Processing orders route:', pathname);
    
    // Skip caching for POST/PUT/DELETE requests (status updates)
    if (request.method !== 'GET') {
      console.log('Skipping cache for non-GET request:', request.method);
      return NextResponse.next();
    }

    // Clear cache when there's a status update indicator
    const hasStatusUpdate = request.headers.get('x-status-updated') === 'true';
    if (hasStatusUpdate) {
      console.log('Status update detected, clearing cache');
      cache.delete('orders');
      const response = NextResponse.next();
      response.headers.set('x-cache-status', 'CLEARED');
      return response;
    }

    // Get cached data
    const cachedData = cache.get('orders');
    const now = Date.now();

    // If we have valid cache that hasn't expired, use it
    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
      console.log('Cache hit for orders');
      const response = NextResponse.next();
      response.headers.set('x-cache-status', 'HIT');
      return response;
    }

    // Cache miss or expired
    console.log('Cache miss for orders');
    const response = NextResponse.next();
    response.headers.set('x-cache-status', 'MISS');

    // Update cache timestamp
    cache.set('orders', { timestamp: now });
    return response;
  }

  // Default response for authenticated requests
  console.log('Proceeding with authenticated request:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|static|favicon.ico|auth|api/auth).*)",
  ],
};
