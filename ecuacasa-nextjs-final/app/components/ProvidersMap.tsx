'use client'

import { useEffect, useRef, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { CUENCA_LOCATIONS, getLocationCoordinates } from '../lib/ecuadorLocations'

interface Provider {
  id: string
  name: string
  service_type: string
  location: string
  rating: number
  description?: string
}

interface ProvidersMapProps {
  providers: Provider[]
  onProviderSelect?: (provider: Provider) => void
}

// Map component that renders the actual Google Map
function MapComponent({ providers, onProviderSelect }: ProvidersMapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>()

  // Cuenca coordinates
  const cuencaCenter = { lat: -2.9005, lng: -79.0067 }

  // Get real provider coordinates using Ecuador locations data
  const getProviderCoordinates = (location: string, index: number = 0) => {
    // Try to get coordinates from our real data
    const realCoords = getLocationCoordinates(location)
    
    let coords = realCoords 
      ? { lat: realCoords.lat, lng: realCoords.lng }
      : cuencaCenter // Fallback to Cuenca center
    
    // Add small offset to prevent exact overlap when multiple providers in same area
    const offset = 0.001
    coords = {
      lat: coords.lat + (Math.random() - 0.5) * offset,
      lng: coords.lng + (Math.random() - 0.5) * offset
    }
    
    return coords
  }

  // Initialize map
  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center: cuencaCenter,
        zoom: 13, // Focused on Cuenca city
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })
      setMap(newMap)

      const newInfoWindow = new google.maps.InfoWindow()
      setInfoWindow(newInfoWindow)
    }
  }, [ref, map])

  // Add markers for providers
  useEffect(() => {
    if (map && providers.length > 0) {
      // Clear existing markers
      providers.forEach((provider, index) => {
        const position = getProviderCoordinates(provider.location, index)
        
        const marker = new google.maps.Marker({
          position,
          map,
          title: provider.name,
          icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#7c3aed" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
                  ${provider.name.charAt(0).toUpperCase()}
                </text>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          }
        })

        marker.addListener('click', () => {
          const content = `
            <div style="max-width: 250px; padding: 12px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">
                ${provider.name}
              </h3>
              <p style="margin: 0 0 8px 0; color: #7c3aed; font-weight: 600; font-size: 14px;">
                ${provider.service_type}
              </p>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                📍 ${provider.location}
              </p>
              <div style="display: flex; align-items: center; gap: 4px; margin: 8px 0;">
                <span style="color: #fbbf24;">⭐</span>
                <span style="font-weight: bold; font-size: 14px;">${provider.rating}</span>
              </div>
              <button 
                onclick="window.location.href='/providers/${provider.id}'"
                style="
                  background: #7c3aed; 
                  color: white; 
                  border: none; 
                  padding: 8px 16px; 
                  border-radius: 8px; 
                  font-weight: 600; 
                  cursor: pointer;
                  font-size: 12px;
                  margin-top: 8px;
                "
              >
                Ver Perfil
              </button>
            </div>
          `
          
          if (infoWindow) {
            infoWindow.setContent(content)
            infoWindow.open(map, marker)
          }
        })
      })
    }
  }, [map, providers, infoWindow])

  return <div ref={ref} className="w-full h-full min-h-[600px] rounded-2xl" />
}

// Error boundary for Google Maps
function MapErrorBoundary({ children, providers }: { children: React.ReactNode, providers: Provider[] }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check for Google Maps API errors
      if (event.message?.includes('RefererNotAllowedMapError') || 
          event.message?.includes('Google Maps') ||
          event.message?.includes('maps.googleapis.com')) {
        setHasError(true)
        event.preventDefault()
        event.stopPropagation()
      }
    }

    // Suppress console errors for Google Maps
    const originalError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes('Google Maps JavaScript API error') || 
          message.includes('RefererNotAllowedMapError') ||
          message.includes('maps.googleapis.com')) {
        setHasError(true)
        // Don't log the error, just set the fallback state
        return
      }
      originalError.apply(console, args)
    }

    window.addEventListener('error', handleError, true)
    
    return () => {
      window.removeEventListener('error', handleError, true)
      console.error = originalError
    }
  }, [])

  if (hasError) {
    return <MapFallback providers={providers} />
  }

  return <>{children}</>
}

// Fallback component when Google Maps fails
function MapFallback({ providers }: { providers: Provider[] }) {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🗺️</div>
            <div>
              <h3 className="font-bold text-lg">Ubicaciones de Profesionales</h3>
              <p className="text-purple-100 text-sm">Cuenca, Ecuador - {providers.length} profesionales</p>
            </div>
          </div>
        </div>

        {/* Providers List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid gap-3">
            {providers.slice(0, 8).map((provider, index) => (
              <div 
                key={provider.id} 
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/providers/${provider.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {provider.name.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                    </div>
                    <p className="text-purple-600 font-medium text-sm mb-1">{provider.service_type}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        📍 {provider.location}
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {provider.rating}
                      </span>
                    </div>
                  </div>
                  <button className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
            
            {providers.length > 8 && (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">
                  y {providers.length - 8} profesionales más...
                </p>
                <button 
                  onClick={() => window.location.href = '/providers'}
                  className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Ver Todos
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-50 p-4 text-center border-t border-blue-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-blue-600">ℹ️</div>
            <p className="text-sm font-medium text-blue-800">Vista de Lista Activa</p>
          </div>
          <p className="text-xs text-blue-600">
            Mapa interactivo configurándose • Todas las ubicaciones están en Cuenca, Ecuador
          </p>
          <p className="text-xs text-blue-500 mt-1">
            Haz clic en cualquier profesional para ver su perfil completo y ubicación detallada
          </p>
        </div>
      </div>
    </div>
  )
}

// Main wrapper component
export default function ProvidersMap({ providers, onProviderSelect }: ProvidersMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // If no API key, show fallback immediately
  if (!apiKey) {
    return <MapFallback providers={providers} />
  }

  // Check if we're on an authorized domain for Google Maps
  const isAuthorizedDomain = () => {
    if (typeof window === 'undefined') return false
    
    const hostname = window.location.hostname
    
    // Known authorized domains for the API key
    const authorizedDomains = [
      'localhost',
      'ecuacasa.com',
      'www.ecuacasa.com',
      'ecuacasa-nextjs-final.vercel.app'
    ]
    
    // For development, check if it's a known development pattern
    const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1'
    const isVercelPreview = hostname.includes('vercel.app')
    const isGitHubCodespaces = hostname.includes('github.dev')
    
    // Only allow localhost and official domains
    return authorizedDomains.some(domain => hostname.includes(domain)) || isLocalDev
  }

  // If not on authorized domain, show fallback immediately to prevent API error
  if (typeof window !== 'undefined' && !isAuthorizedDomain()) {
    console.log('Domain not authorized for Google Maps, showing fallback')
    return <MapFallback providers={providers} />
  }

  // Try to load Google Maps, fallback on error
  return (
    <MapErrorBoundary providers={providers}>
      <Wrapper 
        apiKey={apiKey} 
        libraries={['places']}
        version="3.55"
        language="es"
        region="EC"
      >
        <MapComponent providers={providers} onProviderSelect={onProviderSelect} />
      </Wrapper>
    </MapErrorBoundary>
  )
}