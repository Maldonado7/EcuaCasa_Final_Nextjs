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

const providers = [
  // Plomeros
  {
    business_name: 'Carlos Mendoza - Plomería Master',
    service_type: 'Plomero',
    description: 'Especialista en plomería residencial y comercial con 15 años de experiencia',
    price_range: '$25-45/hora',
    location: 'El Centro, Cuenca',
    city: 'Cuenca',
    phone: '0999123456',
    rating: 5.0,
    reviews_count: 342,
    verified: true
  },
  {
    business_name: 'Juan Pablo Pérez - Soluciones Hidráulicas',
    service_type: 'Plomero',
    description: 'Reparaciones de emergencia y mantenimiento preventivo',
    price_range: '$20-35/hora',
    location: 'San Joaquín, Cuenca',
    city: 'Cuenca',
    phone: '0998234567',
    rating: 4.8,
    reviews_count: 156,
    verified: true,
    experience_years: 8,
    available_24_7: true,
    response_time: '45min'
  },
  
  // Electricistas
  {
    business_name: 'María Elena Rodríguez - Electricista Certificada',
    service_type: 'Electricista',
    description: 'Instalaciones eléctricas seguras y certificadas',
    price_range: '$30-50/hora',
    location: 'Yanuncay, Cuenca',
    city: 'Cuenca',
    phone: '0997345678',
    rating: 4.9,
    reviews_count: 289,
    verified: true,
    experience_years: 12,
    available_24_7: false,
    response_time: '1hora'
  },
  {
    business_name: 'Roberto Sánchez - ElectroSeguro',
    service_type: 'Electricista',
    description: 'Especialista en automatización y domótica',
    price_range: '$35-60/hora',
    location: 'Totoracocha, Cuenca',
    city: 'Cuenca',
    phone: '0996456789',
    rating: 4.7,
    reviews_count: 98,
    verified: true,
    experience_years: 10,
    available_24_7: true,
    response_time: '2horas'
  },

  // Carpinteros
  {
    business_name: 'Luis Fernando García - Carpintería Artesanal',
    service_type: 'Carpintero',
    description: 'Muebles a medida y restauración de antigüedades',
    price_range: '$40-70/hora',
    location: 'San Sebastián, Cuenca',
    city: 'Cuenca',
    phone: '0995567890',
    rating: 5.0,
    reviews_count: 187,
    verified: true,
    experience_years: 20,
    available_24_7: false,
    response_time: '1día'
  },
  {
    business_name: 'Diego Morales - Muebles Modernos',
    service_type: 'Carpintero',
    description: 'Diseño y fabricación de muebles contemporáneos',
    price_range: '$35-55/hora',
    location: 'El Batán, Cuenca',
    city: 'Cuenca',
    phone: '0994678901',
    rating: 4.6,
    reviews_count: 76,
    verified: true,
    experience_years: 7,
    available_24_7: false,
    response_time: '2días'
  },

  // Pintores
  {
    business_name: 'Ana Patricia Silva - Pintora Profesional',
    service_type: 'Pintor',
    description: 'Pintura decorativa y acabados especiales',
    price_range: '$20-35/hora',
    location: 'Monay, Cuenca',
    city: 'Cuenca',
    phone: '0993789012',
    rating: 4.9,
    reviews_count: 234,
    verified: true,
    experience_years: 9,
    available_24_7: false,
    response_time: '1día'
  },
  {
    business_name: 'Miguel Ángel Torres - ColorPro',
    service_type: 'Pintor',
    description: 'Pintura residencial y comercial de alta calidad',
    price_range: '$18-30/hora',
    location: 'Ricaurte, Cuenca',
    city: 'Cuenca',
    phone: '0992890123',
    rating: 4.5,
    reviews_count: 145,
    verified: true,
    experience_years: 6,
    available_24_7: false,
    response_time: '2días'
  },

  // Limpieza
  {
    business_name: 'Servicios de Limpieza Integral ECO',
    service_type: 'Limpieza',
    description: 'Limpieza profunda con productos ecológicos',
    price_range: '$15-25/hora',
    location: 'El Centro, Cuenca',
    city: 'Cuenca',
    phone: '0991901234',
    rating: 4.8,
    reviews_count: 567,
    verified: true,
    experience_years: 5,
    available_24_7: true,
    response_time: '2horas'
  },
  {
    business_name: 'LimpiaMax - Soluciones de Limpieza',
    service_type: 'Limpieza',
    description: 'Limpieza residencial y de oficinas',
    price_range: '$12-20/hora',
    location: 'San Joaquín, Cuenca',
    city: 'Cuenca',
    phone: '0990012345',
    rating: 4.7,
    reviews_count: 423,
    verified: true,
    experience_years: 8,
    available_24_7: false,
    response_time: '3horas'
  },

  // Jardineros
  {
    business_name: 'Jorge Alberto Vega - Jardinería Paisajista',
    service_type: 'Jardinero',
    description: 'Diseño y mantenimiento de jardines',
    price_range: '$25-40/hora',
    location: 'Yanuncay, Cuenca',
    city: 'Cuenca',
    phone: '0989123456',
    rating: 4.9,
    reviews_count: 198,
    verified: true,
    experience_years: 11,
    available_24_7: false,
    response_time: '1día'
  },
  
  // Cerrajeros
  {
    business_name: 'Cerrajería 24/7 Cuenca',
    service_type: 'Cerrajero',
    description: 'Apertura de emergencia y cambio de cerraduras',
    price_range: '$30-60/servicio',
    location: 'Totoracocha, Cuenca',
    city: 'Cuenca',
    phone: '0988234567',
    rating: 4.8,
    reviews_count: 312,
    verified: true,
    experience_years: 14,
    available_24_7: true,
    response_time: '20min'
  },

  // Albañiles
  {
    business_name: 'Construcciones González',
    service_type: 'Albañil',
    description: 'Construcción y remodelación de viviendas',
    price_range: '$35-50/hora',
    location: 'San Sebastián, Cuenca',
    city: 'Cuenca',
    phone: '0987345678',
    rating: 4.7,
    reviews_count: 156,
    verified: true,
    experience_years: 18,
    available_24_7: false,
    response_time: '1día'
  },

  // Quito Providers
  {
    business_name: 'TecnoElectric Quito',
    service_type: 'Electricista',
    description: 'Instalaciones eléctricas industriales',
    price_range: '$40-70/hora',
    location: 'La Carolina, Quito',
    city: 'Quito',
    phone: '0986456789',
    rating: 4.9,
    reviews_count: 234,
    verified: true,
    experience_years: 15,
    available_24_7: true,
    response_time: '1hora'
  },
  {
    business_name: 'PlomerÍa Express Norte',
    service_type: 'Plomero',
    description: 'Servicio rápido en el norte de Quito',
    price_range: '$30-50/hora',
    location: 'Iñaquito, Quito',
    city: 'Quito',
    phone: '0985567890',
    rating: 4.6,
    reviews_count: 189,
    verified: true,
    experience_years: 9,
    available_24_7: true,
    response_time: '45min'
  },

  // Guayaquil Providers
  {
    business_name: 'Servicios del Puerto',
    service_type: 'Plomero',
    description: 'Plomería comercial y residencial',
    price_range: '$25-40/hora',
    location: 'Kennedy, Guayaquil',
    city: 'Guayaquil',
    phone: '0984678901',
    rating: 4.7,
    reviews_count: 267,
    verified: true,
    experience_years: 12,
    available_24_7: false,
    response_time: '1hora'
  },
  {
    business_name: 'Aire Fresco GYE',
    service_type: 'Aire Acondicionado',
    description: 'Instalación y mantenimiento de AC',
    price_range: '$35-60/hora',
    location: 'Urdesa, Guayaquil',
    city: 'Guayaquil',
    phone: '0983789012',
    rating: 4.8,
    reviews_count: 198,
    verified: true,
    experience_years: 10,
    available_24_7: true,
    response_time: '2horas'
  },

  // More Cuenca providers for variety
  {
    business_name: 'Gasfitería Profesional Cuenca',
    service_type: 'Plomero',
    description: 'Instalación de calentadores y sistemas de agua',
    price_range: '$28-45/hora',
    location: 'El Centro, Cuenca',
    city: 'Cuenca',
    phone: '0982890123',
    rating: 4.9,
    reviews_count: 445,
    verified: true,
    experience_years: 16,
    available_24_7: true,
    response_time: '30min'
  },
  {
    business_name: 'Mudanzas Seguras Ecuador',
    service_type: 'Mudanzas',
    description: 'Mudanzas locales y nacionales',
    price_range: '$50-100/hora',
    location: 'Yanuncay, Cuenca',
    city: 'Cuenca',
    phone: '0981901234',
    rating: 4.6,
    reviews_count: 123,
    verified: true,
    experience_years: 7,
    available_24_7: false,
    response_time: '1día'
  },
  {
    business_name: 'Control de Plagas Cuenca',
    service_type: 'Control de Plagas',
    description: 'Fumigación y control de plagas garantizado',
    price_range: '$40-80/servicio',
    location: 'Monay, Cuenca',
    city: 'Cuenca',
    phone: '0980012345',
    rating: 4.8,
    reviews_count: 89,
    verified: true,
    experience_years: 5,
    available_24_7: true,
    response_time: '3horas'
  },
  {
    business_name: 'Decoración & Diseño Interior',
    service_type: 'Decoración',
    description: 'Diseño de interiores y remodelación',
    price_range: '$50-100/hora',
    location: 'El Batán, Cuenca',
    city: 'Cuenca',
    phone: '0979123456',
    rating: 5.0,
    reviews_count: 67,
    verified: true,
    experience_years: 12,
    available_24_7: false,
    response_time: '2días'
  }
]

export async function POST() {
  try {
    console.log('🌱 Seeding providers...')
    
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
      providers: data
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