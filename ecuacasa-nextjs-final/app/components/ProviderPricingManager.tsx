'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { DEFAULT_SERVICE_PRICING, calculateBookingFees, ServicePricing } from '../lib/businessConfig'

interface ProviderPricingManagerProps {
  providerId: string
  currentPricing?: ServicePricing[]
  onSave: (pricing: ServicePricing[]) => void
}

export default function ProviderPricingManager({ providerId, currentPricing, onSave }: ProviderPricingManagerProps) {
  const { t } = useTranslation()
  const [pricing, setPricing] = useState<ServicePricing[]>(currentPricing || DEFAULT_SERVICE_PRICING)
  const [selectedService, setSelectedService] = useState<string>('')

  const updateServicePrice = (serviceId: string, field: string, value: number | string) => {
    setPricing(prev => prev.map(service => {
      if (service.id === serviceId) {
        if (field === 'basePrice' || field === 'emergencyMultiplier') {
          return { ...service, [field]: Number(value) }
        } else if (field === 'priceUnit') {
          return { ...service, [field]: value }
        } else if (field.startsWith('priceRange.')) {
          const rangeField = field.split('.')[1]
          return {
            ...service,
            priceRange: {
              ...service.priceRange,
              [rangeField]: Number(value)
            }
          }
        }
      }
      return service
    }))
  }

  const calculateEarnings = (basePrice: number, isEmergency: boolean = false) => {
    const fees = calculateBookingFees(basePrice, isEmergency)
    return {
      customerPays: fees.totalCustomerPays.toFixed(2),
      providerReceives: fees.providerReceives.toFixed(2),
      platformFee: fees.platformCommission.toFixed(2),
      paymentFee: (fees.paymentFee + fees.vat).toFixed(2)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">
        {t('provider.pricing.title')}
      </h3>

      <div className="space-y-6">
        {pricing.map(service => {
          const regularEarnings = calculateEarnings(service.basePrice)
          const emergencyEarnings = calculateEarnings(service.basePrice, true)
          
          return (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-4 text-blue-600">
                {service.serviceType}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Base Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('provider.pricing.basePrice')} (USD)
                  </label>
                  <input
                    type="number"
                    value={service.basePrice}
                    onChange={(e) => updateServicePrice(service.id, 'basePrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    step="0.5"
                  />
                </div>

                {/* Price Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('provider.pricing.unit')}
                  </label>
                  <select
                    value={service.priceUnit}
                    onChange={(e) => updateServicePrice(service.id, 'priceUnit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="hourly">{t('provider.pricing.hourly')}</option>
                    <option value="fixed">{t('provider.pricing.fixed')}</option>
                    <option value="per_visit">{t('provider.pricing.perVisit')}</option>
                  </select>
                </div>

                {/* Emergency Multiplier */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('provider.pricing.emergencyMultiplier')}
                  </label>
                  <input
                    type="number"
                    value={service.emergencyMultiplier}
                    onChange={(e) => updateServicePrice(service.id, 'emergencyMultiplier', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="3"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('provider.pricing.minPrice')} (USD)
                  </label>
                  <input
                    type="number"
                    value={service.priceRange.min}
                    onChange={(e) => updateServicePrice(service.id, 'priceRange.min', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('provider.pricing.maxPrice')} (USD)
                  </label>
                  <input
                    type="number"
                    value={service.priceRange.max}
                    onChange={(e) => updateServicePrice(service.id, 'priceRange.max', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>

              {/* Earnings Calculator */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h5 className="font-medium text-gray-800 mb-3">
                  {t('provider.pricing.earningsCalculator')}
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {/* Regular Service */}
                  <div className="bg-white rounded p-3">
                    <h6 className="font-medium text-blue-600 mb-2">
                      {t('provider.pricing.regularService')}
                    </h6>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>{t('provider.pricing.customerPays')}:</span>
                        <span className="font-medium">${regularEarnings.customerPays}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>{t('provider.pricing.platformFee')} (10%):</span>
                        <span>-${regularEarnings.platformFee}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>{t('provider.pricing.paymentFee')} (5% + VAT):</span>
                        <span>-${regularEarnings.paymentFee}</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-600 border-t pt-1">
                        <span>{t('provider.pricing.youReceive')}:</span>
                        <span>${regularEarnings.providerReceives}</span>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Service */}
                  <div className="bg-white rounded p-3">
                    <h6 className="font-medium text-orange-600 mb-2">
                      {t('provider.pricing.emergencyService')}
                    </h6>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>{t('provider.pricing.customerPays')}:</span>
                        <span className="font-medium">${emergencyEarnings.customerPays}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>{t('provider.pricing.platformFee')} (10%):</span>
                        <span>-${emergencyEarnings.platformFee}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>{t('provider.pricing.paymentFee')} (5% + VAT):</span>
                        <span>-${emergencyEarnings.paymentFee}</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-600 border-t pt-1">
                        <span>{t('provider.pricing.youReceive')}:</span>
                        <span>${emergencyEarnings.providerReceives}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Payment Options Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          {t('provider.pricing.paymentOptions')}
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• <strong>Payphone:</strong> {t('provider.pricing.payphoneInfo')}</div>
          <div>• <strong>WhatsApp:</strong> {t('provider.pricing.whatsappInfo')}</div>
          <div>• <strong>Efectivo:</strong> {t('provider.pricing.cashInfo')}</div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onSave(pricing)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('provider.pricing.savePricing')}
        </button>
      </div>
    </div>
  )
}