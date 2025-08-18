import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'
import { Inter } from 'next/font/google'
import { TranslationProvider } from './context/TranslationContext'
import Footer from './components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EcuaCasa - Servicios para el hogar en Cuenca',
  description: 'Encuentra profesionales verificados para tu hogar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className={inter.className}>
          <TranslationProvider>
            {children}
            <Footer />
          </TranslationProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
