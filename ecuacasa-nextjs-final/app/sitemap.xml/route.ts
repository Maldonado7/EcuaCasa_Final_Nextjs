import { NextResponse } from 'next/server'

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
    return c;
  });
}

export async function GET() {
  const baseUrl = 'https://www.ecuacasa.com'
  const lastMod = new Date().toISOString()

  // Main pages
  const routes = [
    { url: baseUrl, priority: 1.0, changefreq: 'daily' },
    { url: `${baseUrl}/providers`, priority: 0.9, changefreq: 'daily' },
    { url: `${baseUrl}/services`, priority: 0.8, changefreq: 'weekly' },
    { url: `${baseUrl}/how`, priority: 0.7, changefreq: 'monthly' },
    { url: `${baseUrl}/providers/register`, priority: 0.7, changefreq: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.6, changefreq: 'monthly' },
    { url: `${baseUrl}/privacy`, priority: 0.3, changefreq: 'yearly' },
    { url: `${baseUrl}/terms`, priority: 0.3, changefreq: 'yearly' },
  ]

  // Service-specific pages
  const services = [
    'plomería', 'electricidad', 'carpintería', 'pintura', 
    'limpieza', 'jardinería', 'cerrajería', 'albañilería'
  ]

  const serviceRoutes = services.map(service => ({
    url: `${baseUrl}/providers?service=${encodeURIComponent(service.trim())}&location=cuenca`,
    priority: 0.8,
    changefreq: 'daily'
  }))

  // Location-specific pages
  const cuencaLocations = [
    'cuenca-el-centro-123', 'cuenca-san-joaquín-124', 'cuenca-yanuncay-125',
    'cuenca-san-sebastián-126', 'cuenca-totoracocha-127', 'cuenca-monay-128',
    'cuenca-el-batán-129', 'cuenca-ricaurte-130'
  ]

  const locationRoutes = cuencaLocations.map(location => ({
    url: `${baseUrl}/providers?location=${location}`,
    priority: 0.7,
    changefreq: 'daily'
  }))

  // Individual provider pages
  const providerRoutes = Array.from({ length: 50 }, (_, i) => ({
    url: `${baseUrl}/providers/${i + 1}`,
    priority: 0.6,
    changefreq: 'weekly'
  }))

  // Combined service + location pages
  const combinedRoutes = [
    { service: 'plomería', location: 'cuenca-el-centro-123' },
    { service: 'electricidad', location: 'cuenca-san-joaquín-124' },
    { service: 'carpintería', location: 'cuenca-yanuncay-125' },
    { service: 'pintura', location: 'cuenca-san-sebastián-126' },
    { service: 'limpieza', location: 'cuenca-totoracocha-127' },
    { service: 'jardinería', location: 'cuenca-monay-128' },
    { service: 'cerrajería', location: 'cuenca-el-batán-129' },
    { service: 'albañilería', location: 'cuenca-ricaurte-130' },
  ].map(({ service, location }) => ({
    url: `${baseUrl}/providers?service=${encodeURIComponent(service.trim())}&location=${location}`,
    priority: 0.7,
    changefreq: 'daily'
  }))

  const allRoutes = [
    ...routes,
    ...serviceRoutes,
    ...locationRoutes,
    ...providerRoutes,
    ...combinedRoutes,
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${escapeXml(route.url)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
}