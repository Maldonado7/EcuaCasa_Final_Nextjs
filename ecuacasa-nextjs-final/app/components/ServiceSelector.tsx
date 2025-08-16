'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useTranslation } from '../context/TranslationContext'
import { Wrench } from 'lucide-react'

interface Service {
  id: string
  name: string
  category: string
  description?: string
}

interface ServiceSelectorProps {
  onServiceChange?: (service: string) => void
  placeholder?: string
}

export default function ServiceSelector({ onServiceChange, placeholder }: ServiceSelectorProps) {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState('')
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  // Fetch services from Supabase - only main categories
  useEffect(() => {
    async function fetchServices() {
      try {
        // Get only main service categories, not all specific services
        const mainServices = [
          { id: '1', name: 'Plomería', category: 'Hogar' },
          { id: '2', name: 'Electricidad', category: 'Hogar' },
          { id: '3', name: 'Carpintería', category: 'Hogar' },
          { id: '4', name: 'Pintura', category: 'Hogar' },
          { id: '5', name: 'Limpieza', category: 'Hogar' },
          { id: '6', name: 'Jardinería', category: 'Exterior' },
          { id: '7', name: 'Cerrajería', category: 'Seguridad' },
          { id: '8', name: 'Albañilería', category: 'Construcción' }
        ]

        setServices(mainServices)
        setLoading(false)
      } catch (error) {
        console.error('Error setting services:', error)
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Notify parent component of changes
  useEffect(() => {
    if (onServiceChange) {
      onServiceChange(selectedService)
    }
  }, [selectedService, onServiceChange])

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value)
  }

  if (loading) {
    return (
      <select className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-500 w-64 text-base">
        <option>Cargando servicios...</option>
      </select>
    )
  }

  return (
    <div className="relative">
      <select 
        className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 hover:border-purple-400 transition-colors w-64 max-w-64 text-base truncate appearance-none cursor-pointer"
        value={selectedService}
        onChange={handleServiceChange}
      >
        <option value="">🔧 {placeholder || 'Todos los servicios'}</option>
        {services.map(service => (
          <option key={service.id} value={service.name.toLowerCase()} className="truncate">
            {service.name}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown icon */}
      <Wrench className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}