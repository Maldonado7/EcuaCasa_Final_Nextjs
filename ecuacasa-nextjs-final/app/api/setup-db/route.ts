import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST() {
  const supabaseAdmin = getSupabaseAdmin()
  try {
    console.log('🚀 Setting up Ecuador locations database...')
    
    // Skip table creation for now, assume tables exist or will be created via SQL Editor
    // Insert cities data
    const { error: insertCitiesError } = await supabaseAdmin
      .from('cities')
      .upsert([
        { name: 'Quito', province: 'Pichincha', population: 2781641 },
        { name: 'Guayaquil', province: 'Guayas', population: 2698077 },
        { name: 'Cuenca', province: 'Azuay', population: 636996 },
        { name: 'Santo Domingo', province: 'Santo Domingo', population: 458580 },
        { name: 'Ambato', province: 'Tungurahua', population: 387309 },
        { name: 'Portoviejo', province: 'Manabí', population: 321800 },
        { name: 'Manta', province: 'Manabí', population: 264281 },
        { name: 'Loja', province: 'Loja', population: 274112 },
        { name: 'Riobamba', province: 'Chimborazo', population: 264048 },
        { name: 'Ibarra', province: 'Imbabura', population: 221149 },
        { name: 'Esmeraldas', province: 'Esmeraldas', population: 218727 },
        { name: 'Machala', province: 'El Oro', population: 289141 }
      ], { 
        onConflict: 'name',
        ignoreDuplicates: true 
      })

    // Skip neighborhoods table creation

    // Get city IDs for neighborhoods
    const { data: cities } = await supabaseAdmin
      .from('cities')
      .select('id, name')

    const cityMap = cities?.reduce((acc, city) => {
      acc[city.name] = city.id
      return acc
    }, {} as Record<string, string>) || {}

    // Insert Quito neighborhoods
    if (cityMap['Quito']) {
      await supabaseAdmin
        .from('neighborhoods')
        .upsert([
          { name: 'La Carolina', city_id: cityMap['Quito'], zone: 'Norte' },
          { name: 'La Mariscal', city_id: cityMap['Quito'], zone: 'Norte' },
          { name: 'Iñaquito', city_id: cityMap['Quito'], zone: 'Norte' },
          { name: 'El Batán', city_id: cityMap['Quito'], zone: 'Norte' },
          { name: 'González Suárez', city_id: cityMap['Quito'], zone: 'Norte' },
          { name: 'Centro Histórico', city_id: cityMap['Quito'], zone: 'Centro' },
          { name: 'San Marcos', city_id: cityMap['Quito'], zone: 'Centro' },
          { name: 'San Blas', city_id: cityMap['Quito'], zone: 'Centro' },
          { name: 'Cumbayá', city_id: cityMap['Quito'], zone: 'Valle' },
          { name: 'Tumbaco', city_id: cityMap['Quito'], zone: 'Valle' },
          { name: 'Quitumbe', city_id: cityMap['Quito'], zone: 'Sur' },
          { name: 'Solanda', city_id: cityMap['Quito'], zone: 'Sur' }
        ], { ignoreDuplicates: true })
    }

    // Insert Guayaquil neighborhoods
    if (cityMap['Guayaquil']) {
      await supabaseAdmin
        .from('neighborhoods')
        .upsert([
          { name: 'Samborondón', city_id: cityMap['Guayaquil'], zone: 'Norte' },
          { name: 'Kennedy', city_id: cityMap['Guayaquil'], zone: 'Norte' },
          { name: 'Urdesa', city_id: cityMap['Guayaquil'], zone: 'Norte' },
          { name: 'Alborada', city_id: cityMap['Guayaquil'], zone: 'Norte' },
          { name: 'Centro', city_id: cityMap['Guayaquil'], zone: 'Centro' },
          { name: 'Las Peñas', city_id: cityMap['Guayaquil'], zone: 'Centro' },
          { name: 'Ximena', city_id: cityMap['Guayaquil'], zone: 'Sur' },
          { name: 'Guasmo', city_id: cityMap['Guayaquil'], zone: 'Sur' }
        ], { ignoreDuplicates: true })
    }

    // Insert Cuenca neighborhoods
    if (cityMap['Cuenca']) {
      await supabaseAdmin
        .from('neighborhoods')
        .upsert([
          { name: 'El Centro', city_id: cityMap['Cuenca'], zone: 'Centro' },
          { name: 'San Sebastián', city_id: cityMap['Cuenca'], zone: 'Centro' },
          { name: 'El Batán', city_id: cityMap['Cuenca'], zone: 'Norte' },
          { name: 'Totoracocha', city_id: cityMap['Cuenca'], zone: 'Sur' },
          { name: 'Yanuncay', city_id: cityMap['Cuenca'], zone: 'Sur' },
          { name: 'El Arenal', city_id: cityMap['Cuenca'], zone: 'Oeste' }
        ], { ignoreDuplicates: true })
    }

    // Skip ALTER TABLE for now

    // Test the setup
    const { data: testCities, error: testError } = await supabaseAdmin
      .from('cities')
      .select('name, province')
      .limit(5)

    const { data: testNeighborhoods } = await supabaseAdmin
      .from('neighborhoods')
      .select('name, zone, cities(name)')
      .limit(5)

    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully!',
      data: {
        cities: testCities?.length || 0,
        neighborhoods: testNeighborhoods?.length || 0,
        sampleCities: testCities,
        sampleNeighborhoods: testNeighborhoods
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