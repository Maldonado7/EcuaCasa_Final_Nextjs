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

export async function POST() {
  try {
    console.log('🏗️ Creating user_profiles table...')

    // Create user_profiles table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS user_profiles (
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

      -- Create index for faster lookups
      CREATE INDEX IF NOT EXISTS idx_user_profiles_clerk_id ON user_profiles(clerk_id);
      CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
    `

    const { error: tableError } = await supabaseAdmin.rpc('exec_sql', {
      sql: createTableQuery
    })

    if (tableError) {
      console.error('Error creating user_profiles table:', tableError)
      // Try alternative approach
      const { error: altError } = await supabaseAdmin
        .from('user_profiles')
        .select('id')
        .limit(1)
      
      if (altError && altError.code === '42P01') {
        // Table definitely doesn't exist, create manually
        return NextResponse.json({
          error: 'Failed to create user_profiles table',
          details: tableError?.message || 'Table creation failed',
          suggestion: 'Please create the table manually in Supabase dashboard'
        }, { status: 500 })
      }
    }

    // Test the table was created
    const { data: testData, error: testError } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .limit(1)

    if (testError) {
      return NextResponse.json({
        error: 'Table creation verification failed',
        details: testError.message
      }, { status: 500 })
    }

    console.log('✅ user_profiles table created successfully')

    return NextResponse.json({
      success: true,
      message: 'user_profiles table created successfully',
      nextStep: 'Now sync your existing Clerk users to this table'
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 })
  }
}