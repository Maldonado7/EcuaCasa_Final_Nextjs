'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ExternalLink } from 'lucide-react'

interface ImageGalleryItem {
  url: string
  type: 'profile' | 'work_sample' | 'before_after' | 'certification'
  description?: string
}

interface ProviderImageGalleryProps {
  images: ImageGalleryItem[]
  providerName: string
}

export default function ProviderImageGallery({ 
  images, 
  providerName 
}: ProviderImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentSection, setCurrentSection] = useState<string>('all')

  // Group images by type
  const groupedImages = {
    all: images,
    profile: images.filter(img => img.type === 'profile'),
    work_sample: images.filter(img => img.type === 'work_sample'),
    before_after: images.filter(img => img.type === 'before_after'),
    certification: images.filter(img => img.type === 'certification')
  }

  const sectionTitles = {
    all: 'Todas las Imágenes',
    profile: 'Foto de Perfil',
    work_sample: 'Trabajos Realizados',
    before_after: 'Antes y Después',
    certification: 'Certificaciones'
  }

  const currentImages = groupedImages[currentSection as keyof typeof groupedImages] || []

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null && selectedImage < currentImages.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
  }

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay imágenes disponibles</h3>
          <p className="text-gray-600">
            {providerName} aún no ha subido fotos de sus trabajos
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Galería de {providerName}
        </h3>
        
        {/* Section Filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(sectionTitles).map(([key, title]) => {
            const count = groupedImages[key as keyof typeof groupedImages]?.length || 0
            if (key !== 'all' && count === 0) return null
            
            return (
              <button
                key={key}
                onClick={() => setCurrentSection(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentSection === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {title} {count > 0 && `(${count})`}
              </button>
            )
          })}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="p-6">
        {currentImages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No hay imágenes en esta sección
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.description || `${providerName} - Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-2">
                      <ZoomIn className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    image.type === 'profile' ? 'bg-blue-100 text-blue-700' :
                    image.type === 'work_sample' ? 'bg-green-100 text-green-700' :
                    image.type === 'before_after' ? 'bg-orange-100 text-orange-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {image.type === 'profile' ? 'Perfil' :
                     image.type === 'work_sample' ? 'Trabajo' :
                     image.type === 'before_after' ? 'Antes/Después' :
                     'Certificado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          {currentImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                disabled={selectedImage === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                disabled={selectedImage === currentImages.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            className="max-w-4xl max-h-[90vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={currentImages[selectedImage].url}
                alt={currentImages[selectedImage].description || `${providerName} - Imagen ${selectedImage + 1}`}
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                <div className="text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">
                      {selectedImage + 1} de {currentImages.length}
                    </span>
                    <a
                      href={currentImages[selectedImage].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"
                      title="Abrir imagen en nueva pestaña"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  {currentImages[selectedImage].description && (
                    <p className="text-sm">
                      {currentImages[selectedImage].description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}