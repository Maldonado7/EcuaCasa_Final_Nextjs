'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { useClerkSafe } from '../hooks/useClerkSafe'
import CombinedLocationSelector from './CombinedLocationSelector'
import ServiceSelector from './ServiceSelector'
import LanguageToggle from './LanguageToggle'
import AccountDropdown from './AccountDropdown'
import Link from 'next/link'
import { Search, Star, Shield, Users, TrendingUp, ArrowRight, Clock, DollarSign, Calendar } from 'lucide-react'

interface TranslatedHomePageProps {
  providers: any[]
  services: any[]
  stats: { users: number; providers: number }
}

export default function TranslatedHomePage({ providers, services, stats }: TranslatedHomePageProps) {
  const { t, language } = useTranslation()
  const { useUser, UserButton, isClerkDisabled } = useClerkSafe()
  const [isClient, setIsClient] = useState(false)
  
  // Ensure we're on the client before using Clerk hooks
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const { isSignedIn, user } = isClient ? useUser() : { isSignedIn: false, user: null }
  const [selectedLocation, setSelectedLocation] = useState('cuenca')
  const [selectedService, setSelectedService] = useState('')
  const [currentUserProviderId, setCurrentUserProviderId] = useState<string | null>(null)
  const [userHasProviderProfile, setUserHasProviderProfile] = useState(false)
  
  // Fetch current user's provider profile if they are signed in
  useEffect(() => {
    const fetchUserProvider = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch('/api/providers/register')
          const data = await response.json()
          if (data.hasProfile && data.provider) {
            setCurrentUserProviderId(data.provider.id)
            setUserHasProviderProfile(true)
          }
        } catch (error) {
          console.error('Error fetching user provider:', error)
        }
      } else {
        // Clear provider state when user is not signed in
        setCurrentUserProviderId(null)
        setUserHasProviderProfile(false)
      }
    }
    fetchUserProvider()
  }, [isSignedIn, user])

  // Keep only Cuenca providers for SEO (homepage featured section)
  const cuencaProviders = providers.filter(provider => {
    // Filter by Cuenca locations
    const isInCuenca = provider.location?.toLowerCase().includes('cuenca') ||
      provider.location?.toLowerCase().includes('el centro') ||
      provider.location?.toLowerCase().includes('san joaquín') ||
      provider.location?.toLowerCase().includes('yanuncay') ||
      provider.location?.toLowerCase().includes('san sebastián') ||
      provider.location?.toLowerCase().includes('totoracocha') ||
      provider.location?.toLowerCase().includes('monay') ||
      provider.location?.toLowerCase().includes('el batán') ||
      provider.location?.toLowerCase().includes('ricaurte')
    
    // If user is signed out, don't show their own provider card
    if (!isSignedIn && currentUserProviderId && provider.id === currentUserProviderId) {
      return false
    }
    
    return isInCuenca
  }).slice(0, 6) // Show only 6 Cuenca providers (2 rows of 3)

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location)
  }

  const handleServiceChange = (service: string) => {
    setSelectedService(service)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedService) params.set('service', selectedService)
    if (selectedLocation) params.set('location', selectedLocation)
    
    window.location.href = `/providers?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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
              <Link href="/how" className="text-gray-700 hover:text-gray-900 font-medium">
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
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <TrendingUp className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('hero.cuenca')}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {t('hero.subtitle', { count: stats.users.toLocaleString() })}
            </p>

            {/* Simple Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex flex-col lg:flex-row items-center gap-4 border border-white/50">
                <div className="flex-shrink-0">
                  <ServiceSelector onServiceChange={handleServiceChange} placeholder="Todos los servicios" />
                </div>
                
                <div className="flex-shrink-0">
                  <CombinedLocationSelector onLocationChange={handleLocationChange} />
                </div>
                
                <button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-16 py-5 rounded-xl font-bold text-xl hover:shadow-xl transition-all transform hover:scale-105 whitespace-nowrap flex-1 lg:flex-initial"
                >
                  {t('hero.search.button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-black flex items-center justify-center text-white font-bold text-xs">
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="text-white">
                <span className="font-bold text-lg">{stats.users.toLocaleString()}+</span>
                <span className="text-gray-400 text-sm ml-1">{t('stats.users')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="font-bold text-lg">4.9/5</span>
              <span className="text-gray-400 text-sm">{t('stats.rating')}</span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="font-bold text-lg">100%</span>
              <span className="text-gray-400 text-sm">{t('stats.verified')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Compact */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              {t('services.title')}
            </h2>
            <p className="text-gray-600">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Compact Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link href="/providers?service=plomería&location=cuenca" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group text-center hover:scale-105">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔧</div>
              <h3 className="font-bold text-sm">Plomería</h3>
              <p className="text-xs text-white/80 mt-1">156+</p>
            </Link>

            <Link href="/providers?service=electricidad&location=cuenca" className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group text-center hover:scale-105">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="font-bold text-sm">Electricidad</h3>
              <p className="text-xs text-white/80 mt-1">98+</p>
            </Link>

            <Link href="/providers?service=carpintería&location=cuenca" className="bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group text-center hover:scale-105">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔨</div>
              <h3 className="font-bold text-sm">Carpintería</h3>
              <p className="text-xs text-white/80 mt-1">87+</p>
            </Link>

            <Link href="/providers?service=pintura&location=cuenca" className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group text-center hover:scale-105">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🏠</div>
              <h3 className="font-bold text-sm">Pintura</h3>
              <p className="text-xs text-white/80 mt-1">76+</p>
            </Link>

            <Link href="/providers?service=limpieza&location=cuenca" className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group text-center hover:scale-105">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🧹</div>
              <h3 className="font-bold text-sm">Limpieza</h3>
              <p className="text-xs text-white/80 mt-1">143+</p>
            </Link>

            <Link href="/services" className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group text-center hover:scale-105">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">➕</div>
              <h3 className="font-bold text-sm">Ver Todos</h3>
              <p className="text-xs text-white/80 mt-1">30+ más</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              {t('providers.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              {t('providers.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuencaProviders.map((provider, i) => (
              <Link key={provider.id} href={`/providers/${provider.id}`} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-xl hover:border-purple-300 transition-all h-full relative">
                  {/* "Tu perfil" Badge if this is the current user's provider profile */}
                  {currentUserProviderId && provider.id === currentUserProviderId && (
                    <div className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                      Tu perfil
                    </div>
                  )}
                  
                  {/* Simple Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {provider.name?.charAt(0) || 'P'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">
                        {provider.name || `Professional ${i + 1}`}
                      </h3>
                      <p className="text-purple-600 font-medium text-sm">
                        {provider.service_type || 'Plomero Master'}
                      </p>
                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-3 h-3 ${
                                idx < Math.floor(provider.rating || 5) 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {provider.rating || '5.0'} ({provider.jobs_completed || 342})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Info - Only 3 items */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('card.price')}</span>
                      <span className="font-semibold text-gray-900">
                        {provider.price_range || '$25-45/hora'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('card.location')}</span>
                      <span className="text-gray-900">
                        {provider.location || 'El Centro'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('card.response')}</span>
                      <span className="text-gray-900">
                        {provider.response_time || '30min'}
                      </span>
                    </div>
                  </div>

                  {/* Single Badge */}
                  {provider.verified !== false && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">{t('card.verified')}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show to users who don't have provider profiles */}
      {(!isSignedIn || !userHasProviderProfile) && (
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
                {t('cta.signup')}
              </button>
            </Link>
            <Link href="/providers/register">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                {t('cta.professional')}
              </button>
            </Link>
          </div>
        </div>
      </section>
      )}
    </div>
  )
}