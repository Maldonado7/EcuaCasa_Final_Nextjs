'use client'

import { useEffect, useRef, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { getLocationCoordinates } from '../lib/ecuadorLocations'

interface Provider {
  id: string
  name: string
  service_type: string
  location: string
  rating: number
  description?: string
}

interface ProviderLocationMapProps {
  provider: Provider
}

// Map component that renders the actual Google Map for a single provider
function SingleProviderMapComponent({ provider }: ProviderLocationMapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  // Cuenca coordinates (fallback)
  const cuencaCenter = { lat: -2.9005, lng: -79.0067 }

  // Get provider's specific coordinates
  const getProviderCoordinates = () => {
    const realCoords = getLocationCoordinates(provider.location)
    return realCoords 
      ? { lat: realCoords.lat, lng: realCoords.lng }
      : cuencaCenter
  }

  // Initialize map
  useEffect(() => {
    if (ref.current && !map) {
      const providerCoords = getProviderCoordinates()
      
      const newMap = new google.maps.Map(ref.current, {
        center: providerCoords,
        zoom: 15, // Closer zoom for single provider
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      })
      setMap(newMap)

      // Add marker for the provider
      const marker = new google.maps.Marker({
        position: providerCoords,
        map: newMap,
        title: `${provider.name} - ${provider.service_type}`,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" fill="#7c3aed" stroke="white" stroke-width="3"/>
              <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">
                ${(provider.name || 'P').charAt(0).toUpperCase()}
              </text>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40)
        }
      })

      // Info window for the marker
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="max-width: 300px; padding: 16px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px; font-weight: bold;">
              ${provider.name || 'Profesional'}
            </h3>
            <p style="margin: 0 0 8px 0; color: #7c3aed; font-weight: 600; font-size: 16px;">
              ${provider.service_type || 'Servicio'}
            </p>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
              📍 ${provider.location || 'Cuenca'}, Cuenca
            </p>
            <div style="display: flex; align-items: center; gap: 4px; margin: 8px 0;">
              <span style="color: #fbbf24; font-size: 16px;">⭐</span>
              <span style="font-weight: bold; font-size: 16px;">${provider.rating || '5.0'}</span>
              <span style="color: #6b7280; font-size: 14px;">estrellas</span>
            </div>
            ${provider.description ? `
              <p style="margin: 8px 0; color: #4b5563; font-size: 14px; line-height: 1.4;">
                ${provider.description.substring(0, 100)}${provider.description.length > 100 ? '...' : ''}
              </p>
            ` : ''}
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                📱 Contacta directamente con ${provider.name || 'este profesional'}
              </p>
            </div>
          </div>
        `
      })

      // Auto-open info window to show provider details
      infoWindow.open(newMap, marker)

      // Click listener to reopen info window if closed
      marker.addListener('click', () => {
        infoWindow.open(newMap, marker)
      })
    }
  }, [ref, map, provider])

  return <div ref={ref} className="w-full h-full min-h-[400px] rounded-2xl" />
}

// Fallback component when Google Maps fails
function SingleProviderMapFallback({ provider }: ProviderLocationMapProps) {
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              🗺️
            </div>
            <div>
              <h3 className="font-bold text-xl">Ubicación del Profesional</h3>
              <p className="text-purple-100">{provider.location}, Cuenca - Ecuador</p>
            </div>
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {provider.name.charAt(0).toUpperCase()}
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">{provider.name}</h4>
            <p className="text-purple-600 font-semibold text-lg mb-2">{provider.service_type}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">📍</span>
              <span className="text-gray-600 font-medium">{provider.location}, Cuenca</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="font-bold text-lg">{provider.rating}</span>
              <span className="text-gray-500">estrellas</span>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-blue-600">ℹ️</span>
                <p className="font-medium text-blue-800">Ubicación Verificada</p>
              </div>
              <p className="text-sm text-blue-600 text-center">
                Este profesional está ubicado en {provider.location}, Cuenca, Ecuador.
                El mapa interactivo se está cargando.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error boundary for single provider maps
function SingleProviderMapErrorBoundary({ children, provider }: { children: React.ReactNode, provider: Provider }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('RefererNotAllowedMapError') || 
          event.message?.includes('Google Maps') ||
          event.message?.includes('maps.googleapis.com')) {
        setHasError(true)
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener('error', handleError, true)
    
    return () => {
      window.removeEventListener('error', handleError, true)
    }
  }, [])

  if (hasError) {
    return <SingleProviderMapFallback provider={provider} />
  }

  return <>{children}</>
}

// Main component
export default function ProviderLocationMap({ provider }: ProviderLocationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // If no API key, show fallback
  if (!apiKey) {
    return <SingleProviderMapFallback provider={provider} />
  }

  // Check if authorized domain (same logic as main map)
  const isAuthorizedDomain = () => {
    if (typeof window === 'undefined') return false
    
    const hostname = window.location.hostname
    const authorizedDomains = [
      'localhost',
      'ecuacasa.com', 
      'www.ecuacasa.com',
      'ecuacasa-nextjs-final.vercel.app',
      'github.dev',
      'codespaces'
    ]
    
    const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1'
    const isCodespaces = hostname.includes('github.dev') || hostname.includes('codespaces')
    return authorizedDomains.some(domain => hostname.includes(domain)) || isLocalDev || isCodespaces
  }

  if (typeof window !== 'undefined' && !isAuthorizedDomain()) {
    console.warn('Domain may not be authorized for Google Maps API. If map fails to load, the fallback will be shown.')
    // Don't return fallback immediately - let error boundary handle it
  }

  return (
    <SingleProviderMapErrorBoundary provider={provider}>
      <Wrapper 
        apiKey={apiKey} 
        libraries={['places']}
        version="weekly"
        language="es"
        region="EC"
      >
        <SingleProviderMapComponent provider={provider} />
      </Wrapper>
    </SingleProviderMapErrorBoundary>
  )
}