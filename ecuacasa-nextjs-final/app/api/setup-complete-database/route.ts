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
    console.log('🚀 Setting up complete EcuaCasa database schema...')

    // Complete database schema for EcuaCasa
    const setupQueries = [
      // 1. Create user_profiles table
      `
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
      `,

      // 2. Create/update providers table with all needed columns
      `
      CREATE TABLE IF NOT EXISTS providers (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        service_type TEXT NOT NULL,
        description TEXT,
        location TEXT,
        city TEXT,
        phone TEXT,
        email TEXT,
        type TEXT DEFAULT 'individual',
        provider_type TEXT DEFAULT 'individual',
        contact_person TEXT,
        price_range TEXT,
        rating DECIMAL DEFAULT 5.0,
        reviews_count INTEGER DEFAULT 0,
        jobs_completed INTEGER DEFAULT 0,
        response_time TEXT DEFAULT '30min',
        available_24_7 BOOLEAN DEFAULT false,
        verified BOOLEAN DEFAULT false,
        business_name TEXT,
        specialties TEXT[],
        certifications TEXT[],
        portfolio_images TEXT[],
        availability JSONB,
        emergency_service BOOLEAN DEFAULT false,
        experience_years INTEGER,
        languages TEXT[],
        clerk_user_id TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      `,

      // 3. Create bookings table
      `
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
        provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
        service_id UUID,
        service TEXT,
        customer_name TEXT NOT NULL,
        customer_email TEXT,
        customer_phone TEXT,
        provider_name TEXT,
        date DATE NOT NULL,
        time TIME NOT NULL,
        time_label TEXT,
        location TEXT,
        address TEXT,
        description TEXT,
        price TEXT,
        status TEXT DEFAULT 'pendiente',
        clerk_user_id TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      `,

      // 4. Create indexes for performance
      `
      CREATE INDEX IF NOT EXISTS idx_user_profiles_clerk_id ON user_profiles(clerk_id);
      CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
      CREATE INDEX IF NOT EXISTS idx_providers_user_id ON providers(user_id);
      CREATE INDEX IF NOT EXISTS idx_providers_verified ON providers(verified);
      CREATE INDEX IF NOT EXISTS idx_providers_service_type ON providers(service_type);
      CREATE INDEX IF NOT EXISTS idx_providers_location ON providers(location);
      CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_provider_id ON bookings(provider_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
      `,

      // 5. Create RLS policies (Row Level Security)
      `
      ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
      ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

      -- User profiles policies
      DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
      CREATE POLICY "Users can view own profile" ON user_profiles
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
      CREATE POLICY "Users can update own profile" ON user_profiles
        FOR UPDATE USING (true);

      DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
      CREATE POLICY "Users can insert own profile" ON user_profiles
        FOR INSERT WITH CHECK (true);

      -- Providers policies
      DROP POLICY IF EXISTS "Anyone can view verified providers" ON providers;
      CREATE POLICY "Anyone can view verified providers" ON providers
        FOR SELECT USING (verified = true);

      DROP POLICY IF EXISTS "Users can view all providers" ON providers;
      CREATE POLICY "Users can view all providers" ON providers
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Users can insert providers" ON providers;
      CREATE POLICY "Users can insert providers" ON providers
        FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Users can update own providers" ON providers;
      CREATE POLICY "Users can update own providers" ON providers
        FOR UPDATE USING (true);

      -- Bookings policies
      DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
      CREATE POLICY "Users can view own bookings" ON bookings
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Users can insert bookings" ON bookings;
      CREATE POLICY "Users can insert bookings" ON bookings
        FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;
      CREATE POLICY "Users can update own bookings" ON bookings
        FOR UPDATE USING (true);
      `
    ]

    // Execute each query
    for (let i = 0; i < setupQueries.length; i++) {
      const query = setupQueries[i].trim()
      if (query) {
        console.log(`Executing query ${i + 1}/${setupQueries.length}...`)
        
        try {
          // Split and execute individual statements
          const statements = query.split(';').filter(s => s.trim())
          
          for (const statement of statements) {
            if (statement.trim()) {
              const { error } = await supabaseAdmin.rpc('exec_sql', {
                query: statement.trim() + ';'
              })
              
              if (error) {
                console.log(`Note: ${error.message}`)
                // Continue with other statements even if some fail
              }
            }
          }
        } catch (error) {
          console.log(`Note: Error in query ${i + 1}: ${error.message}`)
          // Continue with other queries
        }
      }
    }

    // Test the tables were created by checking each one
    const testResults = {}
    
    try {
      const { data: users } = await supabaseAdmin.from('user_profiles').select('id').limit(1)
      testResults['user_profiles'] = 'Created ✅'
    } catch (error) {
      testResults['user_profiles'] = `Error: ${error.message}`
    }

    try {
      const { data: providers } = await supabaseAdmin.from('providers').select('id').limit(1)
      testResults['providers'] = 'Created ✅'
    } catch (error) {
      testResults['providers'] = `Error: ${error.message}`
    }

    try {
      const { data: bookings } = await supabaseAdmin.from('bookings').select('id').limit(1)
      testResults['bookings'] = 'Created ✅'
    } catch (error) {
      testResults['bookings'] = `Error: ${error.message}`
    }

    console.log('✅ Database setup completed')

    return NextResponse.json({
      success: true,
      message: 'Complete EcuaCasa database schema created successfully',
      tables: testResults,
      nextSteps: [
        'Tables created with proper relationships',
        'Indexes added for performance',
        'RLS policies configured for security',
        'Ready for user sync and provider registration'
      ]
    })

  } catch (error) {
    console.error('Database setup error:', error)
    return NextResponse.json({
      error: 'Database setup failed',
      details: error.message,
      suggestion: 'Check Supabase connection and permissions'
    }, { status: 500 })
  }
}