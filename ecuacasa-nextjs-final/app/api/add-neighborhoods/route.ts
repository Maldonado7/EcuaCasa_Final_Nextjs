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
    // Get city IDs
    const { data: cities } = await supabaseAdmin
      .from('cities')
      .select('id, name')

    const cityMap = cities?.reduce((acc, city) => {
      acc[city.name] = city.id
      return acc
    }, {} as Record<string, string>) || {}

    // Add Ambato neighborhoods
    if (cityMap['Ambato']) {
      await supabaseAdmin
        .from('neighborhoods')
        .upsert([
          { name: 'Centro', city_id: cityMap['Ambato'], zone: 'Centro', is_featured: true },
          { name: 'La Merced', city_id: cityMap['Ambato'], zone: 'Centro', is_featured: true },
          { name: 'Miraflores', city_id: cityMap['Ambato'], zone: 'Norte', is_featured: true },
          { name: 'Ficoa', city_id: cityMap['Ambato'], zone: 'Norte', is_featured: false },
          { name: 'Atocha', city_id: cityMap['Ambato'], zone: 'Sur', is_featured: false },
          { name: 'La Península', city_id: cityMap['Ambato'], zone: 'Oeste', is_featured: false },
          { name: 'Huachi Chico', city_id: cityMap['Ambato'], zone: 'Este', is_featured: false },
          { name: 'San Francisco', city_id: cityMap['Ambato'], zone: 'Centro', is_featured: false }
        ], { ignoreDuplicates: true })
    }

    // Add Loja neighborhoods
    if (cityMap['Loja']) {
      await supabaseAdmin
        .from('neighborhoods')
        .upsert([
          { name: 'Centro Histórico', city_id: cityMap['Loja'], zone: 'Centro', is_featured: true },
          { name: 'El Valle', city_id: cityMap['Loja'], zone: 'Norte', is_featured: true },
          { name: 'Clodoveo Jaramillo', city_id: cityMap['Loja'], zone: 'Sur', is_featured: true },
          { name: 'Jipiro', city_id: cityMap['Loja'], zone: 'Norte', is_featured: false },
          { name: 'Miraflores', city_id: cityMap['Loja'], zone: 'Este', is_featured: false },
          { name: 'Sauces Norte', city_id: cityMap['Loja'], zone: 'Norte', is_featured: false },
          { name: 'Daniel Álvarez', city_id: cityMap['Loja'], zone: 'Oeste', is_featured: false }
        ], { ignoreDuplicates: true })
    }

    // Test results
    const { data: testNeighborhoods } = await supabaseAdmin
      .from('neighborhoods')
      .select('name, zone, cities(name)')
      .limit(10)

    return NextResponse.json({
      success: true,
      message: 'Missing neighborhoods added successfully!',
      data: {
        neighborhoods: testNeighborhoods?.length || 0,
        sample: testNeighborhoods
      }
    })

  } catch (error) {
    console.error('Add neighborhoods error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}