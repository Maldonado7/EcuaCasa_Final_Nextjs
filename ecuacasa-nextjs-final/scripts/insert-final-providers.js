// Script to insert sample providers with valid UUIDs and correct columns
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://dvfyknrbbjzjiojyxbel.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZnlrbnJiYmp6amlvanl4YmVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzYxMDczMiwiZXhwIjoyMDYzMTg2NzMyfQ.DOJdp24WWRNi5JBFmDHkYk-Qi8o3w7PkKd3tcxUIOUE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertFinalProviders() {
  try {
    // Get an existing user ID to use as fallback
    const { data: users } = await supabase.from('users').select('id').limit(1)
    const userId = users && users.length > 0 ? users[0].id : null

    if (!userId) {
      console.error('No users found in database. Need at least one user to reference.')
      return
    }

    console.log('Using user ID:', userId)

    // Sample providers with valid UUIDs and existing columns
    const providers = [
      {
        id: 'a82787e0-1d16-4f82-bc23-f6eb66d493a7',
        user_id: userId,
        name: 'Carlos Mendoza',
        service_type: 'Plomero Master',
        description: 'Especialista en plomería residencial con 8+ años de experiencia.',
        location: 'El Centro',
        phone: '0987654321',
        rating: 5.0,
        verified: true,
        is_demo: true,
        neighborhood: 'El Centro',
        city: 'Cuenca'
      },
      {
        id: 'd2051ab9-467b-417e-b903-7d737d5afeb2',
        user_id: userId,
        name: 'María Elena Rodríguez',
        service_type: 'Electricista Certificada',
        description: 'Electricista certificada especializada en instalaciones residenciales.',
        location: 'San Joaquín',
        phone: '0976543210',
        rating: 4.9,
        verified: true,
        is_demo: true,
        neighborhood: 'San Joaquín',
        city: 'Cuenca'
      },
      {
        id: '0fd489f7-d7fc-4989-b1f0-aeaa05cb7c78',
        user_id: userId,
        name: 'Luis Fernando García',
        service_type: 'Carpintero Artesanal',
        description: 'Carpintero artesanal especializado en muebles a medida.',
        location: 'Yanuncay',
        phone: '0965432109',
        rating: 4.8,
        verified: true,
        is_demo: true,
        neighborhood: 'Yanuncay',
        city: 'Cuenca'
      },
      {
        id: '14ff7431-8f3d-4052-a210-26370310cc19',
        user_id: userId,
        name: 'Ana Patricia Silva',
        service_type: 'Pintora Profesional',
        description: 'Pintora profesional especializada en pintura decorativa.',
        location: 'San Sebastián',
        phone: '0954321098',
        rating: 4.9,
        verified: true,
        is_demo: true,
        neighborhood: 'San Sebastián',
        city: 'Cuenca'
      },
      {
        id: '73b86935-a611-4894-b5df-ef48c2d93e4c',
        user_id: userId,
        name: 'Jorge Alberto Vega',
        service_type: 'Jardinero Paisajista',
        description: 'Jardinero paisajista con experiencia en diseño de jardines.',
        location: 'Totoracocha',
        phone: '0943210987',
        rating: 4.7,
        verified: true,
        is_demo: true,
        neighborhood: 'Totoracocha',
        city: 'Cuenca'
      },
      {
        id: '4131ffa2-f64e-408d-a7ba-0cc369ab6e3b',
        user_id: userId,
        name: 'Rosa María Vera',
        service_type: 'Limpieza Premium',
        description: 'Servicio de limpieza premium para hogares y oficinas.',
        location: 'Monay',
        phone: '0932109876',
        rating: 4.8,
        verified: true,
        is_demo: true,
        neighborhood: 'Monay',
        city: 'Cuenca'
      },
      {
        id: 'b012d194-04af-4999-b42f-c280198a9555',
        user_id: userId,
        name: 'Miguel Ángel Torres',
        service_type: 'Cerrajero 24/7',
        description: 'Cerrajero disponible 24/7 para emergencias.',
        location: 'El Batán',
        phone: '0921098765',
        rating: 4.9,
        verified: true,
        is_demo: true,
        neighborhood: 'El Batán',
        city: 'Cuenca'
      },
      {
        id: 'eb8282c6-9372-4025-8234-0e1869960e42',
        user_id: userId,
        name: 'Carmen Lucía Ordóñez',
        service_type: 'Albañil Especialista',
        description: 'Albañil especialista en construcción y remodelación.',
        location: 'Ricaurte',
        phone: '0910987654',
        rating: 4.6,
        verified: true,
        is_demo: true,
        neighborhood: 'Ricaurte',
        city: 'Cuenca'
      }
    ]

    console.log('Inserting 8 sample providers...')
    
    // Insert providers one by one for better error handling
    let successCount = 0
    for (const provider of providers) {
      try {
        const { data, error } = await supabase
          .from('providers')
          .upsert(provider, { onConflict: 'id' })
          .select()

        if (error) {
          console.error(`❌ Error inserting ${provider.name}:`, error.message)
        } else {
          console.log(`✅ Successfully inserted ${provider.name}`)
          successCount++
        }
      } catch (err) {
        console.error(`❌ Exception inserting ${provider.name}:`, err.message)
      }
    }

    // Check final count
    const { count } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })
      .eq('verified', true)

    console.log(`\n🎉 Successfully inserted ${successCount} providers`)
    console.log(`🎉 Total verified providers in database: ${count}`)
    console.log('✅ Database setup complete!')

  } catch (error) {
    console.error('Error:', error)
  }
}

insertFinalProviders()