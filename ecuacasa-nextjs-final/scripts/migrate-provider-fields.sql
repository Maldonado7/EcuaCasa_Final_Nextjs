-- Migration script to add extended fields to providers table
-- Run this in your Supabase SQL editor or via psql

-- Add extended fields to providers table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS cedula VARCHAR(10),
ADD COLUMN IF NOT EXISTS references JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS insurance_info TEXT,
ADD COLUMN IF NOT EXISTS portfolio_images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS years_experience INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS hourly_rate DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS availability_schedule JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS emergency_contact JSONB DEFAULT '{}'::jsonb;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_providers_cedula ON providers(cedula);
CREATE INDEX IF NOT EXISTS idx_providers_experience ON providers(years_experience);
CREATE INDEX IF NOT EXISTS idx_providers_rate ON providers(hourly_rate);

-- Add constraint for Ecuador cedula format (exactly 10 digits)
ALTER TABLE providers 
ADD CONSTRAINT check_cedula_format 
CHECK (cedula IS NULL OR (cedula ~ '^[0-9]{10}$'));

-- Comment on columns
COMMENT ON COLUMN providers.cedula IS 'Ecuador national ID number (10 digits)';
COMMENT ON COLUMN providers.references IS 'Array of client references with name, phone, service_provided';
COMMENT ON COLUMN providers.insurance_info IS 'Insurance coverage details';
COMMENT ON COLUMN providers.portfolio_images IS 'Array of image URLs for portfolio gallery';
COMMENT ON COLUMN providers.years_experience IS 'Years of professional experience';
COMMENT ON COLUMN providers.hourly_rate IS 'Hourly rate in USD';
COMMENT ON COLUMN providers.availability_schedule IS 'Weekly availability schedule';
COMMENT ON COLUMN providers.emergency_contact IS 'Emergency contact information';

-- Sample update to test the new fields
-- UPDATE providers SET 
--   years_experience = 5,
--   hourly_rate = 25.00,
--   references = '[
--     {"name": "María García", "phone": "0987654321", "service_provided": "Limpieza de hogar"},
--     {"name": "Juan Pérez", "phone": "0976543210", "service_provided": "Plomería"}
--   ]'::jsonb
-- WHERE id = 'your-provider-id';

SELECT 'Migration completed successfully. Extended fields added to providers table.' AS status;