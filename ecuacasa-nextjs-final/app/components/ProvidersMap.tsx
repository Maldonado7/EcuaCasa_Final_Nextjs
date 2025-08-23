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
  const markersRef = useRef<google.maps.Marker[]>([])

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

  // Clear existing markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      try {
        marker.setMap(null)
      } catch (error) {
        console.error('Error clearing marker:', error)
      }
    })
    markersRef.current = []
  }

  // Add markers for providers
  useEffect(() => {
    if (!map || !providers.length) {
      clearMarkers()
      return
    }

    try {
      // Clear existing markers first
      clearMarkers()

      // Create new markers
      providers.forEach((provider, index) => {
        try {
          const position = getProviderCoordinates(provider.location, index)
          
          const marker = new google.maps.Marker({
            position,
            map,
            title: provider.name || 'Profesional',
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#7c3aed" stroke="white" stroke-width="2"/>
                  <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
                    ${(provider.name || 'P').charAt(0).toUpperCase()}
                  </text>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32)
            }
          })

          marker.addListener('click', () => {
            try {
              const content = `
                <div style="max-width: 250px; padding: 12px;">
                  <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">
                    ${provider.name || 'Profesional'}
                  </h3>
                  <p style="margin: 0 0 8px 0; color: #7c3aed; font-weight: 600; font-size: 14px;">
                    ${provider.service_type || 'Servicio'}
                  </p>
                  <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                    📍 ${provider.location || 'Cuenca'}
                  </p>
                  <div style="display: flex; align-items: center; gap: 4px; margin: 8px 0;">
                    <span style="color: #fbbf24;">⭐</span>
                    <span style="font-weight: bold; font-size: 14px;">${provider.rating || '5.0'}</span>
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
                      width: 100%;
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

              // Call onProviderSelect if provided
              if (onProviderSelect) {
                onProviderSelect(provider)
              }
            } catch (error) {
              console.error('Error handling marker click:', error)
            }
          })

          // Store marker for cleanup
          markersRef.current.push(marker)
        } catch (error) {
          console.error('Error creating marker for provider:', provider.name, error)
        }
      })
    } catch (error) {
      console.error('Error in markers useEffect:', error)
    }

    // Cleanup function
    return () => {
      clearMarkers()
    }
  }, [map, providers, infoWindow, onProviderSelect])

  return <div ref={ref} className="w-full h-full min-h-[600px] rounded-2xl" />
}

// Error boundary for Google Maps
function MapErrorBoundary({ children, providers }: { children: React.ReactNode, providers: Provider[] }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check for Google Maps API errors and IntersectionObserver errors
      const message = event.message || ''
      if (message.includes('RefererNotAllowedMapError') || 
          message.includes('Google Maps') ||
          message.includes('maps.googleapis.com') ||
          message.includes('IntersectionObserver') ||
          message.includes('observe') ||
          message.includes('marker') ||
          message.includes('Failed to execute')) {
        console.warn('Map error detected, switching to fallback:', message)
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
function MapFallback({ providers = [] }: { providers: Provider[] }) {
  // Ensure providers is always an array
  const safeProviders = Array.isArray(providers) ? providers : []
  
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🗺️</div>
            <div>
              <h3 className="font-bold text-lg">Ubicaciones de Profesionales</h3>
              <p className="text-purple-100 text-sm">Cuenca, Ecuador - {safeProviders.length} profesionales</p>
            </div>
          </div>
        </div>

        {/* Providers List */}
        <div className="flex-1 p-4 overflow-y-auto">
          {safeProviders.length > 0 ? (
            <div className="grid gap-3">
              {safeProviders.slice(0, 8).map((provider, index) => (
              <div 
                key={provider.id} 
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/providers/${provider.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {provider.name?.charAt(0)?.toUpperCase() || 'P'}
                      </div>
                      <h4 className="font-semibold text-gray-900">{provider.name || 'Profesional'}</h4>
                    </div>
                    <p className="text-purple-600 font-medium text-sm mb-1">{provider.service_type || 'Servicio'}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        📍 {provider.location || 'Cuenca'}
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {provider.rating || '5.0'}
                      </span>
                    </div>
                  </div>
                  <button className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
            
            {safeProviders.length > 8 && (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">
                  y {safeProviders.length - 8} profesionales más...
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
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No hay profesionales disponibles</h3>
              <p className="text-gray-600 mb-4">No se encontraron profesionales en esta área</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Volver al Inicio
              </button>
            </div>
          )}
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
export default function ProvidersMap({ providers = [], onProviderSelect }: ProvidersMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Ensure providers is always an array
  const safeProviders = Array.isArray(providers) ? providers : []

  // If no API key or no providers, show fallback immediately
  if (!apiKey || safeProviders.length === 0) {
    return <MapFallback providers={safeProviders} />
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
      'ecuacasa-nextjs-final.vercel.app',
      'github.dev',
      'codespaces'
    ]
    
    // For development, check if it's a known development pattern
    const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1'
    const isVercelPreview = hostname.includes('vercel.app')
    const isGitHubCodespaces = hostname.includes('github.dev') || hostname.includes('codespaces')
    
    // Allow localhost, codespaces and official domains
    return authorizedDomains.some(domain => hostname.includes(domain)) || isLocalDev || isGitHubCodespaces
  }

  // If not on authorized domain, log warning but try to load anyway for development
  if (typeof window !== 'undefined' && !isAuthorizedDomain()) {
    console.warn('Domain may not be authorized for Google Maps API. If map fails to load, the fallback will be shown.')
    // Don't return fallback immediately - let error boundary handle it
  }

  // Try to load Google Maps, fallback on error
  return (
    <MapErrorBoundary providers={safeProviders}>
      <Wrapper 
        apiKey={apiKey} 
        libraries={['places']}
        version="weekly"
        language="es"
        region="EC"
      >
        <MapComponent providers={safeProviders} onProviderSelect={onProviderSelect} />
      </Wrapper>
    </MapErrorBoundary>
  )
}