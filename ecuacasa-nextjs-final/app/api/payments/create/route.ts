import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { calculateBookingFees } from '../../../lib/businessConfig'

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingData, amount, isEmergency = false } = await request.json()
    
    // Calculate fees using Ecuador business config
    const fees = calculateBookingFees(amount, isEmergency)
    
    // Prepare Payphone payment data
    const payphoneData = {
      amount: fees.totalCustomerPays,
      currency: 'USD',
      description: `${bookingData.service} - ${bookingData.providerName}`,
      reference: `booking_${Date.now()}`,
      clientTransactionId: `ecuacasa_${user.id}_${Date.now()}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel`,
      metadata: {
        booking: bookingData,
        fees: fees,
        userId: user.id
      }
    }

    // TODO: Replace with actual Payphone API call
    // For now, simulate payment creation
    const mockPaymentResponse = {
      success: true,
      paymentId: `payphone_${Date.now()}`,
      paymentUrl: `https://pay.payphone.app/pay/${payphoneData.clientTransactionId}`,
      amount: fees.totalCustomerPays,
      fees: fees
    }

    // Store payment intent in database
    // await supabase.from('payment_intents').insert({
    //   payment_id: mockPaymentResponse.paymentId,
    //   user_id: user.id,
    //   booking_data: bookingData,
    //   amount: fees.totalCustomerPays,
    //   fees: fees,
    //   status: 'pending'
    // })

    return NextResponse.json(mockPaymentResponse)
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json({ 
      error: 'Failed to create payment' 
    }, { status: 500 })
  }
}