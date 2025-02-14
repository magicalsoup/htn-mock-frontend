import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session';
import { SessionData } from '@/session/lib';

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      {
        source:
          '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
        missing: [
          { type: 'header', key: 'next-router-prefetch' },
          { type: 'header', key: 'purpose', value: 'prefetch' },
        ],
      },
   
      {
        source:
          '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
        has: [
          { type: 'header', key: 'next-router-prefetch' },
          { type: 'header', key: 'purpose', value: 'prefetch' },
        ],
      },
   
      {
        source:
          '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
        has: [{ type: 'header', key: 'x-present' }],
        missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
      },
    ],
}

// Define the session options
const sessionOptions = {
    cookieName: process.env.LOGIN_COOKIE_NAME as string,
    password: process.env.SECRET_COOKIE_PASSWORD as string, // Must be 32+ chars
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };

export async function middleware(request: NextRequest) {
  
    const session: SessionData = await getIronSession(request, NextResponse.next(), sessionOptions);

    if (session.isLoggedIn && request.nextUrl.pathname.startsWith("/login")) { // redirect to home page if user is already logged in
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}