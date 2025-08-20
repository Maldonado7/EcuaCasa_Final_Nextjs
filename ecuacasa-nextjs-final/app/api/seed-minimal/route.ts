import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_SERVICE_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Using the exact same structure as the hardcoded data in providers/page.tsx
const providers = [
  {
    name: 'Carlos Mendoza',
    service_type: 'Plomero Master',
    location: 'El Centro',
    rating: 5.0,
    description: 'Especialista en plomería residencial y comercial'
  },
  {
    name: 'María Elena Rodríguez',
    service_type: 'Electricista Certificada',
    location: 'San Joaquín',
    rating: 4.9,
    description: 'Electricista certificada con 6 años de experiencia'
  },
  {
    name: 'Luis Fernando García',
    service_type: 'Carpintero Artesanal',
    location: 'Yanuncay',
    rating: 4.8,
    description: 'Carpintero especializado en muebles a medida'
  },
  {
    name: 'Ana Patricia Silva',
    service_type: 'Pintora Profesional',
    location: 'San Sebastián',
    rating: 4.9,
    description: 'Pintora con especialización en pintura decorativa'
  },
  {
    name: 'Jorge Alberto Vega',
    service_type: 'Jardinero Paisajista',
    location: 'Totoracocha',
    rating: 4.7,
    description: 'Jardinero con experiencia en diseño de jardines'
  },
  {
    name: 'Servicios de Limpieza ECO',
    service_type: 'Limpieza Profesional',
    location: 'El Centro',
    rating: 4.8,
    description: 'Empresa de limpieza con productos ecológicos'
  },
  {
    name: 'Construcciones González',
    service_type: 'Albañil Master',
    location: 'San Sebastián',
    rating: 4.7,
    description: 'Empresa constructora especializada en remodelación'
  },
  {
    name: 'Roberto Sánchez',
    service_type: 'Electricista Industrial',
    location: 'Totoracocha',
    rating: 4.7,
    description: 'Especialista en automatización y domótica'
  },
  {
    name: 'Cerrajería 24/7 Cuenca',
    service_type: 'Cerrajero de Emergencia',
    location: 'Monay',
    rating: 4.8,
    description: 'Servicio de cerrajería las 24 horas'
  },
  {
    name: 'Diego Morales',
    service_type: 'Carpintero Moderno',
    location: 'El Batán',
    rating: 4.6,
    description: 'Diseñador de muebles contemporáneos'
  },
  {
    name: 'Juan Pablo Pérez',
    service_type: 'Plomero Express',
    location: 'San Joaquín',
    rating: 4.8,
    description: 'Reparaciones de emergencia y mantenimiento'
  },
  {
    name: 'Miguel Ángel Torres',
    service_type: 'Pintor ColorPro',
    location: 'Ricaurte',
    rating: 4.5,
    description: 'Pintura residencial y comercial de calidad'
  },
  {
    name: 'TecnoElectric Quito',
    service_type: 'Electricista Certificado',
    location: 'La Carolina, Quito',
    rating: 4.9,
    description: 'Instalaciones eléctricas industriales en Quito'
  },
  {
    name: 'Plomería Express Norte',
    service_type: 'Plomero Quito',
    location: 'Iñaquito, Quito',
    rating: 4.6,
    description: 'Servicio rápido en el norte de Quito'
  },
  {
    name: 'Servicios del Puerto',
    service_type: 'Plomero GYE',
    location: 'Kennedy, Guayaquil',
    rating: 4.7,
    description: 'Plomería comercial y residencial en Guayaquil'
  },
  {
    name: 'Aire Fresco GYE',
    service_type: 'Técnico en AC',
    location: 'Urdesa, Guayaquil',
    rating: 4.8,
    description: 'Instalación y mantenimiento de aire acondicionado'
  },
  {
    name: 'LimpiaMax Cuenca',
    service_type: 'Limpieza Residencial',
    location: 'San Joaquín',
    rating: 4.7,
    description: 'Limpieza de casas y oficinas'
  },
  {
    name: 'Mudanzas Seguras Ecuador',
    service_type: 'Empresa de Mudanzas',
    location: 'Yanuncay',
    rating: 4.6,
    description: 'Mudanzas locales y nacionales'
  },
  {
    name: 'Control de Plagas Cuenca',
    service_type: 'Fumigador Profesional',
    location: 'Monay',
    rating: 4.8,
    description: 'Fumigación y control de plagas'
  },
  {
    name: 'Decoración & Diseño',
    service_type: 'Diseñador de Interiores',
    location: 'El Batán',
    rating: 5.0,
    description: 'Diseño de interiores y decoración'
  }
]

export async function POST() {
  try {
    console.log('🌱 Seeding minimal providers...')
    
    // Clear existing providers first
    await supabaseAdmin
      .from('providers')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    // Insert all providers
    const { data, error } = await supabaseAdmin
      .from('providers')
      .insert(providers)
      .select()
    
    if (error) {
      console.error('Error seeding providers:', error)
      return NextResponse.json({ 
        error: 'Failed to seed providers',
        details: error 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Successfully seeded ${data?.length || 0} providers`,
      total: data?.length || 0,
      sample: data?.slice(0, 3)
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
    const { data, count } = await supabaseAdmin
      .from('providers')
      .select('*', { count: 'exact' })
      .order('rating', { ascending: false })
    
    return NextResponse.json({
      total: count,
      providers: data
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch providers'
    }, { status: 500 })
  }
}