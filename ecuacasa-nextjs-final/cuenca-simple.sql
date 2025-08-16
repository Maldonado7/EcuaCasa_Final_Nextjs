-- Simple version - create tables and columns only

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  population INTEGER,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city_id UUID,
  zone TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add columns to providers table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS service_type TEXT;

ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS city_id UUID;

ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS neighborhood_id UUID;

ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS address TEXT;