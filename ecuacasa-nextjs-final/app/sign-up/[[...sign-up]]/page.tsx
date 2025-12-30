'use client'

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
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
          <h1 className="text-3xl font-black text-gray-900 mb-2">Únete a EcuaCasa</h1>
          <p className="text-gray-600">Crea tu cuenta gratis en segundos</p>

          {/* Benefits */}
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span>Seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              <span>Rápido</span>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <SignUp
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
            fallbackRedirectUrl="/"
          />
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link href="/sign-in" className="text-purple-600 font-medium hover:underline">
              Iniciar sesión
            </Link>
          </p>
          <p className="text-gray-500 text-xs mt-3">
            ¿Eres profesional?{' '}
            <Link href="/providers/register" className="text-green-600 font-medium hover:underline">
              Registra tu servicio después de crear tu cuenta
            </Link>
          </p>
        </div>

        {/* Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Al crear una cuenta, aceptas nuestros{' '}
            <a href="#" className="text-purple-600 hover:underline">términos</a> y{' '}
            <a href="#" className="text-purple-600 hover:underline">privacidad</a>
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
