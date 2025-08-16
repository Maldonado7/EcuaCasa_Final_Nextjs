'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'es' | 'en'

interface Translations {
  [key: string]: {
    es: string
    en: string
  }
}

const translations: Translations = {
  // Navigation
  'nav.services': { es: 'Servicios', en: 'Services' },
  'nav.providers': { es: 'Profesionales', en: 'Providers' },
  'nav.how': { es: 'Cómo funciona', en: 'How it works' },
  'nav.start': { es: 'Empezar', en: 'Get Started' },
  'nav.professional': { es: 'Soy Profesional', en: "I'm a Professional" },

  // Hero Section
  'hero.badge': { es: '#1 Marketplace de Servicios en Ecuador', en: '#1 Home Services Marketplace in Ecuador' },
  'hero.title': { es: 'Servicios para el hogar en', en: 'Home services in' },
  'hero.cuenca': { es: 'Cuenca', en: 'Cuenca' },
  'hero.subtitle': { es: 'Encuentra profesionales verificados en Cuenca y todo Ecuador.\nConectamos +{count} hogares con expertos locales.', en: 'Find verified professionals in Cuenca and all Ecuador.\nWe connect +{count} homes with local experts.' },
  'hero.search.placeholder': { es: '¿Qué servicio necesitas?', en: 'What service do you need?' },
  'hero.search.button': { es: 'Buscar', en: 'Search' },
  'hero.popular': { es: 'Popular en Cuenca:', en: 'Popular in Cuenca:' },

  // Location Selector
  'location.all.ecuador': { es: '🇪🇨 Todo Ecuador', en: '🇪🇨 All Ecuador' },
  'location.all.city': { es: 'Toda {city}', en: 'All {city}' },
  'location.loading': { es: 'Cargando...', en: 'Loading...' },

  // Stats Bar
  'stats.professionals': { es: 'profesionales', en: 'professionals' },
  'stats.jobs': { es: 'trabajos completados', en: 'jobs completed' },
  'stats.rating': { es: 'calificación promedio', en: 'average rating' },
  'stats.users': { es: 'usuarios activos', en: 'active users' },
  'stats.verified': { es: '100% verificados', en: '100% verified' },

  // Services Section
  'services.title': { es: 'Todos los servicios que necesitas', en: 'All the services you need' },
  'services.subtitle': { es: 'Un click te separa de la solución', en: 'One click away from the solution' },
  'services.emergency': { es: 'Emergencias 24/7 disponibles', en: '24/7 emergencies available' },
  'services.available': { es: 'disponibles', en: 'available' },
  'services.quote': { es: 'Cotiza gratis', en: 'Free quote' },
  'services.view.all': { es: 'Ver todos los servicios', en: 'View all services' },
  'services.categories': { es: '+30 categorías disponibles', en: '+30 categories available' },

  // Providers Section
  'providers.badge': { es: 'Mejor Calificados', en: 'Top Rated This Week' },
  'providers.title': { es: 'Profesionales que marcan la diferencia', en: 'Professionals who make a difference' },
  'providers.featured': { es: '⭐ DESTACADO', en: '⭐ FEATURED' },
  'providers.responds': { es: 'Responde', en: 'Responds' },
  'providers.price': { es: 'Precio', en: 'Price' },
  'providers.experience': { es: 'Exp', en: 'Exp' },
  'providers.years': { es: 'años', en: 'years' },
  'providers.jobs': { es: 'trabajos', en: 'jobs' },
  'providers.reviews': { es: 'reseñas', en: 'reviews' },
  'providers.response': { es: 'Respuesta', en: 'Response' },
  'providers.verified': { es: 'Verificado', en: 'Verified' },
  'providers.view.profile': { es: 'Ver Perfil', en: 'View Profile' },

  // CTA Section
  'cta.title': { es: 'Empieza hoy, es gratis', en: 'Start today, it\'s free' },
  'cta.subtitle': { es: 'Únete a miles de ecuatorianos que ya confían en nosotros', en: 'Join thousands of Ecuadorians who already trust us' },
  'cta.signup': { es: 'Crear Cuenta Gratis →', en: 'Create Free Account →' },
  'cta.professional': { es: 'Soy Profesional', en: 'I\'m a Professional' },

  // Professional CTA
  'pro.cta.title': { es: '¿Eres profesional?', en: 'Are you a professional?' },
  'pro.cta.subtitle': { es: 'Únete a miles de profesionales que ya están creciendo con EcuaCasa', en: 'Join thousands of professionals already growing with EcuaCasa' },
  'pro.cta.register': { es: 'Registrarme como Profesional →', en: 'Register as Professional →' },
  'pro.cta.info': { es: 'Más información', en: 'More information' },

  // Popular Searches
  'search.plumber.center': { es: 'Plomero El Centro', en: 'Plumber Downtown' },
  'search.electrician.sj': { es: 'Electricista San Joaquín', en: 'Electrician San Joaquín' },
  'search.cleaning.ss': { es: 'Limpieza San Sebastián', en: 'Cleaning San Sebastián' },
  'search.painter.yanuncay': { es: 'Pintor Yanuncay', en: 'Painter Yanuncay' },

  // Services
  'service.plumbing': { es: 'Plomería', en: 'Plumbing' },
  'service.electrical': { es: 'Electricidad', en: 'Electrical' },
  'service.carpentry': { es: 'Carpintería', en: 'Carpentry' },
  'service.painting': { es: 'Pintura', en: 'Painting' },
  'service.cleaning': { es: 'Limpieza', en: 'Cleaning' },
  'service.gardening': { es: 'Jardinería', en: 'Gardening' },
  'service.locksmith': { es: 'Cerrajería', en: 'Locksmith' },
  'service.construction': { es: 'Albañilería', en: 'Construction' },
  'service.all': { es: 'Todos los servicios', en: 'All services' },

  // Providers Page
  'providers.hero.title': { es: 'Encuentra al', en: 'Find the' },
  'providers.hero.perfect': { es: 'profesional perfecto', en: 'perfect professional' },
  'providers.hero.subtitle': { es: 'Miles de expertos listos para ayudarte en toda Ecuador', en: 'Thousands of experts ready to help you throughout Ecuador' },
  'providers.available': { es: 'Profesionales disponibles', en: 'Available professionals' },
  'providers.showing': { es: 'Mostrando', en: 'Showing' },
  'providers.results': { es: 'resultados', en: 'results' },
  'providers.no.results': { es: 'No se encontraron profesionales', en: 'No professionals found' },
  'providers.try.different': { es: 'Intenta con diferentes filtros de búsqueda', en: 'Try different search filters' },
  'providers.clear.filters': { es: 'Limpiar filtros', en: 'Clear filters' },
  'providers.load.more': { es: 'Cargar más profesionales', en: 'Load more professionals' },

  // Filters
  'filter.price.any': { es: 'Precio: Cualquiera', en: 'Price: Any' },
  'filter.price.budget': { es: 'Económico', en: 'Budget' },
  'filter.price.moderate': { es: 'Moderado', en: 'Moderate' },
  'filter.price.premium': { es: 'Premium', en: 'Premium' },
  'filter.rating.all': { es: 'Calificación: Todas', en: 'Rating: All' },
  'filter.rating.excellent': { es: 'Excelente', en: 'Excellent' },
  'filter.rating.verygood': { es: 'Muy bueno', en: 'Very good' },
  'filter.rating.good': { es: 'Bueno', en: 'Good' },
  'filter.availability.any': { es: 'Disponibilidad: Cualquiera', en: 'Availability: Any' },
  'filter.availability.emergency': { es: 'Emergencia 24/7', en: 'Emergency 24/7' },
  'filter.availability.quick': { es: 'Respuesta rápida', en: 'Quick response' },
  'filter.availability.schedule': { es: 'Programar cita', en: 'Schedule appointment' },
  'filter.more': { es: 'Más filtros', en: 'More filters' },

  // Sorting
  'sort.best.rated': { es: 'Ordenar: Mejor calificados', en: 'Sort: Best rated' },
  'sort.most.jobs': { es: 'Más trabajos completados', en: 'Most jobs completed' },
  'sort.fastest.response': { es: 'Respuesta más rápida', en: 'Fastest response' },
  'sort.price.low': { es: 'Precio: Menor a mayor', en: 'Price: Low to high' },
  'sort.price.high': { es: 'Precio: Mayor a menor', en: 'Price: High to low' },

  // Professional CTA
  'cta.professional.title': { es: '¿Eres profesional?', en: 'Are you a professional?' },
  'cta.professional.subtitle': { es: 'Únete a miles de profesionales que ya están creciendo con EcuaCasa', en: 'Join thousands of professionals already growing with EcuaCasa' },

  // Stats
  'stats.completed': { es: 'trabajos completados', en: 'jobs completed' },

  // Trade Search
  'providers.search.by.trade': { es: 'Buscar por oficio', en: 'Search by trade' },
  'providers.search.popular.trades': { es: 'Oficios más solicitados en Ecuador', en: 'Most requested trades in Ecuador' },
}

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguage(savedLang)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`)
      return key
    }

    let text = translation[language] || translation.es
    
    // Replace parameters in the text
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{${param}}`, 'g'), String(value))
      })
    }

    return text
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}