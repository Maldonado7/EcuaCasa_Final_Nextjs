'use client'

import TranslatedProviderDetailPage from '../../components/TranslatedProviderDetailPage'
import { use } from 'react'

interface ProviderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const { id } = use(params)
  return <TranslatedProviderDetailPage providerId={id} />
}