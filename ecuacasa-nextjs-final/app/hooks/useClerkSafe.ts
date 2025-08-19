'use client'

import { useEffect, useState } from 'react'
import React from 'react'

// Safe components that will render the fallback content
const SafeSignInButton = ({ children, mode }: { children: React.ReactNode, mode?: string }) => {
  return React.createElement('div', {}, children)
}

const SafeSignUpButton = ({ children, mode }: { children: React.ReactNode, mode?: string }) => {
  return React.createElement('div', {}, children)
}

const SafeUserButton = () => null

// Safe user state hook
export function useSafeUser() {
  const [userState, setUserState] = useState({
    isLoaded: false,
    isSignedIn: false,
    user: null
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const { useUser } = require('@clerk/nextjs')
        const state = useUser()
        setUserState(state)
      } catch (e) {
        setUserState({ isLoaded: true, isSignedIn: false, user: null })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return userState
}

// Export safe hook function
export const useClerkSafe = () => {
  return {
    useUser: useSafeUser,
    SignInButton: SafeSignInButton,
    SignUpButton: SafeSignUpButton,
    UserButton: SafeUserButton
  }
}

// Export safe components
export const SafeClerkComponents = {
  SignInButton: SafeSignInButton,
  SignUpButton: SafeSignUpButton,
  UserButton: SafeUserButton
}