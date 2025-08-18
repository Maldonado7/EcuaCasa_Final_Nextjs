import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function GET() {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const isAdmin = user?.emailAddresses?.[0]?.emailAddress === 'admin@ecuacasa.com' ||
                    user?.publicMetadata?.role === 'admin'
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get recent bookings - using actual column names
    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        id,
        service_id,
        customer_name,
        status,
        date,
        time,
        price,
        location,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching recent bookings:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch recent bookings' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      bookings: bookings || [] 
    })

  } catch (error) {
    console.error('Error fetching recent bookings:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}