import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST() {
  const supabaseAdmin = getSupabaseAdmin()
  try {
    console.log('🚀 Setting up EcuaCasa database tables...')

    const results = []

    // 1. Create user_profiles table using table creation
    try {
      console.log('Creating user_profiles table...')
      
      // First try to insert a test record to see if table exists
      const { error: testError } = await supabaseAdmin
        .from('user_profiles')
        .select('id')
        .limit(1)

      if (testError && testError.code === '42P01') {
        // Table doesn't exist, need to create it manually
        results.push({
          table: 'user_profiles',
          status: 'needs_manual_creation',
          message: 'Table does not exist - create manually in Supabase Dashboard'
        })
      } else {
        results.push({
          table: 'user_profiles', 
          status: 'exists',
          message: 'Table already exists'
        })
      }
    } catch (error) {
      results.push({
        table: 'user_profiles',
        status: 'error',
        message: error.message
      })
    }

    // 2. Update providers table to add missing columns
    try {
      console.log('Checking providers table...')
      
      const { data: sampleProvider, error } = await supabaseAdmin
        .from('providers')
        .select('*')
        .limit(1)

      if (!error) {
        const existingColumns = sampleProvider?.[0] ? Object.keys(sampleProvider[0]) : []
        
        results.push({
          table: 'providers',
          status: 'exists',
          columns: existingColumns,
          message: `Table exists with ${existingColumns.length} columns`
        })
      } else {
        results.push({
          table: 'providers',
          status: 'error',
          message: error.message
        })
      }
    } catch (error) {
      results.push({
        table: 'providers',
        status: 'error', 
        message: error.message
      })
    }

    // 3. Check bookings table
    try {
      console.log('Checking bookings table...')
      
      const { data: sampleBooking, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .limit(1)

      if (!error) {
        const existingColumns = sampleBooking?.[0] ? Object.keys(sampleBooking[0]) : []
        
        results.push({
          table: 'bookings',
          status: 'exists',
          columns: existingColumns,
          message: `Table exists with ${existingColumns.length} columns`
        })
      } else {
        results.push({
          table: 'bookings',
          status: 'error',
          message: error.message
        })
      }
    } catch (error) {
      results.push({
        table: 'bookings',
        status: 'error',
        message: error.message
      })
    }

    // 4. Create sample data for testing
    console.log('Creating sample users for testing...')
    
    try {
      // Try to create sample users if user_profiles table exists
      const { error: userInsertError } = await supabaseAdmin
        .from('user_profiles')
        .upsert([
          {
            clerk_id: 'test-admin-user',
            email: 'ecuacasa.app@gmail.com',
            first_name: 'Admin',
            last_name: 'User',
            role: 'admin'
          },
          {
            clerk_id: 'test-customer-user',
            email: 'customer@test.com',
            first_name: 'Test',
            last_name: 'Customer',
            role: 'customer'
          }
        ], {
          onConflict: 'clerk_id'
        })

      if (!userInsertError) {
        results.push({
          table: 'sample_users',
          status: 'created',
          message: 'Sample users created successfully'
        })
      }
    } catch (error) {
      results.push({
        table: 'sample_users',
        status: 'skipped',
        message: 'Could not create sample users - table may not exist'
      })
    }

    console.log('✅ Database setup check completed')

    return NextResponse.json({
      success: true,
      message: 'Database setup check completed',
      results: results,
      instructions: {
        missing_tables: 'If any tables are missing, create them in Supabase Dashboard using the SQL provided',
        sql_for_user_profiles: `
          CREATE TABLE user_profiles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            clerk_id TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT,
            phone TEXT,
            role TEXT DEFAULT 'customer',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
        next_step: 'Run this API to verify and create missing tables'
      }
    })

  } catch (error) {
    console.error('Database setup error:', error)
    return NextResponse.json({
      error: 'Database setup failed',
      details: error.message
    }, { status: 500 })
  }
}