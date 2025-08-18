const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://gffczuvqjtovkdvpikls.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmN6dXZxanRvdmtkdnBpa2xzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDA1MTI3NiwiZXhwIjoyMDM5NjI3Mjc2fQ.TIjK0l8YrLRQKGO6Npp8zRKvR19qdnPJpE9z8lNOyhs'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addColumns() {
  console.log('Adding columns to providers table...')
  
  const columns = [
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS price_range TEXT',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS response_time TEXT DEFAULT \'30min\'',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 5',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT \'Lun-Dom 7:00-22:00\'',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS warranty TEXT DEFAULT \'30 días\'',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS insurance BOOLEAN DEFAULT false',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS emergency_available BOOLEAN DEFAULT false',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS services TEXT[]',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS portfolio TEXT[]',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS cedula VARCHAR(10)',
    'ALTER TABLE providers ADD COLUMN IF NOT EXISTS references JSONB DEFAULT \'[]\'::jsonb'
  ]
  
  for (const sql of columns) {
    try {
      console.log(`Executing: ${sql}`)
      const { data, error } = await supabase.rpc('exec_sql', { query: sql })
      if (error) {
        console.error('Error:', error)
      } else {
        console.log('✅ Success')
      }
    } catch (err) {
      console.error('Exception:', err)
    }
  }
  
  console.log('Migration complete!')
}

addColumns()