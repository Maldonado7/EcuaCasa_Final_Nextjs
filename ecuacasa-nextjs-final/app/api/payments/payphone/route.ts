import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

// Payphone Ecuador API configuration
const PAYPHONE_API_URL = 'https://pay.payphone.app'
const PAYPHONE_TOKEN = process.env.PAYPHONE_TOKEN // Add to .env.local
const PAYPHONE_STORE_ID = process.env.PAYPHONE_STORE_ID // Add to .env.local

interface PayphonePaymentRequest {
  amount: number
  description: string
  providerId: string
  bookingId?: string
  customerEmail: string
  customerName: string
}

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: PayphonePaymentRequest = await request.json()
    const { amount, description, providerId, bookingId, customerEmail, customerName } = body

    // Validate required fields
    if (!amount || !description || !providerId) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // Generate unique transaction ID
    const transactionId = `ecuacasa_${Date.now()}_${Math.random().toString(36).substring(7)}`

    // Prepare Payphone payment request
    const payphonePayload = {
      amount: Math.round(amount * 100), // Convert to cents
      amountWithoutTax: Math.round(amount * 100),
      tax: 0,
      service: 0,
      tip: 0,
      currency: 'USD',
      reference: transactionId,
      description: description,
      clientTxId: transactionId,
      optionalParameter1: bookingId || '',
      optionalParameter2: providerId,
      optionalParameter3: user.id,
      
      // Success/Cancel URLs
      confirmUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?txId=${transactionId}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel?txId=${transactionId}`,
      
      // Store information
      storeId: PAYPHONE_STORE_ID,
      
      // Customer information
      customerEmail: customerEmail,
      customerName: customerName,
    }

    // For development/testing - return mock payment URL
    if (process.env.NODE_ENV === 'development' || !PAYPHONE_TOKEN) {
      console.log('🧪 Development mode - Mock Payphone payment')
      console.log('Payment details:', payphonePayload)
      
      return NextResponse.json({
        success: true,
        paymentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/mock?amount=${amount}&txId=${transactionId}`,
        transactionId: transactionId,
        message: 'Modo de desarrollo - Pago simulado',
        paymentDetails: {
          amount: amount,
          currency: 'USD',
          description: description,
          transactionId: transactionId
        }
      })
    }

    // Make request to Payphone API
    const payphoneResponse = await fetch(`${PAYPHONE_API_URL}/api/button/V2/CreatePayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYPHONE_TOKEN}`,
      },
      body: JSON.stringify(payphonePayload)
    })

    if (!payphoneResponse.ok) {
      throw new Error(`Payphone API error: ${payphoneResponse.status}`)
    }

    const payphoneData = await payphoneResponse.json()

    // Log transaction for admin tracking
    console.log('✅ Payphone payment created:', {
      transactionId,
      amount,
      providerId,
      customerEmail,
      payphoneTransactionId: payphoneData.transactionId
    })

    return NextResponse.json({
      success: true,
      paymentUrl: payphoneData.payUrl,
      transactionId: transactionId,
      payphoneTransactionId: payphoneData.transactionId,
      message: 'Pago creado exitosamente'
    })

  } catch (error) {
    console.error('Payphone payment error:', error)
    return NextResponse.json({
      error: 'Error processing payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to verify payment status
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const transactionId = url.searchParams.get('transactionId')
    
    if (!transactionId) {
      return NextResponse.json({ 
        error: 'Transaction ID required' 
      }, { status: 400 })
    }

    // For development mode
    if (process.env.NODE_ENV === 'development' || !PAYPHONE_TOKEN) {
      return NextResponse.json({
        success: true,
        status: 'completed',
        transactionId: transactionId,
        message: 'Pago verificado (modo desarrollo)'
      })
    }

    // Query Payphone API for payment status
    const statusResponse = await fetch(
      `${PAYPHONE_API_URL}/api/v1/transactions/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${PAYPHONE_TOKEN}`,
        }
      }
    )

    if (!statusResponse.ok) {
      throw new Error(`Payphone status check failed: ${statusResponse.status}`)
    }

    const statusData = await statusResponse.json()

    return NextResponse.json({
      success: true,
      status: statusData.status,
      transactionId: transactionId,
      amount: statusData.amount,
      message: 'Estado del pago obtenido'
    })

  } catch (error) {
    console.error('Payment status check error:', error)
    return NextResponse.json({
      error: 'Error checking payment status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}