import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import TranslatedHomePage from './components/TranslatedHomePage'

// Enhanced metadata with structured data
export const metadata: Metadata = {
  title: 'EcuaCasa - Servicios para el hogar en Cuenca | Profesionales Verificados',
  description: 'Encuentra profesionales verificados para servicios del hogar en Cuenca, Ecuador. Plomeros, electricistas, carpinteros, pintores y más. Conectamos +2,500 hogares con expertos locales.',
  keywords: 'servicios hogar Cuenca, plomeros Cuenca, electricistas Cuenca, carpinteros Cuenca, Ecuador, profesionales verificados, servicios domiciliarios, home services',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.ecuacasa.com',
  },
  openGraph: {
    title: 'EcuaCasa - Servicios para el hogar en Cuenca | Profesionales Verificados',
    description: 'Encuentra profesionales verificados para servicios del hogar en Cuenca, Ecuador. Plomeros, electricistas, carpinteros, pintores y más.',
    url: 'https://www.ecuacasa.com',
    siteName: 'EcuaCasa',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcuaCasa - Servicios para el hogar en Cuenca',
    description: 'Encuentra profesionales verificados para servicios del hogar en Cuenca, Ecuador.',
  }
}

// Function to get homepage data
async function getHomepageData() {
  try {
    const { data: providersData, error: providersError } = await supabase
      .from('providers')
      .select('*')
      .order('rating', { ascending: false })
      .limit(6)
    
    return {
      providers: providersData || [],
      services: [],
      stats: { users: 2500, providers: 500 },
      loading: false
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      providers: [],
      services: [],
      stats: { users: 2500, providers: 500 },
      loading: false
    }
  }
}

export default async function Home() {
  const { providers, services, stats, loading } = await getHomepageData()

  // Enhanced structured data for local business SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "EcuaCasa",
      "description": "Plataforma digital que conecta profesionales verificados con hogares en Cuenca, Ecuador",
      "url": "https://www.ecuacasa.com",
      "logo": "https://www.ecuacasa.com/favicon.ico",
      "sameAs": [],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cuenca",
        "addressCountry": "EC",
        "addressRegion": "Azuay"
      },
      "areaServed": {
        "@type": "City",
        "name": "Cuenca",
        "addressCountry": "EC"
      },
      "serviceType": [
        "Plomería",
        "Electricidad", 
        "Carpintería",
        "Pintura",
        "Limpieza",
        "Jardinería",
        "Cerrajería",
        "Albañilería"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2500",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "EcuaCasa - Servicios para el Hogar",
      "description": "Marketplace digital de servicios para el hogar en Cuenca, Ecuador. Conectamos profesionales verificados con hogares que necesitan servicios de plomería, electricidad, carpintería y más.",
      "url": "https://www.ecuacasa.com",
      "telephone": "+593-999-999-999",
      "email": "contact@ecuacasa.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cuenca",
        "addressRegion": "Azuay",
        "addressCountry": "EC"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-2.9001",
        "longitude": "-79.0059"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$25-$100",
      "serviceArea": {
        "@type": "City",
        "name": "Cuenca",
        "addressCountry": "EC"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios para el Hogar",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Servicios de Plomería",
              "description": "Reparación e instalación de tuberías, grifos, baños y sistemas de agua"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Servicios de Electricidad",
              "description": "Instalación eléctrica, reparación de cables, interruptores y sistemas eléctricos"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Servicios de Carpintería",
              "description": "Muebles a medida, reparación de puertas, ventanas y trabajos en madera"
            }
          }
        ]
      }
    }
  ]

  console.log('✅ Home page rendering with provider data:', providers.length)

  return (
    <>
      {/* Structured Data for SEO */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      <TranslatedHomePage 
        providers={providers} 
        services={services} 
        stats={stats} 
      />
    </>
  )
}