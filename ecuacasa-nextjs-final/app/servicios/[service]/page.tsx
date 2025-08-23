import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 3600 // Revalidates every hour for fresh content

interface ServicePageProps {
  params: Promise<{
    service: string
  }>
}

// Service data for SEO and content
const serviceData: Record<string, {
  name: string
  title: string
  description: string
  keywords: string[]
  content: {
    intro: string
    services: string[]
    whyChoose: string[]
    process: string[]
    pricing: string
    emergency?: boolean
  }
}> = {
  'plomeria': {
    name: 'Plomería',
    title: 'Plomeros en Cuenca | Servicios de Plomería 24/7 | EcuaCasa',
    description: 'Encuentra los mejores plomeros en Cuenca, Ecuador. Servicios de plomería residencial y comercial. Reparaciones de tuberías, instalaciones, destapes. Presupuesto gratis.',
    keywords: ['plomeros Cuenca', 'servicios plomería Cuenca', 'reparación tuberías', 'plomero 24 horas', 'instalación sanitarios'],
    content: {
      intro: 'Conectamos con los mejores plomeros certificados en Cuenca. Servicios profesionales de plomería para tu hogar o negocio con garantía de calidad.',
      services: [
        'Reparación e instalación de tuberías',
        'Destape de desagües y cañerías',
        'Instalación de sanitarios y lavamanos',
        'Reparación de grifos y llaves',
        'Instalación de sistemas de agua caliente',
        'Detección y reparación de fugas',
        'Mantenimiento de sistemas hidráulicos'
      ],
      whyChoose: [
        'Plomeros certificados y verificados',
        'Servicio las 24 horas del día',
        'Presupuesto gratuito sin compromiso',
        'Garantía en todos los trabajos',
        'Precios competitivos y transparentes',
        'Atención rápida en emergencias'
      ],
      process: [
        'Solicita el servicio online',
        'Te contactamos en menos de 30 minutos',
        'Evaluación gratuita del problema',
        'Presupuesto transparente',
        'Ejecución del trabajo',
        'Garantía post-servicio'
      ],
      pricing: '$25-$45 por hora + materiales',
      emergency: true
    }
  },
  'electricidad': {
    name: 'Electricidad',
    title: 'Electricistas en Cuenca | Servicios Eléctricos Profesionales | EcuaCasa',
    description: 'Electricistas certificados en Cuenca, Ecuador. Instalaciones eléctricas, reparaciones, mantenimiento. Servicio seguro y confiable. Cotización gratuita.',
    keywords: ['electricistas Cuenca', 'instalación eléctrica', 'reparación cables', 'electricista certificado', 'mantenimiento eléctrico'],
    content: {
      intro: 'Profesionales electricistas certificados para instalaciones seguras y reparaciones eléctricas en Cuenca.',
      services: [
        'Instalaciones eléctricas residenciales',
        'Reparación de cortocircuitos',
        'Instalación de breakers y tableros',
        'Cableado y conexiones',
        'Instalación de luminarias',
        'Mantenimiento preventivo',
        'Certificaciones eléctricas'
      ],
      whyChoose: [
        'Electricistas con licencia',
        'Trabajo seguro y certificado',
        'Materiales de calidad',
        'Precios justos y transparentes',
        'Garantía en instalaciones',
        'Disponibilidad inmediata'
      ],
      process: [
        'Contacta a través de la plataforma',
        'Evaluación técnica gratuita',
        'Presupuesto detallado',
        'Programación del trabajo',
        'Instalación profesional',
        'Certificado de instalación'
      ],
      pricing: '$30-$50 por hora + materiales'
    }
  },
  'carpinteria': {
    name: 'Carpintería',
    title: 'Carpinteros en Cuenca | Muebles y Trabajos en Madera | EcuaCasa',
    description: 'Carpinteros expertos en Cuenca, Ecuador. Muebles a medida, reparación de puertas, ventanas, closets. Trabajos profesionales en madera con garantía.',
    keywords: ['carpinteros Cuenca', 'muebles a medida', 'reparación puertas', 'trabajos madera', 'closets personalizados'],
    content: {
      intro: 'Maestros carpinteros especializados en trabajos de alta calidad en madera para tu hogar en Cuenca.',
      services: [
        'Muebles a medida y personalizados',
        'Reparación de puertas y ventanas',
        'Instalación de closets y estanterías',
        'Trabajos de ebanistería fina',
        'Reparación de muebles antiguos',
        'Deck y pergolas exteriores',
        'Divisiones y biombos de madera'
      ],
      whyChoose: [
        'Carpinteros con años de experiencia',
        'Diseños personalizados únicos',
        'Materiales de primera calidad',
        'Acabados profesionales',
        'Garantía en todos los trabajos',
        'Asesoramiento en diseño gratuito'
      ],
      process: [
        'Consulta inicial y medición',
        'Diseño y presupuesto personalizado',
        'Selección de materiales',
        'Fabricación en taller',
        'Instalación profesional',
        'Entrega y garantía'
      ],
      pricing: '$35-$60 por hora + materiales'
    }
  },
  'pintura': {
    name: 'Pintura',
    title: 'Pintores en Cuenca | Servicios de Pintura Interior y Exterior | EcuaCasa',
    description: 'Pintores profesionales en Cuenca, Ecuador. Pintura interior, exterior, decorativa. Acabados perfectos, colores vibrantes. Presupuesto sin compromiso.',
    keywords: ['pintores Cuenca', 'pintura interior', 'pintura exterior', 'servicios pintura', 'pintores profesionales'],
    content: {
      intro: 'Pintores especializados en transformar tus espacios con acabados perfectos y colores vibrantes en Cuenca.',
      services: [
        'Pintura interior de casas y oficinas',
        'Pintura exterior y fachadas',
        'Pintura decorativa y texturas',
        'Restauración de paredes',
        'Pintura de techos y cielos rasos',
        'Aplicación de estucos y empastes',
        'Consultoría en colores y acabados'
      ],
      whyChoose: [
        'Pintores con técnica profesional',
        'Pinturas de marcas reconocidas',
        'Acabados duraderos y uniformes',
        'Limpieza total post-servicio',
        'Garantía en el trabajo realizado',
        'Asesoría en selección de colores'
      ],
      process: [
        'Evaluación y medición del área',
        'Recomendación de colores y pinturas',
        'Preparación de superficies',
        'Aplicación de pintura profesional',
        'Inspección de calidad',
        'Limpieza y entrega final'
      ],
      pricing: '$20-$40 por hora + materiales'
    }
  },
  'limpieza': {
    name: 'Limpieza',
    title: 'Servicios de Limpieza en Cuenca | Limpieza Profunda del Hogar | EcuaCasa',
    description: 'Servicios de limpieza profesional en Cuenca, Ecuador. Limpieza profunda, mantenimiento, post-construcción. Personal capacitado y productos ecológicos.',
    keywords: ['limpieza Cuenca', 'limpieza profunda', 'servicios limpieza hogar', 'limpieza post construcción', 'personal limpieza'],
    content: {
      intro: 'Servicios profesionales de limpieza para mantener tu hogar impecable en Cuenca.',
      services: [
        'Limpieza profunda del hogar',
        'Limpieza de mantenimiento regular',
        'Limpieza post-construcción',
        'Limpieza de oficinas',
        'Limpieza de alfombras y tapetes',
        'Limpieza de vidrios y ventanas',
        'Servicios de lavandería doméstica'
      ],
      whyChoose: [
        'Personal capacitado y confiable',
        'Productos de limpieza ecológicos',
        'Equipos profesionales modernos',
        'Horarios flexibles',
        'Seguro de responsabilidad',
        'Satisfacción 100% garantizada'
      ],
      process: [
        'Evaluación inicial del espacio',
        'Programa personalizado de limpieza',
        'Selección de productos apropiados',
        'Ejecución del servicio',
        'Inspección de calidad',
        'Seguimiento y retroalimentación'
      ],
      pricing: '$15-$30 por hora'
    }
  },
  'jardineria': {
    name: 'Jardinería',
    title: 'Jardineros en Cuenca | Diseño y Mantenimiento de Jardines | EcuaCasa',
    description: 'Jardineros expertos en Cuenca, Ecuador. Diseño de jardines, mantenimiento, poda, plantas ideales para el clima de Cuenca. Espacios verdes hermosos.',
    keywords: ['jardineros Cuenca', 'diseño jardines', 'mantenimiento jardines', 'poda plantas', 'paisajismo Cuenca'],
    content: {
      intro: 'Jardineros especializados en crear y mantener espacios verdes hermosos adaptados al clima de Cuenca.',
      services: [
        'Diseño y creación de jardines',
        'Mantenimiento regular de jardines',
        'Poda de árboles y arbustos',
        'Instalación de sistemas de riego',
        'Siembra y trasplante de plantas',
        'Control de plagas naturales',
        'Asesoría en plantas nativas'
      ],
      whyChoose: [
        'Conocimiento del clima local',
        'Plantas adaptadas a Cuenca',
        'Diseños sostenibles y ecológicos',
        'Mantenimiento programado',
        'Técnicas de jardinería orgánica',
        'Transformación de espacios'
      ],
      process: [
        'Evaluación del espacio exterior',
        'Diseño personalizado del jardín',
        'Selección de plantas apropiadas',
        'Preparación del terreno',
        'Siembra e instalación',
        'Plan de mantenimiento continuo'
      ],
      pricing: '$18-$35 por hora + plantas'
    }
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service } = await params
  const serviceInfo = serviceData[service]
  
  if (!serviceInfo) {
    return {
      title: 'Servicio no encontrado - EcuaCasa',
      robots: 'noindex, follow'
    }
  }

  return {
    title: serviceInfo.title,
    description: serviceInfo.description,
    keywords: serviceInfo.keywords.join(', '),
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.ecuacasa.com/servicios/${service}`,
    },
    openGraph: {
      title: serviceInfo.title,
      description: serviceInfo.description,
      url: `https://www.ecuacasa.com/servicios/${service}`,
      siteName: 'EcuaCasa',
      locale: 'es_EC',
      type: 'website',
    }
  }
}

