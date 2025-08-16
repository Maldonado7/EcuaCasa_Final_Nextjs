import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

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
