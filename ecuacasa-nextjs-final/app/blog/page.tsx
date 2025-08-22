import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Consejos y Guías para el Hogar | EcuaCasa',
  description: 'Consejos útiles, guías de mantenimiento y tips para el hogar. Aprende sobre plomería, electricidad, carpintería y más servicios domésticos en Ecuador.',
  keywords: 'consejos hogar, mantenimiento casa, guías plomería, tips electricidad, cuidado hogar Ecuador',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.ecuacasa.com/blog',
  },
  openGraph: {
    title: 'Blog - Consejos para el Hogar | EcuaCasa',
    description: 'Consejos útiles, guías de mantenimiento y tips para el hogar.',
    url: 'https://www.ecuacasa.com/blog',
    siteName: 'EcuaCasa',
    locale: 'es_EC',
    type: 'website',
  }
}

// Blog posts data (would typically come from CMS or database)
const blogPosts = [
  {
    id: 'como-elegir-plomero-cuenca',
    title: 'Cómo Elegir el Mejor Plomero en Cuenca: Guía Completa 2025',
    excerpt: 'Descubre los criterios esenciales para contratar un plomero confiable en Cuenca. Tips, precios y qué preguntar antes de contratar.',
    category: 'Plomería',
    date: '2025-01-15',
    readTime: '5 min',
    image: '/blog/plomero-cuenca.jpg',
    featured: true
  },
  {
    id: 'mantenimiento-electrico-hogar',
    title: '10 Consejos de Mantenimiento Eléctrico para tu Hogar',
    excerpt: 'Mantén tu sistema eléctrico seguro con estos consejos preventivos. Evita accidentes y ahorra dinero en reparaciones.',
    category: 'Electricidad',
    date: '2025-01-12',
    readTime: '7 min',
    image: '/blog/electricidad-hogar.jpg'
  },
  {
    id: 'precios-servicios-hogar-cuenca-2025',
    title: 'Precios de Servicios para el Hogar en Cuenca 2025',
    excerpt: 'Guía actualizada de precios para servicios domésticos en Cuenca. Plomería, electricidad, carpintería y más.',
    category: 'Precios',
    date: '2025-01-10',
    readTime: '6 min',
    image: '/blog/precios-servicios.jpg'
  },
  {
    id: 'carpinteria-muebles-medida',
    title: 'Ventajas de los Muebles a Medida vs Muebles Prefabricados',
    excerpt: 'Conoce los beneficios de invertir en muebles personalizados para tu hogar en Cuenca.',
    category: 'Carpintería',
    date: '2025-01-08',
    readTime: '4 min',
    image: '/blog/muebles-medida.jpg'
  },
  {
    id: 'limpieza-profunda-casa',
    title: 'Checklist de Limpieza Profunda para tu Casa',
    excerpt: 'Lista completa para una limpieza profunda efectiva. Productos, técnicas y frecuencia recomendada.',
    category: 'Limpieza',
    date: '2025-01-05',
    readTime: '8 min',
    image: '/blog/limpieza-profunda.jpg'
  },
  {
    id: 'jardineria-cuenca-clima',
    title: 'Plantas Ideales para el Clima de Cuenca: Guía de Jardinería',
    excerpt: 'Descubre qué plantas prosperan mejor en el clima de Cuenca y cómo cuidar tu jardín durante todo el año.',
    category: 'Jardinería',
    date: '2025-01-03',
    readTime: '10 min',
    image: '/blog/jardineria-cuenca.jpg'
  }
]

const categories = ['Todos', 'Plomería', 'Electricidad', 'Carpintería', 'Limpieza', 'Jardinería', 'Precios']

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl">EcuaCasa</span>
            </Link>
            <Link href="/providers">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                Buscar Profesionales
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Blog EcuaCasa
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Consejos útiles, guías de mantenimiento y tips para cuidar tu hogar
          </p>
          
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  category === 'Todos' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-purple-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Artículo Destacado</h2>
            <Link href={`/blog/${featuredPost.id}`}>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-white/80 text-sm">{featuredPost.readTime} de lectura</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-xl text-white/90 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">{new Date(featuredPost.date).toLocaleDateString('es-ES')}</span>
                  <span className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium">
                    Leer más →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Artículos Recientes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                  <div className="h-48 bg-gradient-to-br relative overflow-hidden" style={{
                    background: post.category === 'Electricidad' ? 'linear-gradient(to bottom right, #fef3c7, #fcd34d)' :
                               post.category === 'Precios' ? 'linear-gradient(to bottom right, #dcfce7, #86efac)' :
                               post.category === 'Carpintería' ? 'linear-gradient(to bottom right, #f3e8ff, #c4b5fd)' :
                               post.category === 'Limpieza' ? 'linear-gradient(to bottom right, #e0f2fe, #7dd3fc)' :
                               post.category === 'Jardinería' ? 'linear-gradient(to bottom right, #f0fdf4, #bbf7d0)' :
                               'linear-gradient(to bottom right, #f3f4f6, #d1d5db)'
                  }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">
                        {post.category === 'Electricidad' ? '⚡' :
                         post.category === 'Precios' ? '💰' :
                         post.category === 'Carpintería' ? '🔨' :
                         post.category === 'Limpieza' ? '🧹' :
                         post.category === 'Jardinería' ? '🌱' : '📝'}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                      <span>•</span>
                      <span>{post.readTime} de lectura</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-purple-600 font-medium">Leer más →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Mantente al día con nuestros consejos
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Recibe tips semanales para el cuidado de tu hogar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-xl border-none outline-none"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}