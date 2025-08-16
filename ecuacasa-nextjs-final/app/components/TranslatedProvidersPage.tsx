'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from '../context/TranslationContext'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import CombinedLocationSelector from './CombinedLocationSelector'
import ServiceSelector from './ServiceSelector'
import LanguageToggle from './LanguageToggle'
import ProvidersMap from './ProvidersMap'
import BookingModal from './BookingModal'
import Link from 'next/link'
import { Search, Star, Shield, Clock, MapPin, Filter, ChevronDown, TrendingUp, Wrench, Zap, Hammer, Paintbrush, Grid3X3, Map, Calendar, DollarSign } from 'lucide-react'

interface TranslatedProvidersPageProps {
  providers: any[]
}

export default function TranslatedProvidersPage({ providers }: TranslatedProvidersPageProps) {
  const { t } = useTranslation()
  const { isSignedIn, user } = useUser()
  const searchParams = useSearchParams()
  const [filteredProviders, setFilteredProviders] = useState(providers)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<any>(null)

  // Initialize search state from URL parameters
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    const locationParam = searchParams.get('location')
    
    if (serviceParam) {
      setSelectedService(serviceParam)
    }
    if (locationParam) {
      setSelectedLocation(locationParam)
    }
  }, [searchParams])

  console.log('Providers received:', providers?.length, providers)

  // Filter providers based on dropdowns only
  useEffect(() => {
    console.log('Filtering with:', { selectedLocation, selectedService })
    let filtered = providers || []

    // Filter by location - SIMPLIFIED
    if (selectedLocation && selectedLocation !== 'todo-ecuador' && selectedLocation !== '') {
      console.log('=== LOCATION FILTER DEBUG ===')
      console.log('Selected location:', selectedLocation)
      console.log('All providers before filter:', filtered.map(p => ({ name: p.name, location: p.location })))
      
      // Simple approach: just match the location string directly
      filtered = filtered.filter(provider => {
        const providerLocation = (provider.location || '').toLowerCase()
        const searchLocation = selectedLocation.toLowerCase()
        
        // For cuenca, show all cuenca providers (match by neighborhood names)
        if (searchLocation === 'cuenca') {
          const cuencaNeighborhoods = ['el centro', 'san joaquín', 'yanuncay', 'san sebastián', 'totoracocha', 'monay', 'el batán', 'ricaurte']
          const match = cuencaNeighborhoods.some(neighborhood => providerLocation.includes(neighborhood))
          console.log(`${provider.name}: "${providerLocation}" is in Cuenca neighborhoods? ${match}`)
          return match
        }
        
        // For specific neighborhoods like "cuenca-san-joaquín-123"
        if (searchLocation.includes('-')) {
          // Extract just the neighborhood part (remove cuenca and ID)
          const parts = searchLocation.split('-')
          const neighborhood = parts.slice(1, -1).join(' ') // "san joaquín"
          
          const match = providerLocation.includes(neighborhood)
          console.log(`${provider.name}: "${providerLocation}" includes "${neighborhood}"? ${match}`)
          return match
        }
        
        // For other cities like "quito", "guayaquil", etc.
        if (['quito', 'guayaquil', 'ambato', 'loja'].includes(searchLocation)) {
          const match = providerLocation.includes(searchLocation)
          console.log(`${provider.name}: "${providerLocation}" includes "${searchLocation}"? ${match}`)
          return match
        }
        
        // Default: direct match
        const match = providerLocation.includes(searchLocation)
        console.log(`${provider.name}: "${providerLocation}" includes "${searchLocation}"? ${match}`)
        return match
      })
      
      console.log('Filtered providers:', filtered.map(p => ({ name: p.name, location: p.location })))
      console.log('=== END FILTER DEBUG ===')
    }

    // Filter by service
    if (selectedService && selectedService.length > 0) {
      console.log('Filtering by service:', selectedService)
      console.log('Available providers for service filter:', filtered.map(p => ({ name: p.name, service_type: p.service_type })))
      
      filtered = filtered.filter(provider => {
        const providerService = (provider.service_type || '').toLowerCase()
        
        // Map service names to job titles
        const serviceMapping: { [key: string]: string[] } = {
          'plomería': ['plomero', 'plomería', 'fontanero'],
          'electricidad': ['electricista', 'eléctrico'],
          'carpintería': ['carpintero', 'madera'],
          'pintura': ['pintor', 'pintora'],
          'limpieza': ['limpieza', 'limpiador'],
          'jardinería': ['jardinero', 'paisajista'],
          'cerrajería': ['cerrajero', 'cerradura'],
          'albañilería': ['albañil', 'construcción']
        }
        
        const searchTerms = serviceMapping[selectedService] || [selectedService]
        const match = searchTerms.some(term => providerService.includes(term))
        
        console.log(`${provider.name}: "${providerService}" matches service "${selectedService}"? ${match}`)
        return match
      })
      
      console.log('Providers after service filter:', filtered.map(p => ({ name: p.name, service_type: p.service_type })))
    }

    console.log('Filtered providers:', filtered?.length, filtered)
    setFilteredProviders(filtered)
  }, [providers, selectedLocation, selectedService])

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location)
  }

  const handleServiceChange = (service: string) => {
    setSelectedService(service)
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Nav - Same as homepage */}
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
              <Link href="/providers" className="text-purple-600 font-medium">
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

      {/* Hero Section with Purple Gradient */}
      <section className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              100% {t('providers.verified')}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {t('providers.hero.title')}{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('providers.hero.perfect')}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {t('providers.hero.subtitle')}
            </p>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              {/* Main Search Bar */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex flex-col lg:flex-row items-center gap-4 border border-white/50">
                <div className="flex-shrink-0">
                  <ServiceSelector onServiceChange={handleServiceChange} placeholder="Todos los servicios" />
                </div>
                
                <div className="flex-shrink-0">
                  <CombinedLocationSelector onLocationChange={handleLocationChange} />
                </div>
                
                <button 
                  onClick={() => {
                    // Trigger search/filter - the useEffect will handle the filtering
                    console.log('Search triggered with:', { selectedLocation, selectedService })
                  }}
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
      <section className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            <div className="text-white text-center">
              <span className="font-bold text-2xl">{providers.length || '500'}+</span>
              <span className="text-gray-400 text-sm ml-2">{t('stats.professionals')}</span>
            </div>
            <div className="text-white text-center">
              <span className="font-bold text-2xl">15K+</span>
              <span className="text-gray-400 text-sm ml-2">{t('stats.completed')}</span>
            </div>
            <div className="text-white text-center">
              <span className="font-bold text-2xl">4.8</span>
              <span className="text-gray-400 text-sm ml-2">{t('stats.rating')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                {t('providers.available')}
              </h2>
              <p className="text-gray-600 mt-1">
                {t('providers.showing')} {filteredProviders.length} {t('providers.results')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'map' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  Map
                </button>
              </div>

              {/* Sort Dropdown */}
              <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700">
                <option>{t('sort.best.rated')}</option>
                <option>{t('sort.most.jobs')}</option>
                <option>{t('sort.fastest.response')}</option>
                <option>{t('sort.price.low')}</option>
                <option>{t('sort.price.high')}</option>
              </select>
            </div>
          </div>

          {/* Conditional View: Grid or Map */}
          {viewMode === 'grid' ? (
            /* Provider Cards Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.length > 0 ? filteredProviders.map((provider, i) => (
              <div key={provider.id || i} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {provider.name?.charAt(0).toUpperCase() || 'P'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {provider.name || `Professional ${i + 1}`}
                      </h3>
                      <p className="text-purple-600 font-semibold text-sm">
                        {provider.service_type || 'Plomero Master'}
                      </p>
                      {/* Rating inline */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-4 h-4 ${
                                idx < Math.floor(provider.rating || 5) 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {provider.rating || 5.0} ({provider.reviews || 342})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="bg-gray-50 rounded-xl p-3 space-y-2 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Precio
                      </span>
                      <span className="font-semibold text-purple-700">
                        {provider.price_range || '$25-45/hora'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Ubicación
                      </span>
                      <span className="text-gray-900">
                        {provider.location || 'Cuenca Centro'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Respuesta
                      </span>
                      <span className="text-gray-900">
                        {provider.response_time || '30min'}
                      </span>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-green-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Verificado</span>
                    </div>
                    {provider.experience && (
                      <span className="text-sm text-gray-600">
                        {provider.experience}+ años exp
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/providers/${provider.id || i}`} className="flex-1">
                      <button className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                        Ver Perfil
                      </button>
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedProvider(provider)
                        setShowBookingModal(true)
                      }}
                      className="bg-purple-100 text-purple-600 px-4 py-2.5 rounded-xl font-semibold hover:bg-purple-200 transition-all"
                      title="Agendar cita"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              // No results state
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('providers.no.results')}</h3>
                <p className="text-gray-600">{t('providers.try.different')}</p>
                <button 
                  onClick={() => {
                    setSelectedLocation('')
                    setSelectedService('')
                  }}
                  className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-all"
                >
                  {t('providers.clear.filters')}
                </button>
              </div>
            )}
            </div>
          ) : (
            /* Map View */
            <div className="w-full">
              <ProvidersMap providers={filteredProviders} />
            </div>
          )}

          {/* Load More - Only show in grid view */}
          {viewMode === 'grid' && filteredProviders.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all">
                {t('providers.load.more')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('cta.professional.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('cta.professional.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/providers/register">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
                {t('cta.professional')} →
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                {t('nav.how')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedProvider && (
        <BookingModal 
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedProvider(null)
          }}
          provider={selectedProvider}
        />
      )}
    </div>
  )
}