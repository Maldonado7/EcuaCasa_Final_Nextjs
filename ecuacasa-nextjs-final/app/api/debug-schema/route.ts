import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '../../../lib/supabase-admin'

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    // Get sample data to see actual column names
    const { data: providers, error: providersError } = await supabaseAdmin
      .from('providers')
      .select('*')
      .limit(1)

    const { data: bookings, error: bookingsError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .limit(1)

    const { data: users, error: usersError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .limit(5)

    return NextResponse.json({
      providers: {
        error: providersError,
        columns: providers?.[0] ? Object.keys(providers[0]) : [],
        sample: providers?.[0] || null
      },
      bookings: {
        error: bookingsError,
        columns: bookings?.[0] ? Object.keys(bookings[0]) : [],
        sample: bookings?.[0] || null
      },
      users: {
        error: usersError,
        columns: users?.[0] ? Object.keys(users[0]) : [],
        count: users?.length || 0,
        users: users || []
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Debug failed', details: error })
  }
}