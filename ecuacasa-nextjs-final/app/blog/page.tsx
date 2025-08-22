'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Blog posts data (would typically come from CMS or database)
const blogPosts = [
  {
    id: 'como-elegir-plomero-cuenca',
    title: 'Cómo Elegir el Mejor Plomero en Cuenca: Guía Completa 2025',
    excerpt: 'Encuentra al plomero perfecto para tu hogar con nuestra guía detallada. Aprende a verificar licencias, comparar precios justos ($25-45/hora), evaluar experiencia y identificar señales de calidad. Incluye checklist descargable y preguntas clave para hacer antes de contratar.',
    category: 'Plomería',
    date: '2025-01-15',
    readTime: '5 min',
    image: '/blog/plomero-cuenca.jpg',
    featured: true
  },
  {
    id: 'mantenimiento-electrico-hogar',
    title: '10 Consejos de Mantenimiento Eléctrico para tu Hogar',
    excerpt: 'Protege tu familia y tu inversión con estas 10 reglas de oro del mantenimiento eléctrico. Desde inspecciones mensuales hasta cuándo llamar a un profesional. Incluye señales de alerta, costos promedio de reparaciones en Cuenca y cronograma de mantenimiento preventivo.',
    category: 'Electricidad',
    date: '2025-01-12',
    readTime: '7 min',
    image: '/blog/electricidad-hogar.jpg'
  },
  {
    id: 'precios-servicios-hogar-cuenca-2025',
    title: 'Precios de Servicios para el Hogar en Cuenca 2025',
    excerpt: 'Presupuesta inteligentemente con nuestra guía de precios actualizada para Cuenca. Tarifas por hora, costos de materiales, diferencias entre barrios. Plomería $25-45/h, electricidad $30-50/h, carpintería $20-40/h. Incluye calculadora de presupuesto y tips para negociar.',
    category: 'Precios',
    date: '2025-01-10',
    readTime: '6 min',
    image: '/blog/precios-servicios.jpg'
  },
  {
    id: 'carpinteria-muebles-medida',
    title: 'Ventajas de los Muebles a Medida vs Muebles Prefabricados',
    excerpt: 'Invierte inteligentemente en mobiliario que dure décadas. Comparativa detallada: durabilidad, costos a largo plazo, personalización y valor de reventa. Los muebles a medida cuestan 20-40% más pero duran 3x más tiempo. Incluye guía de maderas locales y mejores carpinteros de Cuenca.',
    category: 'Carpintería',
    date: '2025-01-08',
    readTime: '4 min',
    image: '/blog/muebles-medida.jpg'
  },
  {
    id: 'limpieza-profunda-casa',
    title: 'Checklist de Limpieza Profunda para tu Casa',
    excerpt: 'Transforma tu hogar en un santuario con nuestra guía paso a paso de limpieza profunda. Cronograma estacional, productos caseros vs comerciales, técnicas profesionales y trucos para cada habitación. Ahorra hasta $200 al mes limpiando como un experto.',
    category: 'Limpieza',
    date: '2025-01-05',
    readTime: '8 min',
    image: '/blog/limpieza-profunda.jpg'
  },
  {
    id: 'jardineria-cuenca-clima',
    title: 'Plantas Ideales para el Clima de Cuenca: Guía de Jardinería',
    excerpt: 'Aprovecha el clima único de Cuenca (2560m altitud, 15°C promedio) para crear un jardín espectacular. Lista de 25+ plantas nativas resistentes, calendario de siembra, técnicas de riego eficiente y cómo proteger del granizo. Incluye mapas de viveros locales y precios.',
    category: 'Jardinería',
    date: '2025-01-03',
    readTime: '10 min',
    image: '/blog/jardineria-cuenca.jpg'
  }
]

const categories = ['Todos', 'Plomería', 'Electricidad', 'Carpintería', 'Limpieza', 'Jardinería', 'Precios']

// Component that uses searchParams - needs to be wrapped in Suspense
function BlogContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])
  
  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredPosts(blogPosts)
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory))
    }
  }, [selectedCategory])
  
  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0]
  const regularPosts = filteredPosts.filter(post => post.id !== featuredPost?.id)

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
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Blog EcuaCasa
            </h1>
            <p className="text-xl text-gray-600">
              Consejos útiles, guías de mantenimiento y tips para cuidar tu hogar
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Categorías
              </h3>
              
              <div className="space-y-3">
                {categories.map((category) => {
                  const categoryCount = category === 'Todos' 
                    ? blogPosts.length 
                    : blogPosts.filter(post => post.category === category).length;
                    
                  const categoryIcon = {
                    'Todos': '📝',
                    'Plomería': '🔧', 
                    'Electricidad': '⚡',
                    'Carpintería': '🔨',
                    'Limpieza': '🧹',
                    'Jardinería': '🌱',
                    'Precios': '💰'
                  }[category] || '📄';

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl font-medium transition-all text-left ${
                        category === selectedCategory 
                          ? 'bg-purple-600 text-white shadow-lg' 
                          : 'bg-gray-50 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{categoryIcon}</span>
                        <span>{category}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        category === selectedCategory 
                          ? 'bg-white/20' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {categoryCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Popular Articles */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  Más Populares
                </h4>
                <div className="space-y-3">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <h5 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                          {post.title}
                        </h5>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8 p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl text-white">
                <h4 className="font-bold mb-2">💌 Newsletter</h4>
                <p className="text-sm text-white/90 mb-4">
                  Recibe tips semanales para tu hogar
                </p>
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm mb-3"
                />
                <button className="w-full bg-white text-purple-600 px-3 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all">
                  Suscribirse
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'Todos' ? 'Todos los Artículos' : `Categoría: ${selectedCategory}`}
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''} 
                {selectedCategory !== 'Todos' && ` en ${selectedCategory}`}
              </p>
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {selectedCategory === 'Todos' ? 'Artículo Destacado' : `Destacado en ${selectedCategory}`}
                </h3>
                <Link href={`/blog/${featuredPost.id}`}>
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="text-white/80 text-sm">{featuredPost.readTime} de lectura</span>
                    </div>
                    <h4 className="text-3xl font-bold mb-4">{featuredPost.title}</h4>
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
            )}

            {/* Posts Grid */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {selectedCategory === 'Todos' ? 'Artículos Recientes' : `Más Artículos de ${selectedCategory}`}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
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
          </main>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando blog...</p>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}