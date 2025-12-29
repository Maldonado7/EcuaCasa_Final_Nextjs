'use client'

import { useUser, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'

// Re-export Clerk components and hooks for safe usage
export function useSafeUser() {
  return useUser()
}

// Export hook function that returns components
export const useClerkSafe = () => {
  return {
    useUser: useSafeUser,
    SignInButton,
    SignUpButton,
    UserButton
  }
}

// Export components directly
export const SafeClerkComponents = {
  SignInButton,
  SignUpButton,
  UserButton
}
