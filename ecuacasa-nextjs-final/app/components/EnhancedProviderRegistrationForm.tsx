'use client'

import { useState } from 'react'
import { useClerkSafe } from '../hooks/useClerkSafe'
import { useTranslation } from '../context/TranslationContext'
import Link from 'next/link'
import { CheckCircle, Camera, FileText, Award, Briefcase } from 'lucide-react'
import UploadThingImageUpload from './UploadThingImageUpload'

export default function EnhancedProviderRegistrationForm() {
  const { useUser } = useClerkSafe()
  const { user, isSignedIn } = useUser()
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    name: '',
    service_type: '',
    service_specialty: '',
    location: 'cuenca',
    phone: '',
    description: '',
    price_range: '',
    price_number: '',
    price_unit: 'hora',
    experience_years: '',
    certifications: ''
  })

  const [imageData, setImageData] = useState({
    profileImage: [] as string[],
    galleryImages: [] as string[],
    beforeAfterImages: [] as string[],
    certificationDocuments: [] as string[]
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

  const steps = [
    { id: 1, title: 'Información Básica', icon: FileText },
    { id: 2, title: 'Foto de Perfil', icon: Camera },
    { id: 3, title: 'Galería de Trabajos', icon: Briefcase },
    { id: 4, title: 'Certificaciones', icon: Award }
  ]

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({...prev, service_type: service, service_specialty: ''}))
    setServiceSpecialties(serviceOptions[service as keyof typeof serviceOptions] || [])
  }

  const handleImageUpload = (type: string, urls: string[]) => {
    setImageData(prev => ({
      ...prev,
      [type]: urls
    }))
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
        type: 'individual',
        experience_years: formData.experience_years,
        certifications: formData.certifications,
        profile_image_url: imageData.profileImage[0] || null,
        gallery_images: imageData.galleryImages,
        before_after_images: imageData.beforeAfterImages,
        certification_documents: imageData.certificationDocuments
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

  const nextStep = () => {
    if (currentStep < steps.length) {
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
        return formData.name && formData.service_type && formData.location && formData.phone && formData.description
      case 2:
        return true // Profile image is optional
      case 3:
        return true // Gallery is optional
      case 4:
        return true // Certifications are optional
      default:
        return false
    }
  }

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
            <Link href="/sign-up">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
                Crear Cuenta
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300">
                Ya tengo cuenta
              </button>
            </Link>
          </div>
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
            Tu perfil de profesional ha sido creado con éxito. Nuestro equipo lo revisará y lo activará en las próximas 24 horas.
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto mb-4">
            🔧
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Únete como Profesional</h1>
          <p className="text-gray-700">Crea tu perfil completo en EcuaCasa</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Información Básica</h2>
                  <p className="text-gray-600">Cuéntanos sobre tu servicio</p>
                </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      <select
                        value={formData.service_specialty}
                        onChange={(e) => setFormData(prev => ({...prev, service_specialty: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Selecciona especialidad</option>
                        {serviceSpecialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona zona</option>
                      <option value="cuenca-centro">El Centro</option>
                      <option value="cuenca-san-joaquin">San Joaquín</option>
                      <option value="cuenca-yanuncay">Yanuncay</option>
                      <option value="cuenca-totoracocha">Totoracocha</option>
                    </select>
                  </div>
                </div>

                {/* Phone and Experience */}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Años de experiencia
                    </label>
                    <input
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({...formData, experience_years: e.target.value})}
                      placeholder="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción de tus servicios
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe tu experiencia, servicios y qué te hace especial..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Profile Image */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Foto de Perfil</h2>
                  <p className="text-gray-600">Sube una foto profesional para que los clientes te conozcan</p>
                </div>

                <UploadThingImageUpload
                  endpoint="providerProfileImage"
                  onUploadComplete={(urls) => handleImageUpload('profileImage', urls)}
                  existingImages={imageData.profileImage}
                  maxFiles={1}
                />
              </div>
            )}

            {/* Step 3: Work Gallery */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Galería de Trabajos</h2>
                  <p className="text-gray-600">Muestra ejemplos de tu trabajo para generar confianza</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <UploadThingImageUpload
                    endpoint="providerGallery"
                    title="Trabajos Realizados"
                    description="Fotos de trabajos que has completado"
                    onUploadComplete={(urls) => handleImageUpload('galleryImages', urls)}
                    existingImages={imageData.galleryImages}
                    maxFiles={10}
                  />

                  <UploadThingImageUpload
                    endpoint="beforeAfterPhotos"
                    title="Antes y Después"
                    description="Muestra la transformación de tus trabajos"
                    onUploadComplete={(urls) => handleImageUpload('beforeAfterImages', urls)}
                    existingImages={imageData.beforeAfterImages}
                    maxFiles={20}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Certifications */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificaciones</h2>
                  <p className="text-gray-600">Sube tus certificados para mostrar tu profesionalismo</p>
                </div>

                <UploadThingImageUpload
                  endpoint="certificationDocuments"
                  title="Certificados y Documentos"
                  description="Certificaciones, títulos o documentos que respalden tu experiencia"
                  onUploadComplete={(urls) => handleImageUpload('certificationDocuments', urls)}
                  existingImages={imageData.certificationDocuments}
                  maxFiles={5}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lista de certificaciones (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.certifications}
                    onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                    placeholder="Ej: Certificado en instalaciones eléctricas, Curso de seguridad industrial..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <div className="text-sm text-gray-500">
                Paso {currentStep} de {steps.length}
              </div>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registrando...' : 'Crear Perfil'}
                </button>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Tu perfil será revisado en 24 horas
            </p>
            <Link href="/" className="text-purple-600 text-sm font-medium hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}