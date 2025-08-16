import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { BookingConfirmationEmail } from '../../components/emails/BookingConfirmationEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { type, to, data } = await request.json()

    let subject = ''
    let emailComponent = null

    switch (type) {
      case 'booking_confirmation':
        subject = `Confirmación de reserva - ${data.service}`
        emailComponent = BookingConfirmationEmail({
          customerName: data.customerName,
          providerName: data.providerName,
          service: data.service,
          date: data.date,
          time: data.time,
          location: data.location,
          price: data.price
        })
        break
      
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'EcuaCasa <noreply@ecuacasa.com>',
      to: [to],
      subject: subject,
      react: emailComponent,
    })

    if (error) {
      console.error('Email sending error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: emailData })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}