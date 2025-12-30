'use client'

import { useUser } from '@clerk/nextjs'

// Custom hook that wraps Clerk's useUser
export function useClerkUserSafe() {
  const userResult = useUser()

  return {
    ...userResult
  }
}
