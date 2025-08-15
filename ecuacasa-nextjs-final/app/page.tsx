// app/page.tsx - FIXED VERSION WITHOUT STYLED-JSX
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Search, Star, Shield, Users, TrendingUp, ArrowRight, Clock, DollarSign } from 'lucide-react'

// Fetch from YOUR Supabase
async function getProviders() {
  const { data } = await supabase
    .from('providers')
    .select('*')
    .eq('status', 'active')
    .order('rating', { ascending: false })
    .limit(3)
  
  return data || []
}

async function getServices() {
  const { data } = await supabase
    .from('services')
    .select('*, providers(count)')
    .limit(8)
  
  return data || []
}

async function getStats() {
  const { count: userCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
  
  const { count: providerCount } = await supabase
    .from('providers')
    .select('*', { count: 'exact', head: true })

  return { users: userCount || 2500, providers: providerCount || 500 }
}

export default async function Home() {
  const providers = await getProviders()
  const services = await getServices()
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Nav */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-2xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl">EcuaCasa</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-gray-900 font-medium">
                Servicios
              </Link>
              <Link href="/providers" className="text-gray-700 hover:text-gray-900 font-medium">
                Profesionales
              </Link>
              <Link href="/how" className="text-gray-700 hover:text-gray-900 font-medium">
                Iniciar
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <SignedOut>
                <Link href="/sign-up">
                  <button className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-all">
                    Empezar Gratis
                  </button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Purple Gradient */}
      <section className="pt-16 relative overflow-hidden">
        {/* Animated Background Gradient - Using Tailwind animations */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <TrendingUp className="w-4 h-4" />
              #1 Marketplace de Servicios en Ecuador
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
              Tu casa merece los{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                mejores
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Conectamos +{stats.users.toLocaleString()} hogares con profesionales verificados.
              Encuentra, compara y contrata en minutos.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-2 flex gap-2 border border-white/50">
                <input
                  type="text"
                  placeholder="¿Qué necesitas? Ej: Plomero, Electricista..."
                  className="flex-1 px-6 py-4 bg-transparent placeholder-gray-500 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                  Buscar Ahora
                </button>
              </div>
              
              {/* Popular Searches */}
              <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
                <span className="text-sm text-gray-500">Popular:</span>
                {['Plomero urgente', 'Electricista 24/7', 'Pintor casa'].map((term) => (
                  <button key={term} className="text-sm text-purple-600 hover:text-purple-700 underline font-medium">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Black Bar */}
      <section className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-black flex items-center justify-center text-white font-bold text-xs">
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="text-white">
                <span className="font-bold text-lg">{stats.users.toLocaleString()}+</span>
                <span className="text-gray-400 text-sm ml-1">usuarios activos</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="font-bold text-lg">4.9/5</span>
              <span className="text-gray-400 text-sm">calificación</span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="font-bold text-lg">100%</span>
              <span className="text-gray-400 text-sm">verificados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Bento Grid from Supabase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Todos los servicios que necesitas
            </h2>
            <p className="text-gray-600 text-lg">
              Un click te separa de la solución
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* Featured Service - Larger Card */}
            {services[0] && (
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">🔧</div>
                  <h3 className="text-3xl font-bold mb-2">{services[0].name || 'Plomería'}</h3>
                  <p className="text-white/80 mb-6 text-lg">Emergencias 24/7 disponibles</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-bold">{services[0].provider_count || 156}</span>
                    <span className="text-white/60 text-lg">profesionales</span>
                  </div>
                </div>
              </div>
            )}

            {/* Other Services from Supabase */}
            {services.slice(1, 5).map((service, i) => (
              <div key={service.id || i} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {['⚡', '🔨', '🎨', '🧹'][i] || '🔧'}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{service.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{service.provider_count || 98} disponibles</p>
              </div>
            ))}

            {/* Special Cards */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white cursor-pointer hover:scale-[1.02] transition-all">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-bold text-lg">Pintura</h3>
              <p className="text-sm text-white/80 mt-2">Cotiza gratis</p>
            </div>

            <Link href="/services" className="col-span-2 bg-black text-white rounded-2xl p-6 flex items-center justify-between group hover:bg-gray-900 transition-all cursor-pointer">
              <div>
                <h3 className="font-bold text-xl mb-1">Ver todos los servicios</h3>
                <p className="text-gray-400">+30 categorías disponibles</p>
              </div>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Providers Section - From Supabase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Top Rated This Week
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Profesionales que marcan la diferencia
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {providers.map((provider, i) => (
              <div key={provider.id} className="relative">
                {i === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                    ⭐ DESTACADO
                  </div>
                )}
                <div className={`bg-white rounded-3xl overflow-hidden ${i === 0 ? 'shadow-2xl ring-2 ring-yellow-400' : 'shadow-xl'} hover:shadow-2xl transition-all`}>
                  <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600"></div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {provider.name ? provider.name.charAt(0).toUpperCase() : 'P'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900">{provider.name || `Profesional ${i + 1}`}</h3>
                        <p className="text-purple-600 font-semibold">{provider.service_type || 'Plomero Master'}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-bold text-sm">{provider.rating || '5.0'}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{provider.jobs_completed || 342} trabajos</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-gray-50 rounded-xl py-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Responde</p>
                        <p className="font-bold text-sm">{provider.response_time || '30min'}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl py-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Precio</p>
                        <p className="font-bold text-sm">{provider.price_range || '$$$'}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl py-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">Exp</p>
                        <p className="font-bold text-sm">{provider.experience || '5+'} años</p>
                      </div>
                    </div>

                    <Link href={`/providers/${provider.id}`}>
                      <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all">
                        Ver Perfil
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Empieza hoy, es gratis
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Únete a miles de ecuatorianos que ya confían en nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
                Crear Cuenta Gratis →
              </button>
            </Link>
            <Link href="/providers/register">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Soy Profesional
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}