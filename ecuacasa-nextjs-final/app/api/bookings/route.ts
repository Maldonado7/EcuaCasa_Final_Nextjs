import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_SERVICE_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function GET() {
  const user = await currentUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get bookings from Supabase
    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('clerk_user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json({ bookings: [] })
    }
    
    return NextResponse.json({ bookings: bookings || [] })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ bookings: [] })
  }
}

export async function POST(request: Request) {
  const user = await currentUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookingData = await request.json()
    
    // Insert booking into Supabase
    const { data: newBooking, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        clerk_user_id: user.id,
        customer_name: `${user.firstName} ${user.lastName}`,
        customer_email: user.emailAddresses[0]?.emailAddress,
        ...bookingData,
        status: 'confirmado',
        date: bookingData.date || new Date().toISOString().split('T')[0],
        time: bookingData.time || '10:00'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, booking: newBooking })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}