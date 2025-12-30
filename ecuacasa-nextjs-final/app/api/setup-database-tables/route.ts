import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST() {
  const supabaseAdmin = getSupabaseAdmin()
  try {
    console.log('🚀 Setting up database tables...')
    
    // Create user_profiles table
    const { error: userProfilesError } = await supabaseAdmin.rpc('create_table_if_not_exists', {
      table_sql: `
        CREATE TABLE IF NOT EXISTS user_profiles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          clerk_id TEXT UNIQUE NOT NULL,
          email TEXT NOT NULL,
          first_name TEXT,
          last_name TEXT,
          phone TEXT,
          role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'professional', 'both')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).catch(err => ({ error: err }))
    
    // Create providers table
    const { error: providersError } = await supabaseAdmin.rpc('create_table_if_not_exists', {
      table_sql: `
        CREATE TABLE IF NOT EXISTS providers (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
          business_name TEXT NOT NULL,
          service_type TEXT NOT NULL,
          description TEXT,
          price_range TEXT,
          location TEXT NOT NULL,
          city TEXT,
          phone TEXT,
          rating DECIMAL(2,1) DEFAULT 5.0,
          reviews_count INTEGER DEFAULT 0,
          verified BOOLEAN DEFAULT false,
          experience_years INTEGER,
          available_24_7 BOOLEAN DEFAULT false,
          response_time TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).catch(err => ({ error: err }))
    
    // Create bookings table
    const { error: bookingsError } = await supabaseAdmin.rpc('create_table_if_not_exists', {
      table_sql: `
        CREATE TABLE IF NOT EXISTS bookings (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
          provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
          service TEXT NOT NULL,
          date DATE NOT NULL,
          time TEXT NOT NULL,
          time_label TEXT,
          location TEXT NOT NULL,
          description TEXT,
          price TEXT,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
          customer_name TEXT,
          customer_email TEXT,
          customer_phone TEXT,
          provider_name TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).catch(err => ({ error: err }))

    // Since direct SQL might not work, let's try creating tables using Supabase's REST API
    // First, let's check what tables exist
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .catch(() => ({ data: null, error: 'Could not fetch tables' }))

    // Create tables using simpler approach - insert dummy data to force table creation
    // Note: In production, you should create tables via Supabase Dashboard SQL Editor
    
    // Try to create user_profiles by inserting and then deleting
    const { error: createUserProfilesError } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        clerk_id: 'dummy_' + Date.now(),
        email: 'dummy@example.com',
        first_name: 'Dummy',
        last_name: 'User',
        role: 'customer'
      })
      .then(async () => {
        // Delete the dummy record
        await supabaseAdmin
          .from('user_profiles')
          .delete()
          .match({ email: 'dummy@example.com' })
        return { error: null }
      })
      .catch(err => ({ error: err.message }))

    // Try to create providers table
    const { error: createProvidersError } = await supabaseAdmin
      .from('providers')
      .insert({
        business_name: 'Dummy Provider',
        service_type: 'Plomero',
        location: 'Cuenca',
        city: 'Cuenca'
      })
      .then(async () => {
        await supabaseAdmin
          .from('providers')
          .delete()
          .match({ business_name: 'Dummy Provider' })
        return { error: null }
      })
      .catch(err => ({ error: err.message }))

    // Try to create bookings table
    const { error: createBookingsError } = await supabaseAdmin
      .from('bookings')
      .insert({
        service: 'Dummy Service',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        location: 'Dummy Location',
        customer_name: 'Dummy Customer',
        status: 'pending'
      })
      .then(async () => {
        await supabaseAdmin
          .from('bookings')
          .delete()
          .match({ customer_name: 'Dummy Customer' })
        return { error: null }
      })
      .catch(err => ({ error: err.message }))

    return NextResponse.json({ 
      success: true,
      message: 'Database setup attempted. Please check Supabase Dashboard.',
      details: {
        user_profiles: createUserProfilesError ? `Error: ${createUserProfilesError}` : 'OK',
        providers: createProvidersError ? `Error: ${createProvidersError}` : 'OK',
        bookings: createBookingsError ? `Error: ${createBookingsError}` : 'OK',
        note: 'If tables don\'t exist, please create them manually in Supabase SQL Editor'
      }
    })

  } catch (error) {
    console.error('Database setup error:', error)
    return NextResponse.json({ 
      error: 'Database setup failed',
      details: error,
      message: 'Please create tables manually in Supabase Dashboard'
    }, { status: 500 })
  }
}

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin()
  try {
    // Check existing tables
    const { data: userProfiles } = await supabaseAdmin.from('user_profiles').select('count')
    const { data: providers } = await supabaseAdmin.from('providers').select('count')
    const { data: bookings } = await supabaseAdmin.from('bookings').select('count')
    
    return NextResponse.json({
      tables: {
        user_profiles: userProfiles ? 'exists' : 'not found',
        providers: providers ? 'exists' : 'not found',
        bookings: bookings ? 'exists' : 'not found'
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Could not check tables',
      message: 'Some tables may not exist yet'
    })
  }
}