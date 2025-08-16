'use client'

import { useState } from 'react'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { User, Wrench, ArrowRight } from 'lucide-react'

export default function SignUpRolePage() {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'professional' | null>(null)

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto mb-4">
              EC
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">¡Únete a EcuaCasa!</h1>
            <p className="text-gray-600">¿Cómo quieres usar nuestra plataforma?</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer Option */}
            <div 
              onClick={() => setSelectedRole('customer')}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-transparent hover:border-purple-300 cursor-pointer transition-all hover:scale-105 group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Soy Cliente</h2>
                <p className="text-gray-600 mb-6">
                  Busco profesionales para servicios en mi hogar
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Buscar y contactar profesionales
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Agendar servicios para mi hogar
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Gestionar mis reservas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Calificar servicios recibidos
                  </li>
                </ul>
                <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:gap-3 transition-all">
                  Continuar como Cliente
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Professional Option */}
            <div 
              onClick={() => setSelectedRole('professional')}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-transparent hover:border-purple-300 cursor-pointer transition-all hover:scale-105 group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Soy Profesional</h2>
                <p className="text-gray-600 mb-6">
                  Ofrezco servicios y quiero conseguir clientes
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Crear mi perfil profesional
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Recibir solicitudes de clientes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Gestionar mis servicios
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Aumentar mis ingresos
                  </li>
                </ul>
                <div className="flex items-center justify-center text-green-600 font-semibold group-hover:gap-3 transition-all">
                  Continuar como Profesional
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link href="/sign-in" className="text-purple-600 hover:text-purple-700 font-medium">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto mb-4">
            EC
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Registro como {selectedRole === 'customer' ? 'Cliente' : 'Profesional'}
          </h1>
          <p className="text-gray-600">Completa tu información para empezar</p>
          <button 
            onClick={() => setSelectedRole(null)}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2"
          >
            ← Cambiar tipo de cuenta
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  selectedRole === 'customer' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm normal-case'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-sm normal-case',
                card: 'shadow-none border-0',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden'
              }
            }}
            unsafeMetadata={{
              role: selectedRole
            }}
          />
        </div>
      </div>
    </div>
  )
}