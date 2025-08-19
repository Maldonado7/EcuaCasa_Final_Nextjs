'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'
import { useEffect } from 'react'

export default function ClerkProviderWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Check if Clerk should be disabled
  const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const isClerkExplicitlyDisabled = process.env.DISABLE_CLERK_IN_DEV === 'true'
  
  // Clerk is disabled if we don't have a key OR it's explicitly disabled
  const isClerkDisabled = !hasClerkKey || isClerkExplicitlyDisabled


  // If Clerk is disabled, render children without ClerkProvider
  if (isClerkDisabled) {
    return <>{children}</>
  }
  useEffect(() => {
    // Suppress Clerk console errors and 400 errors in development
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error
      const originalWarn = console.warn
      
      // Suppress console errors
      console.error = (...args) => {
        // Filter out Clerk-related errors that are expected in development
        const errorString = args[0]?.toString?.() || ''
        if (
          errorString.includes('Clerk: Failed to load Clerk') ||
          errorString.includes('handleTimeout') ||
          errorString.includes('clerk') ||
          errorString.includes('key-pollis-82.clerk.accounts.dev') ||
          errorString.includes('Failed to load resource') ||
          errorString.includes('400') ||
          errorString.includes('clerk.accounts.dev') ||
          errorString.includes('ecuacasa.com')
        ) {
          return
        }
        originalError.apply(console, args)
      }
      
      // Suppress console warnings
      console.warn = (...args) => {
        const warnString = args[0]?.toString?.() || ''
        if (warnString.includes('clerk') || warnString.includes('Clerk')) {
          return
        }
        originalWarn.apply(console, args)
      }

      // Intercept fetch to handle Clerk API errors
      const originalFetch = window.fetch
      window.fetch = async (...args) => {
        try {
          const response = await originalFetch(...args)
          const url = args[0]?.toString() || ''
          
          // Silently handle Clerk API errors in development
          if ((url.includes('clerk.accounts.dev') || url.includes('ecuacasa.com')) && response.status >= 400) {
            return new Response(JSON.stringify({}), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            })
          }
          
          return response
        } catch (error) {
          // Silently fail for Clerk-related requests
          const url = args[0]?.toString() || ''
          if (url.includes('clerk') || url.includes('ecuacasa.com')) {
            return new Response(JSON.stringify({}), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            })
          }
          throw error
        }
      }

      // Suppress window errors related to Clerk
      const originalOnError = window.onerror
      window.onerror = (message, source, lineno, colno, error) => {
        if (
          typeof message === 'string' && 
          (message.includes('Clerk: Failed to load Clerk') || 
           message.includes('handleTimeout') ||
           message.includes('clerk'))
        ) {
          return true // Prevent error from being logged
        }
        if (originalOnError) {
          return originalOnError(message, source, lineno, colno, error)
        }
        return false
      }

      // Suppress unhandled promise rejections related to Clerk
      const originalOnUnhandledRejection = window.onunhandledrejection
      window.onunhandledrejection = (event) => {
        if (
          event.reason && 
          typeof event.reason === 'object' && 
          (event.reason.message?.includes('Clerk: Failed to load Clerk') ||
           event.reason.message?.includes('handleTimeout') ||
           event.reason.message?.includes('clerk'))
        ) {
          event.preventDefault() // Prevent error from being logged
          return
        }
        if (originalOnUnhandledRejection) {
          return originalOnUnhandledRejection(event)
        }
      }
    }
  }, [])

  return (
    <ClerkProvider 
      localization={esES}
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          showOptionalFields: false,
        },
        elements: {
          rootBox: 'clerk-root',
          card: 'clerk-card',
        },
      }}
      telemetry={false}
      afterSignInUrl="/"
      afterSignUpUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      {children}
    </ClerkProvider>
  )
}