// Ecuador locations with real coordinates for Cuenca neighborhoods
export interface LocationCoordinates {
  name: string
  lat: number
  lng: number
  providers?: number
}

// Cuenca neighborhoods with real coordinates
export const CUENCA_LOCATIONS: LocationCoordinates[] = [
  {
    name: 'El Centro',
    lat: -2.8973,
    lng: -79.0067,
    providers: 8
  },
  {
    name: 'San Joaquín',
    lat: -2.8756,
    lng: -79.0234,
    providers: 6
  },
  {
    name: 'Yanuncay',
    lat: -2.8912,
    lng: -79.0345,
    providers: 5
  },
  {
    name: 'San Sebastián',
    lat: -2.9123,
    lng: -78.9876,
    providers: 7
  },
  {
    name: 'Totoracocha',
    lat: -2.8654,
    lng: -79.0123,
    providers: 4
  },
  {
    name: 'Monay',
    lat: -2.8834,
    lng: -79.0456,
    providers: 3
  },
  {
    name: 'El Batán',
    lat: -2.9045,
    lng: -78.9967,
    providers: 5
  },
  {
    name: 'Ricaurte',
    lat: -2.8567,
    lng: -78.9834,
    providers: 4
  }
]

// Main Ecuador cities
export const ECUADOR_CITIES: LocationCoordinates[] = [
  {
    name: 'Cuenca',
    lat: -2.8973,
    lng: -79.0067,
    providers: 42
  },
  {
    name: 'Quito',
    lat: -0.1807,
    lng: -78.4678,
    providers: 156
  },
  {
    name: 'Guayaquil',
    lat: -2.1962,
    lng: -79.8862,
    providers: 203
  },
  {
    name: 'Ambato',
    lat: -1.2490,
    lng: -78.6067,
    providers: 34
  },
  {
    name: 'Loja',
    lat: -3.9928,
    lng: -79.2042,
    providers: 28
  }
]

// Get coordinates for a location name
export function getLocationCoordinates(locationName: string): LocationCoordinates | null {
  const allLocations = [...CUENCA_LOCATIONS, ...ECUADOR_CITIES]
  return allLocations.find(loc => 
    loc.name.toLowerCase().includes(locationName.toLowerCase()) ||
    locationName.toLowerCase().includes(loc.name.toLowerCase())
  ) || null
}

// Get nearby locations within radius (km)
export function getNearbyLocations(lat: number, lng: number, radiusKm: number = 10): LocationCoordinates[] {
  const allLocations = [...CUENCA_LOCATIONS, ...ECUADOR_CITIES]
  
  return allLocations.filter(location => {
    const distance = calculateDistance(lat, lng, location.lat, location.lng)
    return distance <= radiusKm
  })
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}