'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '../context/TranslationContext'
import LanguageToggle from './LanguageToggle'
import BookingModal from './BookingModal'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Star, Shield, Clock, MapPin, Phone, MessageCircle, Calendar, Award, CheckCircle, Users, DollarSign, Wrench, Camera, Heart } from 'lucide-react'

interface TranslatedProviderDetailPageProps {
  providerId: string
}

export default function TranslatedProviderDetailPage({ providerId }: TranslatedProviderDetailPageProps) {
  const { t } = useTranslation()
  const { isSignedIn, user } = useUser()
  const [provider, setProvider] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Fetch provider data from API
  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await fetch(`/api/providers/${providerId}`)
        if (response.ok) {
          const data = await response.json()
          // Enrich data with default values
          setProvider({
            ...data,
            reviews: data.reviews || 0,
            response_time: data.response_time || '30min',
            price_range: data.price_range || '$25-45/hora',
            experience: data.experience || 5,
            services: [
              'Servicio profesional garantizado',
              'Atención personalizada',
              'Presupuesto sin compromiso'
            ],
            portfolio: [],
            recent_reviews: [],
            availability: 'Lun-Dom 7:00-22:00',
            emergency_available: false,
            insurance: true,
            warranty: '30 días'
          })
        } else {
          setProvider(null)
        }
      } catch (error) {
        console.error('Error fetching provider:', error)
        console.error('Provider ID:', providerId)
        console.error('Response status:', response?.status)
        setProvider(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProvider()
  }, [providerId])

  const handleWhatsAppContact = () => {
    const message = `Hola ${provider?.name}, me interesa contratar sus servicios de ${provider?.service_type}. ¿Podríamos coordinar?`
    const whatsappURL = `https://wa.me/${provider?.phone?.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4 animate-pulse">
            P
          </div>
          <p className="text-gray-600">Cargando perfil del profesional...</p>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profesional no encontrado</h1>
          <p className="text-gray-600 mb-6">El profesional que buscas no existe o ha sido eliminado.</p>
          <Link href="/providers">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
              Ver Todos los Profesionales
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-2xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl">EcuaCasa</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-gray-900 font-medium">
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
              
              {!isSignedIn ? (
                <>
                  <Link href="/providers/register">
                    <button className="border border-purple-600 text-purple-600 px-6 py-2.5 rounded-full font-semibold hover:bg-purple-50 transition-all">
                      {t('nav.professional')}
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-all">
                      {t('nav.start')}
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/providers/register">
                    <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-50 transition-all">
                      {t('nav.professional')}
                    </button>
                  </Link>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                        userButtonPopoverCard: "shadow-2xl border border-gray-200",
                        userButtonPopoverActions: "bg-white"
                      }
                    }}
                    userProfileProps={{
                      appearance: {
                        elements: {
                          card: "shadow-2xl"
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="pt-20 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/providers" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Volver a profesionales
          </Link>
        </div>
      </div>

      {/* Provider Header */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Section */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4">
                  {provider.name.charAt(0).toUpperCase()}
                </div>
                
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">{provider.name}</h1>
                  <p className="text-xl text-purple-600 font-semibold mb-3">{provider.service_type}</p>
                  
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{provider.location}, Cuenca</span>
                  </div>

                  <div className="flex items-center gap-4 justify-center lg:justify-start mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold">{provider.rating}</span>
                      <span className="text-gray-600">({provider.reviews} reseñas)</span>
                    </div>
                    {provider.verified && (
                      <div className="flex items-center gap-1">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span className="text-green-600 font-medium">Verificado</span>
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {provider.experience}+ años exp
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {provider.response_time}
                    </span>
                    {provider.emergency_available && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        24/7 Emergencias
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                    <Award className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="font-bold text-lg text-gray-900">{provider.rating}</p>
                    <p className="text-xs text-gray-600">Calificación</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                    <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="font-bold text-lg text-gray-900">{provider.reviews}</p>
                    <p className="text-xs text-gray-600">Trabajos</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                    <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="font-bold text-lg text-gray-900">{provider.response_time}</p>
                    <p className="text-xs text-gray-600">Respuesta</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center shadow-sm">
                    <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="font-bold text-xl text-purple-700">{provider.price_range}</p>
                    <p className="text-xs text-purple-600 font-medium">Tarifa</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-3 flex-col sm:flex-row sm:justify-start">
                  <button 
                    onClick={handleWhatsAppContact}
                    className="bg-green-600 text-white py-3 px-5 rounded-xl font-semibold text-base hover:bg-green-700 transition-all flex items-center gap-2 w-fit"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contactar por WhatsApp
                  </button>
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="bg-purple-600 text-white py-3 px-5 rounded-xl font-semibold text-base hover:bg-purple-700 transition-all flex items-center gap-2 w-fit"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200">
              {[
                { id: 'overview', label: 'Información General', icon: <Wrench className="w-4 h-4" /> },
                { id: 'portfolio', label: 'Trabajos Realizados', icon: <Camera className="w-4 h-4" /> },
                { id: 'reviews', label: 'Reseñas', icon: <Star className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Acerca de {provider.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{provider.description}</p>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Servicios Especializados</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {provider.services.map((service: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-gray-900">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Disponibilidad</h4>
                      <p className="text-gray-600">{provider.availability}</p>
                      {provider.emergency_available && (
                        <p className="text-green-600 font-medium mt-1">✓ Disponible para emergencias 24/7</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Garantías</h4>
                      <p className="text-gray-600">Garantía de {provider.warranty} en todos los trabajos</p>
                      {provider.insurance && (
                        <p className="text-green-600 font-medium mt-1">✓ Cuenta con seguro de responsabilidad</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Trabajos Realizados</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {provider.portfolio.map((image: string, index: number) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                        <img 
                          src={image} 
                          alt={`Trabajo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Reseñas de Clientes</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">{provider.rating}</span>
                      <span className="text-gray-600">({provider.reviews} reseñas)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {provider.recent_reviews.map((review: any, index: number) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Providers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            Otros Profesionales Similares
          </h2>
          <div className="text-center">
            <Link href="/providers">
              <button className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition-all">
                Ver Más Profesionales
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-12 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            ¿Listo para contratar a {provider.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contacta directamente y agenda tu servicio en segundos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleWhatsAppContact}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-green-700 transition-all flex items-center gap-2 w-fit mx-auto sm:mx-0"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition-all flex items-center gap-2 w-fit mx-auto sm:mx-0">
              <Phone className="w-4 h-4" />
              Llamar
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {provider && (
        <BookingModal 
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          provider={provider}
        />
      )}
    </div>
  )
}