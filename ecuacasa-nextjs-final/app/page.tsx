'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import TranslatedHomePage from './components/TranslatedHomePage'

export default function Home() {
  const [providers, setProviders] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [stats, setStats] = useState({ users: 2500, providers: 500 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      console.log('🔄 Fetching provider data for homepage...')
      try {
        // Fetch providers with a shorter timeout
        const { data: providersData, error: providersError } = await supabase
          .from('providers')
          .select('*')
          .order('rating', { ascending: false })
          .limit(6)
        
        if (providersError) {
          console.log('⚠️ Using empty provider data:', providersError.message)
          setProviders([])
        } else {
          console.log(`✅ Fetched ${providersData?.length || 0} providers for homepage`)
          setProviders(providersData || [])
        }

        // Set empty services for now
        setServices([])
        
        // Use static stats
        setStats({ users: 2500, providers: 500 })
        
      } catch (error) {
        console.error('❌ Error fetching homepage data:', error)
        setProviders([])
        setServices([])
        setStats({ users: 2500, providers: 500 })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  console.log('✅ Home page rendering with provider data:', providers.length)

  return (
    <TranslatedHomePage 
      providers={providers} 
      services={services} 
      stats={stats} 
    />
  )
}