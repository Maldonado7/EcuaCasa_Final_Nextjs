#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🚀 EcuaCasa Database Setup Script')
console.log('Supabase URL:', supabaseUrl ? '✅ Found' : '❌ Missing')
console.log('Service Key:', supabaseServiceKey ? '✅ Found' : '❌ Missing')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  console.log('\n📊 Checking database status...')
  
  try {
    // Check user_profiles table
    const { count: userCount, error: userError } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
    
    if (userError) {
      console.log('❗ user_profiles table issue:', userError.message)
    } else {
      console.log(`✅ user_profiles: ${userCount} records`)
    }

    // Check providers table  
    const { count: providerCount, error: providerError } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })
    
    if (providerError) {
      console.log('❗ providers table issue:', providerError.message)
    } else {
      console.log(`✅ providers: ${providerCount} records`)
    }

    // Check bookings table
    const { count: bookingCount, error: bookingError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
    
    if (bookingError) {
      console.log('❗ bookings table issue:', bookingError.message)
    } else {
      console.log(`✅ bookings: ${bookingCount} records`)
    }

    console.log('\n🎯 Admin panel should show:')
    console.log(`   Users: ${userCount || 2} (with fallback)`)
    console.log(`   Providers: ${providerCount || 12} (with mock data)`)
    console.log(`   Bookings: ${bookingCount || 8} (with mock data)`)
    
  } catch (error) {
    console.error('💥 Database check failed:', error.message)
  }
}

main()
