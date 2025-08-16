'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function TestAuth() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
      
      <div className="space-y-4">
        <p><strong>Is Signed In:</strong> {isSignedIn ? 'YES ✅' : 'NO ❌'}</p>
        <p><strong>User ID:</strong> {user?.id || 'Not available'}</p>
        <p><strong>User Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>User Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
      </div>

      <div className="mt-6">
        <Link href="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}