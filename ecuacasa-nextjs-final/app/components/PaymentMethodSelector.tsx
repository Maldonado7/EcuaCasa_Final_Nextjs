'use client'

import { useState } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { calculateBookingFees } from '../lib/businessConfig'

interface PaymentMethodSelectorProps {
  amount: number
  providerName: string
  providerPhone?: string
  serviceName: string
  isEmergency?: boolean
  onPaymentMethodSelect: (method: 'payphone' | 'whatsapp' | 'cash', data?: any) => void
}

export default function PaymentMethodSelector({
  amount,
  providerName,
  providerPhone,
  serviceName,
  isEmergency = false,
  onPaymentMethodSelect
}: PaymentMethodSelectorProps) {
  const { t } = useTranslation()
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  
  const fees = calculateBookingFees(amount, isEmergency)

  const generateWhatsAppPaymentLink = () => {
    if (!providerPhone) {
      alert('Número de teléfono del proveedor no disponible')
      return
    }

    // Clean phone number (remove +593 and format)
    const cleanPhone = providerPhone.replace(/[^\d]/g, '')
    const whatsappPhone = cleanPhone.startsWith('593') ? cleanPhone : `593${cleanPhone.substring(1)}`
    
    const message = encodeURIComponent(
      `Hola ${providerName}! 👋\n\n` +
      `Solicito el servicio de: ${serviceName}\n` +
      `Monto total: $${fees.totalCustomerPays.toFixed(2)} USD\n\n` +
      `Por favor envíame el enlace de pago de Payphone para proceder.\n\n` +
      `Gracias! - EcuaCasa`
    )

    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${message}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Notify parent component
    onPaymentMethodSelect('whatsapp', {
      whatsappUrl,
      phone: whatsappPhone,
      message: decodeURIComponent(message)
    })
  }

  const generatePayphoneLink = () => {
    // Generate Payphone direct payment link
    const payphoneUrl = `https://pay.payphone.app/payments/create?` +
      `amount=${fees.totalCustomerPays.toFixed(2)}&` +
      `description=${encodeURIComponent(`${serviceName} - ${providerName}`)}&` +
      `reference=ecuacasa_${Date.now()}`
    
    // Open Payphone in new tab
    window.open(payphoneUrl, '_blank')
    
    onPaymentMethodSelect('payphone', {
      payphoneUrl,
      amount: fees.totalCustomerPays,
      description: `${serviceName} - ${providerName}`,
      providerReceives: fees.providerReceives
    })
  }

  const handleCashPayment = () => {
    onPaymentMethodSelect('cash', {
      amount: fees.baseAmount,
      note: 'Pago en efectivo al momento del servicio'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">
        {t('payment.methods.title')}
      </h3>

      {/* Payment Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          {t('payment.breakdown.title')}
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t('payment.service.cost')}:</span>
            <span>${fees.baseAmount.toFixed(2)}</span>
          </div>
          {isEmergency && (
            <div className="flex justify-between text-orange-600">
              <span>Recargo de emergencia (50%):</span>
              <span>+${(fees.baseAmount * 0.5).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-red-600">
            <span>{t('payment.platform.fee')} (10%):</span>
            <span>${fees.platformCommission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>{t('payment.processing.fee')} (5% + IVA):</span>
            <span>${(fees.paymentFee + fees.vat).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>{t('payment.total')}:</span>
            <span className="text-blue-600">${fees.totalCustomerPays.toFixed(2)} USD</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        
        {/* Payphone Payment */}
        <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {t('payment.payphone.title')}
                </h4>
                <p className="text-sm text-gray-600">
                  Visa, Mastercard, Diners, Discover
                </p>
                <p className="text-xs text-blue-600">
                  Procesamiento seguro PCI DSS 4.0
                </p>
              </div>
            </div>
            <button
              onClick={generatePayphoneLink}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Abrir Payphone ${fees.totalCustomerPays.toFixed(2)}
            </button>
          </div>
        </div>

        {/* WhatsApp Payment */}
        <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📱</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {t('payment.whatsapp.title')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('payment.whatsapp.instructions')}
                </p>
                {providerPhone && (
                  <p className="text-xs text-green-600">
                    {providerPhone}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={generateWhatsAppPaymentLink}
              disabled={!providerPhone}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {t('payment.whatsapp.generate')}
            </button>
          </div>
        </div>

        {/* Cash Payment */}
        <div className="border border-gray-200 rounded-lg p-4 hover:border-yellow-500 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">💵</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {t('payment.cash.title')}
                </h4>
                <p className="text-sm text-gray-600">
                  Pago en efectivo al momento del servicio
                </p>
                <p className="text-xs text-yellow-600">
                  Sin comisiones de procesamiento
                </p>
              </div>
            </div>
            <button
              onClick={handleCashPayment}
              className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors"
            >
              Acordar ${fees.baseAmount.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Notes */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          Información importante:
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• <strong>Payphone:</strong> Te redirige a la plataforma de pago segura</div>
          <div>• <strong>WhatsApp:</strong> Contacta directamente al proveedor para coordinar pago</div>
          <div>• <strong>Efectivo:</strong> Pago directo al momento del servicio</div>
          <div>• <strong>Protección:</strong> Todos los servicios están respaldados por EcuaCasa</div>
        </div>
      </div>
    </div>
  )
}