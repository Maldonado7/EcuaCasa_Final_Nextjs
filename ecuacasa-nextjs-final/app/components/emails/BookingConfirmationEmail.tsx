interface BookingConfirmationEmailProps {
  customerName: string
  providerName: string
  service: string
  date: string
  time: string
  location: string
  price: string
  description: string
}

export default function BookingConfirmationEmail({
  customerName,
  providerName,
  service,
  date,
  time,
  location,
  price,
  description
}: BookingConfirmationEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ecuacasa.com'
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#7c3aed' }}>✅ Confirmación de Reserva</h1>
      <p>Hola {customerName},</p>
      <p>Tu reserva ha sido confirmada exitosamente. Aquí están los detalles:</p>
      
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3>Detalles del Servicio:</h3>
        <p><strong>Profesional:</strong> {providerName}</p>
        <p><strong>Servicio:</strong> {service}</p>
        <p><strong>Fecha:</strong> {date}</p>
        <p><strong>Hora:</strong> {time}</p>
        <p><strong>Ubicación:</strong> {location}</p>
        <p><strong>Precio:</strong> {price}</p>
        {description && <p><strong>Descripción:</strong> {description}</p>}
      </div>

      <p>El profesional se pondrá en contacto contigo pronto para coordinar los detalles finales.</p>
      
      <a 
        href={baseUrl + '/bookings'}
        style={{
          background: '#7c3aed',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '8px',
          display: 'inline-block',
          margin: '20px 0'
        }}
      >
        Ver Mis Reservas
      </a>
      
      <p>¡Gracias por usar EcuaCasa!</p>
    </div>
  )
}
