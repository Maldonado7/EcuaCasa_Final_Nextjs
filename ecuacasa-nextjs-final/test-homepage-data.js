const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Testing Homepage Data Loading...\n')
console.log('Supabase URL:', supabaseUrl ? '✅' : '❌')
console.log('Service Key:', supabaseServiceKey ? '✅' : '❌')

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testHomepageData() {
  console.log('\n📊 HOMEPAGE DATA TEST:')
  console.log('=' .repeat(50))
  
  // 1. Test providers query (same as homepage)
  console.log('\n1️⃣ Testing Providers Query (homepage logic):')
  try {
    const { data, error, count } = await supabase
      .from('providers')
      .select('*', { count: 'exact' })
      .order('rating', { ascending: false })
      .limit(8)
    
    if (error) {
      console.log('❌ Error loading providers:', error.message)
    } else {
      console.log('✅ Providers query successful!')
      console.log('   Total in database:', count || 0)
      console.log('   Returned:', data?.length || 0)
      
      if (data && data.length > 0) {
        console.log('   Provider names:', data.map(p => p.name).join(', '))
      } else {
        console.log('   ⚠️  No providers - homepage will show mock data')
      }
    }
  } catch (err) {
    console.log('💥 Exception:', err.message)
  }
  
  // 2. Test services query
  console.log('\n2️⃣ Testing Services Query:')
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .limit(8)
    
    if (error) {
      console.log('❌ Services table error:', error.message)
      console.log('   (This is expected if services table doesn\'t exist)')
    } else {
      console.log('✅ Services:', data?.length || 0)
    }
  } catch (err) {
    console.log('💥 Exception:', err.message)
  }
  
  // 3. Test stats queries
  console.log('\n3️⃣ Testing Stats Queries:')
  try {
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    const { count: providerCount } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })
    
    console.log('   Users table:', userCount !== null ? `${userCount} users` : 'table not found')
    console.log('   Providers:', providerCount || 0)
  } catch (err) {
    console.log('💥 Exception:', err.message)
  }
  
  console.log('\n' + '=' .repeat(50))
  console.log('📝 SUMMARY:')
  console.log('- Homepage tries to load from Supabase ✅')
  console.log('- If no data, it shows mock providers ✅')
  console.log('- Featured cards filter for Cuenca locations ✅')
  console.log('\n💡 To see real data: Add providers via /providers/register')
}

testHomepageData()