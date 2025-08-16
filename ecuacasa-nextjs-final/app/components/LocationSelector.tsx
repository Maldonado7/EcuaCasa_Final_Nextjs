'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

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

interface LocationSelectorProps {
  onLocationChange?: (city: string, neighborhood: string) => void
}

export default function LocationSelector({ onLocationChange }: LocationSelectorProps) {
  const [cities, setCities] = useState<City[]>([])
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [selectedLocation, setSelectedLocation] = useState('cuenca-centro')
  const [loading, setLoading] = useState(true)

  // Fetch cities and neighborhoods
  useEffect(() => {
    async function fetchLocations() {
      try {
        // Fetch cities
        const { data: citiesData } = await supabase
          .from('cities')
          .select('*')
          .order('is_primary', { ascending: false })
          .order('name')

        if (citiesData) {
          setCities(citiesData)
        }

        // Fetch all neighborhoods initially (for Cuenca - the default)
        const cuencaCity = citiesData?.find(c => c.name === 'Cuenca')
        if (cuencaCity) {
          const { data: neighborhoodsData } = await supabase
            .from('neighborhoods')
            .select('*')
            .eq('city_id', cuencaCity.id)
            .order('is_featured', { ascending: false })
            .order('name')

          if (neighborhoodsData) {
            setNeighborhoods(neighborhoodsData)
          }
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching locations:', error)
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  // Update neighborhoods when city changes
  useEffect(() => {
    async function updateNeighborhoods() {
      if (selectedCity === 'todo-ecuador') {
        setNeighborhoods([])
        setSelectedNeighborhood('')
        return
      }

      const city = cities.find(c => c.name.toLowerCase() === selectedCity.toLowerCase())
      if (city) {
        const { data: neighborhoodsData } = await supabase
          .from('neighborhoods')
          .select('*')
          .eq('city_id', city.id)
          .order('is_featured', { ascending: false })
          .order('name')

        if (neighborhoodsData) {
          setNeighborhoods(neighborhoodsData)
          setSelectedNeighborhood('') // Reset neighborhood selection
        }
      }
    }

    if (cities.length > 0 && selectedCity !== 'cuenca') {
      updateNeighborhoods()
    }
  }, [selectedCity, cities])

  // Notify parent component of changes (if callback provided)
  useEffect(() => {
    if (onLocationChange) {
      onLocationChange(selectedCity, selectedNeighborhood)
    }
  }, [selectedCity, selectedNeighborhood, onLocationChange])

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value)
  }

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNeighborhood(e.target.value)
  }

  const getNeighborhoodPlaceholder = () => {
    if (selectedCity === 'todo-ecuador') return 'Todo Ecuador'
    const cityName = cities.find(c => c.name.toLowerCase() === selectedCity.toLowerCase())?.name || 'la ciudad'
    return `Toda ${cityName}`
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-500 w-36 text-sm">
          Cargando...
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-500 w-40 text-sm">
          Cargando...
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* City Selector */}
      <select 
        className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 hover:border-purple-400 transition-colors w-36 max-w-36 text-sm truncate"
        value={selectedCity}
        onChange={handleCityChange}
      >
        <option value="todo-ecuador">🇪🇨 Todo Ecuador</option>
        {cities.map(city => (
          <option key={city.id} value={city.name.toLowerCase()} className="truncate">
            {city.is_primary ? '📍 ' : ''}{city.name}
          </option>
        ))}
      </select>
      
      {/* Neighborhood Selector */}
      <select 
        className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-700 hover:border-purple-400 transition-colors w-40 max-w-40 text-sm truncate"
        value={selectedNeighborhood}
        onChange={handleNeighborhoodChange}
        disabled={selectedCity === 'todo-ecuador'}
      >
        <option value="" className="truncate">{getNeighborhoodPlaceholder()}</option>
        {neighborhoods.map(neighborhood => (
          <option key={neighborhood.id} value={neighborhood.name.toLowerCase().replace(' ', '-')} className="truncate">
            {neighborhood.is_featured ? '⭐ ' : ''}{neighborhood.name}
          </option>
        ))}
      </select>
    </div>
  )
}