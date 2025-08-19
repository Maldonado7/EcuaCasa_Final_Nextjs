'use client'

import { useUser as useClerkUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

// Custom hook that safely wraps Clerk's useUser
export function useClerkUserSafe() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Check if Clerk is available
  const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  // Try to use Clerk's useUser if available
  let userResult = { isLoaded: false, isSignedIn: false, user: null }
  
  try {
    if (hasClerkKey && isClient) {
      // Only attempt to use Clerk hooks on the client
      userResult = useClerkUser()
    }
  } catch (error) {
    // If Clerk is not available, return default values
    console.log('Clerk not available, using default values')
  }
  
  return {
    ...userResult,
    isClerkDisabled: !hasClerkKey
  }
}