'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import Link from 'next/link'
import { getAdminEmails } from '../lib/adminAuth'

export default function AdminSetupPage() {
  const { user } = useUser()
  const [testProviderCreated, setTestProviderCreated] = useState(false)
  
  const adminEmails = getAdminEmails()
  const userEmail = user?.emailAddresses?.[0]?.emailAddress
  const isCurrentUserAdmin = adminEmails.includes(userEmail) || user?.publicMetadata?.role === 'admin'

  const createTestProvider = async () => {
    try {
      const response = await fetch('/api/test-provider', {
        method: 'POST'
      })
      
      if (response.ok) {
        setTestProviderCreated(true)
      }
    } catch (error) {
      console.error('Error creating test provider:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-black text-gray-900 mb-6">
            🔧 EcuaCasa Admin Setup
          </h1>
          
          <div className="space-y-6">
            {/* Current User Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h2 className="font-bold text-blue-900 mb-2">Current User Status</h2>
              <p><strong>Email:</strong> {userEmail}</p>
              <p><strong>Admin Access:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                  isCurrentUserAdmin 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isCurrentUserAdmin ? '✅ Yes' : '❌ No'}
                </span>
              </p>
            </div>

            {/* Admin Access Methods */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-gray-900 mb-4">How to Get Admin Access:</h2>
              
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Method 1: Use Admin Email (Easiest)</h3>
                  <p className="text-gray-600 text-sm mb-2">Sign up/sign in with one of these emails:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {adminEmails.map(email => (
                      <li key={email}><code className="bg-gray-100 px-1 rounded">{email}</code></li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Method 2: Set Admin Role in Clerk</h3>
                  <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                    <li>Go to <a href="https://dashboard.clerk.com" target="_blank" className="text-blue-600 hover:underline">Clerk Dashboard</a></li>
                    <li>Find your user account</li>
                    <li>Edit Public Metadata and add: <code className="bg-gray-100 px-1 rounded">{`{"role": "admin"}`}</code></li>
                    <li>Save and refresh this page</li>
                  </ol>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Method 3: Update Code</h3>
                  <p className="text-gray-600 text-sm">Add your email to the admin list in <code className="bg-gray-100 px-1 rounded">app/lib/adminAuth.ts</code></p>
                </div>
              </div>
            </div>

            {/* Test Data Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h2 className="font-bold text-yellow-900 mb-4">Test the Admin Panel:</h2>
              
              <div className="space-y-4">
                <div>
                  <button
                    onClick={createTestProvider}
                    disabled={testProviderCreated}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      testProviderCreated
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                    }`}
                  >
                    {testProviderCreated ? '✅ Test Provider Created' : '📝 Create Test Provider'}
                  </button>
                  <p className="text-sm text-yellow-700 mt-2">
                    This creates a provider that needs admin approval
                  </p>
                </div>

                {isCurrentUserAdmin && (
                  <div>
                    <Link href="/admin">
                      <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                        🚀 Go to Admin Panel
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Link href="/">
                <button className="bg-gray-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-700 transition-all">
                  ← Back to Home
                </button>
              </Link>
              
              {!isCurrentUserAdmin && (
                <Link href="/sign-in">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all">
                    Sign In with Admin Email
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}