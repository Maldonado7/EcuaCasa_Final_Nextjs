import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profesional no encontrado - EcuaCasa',
  description: 'El profesional que buscas no existe o ha sido eliminado.',
  robots: 'noindex, follow'
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl mx-auto mb-6">
          ?
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Profesional no encontrado</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          El profesional que buscas no existe o ha sido eliminado. 
          Te invitamos a explorar otros profesionales verificados en nuestra plataforma.
        </p>
        <div className="space-y-3">
          <Link href="/providers" className="block">
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
              Ver Todos los Profesionales
            </button>
          </Link>
          <Link href="/" className="block">
            <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
              Ir al Inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}