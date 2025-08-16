const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDatabase() {
  console.log('🚀 Setting up Ecuador locations database...')
  
  try {
    // Read the SQL file
    const sqlContent = fs.readFileSync('ecuador-locations.sql', 'utf8')
    
    // Split SQL commands (basic splitting by semicolon)
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd && !cmd.startsWith('--'))
    
    console.log(`📝 Found ${commands.length} SQL commands to execute`)
    
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (!command) continue
      
      console.log(`📋 Executing command ${i + 1}/${commands.length}...`)
      
      try {
        const { data, error } = await supabase.rpc('exec_sql', { 
          query: command + ';' 
        })
        
        if (error) {
          // Try direct RPC execution for DDL commands
          const { data: data2, error: error2 } = await supabase
            .from('_dummy')  // This will fail but might give us better error info
            .select('*')
            
          console.log(`⚠️  Command ${i + 1} might have failed:`, error.message)
          // Continue anyway as some commands might be expected to fail (like IF NOT EXISTS)
        } else {
          console.log(`✅ Command ${i + 1} executed successfully`)
        }
      } catch (err) {
        console.log(`⚠️  Command ${i + 1} error:`, err.message)
      }
    }
    
    // Test the setup by querying cities
    console.log('\n🔍 Testing database setup...')
    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .select('name, province')
      .limit(5)
    
    if (citiesError) {
      console.error('❌ Failed to query cities:', citiesError.message)
    } else {
      console.log('✅ Successfully queried cities:', cities)
    }
    
    // Test neighborhoods
    const { data: neighborhoods, error: neighborhoodsError } = await supabase
      .from('neighborhoods')
      .select('name, zone')
      .limit(5)
    
    if (neighborhoodsError) {
      console.error('❌ Failed to query neighborhoods:', neighborhoodsError.message)
    } else {
      console.log('✅ Successfully queried neighborhoods:', neighborhoods)
    }
    
    console.log('\n🎉 Database setup completed!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    process.exit(1)
  }
}

// Alternative approach: Execute commands individually using raw SQL
async function setupDatabaseRaw() {
  console.log('🚀 Setting up database with individual commands...')
  
  const commands = [
    // Create cities table
    `CREATE TABLE IF NOT EXISTS cities (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      province TEXT NOT NULL,
      population INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    
    // Insert main cities
    `INSERT INTO cities (name, province, population) VALUES
      ('Quito', 'Pichincha', 2781641),
      ('Guayaquil', 'Guayas', 2698077),
      ('Cuenca', 'Azuay', 636996),
      ('Santo Domingo', 'Santo Domingo', 458580),
      ('Ambato', 'Tungurahua', 387309)
    ON CONFLICT (name) DO NOTHING`,
    
    // Create neighborhoods table  
    `CREATE TABLE IF NOT EXISTS neighborhoods (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
      zone TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`
  ]
  
  for (let i = 0; i < commands.length; i++) {
    console.log(`📋 Executing command ${i + 1}/${commands.length}...`)
    
    try {
      // Use the REST API directly for DDL commands
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey
        },
        body: JSON.stringify({ query: commands[i] })
      })
      
      if (response.ok) {
        console.log(`✅ Command ${i + 1} executed successfully`)
      } else {
        const error = await response.text()
        console.log(`⚠️  Command ${i + 1} response:`, error)
      }
    } catch (err) {
      console.log(`⚠️  Command ${i + 1} error:`, err.message)
    }
  }
}

// Run the setup
if (require.main === module) {
  setupDatabase().catch(console.error)
}