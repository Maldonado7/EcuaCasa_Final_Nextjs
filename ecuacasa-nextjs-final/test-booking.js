// Test booking creation
const testBooking = {
  service: 'Plomería',
  providerName: 'Juan Pérez - Plomero Master',
  date: '2024-01-20',
  time: '10:00',
  timeLabel: 'Mañana (8:00 - 12:00)',
  location: 'El Centro, Cuenca',
  description: 'Reparación de fuga en el baño',
  price: '$45',
  status: 'confirmado'
}

fetch('http://localhost:3000/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testBooking)
})
.then(res => res.json())
.then(data => console.log('Booking created:', data))
.catch(err => console.error('Error:', err))