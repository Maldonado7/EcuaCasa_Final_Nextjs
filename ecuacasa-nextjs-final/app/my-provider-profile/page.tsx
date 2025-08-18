'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useTranslation } from '../context/TranslationContext'
import Link from 'next/link'
import { 
  User, 
  MapPin, 
  Phone, 
  DollarSign,
  Clock,
  Star, 
  Shield,
  Edit, 
  CheckCircle, 
  AlertCircle,
  Briefcase,
  Calendar,
  Wrench,
  Award,
  Users,
  XCircle
} from 'lucide-react'
import ImageUpload from '../components/ImageUpload'

interface Provider {
  id: string
  name: string
  service_type: string
  description: string
  location: string
  phone: string
  rating: number
  verified: boolean
  price_range?: string
  response_time?: string
  experience?: number
  availability?: string
  warranty?: string
  insurance?: boolean
  emergency_available?: boolean
  services?: string[]
  portfolio?: string[]
  cedula?: string
  references?: Array<{
    name: string
    phone: string
    service_provided: string
  }>
  portfolio_images?: string[]
  created_at: string
}

export default function MyProviderProfile() {
  const { user } = useUser()
  const { t } = useTranslation()
  const [provider, setProvider] = useState<Provider | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Provider | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (user) {
      fetchProviderProfile()
    }
  }, [user])

  const fetchProviderProfile = async () => {
    try {
      const response = await fetch('/api/providers/register')
      const data = await response.json()
      
      if (data.hasProfile && data.provider) {
        // Initialize ALL fields with defaults
        const providerData = {
          ...data.provider,
          name: data.provider.name || '',
          service_type: data.provider.service_type || '',
          description: data.provider.description || '',
          location: data.provider.location || '',
          phone: data.provider.phone || '',
          price_range: data.provider.price_range || '$25-45/hora',
          response_time: data.provider.response_time || '30min',
          availability: data.provider.availability || 'Lun-Dom 7:00-22:00',
          experience: data.provider.experience || 5,
          warranty: data.provider.warranty || '30 días',
          insurance: data.provider.insurance || false,
          emergency_available: data.provider.emergency_available || false,
          services: data.provider.services || ['Servicio profesional garantizado'],
          portfolio: data.provider.portfolio || [],
          portfolio_images: data.provider.portfolio_images || [],
          cedula: data.provider.cedula || '',
          references: data.provider.references || [
            { name: '', phone: '', service_provided: '' },
            { name: '', phone: '', service_provided: '' },
            { name: '', phone: '', service_provided: '' }
          ]
        }
        setProvider(providerData)
        setEditForm(providerData)
      }
    } catch (error) {
      console.error('Error fetching provider profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editForm || !provider) return
    
    setIsSaving(true)
    try {
      // Send all fields to database
      const updateData = {
        name: editForm.name,
        service_type: editForm.service_type,
        description: editForm.description,
        location: editForm.location,
        phone: editForm.phone,
        price_range: editForm.price_range,
        response_time: editForm.response_time,
        experience: editForm.experience,
        availability: editForm.availability,
        warranty: editForm.warranty,
        insurance: editForm.insurance,
        emergency_available: editForm.emergency_available,
        services: editForm.services,
        portfolio: editForm.portfolio,
        portfolio_images: editForm.portfolio_images,
        cedula: editForm.cedula,
        references: editForm.references
      }
      
      const response = await fetch(`/api/providers/${provider.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
      
      if (response.ok) {
        const updated = await response.json()
        // Merge the updated data with the existing provider data
        const mergedData = { ...provider, ...updated }
        setProvider(mergedData)
        setEditForm(mergedData)
        setIsEditing(false)
        alert('Perfil actualizado correctamente')
      } else {
        alert('Error al actualizar el perfil')
      }
    } catch (error) {
      console.error('Error updating provider:', error)
      alert('Error al actualizar el perfil')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditForm(provider)
    setIsEditing(false)
  }

  const validateCedula = (cedula: string) => {
    // Ecuador cédula validation: exactly 10 digits
    return /^\d{10}$/.test(cedula)
  }

  const handleCedulaChange = (value: string) => {
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 10)
    setEditForm({...editForm!, cedula: numericValue})
  }

  const getStatusColor = (verified: boolean) => {
    if (verified) return 'text-green-600 bg-green-100'
    return 'text-yellow-600 bg-yellow-100'
  }

  const getStatusIcon = (verified: boolean) => {
    if (verified) return <CheckCircle className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  const getStatusText = (verified: boolean) => {
    if (verified) return 'Aprobado y Activo'
    return 'Pendiente de Revisión'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Necesitas iniciar sesión
          </h1>
          <Link href="/sign-in">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4 animate-pulse">
            EC
          </div>
          <p className="text-gray-600">Cargando perfil profesional...</p>
        </div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No eres profesional aún
          </h1>
          <p className="text-gray-600 mb-6">
            Registra tu perfil profesional para ofrecer servicios en EcuaCasa.
          </p>
          <Link href="/providers/register">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
              Registrarse como Profesional
            </button>
          </Link>
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

            <div className="text-purple-600 font-medium">
              Mi Perfil Profesional
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Mi Perfil Profesional</h1>
          <p className="text-gray-600">Gestiona tu información profesional y estado de verificación</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${getStatusColor(provider.verified)}`}>
                {getStatusIcon(provider.verified)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Estado del Perfil</h3>
                <p className={`font-medium ${provider.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                  {getStatusText(provider.verified)}
                </p>
              </div>
            </div>
            {provider.verified && (
              <div className="flex items-center gap-2 text-green-600">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Verificado</span>
              </div>
            )}
          </div>
          
          {!provider.verified && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
              <p className="text-sm text-yellow-800">
                <strong>Tu perfil está en revisión.</strong> Nuestro equipo lo activará en las próximas 24 horas. 
                Recibirás una notificación por email cuando esté aprobado.
              </p>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Información Profesional</h3>
            {!isEditing ? (
              <button 
                onClick={() => {
                  setEditForm(provider) // Ensure form has current data
                  setIsEditing(true)
                }}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
                <button 
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nombre/Negocio
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.name || ''}
                  onChange={(e) => setEditForm({...editForm!, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.name || 'Sin nombre'}</div>
              )}
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Servicio Principal
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.service_type || ''}
                  onChange={(e) => setEditForm({...editForm!, service_type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.service_type}</div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Ubicación
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.location || ''}
                  onChange={(e) => setEditForm({...editForm!, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.location}</div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Teléfono
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.phone || ''}
                  onChange={(e) => setEditForm({...editForm!, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.phone}</div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Rango de Precios
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.price_range || ''}
                  onChange={(e) => setEditForm({...editForm!, price_range: e.target.value})}
                  placeholder="Ej: $25-45/hora"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.price_range || '$25-45/hora'}</div>
              )}
            </div>

            {/* Response Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Tiempo de Respuesta
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.response_time || ''}
                  onChange={(e) => setEditForm({...editForm!, response_time: e.target.value})}
                  placeholder="Ej: 30min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.response_time || '30min'}</div>
              )}
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Disponibilidad
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.availability || ''}
                  onChange={(e) => setEditForm({...editForm!, availability: e.target.value})}
                  placeholder="Ej: Lun-Dom 7:00-22:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.availability || 'Lun-Dom 7:00-22:00'}</div>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award className="w-4 h-4 inline mr-2" />
                Años de Experiencia
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={editForm?.experience || ''}
                  onChange={(e) => setEditForm({...editForm!, experience: parseInt(e.target.value) || 0})}
                  placeholder="Ej: 5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.experience || 5} años</div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Servicio
              </label>
              {isEditing ? (
                <textarea
                  value={editForm?.description || ''}
                  onChange={(e) => setEditForm({...editForm!, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900">{provider.description || 'Sin descripción'}</div>
              )}
            </div>

            {/* Services List */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Wrench className="w-4 h-4 inline mr-2" />
                Servicios Especializados (separados por comas)
              </label>
              {isEditing ? (
                <textarea
                  value={editForm?.services?.join(', ') || ''}
                  onChange={(e) => setEditForm({...editForm!, services: e.target.value.split(',').map(s => s.trim())})}
                  placeholder="Ej: Instalación de baños, Reparación de tuberías, Destapes"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900">{provider.services?.join(', ') || 'Servicio profesional garantizado'}</div>
              )}
            </div>

            {/* Warranty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield className="w-4 h-4 inline mr-2" />
                Garantía
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm?.warranty || ''}
                  onChange={(e) => setEditForm({...editForm!, warranty: e.target.value})}
                  placeholder="Ej: 30 días"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <div className="text-gray-900 font-medium">{provider.warranty || '30 días'}</div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="md:col-span-2 space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isEditing ? (editForm?.insurance || false) : (provider.insurance || false)}
                  onChange={(e) => isEditing && setEditForm({...editForm!, insurance: e.target.checked})}
                  disabled={!isEditing}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Cuenta con seguro de responsabilidad
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isEditing ? (editForm?.emergency_available || false) : (provider.emergency_available || false)}
                  onChange={(e) => isEditing && setEditForm({...editForm!, emergency_available: e.target.checked})}
                  disabled={!isEditing}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Disponible para emergencias 24/7
                </span>
              </label>
            </div>
          </div>

          {/* Essential Verification Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <h4 className="text-lg font-bold text-blue-900 mb-4">🛡️ Verificación de Seguridad (Ecuador)</h4>
            
            {/* Cédula */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                🇪🇨 Cédula de Identidad
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={editForm?.cedula || ''}
                    onChange={(e) => handleCedulaChange(e.target.value)}
                    placeholder="Ej: 1234567890"
                    maxLength={10}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      editForm?.cedula && !validateCedula(editForm.cedula)
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-blue-300 focus:ring-blue-500'
                    }`}
                  />
                  {editForm?.cedula && !validateCedula(editForm.cedula) && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ La cédula debe tener exactamente 10 dígitos
                    </p>
                  )}
                  {editForm?.cedula && validateCedula(editForm.cedula) && (
                    <p className="text-xs text-green-600 mt-1">
                      ✅ Cédula válida
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-blue-900 font-medium">
                  {provider.cedula ? (
                    validateCedula(provider.cedula) 
                      ? `✅ Verificada: ****${provider.cedula.slice(-4)}`
                      : `⚠️ ${provider.cedula} (Inválida)`
                  ) : 'No proporcionado'}
                </div>
              )}
              <p className="text-xs text-blue-600 mt-1">
                🇪🇨 Cédula de identidad ecuatoriana (10 dígitos)
              </p>
            </div>

            {/* References */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                📞 Referencias de Clientes (3 referencias)
              </label>
              {isEditing ? (
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-white rounded-lg border border-blue-200">
                      <input
                        type="text"
                        placeholder="Nombre del cliente"
                        value={editForm?.references?.[index]?.name || ''}
                        onChange={(e) => {
                          const newRefs = [...(editForm?.references || [])];
                          if (!newRefs[index]) newRefs[index] = { name: '', phone: '', service_provided: '' };
                          newRefs[index].name = e.target.value;
                          setEditForm({...editForm!, references: newRefs});
                        }}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Teléfono"
                        value={editForm?.references?.[index]?.phone || ''}
                        onChange={(e) => {
                          const newRefs = [...(editForm?.references || [])];
                          if (!newRefs[index]) newRefs[index] = { name: '', phone: '', service_provided: '' };
                          newRefs[index].phone = e.target.value;
                          setEditForm({...editForm!, references: newRefs});
                        }}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Servicio realizado"
                        value={editForm?.references?.[index]?.service_provided || ''}
                        onChange={(e) => {
                          const newRefs = [...(editForm?.references || [])];
                          if (!newRefs[index]) newRefs[index] = { name: '', phone: '', service_provided: '' };
                          newRefs[index].service_provided = e.target.value;
                          setEditForm({...editForm!, references: newRefs});
                        }}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {provider.references && provider.references.filter(ref => ref.name).length > 0 ? (
                    provider.references.filter(ref => ref.name).map((ref, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-blue-200">
                        <div className="text-sm">
                          <span className="font-medium text-blue-900">{ref.name}</span> • 
                          <span className="text-blue-700"> {ref.phone}</span>
                        </div>
                        <div className="text-xs text-blue-600">{ref.service_provided}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-blue-700">No hay referencias agregadas</div>
                  )}
                </div>
              )}
              <p className="text-xs text-blue-600 mt-1">Proporcionamos referencias para verificar experiencia</p>
            </div>
          </div>
        </div>

        {/* Portfolio Gallery */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">🖼️ Galería de Trabajos</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
            )}
          </div>
          
          {isEditing ? (
            <ImageUpload
              images={editForm?.portfolio_images || []}
              onImageUpload={(url: string) => {
                const currentImages = editForm?.portfolio_images || []
                setEditForm({
                  ...editForm!,
                  portfolio_images: [...currentImages, url]
                })
              }}
              onImageRemove={(url: string) => {
                const currentImages = editForm?.portfolio_images || []
                setEditForm({
                  ...editForm!,
                  portfolio_images: currentImages.filter(img => img !== url)
                })
              }}
              maxImages={6}
              title="Galería de Trabajos"
            />
          ) : (
            <div>
              {provider.portfolio_images && provider.portfolio_images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {provider.portfolio_images.map((imageUrl, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={`Trabajo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">🖼️</div>
                  <p className="text-lg font-medium mb-2">No hay imágenes en la galería</p>
                  <p className="text-sm">Agrega fotos de tus trabajos para mostrar tu calidad profesional</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Performance Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{provider.rating}</div>
            <div className="text-sm text-gray-600">Calificación</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Servicios Completados</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{provider.response_time || '30min'}</div>
            <div className="text-sm text-gray-600">Tiempo de Respuesta</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href={`/providers/${provider.id}`}>
              <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                Ver Mi Perfil Público
              </button>
            </Link>
            <Link href="/">
              <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                Ir al Inicio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}