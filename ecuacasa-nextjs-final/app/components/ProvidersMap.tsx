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

// Main wrapper component
export default function ProvidersMap({ providers, onProviderSelect }: ProvidersMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="text-gray-600">Google Maps API key required</p>
        </div>
      </div>
    )
  }

  return (
    <Wrapper apiKey={apiKey} libraries={['places']}>
      <MapComponent providers={providers} onProviderSelect={onProviderSelect} />
    </Wrapper>
  )
}