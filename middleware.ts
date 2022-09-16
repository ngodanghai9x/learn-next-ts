// https://vercel.com/docs/concepts/functions/edge-middleware/quickstart

// Edge Middleware runs before the incoming request and cache, which allows you to personalize cached content. 
// In this quickstart you will create a middleware that runs on a specific route (/secret-page). If your visitor 
// is from a specific geographic location, and visits the /secret-page route, the request will be rewritten to a /login page instead.

// Edge Middleware runs before the cache
// You can import helpers that extend Web API objects (NextResponse, NextRequest, see Edge Middleware API for more information on these APIs)
// You can use a custom matcher config to only trigger the middleware in specific routes
// Edge Middleware cannot return responses
// You cannot use Node.js APIs in Edge Middleware

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The country to block from accessing the secret page
const BLOCKED_COUNTRY = 'SE';

// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher: ['/secret-page', '/dashboard/:path*'],
};

export function middleware(req: NextRequest) {
  // Extract country. Default to US if not found.
  const country = (req.geo && req.geo.country) || 'US';

  console.log(`Visitor from ${country}`);

  // Specify the correct route based on the requests location
  if (country === BLOCKED_COUNTRY) {
    req.nextUrl.pathname = '/login';
  } else {
    req.nextUrl.pathname = `/secret-page`;
  }

  // Rewrite to URL
  return NextResponse.rewrite(req.nextUrl);
}
