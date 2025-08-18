// EcuaCasa Business Configuration
// Commission rates, fees, and business logic

export interface CommissionConfig {
  platformCommission: number // EcuaCasa's commission %
  paymentGatewayFee: number // Payphone's fee %
  vatRate: number // Ecuador VAT rate %
  minimumBookingAmount: number // Minimum booking in USD
  maximumBookingAmount: number // Maximum booking in USD
}

export interface ServicePricing {
  id: string
  serviceType: string
  basePrice: number
  priceRange: {
    min: number
    max: number
  }
  priceUnit: 'hourly' | 'fixed' | 'per_visit'
  emergencyMultiplier: number // 1.5x for emergency services
}

// Ecuador business configuration
export const ECUADOR_BUSINESS_CONFIG: CommissionConfig = {
  platformCommission: 10, // EcuaCasa takes 10% commission
  paymentGatewayFee: 5, // Payphone charges 5% + VAT
  vatRate: 12, // Ecuador VAT is 12%
  minimumBookingAmount: 5, // $5 USD minimum
  maximumBookingAmount: 500, // $500 USD maximum per booking
}

// Default service pricing structure for Ecuador
export const DEFAULT_SERVICE_PRICING: ServicePricing[] = [
  {
    id: 'plomeria',
    serviceType: 'Plomería',
    basePrice: 25,
    priceRange: { min: 15, max: 80 },
    priceUnit: 'hourly',
    emergencyMultiplier: 1.5
  },
  {
    id: 'electricidad',
    serviceType: 'Electricidad',
    basePrice: 30,
    priceRange: { min: 20, max: 100 },
    priceUnit: 'hourly',
    emergencyMultiplier: 1.5
  },
  {
    id: 'limpieza',
    serviceType: 'Limpieza del Hogar',
    basePrice: 20,
    priceRange: { min: 15, max: 60 },
    priceUnit: 'hourly',
    emergencyMultiplier: 1.2
  },
  {
    id: 'jardineria',
    serviceType: 'Jardinería',
    basePrice: 18,
    priceRange: { min: 12, max: 50 },
    priceUnit: 'hourly',
    emergencyMultiplier: 1.3
  },
  {
    id: 'pintura',
    serviceType: 'Pintura',
    basePrice: 25,
    priceRange: { min: 15, max: 75 },
    priceUnit: 'hourly',
    emergencyMultiplier: 1.2
  },
  {
    id: 'carpinteria',
    serviceType: 'Carpintería',
    basePrice: 28,
    priceRange: { min: 20, max: 90 },
    priceUnit: 'hourly',
    emergencyMultiplier: 1.4
  },
  {
    id: 'cerrajeria',
    serviceType: 'Cerrajería',
    basePrice: 35,
    priceRange: { min: 25, max: 120 },
    priceUnit: 'fixed',
    emergencyMultiplier: 2.0
  },
  {
    id: 'electrodomesticos',
    serviceType: 'Reparación de Electrodomésticos',
    basePrice: 40,
    priceRange: { min: 30, max: 150 },
    priceUnit: 'fixed',
    emergencyMultiplier: 1.5
  },
  {
    id: 'aire_acondicionado',
    serviceType: 'Aire Acondicionado',
    basePrice: 45,
    priceRange: { min: 35, max: 200 },
    priceUnit: 'per_visit',
    emergencyMultiplier: 1.6
  },
  {
    id: 'pest_control',
    serviceType: 'Control de Plagas',
    basePrice: 50,
    priceRange: { min: 40, max: 180 },
    priceUnit: 'per_visit',
    emergencyMultiplier: 1.3
  },
  {
    id: 'construccion',
    serviceType: 'Construcción Menor',
    basePrice: 35,
    priceRange: { min: 25, max: 120 },
    priceUnit: 'hourly',
    emergencyMultiplier: 1.4
  },
  {
    id: 'instalaciones',
    serviceType: 'Instalaciones',
    basePrice: 30,
    priceRange: { min: 20, max: 100 },
    priceUnit: 'fixed',
    emergencyMultiplier: 1.5
  }
]

// Calculate total fees for a booking
export function calculateBookingFees(amount: number, isEmergency: boolean = false): {
  baseAmount: number
  platformCommission: number
  paymentFee: number
  vat: number
  providerReceives: number
  totalCustomerPays: number
} {
  const baseAmount = isEmergency ? amount * 1.5 : amount
  
  // Platform commission (EcuaCasa)
  const platformCommission = baseAmount * (ECUADOR_BUSINESS_CONFIG.platformCommission / 100)
  
  // Payment gateway fee (Payphone)
  const paymentFee = baseAmount * (ECUADOR_BUSINESS_CONFIG.paymentGatewayFee / 100)
  
  // VAT on payment fee
  const vat = paymentFee * (ECUADOR_BUSINESS_CONFIG.vatRate / 100)
  
  // What provider receives after all fees
  const providerReceives = baseAmount - platformCommission - paymentFee - vat
  
  return {
    baseAmount,
    platformCommission,
    paymentFee,
    vat,
    providerReceives,
    totalCustomerPays: baseAmount + paymentFee + vat
  }
}

// Get pricing for a specific service
export function getServicePricing(serviceType: string): ServicePricing | null {
  return DEFAULT_SERVICE_PRICING.find(service => 
    service.serviceType === serviceType || service.id === serviceType
  ) || null
}

// Validate booking amount
export function validateBookingAmount(amount: number): {
  isValid: boolean
  error?: string
} {
  if (amount < ECUADOR_BUSINESS_CONFIG.minimumBookingAmount) {
    return {
      isValid: false,
      error: `Monto mínimo: $${ECUADOR_BUSINESS_CONFIG.minimumBookingAmount} USD`
    }
  }
  
  if (amount > ECUADOR_BUSINESS_CONFIG.maximumBookingAmount) {
    return {
      isValid: false,
      error: `Monto máximo: $${ECUADOR_BUSINESS_CONFIG.maximumBookingAmount} USD`
    }
  }
  
  return { isValid: true }
}