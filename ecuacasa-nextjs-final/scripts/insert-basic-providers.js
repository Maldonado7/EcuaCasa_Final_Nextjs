// Script to insert sample providers with only basic columns that exist in database
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://dvfyknrbbjzjiojyxbel.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZnlrbnJiYmp6amlvanl4YmVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzYxMDczMiwiZXhwIjoyMDYzMTg2NzMyfQ.DOJdp24WWRNi5JBFmDHkYk-Qi8o3w7PkKd3tcxUIOUE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertBasicProviders() {
  try {
    // First check what columns exist in the providers table
    console.log('Checking existing providers...')
    const { data: existingProviders } = await supabase
      .from('providers')
      .select('*')
      .limit(1)

    console.log('Existing provider structure:', existingProviders && existingProviders[0] ? Object.keys(existingProviders[0]) : 'No providers')

    // Get an existing user ID to use as fallback
    const { data: users } = await supabase.from('users').select('id').limit(1)
    const userId = users && users.length > 0 ? users[0].id : null

    if (!userId) {
      console.error('No users found in database. Need at least one user to reference.')
      return
    }

    console.log('Using user ID:', userId)

    // Basic providers data using only core columns
    const basicProviders = [
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        user_id: userId,
        name: 'Carlos Mendoza',
        service_type: 'Plomero Master',
        description: 'Especialista en plomería residencial con 8+ años de experiencia.',
        location: 'El Centro',
        phone: '0987654321',
        rating: 5.0,
        verified: true
      },
      {
        id: 'b2c3d4e5-f6g7-8901-bcde-f12345678901',
        user_id: userId,
        name: 'María Elena Rodríguez',
        service_type: 'Electricista Certificada',
        description: 'Electricista certificada especializada en instalaciones residenciales.',
        location: 'San Joaquín',
        phone: '0976543210',
        rating: 4.9,
        verified: true
      },
      {
        id: 'c3d4e5f6-g7h8-9012-cdef-123456789012',
        user_id: userId,
        name: 'Luis Fernando García',
        service_type: 'Carpintero Artesanal',
        description: 'Carpintero artesanal especializado en muebles a medida.',
        location: 'Yanuncay',
        phone: '0965432109',
        rating: 4.8,
        verified: true
      },
      {
        id: 'd4e5f6g7-h8i9-0123-defg-234567890123',
        user_id: userId,
        name: 'Ana Patricia Silva',
        service_type: 'Pintora Profesional',
        description: 'Pintora profesional especializada en pintura decorativa.',
        location: 'San Sebastián',
        phone: '0954321098',
        rating: 4.9,
        verified: true
      },
      {
        id: 'e5f6g7h8-i9j0-1234-efgh-345678901234',
        user_id: userId,
        name: 'Jorge Alberto Vega',
        service_type: 'Jardinero Paisajista',
        description: 'Jardinero paisajista con experiencia en diseño de jardines.',
        location: 'Totoracocha',
        phone: '0943210987',
        rating: 4.7,
        verified: true
      },
      {
        id: 'f6g7h8i9-j0k1-2345-fghi-456789012345',
        user_id: userId,
        name: 'Rosa María Vera',
        service_type: 'Limpieza Premium',
        description: 'Servicio de limpieza premium para hogares y oficinas.',
        location: 'Monay',
        phone: '0932109876',
        rating: 4.8,
        verified: true
      },
      {
        id: 'g7h8i9j0-k1l2-3456-ghij-567890123456',
        user_id: userId,
        name: 'Miguel Ángel Torres',
        service_type: 'Cerrajero 24/7',
        description: 'Cerrajero disponible 24/7 para emergencias.',
        location: 'El Batán',
        phone: '0921098765',
        rating: 4.9,
        verified: true
      },
      {
        id: 'h8i9j0k1-l2m3-4567-hijk-678901234567',
        user_id: userId,
        name: 'Carmen Lucía Ordóñez',
        service_type: 'Albañil Especialista',
        description: 'Albañil especialista en construcción y remodelación.',
        location: 'Ricaurte',
        phone: '0910987654',
        rating: 4.6,
        verified: true
      }
    ]

    console.log('Inserting sample providers...')
    
    // Insert all providers at once
    const { data, error } = await supabase
      .from('providers')
      .upsert(basicProviders, { onConflict: 'id' })
      .select()

    if (error) {
      console.error('Error inserting providers:', error)
    } else {
      console.log(`✅ Successfully inserted ${data.length} providers`)
    }

    // Check final count
    const { count } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })
      .eq('verified', true)

    console.log(`\n🎉 Total verified providers in database: ${count}`)
    console.log('✅ Basic providers setup complete!')

  } catch (error) {
    console.error('Error:', error)
  }
}

insertBasicProviders()