'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { 
  User, 
  Phone, 
  Briefcase, 
  DollarSign,
  MapPin,
  Clock,
  Shield,
  Camera,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Save
} from 'lucide-react'
import UploadThingImageUpload from '../../components/UploadThingImageUpload'

interface FormData {
  // Step 1: Basic Info
  name: string
  accountType: 'individual' | 'business'
  rucCedula: string
  emiteFactor: boolean
  phone: string
  phoneSecondary: string
  whatsappActive: boolean
  category: string
  specialties: string[]
  experienceYears: number
  description: string

  // Step 2: Services & Pricing
  pricingModel: 'hourly' | 'project' | 'quote'
  hourlyRate: number
  minimumVisit: number
  freeEstimate: boolean
  quoteFee: number
  paymentMethods: string[]
  guaranteePeriod: number
  hasInsurance: boolean
  includesMaterials: boolean
  offersContract: boolean

  // Step 3: Availability & Coverage
  coverageZones: string[]
  coversAllCuenca: boolean
  maxDistance: number
  weekdayStart: string
  weekdayEnd: string
  saturdayAvailable: boolean
  saturdayStart: string
  saturdayEnd: string
  sundayOption: 'available' | 'emergency' | 'closed'
  emergencyService: boolean
  emergencySurcharge: number
  responseTime: string

  // Step 4: Verification & Gallery
  profileImage: string[]
  galleryImages: string[]
  certificationDocs: string[]
  certifications: Array<{name: string, year: string}>
}

const serviceCategories = {
  'HOGAR': [
    'Plomería', 'Electricidad', 'Carpintería', 'Limpieza', 
    'Jardinería', 'Pintura', 'Cerrajería'
  ],
  'CONSTRUCCIÓN': [
    'Albañilería', 'Pisos y Cerámica', 'Techos', 'Remodelaciones'
  ],
  'COMERCIO': [
    'Muebles y Decoración', 'Electrodomésticos', 'Materiales de Construcción'
  ],
  'OTROS': ['Especificar Servicio']
}

const specialtiesByCategory: Record<string, string[]> = {
  'Plomería': ['Reparación de fugas', 'Instalación de grifos', 'Destape de cañerías', 'Calentadores de agua', 'Instalación de bombas', 'Mantenimiento preventivo'],
  'Electricidad': ['Instalación eléctrica', 'Reparación de tomacorrientes', 'Cableado', 'Paneles eléctricos', 'Iluminación', 'Emergencias eléctricas'],
  'Carpintería': ['Muebles a medida', 'Reparación de puertas', 'Closets', 'Cocinas', 'Pisos de madera', 'Trabajos de decoración'],
  'Limpieza': ['Limpieza profunda', 'Limpieza de oficinas', 'Limpieza post-construcción', 'Limpieza de alfombras', 'Limpieza de vidrios', 'Desinfección'],
  'Jardinería': ['Diseño de jardines', 'Mantenimiento', 'Poda de árboles', 'Sistemas de riego', 'Paisajismo', 'Control de plagas'],
  'Pintura': ['Pintura interior', 'Pintura exterior', 'Pintura decorativa', 'Empapelado', 'Texturizado', 'Restauración'],
  'Cerrajería': ['Cambio de cerraduras', 'Apertura de puertas', 'Llaves duplicadas', 'Cerraduras digitales', 'Rejas de seguridad', 'Emergencias 24/7'],
  'Albañilería': ['Construcción', 'Remodelaciones', 'Mampostería', 'Pisos y azulejos', 'Reparaciones', 'Acabados'],
  'Muebles y Decoración': ['Fabricación de muebles', 'Diseño a medida', 'Restauración', 'Instalación', 'Decoración de interiores', 'Tapicería'],
  'Electrodomésticos': ['Reparación de neveras', 'Lavadoras y secadoras', 'Cocinas y hornos', 'Aires acondicionados', 'Mantenimiento', 'Instalación'],
  'Materiales de Construcción': ['Venta de materiales', 'Asesoría técnica', 'Entrega a domicilio', 'Materiales especializados', 'Presupuestos', 'Mayoreo']
}

