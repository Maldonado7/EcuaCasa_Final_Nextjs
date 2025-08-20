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

export async function POST() {
  try {
    console.log('🚀 Creating Cuenca database structure...')
    
    // Skip table creation via RPC since it's not available
    // Assume tables need to be created manually via SQL Editor
    console.log('Skipping table creation - run cuenca-step1.sql manually')
    
    // Step 4: Insert cities data
    const citiesData = [
      { name: 'Cuenca', province: 'Azuay', population: 636996, is_primary: true },
      { name: 'Quito', province: 'Pichincha', population: 2781641, is_primary: false },
      { name: 'Guayaquil', province: 'Guayas', population: 2698077, is_primary: false },
      { name: 'Santo Domingo', province: 'Santo Domingo', population: 458580, is_primary: false },
      { name: 'Ambato', province: 'Tungurahua', population: 387309, is_primary: false },
      { name: 'Loja', province: 'Loja', population: 274112, is_primary: false }
    ]

    let insertCitiesResult = null
    try {
      const { data: insertedCities, error: insertCitiesError } = await supabaseAdmin
        .from('cities')
        .upsert(citiesData, { onConflict: 'name', ignoreDuplicates: false })
        .select()
      
      insertCitiesResult = { data: insertedCities, error: insertCitiesError }
    } catch (err) {
      insertCitiesResult = { error: err.message }
    }

    // Step 5: Get city IDs and insert neighborhoods
    let insertNeighborhoodsResult = null
    try {
      const { data: cities } = await supabaseAdmin
        .from('cities')
        .select('id, name')

      if (cities && cities.length > 0) {
        const cuencaCity = cities.find(c => c.name === 'Cuenca')
        
        if (cuencaCity) {
          const cuencaNeighborhoods = [
            { name: 'El Centro', city_id: cuencaCity.id, zone: 'Centro', is_featured: true },
            { name: 'San Joaquín', city_id: cuencaCity.id, zone: 'Oeste', is_featured: true },
            { name: 'San Sebastián', city_id: cuencaCity.id, zone: 'Centro', is_featured: true },
            { name: 'El Batán', city_id: cuencaCity.id, zone: 'Norte', is_featured: false },
            { name: 'Yanuncay', city_id: cuencaCity.id, zone: 'Sur', is_featured: false },
            { name: 'Totoracocha', city_id: cuencaCity.id, zone: 'Sur', is_featured: false },
            { name: 'El Arenal', city_id: cuencaCity.id, zone: 'Oeste', is_featured: false },
            { name: 'Ricaurte', city_id: cuencaCity.id, zone: 'Norte', is_featured: false }
          ]

          const { data: insertedNeighborhoods, error: insertNeighborhoodsError } = await supabaseAdmin
            .from('neighborhoods')
            .upsert(cuencaNeighborhoods, { ignoreDuplicates: true })
            .select()
          
          insertNeighborhoodsResult = { data: insertedNeighborhoods, error: insertNeighborhoodsError }
        }
      }
    } catch (err) {
      insertNeighborhoodsResult = { error: err.message }
    }

    // Step 6: Test the setup
    const { data: testCities, error: testCitiesError } = await supabaseAdmin
      .from('cities')
      .select('name, province, is_primary')
      .limit(5)

    const { data: testNeighborhoods, error: testNeighborhoodsError } = await supabaseAdmin
      .from('neighborhoods')
      .select('name, zone, is_featured')
      .limit(5)

    return NextResponse.json({
      success: true,
      message: 'Cuenca database setup completed!',
      steps: {
        createTables: {
          cities: 'Skipped - run cuenca-step1.sql manually',
          neighborhoods: 'Skipped - run cuenca-step1.sql manually',
          alterProviders: 'Skipped - run cuenca-step1.sql manually'
        },
        insertData: {
          cities: insertCitiesResult,
          neighborhoods: insertNeighborhoodsResult
        },
        verification: {
          cities: { count: testCities?.length || 0, data: testCities, error: testCitiesError?.message },
          neighborhoods: { count: testNeighborhoods?.length || 0, data: testNeighborhoods, error: testNeighborhoodsError?.message }
        }
      }
    })

  } catch (error) {
    console.error('Database setup error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}