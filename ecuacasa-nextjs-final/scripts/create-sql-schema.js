#!/usr/bin/env node

// This script generates the complete SQL schema for EcuaCasa database
// Run this to get the SQL commands to paste into Supabase Dashboard

console.log('📋 EcuaCasa Database Schema Generator')
console.log('Copy and paste these SQL commands into your Supabase SQL Editor:\n')

console.log('-- ================================================')
console.log('-- 1. USER_PROFILES TABLE')
console.log('-- ================================================')
console.log(`
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

-- Indexes for user_profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_clerk_id ON user_profiles(clerk_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
`)

console.log('-- ================================================')
console.log('-- 2. ADD MISSING COLUMNS TO PROVIDERS TABLE')
console.log('-- ================================================')
console.log(`
-- Add missing columns to providers table (run only if columns don't exist)
ALTER TABLE providers ADD COLUMN IF NOT EXISTS price_range TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS contact_person TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS provider_type TEXT DEFAULT 'individual';
ALTER TABLE providers ADD COLUMN IF NOT EXISTS business_name TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS response_time TEXT DEFAULT '30min';
ALTER TABLE providers ADD COLUMN IF NOT EXISTS available_24_7 BOOLEAN DEFAULT false;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS experience_years INTEGER;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS specialties TEXT[];
ALTER TABLE providers ADD COLUMN IF NOT EXISTS certifications TEXT[];
ALTER TABLE providers ADD COLUMN IF NOT EXISTS portfolio_images TEXT[];

-- Indexes for providers
CREATE INDEX IF NOT EXISTS idx_providers_service_type ON providers(service_type);
CREATE INDEX IF NOT EXISTS idx_providers_location ON providers(location);
CREATE INDEX IF NOT EXISTS idx_providers_verified ON providers(verified);
CREATE INDEX IF NOT EXISTS idx_providers_rating ON providers(rating);
`)

console.log('-- ================================================')
console.log('-- 3. ADD MISSING COLUMNS TO BOOKINGS TABLE')
console.log('-- ================================================')
console.log(`
-- Add missing columns to bookings table (run only if columns don't exist)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS provider_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS time_label TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS price TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pendiente';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- Indexes for bookings
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_provider_id ON bookings(provider_id);
`)

console.log('-- ================================================')
console.log('-- 4. INSERT SAMPLE DATA')
console.log('-- ================================================')
console.log(`
-- Insert sample users
INSERT INTO user_profiles (clerk_id, email, first_name, last_name, role) VALUES
('admin-ecuacasa-app', 'ecuacasa.app@gmail.com', 'Admin', 'EcuaCasa', 'admin'),
('customer-demo', 'customer@demo.com', 'Demo', 'Customer', 'customer')
ON CONFLICT (clerk_id) DO NOTHING;

-- Insert sample providers (if user_profiles exist)
INSERT INTO providers (name, service_type, description, location, phone, type, verified, rating, user_id) VALUES
('Juan Pérez', 'Plomero Certificado', 'Plomero con 10 años de experiencia', 'El Centro, Cuenca', '+593999123456', 'individual', false, 5.0, 
  (SELECT id FROM user_profiles WHERE email = 'customer@demo.com' LIMIT 1)),
('María González', 'Electricista Profesional', 'Electricista certificada con experiencia', 'San Joaquín, Cuenca', '+593987654321', 'individual', false, 4.9, 
  (SELECT id FROM user_profiles WHERE email = 'customer@demo.com' LIMIT 1))
ON CONFLICT DO NOTHING;

-- Insert sample bookings
INSERT INTO bookings (service, customer_name, customer_email, date, time, location, status, user_id, provider_id) VALUES
('Plomería', 'Carlos Mendoza', 'carlos@test.com', '2025-08-17', '10:00', 'El Centro, Cuenca', 'confirmado',
  (SELECT id FROM user_profiles WHERE email = 'customer@demo.com' LIMIT 1),
  (SELECT id FROM providers WHERE name = 'Juan Pérez' LIMIT 1)),
('Electricidad', 'Ana Silva', 'ana@test.com', '2025-08-18', '14:00', 'San Joaquín, Cuenca', 'pendiente',
  (SELECT id FROM user_profiles WHERE email = 'customer@demo.com' LIMIT 1),
  (SELECT id FROM providers WHERE name = 'María González' LIMIT 1))
ON CONFLICT DO NOTHING;
`)

console.log('-- ================================================')
console.log('-- 5. ENABLE ROW LEVEL SECURITY (OPTIONAL)')
console.log('-- ================================================')
console.log(`
-- Enable RLS for security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies (basic public access for marketplace)
CREATE POLICY "Public can view verified providers" ON providers
  FOR SELECT USING (verified = true);

CREATE POLICY "Public can view all providers" ON providers
  FOR SELECT USING (true);

CREATE POLICY "Users can insert providers" ON providers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view user profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Users can insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);
`)

console.log('\n🎯 INSTRUCTIONS:')
console.log('1. Copy the SQL above')
console.log('2. Go to your Supabase Dashboard > SQL Editor')
console.log('3. Paste and run each section')
console.log('4. Refresh your admin panel: http://localhost:3000/admin')
console.log('5. You should see: 2 users, 12+ providers, 2+ bookings')

console.log('\n🚀 Alternative: Use the API endpoint:')
console.log('POST http://localhost:3000/api/setup-complete-database')