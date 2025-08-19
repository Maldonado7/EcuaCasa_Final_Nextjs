import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import TranslatedProvidersPage from '../components/TranslatedProvidersPage'

// Fetch providers from Supabase
async function getProviders() {
  try {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('verified', true)  // Only show verified providers
      .order('rating', { ascending: false })
    
    if (error) {
      console.error('Error fetching providers:', error)
    }
    
    // Return providers from database only
    // All providers (including samples) should be in the database
    return data || [];
  } catch (error) {
    console.error('Error fetching providers:', error)
    return [];
  }
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando profesionales...</p>
      </div>
    </div>
  )
}

export default async function ProvidersPage() {
  const providers = await getProviders()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <TranslatedProvidersPage providers={providers} />
    </Suspense>
  )
}