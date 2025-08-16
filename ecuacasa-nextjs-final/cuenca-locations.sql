-- Create cities table for Ecuador (focusing on Cuenca)
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  population INTEGER,
  is_primary BOOLEAN DEFAULT false, -- For SEO focus
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  zone TEXT, -- Norte, Sur, Centro, Este, Oeste
  is_featured BOOLEAN DEFAULT false, -- For highlighting main neighborhoods
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to providers table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS service_type TEXT,
ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES cities(id),
ADD COLUMN IF NOT EXISTS neighborhood_id UUID REFERENCES neighborhoods(id),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS service_areas TEXT[]; -- Array of neighborhood IDs they serve

-- Insert Ecuador cities (Cuenca as primary)
INSERT INTO cities (name, province, population, is_primary) VALUES
  ('Cuenca', 'Azuay', 636996, true), -- Primary city for SEO
  ('Quito', 'Pichincha', 2781641, false),
  ('Guayaquil', 'Guayas', 2698077, false),
  ('Santo Domingo', 'Santo Domingo', 458580, false),
  ('Ambato', 'Tungurahua', 387309, false),
  ('Portoviejo', 'Manabí', 321800, false),
  ('Manta', 'Manabí', 264281, false),
  ('Loja', 'Loja', 274112, false),
  ('Riobamba', 'Chimborazo', 264048, false),
  ('Ibarra', 'Imbabura', 221149, false),
  ('Esmeraldas', 'Esmeraldas', 218727, false),
  ('Machala', 'El Oro', 289141, false)
ON CONFLICT (name) DO UPDATE SET 
  is_primary = EXCLUDED.is_primary;

-- Insert Cuenca neighborhoods (detailed for SEO)
WITH cuenca_id AS (SELECT id FROM cities WHERE name = 'Cuenca')
INSERT INTO neighborhoods (name, city_id, zone, is_featured) 
SELECT name, cuenca_id.id, zone, featured FROM cuenca_id,
(VALUES
  -- Featured neighborhoods for SEO
  ('El Centro', 'Centro', true),
  ('San Joaquín', 'Oeste', true),
  ('San Sebastián', 'Centro', true),
  
  -- Other important neighborhoods
  ('El Batán', 'Norte', false),
  ('El Sagrario', 'Centro', false),
  ('Sucre', 'Centro', false),
  ('Huayna Cápac', 'Norte', false),
  ('Totoracocha', 'Sur', false),
  ('Yanuncay', 'Sur', false),
  ('El Vecino', 'Sur', false),
  ('Feria Libre', 'Oeste', false),
  ('El Arenal', 'Oeste', false),
  ('Las Américas', 'Oeste', false),
  ('Puertas del Sol', 'Norte', false),
  ('Ricaurte', 'Norte', false),
  ('Baños', 'Suroeste', false),
  ('Sayausí', 'Oeste', false),
  ('El Valle', 'Este', false),
  ('Santa Ana', 'Este', false),
  ('Turi', 'Sur', false),
  ('Monay', 'Sur', false),
  ('Cumbe', 'Sur', false),
  ('Bellavista', 'Norte', false),
  ('Ciudadela del Chofer', 'Norte', false),
  ('9 de Octubre', 'Este', false),
  ('La Alborada', 'Norte', false),
  ('Kennedy', 'Norte', false),
  ('Miraflores', 'Este', false),
  ('Quinta Chica', 'Este', false),
  ('Gil Ramírez Davalos', 'Centro', false),
  ('Machángara', 'Sur', false)
) AS t(name, zone, featured)
ON CONFLICT DO NOTHING;

-- Insert key neighborhoods for other main cities
WITH quito_id AS (SELECT id FROM cities WHERE name = 'Quito')
INSERT INTO neighborhoods (name, city_id, zone) 
SELECT name, quito_id.id, zone FROM quito_id,
(VALUES
  ('La Carolina', 'Norte'),
  ('La Mariscal', 'Norte'),
  ('Centro Histórico', 'Centro'),
  ('Cumbayá', 'Valle'),
  ('La Floresta', 'Centro')
) AS t(name, zone)
ON CONFLICT DO NOTHING;

WITH guayaquil_id AS (SELECT id FROM cities WHERE name = 'Guayaquil')
INSERT INTO neighborhoods (name, city_id, zone)
SELECT name, guayaquil_id.id, zone FROM guayaquil_id,
(VALUES
  ('Samborondón', 'Norte'),
  ('Urdesa', 'Norte'),
  ('Centro', 'Centro'),
  ('Las Peñas', 'Centro'),
  ('Kennedy', 'Norte')
) AS t(name, zone)
ON CONFLICT DO NOTHING;

-- Update existing providers with Cuenca locations (for demo)
UPDATE providers 
SET city_id = (SELECT id FROM cities WHERE name = 'Cuenca' LIMIT 1),
    neighborhood_id = (SELECT id FROM neighborhoods WHERE name = 'El Centro' AND city_id = (SELECT id FROM cities WHERE name = 'Cuenca') LIMIT 1)
WHERE name = 'Carlos Mendoza';

UPDATE providers 
SET city_id = (SELECT id FROM cities WHERE name = 'Cuenca' LIMIT 1),
    neighborhood_id = (SELECT id FROM neighborhoods WHERE name = 'San Joaquín' AND city_id = (SELECT id FROM cities WHERE name = 'Cuenca') LIMIT 1)
WHERE name = 'Juan Pérez';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cities_primary ON cities(is_primary);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_featured ON neighborhoods(is_featured);
CREATE INDEX IF NOT EXISTS idx_providers_city ON providers(city_id);
CREATE INDEX IF NOT EXISTS idx_providers_neighborhood ON providers(neighborhood_id);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_city ON neighborhoods(city_id);

-- Add sample providers specifically for Cuenca
INSERT INTO providers (name, service_type, rating, jobs_completed, response_time, price_range, experience, city_id, neighborhood_id, status)
SELECT 
  name, service_type, rating, jobs_completed, response_time, price_range, experience,
  (SELECT id FROM cities WHERE name = 'Cuenca'),
  (SELECT id FROM neighborhoods WHERE name = neighborhood AND city_id = (SELECT id FROM cities WHERE name = 'Cuenca') LIMIT 1),
  'active'
FROM (VALUES
  ('María Rodríguez', 'Electricista Cuenca', 4.9, 156, '30min', '$$', 7, 'El Centro'),
  ('Luis García', 'Plomero Profesional', 4.8, 203, '45min', '$$$', 10, 'San Joaquín'),
  ('Ana Silva', 'Limpieza del Hogar', 4.7, 89, '1hr', '$', 4, 'San Sebastián'),
  ('Pedro Vásquez', 'Carpintero Master', 5.0, 134, '2hr', '$$', 8, 'El Centro'),
  ('Carmen López', 'Jardinera Experta', 4.6, 67, '1hr', '$$', 5, 'Yanuncay'),
  ('Roberto Cruz', 'Pintor Profesional', 4.8, 178, '30min', '$$', 6, 'San Joaquín')
) AS t(name, service_type, rating, jobs_completed, response_time, price_range, experience, neighborhood)
ON CONFLICT DO NOTHING;