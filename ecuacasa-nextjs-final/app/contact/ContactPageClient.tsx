'use client'

import Link from 'next/link'
import { useTranslation } from '../context/TranslationContext'

export default function ContactPageClient() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <span>←</span> Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Soporte 100% digital las 24 horas
          </p>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
            Plataforma Digital • Sin oficinas físicas
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="bg-red-50 border-l-4 border-red-500 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="text-red-500 text-3xl">🚨</div>
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">¿Emergencia Inmediata?</h2>
              <p className="text-red-700 mb-4 text-lg font-medium">
                <strong>NO uses esta plataforma para emergencias. Llama directamente a los servicios de emergencia:</strong>
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">🏥 Medical Emergencies</h3>
                  <p className="text-red-700 text-lg font-bold">Emergencias: 911</p>
                  <p className="text-red-600 text-sm">Cruz Roja Ecuador: 131</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">🔥 Fire Department</h3>
                  <p className="text-red-700 text-lg font-bold">Emergencias: 911</p>
                  <p className="text-red-600 text-sm">Bomberos: 102</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">👮 Police</h3>
                  <p className="text-red-700 text-lg font-bold">Emergencias: 911</p>
                  <p className="text-red-600 text-sm">ECU911: Ecuador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Platform Info */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-white text-4xl mb-4">💻</div>
          <h2 className="text-3xl font-bold text-white mb-4">Somos 100% Digital</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            EcuaCasa es una plataforma tecnológica como Uber o Airbnb. Operamos completamente en línea para servir a todo Ecuador de manera eficiente. ¡No necesitas visitar ninguna oficina física!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Todo se maneja digitalmente
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Servicio a todo Ecuador
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Sin citas presenciales
            </div>
          </div>
        </div>
      </div>

      {/* Contact Channels */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Canales de Soporte</h2>
          <p className="text-gray-600">Elige el canal que mejor se adapte a tu consulta</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Customer Support */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="text-blue-600 text-3xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Soporte al Cliente</h3>
            <p className="text-gray-600 mb-4">Para consultas generales, problemas con servicios o soporte técnico</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>WhatsApp:</strong> <span className="text-orange-600">Próximamente</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Email:</strong> support@ecuacasa.com
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Horario:</strong> Lun-Dom 8:00-22:00 EST
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Enviar Email
            </button>
          </div>

          {/* Professional Support */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="text-green-600 text-3xl mb-4">👨‍🔧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Soporte Profesionales</h3>
            <p className="text-gray-600 mb-4">Para profesionales registrados: pagos, verificación, perfil</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Email:</strong> professionals@ecuacasa.com
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Horario:</strong> Lun-Vie 9:00-18:00 EST
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>Respuesta:</strong> 24-48 horas
              </div>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Contactar Profesionales
            </button>
          </div>

          {/* Legal Support */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="text-purple-600 text-3xl mb-4">🏢</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Comercial y Legal</h3>
            <p className="text-gray-600 mb-4">Alianzas empresariales, prensa, asuntos legales, quejas formales</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Email:</strong> legal@ecuacasa.com
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Horario:</strong> Lun-Vie 9:00-17:00 EST
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <strong>Respuesta:</strong> 3-5 días hábiles
              </div>
            </div>
            <button className="mt-4 w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Contactar Legal
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Preguntas Frecuentes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">❓</span>¿Cómo funciona EcuaCasa?
              </h4>
              <p className="text-gray-600 text-sm">
                Somos una plataforma digital que conecta usuarios con profesionales verificados en Ecuador. 
                Buscas, contactas, contratas y calificas - todo de forma digital y segura.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">✅</span>¿Los profesionales están verificados?
              </h4>
              <p className="text-gray-600 text-sm">
                Sí, todos pasan verificación de identidad digital, referencias laborales y revisión de antecedentes. 
                Nuestro sistema de verificación es 100% online.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-red-600">⚠️</span>¿Qué pasa si hay problemas?
              </h4>
              <p className="text-gray-600 text-sm">
                Contáctanos por email inmediatamente. Tenemos un sistema de mediación digital, 
                ofrecemos reembolsos cuando aplica y tomamos acciones correctivas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">👨‍🔧</span>¿Cómo me registro como profesional?
              </h4>
              <p className="text-gray-600 text-sm">
                Visita "Soy Profesional", completa tu perfil digital, sube documentos online y espera verificación (24-48 horas). 
                Todo el proceso es digital.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
            <span className="text-3xl">⚠️</span>Consejos de Seguridad Digital
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="text-green-600">✅</span>SÍ Hacer:
              </h4>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  Verifica siempre las credenciales del profesional en la plataforma
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  Revisa calificaciones y reseñas de otros clientes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  Mantén toda comunicación inicial a través de EcuaCasa
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  Solicita presupuestos detallados por escrito
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  Usa métodos de pago rastreables (transferencias, tarjetas)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <span className="text-red-600">❌</span>NO Hacer:
              </h4>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  No pagues grandes cantidades por adelantado en efectivo
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  No compartas información bancaria personal por chat
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  No permitas trabajos sin cotización previa
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  No ignores señales de alarma o comportamientos sospechosos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  No olvides reportar problemas a través de la plataforma
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-sm font-medium flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <strong>Recuerda:</strong> EcuaCasa es tu intermediario digital seguro. 
              Siempre reporta cualquier actividad sospechosa a través de nuestros canales oficiales.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}