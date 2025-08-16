import TranslatedProviderDetailPage from '../../components/TranslatedProviderDetailPage'

interface ProviderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const { id } = await params
  return <TranslatedProviderDetailPage providerId={id} />
}