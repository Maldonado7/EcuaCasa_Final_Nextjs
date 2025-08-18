import { supabase } from '@/lib/supabase'
import TranslatedHomePage from './components/TranslatedHomePage'

// Fetch featured providers from Cuenca
async function getProviders() {
  try {
    const { data } = await supabase
      .from('providers')
      .select('*')
      .order('rating', { ascending: false })
      .limit(8)
    
    // Return providers from database only
    // All providers (including samples) should be in the database
    return data || []
  } catch (error) {
    console.error('Error fetching providers:', error)
    return []
  }
}

async function getServices() {
  const { data } = await supabase
    .from('services')
    .select('*, providers(count)')
    .limit(8)
  
  return data || []
}

async function getStats() {
  const { count: userCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
  
  const { count: providerCount } = await supabase
    .from('providers')
    .select('*', { count: 'exact', head: true })

  return { users: userCount || 2500, providers: providerCount || 500 }
}

export default async function Home() {
  const providers = await getProviders()
  const services = await getServices()
  const stats = await getStats()

  return (
    <TranslatedHomePage 
      providers={providers} 
      services={services} 
      stats={stats} 
    />
  )
}