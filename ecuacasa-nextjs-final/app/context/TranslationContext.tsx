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

  // Card Labels
  'card.price': { es: 'Precio', en: 'Price' },
  'card.location': { es: 'Ubicación', en: 'Location' },
  'card.response': { es: 'Respuesta', en: 'Response' },
  'card.verified': { es: 'Verificado', en: 'Verified' },
  'card.view.profile': { es: 'Ver Perfil', en: 'View Profile' },
  'card.schedule': { es: 'Agendar', en: 'Schedule' },
  'card.rating': { es: 'Calificación', en: 'Rating' },
  'card.schedule.appointment': { es: 'Agendar cita', en: 'Schedule appointment' },
  'card.quick.response': { es: 'Respuesta rápida', en: 'Quick response' },

  // Booking Modal
  'booking.title': { es: 'Agendar Cita', en: 'Schedule Appointment' },
  'booking.work.location': { es: 'Ubicación del Trabajo', en: 'Work Location' },

  // Admin Panel
  'admin.title': { es: 'Panel de Administración', en: 'Administration Panel' },
  'admin.overview': { es: 'Panel General', en: 'Overview' },
  'admin.providers': { es: 'Proveedores', en: 'Providers' },
  'admin.bookings': { es: 'Reservas', en: 'Bookings' },
  'admin.users': { es: 'Usuarios', en: 'Users' },
  'admin.settings': { es: 'Configuración', en: 'Settings' },
  'admin.stats.total.users': { es: 'Total Usuarios', en: 'Total Users' },
  'admin.stats.providers': { es: 'Proveedores', en: 'Providers' },
  'admin.stats.bookings': { es: 'Reservas', en: 'Bookings' },
  'admin.pending.providers': { es: 'Proveedores Pendientes', en: 'Pending Providers' },
  'admin.recent.bookings': { es: 'Reservas Recientes', en: 'Recent Bookings' },
  'admin.approve': { es: 'Aprobar', en: 'Approve' },
  'admin.reject': { es: 'Rechazar', en: 'Reject' },
  'admin.no.pending': { es: 'No hay proveedores pendientes', en: 'No pending providers' },
  'admin.no.bookings': { es: 'No hay reservas recientes', en: 'No recent bookings' },
  'admin.all.reviewed': { es: 'Todos los proveedores han sido revisados', en: 'All providers have been reviewed' },
  'admin.provider.management': { es: 'Gestión de Proveedores', en: 'Provider Management' },
  'admin.booking.management': { es: 'Gestión de Reservas', en: 'Booking Management' },
  'admin.user.management': { es: 'Gestión de Usuarios', en: 'User Management' },
  'admin.platform.settings': { es: 'Configuración de la Plataforma', en: 'Platform Settings' },
  'admin.development': { es: 'en desarrollo...', en: 'in development...' },

  // Provider Pricing Management
  'provider.pricing.title': { es: 'Gestión de Precios', en: 'Pricing Management' },
  'provider.pricing.basePrice': { es: 'Precio Base', en: 'Base Price' },
  'provider.pricing.unit': { es: 'Unidad de Precio', en: 'Price Unit' },
  'provider.pricing.hourly': { es: 'Por Hora', en: 'Per Hour' },
  'provider.pricing.fixed': { es: 'Precio Fijo', en: 'Fixed Price' },
  'provider.pricing.perVisit': { es: 'Por Visita', en: 'Per Visit' },
  'provider.pricing.emergencyMultiplier': { es: 'Multiplicador de Emergencia', en: 'Emergency Multiplier' },
  'provider.pricing.minPrice': { es: 'Precio Mínimo', en: 'Minimum Price' },
  'provider.pricing.maxPrice': { es: 'Precio Máximo', en: 'Maximum Price' },
  'provider.pricing.earningsCalculator': { es: 'Calculadora de Ganancias', en: 'Earnings Calculator' },
  'provider.pricing.regularService': { es: 'Servicio Regular', en: 'Regular Service' },
  'provider.pricing.emergencyService': { es: 'Servicio de Emergencia', en: 'Emergency Service' },
  'provider.pricing.customerPays': { es: 'Cliente Paga', en: 'Customer Pays' },
  'provider.pricing.platformFee': { es: 'Comisión Plataforma', en: 'Platform Fee' },
  'provider.pricing.paymentFee': { es: 'Comisión de Pago', en: 'Payment Fee' },
  'provider.pricing.youReceive': { es: 'Usted Recibe', en: 'You Receive' },
  'provider.pricing.savePricing': { es: 'Guardar Precios', en: 'Save Pricing' },
  'provider.pricing.paymentOptions': { es: 'Opciones de Pago', en: 'Payment Options' },
  'provider.pricing.payphoneInfo': { es: 'Integración completa con tarjetas (5% + IVA)', en: 'Full integration with cards (5% + VAT)' },
  'provider.pricing.whatsappInfo': { es: 'Enlaces directos de pago por WhatsApp', en: 'Direct WhatsApp payment links' },
  'provider.pricing.cashInfo': { es: 'Pago en efectivo al momento del servicio', en: 'Cash payment at service time' },

  // Dashboard Settings
  'dashboard.security.title': { es: 'Seguridad de la Cuenta', en: 'Account Security' },
  'dashboard.security.profile.config': { es: 'Configuración de Perfil', en: 'Profile Settings' },
  'dashboard.security.profile.description': { es: 'Cambiar contraseña, email, y configuración de seguridad', en: 'Change password, email, and security settings' },
  'dashboard.notifications.title': { es: 'Notificaciones', en: 'Notifications' },
  'dashboard.notifications.bookings': { es: 'Nuevas reservas por email', en: 'New bookings by email' },
  'dashboard.notifications.reminders': { es: 'Recordatorios de citas', en: 'Appointment reminders' },
  'dashboard.notifications.offers': { es: 'Ofertas y promociones', en: 'Offers and promotions' },

  // Payment Methods
  'payment.methods.title': { es: 'Métodos de Pago', en: 'Payment Methods' },
  'payment.payphone.title': { es: 'Pagar con Payphone', en: 'Pay with Payphone' },
  'payment.whatsapp.title': { es: 'Pagar por WhatsApp', en: 'Pay via WhatsApp' },
  'payment.cash.title': { es: 'Pago en Efectivo', en: 'Cash Payment' },
  'payment.breakdown.title': { es: 'Desglose del Pago', en: 'Payment Breakdown' },
  'payment.service.cost': { es: 'Costo del Servicio', en: 'Service Cost' },
  'payment.platform.fee': { es: 'Comisión de Plataforma', en: 'Platform Fee' },
  'payment.processing.fee': { es: 'Comisión de Procesamiento', en: 'Processing Fee' },
  'payment.total': { es: 'Total a Pagar', en: 'Total to Pay' },
  'payment.whatsapp.generate': { es: 'Generar Link de WhatsApp', en: 'Generate WhatsApp Link' },
  'payment.whatsapp.instructions': { es: 'Se enviará un enlace de pago directo al proveedor', en: 'A direct payment link will be sent to the provider' },

  // Account Dropdown
  'nav.account': { es: 'Cuenta', en: 'Account' },
  'nav.signin': { es: 'Iniciar Sesión', en: 'Sign In' },
  'nav.signin.subtitle': { es: 'Accede a tu cuenta existente', en: 'Access your existing account' },
  'nav.signup': { es: 'Crear Cuenta', en: 'Sign Up' },
  'nav.signup.subtitle': { es: 'Regístrate gratis en EcuaCasa', en: 'Register for free on EcuaCasa' },
  'nav.account.footer': { es: 'Rápido y seguro con Clerk', en: 'Fast and secure with Clerk' },
  'nav.professional': { es: 'SOY PROFESIONAL', en: 'I AM A PROFESSIONAL' },
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