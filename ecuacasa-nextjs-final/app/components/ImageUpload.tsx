'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  onImageRemove: (url: string) => void
  images: string[]
  maxImages?: number
  title?: string
}

export default function ImageUpload({ 
  onImageUpload, 
  onImageRemove, 
  images, 
  maxImages = 6,
  title = "Galería de Trabajos"
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    
    // Check if we can add more images
    if (images.length >= maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas`)
      return
    }

    setUploading(true)
    
    try {
      for (let i = 0; i < files.length && images.length + i < maxImages; i++) {
        const file = files[i]
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} no es una imagen válida`)
          continue
        }

        // Create form data
        const formData = new FormData()
        formData.append('file', file)

        // Upload file
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          onImageUpload(result.url)
        } else {
          const error = await response.json()
          alert(`Error subiendo ${file.name}: ${error.error}`)
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error subiendo las imágenes')
    } finally {
      setUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <span className="text-sm text-gray-500">{images.length}/{maxImages}</span>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
          ${dragOver 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }
          ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />
        
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <Loader className="w-8 h-8 text-purple-600 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
          
          <div>
            <p className="font-medium text-gray-900">
              {uploading ? 'Subiendo imágenes...' : 'Haz clic o arrastra imágenes aquí'}
            </p>
            <p className="text-sm text-gray-500">
              JPG, PNG, WebP hasta 5MB cada una
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt={`Trabajo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onImageRemove(imageUrl)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay imágenes en la galería</p>
          <p className="text-sm text-gray-400">Sube fotos de tus trabajos para mostrar tu calidad</p>
        </div>
      )}
    </div>
  )
}