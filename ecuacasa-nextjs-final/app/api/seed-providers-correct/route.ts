import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const providers = [
  // Individual Professionals - Cuenca
  {
    name: 'Carlos Mendoza - Plomero Master',
    service_type: 'Plomero',
    description: 'Especialista en plomería residencial y comercial con 15 años de experiencia. Servicio 24/7.',
    price_range: '$25-45/hora',
    location: 'El Centro, Cuenca',
    city: 'Cuenca',
    phone: '0999123456',
    rating: 5.0,
    reviews_count: 342,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },
  {
    name: 'María Elena Rodríguez',
    service_type: 'Electricista',
    description: 'Electricista certificada con especialización en instalaciones residenciales y sistemas de seguridad.',
    price_range: '$30-50/hora',
    location: 'Yanuncay, Cuenca',
    city: 'Cuenca',
    phone: '0997345678',
    rating: 4.9,
    reviews_count: 289,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },
  {
    name: 'Luis Fernando García',
    service_type: 'Carpintero',
    description: 'Maestro carpintero especializado en muebles a medida y restauración de antigüedades.',
    price_range: '$40-70/hora',
    location: 'San Sebastián, Cuenca',
    city: 'Cuenca',
    phone: '0995567890',
    rating: 5.0,
    reviews_count: 187,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },
  {
    name: 'Ana Patricia Silva',
    service_type: 'Pintor',
    description: 'Pintora profesional con especialización en pintura decorativa y acabados especiales.',
    price_range: '$20-35/hora',
    location: 'Monay, Cuenca',
    city: 'Cuenca',
    phone: '0993789012',
    rating: 4.9,
    reviews_count: 234,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },
  {
    name: 'Jorge Alberto Vega',
    service_type: 'Jardinero',
    description: 'Jardinero paisajista con experiencia en diseño y mantenimiento de jardines residenciales.',
    price_range: '$25-40/hora',
    location: 'Yanuncay, Cuenca',
    city: 'Cuenca',
    phone: '0989123456',
    rating: 4.9,
    reviews_count: 198,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },

  // Companies - Cuenca
  {
    name: 'Servicios de Limpieza Integral ECO',
    service_type: 'Limpieza',
    description: 'Empresa de limpieza profesional con productos ecológicos. Servicios residenciales y comerciales.',
    price_range: '$15-25/hora',
    location: 'El Centro, Cuenca',
    city: 'Cuenca',
    phone: '0991901234',
    rating: 4.8,
    reviews_count: 567,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'María González' // Skip for now
  },
  {
    name: 'Construcciones González',
    service_type: 'Albañil',
    description: 'Empresa constructora especializada en remodelación y construcción de viviendas.',
    price_range: '$35-50/hora',
    location: 'San Sebastián, Cuenca',
    city: 'Cuenca',
    phone: '0987345678',
    rating: 4.7,
    reviews_count: 156,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Roberto González'
  },
  {
    name: 'ElectroSeguro CIA LTDA',
    service_type: 'Electricista',
    description: 'Empresa especializada en automatización residencial, domótica y sistemas eléctricos industriales.',
    price_range: '$35-60/hora',
    location: 'Totoracocha, Cuenca',
    city: 'Cuenca',
    phone: '0996456789',
    rating: 4.7,
    reviews_count: 98,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Roberto Sánchez'
  },
  {
    name: 'Cerrajería 24/7 Cuenca',
    service_type: 'Cerrajero',
    description: 'Servicio de cerrajería de emergencia las 24 horas. Apertura, cambio de cerraduras y sistemas de seguridad.',
    price_range: '$30-60/servicio',
    location: 'Totoracocha, Cuenca',
    city: 'Cuenca',
    phone: '0988234567',
    rating: 4.8,
    reviews_count: 312,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Luis Herrera'
  },
  {
    name: 'Muebles Modernos del Austro',
    service_type: 'Carpintero',
    description: 'Fábrica de muebles contemporáneos y diseño personalizado para hogar y oficina.',
    price_range: '$35-55/hora',
    location: 'El Batán, Cuenca',
    city: 'Cuenca',
    phone: '0994678901',
    rating: 4.6,
    reviews_count: 76,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Diego Morales'
  },

  // Mix of both - Other cities
  {
    name: 'Juan Pablo Pérez',
    service_type: 'Plomero',
    description: 'Plomero con especialización en reparaciones de emergencia y mantenimiento preventivo.',
    price_range: '$20-35/hora',
    location: 'San Joaquín, Cuenca',
    city: 'Cuenca',
    phone: '0998234567',
    rating: 4.8,
    reviews_count: 156,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },
  {
    name: 'TecnoElectric Quito',
    service_type: 'Electricista',
    description: 'Empresa especializada en instalaciones eléctricas industriales y residenciales en Quito.',
    price_range: '$40-70/hora',
    location: 'La Carolina, Quito',
    city: 'Quito',
    phone: '0986456789',
    rating: 4.9,
    reviews_count: 234,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Andrea Vásquez'
  },
  {
    name: 'Servicios del Puerto GYE',
    service_type: 'Plomero',
    description: 'Plomería comercial y residencial en Guayaquil. Especialistas en sistemas de agua.',
    price_range: '$25-40/hora',
    location: 'Kennedy, Guayaquil',
    city: 'Guayaquil',
    phone: '0984678901',
    rating: 4.7,
    reviews_count: 267,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Carlos Navas'
  },
  {
    name: 'Aire Fresco GYE',
    service_type: 'Aire Acondicionado',
    description: 'Instalación, mantenimiento y reparación de sistemas de aire acondicionado.',
    price_range: '$35-60/hora',
    location: 'Urdesa, Guayaquil',
    city: 'Guayaquil',
    phone: '0983789012',
    rating: 4.8,
    reviews_count: 198,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Miguel Torres'
  },
  {
    name: 'Plomería Express Norte',
    service_type: 'Plomero',
    description: 'Servicio rápido de plomería en el norte de Quito. Emergencias y mantenimiento.',
    price_range: '$30-50/hora',
    location: 'Iñaquito, Quito',
    city: 'Quito',
    phone: '0985567890',
    rating: 4.6,
    reviews_count: 189,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },

  // More variety for Cuenca
  {
    name: 'LimpiaMax Cuenca',
    service_type: 'Limpieza',
    description: 'Empresa de limpieza residencial y de oficinas con personal capacitado.',
    price_range: '$12-20/hora',
    location: 'San Joaquín, Cuenca',
    city: 'Cuenca',
    phone: '0990012345',
    rating: 4.7,
    reviews_count: 423,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Patricia Mendez'
  },
  {
    name: 'Miguel Ángel Torres',
    service_type: 'Pintor',
    description: 'Pintor profesional especializado en pintura residencial y comercial de alta calidad.',
    price_range: '$18-30/hora',
    location: 'Ricaurte, Cuenca',
    city: 'Cuenca',
    phone: '0992890123',
    rating: 4.5,
    reviews_count: 145,
    verified: true,
    // provider_type: 'individual' // Skip for now
  },
  {
    name: 'Mudanzas Seguras Ecuador',
    service_type: 'Mudanzas',
    description: 'Empresa de mudanzas locales y nacionales con embalaje profesional y seguro.',
    price_range: '$50-100/hora',
    location: 'Yanuncay, Cuenca',
    city: 'Cuenca',
    phone: '0981901234',
    rating: 4.6,
    reviews_count: 123,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Fernando Vega'
  },
  {
    name: 'Control de Plagas Cuenca',
    service_type: 'Control de Plagas',
    description: 'Fumigación y control de plagas con garantía. Servicio residencial y comercial.',
    price_range: '$40-80/servicio',
    location: 'Monay, Cuenca',
    city: 'Cuenca',
    phone: '0980012345',
    rating: 4.8,
    reviews_count: 89,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Sandra López'
  },
  {
    name: 'Decoración & Diseño Interior Cuenca',
    service_type: 'Decoración',
    description: 'Estudio de diseño de interiores y decoración para espacios residenciales y comerciales.',
    price_range: '$50-100/hora',
    location: 'El Batán, Cuenca',
    city: 'Cuenca',
    phone: '0979123456',
    rating: 5.0,
    reviews_count: 67,
    verified: true,
    // provider_type: 'company', // Skip for now
    // contact_person: 'Isabella Cordero'
  }
]

export async function POST() {
  const supabaseAdmin = getSupabaseAdmin()
  try {
    console.log('🌱 Seeding providers with correct structure...')

    // Clear existing providers first
    await supabaseAdmin
      .from('providers')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

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
      breakdown: {
        individuals: data?.filter(p => p.provider_type === 'individual').length || 0,
        companies: data?.filter(p => p.provider_type === 'company').length || 0,
        total: data?.length || 0
      },
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
  const supabaseAdmin = getSupabaseAdmin()
  try {
    const { data, count } = await supabaseAdmin
      .from('providers')
      .select('*', { count: 'exact' })
      .order('rating', { ascending: false })
    
    return NextResponse.json({
      total: count,
      breakdown: {
        individuals: data?.filter(p => p.provider_type === 'individual').length || 0,
        companies: data?.filter(p => p.provider_type === 'company').length || 0
      },
      providers: data?.slice(0, 5) // Show first 5
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch providers'
    }, { status: 500 })
  }
}