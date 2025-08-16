'use client'

import { useTranslation } from '../context/TranslationContext'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import LanguageToggle from './LanguageToggle'
import Link from 'next/link'
import { ArrowRight, Star, Clock, Shield, TrendingUp } from 'lucide-react'

export default function TranslatedServicesPage() {
  const { t } = useTranslation()
  const { isSignedIn, user } = useUser()

  const serviceCategories = [
    {
      category: 'Hogar',
      services: [
        { name: 'Plomería', icon: '🔧', providers: 156, description: 'Reparaciones, instalaciones y emergencias 24/7' },
        { name: 'Electricidad', icon: '⚡', providers: 98, description: 'Instalaciones eléctricas y reparaciones seguras' },
        { name: 'Carpintería', icon: '🔨', providers: 87, description: 'Muebles a medida y reparaciones de madera' },
        { name: 'Pintura', icon: '🏠', providers: 76, description: 'Pintura interior, exterior y decorativa' },
        { name: 'Limpieza', icon: '🧹', providers: 143, description: 'Limpieza profunda y mantenimiento regular' },
        { name: 'Cerrajería', icon: '🔑', providers: 45, description: 'Cerraduras, llaves y seguridad del hogar' }
      ]
    },
    {
      category: 'Exterior',
      services: [
        { name: 'Jardinería', icon: '🌱', providers: 65, description: 'Diseño, mantenimiento y paisajismo' },
        { name: 'Albañilería', icon: '🧱', providers: 89, description: 'Construcción y remodelación' },
        { name: 'Techado', icon: '🏗️', providers: 34, description: 'Reparación e instalación de techos' },
        { name: 'Piscinas', icon: '🏊', providers: 23, description: 'Mantenimiento y reparación de piscinas' }
      ]
    },
    {
      category: 'Tecnología',
      services: [
        { name: 'Aire Acondicionado', icon: '❄️', providers: 52, description: 'Instalación, reparación y mantenimiento' },
        { name: 'Electrodomésticos', icon: '🔌', providers: 67, description: 'Reparación de lavadoras, refrigeradoras, etc.' },
        { name: 'Internet/TV', icon: '📺', providers: 41, description: 'Instalación de internet y sistemas de TV' },
        { name: 'Seguridad', icon: '📹', providers: 38, description: 'Cámaras, alarmas y sistemas de seguridad' }
      ]
    },
    {
      category: 'Especializados',
      services: [
        { name: 'Mudanzas', icon: '📦', providers: 29, description: 'Servicio completo de mudanzas residenciales' },
        { name: 'Pest Control', icon: '🐛', providers: 19, description: 'Control de plagas y fumigación' },
        { name: 'Decoración', icon: '🎨', providers: 33, description: 'Diseño de interiores y decoración' },
        { name: 'Mascotas', icon: '🐕', providers: 27, description: 'Cuidado, entrenamiento y veterinaria móvil' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-2xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl text-gray-900">EcuaCasa</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-purple-600 font-medium">
                {t('nav.services')}
              </Link>
              <Link href="/providers" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.providers')}
              </Link>
              <Link href="/how" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.how')}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <LanguageToggle />
              {isSignedIn ? (
                <>
                  <Link href="/dashboard">
                    <button className="text-gray-700 hover:text-purple-600 font-medium transition-all">
                      Mi Dashboard
                    </button>
                  </Link>
                  <Link href="/providers/register">
                    <button className="border border-purple-600 text-purple-600 px-6 py-2.5 rounded-full font-semibold hover:bg-purple-50 transition-all">
                      {t('nav.professional')}
                    </button>
                  </Link>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: 'w-10 h-10'
                      }
                    }}
                    userProfileMode="navigation"
                    userProfileUrl="/dashboard"
                  />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="border border-purple-600 text-purple-600 px-6 py-2.5 rounded-full font-semibold hover:bg-purple-50 transition-all">
                      Iniciar Sesión
                    </button>
                  </SignInButton>
                  <Link href="/sign-up-role">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all">
                      Crear Cuenta
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              +30 Categorías Disponibles
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Todos los{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Servicios
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Encuentra el profesional perfecto para cualquier trabajo en tu hogar. 
              Todos verificados, calificados y listos para ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={category.category} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  Servicios de {category.category}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, index) => (
                  <Link 
                    key={service.name} 
                    href={`/providers?service=${service.name.toLowerCase()}&location=cuenca`}
                    className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <div className="flex items-center gap-2 text-purple-600 font-semibold">
                          <span>{service.providers}+ profesionales</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">4.8+</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">Respuesta rápida</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Verificados</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            ¿No encuentras tu servicio?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Contáctanos y te ayudamos a encontrar el profesional perfecto para cualquier trabajo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/providers">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
                Ver Todos los Profesionales
              </button>
            </Link>
            <Link href="/providers/register">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Únete como Profesional
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}