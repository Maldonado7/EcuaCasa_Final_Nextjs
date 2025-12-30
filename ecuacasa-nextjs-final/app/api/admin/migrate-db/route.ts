import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST() {
  const supabaseAdmin = getSupabaseAdmin()
  try {
    const user = await currentUser()
    
    // Check if user is admin
    if (!user || user.emailAddresses[0]?.emailAddress !== 'ecuacasa.app@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Add extended fields to providers table
    const migrations = [
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS price_range TEXT`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS response_time TEXT DEFAULT '30min'`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 5`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT 'Lun-Dom 7:00-22:00'`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS warranty TEXT DEFAULT '30 días'`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS insurance BOOLEAN DEFAULT false`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS emergency_available BOOLEAN DEFAULT false`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS services TEXT[]`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS portfolio TEXT[]`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS cedula VARCHAR(10)`,
      `ALTER TABLE providers ADD COLUMN IF NOT EXISTS references JSONB DEFAULT '[]'::jsonb`,
      
      // Add indexes
      `CREATE INDEX IF NOT EXISTS idx_providers_cedula ON providers(cedula)`,
      `CREATE INDEX IF NOT EXISTS idx_providers_emergency ON providers(emergency_available)`,
      `CREATE INDEX IF NOT EXISTS idx_providers_insurance ON providers(insurance)`,
      
      // Update existing providers with default values
      `UPDATE providers SET 
        price_range = COALESCE(price_range, '$25-45/hora'),
        response_time = COALESCE(response_time, '30min'),
        experience = COALESCE(experience, 5),
        availability = COALESCE(availability, 'Lun-Dom 7:00-22:00'),
        warranty = COALESCE(warranty, '30 días'),
        services = COALESCE(services, ARRAY['Servicio profesional garantizado']),
        references = COALESCE(references, '[]'::jsonb)
       WHERE price_range IS NULL OR response_time IS NULL OR experience IS NULL`
    ]

    const results = []
    for (const sql of migrations) {
      try {
        const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql_query: sql })
        if (error) {
          console.error(`Error executing SQL: ${sql}`, error)
          results.push({ sql, error: error.message })
        } else {
          results.push({ sql, success: true })
        }
      } catch (err) {
        console.error(`Exception executing SQL: ${sql}`, err)
        results.push({ sql, error: 'Exception occurred' })
      }
    }

    return NextResponse.json({ 
      message: 'Database migration completed',
      results 
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ 
      error: 'Migration failed' 
    }, { status: 500 })
  }
}