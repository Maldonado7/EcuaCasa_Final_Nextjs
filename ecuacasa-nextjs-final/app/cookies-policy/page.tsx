import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies - EcuaCasa',
  description: 'Información sobre el uso de cookies en EcuaCasa.',
  robots: 'noindex, follow'
}

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">EC</span>
              </div>
              <span className="font-black text-2xl">EcuaCasa</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Cookies</h1>
          <p className="text-xl text-gray-600">Información sobre el uso de cookies en nuestra plataforma</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 prose max-w-none">
          <h2>¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. 
            Nos ayudan a mejorar tu experiencia de navegación y a proporcionar funcionalidades personalizadas.
          </p>

          <h2>Tipos de cookies que utilizamos</h2>
          
          <h3>Cookies esenciales</h3>
          <p>
            Estas cookies son necesarias para el funcionamiento básico del sitio web. 
            Incluyen cookies de autenticación y seguridad que no se pueden desactivar.
          </p>

          <h3>Cookies de análisis</h3>
          <p>
            Utilizamos cookies de análisis para entender cómo los usuarios interactúan con nuestro sitio web. 
            Esto nos ayuda a mejorar nuestros servicios.
          </p>

          <h3>Cookies de funcionalidad</h3>
          <p>
            Estas cookies nos permiten recordar tus preferencias y proporcionar funcionalidades mejoradas.
          </p>

          <h2>Gestión de cookies</h2>
          <p>
            Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador. 
            Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio web.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos a través de nuestra 
            <Link href="/contact" className="text-purple-600 hover:text-purple-700"> página de contacto</Link>.
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link href="/" className="inline-block">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
              Volver al Inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}