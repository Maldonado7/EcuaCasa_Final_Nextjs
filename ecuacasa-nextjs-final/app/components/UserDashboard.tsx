'use client'

import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Star, Shield, User, Settings, CreditCard, History, Plus, TrendingUp, MapPin, Clock } from 'lucide-react'

export default function UserDashboard() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState('bookings')
  const [userRole, setUserRole] = useState<'customer' | 'professional' | 'both'>('customer')
  const [isProfessional, setIsProfessional] = useState(false)
  const [bookings, setBookings] = useState<any[]>([])
  const [loadingBookings, setLoadingBookings] = useState(true)

  // Fetch real bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return
      
      try {
        const response = await fetch('/api/bookings')
        if (response.ok) {
          const data = await response.json()
          setBookings(data.bookings)
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setLoadingBookings(false)
      }
    }

    fetchBookings()
  }, [user])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4 animate-pulse">
            EC
          </div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl text-gray-900">EcuaCasa</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Hola, {user?.firstName}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Profile Section */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <h2 className="font-bold text-lg text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 text-sm">{user?.emailAddresses[0]?.emailAddress}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 text-sm font-medium">Verificado</span>
                </div>
              </div>

              {/* Role Toggle */}
              <div className="mb-6">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-sm text-gray-600 mb-2">Modo actual:</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-purple-600">
                      {isProfessional ? 'Profesional' : 'Cliente'}
                    </span>
                    <button
                      onClick={() => setIsProfessional(!isProfessional)}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                    activeTab === 'bookings' 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  {isProfessional ? 'Mis Servicios' : 'Mis Reservas'}
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                    activeTab === 'history' 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <History className="w-5 h-5" />
                  Historial
                </button>

                {isProfessional && (
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                      activeTab === 'profile' 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Perfil Profesional
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                    activeTab === 'settings' 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Configuración
                </button>
              </nav>

              {/* Upgrade to Professional */}
              {!isProfessional && (
                <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-2">¿Ofreces servicios?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Regístrate como profesional y empieza a recibir clientes.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsProfessional(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
                    >
                      Activar Modo Profesional
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      Esto te permite gestionar servicios como profesional
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Welcome Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-2">
                    ¡Bienvenido, {user?.firstName}! 👋
                  </h1>
                  <p className="text-gray-600">
                    {isProfessional 
                      ? 'Gestiona tus servicios y clientes desde aquí.' 
                      : 'Gestiona tus reservas y encuentra nuevos servicios.'}
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {isProfessional ? '12' : '3'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {isProfessional ? 'Servicios' : 'Reservas'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">4.9</p>
                      <p className="text-sm text-gray-600">Calificación</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Based on Active Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isProfessional ? 'Servicios Programados' : 'Mis Reservas'}
                  </h2>
                  <Link href={isProfessional ? '/providers/add-service' : '/providers'}>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-700 transition-all">
                      <Plus className="w-4 h-4" />
                      {isProfessional ? 'Nuevo Servicio' : 'Nueva Reserva'}
                    </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {loadingBookings ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="text-gray-600">Cargando reservas...</p>
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes reservas aún</h3>
                      <p className="text-gray-600 mb-4">¡Encuentra profesionales y agenda tu primer servicio!</p>
                      <Link href="/providers">
                        <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                          Explorar Profesionales
                        </button>
                      </Link>
                    </div>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{booking.service}</h3>
                              <p className="text-gray-600 text-sm">
                                {isProfessional ? `Cliente: ${booking.customerName}` : `Profesional: ${booking.providerName}`}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {booking.date}
                                </span>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {booking.timeLabel || booking.time}
                                </span>
                                {booking.location && (
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {booking.location}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">{booking.price}</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmado' 
                                ? 'bg-green-100 text-green-700'
                                : booking.status === 'completado'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        {booking.description && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                              <strong>Descripción:</strong> {booking.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && isProfessional && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfil Profesional</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especialidad
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ej: Plomero Master"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Años de experiencia
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rango de precios
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="$25-45/hora"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="El Centro, Cuenca"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Describe tu experiencia y servicios..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                      Guardar Perfil
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        defaultValue={user?.firstName || ''}
                        className="px-4 py-3 border border-gray-200 rounded-xl"
                        placeholder="Nombre"
                        readOnly
                      />
                      <input
                        type="text"
                        defaultValue={user?.lastName || ''}
                        className="px-4 py-3 border border-gray-200 rounded-xl"
                        placeholder="Apellido"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-gray-700">Nuevas reservas por email</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-gray-700">Recordatorios de citas</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-700">Ofertas y promociones</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}