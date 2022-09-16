// https://vercel.com/docs/concepts/functions/edge-middleware/quickstart

// Edge Middleware runs before the incoming request and cache, which allows you to personalize cached content.
// In this quickstart you will create a middleware that runs on a specific route (/secret-page). If your visitor
// is from a specific geographic location, and visits the /secret-page route, the request will be rewritten to a /login page instead.

// Edge Middleware runs before the cache
// You can import helpers that extend Web API objects (NextResponse, NextRequest, see Edge Middleware API for more information on these APIs)
// You can use a custom matcher config to only trigger the middleware in specific routes
// Edge Middleware cannot return responses
// You cannot use Node.js APIs in Edge Middleware

/*
#Matching Paths
1,Middleware will be invoked for every route in your project. The following is the execution order:
- headers from next.config.js
- redirects from next.config.js
- Middleware (rewrites, redirects, etc.)
- beforeFiles (rewrites) from next.config.js
- Filesystem routes (public/, _next/static/, Pages, etc.)
- afterFiles (rewrites) from next.config.js
- Dynamic Routes (/blog/[slug])
- fallback (rewrites) from next.config.js

2,There are two ways to define which paths Middleware will run on:
- Custom matcher config
- Conditional statements
*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';

// The country to block from accessing the secret page
const BLOCKED_COUNTRY = 'SE';

// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher: ['/secret-page', '/dashboard/:path*'],
};
function interactCookie(request: NextRequest) {
  // Setting cookies on the response
  const response = NextResponse.next();
  response.cookies.set('vercel', 'fast');
  response.cookies.set('vercel', 'fast', { path: '/test' });

  // Getting cookies from the request
  const cookie = request.cookies.get('vercel');
  console.log(cookie); // => 'fast'
  const allCookies = request.cookies.entries();
  console.log(allCookies); // => [{ key: 'vercel', value: 'fast' }]
  const { value, options } = response.cookies.getWithOptions('vercel');
  console.log(value); // => 'fast'
  console.log(options); // => { Path: '/test' }

  // Deleting cookies
  response.cookies.delete('vercel');
  response.cookies.clear();
}

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
  interactCookie(req);
  const agent = userAgent(req);
  console.log('🚀 ~ agent', agent);

  // Rewrite to URL
  return NextResponse.rewrite(req.nextUrl);
  // https://nextjs.org/docs/advanced-features/middleware
  // The NextResponse API allows you to:
  // - redirect the incoming request to a different URL
  // - rewrite the response by displaying a given URL
  // - Set response cookies
  // - Set response headers
}
