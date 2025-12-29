'use client'

import { useUser } from '@clerk/nextjs'

// Custom hook that wraps Clerk's useUser with additional info
export function useClerkUserSafe() {
  const userResult = useUser()

  return {
    ...userResult,
    isClerkDisabled: false
  }
}