export default function EnhancedProviderRegistration() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [completionPercentage, setCompletionPercentage] = useState(25)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    // Step 1
    name: '',
    accountType: 'individual',
    rucCedula: '',
    emiteFactor: false,
    phone: '',
    phoneSecondary: '',
    whatsappActive: true,
    category: '',
    specialties: [],
    experienceYears: 1,
    description: '',

    // Step 2
    pricingModel: 'hourly',
    hourlyRate: 25,
    minimumVisit: 15,
    freeEstimate: false,
    quoteFee: 0,
    paymentMethods: ['cash'],
    guaranteePeriod: 30,
    hasInsurance: false,
    includesMaterials: false,
    offersContract: false,

    // Step 3
    coverageZones: [],
    coversAllCuenca: false,
    maxDistance: 10,
    weekdayStart: '08:00',
    weekdayEnd: '18:00',
    saturdayAvailable: true,
    saturdayStart: '09:00',
    saturdayEnd: '13:00',
    sundayOption: 'closed',
    emergencyService: false,
    emergencySurcharge: 50,
    responseTime: '1-3 horas',

    // Step 4
    profileImage: [],
    galleryImages: [],
    certificationDocs: [],
    certifications: []
  })

  const steps = [
    { id: 1, title: 'Información', subtitle: 'Básica', icon: User },
    { id: 2, title: 'Servicios', subtitle: 'y Precios', icon: DollarSign },
    { id: 3, title: 'Disponibilidad', subtitle: 'y Cobertura', icon: Clock },
    { id: 4, title: 'Verificación', subtitle: 'y Galería', icon: Camera }
  ]

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    updateCompletionPercentage()
  }

  // Smart validation functions
  const validateRucCedula = (value: string) => {
    const len = value.length
    if (len === 10) {
      return { text: '✓ Cédula válida', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-300' }
    } else if (len === 13) {
      return { text: '✓ RUC válido', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-300' }
    } else if (len < 10 && len > 0) {
      return { 
        text: `Faltan ${10 - len} dígitos para Cédula`, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-50', 
        borderColor: 'border-orange-300'
      }
    } else if (len > 10 && len < 13) {
      return { 
        text: `Faltan ${13 - len} dígitos para RUC`, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-50', 
        borderColor: 'border-orange-300'
      }
    } else if (len > 13) {
      return { text: 'Máximo 13 dígitos', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300' }
    }
    return { text: 'Ingresa Cédula (10 dígitos) o RUC (13 dígitos)', color: 'text-gray-500', bgColor: '', borderColor: 'border-gray-300' }
  }

  const handleRucCedulaChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 13)
    updateFormData('rucCedula', cleaned)
  }

  const handlePhoneChange = (value: string) => {
    // Remove country code and format
    let cleaned = value.replace(/^\+593\s?/, '').replace(/\D/g, '')
    
    // Format as user types: 9 1234 5678
    if (cleaned.length > 1) {
      cleaned = cleaned.slice(0, 1) + ' ' + 
                cleaned.slice(1, 5) + ' ' + 
                cleaned.slice(5, 9)
    }
    
    updateFormData('phone', cleaned.slice(0, 11)) // Max length with spaces
  }

  const validatePhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 9 && numbers.startsWith('9')) {
      return { text: '✓ Número válido', color: 'text-green-600' }
    } else if (numbers.length > 0) {
      return { text: `Faltan ${9 - numbers.length} dígitos`, color: 'text-orange-600' }
    }
    return { text: 'Formato: 9 XXXX XXXX', color: 'text-gray-500' }
  }

  const validateDescription = (text: string) => {
    if (text.length >= 50) {
      return { text: `${text.length}/500 caracteres ✓ Mínimo alcanzado`, color: 'text-green-600' }
    } else if (text.length > 0) {
      return { text: `${text.length}/500 - Mínimo 50 caracteres (faltan ${50 - text.length})`, color: 'text-orange-600' }
    }
    return { text: '0/500 - Mínimo 50 caracteres', color: 'text-gray-500' }
  }

  const updateCompletionPercentage = () => {
    // Calculate completion based on filled required fields
    const requiredFields = [
      formData.name, formData.rucCedula, formData.phone, formData.category,
      formData.description, formData.hourlyRate > 0, formData.coverageZones.length > 0
    ]
    const completed = requiredFields.filter(Boolean).length
    const percentage = Math.round((completed / requiredFields.length) * 100)
    setCompletionPercentage(Math.max(25, percentage))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.rucCedula && formData.phone && formData.category && formData.description
      case 2:
        return formData.hourlyRate > 0 && formData.paymentMethods.length > 0
      case 3:
        return formData.coverageZones.length > 0 || formData.coversAllCuenca
      case 4:
        return true // Optional step
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Prepare data for API
      const providerData = {
        name: formData.name,
        service_type: formData.category,
        description: formData.description,
        location: formData.coverageZones.join(', '),
        phone: formData.phone,
        rating: 5.0,
        verified: false,
        type: formData.accountType,
        experience_years: formData.experienceYears,
        // Extended fields
        account_type: formData.accountType,
        ruc_cedula: formData.rucCedula,
        pricing_model: formData.pricingModel,
        hourly_rate: formData.hourlyRate,
        minimum_visit: formData.minimumVisit,
        guarantee_period: formData.guaranteePeriod,
        emergency_available: formData.emergencyService,
        emergency_surcharge: formData.emergencySurcharge,
        profile_image_url: formData.profileImage[0] || null,
        gallery_images: formData.galleryImages,
        certification_documents: formData.certificationDocs
      }

      const response = await fetch('/api/providers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(providerData)
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Error al registrarse. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4 animate-pulse">
            EC
          </div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Not signed in
  if (!isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Necesitas crear una cuenta
          </h1>
          <p className="text-gray-600 mb-6">
            Para registrarte como profesional, primero debes crear una cuenta gratuita.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/sign-up"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors text-center"
            >
              Crear Cuenta
            </Link>
            <Link 
              href="/sign-in?redirect_url=/providers/register-v2"
              className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-center"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Solicitud Enviada con Éxito!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu perfil está en revisión. Recibirás una notificación en 24-48 horas.
          </p>
          <div className="space-y-3">
            <Link href="/" className="block w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              Volver al Inicio
            </Link>
            <Link href="/my-provider-profile" className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Ver Mi Perfil Pendiente
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Únete como Profesional</h1>
              <p className="text-gray-600">Crea tu perfil completo en EcuaCasa</p>
            </div>
            <Link href="/providers/register" className="text-sm text-purple-600 hover:text-purple-700">
              ← Formulario Simple
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Perfil {completionPercentage}% completo
              </span>
              <span className="text-xs text-gray-500">
                Perfiles completos reciben 3x más clientes
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                    ${currentStep === step.id 
                      ? 'bg-purple-600 text-white' 
                      : currentStep > step.id 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-xs font-medium text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.subtitle}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 mt-5
                    ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Información Básica</h2>
                <p className="text-gray-600">Cuéntanos sobre tu servicio</p>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo o Empresa *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Carlos Test"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Cuenta *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="individual"
                          checked={formData.accountType === 'individual'}
                          onChange={(e) => updateFormData('accountType', e.target.value)}
                          className="mr-2"
                        />
                        Profesional Independiente
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="business"
                          checked={formData.accountType === 'business'}
                          onChange={(e) => updateFormData('accountType', e.target.value)}
                          className="mr-2"
                        />
                        Empresa con RUC
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RUC/Cédula *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.rucCedula}
                        onChange={(e) => handleRucCedulaChange(e.target.value)}
                        placeholder="1234567890"
                        maxLength={13}
                        className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                          validateRucCedula(formData.rucCedula).borderColor
                        } ${validateRucCedula(formData.rucCedula).bgColor}`}
                      />
                      <div className={`text-xs mt-1 ${validateRucCedula(formData.rucCedula).color}`}>
                        {validateRucCedula(formData.rucCedula).text}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center pt-8">
                    <input
                      type="checkbox"
                      checked={formData.emiteFactor}
                      onChange={(e) => updateFormData('emiteFactor', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Emito facturas</label>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Información de Contacto
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono/WhatsApp *
                    </label>
                    <div className="relative">
                      <div className="flex">
                        <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl text-gray-600 font-medium">
                          +593
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="9 1234 5678"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className={`text-xs mt-1 ${validatePhone(formData.phone).color}`}>
                        {validatePhone(formData.phone).text}
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <input
                        type="checkbox"
                        checked={formData.whatsappActive}
                        onChange={(e) => updateFormData('whatsappActive', e.target.checked)}
                        className="mr-2 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label className="text-sm text-gray-700 flex items-center gap-1">
                        <span className="text-green-600">📱</span>
                        WhatsApp activo para clientes
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono Secundario (Opcional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneSecondary}
                      onChange={(e) => updateFormData('phoneSecondary', e.target.value)}
                      placeholder="+593 _________"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Service Specialization */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Especialización Principal
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría Principal *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        updateFormData('category', e.target.value)
                        updateFormData('specialties', []) // Reset specialties when category changes
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Selecciona una categoría</option>
                      {Object.entries(serviceCategories).map(([group, services]) => (
                        <optgroup key={group} label={group}>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {formData.category && specialtiesByCategory[formData.category] && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Especialidades (selecciona hasta 3) *
                      </label>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500 mb-3">
                          {formData.specialties.length}/3 especialidades seleccionadas
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          {specialtiesByCategory[formData.category].map(specialty => {
                            const isSelected = formData.specialties.includes(specialty)
                            const isDisabled = !isSelected && formData.specialties.length >= 3
                            
                            return (
                              <label 
                                key={specialty} 
                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'bg-purple-50 border-purple-300 text-purple-900' 
                                    : isDisabled 
                                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                      : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    if (e.target.checked && formData.specialties.length < 3) {
                                      updateFormData('specialties', [...formData.specialties, specialty])
                                    } else if (!e.target.checked) {
                                      updateFormData('specialties', formData.specialties.filter(s => s !== specialty))
                                    }
                                  }}
                                  disabled={isDisabled}
                                  className="mr-3 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <span className="text-sm font-medium">{specialty}</span>
                                {isSelected && (
                                  <span className="ml-auto text-purple-600">✓</span>
                                )}
                              </label>
                            )
                          })}
                        </div>
                        {formData.specialties.length === 3 && (
                          <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                            ✓ Perfecto! Has seleccionado 3 especialidades
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Años de Experiencia *
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => updateFormData('experienceYears', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} año{i === 0 ? '' : 's'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Professional Description */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Descripción Profesional
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe tu experiencia y servicios *
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      placeholder="Plomero profesional con 6 años de experiencia. Especializado en reparaciones e instalaciones. Trabajo garantizado, presupuesto sin costo. Atención rápida y profesional."
                      rows={4}
                      maxLength={500}
                      className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                        formData.description.length >= 50 ? 'border-green-300 bg-green-50' : 
                        formData.description.length > 0 ? 'border-orange-300 bg-orange-50' : 'border-gray-300'
                      }`}
                    />
                    <div className={`text-xs mt-1 ${validateDescription(formData.description).color}`}>
                      {validateDescription(formData.description).text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Services & Pricing - We'll add this next */}
          {currentStep === 2 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Servicios y Precios</h2>
              <p className="text-gray-600">Esta sección está en desarrollo...</p>
            </div>
          )}

          {/* Step 3: Availability & Coverage - We'll add this next */}
          {currentStep === 3 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disponibilidad y Cobertura</h2>
              <p className="text-gray-600">Esta sección está en desarrollo...</p>
            </div>
          )}

          {/* Step 4: Verification & Gallery - We'll add this next */}
          {currentStep === 4 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verificación y Galería</h2>
              <p className="text-gray-600">Esta sección está en desarrollo...</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 border border-purple-300 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                <Save className="w-4 h-4" />
                Guardar Borrador
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar para Revisión'}
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}