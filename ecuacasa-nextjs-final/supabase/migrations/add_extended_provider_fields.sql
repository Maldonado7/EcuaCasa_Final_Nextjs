-- Add extended fields to providers table
ALTER TABLE providers
ADD COLUMN IF NOT EXISTS price_range TEXT,
ADD COLUMN IF NOT EXISTS response_time TEXT DEFAULT '30min',
ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT 'Lun-Dom 7:00-22:00',
ADD COLUMN IF NOT EXISTS warranty TEXT DEFAULT '30 días',
ADD COLUMN IF NOT EXISTS insurance BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS emergency_available BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS services TEXT[],
ADD COLUMN IF NOT EXISTS portfolio TEXT[],
ADD COLUMN IF NOT EXISTS cedula VARCHAR(10),
ADD COLUMN IF NOT EXISTS references JSONB DEFAULT '[]'::jsonb;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_providers_cedula ON providers(cedula);
CREATE INDEX IF NOT EXISTS idx_providers_emergency ON providers(emergency_available);
CREATE INDEX IF NOT EXISTS idx_providers_insurance ON providers(insurance);

-- Update existing providers with default values
UPDATE providers 
SET 
  price_range = COALESCE(price_range, '$25-45/hora'),
  response_time = COALESCE(response_time, '30min'),
  experience = COALESCE(experience, 5),
  availability = COALESCE(availability, 'Lun-Dom 7:00-22:00'),
  warranty = COALESCE(warranty, '30 días'),
  services = COALESCE(services, ARRAY['Servicio profesional garantizado']),
  references = COALESCE(references, '[]'::jsonb)
WHERE price_range IS NULL;