'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function SignInContent() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto mb-4 hover:scale-105 transition-transform cursor-pointer">
              EC
            </div>
          </Link>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Bienvenido de vuelta</h1>
          <p className="text-gray-600">Ingresa a tu cuenta de EcuaCasa</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm normal-case',
                card: 'shadow-none border-0',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                footerActionLink: 'text-purple-600 hover:text-purple-700 font-medium'
              }
            }}
            forceRedirectUrl={redirectUrl}
            fallbackRedirectUrl="/"
          />
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes cuenta?{' '}
            <Link href="/sign-up" className="text-purple-600 font-medium hover:underline">
              Crear cuenta gratis
            </Link>
          </p>
          <p className="text-gray-500 text-xs mt-3">
            ¿Eres profesional?{' '}
            <Link href="/providers/register" className="text-green-600 font-medium hover:underline">
              Registra tu servicio
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-500 text-sm hover:text-gray-700">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="animate-pulse">Cargando...</div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}
