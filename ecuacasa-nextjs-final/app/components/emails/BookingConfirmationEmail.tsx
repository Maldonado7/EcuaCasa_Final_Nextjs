import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Img,
  Hr,
  Row,
  Column,
} from '@react-email/components'

interface BookingConfirmationEmailProps {
  customerName: string
  providerName: string
  service: string
  date: string
  time: string
  location: string
  price: string
}

export function BookingConfirmationEmail({
  customerName,
  providerName,
  service,
  date,
  time,
  location,
  price
}: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f9fc' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
          {/* Header */}
          <Section style={{ padding: '40px 40px 20px', textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
              borderRadius: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Text style={{ 
                color: '#ffffff', 
                fontSize: '24px', 
                fontWeight: 'bold',
                margin: '0',
                lineHeight: '1'
              }}>
                EC
              </Text>
            </div>
            <Text style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 10px 0'
            }}>
              ¡Reserva Confirmada! ✅
            </Text>
            <Text style={{ 
              fontSize: '16px', 
              color: '#6b7280',
              margin: '0'
            }}>
              Tu servicio ha sido programado exitosamente
            </Text>
          </Section>

          {/* Booking Details */}
          <Section style={{ padding: '0 40px' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <Text style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: '#1f2937',
                margin: '0 0 16px 0'
              }}>
                Detalles de la Reserva
              </Text>

              <Row style={{ marginBottom: '12px' }}>
                <Column style={{ width: '30%' }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    Servicio:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#1f2937',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {service}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column style={{ width: '30%' }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    Profesional:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#1f2937',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {providerName}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column style={{ width: '30%' }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    Fecha:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#1f2937',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {date}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column style={{ width: '30%' }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    Hora:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#1f2937',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {time}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column style={{ width: '30%' }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    Ubicación:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#1f2937',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {location}
                  </Text>
                </Column>
              </Row>

              <Row>
                <Column style={{ width: '30%' }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    Precio:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ 
                    fontSize: '16px', 
                    color: '#7c3aed',
                    margin: '0',
                    fontWeight: 'bold'
                  }}>
                    {price}
                  </Text>
                </Column>
              </Row>
            </div>
          </Section>

          {/* Action Buttons */}
          <Section style={{ padding: '32px 40px' }}>
            <Text style={{ 
              fontSize: '16px', 
              color: '#1f2937',
              margin: '0 0 20px 0',
              textAlign: 'center'
            }}>
              ¿Necesitas hacer cambios a tu reserva?
            </Text>
            
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Button
                href="https://ecuacasa.com/dashboard"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              >
                Ver en Dashboard
              </Button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button
                href={`https://wa.me/593991234567?text=Hola ${providerName}, tengo una reserva confirmada para ${service} el ${date} a las ${time}`}
                style={{
                  background: '#25d366',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              >
                Contactar por WhatsApp
              </Button>
            </div>
          </Section>

          <Hr style={{ margin: '32px 40px', borderColor: '#e5e7eb' }} />

          {/* Footer */}
          <Section style={{ padding: '20px 40px 40px' }}>
            <Text style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              textAlign: 'center',
              margin: '0 0 8px 0'
            }}>
              Hola {customerName}, gracias por confiar en EcuaCasa para tus necesidades del hogar.
            </Text>
            <Text style={{ 
              fontSize: '12px', 
              color: '#9ca3af',
              textAlign: 'center',
              margin: '0'
            }}>
              EcuaCasa - Servicios para el hogar en Ecuador<br />
              Si tienes alguna pregunta, contáctanos a soporte@ecuacasa.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}