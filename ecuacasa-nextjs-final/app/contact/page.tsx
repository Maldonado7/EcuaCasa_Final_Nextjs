'use client'

import Link from 'next/link'
import { useTranslation } from '../context/TranslationContext'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <span>←</span> {t('back.home')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {t('contact.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
            {t('contact.digital.badge')}
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="bg-red-50 border-l-4 border-red-500 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="text-red-500 text-3xl">🚨</div>
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">{t('contact.emergency.title')}</h2>
              <p className="text-red-700 mb-4 text-lg font-medium">
                <strong>{t('contact.emergency.warning')}</strong>
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">🏥 Medical Emergencies</h3>
                  <p className="text-red-700 text-lg font-bold">{t('contact.emergency.medical')}</p>
                  <p className="text-red-600 text-sm">{t('contact.emergency.red.cross')}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">🔥 Fire Department</h3>
                  <p className="text-red-700 text-lg font-bold">{t('contact.emergency.medical')}</p>
                  <p className="text-red-600 text-sm">{t('contact.emergency.fire')}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">👮 Police</h3>
                  <p className="text-red-700 text-lg font-bold">{t('contact.emergency.medical')}</p>
                  <p className="text-red-600 text-sm">ECU911: Ecuador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Platform Notice */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-white text-4xl mb-4">💻</div>
          <h2 className="text-3xl font-bold text-white mb-4">{t('contact.digital.title')}</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            {t('contact.digital.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {t('contact.digital.feature1')}
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {t('contact.digital.feature2')}
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {t('contact.digital.feature3')}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.support.channels')}</h2>
          <p className="text-gray-600">{t('contact.support.choose')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          
          {/* Customer Support */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="text-blue-600 text-3xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.customer.support')}</h3>
            <p className="text-gray-600 mb-4">{t('contact.customer.description')}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>WhatsApp:</strong> <span className="text-orange-600">{t('contact.whatsapp.coming')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Email:</strong> support@ecuacasa.com
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Horario:</strong> {t('contact.hours.customer')}
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Enviar Email
            </button>
          </div>

          {/* Professional Support */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="text-green-600 text-3xl mb-4">👨‍🔧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.professional.support')}</h3>
            <p className="text-gray-600 mb-4">{t('contact.professional.description')}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Email:</strong> professionals@ecuacasa.com
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Horario:</strong> {t('contact.hours.professional')}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>Respuesta:</strong> {t('contact.response.time')}
              </div>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Contactar Profesionales
            </button>
          </div>

          {/* Business & Legal */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="text-purple-600 text-3xl mb-4">🏢</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.legal.support')}</h3>
            <p className="text-gray-600 mb-4">{t('contact.legal.description')}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Email:</strong> legal@ecuacasa.com
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Horario:</strong> {t('contact.hours.legal')}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <strong>Respuesta:</strong> {t('contact.response.legal')}
              </div>
            </div>
            <button className="mt-4 w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Contactar Legal
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('contact.faq.title')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">❓</span>
                {t('contact.faq.how.works')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('contact.faq.how.works.answer')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">✅</span>
                {t('contact.faq.verified')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('contact.faq.verified.answer')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-red-600">⚠️</span>
                {t('contact.faq.problems')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('contact.faq.problems.answer')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">👨‍🔧</span>
                {t('contact.faq.register')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('contact.faq.register.answer')}
              </p>
            </div>
          </div>
        </div>

        {/* Safety Guidelines */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
            <span className="text-3xl">⚠️</span>
            {t('contact.safety.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="text-green-600">✅</span>
                {t('contact.safety.do')}
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
                <span className="text-red-600">❌</span>
                {t('contact.safety.dont')}
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
              <strong>Recuerda:</strong> {t('contact.safety.reminder')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}