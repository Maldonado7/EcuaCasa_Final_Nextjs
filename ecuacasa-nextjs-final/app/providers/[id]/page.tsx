import TranslatedProviderDetailPage from '../../components/TranslatedProviderDetailPage'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ProviderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// Function to fetch provider data
async function getProvider(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.ecuacasa.com'}/api/providers/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching provider:', error)
    return null
  }
}

// Generate metadata for provider pages
export async function generateMetadata({ params }: ProviderDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const provider = await getProvider(id)
  
  if (!provider) {
    return {
      title: 'Profesional no encontrado - EcuaCasa',
      description: 'El profesional que buscas no existe o ha sido eliminado.',
      robots: 'noindex, follow'
    }
  }

  const title = `${provider.name} - ${provider.service_type} en ${provider.location}, Cuenca | EcuaCasa`
  const description = `Contacta a ${provider.name}, profesional en ${provider.service_type} con ${provider.rating} estrellas de calificación en ${provider.location}, Cuenca. Servicios verificados en EcuaCasa.`
  const url = `https://www.ecuacasa.com/providers/${id}`

  return {
    title,
    description,
    canonical: url,
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url,
      siteName: 'EcuaCasa',
      locale: 'es_EC',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: url,
    }
  }
}

export default async function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const { id } = await params
  
  // Check if provider exists for server-side rendering
  const provider = await getProvider(id)
  
  if (!provider) {
    notFound()
  }

  return <TranslatedProviderDetailPage providerId={id} />
}