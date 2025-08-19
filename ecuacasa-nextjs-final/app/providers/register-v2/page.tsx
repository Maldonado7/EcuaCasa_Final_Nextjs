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

const specialtiesByCategory: Record<string, Array<{name: string, popular?: boolean}>> = {
  'Plomería': [
    {name: 'Reparación de fugas', popular: true}, 
    {name: 'Instalación de grifos', popular: true}, 
    {name: 'Destape de cañerías', popular: true}, 
    {name: 'Calentadores de agua'}, 
    {name: 'Instalación de bombas'}, 
    {name: 'Mantenimiento preventivo'}
  ],
  'Electricidad': [
    {name: 'Instalación eléctrica', popular: true}, 
    {name: 'Reparación de tomacorrientes', popular: true}, 
    {name: 'Cableado'}, 
    {name: 'Paneles eléctricos'}, 
    {name: 'Iluminación', popular: true}, 
    {name: 'Emergencias eléctricas'}
  ],
  'Carpintería': [
    {name: 'Muebles a medida', popular: true}, 
    {name: 'Reparación de puertas', popular: true}, 
    {name: 'Closets', popular: true}, 
    {name: 'Cocinas'}, 
    {name: 'Pisos de madera'}, 
    {name: 'Trabajos de decoración'}
  ],
  'Muebles y Decoración': [
    {name: 'Fabricación de muebles', popular: true}, 
    {name: 'Diseño a medida', popular: true}, 
    {name: 'Restauración', popular: true}, 
    {name: 'Instalación'}, 
    {name: 'Decoración de interiores'}, 
    {name: 'Tapicería'}
  ],
  'Limpieza': [
    {name: 'Limpieza profunda', popular: true}, 
    {name: 'Limpieza de oficinas', popular: true}, 
    {name: 'Limpieza post-construcción'}, 
    {name: 'Limpieza de alfombras'}, 
    {name: 'Limpieza de vidrios'}, 
    {name: 'Desinfección'}
  ],
  'Jardinería': [
    {name: 'Diseño de jardines', popular: true}, 
    {name: 'Mantenimiento', popular: true}, 
    {name: 'Poda de árboles', popular: true}, 
    {name: 'Sistemas de riego'}, 
    {name: 'Paisajismo'}, 
    {name: 'Control de plagas'}
  ],
  'Pintura': [
    {name: 'Pintura interior', popular: true}, 
    {name: 'Pintura exterior', popular: true}, 
    {name: 'Pintura decorativa'}, 
    {name: 'Empapelado'}, 
    {name: 'Texturizado'}, 
    {name: 'Restauración'}
  ],
  'Cerrajería': [
    {name: 'Cambio de cerraduras', popular: true}, 
    {name: 'Apertura de puertas', popular: true}, 
    {name: 'Llaves duplicadas', popular: true}, 
    {name: 'Cerraduras digitales'}, 
    {name: 'Rejas de seguridad'}, 
    {name: 'Emergencias 24/7'}
  ],
  'Albañilería': [
    {name: 'Construcción', popular: true}, 
    {name: 'Remodelaciones', popular: true}, 
    {name: 'Mampostería'}, 
    {name: 'Pisos y azulejos', popular: true}, 
    {name: 'Reparaciones'}, 
    {name: 'Acabados'}
  ],
  'Electrodomésticos': [
    {name: 'Reparación de neveras', popular: true}, 
    {name: 'Lavadoras y secadoras', popular: true}, 
    {name: 'Cocinas y hornos'}, 
    {name: 'Aires acondicionados', popular: true}, 
    {name: 'Mantenimiento'}, 
    {name: 'Instalación'}
  ],
  'Materiales de Construcción': [
    {name: 'Venta de materiales', popular: true}, 
    {name: 'Asesoría técnica', popular: true}, 
    {name: 'Entrega a domicilio'}, 
    {name: 'Materiales especializados'}, 
    {name: 'Presupuestos', popular: true}, 
    {name: 'Mayoreo'}
  ]
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

  // Ecuadorian ID validation algorithms
  const isValidCedula = (cedula: string): boolean => {
    if (cedula.length !== 10) return false
    
    const digits = cedula.split('').map(Number)
    const province = parseInt(cedula.substring(0, 2))
    
    // Check valid province (01-24)
    if (province < 1 || province > 24) return false
    
    // Validate using algorithm
    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2]
    let sum = 0
    
    for (let i = 0; i < 9; i++) {
      let product = digits[i] * coefficients[i]
      if (product >= 10) product -= 9
      sum += product
    }
    
    const checkDigit = ((Math.ceil(sum / 10) * 10) - sum) % 10
    return checkDigit === digits[9]
  }

  const isValidRUC = (ruc: string): boolean => {
    if (ruc.length !== 13) return false
    
    const thirdDigit = parseInt(ruc[2])
    
    // Natural person RUC (third digit 0-5)
    if (thirdDigit >= 0 && thirdDigit <= 5) {
      return isValidCedula(ruc.substring(0, 10)) && ruc.substring(10) === '001'
    }
    
    // Company RUC (third digit 9)
    if (thirdDigit === 9) {
      const digits = ruc.split('').map(Number)
      const coefficients = [4, 3, 2, 7, 6, 5, 4, 3, 2]
      let sum = 0
      
      for (let i = 0; i < 9; i++) {
        sum += digits[i] * coefficients[i]
      }
      
      const checkDigit = 11 - (sum % 11)
      const finalCheck = checkDigit >= 10 ? 0 : checkDigit
      return finalCheck === digits[9] && ruc.substring(10) === '001'
    }
    
    return false
  }

  // Smart validation functions
  const validateRucCedula = (value: string) => {
    const len = value.length
    if (len === 10) {
      const isValid = isValidCedula(value)
      return isValid
        ? { text: '✓ Cédula válida (10/10)', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-300', icon: '✓' }
        : { text: '⚠️ Esta cédula parece incorrecta. Verifica los dígitos', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300', icon: '⚠️' }
    } else if (len === 13) {
      const isValid = isValidRUC(value)
      return isValid
        ? { text: '✓ RUC válido (13/13)', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-300', icon: '✓' }
        : { text: '⚠️ Este RUC parece incorrecto. Verifica los dígitos', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300', icon: '⚠️' }
    } else if (len < 10 && len > 0) {
      return { 
        text: `Faltan ${10 - len} dígitos para completar tu cédula (${len}/10)`, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-50', 
        borderColor: 'border-orange-300',
        icon: '⏳'
      }
    } else if (len > 10 && len < 13) {
      return { 
        text: `Faltan ${13 - len} dígitos para completar tu RUC (${len}/13)`, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-50', 
        borderColor: 'border-orange-300',
        icon: '⏳'
      }
    } else if (len > 13) {
      return { text: 'Máximo 13 dígitos permitidos', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300', icon: '⚠️' }
    }
    return { text: 'Ingresa tu Cédula (10 dígitos) o RUC (13 dígitos)', color: 'text-gray-500', bgColor: '', borderColor: 'border-gray-300', icon: '📝' }
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
      return { text: '✓ Número móvil válido', color: 'text-green-600', icon: '✓' }
    } else if (numbers.length === 9 && !numbers.startsWith('9')) {
      return { text: '⚠️ Número móvil debe empezar con 9', color: 'text-red-600', icon: '⚠️' }
    } else if (numbers.length > 0 && numbers.length < 9) {
      return { text: `Faltan ${9 - numbers.length} dígitos para completar (${numbers.length}/9)`, color: 'text-orange-600', icon: '⏳' }
    } else if (numbers.length > 9) {
      return { text: '⚠️ Máximo 9 dígitos permitidos', color: 'text-red-600', icon: '⚠️' }
    }
    return { text: 'Formato: 9 XXXX XXXX (números móviles Ecuador)', color: 'text-gray-500', icon: '📱' }
  }

  const validateDescription = (text: string) => {
    if (text.length >= 100 && text.length <= 500) {
      return { text: `${text.length}/500 caracteres ✓ Perfecto`, color: 'text-green-600', icon: '✓' }
    } else if (text.length >= 50) {
      return { text: `${text.length}/500 caracteres ✓ Mínimo alcanzado`, color: 'text-green-600', icon: '✓' }
    } else if (text.length > 0) {
      return { text: `${text.length}/500 - Mínimo 50 caracteres (faltan ${50 - text.length})`, color: 'text-orange-600', icon: '⏳' }
    }
    return { text: '0/500 - Mínimo 50 caracteres requeridos', color: 'text-gray-500', icon: '📝' }
  }

  const getDescriptionTip = () => {
    return "💡 Tip: Menciona tu experiencia, garantías ofrecidas, y qué te diferencia de otros profesionales"
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
        return formData.name && formData.rucCedula && formData.phone && formData.category && formData.description && formData.description.length >= 50
      case 2:
        return (
          formData.pricingModel &&
          formData.paymentMethods.length > 0 &&
          formData.guaranteePeriod > 0 &&
          (formData.pricingModel !== 'hourly' || formData.hourlyRate > 0)
        )
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
                      <div className={`text-xs mt-1 flex items-center gap-1 ${validateRucCedula(formData.rucCedula).color}`}>
                        <span>{validateRucCedula(formData.rucCedula).icon}</span>
                        <span>{validateRucCedula(formData.rucCedula).text}</span>
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
                      <div className={`text-xs mt-1 flex items-center gap-1 ${validatePhone(formData.phone).color}`}>
                        <span>{validatePhone(formData.phone).icon}</span>
                        <span>{validatePhone(formData.phone).text}</span>
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
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-600">
                            Más populares en {formData.category}:
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            formData.specialties.length === 3 
                              ? 'bg-red-100 text-red-600' 
                              : formData.specialties.length > 0
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                          }`}>
                            {formData.specialties.length}/3 seleccionadas
                            {formData.specialties.length === 3 && ' ⚠️ Máximo alcanzado'}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-3">
                          {specialtiesByCategory[formData.category].map(specialty => {
                            const isSelected = formData.specialties.includes(specialty.name)
                            const isDisabled = !isSelected && formData.specialties.length >= 3
                            
                            return (
                              <label 
                                key={specialty.name} 
                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'bg-purple-50 border-purple-300 text-purple-900 ring-1 ring-purple-200' 
                                    : isDisabled 
                                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                      : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-25 hover:shadow-sm'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    if (e.target.checked && formData.specialties.length < 3) {
                                      updateFormData('specialties', [...formData.specialties, specialty.name])
                                    } else if (!e.target.checked) {
                                      updateFormData('specialties', formData.specialties.filter(s => s !== specialty.name))
                                    }
                                  }}
                                  disabled={isDisabled}
                                  className="mr-3 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <div className="flex-1 flex items-center justify-between">
                                  <span className="text-sm font-medium">{specialty.name}</span>
                                  <div className="flex items-center gap-2">
                                    {specialty.popular && (
                                      <span className="text-yellow-500" title="Especialidad popular">⭐</span>
                                    )}
                                    {isSelected && (
                                      <span className="text-purple-600 font-bold">✓</span>
                                    )}
                                  </div>
                                </div>
                              </label>
                            )
                          })}
                        </div>
                        
                        {formData.specialties.length === 3 && (
                          <div className="text-xs text-green-600 bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-2">
                            <span className="text-green-600">✅</span>
                            <span>¡Perfecto! Has seleccionado 3 especialidades. Esto ayudará a los clientes a encontrarte más fácilmente.</span>
                          </div>
                        )}
                        
                        {formData.specialties.length < 3 && formData.specialties.length > 0 && (
                          <div className="text-xs text-blue-600 bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-2">
                            <span className="text-blue-600">💡</span>
                            <span>Puedes seleccionar hasta {3 - formData.specialties.length} especialidad{3 - formData.specialties.length !== 1 ? 'es' : ''} más para mejorar tu visibilidad.</span>
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
                    <div className="space-y-2 mt-2">
                      <div className={`text-xs flex items-center gap-1 ${validateDescription(formData.description).color}`}>
                        <span>{validateDescription(formData.description).icon}</span>
                        <span>{validateDescription(formData.description).text}</span>
                      </div>
                      {formData.description.length < 50 && (
                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
                          {getDescriptionTip()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Services & Pricing */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Servicios y Precios</h2>
                <p className="text-gray-600">Define tus tarifas y forma de cobrar</p>
              </div>

              {/* Pricing Structure */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Estructura de Precios
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ¿Cómo cobras por tus servicios? *
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { value: 'hourly', label: 'Por hora', desc: 'Cobras por tiempo trabajado', icon: '🕐' },
                        { value: 'project', label: 'Por trabajo/proyecto', desc: 'Precio fijo por trabajo completo', icon: '📋' },
                        { value: 'quote', label: 'Cotización según el caso', desc: 'Evalúas cada trabajo individualmente', icon: '📊' }
                      ].map(option => (
                        <label 
                          key={option.value}
                          className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.pricingModel === option.value 
                              ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-200' 
                              : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                          }`}
                        >
                          <input
                            type="radio"
                            value={option.value}
                            checked={formData.pricingModel === option.value}
                            onChange={(e) => updateFormData('pricingModel', e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{option.icon}</span>
                            <span className="font-medium text-gray-900">{option.label}</span>
                            {formData.pricingModel === option.value && (
                              <span className="ml-auto text-purple-600">✓</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-600">{option.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {formData.pricingModel === 'hourly' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Precio por Hora * 💰
                        </label>
                        <div className="relative">
                          <div className="flex">
                            <span className="inline-flex items-center px-3 text-gray-600 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl">
                              $
                            </span>
                            <input
                              type="number"
                              value={formData.hourlyRate || ''}
                              onChange={(e) => updateFormData('hourlyRate', parseFloat(e.target.value) || 0)}
                              placeholder="25"
                              min="5"
                              max="200"
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <span className="inline-flex items-center px-3 text-gray-600 bg-gray-50 border border-l-0 border-gray-300 rounded-r-xl">
                              USD/hora
                            </span>
                          </div>
                          <div className="text-xs mt-1 flex items-center gap-1 text-gray-500">
                            <span>💡</span>
                            <span>Promedio en Cuenca: $15-45 para {formData.category}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio Mínimo de Visita 🚗
                      </label>
                      <div className="relative">
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-gray-600 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl">
                            $
                          </span>
                          <input
                            type="number"
                            value={formData.minimumVisit || ''}
                            onChange={(e) => updateFormData('minimumVisit', parseFloat(e.target.value) || 0)}
                            placeholder="15"
                            min="0"
                            max="100"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <span className="inline-flex items-center px-3 text-gray-600 bg-gray-50 border border-l-0 border-gray-300 rounded-r-xl">
                            USD
                          </span>
                        </div>
                        <div className="text-xs mt-1 text-gray-500">
                          Costo mínimo aunque no realices el trabajo
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.freeEstimate}
                        onChange={(e) => updateFormData('freeEstimate', e.target.checked)}
                        className="mr-3 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label className="text-sm text-gray-700 flex items-center gap-2">
                        <span>🆓</span>
                        Ofrezco diagnóstico/cotización gratuita
                      </label>
                    </div>

                    {!formData.freeEstimate && (
                      <div className="ml-7">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Costo por Cotización
                        </label>
                        <div className="flex items-center gap-2 max-w-xs">
                          <span className="text-sm text-gray-600">$</span>
                          <input
                            type="number"
                            value={formData.quoteFee || ''}
                            onChange={(e) => updateFormData('quoteFee', parseFloat(e.target.value) || 0)}
                            placeholder="10"
                            min="0"
                            max="50"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <span className="text-sm text-gray-600">USD</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Formas de Pago Aceptadas * 💳
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { value: 'cash', label: 'Efectivo', icon: '💵', popular: true },
                        { value: 'bank_transfer', label: 'Transferencia bancaria', icon: '🏦', popular: true },
                        { value: 'credit_card', label: 'Tarjetas de crédito/débito', icon: '💳' },
                        { value: 'check', label: 'Cheque', icon: '📝' }
                      ].map(method => (
                        <label 
                          key={method.value}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.paymentMethods.includes(method.value)
                              ? 'bg-purple-50 border-purple-300 text-purple-900'
                              : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.paymentMethods.includes(method.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFormData('paymentMethods', [...formData.paymentMethods, method.value])
                              } else {
                                updateFormData('paymentMethods', formData.paymentMethods.filter(m => m !== method.value))
                              }
                            }}
                            className="mr-3 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <div className="flex items-center gap-2 flex-1">
                            <span>{method.icon}</span>
                            <span className="text-sm font-medium">{method.label}</span>
                            {method.popular && (
                              <span className="text-yellow-500 text-xs" title="Método popular">⭐</span>
                            )}
                            {formData.paymentMethods.includes(method.value) && (
                              <span className="ml-auto text-purple-600">✓</span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                    {formData.paymentMethods.length === 0 && (
                      <div className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>Debes seleccionar al menos una forma de pago</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Guarantees & Insurance */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Garantías y Seguros
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Garantía de Trabajo * 🛡️
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 30, label: '30 días', popular: true },
                        { value: 60, label: '60 días', popular: true },
                        { value: 90, label: '90 días' },
                        { value: 180, label: '6 meses' }
                      ].map(period => (
                        <label 
                          key={period.value}
                          className={`flex flex-col items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.guaranteePeriod === period.value 
                              ? 'border-purple-500 bg-purple-50 text-purple-900' 
                              : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                          }`}
                        >
                          <input
                            type="radio"
                            value={period.value}
                            checked={formData.guaranteePeriod === period.value}
                            onChange={(e) => updateFormData('guaranteePeriod', parseInt(e.target.value))}
                            className="sr-only"
                          />
                          <span className="font-medium">{period.label}</span>
                          {period.popular && (
                            <span className="text-yellow-500 text-xs">⭐</span>
                          )}
                          {formData.guaranteePeriod === period.value && (
                            <span className="text-purple-600 mt-1">✓</span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.hasInsurance}
                          onChange={(e) => updateFormData('hasInsurance', e.target.checked)}
                          className="mr-3 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span>🛡️</span>
                            <span className="text-sm font-medium">Tengo seguro de responsabilidad civil</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Protege al cliente ante daños accidentales
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.includesMaterials}
                          onChange={(e) => updateFormData('includesMaterials', e.target.checked)}
                          className="mr-3 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span>🔧</span>
                            <span className="text-sm font-medium">Trabajo con materiales incluidos</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Proporcionas todos los materiales necesarios
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.offersContract}
                          onChange={(e) => updateFormData('offersContract', e.target.checked)}
                          className="mr-3 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span>📋</span>
                            <span className="text-sm font-medium">Ofrezco contrato de servicio</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Documentos formales para trabajos grandes
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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