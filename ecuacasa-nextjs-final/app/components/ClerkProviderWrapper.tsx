import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'

export default function ClerkProviderWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          showOptionalFields: false,
        },
        elements: {
          rootBox: 'clerk-root',
          card: 'clerk-card',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}