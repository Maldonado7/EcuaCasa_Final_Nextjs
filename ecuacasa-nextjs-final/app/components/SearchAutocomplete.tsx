'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useTranslation } from '../context/TranslationContext'
import { Search, Wrench } from 'lucide-react'

interface Service {
  id: string
  name: string
  category: string
  description?: string
}

interface SearchAutocompleteProps {
  placeholder?: string
  onServiceSelect?: (service: string) => void
}

export default function SearchAutocomplete({ placeholder, onServiceSelect }: SearchAutocompleteProps) {
  const [services, setServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Service[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch services from Supabase
  useEffect(() => {
    async function fetchServices() {
      try {
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .order('name')

        if (servicesData) {
          console.log('Services loaded:', servicesData.length, servicesData.slice(0, 3))
          setServices(servicesData)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching services:', error)
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Filter suggestions based on search term
  useEffect(() => {
    console.log('Search:', searchTerm, 'Services count:', services.length)
    if (searchTerm.length >= 2) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5) // Limit to 5 suggestions

      console.log('Filtered results:', filtered.length, filtered)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
      setActiveSuggestion(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm, services])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSuggestionClick = (service: Service) => {
    setSearchTerm(service.name)
    setShowSuggestions(false)
    if (onServiceSelect) {
      onServiceSelect(service.name)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setActiveSuggestion(-1)
        break
    }
  }

  const handleFocus = () => {
    if (searchTerm.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleBlur = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Delay hiding suggestions to allow for clicks
    timeoutRef.current = setTimeout(() => {
      setShowSuggestions(false)
      setActiveSuggestion(-1)
    }, 200)
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-purple-100 text-purple-700 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div className="relative flex-1">
      <div className="flex items-center px-4">
        <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || t('hero.search.placeholder')}
          className="flex-1 py-4 bg-transparent placeholder-gray-500 focus:outline-none text-lg min-w-0"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={loading}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[60] max-h-80 overflow-y-auto"
          style={{ zIndex: 60 }}
        >
          {suggestions.map((service, index) => (
            <div
              key={service.id}
              className={`p-4 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                index === activeSuggestion 
                  ? 'bg-purple-50 border-purple-200' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSuggestionClick(service)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {highlightMatch(service.name, searchTerm)}
                  </div>
                  {service.category && (
                    <div className="text-sm text-gray-500 truncate">
                      {service.category}
                    </div>
                  )}
                </div>
                <div className="text-xs text-purple-600 font-medium whitespace-nowrap">
                  {Math.floor(Math.random() * 50) + 10}+ pros
                </div>
              </div>
            </div>
          ))}
          
          {/* No results */}
          {searchTerm.length >= 2 && suggestions.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <div className="text-sm">
                No se encontraron servicios para "{searchTerm}"
              </div>
              <div className="text-xs mt-1 text-gray-400">
                Intenta con otros términos como "plomero", "electricista", etc.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}