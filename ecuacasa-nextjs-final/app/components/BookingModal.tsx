'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { X, Calendar, Clock, MapPin, MessageCircle, User, Phone, Mail } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  provider: {
    name: string
    service_type: string
    phone?: string
    price_range?: string
  }
}

export default function BookingModal({ isOpen, onClose, provider }: BookingModalProps) {
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    serviceType: provider.service_type || '',
    preferredDate: '',
    preferredTime: 'morning',
    sector: '',
    description: '',
    estimatedCost: '',
    shareLocationViaWhatsApp: true
  })

  // Reset service type when provider changes and pre-fill user data
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      serviceType: provider.service_type || '',
      clientName: user ? `${user.firstName} ${user.lastName}` : prev.clientName,
      clientEmail: user ? user.emailAddresses[0]?.emailAddress || '' : prev.clientEmail
    }))
  }, [provider.service_type, user])

  const timeOptions = [
    { value: 'morning', label: 'Mañana (8:00 - 12:00)' },
    { value: 'afternoon', label: 'Tarde (13:00 - 17:00)' },
    { value: 'evening', label: 'Noche (18:00 - 20:00)' }
  ]

  const cuencaSectors = [
    'El Centro',
    'San Joaquín', 
    'Yanuncay',
    'San Sebastián',
    'Totoracocha',
    'Monay',
    'El Batán',
    'Ricaurte'
  ]

  // Get related services based on provider's specialty
  const getProviderServices = () => {
    const serviceType = provider.service_type?.toLowerCase() || ''
    
    // Map provider types to related services
    if (serviceType.includes('plomer')) {
      return ['Reparación de tuberías', 'Instalación de grifos', 'Destape de cañerías', 'Calentadores de agua', 'Detección de fugas']
    } else if (serviceType.includes('electric')) {
      return ['Instalación eléctrica', 'Reparación de cortocircuitos', 'Cambio de breakers', 'Instalación de luminarias', 'Cableado']
    } else if (serviceType.includes('carpint')) {
      return ['Muebles a medida', 'Reparación de muebles', 'Instalación de puertas', 'Closets', 'Estanterías']
    } else if (serviceType.includes('pint')) {
      return ['Pintura interior', 'Pintura exterior', 'Texturizado', 'Impermeabilización', 'Pintura decorativa']
    } else if (serviceType.includes('limpieza')) {
      return ['Limpieza profunda', 'Limpieza regular', 'Limpieza post-construcción', 'Limpieza de oficinas', 'Limpieza de ventanas']
    } else if (serviceType.includes('jardin')) {
      return ['Mantenimiento de jardín', 'Diseño de jardines', 'Poda de árboles', 'Sistema de riego', 'Paisajismo']
    } else if (serviceType.includes('cerraj')) {
      return ['Apertura de puertas', 'Cambio de cerraduras', 'Duplicado de llaves', 'Cerraduras de seguridad', 'Emergencias 24/7']
    } else if (serviceType.includes('albañil')) {
      return ['Construcción', 'Remodelación', 'Enlucido', 'Levantamiento de paredes', 'Pisos y cerámica']
    } else {
      // Default general services
      return ['Servicio general de ' + provider.service_type, 'Mantenimiento', 'Reparación', 'Instalación', 'Consulta']
    }
  }

  const providerServices = getProviderServices()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Save booking to database if user is signed in
      if (user) {
        const bookingData = {
          customerName: formData.clientName || user.firstName,
          customerEmail: formData.clientEmail,
          customerPhone: formData.clientPhone,
          providerName: provider.name,
          service: formData.serviceType,
          date: formData.preferredDate,
          time: formData.preferredTime,
          timeLabel: timeOptions.find(t => t.value === formData.preferredTime)?.label,
          location: formData.sector,
          price: provider.price_range || 'Por confirmar',
          description: formData.description,
          estimatedCost: formData.estimatedCost
        }

        await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        })
      }

      // Send confirmation email if user is signed in
      if (user && formData.clientEmail) {
        const emailData = {
          type: 'booking_confirmation',
          to: formData.clientEmail,
          data: {
            customerName: formData.clientName || user.firstName,
            providerName: provider.name,
            service: formData.serviceType,
            date: formData.preferredDate,
            time: timeOptions.find(t => t.value === formData.preferredTime)?.label,
            location: formData.sector,
            price: provider.price_range || 'Por confirmar'
          }
        }

        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        })
      }

      // Create WhatsApp message
      const message = `🔧 *Nueva Solicitud de Servicio*

👤 *Cliente:* ${formData.clientName}
📱 *Teléfono:* ${formData.clientPhone}
🛠️ *Servicio:* ${formData.serviceType}
📅 *Fecha Preferida:* ${formData.preferredDate}
⏰ *Horario:* ${timeOptions.find(t => t.value === formData.preferredTime)?.label}
📍 *Sector:* ${formData.sector}
${formData.estimatedCost ? `💰 *Presupuesto Esperado:* ${formData.estimatedCost}` : ''}
${formData.description ? `📝 *Descripción:* ${formData.description}` : ''}

${formData.shareLocationViaWhatsApp ? '📍 Te enviaré la ubicación exacta por WhatsApp' : ''}

¡Hola ${provider.name}! Me interesa agendar este servicio. ¿Podrías confirmar disponibilidad y costo?`

      // Open WhatsApp with the message
      const phoneNumber = provider.phone?.replace(/[^\d]/g, '') || ''
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      
      window.open(whatsappURL, '_blank')
      onClose()
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      // Still proceed with WhatsApp even if email fails
      const phoneNumber = provider.phone?.replace(/[^\d]/g, '') || ''
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappURL, '_blank')
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Agendar Cita</h2>
            <p className="text-sm text-gray-600 mb-1">Con {provider.name}</p>
            {provider.price_range && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Tarifa:</span>
                <span className="text-sm font-semibold text-purple-600">
                  {provider.price_range}
                </span>
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Client Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Información de Contacto
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono/WhatsApp *
              </label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="099 123 4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email {user ? '(Confirmación automática)' : '(Opcional)'}
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="tu@email.com"
                disabled={!!user}
              />
              {user && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Recibirás confirmación automática por email
                </p>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Detalles del Servicio
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Servicio Específico *
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="" className="text-gray-500">Selecciona el servicio que necesitas</option>
                <option value={provider.service_type} className="text-gray-900 font-semibold">
                  {provider.service_type} (General)
                </option>
                <optgroup label="Servicios Específicos" className="text-gray-700">
                  {providerServices.map(service => (
                    <option key={service} value={service} className="text-gray-900">
                      {service}
                    </option>
                  ))}
                </optgroup>
              </select>
              <p className="text-xs text-gray-600 mt-1">
                Servicios disponibles con {provider.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Preferida *
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horario Preferido *
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
              >
                {timeOptions.map(option => (
                  <option key={option.value} value={option.value} className="text-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Presupuesto Esperado (Opcional)
              </label>
              <input
                type="text"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Ej: $50-80, $100 máximo"
              />
              <p className="text-xs text-gray-600 mt-1">
                {provider.price_range 
                  ? `Tarifa del profesional: ${provider.price_range}. Indica tu presupuesto específico.`
                  : 'Indica tu rango de presupuesto para el trabajo'}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Ubicación del Trabajo
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sector/Barrio *
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="" className="text-gray-500">Selecciona tu sector</option>
                {cuencaSectors.map(sector => (
                  <option key={sector} value={sector} className="text-gray-900">
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="shareLocationViaWhatsApp"
                  checked={formData.shareLocationViaWhatsApp}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Enviaré ubicación exacta por WhatsApp
                  </p>
                  <p className="text-xs text-green-600">
                    Te contactaré para coordinar la ubicación específica
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción del Trabajo (Opcional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Describe brevemente qué necesitas..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar Solicitud por WhatsApp
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-2">
              Se abrirá WhatsApp con tu solicitud preparada
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}