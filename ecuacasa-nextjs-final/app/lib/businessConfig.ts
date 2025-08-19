export const businessConfig = {
  name: 'EcuaCasa',
  description: 'Servicios para el hogar en Cuenca, Ecuador',
  contact: {
    email: 'info@ecuacasa.com',
    phone: '+593-7-123-4567',
    whatsapp: '+593987654321'
  },
  address: {
    street: 'Cuenca, Ecuador',
    city: 'Cuenca',
    state: 'Azuay',
    country: 'Ecuador',
    postalCode: '010101'
  },
  social: {
    website: 'https://ecuacasa.com',
    facebook: 'https://facebook.com/ecuacasa',
    instagram: 'https://instagram.com/ecuacasa',
    twitter: 'https://twitter.com/ecuacasa'
  },
  services: {
    categories: [
      'Plomería',
      'Electricidad',
      'Carpintería',
      'Pintura',
      'Limpieza',
      'Jardinería',
      'Cerrajería',
      'Albañilería'
    ]
  },
  pricing: {
    currency: 'USD',
    platform_fee: 0.05, // 5%
    payment_processing_fee: 0.029 // 2.9%
  }
}

export function calculateBookingFees(baseAmount: number, isEmergency: boolean = false) {
  const platformFee = baseAmount * businessConfig.pricing.platform_fee
  const processingFee = baseAmount * businessConfig.pricing.payment_processing_fee
  const emergencyFee = isEmergency ? baseAmount * 0.15 : 0 // 15% emergency fee
  
  const totalFees = platformFee + processingFee + emergencyFee
  const providerReceives = baseAmount - platformFee
  const totalCustomerPays = baseAmount + processingFee + emergencyFee

  return {
    baseAmount,
    platformFee,
    processingFee,
    emergencyFee,
    totalFees,
    providerReceives,
    totalCustomerPays
  }
}

export default businessConfig
