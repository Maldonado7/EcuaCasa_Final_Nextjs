import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contacto - EcuaCasa | Soporte 24/7 para Servicios del Hogar',
  description: 'Contacta con EcuaCasa para soporte técnico, consultas sobre servicios del hogar en Cuenca o registro de profesionales. Atención digital 24/7.',
  keywords: 'contacto EcuaCasa, soporte servicios hogar, ayuda técnica Cuenca, contactar profesionales Ecuador',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.ecuacasa.com/contact',
  },
  openGraph: {
    title: 'Contacto - EcuaCasa | Soporte 24/7',
    description: 'Contacta con EcuaCasa para soporte técnico, consultas sobre servicios del hogar en Cuenca o registro de profesionales.',
    url: 'https://www.ecuacasa.com/contact',
    siteName: 'EcuaCasa',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contacto - EcuaCasa',
    description: 'Contacta con EcuaCasa para soporte técnico y consultas sobre servicios del hogar en Cuenca.',
  }
}

export default function ContactPage() {
  // Structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto - EcuaCasa",
    "description": "Página de contacto para soporte técnico y consultas sobre servicios del hogar",
    "url": "https://www.ecuacasa.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "EcuaCasa",
      "url": "https://www.ecuacasa.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@ecuacasa.com",
          "availableLanguage": "es"
        },
        {
          "@type": "ContactPoint", 
          "contactType": "professional support",
          "email": "professionals@ecuacasa.com",
          "availableLanguage": "es"
        }
      ]
    }
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <ContactPageClient />
    </>
  )
}