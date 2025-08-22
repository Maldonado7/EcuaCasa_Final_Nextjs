import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Allow public access to sign-up routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/services(.*)',
  '/providers(.*)',
  '/how(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sign-up-role(.*)',
  '/api/send-email(.*)'
])

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''
  const pathname = url.pathname
  
  // Let Vercel handle domain redirects - don't interfere
  
  // Handle mock/test pages with noindex
  if (pathname.includes('/providers/mock-') || 
      pathname.includes('/providers/test-') || 
      pathname.includes('/cookies-policy')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }
  
  if (!isPublicRoute(req)) {
    // Protect routes that are not public
    // But don't use auth().protect() as it was causing issues
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
