import { supabase } from '@/lib/supabase'
import TranslatedProvidersPage from '../components/TranslatedProvidersPage'

// Fetch providers from Supabase
async function getProviders() {
  try {
    const { data } = await supabase
      .from('providers')
      .select('*')
      .order('rating', { ascending: false })
    
    // If no providers in database, return sample data
    if (!data || data.length === 0) {
      return [
        {
          id: '1',
          name: 'Carlos Mendoza',
          service_type: 'Plomero Master',
          location: 'El Centro',
          rating: 5.0,
          description: 'Especialista en plomería residencial y comercial'
        },
        {
          id: '2',
          name: 'María Elena Rodríguez',
          service_type: 'Electricista Certificada',
          location: 'San Joaquín',
          rating: 4.9,
          description: 'Electricista certificada con 6 años de experiencia'
        },
        {
          id: '3',
          name: 'Luis Fernando García',
          service_type: 'Carpintero Artesanal',
          location: 'Yanuncay',
          rating: 4.8,
          description: 'Carpintero especializado en muebles a medida'
        },
        {
          id: '4',
          name: 'Ana Patricia Silva',
          service_type: 'Pintora Profesional',
          location: 'San Sebastián',
          rating: 4.9,
          description: 'Pintora con especialización en pintura decorativa'
        },
        {
          id: '5',
          name: 'Jorge Alberto Vega',
          service_type: 'Jardinero Paisajista',
          location: 'Totoracocha',
          rating: 4.7,
          description: 'Jardinero paisajista con diseño de jardines'
        },
        {
          id: '6',
          name: 'Rosa María Vera',
          service_type: 'Limpieza Premium',
          location: 'Monay',
          rating: 4.8,
          description: 'Servicio de limpieza premium y profesional'
        },
        {
          id: '7',
          name: 'Miguel Ángel Torres',
          service_type: 'Cerrajero 24/7',
          location: 'El Batán',
          rating: 4.9,
          description: 'Cerrajero disponible las 24 horas'
        },
        {
          id: '8',
          name: 'Carmen Lucía Ordóñez',
          service_type: 'Albañil Especialista',
          location: 'Ricaurte',
          rating: 4.6,
          description: 'Albañil especializada en construcción residencial'
        },
        {
          id: '9',
          name: 'Pedro José Maldonado',
          service_type: 'Gasfitero Certificado',
          location: 'Quito Norte',
          rating: 4.7,
          description: 'Gasfitero certificado para instalaciones de gas'
        },
        {
          id: '10',
          name: 'Diana Carolina Flores',
          service_type: 'Diseñadora de Interiores',
          location: 'Guayaquil Centro',
          rating: 4.8,
          description: 'Diseñadora especializada en espacios residenciales'
        },
        {
          id: '11',
          name: 'Roberto Andrés Jiménez',
          service_type: 'Técnico en Aires',
          location: 'Ambato Centro',
          rating: 4.5,
          description: 'Técnico especializado en aire acondicionado'
        },
        {
          id: '12',
          name: 'Sofía Valentina Herrera',
          service_type: 'Organizadora Profesional',
          location: 'Loja Centro',
          rating: 4.9,
          description: 'Especialista en organización de espacios'
        }
      ]
    }
    
    return data
  } catch (error) {
    console.error('Error fetching providers:', error)
    return []
  }
}


export default async function ProvidersPage() {
  const providers = await getProviders()

  return <TranslatedProvidersPage providers={providers} />
}