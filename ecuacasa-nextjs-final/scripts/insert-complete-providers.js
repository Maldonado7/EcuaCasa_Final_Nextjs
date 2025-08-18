// Script to insert sample providers with complete schema including required 'type' field
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://dvfyknrbbjzjiojyxbel.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZnlrbnJiYmp6amlvanl4YmVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzYxMDczMiwiZXhwIjoyMDYzMTg2NzMyfQ.DOJdp24WWRNi5JBFmDHkYk-Qi8o3w7PkKd3tcxUIOUE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertCompleteProviders() {
  try {
    console.log('🚀 Starting provider insertion...')
    
    // Use the existing user ID found from schema check
    const userId = '7af3b423-806e-434a-b6e5-9ae3e395735b'
    console.log('Using user ID:', userId)

    // Complete providers data with all required fields including 'type'
    const providers = [
      {
        id: 'a82787e0-1d16-4f82-bc23-f6eb66d493a7',
        user_id: userId,
        type: 'service_provider', // Required field
        name: 'Carlos Mendoza',
        bio: 'Plomero experto con certificaciones profesionales',
        service_type: 'Plomero Master',
        description: 'Especialista en plomería residencial con 8+ años de experiencia.',
        location: 'El Centro',
        neighborhood: 'El Centro',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0987654321',
        rating: 5.0,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      },
      {
        id: 'd2051ab9-467b-417e-b903-7d737d5afeb2',
        user_id: userId,
        type: 'service_provider',
        name: 'María Elena Rodríguez',
        bio: 'Electricista certificada con amplia experiencia',
        service_type: 'Electricista Certificada',
        description: 'Electricista certificada especializada en instalaciones residenciales.',
        location: 'San Joaquín',
        neighborhood: 'San Joaquín',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0976543210',
        rating: 4.9,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      },
      {
        id: '0fd489f7-d7fc-4989-b1f0-aeaa05cb7c78',
        user_id: userId,
        type: 'service_provider',
        name: 'Luis Fernando García',
        bio: 'Carpintero artesanal especializado en trabajos finos',
        service_type: 'Carpintero Artesanal',
        description: 'Carpintero artesanal especializado en muebles a medida.',
        location: 'Yanuncay',
        neighborhood: 'Yanuncay',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0965432109',
        rating: 4.8,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      },
      {
        id: '14ff7431-8f3d-4052-a210-26370310cc19',
        user_id: userId,
        type: 'service_provider',
        name: 'Ana Patricia Silva',
        bio: 'Pintora profesional con técnicas especializadas',
        service_type: 'Pintora Profesional',
        description: 'Pintora profesional especializada en pintura decorativa.',
        location: 'San Sebastián',
        neighborhood: 'San Sebastián',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0954321098',
        rating: 4.9,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      },
      {
        id: '73b86935-a611-4894-b5df-ef48c2d93e4c',
        user_id: userId,
        type: 'service_provider',
        name: 'Jorge Alberto Vega',
        bio: 'Jardinero paisajista con diseño profesional',
        service_type: 'Jardinero Paisajista',
        description: 'Jardinero paisajista con experiencia en diseño de jardines.',
        location: 'Totoracocha',
        neighborhood: 'Totoracocha',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0943210987',
        rating: 4.7,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      },
      {
        id: '4131ffa2-f64e-408d-a7ba-0cc369ab6e3b',
        user_id: userId,
        type: 'service_provider',
        name: 'Rosa María Vera',
        bio: 'Especialista en limpieza premium y desinfección',
        service_type: 'Limpieza Premium',
        description: 'Servicio de limpieza premium para hogares y oficinas.',
        location: 'Monay',
        neighborhood: 'Monay',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0932109876',
        rating: 4.8,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      },
      {
        id: 'b012d194-04af-4999-b42f-c280198a9555',
        user_id: userId,
        type: 'service_provider',
        name: 'Miguel Ángel Torres',
        bio: 'Cerrajero especializado en emergencias 24/7',
        service_type: 'Cerrajero 24/7',
        description: 'Cerrajero disponible 24/7 para emergencias.',
        location: 'El Batán',
        neighborhood: 'El Batán',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0921098765',
        rating: 4.9,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      },
      {
        id: 'eb8282c6-9372-4025-8234-0e1869960e42',
        user_id: userId,
        type: 'service_provider',
        name: 'Carmen Lucía Ordóñez',
        bio: 'Albañil especialista en construcción y remodelación',
        service_type: 'Albañil Especialista',
        description: 'Albañil especialista en construcción y remodelación.',
        location: 'Ricaurte',
        neighborhood: 'Ricaurte',
        city: 'Cuenca',
        province: 'Azuay',
        phone: '0910987654',
        rating: 4.6,
        verified: true,
        featured: true,
        is_demo: true,
        profile_completion: 100
      }
    ]

    console.log('📝 Inserting 8 sample providers...')
    
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
    console.log('\nNext steps:')
    console.log('1. Restart your development server')
    console.log('2. Visit the homepage to see all provider cards')
    console.log('3. Click on any provider card to test profile pages')

  } catch (error) {
    console.error('Error:', error)
  }
}

insertCompleteProviders()