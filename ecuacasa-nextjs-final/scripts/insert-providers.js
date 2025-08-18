// Script to insert sample providers into the database using Node.js
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://dvfyknrbbjzjiojyxbel.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZnlrbnJiYmp6amlvanl4YmVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzYxMDczMiwiZXhwIjoyMDYzMTg2NzMyfQ.DOJdp24WWRNi5JBFmDHkYk-Qi8o3w7PkKd3tcxUIOUE'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertSampleProviders() {
  try {
    // First, get an existing user ID to use as fallback
    const { data: users } = await supabase.from('users').select('id').limit(1)
    const userId = users && users.length > 0 ? users[0].id : null

    if (!userId) {
      console.error('No users found in database. Need at least one user to reference.')
      return
    }

    console.log('Using user ID:', userId)

    // Sample providers data
    const sampleProviders = [
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        user_id: userId,
        name: 'Carlos Mendoza',
        service_type: 'Plomero Master',
        description: 'Especialista en plomería residencial con 8+ años de experiencia. Instalación y reparación de tuberías, grifos, inodoros y sistemas de agua caliente.',
        location: 'El Centro',
        phone: '0987654321',
        rating: 5.0,
        verified: true,
        price_range: '$20-35/hora',
        response_time: '15min',
        experience: 8,
        availability: 'Lun-Sáb 7:00-18:00',
        warranty: '6 meses',
        insurance: true,
        emergency_available: true
      },
      {
        id: 'b2c3d4e5-f6g7-8901-bcde-f12345678901',
        user_id: userId,
        name: 'María Elena Rodríguez',
        service_type: 'Electricista Certificada',
        description: 'Electricista certificada especializada en instalaciones residenciales. Cableado, tableros eléctricos y sistemas de iluminación.',
        location: 'San Joaquín',
        phone: '0976543210',
        rating: 4.9,
        verified: true,
        price_range: '$25-40/hora',
        response_time: '20min',
        experience: 6,
        availability: 'Lun-Vie 8:00-17:00',
        warranty: '1 año',
        insurance: true,
        emergency_available: false
      },
      {
        id: 'c3d4e5f6-g7h8-9012-cdef-123456789012',
        user_id: userId,
        name: 'Luis Fernando García',
        service_type: 'Carpintero Artesanal',
        description: 'Carpintero artesanal especializado en muebles a medida, closets empotrados y trabajos de ebanistería fina.',
        location: 'Yanuncay',
        phone: '0965432109',
        rating: 4.8,
        verified: true,
        price_range: '$30-50/hora',
        response_time: '30min',
        experience: 12,
        availability: 'Lun-Sáb 9:00-17:00',
        warranty: '2 años',
        insurance: true,
        emergency_available: false
      },
      {
        id: 'd4e5f6g7-h8i9-0123-defg-234567890123',
        user_id: userId,
        name: 'Ana Patricia Silva',
        service_type: 'Pintora Profesional',
        description: 'Pintora profesional especializada en pintura decorativa, acabados especiales y restauración de fachadas.',
        location: 'San Sebastián',
        phone: '0954321098',
        rating: 4.9,
        verified: true,
        price_range: '$18-30/hora',
        response_time: '25min',
        experience: 7,
        availability: 'Lun-Sáb 8:00-16:00',
        warranty: '30 días',
        insurance: true,
        emergency_available: false
      },
      {
        id: 'e5f6g7h8-i9j0-1234-efgh-345678901234',
        user_id: userId,
        name: 'Jorge Alberto Vega',
        service_type: 'Jardinero Paisajista',
        description: 'Jardinero paisajista con experiencia en diseño de jardines, mantenimiento de áreas verdes y sistemas de riego.',
        location: 'Totoracocha',
        phone: '0943210987',
        rating: 4.7,
        verified: true,
        price_range: '$15-25/hora',
        response_time: '45min',
        experience: 10,
        availability: 'Lun-Sáb 7:00-15:00',
        warranty: '30 días',
        insurance: false,
        emergency_available: false
      },
      {
        id: 'f6g7h8i9-j0k1-2345-fghi-456789012345',
        user_id: userId,
        name: 'Rosa María Vera',
        service_type: 'Limpieza Premium',
        description: 'Servicio de limpieza premium para hogares y oficinas. Limpieza profunda, mantenimiento regular y desinfección.',
        location: 'Monay',
        phone: '0932109876',
        rating: 4.8,
        verified: true,
        price_range: '$12-20/hora',
        response_time: '20min',
        experience: 5,
        availability: 'Lun-Sáb 8:00-17:00',
        warranty: '15 días',
        insurance: true,
        emergency_available: false
      },
      {
        id: 'g7h8i9j0-k1l2-3456-ghij-567890123456',
        user_id: userId,
        name: 'Miguel Ángel Torres',
        service_type: 'Cerrajero 24/7',
        description: 'Cerrajero disponible 24/7 para emergencias. Apertura de puertas, cambio de cerraduras y sistemas de seguridad.',
        location: 'El Batán',
        phone: '0921098765',
        rating: 4.9,
        verified: true,
        price_range: '$25-45/hora',
        response_time: '10min',
        experience: 9,
        availability: '24/7',
        warranty: '1 año',
        insurance: true,
        emergency_available: true
      },
      {
        id: 'h8i9j0k1-l2m3-4567-hijk-678901234567',
        user_id: userId,
        name: 'Carmen Lucía Ordóñez',
        service_type: 'Albañil Especialista',
        description: 'Albañil especialista en construcción y remodelación. Mampostería, pisos, azulejos y acabados.',
        location: 'Ricaurte',
        phone: '0910987654',
        rating: 4.6,
        verified: true,
        price_range: '$22-35/hora',
        response_time: '40min',
        experience: 15,
        availability: 'Lun-Vie 7:00-16:00',
        warranty: '6 meses',
        insurance: true,
        emergency_available: false
      }
    ]

    // Insert providers one by one to handle any duplicates
    for (const provider of sampleProviders) {
      console.log(`Inserting ${provider.name}...`)
      
      const { data, error } = await supabase
        .from('providers')
        .upsert(provider, { onConflict: 'id' })
        .select()

      if (error) {
        console.error(`Error inserting ${provider.name}:`, error.message)
      } else {
        console.log(`✅ Successfully inserted ${provider.name}`)
      }
    }

    // Check final count
    const { count } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })
      .eq('verified', true)

    console.log(`\n🎉 Total verified providers in database: ${count}`)
    console.log('✅ Sample providers setup complete!')

  } catch (error) {
    console.error('Error:', error)
  }
}

insertSampleProviders()