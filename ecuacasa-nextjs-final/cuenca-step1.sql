-- STEP 1: Create tables and add columns
-- Run this first

-- Create cities table for Ecuador (focusing on Cuenca)
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
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  zone TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to providers table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS service_type TEXT;

ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS city_id UUID;

ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS neighborhood_id UUID;

ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS address TEXT;

ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS service_areas TEXT[];

-- Add foreign key constraints (run these separately if they fail)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_providers_city') THEN
        ALTER TABLE providers ADD CONSTRAINT fk_providers_city 
        FOREIGN KEY (city_id) REFERENCES cities(id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_providers_neighborhood') THEN
        ALTER TABLE providers ADD CONSTRAINT fk_providers_neighborhood 
        FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id);
    END IF;
END $$;