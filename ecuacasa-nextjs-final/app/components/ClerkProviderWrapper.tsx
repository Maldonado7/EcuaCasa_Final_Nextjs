'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'

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
      afterSignInUrl="/"
      afterSignUpUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      {children}
    </ClerkProvider>
  )
}