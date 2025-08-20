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
    const adminEmails = ['admin@ecuacasa.com', 'ecuacasa.app@gmail.com', 'carlosmaldonado@ecuacasa.com']
    const userEmail = user?.emailAddresses?.[0]?.emailAddress
    const isAdmin = adminEmails.includes(userEmail || '') || user?.publicMetadata?.role === 'admin'
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get pending providers - using actual column names
    const { data: providers, error } = await supabaseAdmin
      .from('providers')
      .select(`
        id,
        name,
        service_type,
        description,
        location,
        phone,
        type,
        email,
        created_at
      `)
      .eq('verified', false)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pending providers:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch pending providers' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      providers: providers || [] 
    })

  } catch (error) {
    console.error('Error fetching pending providers:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}