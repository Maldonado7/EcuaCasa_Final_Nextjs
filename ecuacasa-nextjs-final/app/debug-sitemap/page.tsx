export default function DebugSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ecuacasa.com'
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Debug Sitemap Configuration</h1>
      <p><strong>process.env.NEXT_PUBLIC_APP_URL:</strong> {process.env.NEXT_PUBLIC_APP_URL || 'undefined'}</p>
      <p><strong>Resolved baseUrl:</strong> {baseUrl}</p>
      <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
    </div>
  )
}