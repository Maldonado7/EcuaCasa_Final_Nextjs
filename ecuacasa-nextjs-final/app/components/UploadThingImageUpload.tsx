'use client'

import { useState } from 'react'
import { UploadDropzone } from "../lib/uploadthing"
import { Camera, X, CheckCircle, Image as ImageIcon } from 'lucide-react'

interface UploadThingImageUploadProps {
  endpoint: "providerProfileImage" | "providerGallery" | "beforeAfterPhotos" | "certificationDocuments"
  onUploadComplete?: (urls: string[]) => void
  existingImages?: string[]
  maxFiles?: number
  title?: string
  description?: string
}

export default function UploadThingImageUpload({ 
  endpoint, 
  onUploadComplete, 
  existingImages = [],
  maxFiles = 1, 
  title, 
  description 
}: UploadThingImageUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(existingImages)
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadComplete = (res: any[]) => {
    console.log('Upload completed:', res)
    const urls = res.map(file => file.fileUrl || file.url)
    console.log('Extracted URLs:', urls)
    const newFiles = [...uploadedFiles, ...urls]
    setUploadedFiles(newFiles)
    onUploadComplete?.(newFiles)
    setIsUploading(false)
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload error details:', error)
    setIsUploading(false)
    
    // More specific error message
    let errorMessage = 'Error al subir las imágenes.'
    if (error.message.includes('UNAUTHORIZED')) {
      errorMessage = 'Error de autorización. Por favor recarga la página e intenta de nuevo.'
    } else if (error.message.includes('FILE_SIZE')) {
      errorMessage = 'El archivo es demasiado grande. Máximo 4MB por imagen.'
    } else if (error.message.includes('FILE_TYPE')) {
      errorMessage = 'Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG y WebP.'
    }
    
    alert(errorMessage + ' Detalles: ' + error.message)
  }

  const removeImage = (urlToRemove: string) => {
    const newFiles = uploadedFiles.filter(url => url !== urlToRemove)
    setUploadedFiles(newFiles)
    onUploadComplete?.(newFiles)
  }

  const getEndpointConfig = () => {
    switch (endpoint) {
      case 'providerProfileImage':
        return {
          title: title || 'Foto de Perfil',
          description: description || 'Sube tu foto de perfil profesional (máximo 4MB)',
          maxFiles: 1,
          accept: '.jpg,.jpeg,.png,.webp'
        }
      case 'providerGallery':
        return {
          title: title || 'Galería de Trabajos',
          description: description || 'Muestra ejemplos de tu trabajo (máximo 10 fotos, 4MB cada una)',
          maxFiles: 10,
          accept: '.jpg,.jpeg,.png,.webp'
        }
      case 'beforeAfterPhotos':
        return {
          title: title || 'Fotos Antes/Después',
          description: description || 'Demuestra la calidad de tu trabajo con fotos comparativas (máximo 20 fotos, 4MB cada una)',
          maxFiles: 20,
          accept: '.jpg,.jpeg,.png,.webp'
        }
      case 'certificationDocuments':
        return {
          title: title || 'Documentos de Certificación',
          description: description || 'Sube tus certificados y documentos profesionales (máximo 5 archivos, 8MB cada uno)',
          maxFiles: 5,
          accept: '.jpg,.jpeg,.png,.pdf'
        }
      default:
        return {
          title: 'Subir Archivos',
          description: 'Sube tus archivos',
          maxFiles: maxFiles,
          accept: '.jpg,.jpeg,.png,.webp'
        }
    }
  }

  const config = getEndpointConfig()
  const canUploadMore = uploadedFiles.length < config.maxFiles

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Camera className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">{config.title}</h3>
        </div>
        <p className="text-gray-600">{config.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          {uploadedFiles.length} de {config.maxFiles} archivos
        </p>
      </div>

      {/* Upload Area - Only show if can upload more */}
      {canUploadMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-purple-400 transition-colors">
          <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            onUploadBegin={() => {
              console.log('Upload beginning for endpoint:', endpoint)
              setIsUploading(true)
            }}
            appearance={{
              container: "w-full border-none p-8",
              uploadIcon: "text-purple-600 mb-4",
              button: "bg-purple-600 hover:bg-purple-700 text-white ut-ready:bg-purple-600 ut-uploading:bg-purple-400 px-6 py-3 rounded-lg font-semibold transition-colors",
              label: "text-purple-600 font-medium text-lg mb-2",
              allowedContent: "text-gray-500 text-sm"
            }}
            config={{
              mode: "auto"
            }}
          />
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-center gap-3 text-purple-700">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
            <span className="font-medium">Subiendo archivos...</span>
          </div>
        </div>
      )}

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-600 justify-center">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              {uploadedFiles.length} archivo{uploadedFiles.length !== 1 ? 's' : ''} guardado{uploadedFiles.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((url, index) => (
              <div key={`${url}-${index}`} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                  {url.includes('.pdf') ? (
                    <div className="w-full h-full flex items-center justify-center bg-red-50">
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <span className="text-xs text-red-600 font-medium">PDF</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={url}
                      alt={`Archivo ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gray-200">
                              <div class="text-center">
                                <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-xs text-gray-500">Imagen</span>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  )}
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeImage(url)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                  title="Eliminar archivo"
                >
                  <X className="w-3 h-3" />
                </button>
                
                {/* File Number */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          
          {!canUploadMore && (
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-700 font-medium">
                Has alcanzado el límite máximo de {config.maxFiles} archivos
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Elimina algunos archivos si deseas subir otros nuevos
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {uploadedFiles.length === 0 && !isUploading && (
        <div className="text-center py-8">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No hay archivos subidos</p>
          <p className="text-sm text-gray-400 mt-1">
            {endpoint === 'providerProfileImage' 
              ? 'Sube tu foto de perfil para que los clientes te conozcan'
              : 'Sube imágenes para mostrar la calidad de tu trabajo'
            }
          </p>
        </div>
      )}
    </div>
  )
}