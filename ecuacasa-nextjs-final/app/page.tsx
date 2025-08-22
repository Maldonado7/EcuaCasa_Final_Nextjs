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

  // Structured data for SEO
  const structuredData = {
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
      "addressCountry": "EC"
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
    ]
  }

  console.log('✅ Home page rendering with provider data:', providers.length)

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <TranslatedHomePage 
        providers={providers} 
        services={services} 
        stats={stats} 
      />
    </>
  )
}