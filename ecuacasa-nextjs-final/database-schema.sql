-- EcuaCasa Database Schema
-- Run this in Supabase SQL Editor

-- Create user_profiles table if not exists
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'professional', 'both')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create providers table if not exists (may already exist)
CREATE TABLE IF NOT EXISTS providers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT,
  price_range TEXT,
  location TEXT NOT NULL,
  city TEXT,
  phone TEXT,
  rating DECIMAL(2,1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  experience_years INTEGER,
  available_24_7 BOOLEAN DEFAULT false,
  response_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table if not exists (may already exist)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  provider_id UUID,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  time_label TEXT,
  location TEXT NOT NULL,
  description TEXT,
  price TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  provider_name TEXT,
  clerk_user_id TEXT, -- Add this for easy lookup without user_profiles
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add clerk_user_id column to bookings if it doesn't exist
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_clerk_id ON user_profiles(clerk_id);
CREATE INDEX IF NOT EXISTS idx_providers_user_id ON providers(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_clerk_user_id ON bookings(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_provider_id ON bookings(provider_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for demo)
-- In production, you'd want more restrictive policies

-- Allow public to read providers
CREATE POLICY "Public can view providers" ON providers
  FOR SELECT USING (true);

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (true);

-- Allow users to read their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (true);

-- Allow insert for authenticated users (via service role for now)
CREATE POLICY "Service role can insert" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can insert providers" ON providers
  FOR INSERT WITH CHECK (true);