// Live availability component for real-time SEO impact
async function ServiceAvailability({ service }: { service: string }) {
  try {
    const { count } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })
      .eq('service_type', service)
      .eq('verified', true)

    return (
      <div className="bg-green-50 p-4 rounded-lg mb-6 max-w-md mx-auto">
        <p className="text-lg font-semibold text-green-800 text-center">
          ⚡ {count || 0} profesionales disponibles ahora
        </p>
      </div>
    )
  } catch (error) {
    return (
      <div className="bg-green-50 p-4 rounded-lg mb-6 max-w-md mx-auto">
        <p className="text-lg font-semibold text-green-800 text-center">
          ⚡ Profesionales disponibles ahora
        </p>
      </div>
    )
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params
  const serviceInfo = serviceData[service]
  
  if (!serviceInfo) {
    notFound()
  }

  // Structured data for service page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Servicios de ${serviceInfo.name} en Cuenca`,
    "description": serviceInfo.description,
    "provider": {
      "@type": "Organization",
      "name": "EcuaCasa",
      "url": "https://www.ecuacasa.com"
    },
    "areaServed": {
      "@type": "City",
      "name": "Cuenca",
      "addressCountry": "EC"
    },
    "serviceType": serviceInfo.name,
    "offers": {
      "@type": "Offer",
      "description": `Servicios profesionales de ${serviceInfo.name.toLowerCase()} en Cuenca`,
      "priceRange": serviceInfo.content.pricing,
      "availability": "Mo-Su 00:00-23:59"
    }
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EC</span>
                </div>
                <span className="font-black text-xl">EcuaCasa</span>
              </Link>
              <Link href={`/providers?service=${service}&location=cuenca`}>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                  Ver Profesionales
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {serviceInfo.name} en Cuenca
            </h1>
            <ServiceAvailability service={service} />
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {serviceInfo.content.intro}
            </p>
            {serviceInfo.content.emergency && (
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                🚨 Servicio de emergencia 24/7 disponible
              </div>
            )}
            <Link href={`/providers?service=${service}&location=cuenca`}>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:shadow-xl transition-all">
                Buscar {serviceInfo.name}s Ahora
              </button>
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Servicios de {serviceInfo.name} Disponibles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceInfo.content.services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-purple-600 text-2xl mb-3">🔧</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service}</h3>
                  <p className="text-gray-600 text-sm">Servicio profesional con garantía incluida</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Por qué elegir nuestros profesionales?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceInfo.content.whyChoose.map((reason, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-green-600 text-xl mb-3">✅</div>
                  <p className="font-medium text-gray-900">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Cómo Funciona
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {serviceInfo.content.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {index + 1}
                  </div>
                  <p className="text-gray-900 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Precios Transparentes</h2>
            <p className="text-xl text-gray-600 mb-8">Sin sorpresas, sin costos ocultos</p>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">{serviceInfo.content.pricing}</div>
              <p className="text-gray-600 mb-6">Evaluación gratuita • Presupuesto sin compromiso</p>
              <Link href={`/providers?service=${service}&location=cuenca`}>
                <button className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                  Solicitar Presupuesto Gratis
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Necesitas {serviceInfo.name} en Cuenca?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Conecta con profesionales verificados en minutos
            </p>
            <Link href={`/providers?service=${service}&location=cuenca`}>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all">
                Ver {serviceInfo.name}s Disponibles
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}