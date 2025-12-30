'use client'

import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

// Re-export Clerk's useUser hook
export function useSafeUser() {
  return useUser()
}

// Export safe hook function with Clerk components
export const useClerkSafe = () => {
  return {
    useUser: useSafeUser,
    SignInButton,
    SignUpButton,
    UserButton
  }
}

// Export safe components
export const SafeClerkComponents = {
  SignInButton,
  SignUpButton,
  UserButton
}
