const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function addRealProviders() {
  console.log('🚀 Adding REAL providers to database...\n')

  // First, create a test user for the providers
  console.log('1️⃣ Creating user profile...')
  let userData = null
  const { data: newUser, error: userError } = await supabase
    .from('user_profiles')
    .insert([
      {
        clerk_id: 'real-provider-' + Date.now(),
        email: 'provider@ecuacasa.com',
        first_name: 'Provider',
        last_name: 'Account',
        role: 'provider'
      }
    ])
    .select()
    .single()

  if (userError) {
    console.log('⚠️ User profile table issue, trying without user_id...')
    userData = null // We'll add providers without user_id
  } else {
    console.log('✅ User created')
    userData = newUser
  }

  // Now add REAL providers
  console.log('\n2️⃣ Adding REAL providers to database...')
  
  const realProviders = [
    {
      name: 'REAL - María González',
      service_type: 'Electricista Certificada',
      description: 'REAL PROVIDER - Electricista profesional con 10 años de experiencia',
      location: 'El Centro, Cuenca',
      city: 'Cuenca',
      phone: '+593991234567',
      rating: 4.9,
      reviews_count: 45,
      jobs_completed: 120,
      verified: true,
      type: 'individual',
      price_range: '$30-50/hora',
      response_time: '15min',
      available_24_7: true
    },
    {
      name: 'REAL - Juan Pérez',
      service_type: 'Plomero Master',
      description: 'REAL PROVIDER - Especialista en plomería residencial y comercial',
      location: 'San Joaquín, Cuenca',
      city: 'Cuenca',
      phone: '+593987654321',
      rating: 5.0,
      reviews_count: 89,
      jobs_completed: 250,
      verified: true,
      type: 'individual',
      price_range: '$25-45/hora',
      response_time: '30min',
      available_24_7: false
    },
    {
      name: 'REAL - Carlos Mendoza',
      service_type: 'Carpintero Profesional',
      description: 'REAL PROVIDER - Carpintería fina y muebles a medida',
      location: 'Yanuncay, Cuenca',
      city: 'Cuenca',
      phone: '+593998765432',
      rating: 4.8,
      reviews_count: 67,
      jobs_completed: 180,
      verified: true,
      type: 'individual',
      price_range: '$35-60/hora',
      response_time: '1hr',
      available_24_7: false
    }
  ]

  // Add user_id to each provider if we have a user
  const providersWithUser = userData?.id 
    ? realProviders.map(provider => ({
        ...provider,
        user_id: userData.id
      }))
    : realProviders

  const { data: providerData, error: providerError } = await supabase
    .from('providers')
    .insert(providersWithUser)
    .select()

  if (providerError) {
    console.log('❌ Error adding providers:', providerError.message)
    console.log('Details:', providerError)
  } else {
    console.log('✅ Successfully added', providerData.length, 'REAL providers!')
    console.log('\n📋 Added providers:')
    providerData.forEach(p => {
      console.log(`   - ${p.name} (${p.service_type})`)
    })
  }

  // Check final count
  console.log('\n3️⃣ Checking database...')
  const { data: allProviders, count } = await supabase
    .from('providers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  console.log('📊 Total providers in database:', count || 0)
  if (allProviders && allProviders.length > 0) {
    console.log('🎉 Latest providers:')
    allProviders.slice(0, 5).forEach(p => {
      console.log(`   - ${p.name} (${p.service_type}) - ${p.verified ? '✅ Verified' : '⏳ Pending'}`)
    })
  }

  console.log('\n✨ DONE! Refresh the homepage to see REAL data!')
  console.log('🌐 Visit http://localhost:3000 to see the real providers')
}

addRealProviders().catch(console.error)