import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <span>←</span> Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            EcuaCasa - Plataforma digital de servicios
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Plataforma basada en EE.UU. • Sirviendo Ecuador
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Última actualización: 19 de agosto, 2025
          </p>
        </div>
      </div>

      {/* Emergency Disclaimer */}
      <div className="bg-red-50 border-l-4 border-red-500 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-3">
            <div className="text-red-500 text-2xl">🚨</div>
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Aviso de Emergencia</h3>
              <p className="text-red-700 text-sm mb-3">
                <strong>No uses EcuaCasa para emergencias.</strong> Para situaciones que requieren atención inmediata:
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-medium">🚑 Emergencias: 911</span>
                <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-medium">🏥 Cruz Roja: 131</span>
                <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-medium">🚒 Bomberos: 102</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Platform Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Sobre Nuestra Plataforma</h2>
          <p className="text-blue-700 text-sm">
            EcuaCasa es una plataforma digital con sede en Estados Unidos que conecta usuarios en Ecuador 
            con profesionales de servicios para el hogar. Operamos como un marketplace online, 
            similar a Airbnb o Uber, facilitando conexiones digitales sin oficinas físicas en Ecuador.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Información que Recopilamos</h2>
          
          <h3>Información Personal</h3>
          <p>Cuando te registras en EcuaCasa, recopilamos:</p>
          <ul>
            <li><strong>Datos de cuenta:</strong> Nombre completo, correo electrónico, número de teléfono</li>
            <li><strong>Información de ubicación:</strong> Ciudad, área de servicio, dirección para servicios</li>
            <li><strong>Datos de verificación:</strong> Documentos de identidad para profesionales</li>
            <li><strong>Información de pago:</strong> Métodos de pago procesados por terceros seguros</li>
          </ul>

          <h3>Información Técnica</h3>
          <ul>
            <li>Dirección IP, tipo de navegador y dispositivo</li>
            <li>Datos de uso de la plataforma y preferencias</li>
            <li>Historial de servicios solicitados y proporcionados</li>
            <li>Comunicaciones a través de nuestra plataforma</li>
          </ul>

          <h2>2. Cómo Utilizamos tu Información</h2>
          <p>Como plataforma de intermediación digital, utilizamos tu información para:</p>
          
          <div className="bg-gray-50 p-4 rounded-lg my-4">
            <h4 className="font-bold text-gray-800 mb-2">Propósitos Principales:</h4>
            <ul className="text-sm space-y-1">
              <li>• Conectarte con profesionales verificados en tu área</li>
              <li>• Facilitar comunicación segura entre usuarios y profesionales</li>
              <li>• Procesar pagos y comisiones a través de terceros</li>
              <li>• Verificar identidad de profesionales en nuestra red</li>
              <li>• Enviar notificaciones importantes sobre servicios</li>
              <li>• Mejorar nuestra plataforma y experiencia del usuario</li>
            </ul>
          </div>

          <h2>3. Compartir Información</h2>
          <p>
            <strong>EcuaCasa no vende tu información personal.</strong> Compartimos datos limitados únicamente cuando es necesario:
          </p>

          <h3>Con Profesionales de Servicio</h3>
          <ul>
            <li>Tu información de contacto cuando solicitas un servicio específico</li>
            <li>Ubicación del servicio y detalles del trabajo solicitado</li>
            <li>Historial de calificaciones como referencia de confiabilidad</li>
          </ul>

          <h3>Con Proveedores de Servicios</h3>
          <ul>
            <li><strong>Procesadores de pago:</strong> Para manejar transacciones seguras</li>
            <li><strong>Servicios de verificación:</strong> Para validar identidad de profesionales</li>
            <li><strong>Proveedores de hosting:</strong> Para almacenamiento seguro en servidores de EE.UU.</li>
          </ul>

          <h2>4. Seguridad de los Datos</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
            <h4 className="font-bold text-green-800 mb-2">🔒 Medidas de Protección</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Encriptación SSL/TLS para todas las transmisiones</li>
              <li>• Acceso restringido a información personal (solo personal autorizado)</li>
              <li>• Monitoreo continuo de sistemas y detección de amenazas</li>
              <li>• Auditorías regulares de seguridad por terceros certificados</li>
              <li>• Servidores seguros ubicados en centros de datos certificados en EE.UU.</li>
            </ul>
          </div>

          <h2>5. Tus Derechos</h2>
          <p>Como usuario de EcuaCasa, tienes los siguientes derechos sobre tu información:</p>

          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">Derechos de Acceso</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Solicitar copia de tu información personal</li>
                <li>• Ver cómo procesamos tus datos</li>
                <li>• Obtener historial de actividad en la plataforma</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-800 mb-2">Derechos de Control</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Corregir información incorrecta o desactualizada</li>
                <li>• Eliminar tu cuenta y datos asociados</li>
                <li>• Exportar tus datos en formato estándar</li>
              </ul>
            </div>
          </div>

          <h2>6. Cookies y Tecnologías de Seguimiento</h2>
          <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia:</p>

          <h3>Tipos de Cookies</h3>
          <ul>
            <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico de la plataforma</li>
            <li><strong>Cookies de rendimiento:</strong> Para analizar uso y optimizar funcionalidad</li>
            <li><strong>Cookies de preferencias:</strong> Para recordar configuraciones y idioma</li>
          </ul>

          <p className="text-sm text-gray-600">
            Puedes gestionar cookies desde tu navegador, aunque esto puede afectar algunas funcionalidades.
          </p>

          <h2>7. Retención de Datos</h2>
          <p>Conservamos tu información personal durante:</p>
          <ul>
            <li><strong>Cuentas activas:</strong> Mientras mantengas tu cuenta abierta</li>
            <li><strong>Después del cierre:</strong> Hasta 7 años para cumplir obligaciones legales</li>
            <li><strong>Datos de transacciones:</strong> 10 años según regulaciones financieras</li>
            <li><strong>Cookies:</strong> Hasta 2 años desde la última actividad</li>
          </ul>

          <h2>8. Transferencias Internacionales</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <h4 className="font-bold text-yellow-800 mb-2">📍 Ubicación de Datos</h4>
            <p className="text-sm text-yellow-700">
              EcuaCasa opera desde Estados Unidos. Tu información puede ser procesada y almacenada 
              en servidores ubicados en EE.UU., que cumplen con estándares internacionales de protección 
              de datos y marcos de transferencia segura entre países.
            </p>
          </div>

          <h2>9. Actualizaciones de esta Política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios 
            en nuestros servicios o requisitos legales. Te notificaremos sobre cambios importantes:
          </p>
          <ul>
            <li>Por correo electrónico a tu dirección registrada</li>
            <li>Mediante aviso prominente en la plataforma</li>
            <li>Con al menos 30 días de anticipación para cambios significativos</li>
          </ul>

          <h2>10. Consejos de Seguridad Personal</h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4">
            <h4 className="font-bold text-orange-800 mb-3">⚠️ Para Tu Protección</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-green-700 mb-1">✅ Sí Hacer:</h5>
                <ul className="text-orange-700 space-y-1">
                  <li>• Mantén tu contraseña segura y única</li>
                  <li>• Verifica identidad de profesionales</li>
                  <li>• Usa la plataforma para comunicación inicial</li>
                  <li>• Reporta actividad sospechosa</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-red-700 mb-1">❌ No Hacer:</h5>
                <ul className="text-orange-700 space-y-1">
                  <li>• No compartas datos bancarios por chat</li>
                  <li>• No pagues grandes sumas por adelantado</li>
                  <li>• No ignores señales de alarma</li>
                  <li>• No uses la plataforma para emergencias</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>11. Contacto</h2>
          <p>
            Para preguntas sobre esta Política de Privacidad, ejercer tus derechos o reportar preocupaciones:
          </p>

          <div className="bg-gray-50 p-4 rounded-lg my-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">📧 Privacidad y Protección de Datos</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Email:</strong> privacy@ecuacasa.com</li>
                  <li><strong>Respuesta:</strong> 48-72 horas</li>
                  <li><strong>Idiomas:</strong> Español, Inglés</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">📞 Soporte General</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Email:</strong> support@ecuacasa.com</li>
                  <li><strong>Horario:</strong> Lun-Dom 8:00-22:00 EST</li>
                  <li><strong>Urgente:</strong> Marca como "Privacidad Urgente"</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Compromiso de EcuaCasa</h3>
            <p className="text-sm text-blue-700">
              <strong>Tu privacidad es fundamental para nosotros.</strong> Como plataforma digital que conecta 
              profesionales con usuarios en Ecuador, nos comprometemos a proteger tu información personal 
              según los más altos estándares internacionales de privacidad y seguridad de datos. 
              Esta política cumple con las regulaciones de protección de datos de EE.UU. y Ecuador.
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/terms" 
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            Ver Términos de Servicio →
          </Link>
          <div className="flex gap-3">
            <Link 
              href="/contact"
              className="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg transition-colors"
            >
              Contacto
            </Link>
            <Link 
              href="/" 
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}