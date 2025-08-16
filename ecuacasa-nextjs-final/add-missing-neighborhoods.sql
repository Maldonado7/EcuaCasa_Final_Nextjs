-- Add neighborhoods for Ambato
INSERT INTO neighborhoods (name, city_id, zone, is_featured)
SELECT name,
       (SELECT id FROM cities WHERE name = 'Ambato'),
       zone,
       featured
FROM (VALUES
  ('Centro', 'Centro', true),
  ('La Merced', 'Centro', true),
  ('Miraflores', 'Norte', true),
  ('Ficoa', 'Norte', false),
  ('Atocha', 'Sur', false),
  ('La Península', 'Oeste', false),
  ('Huachi Chico', 'Este', false),
  ('San Francisco', 'Centro', false)
) AS t(name, zone, featured)
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Loja
INSERT INTO neighborhoods (name, city_id, zone, is_featured)
SELECT name,
       (SELECT id FROM cities WHERE name = 'Loja'),
       zone,
       featured
FROM (VALUES
  ('Centro Histórico', 'Centro', true),
  ('El Valle', 'Norte', true),
  ('Clodoveo Jaramillo', 'Sur', true),
  ('Jipiro', 'Norte', false),
  ('Miraflores', 'Este', false),
  ('Sauces Norte', 'Norte', false),
  ('Daniel Álvarez', 'Oeste', false)
) AS t(name, zone, featured)
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Portoviejo (if it exists in cities)
INSERT INTO neighborhoods (name, city_id, zone, is_featured)
SELECT name,
       (SELECT id FROM cities WHERE name = 'Portoviejo'),
       zone,
       featured
FROM (VALUES
  ('Centro', 'Centro', true),
  ('12 de Marzo', 'Norte', true),
  ('Picoazá', 'Sur', false),
  ('Colón', 'Este', false),
  ('San Pablo', 'Oeste', false)
) AS t(name, zone, featured)
WHERE (SELECT id FROM cities WHERE name = 'Portoviejo') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Manta (if it exists in cities)
INSERT INTO neighborhoods (name, city_id, zone, is_featured)
SELECT name,
       (SELECT id FROM cities WHERE name = 'Manta'),
       zone,
       featured
FROM (VALUES
  ('Centro', 'Centro', true),
  ('Tarqui', 'Este', true),
  ('Los Esteros', 'Norte', false),
  ('Eloy Alfaro', 'Sur', false),
  ('Jocay', 'Norte', false)
) AS t(name, zone, featured)
WHERE (SELECT id FROM cities WHERE name = 'Manta') IS NOT NULL
ON CONFLICT DO NOTHING;