'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useTranslation } from '../../context/TranslationContext'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function ProviderRegisterPage() {
  const { user } = useUser()
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    service_type: '',
    service_specialty: '',
    location: 'cuenca',
    phone: '',
    description: '',
    price_range: '',
    price_number: '',
    price_unit: 'hora'
  })

  const [serviceSpecialties, setServiceSpecialties] = useState<string[]>([])

  const serviceOptions = {
    'Plomero': ['Instalación de baños', 'Reparación de tuberías', 'Destapes', 'Instalación de grifos', 'Calentadores'],
    'Electricista': ['Instalación eléctrica', 'Reparación de tomacorrientes', 'Cableado', 'Paneles eléctricos', 'Iluminación'],
    'Carpintero': ['Muebles a medida', 'Reparación de puertas', 'Closets', 'Cocinas', 'Pisos de madera'],
    'Pintor': ['Pintura interior', 'Pintura exterior', 'Pintura decorativa', 'Empapelado', 'Texturizado'],
    'Limpieza': ['Limpieza profunda', 'Limpieza de oficinas', 'Limpieza post-construcción', 'Limpieza de alfombras', 'Limpieza de vidrios'],
    'Jardinero': ['Diseño de jardines', 'Mantenimiento', 'Poda de árboles', 'Sistemas de riego', 'Paisajismo'],
    'Cerrajero': ['Cambio de cerraduras', 'Apertura de puertas', 'Llaves duplicadas', 'Cerraduras digitales', 'Rejas de seguridad'],
    'Albañil': ['Construcción', 'Remodelaciones', 'Mampostería', 'Pisos y azulejos', 'Reparaciones'],
  }

  const priceUnits = [
    { value: 'hora', label: '/hora' },
    { value: 'servicio', label: '/servicio' },
    { value: 'metro', label: '/m²' },
    { value: 'visita', label: '/visita' },
    { value: 'proyecto', label: '/proyecto' }
  ]

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({...prev, service_type: service, service_specialty: ''}))
    setServiceSpecialties(serviceOptions[service as keyof typeof serviceOptions] || [])
  }

  const handleLocationChange = (location: string) => {
    setFormData(prev => ({...prev, location: location}))
  }

  const handlePriceChange = (value: string) => {
    const numberOnly = value.replace(/[^0-9]/g, '')
    setFormData(prev => ({...prev, price_number: numberOnly}))
  }

  const handlePriceUnitChange = (unit: string) => {
    setFormData(prev => ({...prev, price_unit: unit}))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.service_type) {
      alert('Por favor selecciona un servicio principal')
      return
    }
    if (!formData.location || formData.location === 'cuenca') {
      alert('Por favor selecciona una ubicación específica')
      return
    }
    
    setIsSubmitting(true)

    try {
      const serviceTypeWithSpecialty = formData.service_specialty 
        ? `${formData.service_type} - ${formData.service_specialty}`
        : formData.service_type

      const providerData = {
        name: formData.name,
        service_type: serviceTypeWithSpecialty,
        description: formData.description,
        location: formData.location,
        phone: formData.phone,
        rating: 5.0,
        verified: false,
        type: 'individual'
      }

      const response = await fetch('/api/providers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(providerData)
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const errorData = await response.json()
        console.error('Registration failed:', errorData)
        throw new Error(errorData.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert(`Error al registrarse: ${error.message}. Por favor intenta de nuevo.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Necesitas iniciar sesión
          </h1>
          <p className="text-gray-600 mb-6">
            Para registrarte como profesional, primero debes tener una cuenta.
          </p>
          <Link href="/sign-in">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Registro Exitoso!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu perfil de profesional ha sido creado. Nuestro equipo lo revisará y lo activará en las próximas 24 horas.
          </p>
          <div className="space-y-3">
            <Link href="/">
              <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
                Ir al Inicio
              </button>
            </Link>
            <Link href="/providers">
              <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold">
                Ver Profesionales
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto mb-4">
            🔧
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 drop-shadow-sm">Únete como Profesional</h1>
          <p className="text-gray-700 font-medium">Registra tu servicio en EcuaCasa</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo o negocio
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ej: Carlos Mendoza o Servicios EcuaCasa"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
              />
            </div>

            {/* Service Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oficio principal
                </label>
                <select
                  value={formData.service_type}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  required
                >
                  <option value="">Selecciona tu oficio</option>
                  {Object.keys(serviceOptions).map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              
              {/* Dynamic Specialty Field */}
              {formData.service_type && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidad en {formData.service_type}
                  </label>
                  {serviceSpecialties.length > 0 ? (
                    <div className="space-y-2">
                      <select
                        value={formData.service_specialty}
                        onChange={(e) => setFormData(prev => ({...prev, service_specialty: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Selecciona especialidad</option>
                        {serviceSpecialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                        <option value="custom">✏️ Escribir especialidad personalizada</option>
                      </select>
                      
                      {formData.service_specialty === 'custom' && (
                        <input
                          type="text"
                          value=""
                          placeholder="Escribe tu especialidad específica..."
                          onChange={(e) => setFormData(prev => ({...prev, service_specialty: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                        />
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={formData.service_specialty}
                      onChange={(e) => setFormData(prev => ({...prev, service_specialty: e.target.value}))}
                      placeholder="Ej: Instalación de baños, Reparación de tuberías..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad
                </label>
                <select
                  value={formData.location.includes('cuenca') ? 'cuenca' : formData.location.includes('quito') ? 'quito' : 'cuenca'}
                  onChange={(e) => {
                    const city = e.target.value
                    setFormData(prev => ({...prev, location: city === 'cuenca' ? 'cuenca-centro' : 'quito-centro'}))
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="cuenca">Cuenca</option>
                  <option value="quito">Quito</option>
                  <option value="guayaquil">Guayaquil</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zona
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  required
                >
                  <option value="">Selecciona zona</option>
                  <option value="cuenca-centro">El Centro</option>
                  <option value="cuenca-san-joaquin">San Joaquín</option>
                  <option value="cuenca-yanuncay">Yanuncay</option>
                  <option value="cuenca-totoracocha">Totoracocha</option>
                  <option value="quito-norte">Quito Norte</option>
                  <option value="quito-sur">Quito Sur</option>
                  <option value="guayaquil-centro">Guayaquil Centro</option>
                </select>
              </div>
            </div>

            {/* Phone and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono/WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="0999123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Los clientes te contactarán por WhatsApp</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio base
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">$</span>
                    <input
                      type="text"
                      value={formData.price_number}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      placeholder="25"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
                    />
                  </div>
                  <select
                    value={formData.price_unit}
                    onChange={(e) => handlePriceUnitChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    {priceUnits.map(unit => (
                      <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Precio base para tu servicio
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción breve
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe tu experiencia y servicios..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-bold text-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse como Profesional'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Tu perfil será revisado en 24 horas
            </p>
            <Link href="/" className="text-green-600 text-sm font-medium hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}