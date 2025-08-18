import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { currentUser } from '@clerk/nextjs/server'
import BookingConfirmationEmail from '@/components/emails/BookingConfirmationEmail'

const resend = new Resend(process.env.RESEND_API_KEY || 'demo-key')

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, to, data } = await request.json()

    let emailContent: any
    let subject: string

    switch (type) {
      case 'booking_confirmation':
        subject = `✅ Confirmación de Reserva - ${data.service}`
        emailContent = BookingConfirmationEmail({ 
          customerName: data.customerName,
          providerName: data.providerName,
          service: data.service,
          date: data.date,
          time: data.timeLabel,
          location: data.location,
          price: data.price,
          description: data.description
        })
        break
      
      case 'provider_approval':
        subject = '🎉 ¡Tu perfil ha sido aprobado en EcuaCasa!'
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed;">¡Bienvenido a EcuaCasa!</h1>
            <p>Hola ${data.providerName},</p>
            <p>¡Excelentes noticias! Tu perfil profesional ha sido aprobado y ya está activo en nuestra plataforma.</p>
            <p>Los clientes pueden encontrarte y contactarte directamente para solicitar tus servicios.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/my-provider-profile" 
               style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0;">
              Ver Mi Perfil
            </a>
            <p>¡Gracias por unirte a EcuaCasa!</p>
          </div>
        `
        break

      case 'booking_request':
        subject = `📅 Nueva Solicitud de Servicio - ${data.service}`
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed;">Nueva Solicitud de Servicio</h1>
            <p>Hola ${data.providerName},</p>
            <p>Tienes una nueva solicitud de servicio:</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Detalles del Servicio:</h3>
              <p><strong>Cliente:</strong> ${data.customerName}</p>
              <p><strong>Servicio:</strong> ${data.service}</p>
              <p><strong>Fecha:</strong> ${data.date}</p>
              <p><strong>Hora:</strong> ${data.timeLabel}</p>
              <p><strong>Ubicación:</strong> ${data.location}</p>
              <p><strong>Descripción:</strong> ${data.description}</p>
              <p><strong>Teléfono:</strong> ${data.customerPhone}</p>
            </div>
            <p>El cliente te contactará por WhatsApp para coordinar los detalles.</p>
          </div>
        `
        break

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    // For demo purposes, return success without actually sending
    // In production, uncomment the actual email sending:
    
    /*
    const result = await resend.emails.send({
      from: 'EcuaCasa <noreply@ecuacasa.com>',
      to: [to],
      subject: subject,
      html: emailContent,
    })
    */

    // Mock success response
    const result = {
      id: `demo_${Date.now()}`,
      success: true
    }

    console.log(`📧 Email sent (demo): ${type} to ${to}`)
    console.log(`Subject: ${subject}`)

    return NextResponse.json({ 
      success: true,
      emailId: result.id,
      message: `Email sent successfully (demo mode)`
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json({ 
      error: 'Failed to send email' 
    }, { status: 500 })
  }
}