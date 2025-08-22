'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Shield, Award, Users, Star } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const cuencaNeighborhoods = [
    'El Centro', 'San Joaquín', 'Yanuncay', 'San Sebastián',
    'Totoracocha', 'Monay', 'El Batán', 'Ricaurte',
    'Huayna Cápac', 'El Sagrario', 'Gil Ramírez Dávalos', 'Bellavista'
  ]

  const popularServices = [
    { name: 'Plomeros en Cuenca', href: '/providers?service=plomería&location=cuenca' },
    { name: 'Electricistas en Cuenca', href: '/providers?service=electricidad&location=cuenca' },
    { name: 'Carpinteros en Cuenca', href: '/providers?service=carpintería&location=cuenca' },
    { name: 'Pintores en Cuenca', href: '/providers?service=pintura&location=cuenca' },
    { name: 'Cerrajeros 24/7 Cuenca', href: '/providers?service=cerrajería&location=cuenca' },
    { name: 'Albañiles en Cuenca', href: '/providers?service=albañilería&location=cuenca' },
  ]

  const quickLinks = [
    { name: 'Cómo Funciona', href: '/how' },
    { name: 'Todos los Servicios', href: '/services' },
    { name: 'Profesionales Verificados', href: '/providers' },
    { name: 'Registro Profesionales', href: '/providers/register' },
    { name: 'Blog y Consejos', href: '/blog' },
    { name: 'Contacto', href: '/contact' },
  ]

  const servicePages = [
    { name: 'Plomería en Cuenca', href: '/servicios/plomeria' },
    { name: 'Electricidad en Cuenca', href: '/servicios/electricidad' },
    { name: 'Carpintería en Cuenca', href: '/servicios/carpinteria' },
    { name: 'Pintura en Cuenca', href: '/servicios/pintura' },
    { name: 'Limpieza en Cuenca', href: '/servicios/limpieza' },
    { name: 'Jardinería en Cuenca', href: '/servicios/jardineria' },
  ]

  const blogLinks = [
    { name: 'Cómo Elegir Plomero', href: '/blog/como-elegir-plomero-cuenca' },
    { name: 'Mantenimiento Eléctrico', href: '/blog/mantenimiento-electrico-hogar' },
    { name: 'Precios de Servicios 2025', href: '/blog/precios-servicios-hogar-cuenca-2025' },
    { name: 'Guías y Consejos', href: '/blog' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl">EcuaCasa</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Conectamos profesionales verificados con hogares en Cuenca, Ecuador.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Cuenca, Ecuador</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-4 h-4" />
                <span>500+ Profesionales Verificados</span>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Buscar Profesionales</h3>
            <ul className="space-y-2">
              {popularServices.slice(0, 6).map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {service.name.replace(' en Cuenca', '')}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/providers" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors mt-4 inline-block">
              Ver todos los profesionales →
            </Link>
          </div>

          {/* Service Pages */}
          <div>
            <h3 className="font-bold text-lg mb-4">Servicios en Cuenca</h3>
            <ul className="space-y-2">
              {servicePages.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {service.name.replace(' en Cuenca', '')}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/services" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors mt-4 inline-block">
              Ver todos los servicios →
            </Link>
          </div>

          {/* Blog & Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Blog y Recursos</h3>
            <ul className="space-y-2">
              {blogLinks.map((blog) => (
                <li key={blog.name}>
                  <Link href={blog.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {blog.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 mt-4">
              <Link href="/how" className="text-gray-400 hover:text-white text-sm transition-colors block">Cómo Funciona</Link>
              <Link href="/providers/register" className="text-gray-400 hover:text-white text-sm transition-colors block">Registro Profesionales</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors block">Contacto</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Bottom Bar */}
      <div className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              © {currentYear} EcuaCasa. Servicios para el hogar en Cuenca, Ecuador.
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}