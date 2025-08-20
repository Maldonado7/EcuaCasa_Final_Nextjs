import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_SERVICE_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST() {
  try {
    console.log('🔧 Fixing providers table structure...')
    
    // Since we can't run raw SQL via REST API, let's try to add missing columns
    // by attempting to insert data with all columns and let Supabase create them
    
    // Try inserting a test provider with all fields
    const testProvider = {
      business_name: 'Test Provider - DELETE ME',
      service_type: 'Test Service',
      description: 'Test description',
      price_range: '$1-2/hour',
      location: 'Test Location',
      city: 'Test City',
      phone: '0000000000',
      rating: 1.0,
      reviews_count: 0,
      verified: false,
      experience_years: 1,
      available_24_7: false,
      response_time: '1min'
    }
    
    const { data, error } = await supabaseAdmin
      .from('providers')
      .insert(testProvider)
      .select()
    
    if (error) {
      console.error('Error with test insert:', error)
      
      // If it fails, let's try with fewer columns
      const minimalProvider = {
        business_name: 'Test Provider - DELETE ME',
        service_type: 'Test Service',
        location: 'Test Location',
        verified: false
      }
      
      const { data: data2, error: error2 } = await supabaseAdmin
        .from('providers')
        .insert(minimalProvider)
        .select()
      
      if (error2) {
        return NextResponse.json({ 
          error: 'Cannot insert into providers table',
          details: error2,
          note: 'Table structure needs to be updated manually'
        }, { status: 500 })
      }
      
      // Delete the test record
      if (data2?.[0]) {
        await supabaseAdmin
          .from('providers')
          .delete()
          .eq('id', data2[0].id)
      }
      
      return NextResponse.json({
        success: true,
        message: 'Basic providers table is working',
        note: 'Some columns may be missing - will use available columns only'
      })
    }
    
    // If successful, delete the test record
    if (data?.[0]) {
      await supabaseAdmin
        .from('providers')
        .delete()
        .eq('id', data[0].id)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Providers table structure is complete',
      columns: 'All required columns are available'
    })
    
  } catch (error) {
    console.error('Fix error:', error)
    return NextResponse.json({ 
      error: 'Failed to check table structure',
      details: error 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check current providers table structure by trying to select all columns
    const { data, error } = await supabaseAdmin
      .from('providers')
      .select('*')
      .limit(1)
    
    return NextResponse.json({
      table_accessible: !error,
      sample_columns: data?.[0] ? Object.keys(data[0]) : [],
      error: error?.message
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Cannot access providers table'
    }, { status: 500 })
  }
}