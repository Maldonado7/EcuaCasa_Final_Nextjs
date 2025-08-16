-- Create cities table for Ecuador
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  population INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS neighborhoods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  zone TEXT, -- Norte, Sur, Centro, Este, Oeste
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add location fields to providers table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES cities(id),
ADD COLUMN IF NOT EXISTS neighborhood_id UUID REFERENCES neighborhoods(id),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS service_areas TEXT[]; -- Array of neighborhood IDs they serve

-- Insert Ecuador main cities
INSERT INTO cities (name, province, population) VALUES
  ('Quito', 'Pichincha', 2781641),
  ('Guayaquil', 'Guayas', 2698077),
  ('Cuenca', 'Azuay', 636996),
  ('Santo Domingo', 'Santo Domingo', 458580),
  ('Ambato', 'Tungurahua', 387309),
  ('Portoviejo', 'Manabí', 321800),
  ('Manta', 'Manabí', 264281),
  ('Loja', 'Loja', 274112),
  ('Riobamba', 'Chimborazo', 264048),
  ('Ibarra', 'Imbabura', 221149),
  ('Esmeraldas', 'Esmeraldas', 218727),
  ('Machala', 'El Oro', 289141)
ON CONFLICT (name) DO NOTHING;

-- Insert Quito neighborhoods
WITH quito_id AS (SELECT id FROM cities WHERE name = 'Quito')
INSERT INTO neighborhoods (name, city_id, zone) 
SELECT name, quito_id.id, zone FROM quito_id,
(VALUES
  ('La Carolina', 'Norte'),
  ('La Mariscal', 'Norte'),
  ('Iñaquito', 'Norte'),
  ('El Batán', 'Norte'),
  ('González Suárez', 'Norte'),
  ('Bellavista', 'Norte'),
  ('La Floresta', 'Centro'),
  ('Centro Histórico', 'Centro'),
  ('San Marcos', 'Centro'),
  ('San Blas', 'Centro'),
  ('La Tola', 'Centro'),
  ('La Vicentina', 'Centro'),
  ('Cumbayá', 'Valle'),
  ('Tumbaco', 'Valle'),
  ('Los Chillos', 'Valle'),
  ('El Valle', 'Valle'),
  ('Quitumbe', 'Sur'),
  ('Solanda', 'Sur'),
  ('La Magdalena', 'Sur'),
  ('Chillogallo', 'Sur'),
  ('Guamaní', 'Sur'),
  ('Turubamba', 'Sur')
) AS t(name, zone);

-- Insert Guayaquil neighborhoods
WITH guayaquil_id AS (SELECT id FROM cities WHERE name = 'Guayaquil')
INSERT INTO neighborhoods (name, city_id, zone)
SELECT name, guayaquil_id.id, zone FROM guayaquil_id,
(VALUES
  ('Samborondón', 'Norte'),
  ('Kennedy', 'Norte'),
  ('Urdesa', 'Norte'),
  ('Miraflores', 'Norte'),
  ('Alborada', 'Norte'),
  ('Sauces', 'Norte'),
  ('Centro', 'Centro'),
  ('Las Peñas', 'Centro'),
  ('9 de Octubre', 'Centro'),
  ('Bahía', 'Centro'),
  ('Ximena', 'Sur'),
  ('Centenario', 'Sur'),
  ('Los Esteros', 'Sur'),
  ('Guasmo', 'Sur'),
  ('Suburbio', 'Oeste'),
  ('Mapasingue', 'Oeste'),
  ('Bastión Popular', 'Noroeste'),
  ('Prosperina', 'Noroeste'),
  ('Pascuales', 'Norte'),
  ('Tarqui', 'Norte')
) AS t(name, zone);

-- Insert Cuenca neighborhoods
WITH cuenca_id AS (SELECT id FROM cities WHERE name = 'Cuenca')
INSERT INTO neighborhoods (name, city_id, zone)
SELECT name, cuenca_id.id, zone FROM cuenca_id,
(VALUES
  ('El Centro', 'Centro'),
  ('San Sebastián', 'Centro'),
  ('El Batán', 'Norte'),
  ('El Sagrario', 'Centro'),
  ('Sucre', 'Centro'),
  ('Huayna Cápac', 'Norte'),
  ('Totoracocha', 'Sur'),
  ('Yanuncay', 'Sur'),
  ('El Vecino', 'Sur'),
  ('Feria Libre', 'Oeste'),
  ('El Arenal', 'Oeste'),
  ('Las Américas', 'Oeste'),
  ('Puertas del Sol', 'Norte'),
  ('Ricaurte', 'Norte'),
  ('Baños', 'Suroeste'),
  ('San Joaquín', 'Oeste'),
  ('Sayausí', 'Oeste'),
  ('El Valle', 'Este'),
  ('Santa Ana', 'Este'),
  ('Turi', 'Sur')
) AS t(name, zone);

-- Insert Santo Domingo neighborhoods
WITH santo_domingo_id AS (SELECT id FROM cities WHERE name = 'Santo Domingo')
INSERT INTO neighborhoods (name, city_id, zone)
SELECT name, santo_domingo_id.id, zone FROM santo_domingo_id,
(VALUES
  ('Centro', 'Centro'),
  ('Zaracay', 'Norte'),
  ('Los Rosales', 'Norte'),
  ('30 de Julio', 'Sur'),
  ('Bellavista', 'Este'),
  ('Las Palmas', 'Oeste'),
  ('Bombolí', 'Norte'),
  ('Chigüilpe', 'Sur'),
  ('Río Verde', 'Este'),
  ('Cooperativa Juan Eulogio', 'Sur')
) AS t(name, zone);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_providers_city ON providers(city_id);
CREATE INDEX IF NOT EXISTS idx_providers_neighborhood ON providers(neighborhood_id);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_city ON neighborhoods(city_id);

-- Update sample providers with locations
UPDATE providers 
SET city_id = (SELECT id FROM cities WHERE name = 'Quito' LIMIT 1),
    neighborhood_id = (SELECT id FROM neighborhoods WHERE name = 'La Carolina' LIMIT 1)
WHERE name = 'Carlos Mendoza';

UPDATE providers 
SET city_id = (SELECT id FROM cities WHERE name = 'Guayaquil' LIMIT 1),
    neighborhood_id = (SELECT id FROM neighborhoods WHERE name = 'Urdesa' LIMIT 1)
WHERE name = 'María Rodríguez';

UPDATE providers 
SET city_id = (SELECT id FROM cities WHERE name = 'Cuenca' LIMIT 1),
    neighborhood_id = (SELECT id FROM neighborhoods WHERE name = 'El Centro' LIMIT 1)
WHERE name = 'Juan Pérez';