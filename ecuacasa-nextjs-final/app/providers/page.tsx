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


export default async function ProvidersPage() {
  const providers = await getProviders()

  return <TranslatedProvidersPage providers={providers} />
}