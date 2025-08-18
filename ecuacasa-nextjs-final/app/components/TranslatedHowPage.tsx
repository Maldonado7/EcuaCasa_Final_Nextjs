'use client'

import { useTranslation } from '../context/TranslationContext'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import AccountDropdown from './AccountDropdown'
import LanguageToggle from './LanguageToggle'
import Link from 'next/link'
import { Search, UserCheck, Star, ArrowRight, Shield, Clock, DollarSign, CheckCircle } from 'lucide-react'

export default function TranslatedHowPage() {
  const { t } = useTranslation()
  const { isSignedIn, user } = useUser()

  const steps = [
    {
      number: '01',
      title: 'Busca el servicio',
      description: 'Encuentra exactamente lo que necesitas entre +30 categorías de servicios para el hogar.',
      icon: <Search className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02', 
      title: 'Elige tu profesional',
      description: 'Compara perfiles, calificaciones y precios. Todos nuestros profesionales están verificados.',
      icon: <UserCheck className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Contrata y califica',
      description: 'Contacta directamente, agenda el servicio y califica tu experiencia al finalizar.',
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Profesionales Verificados',
      description: 'Todos pasan por un proceso de verificación de identidad y competencias.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Respuesta Rápida',
      description: 'Obtén respuestas en menos de 2 horas y agenda según tu disponibilidad.'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Precios Transparentes',
      description: 'Sin tarifas ocultas. Ve los precios antes de contratar el servicio.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Calidad Garantizada',
      description: 'Sistema de calificaciones y reviews para garantizar la mejor experiencia.'
    }
  ]

  const faqs = [
    {
      question: '¿Cómo sé que los profesionales son confiables?',
      answer: 'Todos los profesionales pasan por un proceso de verificación que incluye validación de identidad, referencias y competencias técnicas.'
    },
    {
      question: '¿Cuánto tiempo toma encontrar un profesional?',
      answer: 'La mayoría de nuestros profesionales responden en menos de 2 horas. Para emergencias, tenemos profesionales disponibles 24/7.'
    },
    {
      question: '¿Puedo cancelar un servicio?',
      answer: 'Sí, puedes cancelar hasta 2 horas antes del servicio sin penalización. Para cancelaciones de último momento, aplican términos específicos.'
    },
    {
      question: '¿Qué pasa si no estoy satisfecho?',
      answer: 'Tenemos una garantía de satisfacción. Si no estás contento con el servicio, trabajamos contigo y el profesional para resolver cualquier problema.'
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
              <Link href="/services" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.services')}
              </Link>
              <Link href="/providers" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.providers')}
              </Link>
              <Link href="/how" className="text-purple-600 font-medium">
                {t('nav.how')}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <LanguageToggle />
              
              {/* SOY PROFESIONAL Button - Always visible */}
              <Link href="/providers/register">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 rounded-full font-bold text-sm hover:shadow-lg transition-all">
                  {t('nav.professional')}
                </button>
              </Link>

              {/* Account Section */}
              {isSignedIn ? (
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: 'w-10 h-10'
                    }
                  }}
                  afterSignOutUrl="/"
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Mi Perfil Profesional"
                      labelIcon={<span>💼</span>}
                      href="/my-provider-profile"
                    />
                    {/* Admin access for specific users */}
                    {user?.emailAddresses[0]?.emailAddress === 'ecuacasa.app@gmail.com' && (
                      <UserButton.Link
                        label="Panel Admin"
                        labelIcon={<span>⚙️</span>}
                        href="/admin"
                      />
                    )}
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <AccountDropdown />
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
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              ¿Cómo{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Funciona?
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Conectar con profesionales de confianza nunca fue tan fácil. 
              Sigue estos 3 simples pasos y resuelve cualquier necesidad de tu hogar.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-3/4 w-1/4 h-0.5 bg-gradient-to-r from-gray-300 to-gray-100"></div>
                )}
                
                <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl items-center justify-center text-white mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-400 tracking-wider">PASO {step.number}</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-2">{step.title}</h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              ¿Por qué elegir EcuaCasa?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Más de 2,500 familias ecuatorianas ya confían en nosotros para resolver sus necesidades del hogar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                <div className="inline-flex w-12 h-12 bg-purple-100 rounded-xl items-center justify-center text-purple-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Únete a miles de ecuatorianos que ya resuelven sus necesidades del hogar con EcuaCasa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
                Buscar Profesionales
              </button>
            </Link>
            <Link href="/providers/register">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Soy Profesional
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}