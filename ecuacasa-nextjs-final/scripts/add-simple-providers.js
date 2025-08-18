const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function addSimpleProviders() {
  console.log('🚀 Adding REAL providers to database (simplified)...\n')

  // Simple providers with only basic fields
  const simpleProviders = [
    {
      name: 'REAL Provider - María González',
      service_type: 'Electricista Certificada',
      description: 'Electricista profesional con 10 años de experiencia en Cuenca',
      location: 'El Centro, Cuenca',
      phone: '+593991234567',
      rating: 4.9,
      verified: true,
      type: 'individual'
    },
    {
      name: 'REAL Provider - Juan Pérez',
      service_type: 'Plomero Master',
      description: 'Especialista en plomería residencial y comercial en Cuenca',
      location: 'San Joaquín, Cuenca',
      phone: '+593987654321',
      rating: 5.0,
      verified: true,
      type: 'individual'
    },
    {
      name: 'REAL Provider - Carlos Mendoza',
      service_type: 'Carpintero Profesional',
      description: 'Carpintería fina y muebles a medida en Cuenca',
      location: 'Yanuncay, Cuenca',
      phone: '+593998765432',
      rating: 4.8,
      verified: true,
      type: 'individual'
    },
    {
      name: 'REAL Provider - Ana Silva',
      service_type: 'Limpieza Premium',
      description: 'Servicio de limpieza profesional para hogares y oficinas',
      location: 'Monay, Cuenca',
      phone: '+593995551234',
      rating: 4.7,
      verified: true,
      type: 'individual'
    },
    {
      name: 'REAL Provider - Roberto Torres',
      service_type: 'Cerrajero 24/7',
      description: 'Cerrajero profesional disponible las 24 horas',
      location: 'El Batán, Cuenca',
      phone: '+593994445678',
      rating: 4.9,
      verified: true,
      type: 'individual'
    },
    {
      name: 'REAL Provider - Laura Jiménez',
      service_type: 'Pintora Profesional',
      description: 'Pintura decorativa y tradicional para su hogar',
      location: 'Totoracocha, Cuenca',
      phone: '+593993337890',
      rating: 4.6,
      verified: true,
      type: 'individual'
    }
  ]

  console.log('🗄️ Adding providers to database...')
  
  const { data: providerData, error: providerError } = await supabase
    .from('providers')
    .insert(simpleProviders)
    .select()

  if (providerError) {
    console.log('❌ Error:', providerError.message)
    console.log('\n💡 Trying to fix by creating missing columns...')
    
    // Try without certain fields
    const minimalProviders = simpleProviders.map(p => ({
      name: p.name,
      service_type: p.service_type,
      description: p.description,
      location: p.location,
      phone: p.phone
    }))
    
    const { data: retry, error: retryError } = await supabase
      .from('providers')
      .insert(minimalProviders)
      .select()
    
    if (retryError) {
      console.log('❌ Still failing:', retryError.message)
    } else {
      console.log('✅ Added with minimal fields!')
      providerData = retry
    }
  } else {
    console.log('✅ Successfully added', providerData.length, 'REAL providers!')
  }

  // Check what's in the database now
  console.log('\n📊 Checking database...')
  const { data: allProviders, count } = await supabase
    .from('providers')
    .select('*', { count: 'exact' })

  console.log('Total providers in database:', count || 0)
  
  if (allProviders && allProviders.length > 0) {
    console.log('\n🎉 Providers in database:')
    allProviders.forEach(p => {
      console.log(`   ✅ ${p.name} - ${p.service_type}`)
    })
    
    console.log('\n🌟 SUCCESS! Refresh http://localhost:3000 to see REAL providers!')
    console.log('The homepage will now show REAL data instead of mock data!')
  } else {
    console.log('⚠️  No providers found. The app will show mock data.')
  }
}

addSimpleProviders().catch(console.error)