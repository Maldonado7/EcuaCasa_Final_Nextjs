import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <span>←</span> Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Términos de Servicio
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            EcuaCasa - Marketplace digital de servicios
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Operado desde EE.UU. • Marketplace como Uber/Airbnb
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
              <h3 className="text-lg font-bold text-red-800 mb-2">Importante: No para Emergencias</h3>
              <p className="text-red-700 text-sm mb-3">
                <strong>EcuaCasa es una plataforma no apta para emergencias.</strong> Para situaciones urgentes:
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-medium">🚑 Emergencias: 911</span>
                <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-medium">🏥 Cruz Roja: 131</span>
                <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-medium">🚒 Bomberos: 102</span>
                <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-medium">👮 Policía: ECU911</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Platform Information */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-green-800 mb-2">Sobre EcuaCasa</h2>
          <p className="text-green-700 text-sm">
            EcuaCasa es un marketplace digital con sede en Estados Unidos que facilita conexiones 
            entre usuarios y profesionales de servicios en Ecuador. Operamos como plataforma intermediaria 
            similar a Uber, Airbnb o TaskRabbit - <strong>no somos empleadores de los profesionales</strong> 
            ni prestamos servicios directamente.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar EcuaCasa, aceptas estar legalmente obligado por estos 
            Términos de Servicio y nuestra Política de Privacidad. Si no estás de acuerdo 
            con estos términos, no debes usar nuestros servicios.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
            <p className="text-sm text-blue-700 mb-0">
              <strong>Requisito de Edad:</strong> Debes tener al menos 18 años para usar EcuaCasa. 
              Al registrarte, confirmas que cumples con este requisito de edad.
            </p>
          </div>

          <h2>2. Descripción del Servicio</h2>
          <p>
            EcuaCasa es una plataforma tecnológica que conecta usuarios con profesionales 
            independientes verificados para servicios del hogar en Ecuador. Actuamos como 
            <strong> intermediario digital facilitando estas conexiones</strong>, pero no somos 
            empleadores ni contratistas directos de los profesionales.
          </p>

          <h3>Nuestros servicios incluyen:</h3>
          <div className="bg-gray-50 p-4 rounded-lg my-4">
            <ul className="text-sm space-y-1 mb-0">
              <li>• Plataforma web y móvil para búsqueda de profesionales</li>
              <li>• Sistema de verificación digital de identidad de proveedores</li>
              <li>• Sistema de calificaciones y reseñas bidireccional</li>
              <li>• Procesamiento seguro de pagos (a través de terceros certificados)</li>
              <li>• Soporte al cliente y mediación de disputas</li>
              <li>• Herramientas de comunicación segura en plataforma</li>
            </ul>
          </div>

          <h2>3. Registro y Cuentas de Usuario</h2>
          <p>
            Para utilizar EcuaCasa, debes crear una cuenta proporcionando 
            información precisa y completa. Eres responsable de:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">✅ Tus Responsabilidades</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Mantener la confidencialidad de tu contraseña</li>
                <li>• Proporcionar información veraz y actualizada</li>
                <li>• Notificar uso no autorizado inmediatamente</li>
                <li>• Ser mayor de 18 años</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">🔒 Seguridad de Cuenta</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Una cuenta por persona/empresa</li>
                <li>• Verificación de email obligatoria</li>
                <li>• Actualizar datos cuando cambien</li>
                <li>• Proteger acceso a tu dispositivo</li>
              </ul>
            </div>
          </div>

          <h2>4. Uso Aceptable de la Plataforma</h2>
          <p>Al usar EcuaCasa, te comprometes a seguir estas reglas:</p>

          <h3>Está Permitido</h3>
          <ul>
            <li>Buscar y contratar profesionales para servicios legítimos</li>
            <li>Proporcionar información veraz en tu perfil</li>
            <li>Comunicarte de manera respetuosa con otros usuarios</li>
            <li>Usar la plataforma únicamente para fines legales</li>
            <li>Reportar actividad sospechosa o problemática</li>
          </ul>

          <h3>Está Prohibido</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
            <ul className="text-sm text-red-700 space-y-1 mb-0">
              <li>❌ Crear múltiples cuentas o cuentas falsas</li>
              <li>❌ Publicar contenido ofensivo, discriminatorio o ilegal</li>
              <li>❌ Intentar acceder sin autorización a otros sistemas</li>
              <li>❌ Usar robots, scripts o herramientas automatizadas</li>
              <li>❌ Contactar inicialmente a profesionales fuera de la plataforma</li>
              <li>❌ Evadir comisiones o pagos a través de la plataforma</li>
              <li>❌ Usar la plataforma para situaciones de emergencia</li>
            </ul>
          </div>

          <h2>5. Profesionales de Servicios</h2>
          <p>Los profesionales que se registran en EcuaCasa son <strong>contratistas independientes</strong>, no empleados. Deben cumplir con:</p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <h4 className="font-bold text-yellow-800 mb-2">📋 Requisitos Profesionales</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Poseer licencias y certificaciones requeridas por ley</li>
              <li>• Mantener seguros de responsabilidad civil adecuados</li>
              <li>• Proporcionar servicios de calidad profesional</li>
              <li>• Cumplir con todas las leyes laborales y fiscales aplicables</li>
              <li>• Tratar a los clientes con respeto y profesionalismo</li>
              <li>• Completar verificación de antecedentes e identidad</li>
            </ul>
          </div>

          <h2>6. Pagos, Comisiones y Tarifas</h2>
          <p>
            Los pagos por servicios se procesan a través de proveedores de pago seguros certificados. 
            EcuaCasa cobra comisiones por facilitar estas transacciones:
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h4 className="font-bold text-blue-800 mb-2">👥 Para Usuarios</h4>
              <p className="text-2xl font-bold text-blue-600 mb-1">GRATIS</p>
              <p className="text-xs text-blue-700">Uso básico de la plataforma</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h4 className="font-bold text-green-800 mb-2">👨‍🔧 Para Profesionales</h4>
              <p className="text-2xl font-bold text-green-600 mb-1">3-5%</p>
              <p className="text-xs text-green-700">Comisión por transacción completada</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h4 className="font-bold text-purple-800 mb-2">⭐ Servicios Premium</h4>
              <p className="text-2xl font-bold text-purple-600 mb-1">OPCIONAL</p>
              <p className="text-xs text-purple-700">Características adicionales</p>
            </div>
          </div>

          <h2>7. Cancelaciones y Reembolsos</h2>
          <p>Las políticas de cancelación dependen del tipo de servicio y profesional:</p>

          <h3>Políticas Estándar</h3>
          <ul>
            <li><strong>Usuarios:</strong> Pueden cancelar según la política específica del profesional</li>
            <li><strong>Profesionales:</strong> Deben dar aviso razonable (mínimo 24 horas) para cancelaciones</li>
            <li><strong>Reembolsos:</strong> Se procesan según las políticas individuales de cada profesional</li>
            <li><strong>Disputas:</strong> EcuaCasa puede mediar en casos de desacuerdo</li>
          </ul>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4">
            <h4 className="font-bold text-orange-800 mb-2">⚖️ Resolución de Disputas</h4>
            <p className="text-sm text-orange-700">
              En caso de desacuerdos sobre pagos o servicios, EcuaCasa ofrece mediación digital. 
              Todas las disputas se resuelven través de arbitraje online, no en tribunales tradicionales.
            </p>
          </div>

          <h2>8. Sistema de Calificaciones y Reseñas</h2>
          <p>
            Nuestro sistema de reseñas bidireccional permite retroalimentación honesta y constructiva:
          </p>

          <h3>Reglas del Sistema de Reseñas</h3>
          <ul>
            <li>Las reseñas deben basarse en experiencias reales de servicios</li>
            <li>Prohibimos reseñas falsas, manipuladas o pagadas</li>
            <li>Nos reservamos el derecho de eliminar contenido inapropiado</li>
            <li>Las calificaciones influyen en la visibilidad de profesionales</li>
            <li>Tanto usuarios como profesionales pueden calificarse mutuamente</li>
          </ul>

          <h2>9. Limitaciones de Responsabilidad</h2>
          
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 my-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">⚠️ Importante: EcuaCasa es Solo el Intermediario</h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>EcuaCasa actúa únicamente como plataforma de conexión.</strong> No somos responsables de:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• La calidad, seguridad o legalidad de los servicios prestados</li>
              <li>• Daños, lesiones o pérdidas durante la prestación de servicios</li>
              <li>• Disputas directas entre usuarios y profesionales</li>
              <li>• Interrupciones técnicas o errores en la plataforma</li>
              <li>• Acciones u omisiones de profesionales independientes</li>
              <li>• Cumplimiento de leyes locales por parte de profesionales</li>
            </ul>
          </div>

          <h2>10. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de EcuaCasa, incluyendo diseño, código, logotipos, texto y marca, 
            está protegido por derechos de autor y otras leyes de propiedad intelectual. 
          </p>

          <h3>Lo que NO puedes hacer:</h3>
          <ul>
            <li>Copiar o reproducir nuestro diseño o funcionalidad</li>
            <li>Usar nuestras marcas registradas sin permiso</li>
            <li>Distribuir nuestro contenido fuera de la plataforma</li>
            <li>Crear servicios competidores usando nuestro código</li>
          </ul>

          <h2>11. Modificaciones del Servicio</h2>
          <p>
            Como plataforma tecnológica en constante evolución, nos reservamos el derecho de:
          </p>
          <ul>
            <li>Modificar o discontinuar servicios con 30 días de aviso previo</li>
            <li>Actualizar estos términos ocasionalmente (con notificación)</li>
            <li>Suspender cuentas que violen estos términos</li>
            <li>Cambiar estructura de precios con 60 días de notificación</li>
          </ul>

          <h2>12. Terminación de Cuentas</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">👤 Terminación por tu Parte</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Puedes eliminar tu cuenta en cualquier momento</li>
                <li>• Proceso de eliminación disponible en configuración</li>
                <li>• Algunos datos se conservan por obligaciones legales</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-800 mb-2">🚫 Terminación por Nuestra Parte</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Por violación de estos términos</li>
                <li>• Por actividad fraudulenta o sospechosa</li>
                <li>• Por razones comerciales con aviso</li>
              </ul>
            </div>
          </div>

          <h2>13. Ley Aplicable y Jurisdicción</h2>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-4">
            <h4 className="font-bold text-purple-800 mb-2">⚖️ Marco Legal</h4>
            <p className="text-sm text-purple-700">
              <strong>EcuaCasa opera desde Estados Unidos.</strong> Estos términos se rigen por las leyes 
              federales de EE.UU. y del estado donde operamos. Las disputas se resuelven through 
              arbitraje digital vinculante, no en tribunales tradicionales. Esto permite resolución 
              más rápida y económica de conflictos.
            </p>
          </div>

          <h2>14. Consejos de Seguridad para Usuarios</h2>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 my-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              Guía de Seguridad EcuaCasa
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  Prácticas Recomendadas:
                </h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• Siempre verifica credenciales del profesional en la plataforma</li>
                  <li>• Lee reseñas y calificaciones de otros clientes</li>
                  <li>• Mantén comunicación inicial a través de EcuaCasa</li>
                  <li>• Solicita presupuestos detallados por escrito</li>
                  <li>• Documenta el trabajo realizado con fotos</li>
                  <li>• Usa métodos de pago rastreables</li>
                  <li>• Reporta problemas inmediatamente</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  Evitar Estas Acciones:
                </h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• No pagues grandes cantidades por adelantado en efectivo</li>
                  <li>• No compartas información bancaria por chat directo</li>
                  <li>• No permitas trabajos sin cotización previa</li>
                  <li>• No ignores señales de alarma o comportamientos extraños</li>
                  <li>• No uses la plataforma para situaciones de emergencia</li>
                  <li>• No evadas el sistema de pago de la plataforma</li>
                  <li>• No olvides calificar y revisar el servicio recibido</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>15. Contacto y Soporte</h2>
          <p>
            Para preguntas sobre estos términos, reportar violaciones o obtener soporte:
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h4 className="font-bold text-blue-800 mb-2">📧 Legal</h4>
              <p className="text-sm text-blue-700 mb-2">legal@ecuacasa.com</p>
              <p className="text-xs text-blue-600">Lun-Vie 9:00-17:00 EST</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h4 className="font-bold text-green-800 mb-2">💬 Soporte</h4>
              <p className="text-sm text-green-700 mb-2">support@ecuacasa.com</p>
              <p className="text-xs text-green-600">Lun-Dom 8:00-22:00 EST</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h4 className="font-bold text-purple-800 mb-2">👨‍🔧 Profesionales</h4>
              <p className="text-sm text-purple-700 mb-2">professionals@ecuacasa.com</p>
              <p className="text-xs text-purple-600">Lun-Vie 9:00-18:00 EST</p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-bold text-green-800 mb-2">Compromiso con Ecuador</h3>
            <p className="text-sm text-green-700">
              <strong>Aunque operamos desde EE.UU., nuestro compromiso es con Ecuador.</strong> 
              EcuaCasa se dedica a conectar hogares ecuatorianos con profesionales locales de confianza, 
              creando oportunidades económicas y mejorando la calidad de vida. Al usar nuestra plataforma, 
              confirmas que has leído y aceptado estos términos de servicio.
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/privacy" 
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            Ver Política de Privacidad →
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