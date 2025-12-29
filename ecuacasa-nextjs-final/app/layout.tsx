import { Inter } from 'next/font/google'
import { TranslationProvider } from './context/TranslationContext'
import Footer from './components/Footer'
import ClerkProviderWrapper from './components/ClerkProviderWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EcuaCasa - Servicios para el hogar en Cuenca',
  description: 'Encuentra profesionales verificados para tu hogar en Cuenca, Ecuador. Plomeros, electricistas, carpinteros y más.',
  keywords: 'servicios hogar Cuenca, plomeros Cuenca, electricistas Cuenca, carpinteros Cuenca, Ecuador, profesionales verificados',
  robots: 'index, follow',
  metadataBase: new URL('https://www.ecuacasa.com'),
  alternates: {
    canonical: 'https://www.ecuacasa.com',
  },
  openGraph: {
    title: 'EcuaCasa - Servicios para el hogar en Cuenca',
    description: 'Encuentra profesionales verificados para tu hogar en Cuenca, Ecuador',
    url: 'https://www.ecuacasa.com',
    siteName: 'EcuaCasa',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'EcuaCasa - Servicios para el hogar en Cuenca',
    description: 'Encuentra profesionales verificados para tu hogar en Cuenca, Ecuador',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProviderWrapper>
      <html lang="es">
        <head>
          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DFY3CKJ1DR"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DFY3CKJ1DR');
              `,
            }}
          />
        </head>
        <body className={inter.className}>
          <TranslationProvider>
            {children}
            <Footer />
          </TranslationProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}
