import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function GET() {
  try {
    // Check what tables exist
    const tables = []
    
    // Try to query each table
    const { data: providers, error: providersError } = await supabaseAdmin
      .from('providers')
      .select('*')
      .limit(1)
    
    tables.push({
      name: 'providers',
      exists: !providersError,
      error: providersError?.message,
      sampleData: providers?.[0]
    })

    const { data: cities, error: citiesError } = await supabaseAdmin
      .from('cities')
      .select('*')
      .limit(1)
    
    tables.push({
      name: 'cities',
      exists: !citiesError,
      error: citiesError?.message,
      sampleData: cities?.[0]
    })

    const { data: neighborhoods, error: neighborhoodsError } = await supabaseAdmin
      .from('neighborhoods')
      .select('*')
      .limit(1)
    
    tables.push({
      name: 'neighborhoods',
      exists: !neighborhoodsError,
      error: neighborhoodsError?.message,
      sampleData: neighborhoods?.[0]
    })

    const { data: services, error: servicesError } = await supabaseAdmin
      .from('services')
      .select('*')
      .limit(1)
    
    tables.push({
      name: 'services',
      exists: !servicesError,
      error: servicesError?.message,
      sampleData: services?.[0]
    })

    return NextResponse.json({
      success: true,
      message: 'Table check completed',
      tables,
      summary: {
        total: tables.length,
        existing: tables.filter(t => t.exists).length,
        missing: tables.filter(t => !t.exists).length
      }
    })

  } catch (error) {
    console.error('Table check error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}