import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

// Blog post data (would typically come from CMS)
const blogPosts: Record<string, {
  title: string
  content: string
  excerpt: string
  category: string
  date: string
  readTime: string
  keywords: string[]
  relatedServices: string[]
}> = {
  'como-elegir-plomero-cuenca': {
    title: 'Cómo Elegir el Mejor Plomero en Cuenca: Guía Completa 2025',
    excerpt: 'Descubre los criterios esenciales para contratar un plomero confiable en Cuenca. Tips, precios y qué preguntar antes de contratar.',
    category: 'Plomería',
    date: '2025-01-15',
    readTime: '5 min',
    keywords: ['plomero Cuenca', 'contratar plomero', 'servicios plomería', 'precios plomero Ecuador'],
    relatedServices: ['plomeria'],
    content: `
# Cómo Elegir el Mejor Plomero en Cuenca: Guía Completa 2025

Contratar un plomero en Cuenca puede ser una decisión importante para tu hogar. Ya sea para una emergencia o un proyecto planificado, elegir al profesional correcto te ahorrará tiempo, dinero y dolores de cabeza.

## ¿Por Qué es Importante Elegir Bien?

Un trabajo de plomería mal ejecutado puede causar:
- **Daños costosos** en tu propiedad
- **Problemas de salud** por fugas o contaminación
- **Gastos adicionales** por reparaciones
- **Pérdida de tiempo** y estrés

## Criterios Esenciales para Elegir un Plomero

### 1. Verificación y Certificaciones

Antes de contratar cualquier plomero en Cuenca, asegúrate de que cuente con:

- **Licencia municipal** vigente
- **Certificaciones técnicas** en plomería
- **Seguro de responsabilidad civil**
- **Referencias verificables** de trabajos anteriores

### 2. Experiencia Comprobada

Un buen plomero debe tener:
- Mínimo **3 años de experiencia** en el campo
- **Especialización** en el tipo de trabajo que necesitas
- **Portfolio** de trabajos realizados
- **Conocimiento** de códigos locales de construcción

### 3. Precios Transparentes

Los mejores plomeros en Cuenca ofrecen:
- **Presupuesto gratuito** y detallado
- **Precios claros** sin sorpresas
- **Tarifas competitivas** del mercado local
- **Garantía** en el trabajo realizado

## Precios Promedio en Cuenca (2025)

| Servicio | Precio Promedio |
|----------|-----------------|
| Visita diagnóstica | $15 - $25 |
| Destape básico | $25 - $40 |
| Reparación grifo | $20 - $35 |
| Instalación sanitario | $50 - $80 |
| Hora de trabajo | $25 - $45 |

## Preguntas Clave Antes de Contratar

### Sobre la Experiencia
- ¿Cuántos años lleva trabajando como plomero?
- ¿Tiene experiencia con mi tipo de problema específico?
- ¿Puede mostrarme referencias de trabajos similares?

### Sobre el Trabajo
- ¿Cuánto tiempo tomará completar el trabajo?
- ¿Qué materiales utilizará?
- ¿Incluye garantía el trabajo?
- ¿Hay costos adicionales que deba considerar?

### Sobre la Logística
- ¿Cuándo puede comenzar el trabajo?
- ¿Trabaja fines de semana o emergencias?
- ¿Cómo maneja los permisos si son necesarios?

## Señales de Alerta: Plomeros a Evitar

🚨 **Evita plomeros que:**
- Soliciten **pago completo por adelantado**
- No proporcionen **presupuesto escrito**
- Aparezcan **sin cita previa** en tu puerta
- No tengan **referencias verificables**
- Ofrezcan **precios excesivamente bajos**

## Cómo Encontrar Plomeros Confiables en Cuenca

### 1. Plataformas Digitales Verificadas
EcuaCasa conecta con plomeros certificados y verificados:
- **Perfiles completos** con experiencia
- **Reseñas reales** de otros clientes
- **Precios transparentes** y competitivos
- **Disponibilidad inmediata**

### 2. Referencias Personales
- Pregunta a **familiares y amigos**
- Consulta en **grupos de vecinos**
- Busca recomendaciones en **redes sociales locales**

### 3. Colegios Profesionales
- Colegio de Técnicos de Azuay
- Asociaciones gremiales locales
- Directorios oficiales

## Proceso Recomendado para Contratar

### Paso 1: Investigación Inicial
- Lista 3-5 plomeros potenciales
- Verifica sus credenciales
- Lee reseñas y testimonios

### Paso 2: Solicita Presupuestos
- Contacta al menos 3 profesionales
- Proporciona detalles específicos del trabajo
- Solicita presupuestos escritos

### Paso 3: Evaluación y Decisión
- Compara precios y servicios
- Verifica disponibilidad
- Confirma garantías y términos

### Paso 4: Seguimiento Post-Servicio
- Inspecciona el trabajo completado
- Guarda documentos y garantías
- Deja reseñas honestas

## Mantenimiento Preventivo: Consejos de Expertos

Para evitar emergencias costosas:

### Revisiones Mensuales
- **Verifica grifos** en busca de goteos
- **Inspecciona tuberías** visibles
- **Limpia desagües** regularmente

### Revisiones Semestrales
- **Revisa la presión** del agua
- **Inspecciona el tanque** de agua caliente
- **Verifica el medidor** de agua

## Servicios de Plomería Más Solicitados en Cuenca

1. **Destape de desagües** (40% de llamadas)
2. **Reparación de grifos** (25% de llamadas)
3. **Instalación de sanitarios** (15% de llamadas)
4. **Reparación de tuberías** (12% de llamadas)
5. **Instalación de sistemas** (8% de llamadas)

## Conclusión

Elegir el plomero correcto en Cuenca requiere investigación y paciencia. No te apresures en la decisión, especialmente para trabajos grandes. Un profesional confiable será transparente, experimentado y respaldará su trabajo con garantías.

**¿Necesitas un plomero confiable ahora?** 

En EcuaCasa verificamos cada profesional y garantizamos calidad en el servicio. Encuentra plomeros certificados en tu zona con presupuestos transparentes y disponibilidad inmediata.

### Artículos Relacionados
- [Mantenimiento Preventivo de Plomería: Guía Completa](/blog/mantenimiento-preventivo-plomeria)
- [Precios de Servicios para el Hogar en Cuenca 2025](/blog/precios-servicios-hogar-cuenca-2025)
- [Emergencias de Plomería: Qué Hacer Antes de que Llegue el Plomero](/blog/emergencias-plomeria-que-hacer)

---

*¿Te ha sido útil esta guía? Compártela con otros propietarios en Cuenca que puedan necesitar estos consejos.*
    `
  },
  'mantenimiento-electrico-hogar': {
    title: '10 Consejos de Mantenimiento Eléctrico para tu Hogar',
    excerpt: 'Mantén tu sistema eléctrico seguro con estos consejos preventivos. Evita accidentes y ahorra dinero en reparaciones.',
    category: 'Electricidad',
    date: '2025-01-12',
    readTime: '7 min',
    keywords: ['mantenimiento eléctrico', 'seguridad eléctrica hogar', 'electricidad doméstica', 'prevención accidentes eléctricos'],
    relatedServices: ['electricidad'],
    content: `
# 10 Consejos de Mantenimiento Eléctrico para tu Hogar

El mantenimiento eléctrico preventivo es fundamental para la seguridad de tu hogar y familia. Siguiendo estos consejos, podrás evitar accidentes y costosas reparaciones.

## ¿Por Qué es Importante el Mantenimiento Eléctrico?

Un sistema eléctrico mal mantenido puede causar:
- **Incendios domésticos** (40% causados por problemas eléctricos)
- **Electrocuciones** y accidentes graves
- **Daños costosos** en electrodomésticos
- **Consumo excesivo** de energía

## 10 Consejos Esenciales de Mantenimiento

### 1. Inspección Visual Mensual
- Revisa cables visibles en busca de grietas o desgaste
- Verifica que no haya cables sueltos o expuestos
- Observa si hay marcas de quemaduras en enchufes

### 2. Prueba de Interruptores de Circuito
- Prueba los breakers mensualmente
- Asegúrate de que se activen correctamente
- Reemplaza interruptores que no funcionen

### 3. Revisión de Enchufes y Tomacorrientes
- Verifica que no estén sobrecargados
- Reemplaza enchufes agrietados o sueltos
- Instala protectores en enchufes no utilizados

### 4. Mantenimiento de Alargadores
- Inspecciona cables de extensión regularmente
- No uses alargadores como solución permanente
- Reemplaza cables dañados inmediatamente

### 5. Limpieza de Tablero Eléctrico
- Mantén el área del tablero libre de obstáculos
- Limpia polvo del tablero con paño seco
- Etiqueta breakers para fácil identificación

### 6. Verificación de Luces
- Reemplaza bombillas fundidas inmediatamente
- Usa vataje correcto según las especificaciones
- Limpia regularmente luminarias y pantallas

### 7. Prueba de Interruptores GFCI
- Prueba mensualmente interruptores de baños y cocina
- Presiona botones "TEST" y "RESET"
- Llama a electricista si no funcionan correctamente

### 8. Inspección de Electrodomésticos
- Revisa cables de electrodomésticos mayores
- Desconecta equipos no utilizados
- Programa mantenimiento profesional anual

### 9. Control de Humedad
- Mantén áreas eléctricas secas
- Instala ventilación adecuada en baños
- Repara filtraciones que afecten instalaciones eléctricas

### 10. Revisión Profesional Anual
- Contrata electricista certificado una vez al año
- Solicita inspección completa del sistema
- Actualiza instalaciones según normativas vigentes

## Señales de Alerta que Requieren Atención Inmediata

🚨 **Contacta a un electricista si notas:**
- Chispas al conectar o desconectar aparatos
- Breakers que se disparan frecuentemente
- Luces que parpadean sin razón aparente
- Enchufes calientes al tacto
- Olor a quemado cerca de instalaciones eléctricas
- Pequeñas descargas eléctricas al tocar aparatos

## Costos de Mantenimiento Preventivo vs Correctivo

| Tipo de Servicio | Costo Preventivo | Costo Correctivo |
|------------------|------------------|------------------|
| Inspección general | $30-50 | $80-150 |
| Cambio de breaker | $25-40 | $60-100 |
| Reparación de enchufes | $15-30 | $40-80 |
| Revisión de tablero | $40-60 | $100-200 |

## Cuándo Llamar a un Profesional

No intentes reparar por ti mismo:
- **Problemas en el tablero principal**
- **Instalación de nuevos circuitos**
- **Reparaciones que requieran cortar energía general**
- **Cualquier trabajo que no comprendas completamente**

## Kit Básico de Seguridad Eléctrica

Todo hogar debe tener:
- **Detector de humo** con batería nueva
- **Extintor** apropiado para fuegos eléctricos
- **Linterna** con pilas cargadas
- **Números de emergencia** de electricistas locales

## Conclusion

El mantenimiento eléctrico preventivo es una inversión en la seguridad de tu familia. Dedicar una hora al mes para estas verificaciones básicas puede prevenir tragedias y ahorrarte miles de dólares en reparaciones.

**¿Necesitas un electricista profesional en Cuenca?** En EcuaCasa conectamos con electricistas certificados y verificados disponibles las 24 horas.

### Artículos Relacionados
- [Guía de Seguridad Eléctrica para Niños](/blog/seguridad-electrica-ninos)
- [Cómo Reducir tu Factura Eléctrica](/blog/reducir-factura-electrica)
- [Instalación de Paneles Solares en Cuenca](/blog/paneles-solares-cuenca)

---

*La seguridad eléctrica es responsabilidad de todos. Comparte estos consejos con tus vecinos y familiares.*
    `
  },
  'precios-servicios-hogar-cuenca-2025': {
    title: 'Precios de Servicios para el Hogar en Cuenca 2025',
    excerpt: 'Guía actualizada de precios para servicios domésticos en Cuenca. Plomería, electricidad, carpintería y más.',
    category: 'Precios',
    date: '2025-01-10',
    readTime: '6 min',
    keywords: ['precios servicios Cuenca', 'tarifas hogar Ecuador', 'costos plomería electricidad', 'presupuesto mantenimiento casa'],
    relatedServices: ['plomeria', 'electricidad', 'carpinteria', 'pintura', 'limpieza'],
    content: `
# Precios de Servicios para el Hogar en Cuenca 2025

Planificar el presupuesto para el mantenimiento y mejoras del hogar es esencial. Esta guía te ayudará a conocer los precios actuales de servicios domésticos en Cuenca.

## Tarifas por Servicio

### 🔧 Plomería
| Servicio | Precio | Incluye |
|----------|--------|---------|
| Visita diagnóstica | $15-25 | Evaluación y presupuesto |
| Destape básico | $25-40 | Desagües y cañerías |
| Reparación grifo | $20-35 | Mano de obra |
| Instalación sanitario | $50-80 | Sin incluir sanitario |
| Hora de trabajo | $25-45 | Mano de obra |

### ⚡ Electricidad
| Servicio | Precio | Incluye |
|----------|--------|---------|
| Inspección eléctrica | $30-50 | Revisión completa |
| Instalación tomacorriente | $20-35 | Sin incluir materiales |
| Cambio de breaker | $25-40 | Sin incluir breaker |
| Instalación luminaria | $30-60 | Mano de obra |
| Hora de trabajo | $30-50 | Mano de obra |

### 🔨 Carpintería
| Servicio | Precio | Incluye |
|----------|--------|---------|
| Consulta y medición | $20-30 | Diseño inicial |
| Reparación puertas | $40-80 | Mano de obra |
| Muebles a medida | $200-500+ | Según diseño |
| Instalación estanterías | $60-120 | Mano de obra |
| Hora de trabajo | $35-60 | Mano de obra |

### 🎨 Pintura
| Servicio | Precio | Incluye |
|----------|--------|---------|
| Pintura interior (m²) | $8-15 | Mano de obra |
| Pintura exterior (m²) | $10-18 | Mano de obra |
| Empaste y lijado (m²) | $3-6 | Preparación |
| Consultoría colores | $25-40 | Asesoría profesional |
| Hora de trabajo | $20-40 | Mano de obra |

### 🧹 Limpieza
| Servicio | Precio | Incluye |
|----------|--------|---------|
| Limpieza básica | $15-25/hora | Una persona |
| Limpieza profunda | $80-150 | Casa completa |
| Limpieza post-construcción | $120-250 | Según tamaño |
| Lavado alfombras (m²) | $5-10 | Productos incluidos |

### 🌱 Jardinería
| Servicio | Precio | Incluye |
|----------|--------|---------|
| Mantenimiento básico | $18-35/hora | Poda y limpieza |
| Diseño jardín | $100-300 | Según tamaño |
| Instalación riego | $150-400 | Sin incluir sistema |
| Siembra plantas | $5-15/planta | Mano de obra |

## Factores que Afectan los Precios

### 🏠 Ubicación en Cuenca
- **Centro histórico**: +10-15% (dificultad acceso)
- **Sectores residenciales**: Precios estándar  
- **Zonas periféricas**: -5-10%

### 📅 Urgencia del Servicio
- **Horario normal** (8am-6pm): Precio base
- **Nocturno/fines de semana**: +25-50%
- **Emergencias**: +50-100%

### 👨‍🔧 Experiencia del Profesional
- **Técnicos junior**: -15-20%
- **Profesionales promedio**: Precio base
- **Expertos/maestros**: +20-40%

## Consejos para Ahorrar

### 💡 Planificación
- **Agrupa trabajos** del mismo tipo
- **Programa en temporada baja**
- **Solicita múltiples presupuestos**

### 🔍 Comparación
- Pide mínimo **3 presupuestos**
- Verifica **incluidos y exclusiones**
- Evalúa **garantías ofrecidas**

### 📋 Preparación
- **Limpia y despeja** áreas de trabajo
- **Ten materiales listos** cuando sea posible
- **Define claramente** el alcance del trabajo

## Señales de Precios Sospechosos

🚨 **Desconfía si:**
- Precio **excesivamente bajo** (puede indicar mala calidad)
- Solicitan **pago completo** por adelantado
- No proporcionan **presupuesto escrito**
- Evaden dar **referencias verificables**
- Precios **muy por encima** del promedio sin justificación

## Materiales Comunes y Precios

### 🔧 Plomería
- Tubo PVC 1/2": $3-5/metro
- Grifo básico: $15-35
- Sanitario estándar: $80-180

### ⚡ Electricidad  
- Cable THHN 12 AWG: $1.50-2.50/metro
- Tomacorriente doble: $5-12
- Breaker 20A: $8-15

### 🎨 Pintura
- Pintura interior (galón): $18-35
- Pintura exterior (galón): $22-45
- Masilla para paredes: $8-15

## Estacionalidad de Precios

### 📈 Temporada Alta (Junio-Agosto)
- Mayor demanda por **vacaciones escolares**
- Precios **10-20% más altos**
- Menor disponibilidad de profesionales

### 📉 Temporada Baja (Marzo-Mayo)
- Menor demanda
- Mejores **promociones y descuentos**
- Mayor flexibilidad de horarios

## Formas de Pago Aceptadas

### 💳 Métodos Comunes
- **Efectivo**: Descuentos 5-10%
- **Transferencia bancaria**: Sin recargo
- **Tarjeta de crédito**: Posible recargo 3-5%

### 📋 Modalidades de Pago
- **50% adelanto, 50% al terminar**: Estándar
- **Pago completo al finalizar**: Trabajos menores
- **Pago por etapas**: Proyectos grandes

## Garantías Estándar

### ⭐ Tiempos de Garantía
- **Plomería**: 6 meses - 1 año
- **Electricidad**: 6 meses - 2 años
- **Carpintería**: 1-3 años
- **Pintura**: 6 meses - 1 año

## Conclusión

Conocer los precios de mercado te ayuda a tomar mejores decisiones y evitar sorpresas. Recuerda que la calidad debe ser prioridad sobre el precio más bajo.

**¿Buscas profesionales confiables a precios justos?** En EcuaCasa verificamos cada profesional y garantizamos precios transparentes sin sorpresas.

### Artículos Relacionados
- [Cómo Negociar Precios con Profesionales del Hogar](/blog/negociar-precios-servicios)
- [Presupuesto Anual para Mantenimiento del Hogar](/blog/presupuesto-mantenimiento-anual)
- [Cuándo Vale la Pena Contratar un Profesional](/blog/cuando-contratar-profesional)

---

*Precios actualizados a enero 2025. Los precios pueden variar según condiciones específicas de cada trabajo.*
    `
  },
  'carpinteria-muebles-medida': {
    title: 'Ventajas de los Muebles a Medida vs Muebles Prefabricados',
    excerpt: 'Conoce los beneficios de invertir en muebles personalizados para tu hogar en Cuenca.',
    category: 'Carpintería',
    date: '2025-01-08',
    readTime: '4 min',
    keywords: ['muebles a medida Cuenca', 'carpintería personalizada', 'muebles personalizados', 'carpinteros Cuenca'],
    relatedServices: ['carpinteria'],
    content: `
# Ventajas de los Muebles a Medida vs Muebles Prefabricados

Cuando llega el momento de amueblar tu hogar, te enfrentas a una decisión importante: ¿muebles prefabricados o a medida? Esta guía te ayudará a tomar la mejor decisión para tu hogar en Cuenca.

## ¿Qué son los Muebles a Medida?

Los muebles a medida son piezas diseñadas y fabricadas específicamente para tu espacio, necesidades y gustos personales. Cada detalle se planifica según tus requerimientos exactos.

## Ventajas de los Muebles a Medida

### 🎯 **Aprovechamiento Perfecto del Espacio**
- Diseñados para las dimensiones exactas de tu hogar
- Aprovechan rincones y espacios irregulares
- Máxima funcionalidad en espacios pequeños
- Perfecta integración con la arquitectura existente

### 🎨 **Personalización Total**
- **Materiales**: Elige maderas, acabados y herrajes
- **Colores**: Combina con tu decoración existente
- **Funcionalidades**: Adapta a tus hábitos y necesidades
- **Estilo**: Desde clásico hasta moderno

### 💎 **Calidad Superior**
- Materiales de primera calidad
- Artesanía especializada
- Técnicas tradicionales de ebanistería
- Mayor durabilidad y resistencia

### 🏠 **Valor Agregado a tu Propiedad**
- Aumenta el valor de reventa
- Diferenciación en el mercado inmobiliario
- Atractivo único para compradores potenciales

## Desventajas de los Muebles a Medida

### ⏰ **Tiempo de Entrega**
- **Fabricación**: 2-8 semanas según complejidad
- **Proceso de diseño**: 1-2 semanas adicionales
- Requiere planificación anticipada

### 💰 **Inversión Inicial Mayor**
- Costo 30-70% superior a prefabricados
- Pago por adelantado requerido
- Sin opciones de financiamiento inmediato

### 🔧 **Proceso Más Complejo**
- Múltiples reuniones de diseño
- Toma de medidas profesional
- Seguimiento constante del proyecto

## Ventajas de los Muebles Prefabricados

### 💸 **Precio Accesible**
- Costos estandarizados y competitivos
- Opciones de financiamiento disponibles
- Promociones y descuentos frecuentes

### ⚡ **Disponibilidad Inmediata**
- Compra y lleva el mismo día
- Entrega en 24-48 horas
- Sin tiempo de espera

### 🛠️ **Facilidad de Compra**
- Proceso simple y directo
- Ver el producto antes de comprar
- Intercambio fácil si no satisface

## Desventajas de los Muebles Prefabricados

### 📏 **Limitaciones de Espacio**
- Medidas estándar que pueden no ajustar
- Desperdicio de espacio en rincones
- Dificulta aprovechamiento óptimo

### 🎨 **Opciones de Personalización Limitadas**
- Colores y acabados predeterminados
- Imposibilidad de modificar funcionalidades
- Diseño genérico sin personalidad

### 🔨 **Calidad Variable**
- Materiales económicos en líneas básicas
- Vida útil menor
- Reparaciones más complejas

## Comparación de Costos en Cuenca

### Muebles a Medida (Precios Promedio)
| Mueble | Costo A Medida | Tiempo |
|--------|---------------|---------|
| Closet completo | $800-1,500 | 4-6 semanas |
| Cocina integral | $2,000-4,000 | 6-8 semanas |
| Librero grande | $400-800 | 3-4 semanas |
| Mesa comedor | $300-600 | 2-3 semanas |

### Muebles Prefabricados (Precios Promedio)
| Mueble | Costo Prefabricado | Tiempo |
|--------|------------------|---------|
| Closet estándar | $400-800 | Inmediato |
| Cocina modular | $1,200-2,500 | 1-2 semanas |
| Librero estándar | $150-400 | Inmediato |
| Mesa comedor | $200-400 | Inmediato |

## ¿Cuándo Elegir Muebles a Medida?

### ✅ **Ideal Para:**
- **Espacios irregulares** o con medidas especiales
- **Proyectos de largo plazo** en tu hogar definitivo
- **Necesidades específicas** de almacenamiento
- **Inversión en calidad** y durabilidad
- **Decoración personalizada** única

### 📋 **Ejemplos Específicos:**
- Closets en espacios con pendientes
- Cocinas en espacios reducidos
- Bibliotecas que aprovechen altura completa
- Muebles de baño con plomería expuesta

## ¿Cuándo Elegir Muebles Prefabricados?

### ✅ **Ideal Para:**
- **Presupuesto limitado** inmediato
- **Necesidad urgente** de amueblado
- **Vivienda temporal** o de alquiler
- **Espacios estándar** con medidas comunes
- **Primera vivienda** con plan de renovación futura

## Consejos para Elegir el Carpintero Correcto

### 🔍 **Verificaciones Esenciales**
- **Portfolio** de trabajos anteriores
- **Referencias** de clientes recientes
- **Experiencia** mínima de 5 años
- **Garantía** por defectos de fabricación

### 💬 **Preguntas Importantes**
1. ¿Incluye el diseño 3D del proyecto?
2. ¿Qué tipo de madera utilizará?
3. ¿Cuánto tiempo de garantía ofrece?
4. ¿Incluye la instalación en el precio?

## Tendencias en Carpintería 2025

### 🌿 **Materiales Sostenibles**
- Maderas certificadas FSC
- Acabados ecológicos sin tóxicos
- Aprovechamiento de madera local

### 🎨 **Estilos Populares**
- **Minimalista**: Líneas limpias y funcionales
- **Industrial**: Combinación madera-metal
- **Rústico moderno**: Tradicional con toques contemporáneos

## Conclusión

La elección entre muebles a medida y prefabricados depende de:
- **Tu presupuesto** disponible
- **Tiempo** que puedes esperar
- **Características** de tu espacio
- **Planes a largo plazo** en la vivienda

**¿Buscas carpinteros especializados en muebles a medida?** En EcuaCasa conectamos con maestros carpinteros verificados en Cuenca, con portfolio comprobado y garantía en todos los trabajos.

### Artículos Relacionados
- [Cómo Elegir el Mejor Carpintero en Cuenca](/blog/como-elegir-carpintero-cuenca)
- [Maderas Ideales para el Clima de Cuenca](/blog/maderas-clima-cuenca)
- [Presupuesto para Muebles de Hogar 2025](/blog/presupuesto-muebles-hogar)

---

*La calidad en carpintería se nota en los detalles. Invierte sabiamente en los muebles que usarás por décadas.*
    `
  },
  'limpieza-profunda-casa': {
    title: 'Checklist de Limpieza Profunda para tu Casa',
    excerpt: 'Lista completa para una limpieza profunda efectiva. Productos, técnicas y frecuencia recomendada.',
    category: 'Limpieza',
    date: '2025-01-05',
    readTime: '8 min',
    keywords: ['limpieza profunda casa', 'checklist limpieza', 'limpieza doméstica', 'productos limpieza'],
    relatedServices: ['limpieza'],
    content: `
# Checklist de Limpieza Profunda para tu Casa

Una limpieza profunda va más allá de la rutina diaria. Esta guía te ayudará a realizar una limpieza completa y profesional de tu hogar en Cuenca.

## ¿Qué es una Limpieza Profunda?

La limpieza profunda es un proceso exhaustivo que incluye áreas y tareas que no se realizan en la limpieza regular. Se recomienda cada 3-6 meses o al cambio de estación.

## Productos y Herramientas Necesarios

### 🧽 **Productos de Limpieza Esenciales**
- **Desengrasante multiusos**
- **Desinfectante antibacterial**
- **Limpiador de vidrios**
- **Bicarbonato de sodio**
- **Vinagre blanco**
- **Alcohol isopropílico**
- **Jabón líquido neutro**

### 🧹 **Herramientas Indispensables**
- **Aspiradora** con accesorios
- **Mopa** y trapo microfibra
- **Escobas** de diferentes tamaños
- **Esponjas** abrasivas y suaves
- **Guantes** de goma
- **Escalera** pequeña y segura
- **Baldes** y atomizadores

## Checklist por Habitación

### 🛏️ **Dormitorios**

#### Antes de Empezar:
- [ ] Recoger y organizar objetos personales
- [ ] Cambiar ropa de cama completamente
- [ ] Ventilar habitación por 30 minutos

#### Limpieza Profunda:
- [ ] **Colchón**: Aspirar, voltear, aplicar bicarbonato
- [ ] **Closets**: Vaciar, limpiar estantes, reorganizar
- [ ] **Bajo la cama**: Aspirar polvo y objetos perdidos
- [ ] **Baseboards**: Limpiar con paño húmedo
- [ ] **Interruptores**: Desinfectar con alcohol
- [ ] **Ventanas**: Limpiar vidrios y marcos
- [ ] **Cortinas/persianas**: Lavar o aspirar según material
- [ ] **Lámparas**: Limpiar pantallas y cambiar bombillas
- [ ] **Pisos**: Aspirar, trapear con desinfectante

### 🚿 **Baños**

#### Preparación:
- [ ] Retirar todos los productos de tocador
- [ ] Abrir ventanas o encender extractor
- [ ] Aplicar productos y dejar actuar 15 minutos

#### Limpieza Detallada:
- [ ] **Inodoro**: Dentro, fuera, base, tanque completo
- [ ] **Ducha**: Baldosas, juntas, grifería, cortina
- [ ] **Lavamanos**: Grifo, desagüe, espejo, repisa
- [ ] **Azulejos**: Frotar juntas con cepillo
- [ ] **Ventilación**: Limpiar rejillas de extractor
- [ ] **Accesorios**: Toalleros, jaboneras, ganchos
- [ ] **Medicinas**: Revisar fechas, organizar botiquín
- [ ] **Piso**: Desinfectar especialmente rincones

### 🍳 **Cocina**

#### Pre-limpieza:
- [ ] Vaciar completamente refrigerador y alacenas
- [ ] Desconectar electrodomésticos pequeños
- [ ] Proteger zonas que no se limpiarán

#### Limpieza Exhaustiva:
- [ ] **Refrigerador**: Interior, exterior, motor trasero
- [ ] **Horno**: Interior con productos específicos
- [ ] **Microondas**: Vapor con limón, interior y exterior
- [ ] **Campana**: Filtros, interior, exterior
- [ ] **Alacenas**: Vaciar, limpiar, reorganizar
- [ ] **Despensa**: Revisar fechas, eliminar vencidos
- [ ] **Fregadero**: Desinfectar, brillar grifería
- [ ] **Electrodomésticos**: Cafetera, licuadora, tostadora
- [ ] **Azulejos**: Desengrasar completamente
- [ ] **Piso**: Desengrasar, desinfectar

### 🛋️ **Sala de Estar**

#### Organización:
- [ ] Guardar revistas, controles, cables
- [ ] Acomodar cojines y mantas
- [ ] Organizar centro de entretenimiento

#### Limpieza Completa:
- [ ] **Muebles**: Aspirar tapizados, limpiar madera
- [ ] **Alfombras**: Aspirar profundamente, lavar si es necesario
- [ ] **Electrónicos**: Limpiar pantallas con productos específicos
- [ ] **Decoración**: Cuadros, plantas, adornos
- [ ] **Libros**: Sacudir, organizar
- [ ] **Ventanas**: Vidrios, marcos, cortinas
- [ ] **Iluminación**: Lámparas, focos, interruptores

## Checklist de Áreas Especiales

### 🏠 **Zonas de Alto Tráfico**
- [ ] **Entrada**: Limpiar puerta, manijas, tapete
- [ ] **Escaleras**: Pasamanos, escalones, rincones
- [ ] **Pasillos**: Paredes, pisos, rodapiés
- [ ] **Garaje**: Barrer, organizar herramientas

### 🌿 **Áreas Exteriores**
- [ ] **Patio**: Barrer, lavar si es necesario
- [ ] **Jardín**: Podar, regar, eliminar maleza básica
- [ ] **Ventanas exteriores**: Limpiar desde afuera
- [ ] **Entradas**: Barrer, lavar escalones

## Productos Naturales vs Comerciales

### 🌱 **Opciones Ecológicas**
| Problema | Solución Natural | Efectividad |
|----------|------------------|-------------|
| Grasa | Bicarbonato + vinagre | ⭐⭐⭐⭐ |
| Desinfección | Alcohol 70% | ⭐⭐⭐⭐⭐ |
| Vidrios | Vinagre + agua | ⭐⭐⭐⭐ |
| Baños | Limón + sal | ⭐⭐⭐ |

### 🧴 **Productos Comerciales**
| Área | Producto Recomendado | Ventaja |
|------|---------------------|---------|
| Cocina | Desengrasante industrial | Rapidez |
| Baños | Ácido muriático diluido | Poder |
| Pisos | Desinfectante multiusos | Conveniencia |
| Vidrios | Limpiador específico | Sin rayas |

## Cronograma de Limpieza Profunda

### 📅 **Planificación Semanal**
- **Lunes**: Dormitorios (2 horas)
- **Martes**: Baños completos (2 horas)
- **Miércoles**: Cocina exhaustiva (3 horas)
- **Jueves**: Sala y comedor (2 horas)
- **Viernes**: Áreas exteriores (1 hora)
- **Sábado**: Detalles finales (1 hora)

### 🔄 **Frecuencias Recomendadas**
- **Mensual**: Refrigerador, medicinas
- **Bimestral**: Colchones, cortinas
- **Trimestral**: Alfombras profundas, alacenas
- **Semestral**: Armarios completos, decoración alta

## Cuándo Contratar Profesionales

### 🏢 **Servicios Especializados**
- **Alfombras persas o delicadas**
- **Limpieza post-construcción**
- **Desinfección por plagas**
- **Vidrios en altura**
- **Limpieza de conductos de aire**

### 💰 **Costos en Cuenca**
| Servicio | Precio Promedio | Duración |
|----------|----------------|----------|
| Casa completa (100m²) | $80-150 | 4-6 horas |
| Solo baños y cocina | $40-70 | 2-3 horas |
| Limpieza post-obra | $120-250 | 6-8 horas |
| Por hora profesional | $15-25 | Variable |

## Consejos para Mantener la Limpieza

### 🏠 **Rutinas Diarias**
- **15 minutos** de recogida general cada noche
- **Limpiar mientras cocinas** (lavar platos usados)
- **Tender camas** inmediatamente al levantarse
- **Limpiar derrames** al instante

### 📋 **Sistema de Organización**
- **Un lugar para cada cosa**
- **Regla de los 2 minutos**: Si toma menos, hazlo ya
- **Involucrar a toda la familia** con tareas específicas
- **Recompensar** el mantenimiento del orden

## Errores Comunes a Evitar

### ❌ **No Hacer**
- Mezclar productos químicos diferentes
- Usar demasiado producto (menos es más)
- Limpiar sin ventilar adecuadamente
- Ignorar instrucciones de los productos
- Dejar que se acumule demasiada suciedad

### ✅ **Mejores Prácticas**
- Leer etiquetas de productos siempre
- Probar productos en áreas pequeñas primero
- Usar equipos de protección
- Trabajar de arriba hacia abajo
- Organizar antes de limpiar

## Conclusión

Una limpieza profunda requiere planificación, tiempo y las herramientas correctas. Con esta guía, podrás mantener tu hogar en Cuenca impecable y saludable.

**¿Prefieres contratar profesionales?** En EcuaCasa conectamos con servicios de limpieza verificados, con personal capacitado y productos profesionales para resultados perfectos.

### Artículos Relacionados
- [Productos de Limpieza Ecológicos vs Químicos](/blog/productos-limpieza-ecologicos)
- [Cómo Eliminar Manchas Difíciles del Hogar](/blog/eliminar-manchas-dificiles)
- [Frecuencia Ideal de Limpieza por Área](/blog/frecuencia-limpieza-hogar)

---

*Un hogar limpio es un hogar saludable. La constancia es clave para mantener espacios impecables.*
    `
  },
  'jardineria-cuenca-clima': {
    title: 'Plantas Ideales para el Clima de Cuenca: Guía de Jardinería',
    excerpt: 'Descubre qué plantas prosperan mejor en el clima de Cuenca y cómo cuidar tu jardín durante todo el año.',
    category: 'Jardinería',
    date: '2025-01-03',
    readTime: '10 min',
    keywords: ['plantas Cuenca Ecuador', 'jardinería clima Cuenca', 'plantas clima templado', 'jardines Cuenca'],
    relatedServices: ['jardineria'],
    content: `
# Plantas Ideales para el Clima de Cuenca: Guía de Jardinería

Cuenca, ubicada a 2,550 metros sobre el nivel del mar, ofrece un clima único perfecto para una amplia variedad de plantas. Esta guía te ayudará a crear un jardín próspero adaptado a nuestras condiciones locales.

## Características del Clima de Cuenca

### 🌡️ **Temperatura**
- **Promedio anual**: 15°C (59°F)
- **Mínimas**: 7-10°C (44-50°F)
- **Máximas**: 20-25°C (68-77°F)
- **Variación diaria**: Significativa (10-15°C)

### 🌧️ **Precipitación**
- **Época lluviosa**: Octubre - Mayo
- **Época seca**: Junio - Septiembre  
- **Promedio anual**: 900mm
- **Humedad relativa**: 65-75%

### ☀️ **Radiación Solar**
- **Intensidad**: Alta por la altitud
- **Horas de sol**: 6-8 horas diarias
- **UV**: Muy intenso (protección necesaria)

## Plantas Nativas Recomendadas

### 🌸 **Flores Ornamentales**

#### **Pensamiento (Viola tricolor)**
- **Características**: Flores multicolores, resistente al frío
- **Época de siembra**: Marzo-Mayo, Septiembre-Noviembre
- **Cuidados**: Riego moderado, sol parcial
- **Precio promedio**: $2-3 por planta

#### **Begonia (Begonia semperflorens)**
- **Características**: Flores continuas, hojas brillantes
- **Época de siembra**: Todo el año
- **Cuidados**: Sombra parcial, riego constante
- **Precio promedio**: $3-5 por planta

#### **Geranio (Pelargonium)**
- **Características**: Aromático, flores vistosas
- **Época de siembra**: Septiembre-Febrero
- **Cuidados**: Sol directo, riego moderado
- **Precio promedio**: $4-6 por planta

### 🌿 **Plantas de Follaje**

#### **Helecho de Boston (Nephrolepis exaltata)**
- **Características**: Hojas elegantes, purifica el aire
- **Ubicación**: Sombra, interior o exterior
- **Cuidados**: Humedad alta, riego frecuente
- **Precio promedio**: $8-12 por planta

#### **Hosta (Hosta spp.)**
- **Características**: Hojas grandes, tolera sombra
- **Época de plantación**: Abril-Mayo
- **Cuidados**: Sombra parcial, suelo húmedo
- **Precio promedio**: $6-10 por planta

### 🍃 **Hierbas Aromáticas**

#### **Romero (Rosmarinus officinalis)**
- **Características**: Aromático, medicinal, resistente
- **Época de siembra**: Todo el año
- **Cuidados**: Sol directo, poco riego
- **Precio promedio**: $3-5 por planta

#### **Menta (Mentha spicata)**
- **Características**: Crecimiento rápido, uso culinario
- **Época de siembra**: Marzo-Octubre
- **Cuidados**: Sombra parcial, riego abundante
- **Precio promedio**: $2-4 por planta

#### **Albahaca (Ocimum basilicum)**
- **Características**: Aromática, repele insectos
- **Época de siembra**: Octubre-Marzo
- **Cuidados**: Sol parcial, riego moderado
- **Precio promedio**: $2-3 por planta

## Plantas Adaptadas al Clima

### 🌹 **Rosas (Rosa spp.)**

#### **Variedades Recomendadas:**
- **Rosa de Castilla**: Tradicional, muy aromática
- **Rosa Té**: Floración continua
- **Rosa Rugosa**: Muy resistente al frío

#### **Cuidados Específicos:**
- **Plantación**: Abril-Mayo, Septiembre-Octubre
- **Riego**: Moderado, evitar mojar hojas
- **Fertilización**: Cada 2 meses con abono orgánico
- **Poda**: Julio-Agosto (época seca)

### 🌳 **Árboles Frutales**

#### **Duraznero (Prunus persica)**
- **Variedades**: Amarillo tardío, Conservero
- **Plantación**: Mayo-Junio
- **Producción**: Año 3-4
- **Precio**: $15-25 por árbol joven

#### **Manzano (Malus domestica)**
- **Variedades**: Anna, Emilia, Winter Banana
- **Plantación**: Abril-Mayo
- **Producción**: Año 4-5
- **Precio**: $20-30 por árbol joven

#### **Aguacate (Persea americana)**
- **Variedades**: Fuerte, Hass (con protección)
- **Plantación**: Octubre-Diciembre
- **Producción**: Año 5-6
- **Precio**: $25-40 por árbol joven

## Plantas que Evitar

### ❌ **No Recomendadas**
- **Plantas tropicales** (sensibles al frío)
- **Cactus grandes** (exceso de humedad)
- **Bambú corriente** (invasivo)
- **Eucalipto** (consume mucha agua)

## Calendario de Jardinería para Cuenca

### 📅 **Enero - Marzo (Lluvioso)**
- **Plantar**: Bulbos, plantas de sombra
- **Evitar**: Transplantes mayores
- **Actividades**: Poda ligera, fertilización orgánica

### 📅 **Abril - Junio (Transición)**
- **Plantar**: Rosas, árboles frutales
- **Actividades**: Preparación de suelo, siembras principales

### 📅 **Julio - Septiembre (Seco)**
- **Plantar**: Plantas resistentes a sequía
- **Actividades**: Poda fuerte, multiplicación por esquejes

### 📅 **Octubre - Diciembre (Pre-lluvioso)**
- **Plantar**: Plantas anuales, bulbos
- **Actividades**: Preparación para época lluviosa

## Consejos de Riego

### 💧 **Frecuencia por Época**
- **Época lluviosa**: Reducir riego, mejorar drenaje
- **Época seca**: Riego profundo 2-3 veces por semana
- **Transición**: Riego moderado según necesidad

### 🕐 **Horarios Óptimos**
- **Mañana temprana**: 6:00-8:00 AM (mejor opción)
- **Tarde**: 5:00-7:00 PM (segunda opción)
- **Evitar**: Riego al mediodía (pérdida por evaporación)

## Preparación del Suelo

### 🌱 **Características del Suelo en Cuenca**
- **Tipo**: Franco-arcilloso
- **pH**: Ligeramente ácido (6.0-6.5)
- **Drenaje**: Mejorar en época lluviosa
- **Materia orgánica**: Añadir regularmente

### 🛠️ **Mejoras Recomendadas**
- **Compost casero**: Restos orgánicos de cocina
- **Arena gruesa**: Para mejorar drenaje
- **Humus de lombriz**: Rica en nutrientes
- **Cascarilla de arroz**: Aireación del suelo

## Control de Plagas Natural

### 🐛 **Plagas Comunes**
- **Pulgones**: Usar jabón potásico
- **Caracoles**: Colocar trampas de cerveza
- **Hormiga arriera**: Canela en polvo
- **Cochinilla**: Alcohol con agua

### 🌿 **Plantas Repelentes**
- **Caléndula**: Repele moscas blancas
- **Lavanda**: Repele hormigas
- **Ruda**: Repele roedores
- **Menta**: Repele ratones

## Costos de Jardinería en Cuenca

### 💰 **Precios de Plantas (2025)**
| Tipo de Planta | Precio Unitario | Observaciones |
|----------------|-----------------|---------------|
| Planta ornamental pequeña | $2-5 | Maceta 10-15cm |
| Arbusto mediano | $8-15 | Maceta 20-25cm |
| Árbol frutal joven | $15-30 | 1-2 años |
| Planta aromática | $2-4 | Uso culinario |

### 🛠️ **Servicios Profesionales**
| Servicio | Precio Promedio | Duración |
|----------|----------------|----------|
| Diseño de jardín | $100-300 | Según tamaño |
| Mantenimiento mensual | $50-120 | 4-6 horas |
| Plantación profesional | $25-45/hora | Variable |
| Sistema de riego | $200-500 | Según complejidad |

## Herramientas Básicas

### 🔧 **Imprescindibles**
- **Pala de jardín**: $15-25
- **Regadera**: $8-15
- **Tijeras de podar**: $12-20
- **Guantes**: $5-10
- **Rastrillo pequeño**: $10-18

### 📋 **Mantenimiento de Herramientas**
- Limpiar después de cada uso
- Secar completamente
- Afilar tijeras regularmente
- Almacenar en lugar seco

## Conclusión

El clima de Cuenca ofrece condiciones ideales para una jardinería diversa y exitosa. Con las plantas correctas y cuidados apropiados, puedes crear un jardín hermoso durante todo el año.

**¿Necesitas ayuda profesional?** En EcuaCasa conectamos con jardineros expertos en Cuenca, especialistas en plantas locales y diseño de jardines adaptados a nuestro clima único.

### Artículos Relacionados
- [Diseño de Jardines para Espacios Pequeños](/blog/jardines-espacios-pequenos)
- [Compostaje Casero en Clima Templado](/blog/compostaje-casero-cuenca)
- [Sistemas de Riego Eficientes para Jardines](/blog/sistemas-riego-jardines)

---

*Un jardín próspero en Cuenca requiere conocimiento del clima local. Planta según las estaciones y disfruta de la belleza natural todo el año.*
    `
  }
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    return {
      title: 'Artículo no encontrado - Blog EcuaCasa',
      robots: 'noindex, follow'
    }
  }

  return {
    title: `${post.title} | Blog EcuaCasa`,
    description: post.excerpt,
    keywords: post.keywords.join(', '),
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.ecuacasa.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.ecuacasa.com/blog/${slug}`,
      siteName: 'EcuaCasa',
      locale: 'es_EC',
      type: 'article',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    notFound()
  }

  // Structured data for blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "EcuaCasa"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EcuaCasa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ecuacasa.com/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ecuacasa.com/blog/${slug}`
    },
    "keywords": post.keywords.join(', ')
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EC</span>
                </div>
                <span className="font-black text-xl">EcuaCasa</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium">
                  Blog
                </Link>
                <Link href="/providers">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                    Buscar Profesionales
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-purple-600">Inicio</Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-purple-600">Blog</Link>
              <span>›</span>
              <span className="text-gray-900">{post.category}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-600 text-sm">{post.readTime} de lectura</span>
              <span className="text-gray-600 text-sm">
                {new Date(post.date).toLocaleDateString('es-ES')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 pb-12">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            </div>
          </div>
        </section>

        {/* Related Services CTA */}
        {post.relatedServices.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                ¿Necesitas este servicio ahora?
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {post.relatedServices.map((service) => (
                  <Link key={service} href={`/servicios/${service}`}>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                      Ver Profesionales de {service.charAt(0).toUpperCase() + service.slice(1)}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Te gustó este artículo?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Recibe más consejos útiles para tu hogar cada semana
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-xl border-none outline-none"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                Suscribirme
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}