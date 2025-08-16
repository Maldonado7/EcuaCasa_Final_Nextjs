import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// In-memory storage for demo (in production, use Supabase/database)
let bookings: any[] = []

export async function GET() {
  const user = await currentUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Filter bookings for current user
  const userBookings = bookings.filter(booking => booking.userId === user.id)
  
  return NextResponse.json({ bookings: userBookings })
}

export async function POST(request: Request) {
  const user = await currentUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookingData = await request.json()
    
    const newBooking = {
      id: Date.now().toString(),
      userId: user.id,
      ...bookingData,
      status: 'confirmado',
      createdAt: new Date().toISOString()
    }
    
    bookings.push(newBooking)
    
    return NextResponse.json({ success: true, booking: newBooking })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}