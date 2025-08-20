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
    console.log('🌱 Seeding complete data (users + providers)...')
    
    // Step 1: Create dummy user profiles for providers
    const dummyUsers = [
      { clerk_id: 'demo_carlos', email: 'carlos@demo.com', first_name: 'Carlos', last_name: 'Mendoza', role: 'professional' },
      { clerk_id: 'demo_maria', email: 'maria@demo.com', first_name: 'María', last_name: 'Rodríguez', role: 'professional' },
      { clerk_id: 'demo_luis', email: 'luis@demo.com', first_name: 'Luis', last_name: 'García', role: 'professional' },
      { clerk_id: 'demo_ana', email: 'ana@demo.com', first_name: 'Ana', last_name: 'Silva', role: 'professional' },
      { clerk_id: 'demo_jorge', email: 'jorge@demo.com', first_name: 'Jorge', last_name: 'Vega', role: 'professional' },
      { clerk_id: 'demo_eco', email: 'eco@demo.com', first_name: 'ECO', last_name: 'Limpieza', role: 'professional' },
      { clerk_id: 'demo_gonzalez', email: 'gonzalez@demo.com', first_name: 'González', last_name: 'Construcciones', role: 'professional' },
      { clerk_id: 'demo_roberto', email: 'roberto@demo.com', first_name: 'Roberto', last_name: 'Sánchez', role: 'professional' },
      { clerk_id: 'demo_cerrajeria', email: 'cerrajeria@demo.com', first_name: 'Cerrajería', last_name: '24/7', role: 'professional' },
      { clerk_id: 'demo_diego', email: 'diego@demo.com', first_name: 'Diego', last_name: 'Morales', role: 'professional' },
    ]

    // Insert user profiles
    const { data: userProfiles, error: userError } = await supabaseAdmin
      .from('user_profiles')
      .upsert(dummyUsers, { onConflict: 'clerk_id' })
      .select()

    if (userError) {
      console.error('Error creating user profiles:', userError)
      return NextResponse.json({ 
        error: 'Failed to create user profiles',
        details: userError 
      }, { status: 500 })
    }

    // Step 2: Create providers linked to users
    const providers = [
      {
        user_id: userProfiles[0].id,
        name: 'Carlos Mendoza',
        service_type: 'Plomero Master',
        location: 'El Centro',
        rating: 5.0,
        description: 'Especialista en plomería residencial y comercial',
        verified: true
      },
      {
        user_id: userProfiles[1].id,
        name: 'María Elena Rodríguez',
        service_type: 'Electricista Certificada',
        location: 'San Joaquín',
        rating: 4.9,
        description: 'Electricista certificada con 6 años de experiencia',
        verified: true
      },
      {
        user_id: userProfiles[2].id,
        name: 'Luis Fernando García',
        service_type: 'Carpintero Artesanal',
        location: 'Yanuncay',
        rating: 4.8,
        description: 'Carpintero especializado en muebles a medida',
        verified: true
      },
      {
        user_id: userProfiles[3].id,
        name: 'Ana Patricia Silva',
        service_type: 'Pintora Profesional',
        location: 'San Sebastián',
        rating: 4.9,
        description: 'Pintora con especialización en pintura decorativa',
        verified: true
      },
      {
        user_id: userProfiles[4].id,
        name: 'Jorge Alberto Vega',
        service_type: 'Jardinero Paisajista',
        location: 'Totoracocha',
        rating: 4.7,
        description: 'Jardinero con experiencia en diseño de jardines',
        verified: true
      },
      {
        user_id: userProfiles[5].id,
        name: 'Servicios de Limpieza ECO',
        service_type: 'Limpieza Profesional',
        location: 'El Centro',
        rating: 4.8,
        description: 'Empresa de limpieza con productos ecológicos',
        verified: true
      },
      {
        user_id: userProfiles[6].id,
        name: 'Construcciones González',
        service_type: 'Albañil Master',
        location: 'San Sebastián',
        rating: 4.7,
        description: 'Empresa constructora especializada en remodelación',
        verified: true
      },
      {
        user_id: userProfiles[7].id,
        name: 'Roberto Sánchez',
        service_type: 'Electricista Industrial',
        location: 'Totoracocha',
        rating: 4.7,
        description: 'Especialista en automatización y domótica',
        verified: true
      },
      {
        user_id: userProfiles[8].id,
        name: 'Cerrajería 24/7 Cuenca',
        service_type: 'Cerrajero de Emergencia',
        location: 'Monay',
        rating: 4.8,
        description: 'Servicio de cerrajería las 24 horas',
        verified: true
      },
      {
        user_id: userProfiles[9].id,
        name: 'Diego Morales',
        service_type: 'Carpintero Moderno',
        location: 'El Batán',
        rating: 4.6,
        description: 'Diseñador de muebles contemporáneos',
        verified: true
      }
    ]

    // Clear existing providers
    await supabaseAdmin
      .from('providers')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    // Insert providers
    const { data: providerData, error: providerError } = await supabaseAdmin
      .from('providers')
      .insert(providers)
      .select()
    
    if (providerError) {
      console.error('Error seeding providers:', providerError)
      return NextResponse.json({ 
        error: 'Failed to seed providers',
        details: providerError 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Successfully seeded complete data',
      data: {
        users_created: userProfiles?.length || 0,
        providers_created: providerData?.length || 0
      },
      sample_providers: providerData?.slice(0, 3)
    })
    
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      error: 'Seed failed',
      details: error 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: providers, count } = await supabaseAdmin
      .from('providers')
      .select('*', { count: 'exact' })
      .order('rating', { ascending: false })
    
    const { data: users, count: userCount } = await supabaseAdmin
      .from('user_profiles')
      .select('*', { count: 'exact' })
    
    return NextResponse.json({
      database_status: {
        providers: count || 0,
        users: userCount || 0
      },
      sample_providers: providers?.slice(0, 3)
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch data'
    }, { status: 500 })
  }
}