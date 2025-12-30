import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/services(.*)',
  '/servicios(.*)',
  '/providers(.*)',
  '/blog(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/contact(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/cookies-policy(.*)',
  '/how(.*)',
  '/api/webhooks(.*)',
  '/api/providers(.*)',
  '/api/services(.*)',
  '/api/locations(.*)',
  '/api/contact(.*)',
  '/api/uploadthing(.*)',
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Handle mock/test pages with noindex
  if (pathname.includes('/providers/mock-') ||
      pathname.includes('/providers/test-') ||
      pathname.includes('/cookies-policy')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // Protect non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  return response
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
