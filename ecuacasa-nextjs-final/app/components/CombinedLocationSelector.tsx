'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { MapPin } from 'lucide-react'

interface City {
  id: string
  name: string
  province: string
  is_primary: boolean
}

interface Neighborhood {
  id: string
  name: string
  city_id: string
  zone: string
  is_featured: boolean
}

interface LocationOption {
  value: string
  label: string
  city: string
  neighborhood?: string
  isCity: boolean
  isFeatured?: boolean
}

interface CombinedLocationSelectorProps {
  onLocationChange?: (location: string) => void
}

export default function CombinedLocationSelector({ onLocationChange }: CombinedLocationSelectorProps) {
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([])
  const [selectedLocation, setSelectedLocation] = useState('cuenca')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLocationOptions() {
      try {
        // For now, use hardcoded Cuenca neighborhoods since DB might be empty
        const options: LocationOption[] = []

        // Add "Todo Ecuador" option
        options.push({
          value: 'todo-ecuador',
          label: '🇪🇨 Todo Ecuador',
          city: 'todo-ecuador',
          isCity: true,
          isFeatured: true
        })

        // Add Cuenca city-wide option
        options.push({
          value: 'cuenca',
          label: '📍 Toda Cuenca',
          city: 'Cuenca',
          isCity: true,
          isFeatured: true
        })

        // Add Cuenca neighborhoods (hardcoded for now)
        const cuencaNeighborhoods = [
          'El Centro',
          'San Joaquín', 
          'Yanuncay',
          'San Sebastián',
          'Totoracocha',
          'Monay',
          'El Batán',
          'Ricaurte'
        ]

        cuencaNeighborhoods.forEach((neighborhood, index) => {
          options.push({
            value: `cuenca-${neighborhood.toLowerCase().replace(/ /g, '-')}-${index + 1}`,
            label: `Cuenca - ${neighborhood}`,
            city: 'Cuenca',
            neighborhood: neighborhood,
            isCity: false,
            isFeatured: false
          })
        })

        // Add other major cities with some neighborhoods
        const otherCitiesData = [
          {
            name: 'Quito',
            neighborhoods: ['Norte', 'Centro', 'Sur']
          },
          {
            name: 'Guayaquil', 
            neighborhoods: ['Centro', 'Norte', 'Urdesa']
          },
          {
            name: 'Ambato',
            neighborhoods: ['Centro', 'La Matriz', 'Huachi']
          },
          {
            name: 'Loja',
            neighborhoods: ['Centro', 'La Banda', 'Clodoveo']
          }
        ]

        otherCitiesData.forEach(cityData => {
          // Add city-wide option
          options.push({
            value: cityData.name.toLowerCase(),
            label: `📍 Toda ${cityData.name}`,
            city: cityData.name,
            isCity: true,
            isFeatured: false
          })

          // Add neighborhoods for each city
          cityData.neighborhoods.forEach((neighborhood, index) => {
            options.push({
              value: `${cityData.name.toLowerCase()}-${neighborhood.toLowerCase().replace(/ /g, '-')}-${index + 10}`,
              label: `${cityData.name} - ${neighborhood}`,
              city: cityData.name,
              neighborhood: neighborhood,
              isCity: false,
              isFeatured: false
            })
          })
        })

        setLocationOptions(options)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching locations:', error)
        setLoading(false)
      }
    }

    fetchLocationOptions()
  }, [])

  // Notify parent component of changes
  useEffect(() => {
    if (onLocationChange) {
      onLocationChange(selectedLocation)
    }
  }, [selectedLocation, onLocationChange])

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value)
  }

  if (loading) {
    return (
      <select className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-500 w-64 text-base">
        <option>Cargando ubicaciones...</option>
      </select>
    )
  }

  return (
    <div className="relative">
      <select 
        className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 hover:border-purple-400 transition-colors w-64 max-w-64 text-base truncate appearance-none cursor-pointer"
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        {locationOptions.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            className={`truncate ${option.isFeatured ? 'font-semibold' : ''}`}
          >
            {option.isFeatured && option.isCity ? '⭐ ' : ''}
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown icon */}
      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}