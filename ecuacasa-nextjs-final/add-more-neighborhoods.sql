-- Add neighborhoods for Quito
INSERT INTO neighborhoods (name, city_id, zone, is_featured)
SELECT name, 
       (SELECT id FROM cities WHERE name = 'Quito'),
       zone,
       featured
FROM (VALUES
  ('La Carolina', 'Norte', true),
  ('La Mariscal', 'Norte', true),
  ('Centro Histórico', 'Centro', true),
  ('Cumbayá', 'Valle', false),
  ('La Floresta', 'Centro', false),
  ('Iñaquito', 'Norte', false),
  ('El Batán', 'Norte', false),
  ('Tumbaco', 'Valle', false)
) AS t(name, zone, featured)
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Guayaquil  
INSERT INTO neighborhoods (name, city_id, zone, is_featured)
SELECT name,
       (SELECT id FROM cities WHERE name = 'Guayaquil'),
       zone,
       featured
FROM (VALUES
  ('Samborondón', 'Norte', true),
  ('Urdesa', 'Norte', true),
  ('Centro', 'Centro', true),
  ('Las Peñas', 'Centro', false),
  ('Kennedy', 'Norte', false),
  ('Alborada', 'Norte', false),
  ('Ximena', 'Sur', false),
  ('Guasmo', 'Sur', false)
) AS t(name, zone, featured)
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Santo Domingo
INSERT INTO neighborhoods (name, city_id, zone, is_featured)
SELECT name,
       (SELECT id FROM cities WHERE name = 'Santo Domingo'),
       zone,
       featured
FROM (VALUES
  ('Centro', 'Centro', true),
  ('Zaracay', 'Norte', true),
  ('Los Rosales', 'Norte', false),
  ('30 de Julio', 'Sur', false),
  ('Bellavista', 'Este', false)
) AS t(name, zone, featured)
ON CONFLICT DO NOTHING;