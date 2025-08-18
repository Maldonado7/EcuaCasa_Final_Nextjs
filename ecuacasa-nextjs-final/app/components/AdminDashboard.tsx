'use client'

import { useState, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { useTranslation } from '../context/TranslationContext'
import Link from 'next/link'
import LanguageToggle from './LanguageToggle'
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Shield, 
  Settings, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useUser()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalBookings: 0,
    pendingProviders: 0,
    pendingBookings: 0,
    totalRevenue: 0
  })
  const [pendingProviders, setPendingProviders] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch('/api/admin/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        } else {
          // Fallback to mock stats
          setStats({
            totalUsers: 25,
            totalProviders: 12,
            totalBookings: 8,
            pendingProviders: 3,
            pendingBookings: 2,
            totalRevenue: 0
          })
        }

        // Fetch pending providers
        const providersResponse = await fetch('/api/admin/providers/pending')
        if (providersResponse.ok) {
          const providersData = await providersResponse.json()
          setPendingProviders(providersData.providers || [])
        } else {
          // Fallback to mock pending providers
          setPendingProviders([
            {
              id: 'test-1',
              name: 'Juan Pérez',
              service_type: 'Plomero Certificado',
              description: 'Plomero con 10 años de experiencia',
              location: 'El Centro, Cuenca',
              phone: '+593999123456'
            },
            {
              id: 'test-2', 
              name: 'María González',
              service_type: 'Electricista',
              description: 'Electricista certificada',
              location: 'San Joaquín, Cuenca',
              phone: '+593987654321'
            }
          ])
        }

        // Fetch recent bookings
        const bookingsResponse = await fetch('/api/admin/bookings/recent')
        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json()
          setRecentBookings(bookingsData.bookings || [])
        } else {
          // Fallback to mock bookings
          setRecentBookings([
            {
              id: 'booking-1',
              service_id: 'Plomería',
              customer_name: 'Carlos Mendoza',
              status: 'confirmado',
              date: '2025-08-17',
              time: '10:00'
            },
            {
              id: 'booking-2',
              service_id: 'Electricidad', 
              customer_name: 'Ana Silva',
              status: 'pendiente',
              date: '2025-08-18',
              time: '14:00'
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching admin data:', error)
        // Set mock data on error
        setStats({
          totalUsers: 25,
          totalProviders: 12, 
          totalBookings: 8,
          pendingProviders: 2,
          pendingBookings: 1,
          totalRevenue: 0
        })
        setPendingProviders([
          {
            id: 'test-1',
            name: 'Test Provider',
            service_type: 'Plomero',
            description: 'Test description',
            location: 'Cuenca'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  const handleProviderAction = async (providerId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/admin/providers/${providerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        // Refresh pending providers
        setPendingProviders(prev => prev.filter((p: any) => p.id !== providerId))
        // Update stats
        setStats(prev => ({
          ...prev,
          pendingProviders: prev.pendingProviders - 1,
          totalProviders: action === 'approve' ? prev.totalProviders + 1 : prev.totalProviders
        }))
      }
    } catch (error) {
      console.error('Error updating provider:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4 animate-pulse">
            EC
          </div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-2xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl text-gray-900">EcuaCasa</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.services')}
              </Link>
              <Link href="/providers" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.providers')}
              </Link>
              <Link href="/how" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.how')}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <LanguageToggle />
              
              {/* SOY PROFESIONAL Button - Always visible */}
              <Link href="/providers/register">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 rounded-full font-bold text-sm hover:shadow-lg transition-all">
                  {t('nav.professional')}
                </button>
              </Link>

              {/* User Account */}
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10'
                  }
                }}
                afterSignOutUrl="/"
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Mi Perfil Profesional"
                    labelIcon={<span>💼</span>}
                    href="/my-provider-profile"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                    activeTab === 'overview' 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
{t('admin.overview')}
                </button>

                <button
                  onClick={() => setActiveTab('providers')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                    activeTab === 'providers' 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
{t('admin.providers')}
                  {stats.pendingProviders > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {stats.pendingProviders}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                    activeTab === 'bookings' 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Reservas
                </button>

                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                    activeTab === 'users' 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Usuarios
                </button>

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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-6">{t('admin.title')}</h1>
                
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('admin.stats.total.users')}</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('admin.stats.providers')}</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalProviders}</p>
                        {stats.pendingProviders > 0 && (
                          <p className="text-xs text-orange-600">{stats.pendingProviders} pendientes</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t('admin.stats.bookings')}</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Pending Providers */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Proveedores Pendientes</h3>
                    <div className="space-y-3">
                      {pendingProviders.slice(0, 3).map((provider: any) => (
                        <div key={provider.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-900">{provider.name}</p>
                            <p className="text-sm text-gray-600">{provider.service_type}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleProviderAction(provider.id, 'approve')}
                              className="text-green-600 hover:bg-green-50 p-1 rounded"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleProviderAction(provider.id, 'reject')}
                              className="text-red-600 hover:bg-red-50 p-1 rounded"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {pendingProviders.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No hay proveedores pendientes</p>
                      )}
                    </div>
                  </div>

                  {/* Recent Bookings */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Reservas Recientes</h3>
                    <div className="space-y-3">
                      {recentBookings.slice(0, 3).map((booking: any) => (
                        <div key={booking.id} className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{booking.service_id || 'Service'}</p>
                              <p className="text-sm text-gray-600">{booking.customer_name || 'Customer'}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmado' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                      {recentBookings.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No hay reservas recientes</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Providers Tab */}
            {activeTab === 'providers' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Proveedores</h2>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="space-y-4">
                    {pendingProviders.map((provider: any) => (
                      <div key={provider.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{provider.name}</h3>
                            <p className="text-purple-600 font-medium">{provider.service_type}</p>
                            <p className="text-gray-600 text-sm mt-1">{provider.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>📍 {provider.location}</span>
                              <span>📞 {provider.phone || 'No phone'}</span>
                              <span>🏷️ {provider.type || provider.provider_type || 'individual'}</span>
                            </div>
                            {provider.email && (
                              <div className="mt-2 text-sm text-gray-500">
                                <span>✉️ {provider.email}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleProviderAction(provider.id, 'approve')}
                              className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-600 transition-all"
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleProviderAction(provider.id, 'reject')}
                              className="bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-600 transition-all"
                            >
                              Rechazar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {pendingProviders.length === 0 && (
                      <div className="text-center py-12">
                        <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay proveedores pendientes</h3>
                        <p className="text-gray-600">Todos los proveedores han sido revisados</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs can be implemented similarly */}
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Reservas</h2>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <p className="text-gray-600">Panel de reservas en desarrollo...</p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Usuarios</h2>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <p className="text-gray-600">Panel de usuarios en desarrollo...</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración de la Plataforma</h2>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <p className="text-gray-600">Configuraciones en desarrollo...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}