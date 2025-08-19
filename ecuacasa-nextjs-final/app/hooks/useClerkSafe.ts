'use client'

// Safe Clerk hooks that work when Clerk is disabled
export function useClerkSafe() {
  // Check if we have the Clerk publishable key available
  const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const isClerkExplicitlyDisabled = process.env.DISABLE_CLERK_IN_DEV === 'true'
  
  // Clerk is disabled if we don't have a key OR it's explicitly disabled
  const isClerkDisabled = !hasClerkKey || isClerkExplicitlyDisabled


  if (isClerkDisabled) {
    return {
      useUser: () => ({ isLoaded: true, isSignedIn: false, user: null }),
      useAuth: () => ({ userId: null, sessionId: null, getToken: () => null }),
      useClerk: () => null,
      SignInButton: ({ children }: { children: React.ReactNode }) => children,
      SignUpButton: ({ children }: { children: React.ReactNode }) => children,
      UserButton: () => null,
      isClerkDisabled: true
    }
  }

  try {
    const clerk = require('@clerk/nextjs')
    return {
      useUser: clerk.useUser,
      useAuth: clerk.useAuth,
      useClerk: clerk.useClerk,
      SignInButton: clerk.SignInButton,
      SignUpButton: clerk.SignUpButton,
      UserButton: clerk.UserButton,
      isClerkDisabled: false
    }
  } catch (e) {
    return {
      useUser: () => ({ isLoaded: true, isSignedIn: false, user: null }),
      useAuth: () => ({ userId: null, sessionId: null, getToken: () => null }),
      useClerk: () => null,
      SignInButton: ({ children }: { children: React.ReactNode }) => children,
      SignUpButton: ({ children }: { children: React.ReactNode }) => children,
      UserButton: () => null,
      isClerkDisabled: true
    }
  }
}