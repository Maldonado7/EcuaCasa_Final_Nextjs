import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable or default to www version
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ecuacasa.com'
  
  // Ensure the base URL doesn't have trailing slashes or line breaks
  const cleanBaseUrl = baseUrl.trim().replace(/\/$/, '')
  
  // Main pages
  const routes = [
    {
      url: cleanBaseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${cleanBaseUrl}/providers`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${cleanBaseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${cleanBaseUrl}/how`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${cleanBaseUrl}/providers/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${cleanBaseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${cleanBaseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${cleanBaseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Service-specific pages
  const services = [
    'plomería', 'electricidad', 'carpintería', 'pintura', 
    'limpieza', 'jardinería', 'cerrajería', 'albañilería'
  ]

  const serviceRoutes = services.map(service => {
    const encodedService = encodeURIComponent(service.trim())
    return {
      url: `${cleanBaseUrl}/providers?service=${encodedService}&location=cuenca`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }
  })

  // Location-specific pages for Cuenca neighborhoods
  const cuencaLocations = [
    'cuenca-el-centro-123', 'cuenca-san-joaquín-124', 'cuenca-yanuncay-125',
    'cuenca-san-sebastián-126', 'cuenca-totoracocha-127', 'cuenca-monay-128',
    'cuenca-el-batán-129', 'cuenca-ricaurte-130'
  ]

  const locationRoutes = cuencaLocations.map(location => ({
    url: `${cleanBaseUrl}/providers?location=${location}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Individual provider pages (assuming we have providers with IDs 1-50)
  const providerRoutes = Array.from({ length: 50 }, (_, i) => ({
    url: `${cleanBaseUrl}/providers/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Combined service + location pages for better local SEO
  const combinedRoutes = [
    { service: 'plomería', location: 'cuenca-el-centro-123' },
    { service: 'electricidad', location: 'cuenca-san-joaquín-124' },
    { service: 'carpintería', location: 'cuenca-yanuncay-125' },
    { service: 'pintura', location: 'cuenca-san-sebastián-126' },
    { service: 'limpieza', location: 'cuenca-totoracocha-127' },
    { service: 'jardinería', location: 'cuenca-monay-128' },
    { service: 'cerrajería', location: 'cuenca-el-batán-129' },
    { service: 'albañilería', location: 'cuenca-ricaurte-130' },
  ].map(({ service, location }) => {
    const encodedService = encodeURIComponent(service.trim())
    const encodedLocation = location.trim()
    return {
      url: `${cleanBaseUrl}/providers?service=${encodedService}&location=${encodedLocation}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }
  })

  return [
    ...routes,
    ...serviceRoutes,
    ...locationRoutes,
    ...providerRoutes,
    ...combinedRoutes,
  ]
}