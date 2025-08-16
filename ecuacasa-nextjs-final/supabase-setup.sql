-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  service_type TEXT,
  rating DECIMAL(2,1) DEFAULT 5.0,
  jobs_completed INTEGER DEFAULT 0,
  response_time TEXT DEFAULT '30min',
  price_range TEXT DEFAULT '$$$',
  experience INTEGER DEFAULT 5,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table  
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  provider_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample providers
INSERT INTO providers (name, service_type, rating, jobs_completed, response_time, price_range, experience)
VALUES 
  ('Carlos Mendoza', 'Plomero Master', 5.0, 342, '30min', '$$$', 8),
  ('María Rodríguez', 'Electricista', 4.9, 256, '45min', '$$', 5),
  ('Juan Pérez', 'Pintor Profesional', 4.8, 189, '1hr', '$$', 6);

-- Insert sample services
INSERT INTO services (name, provider_count)
VALUES 
  ('Plomería', 156),
  ('Electricidad', 98),
  ('Carpintería', 87),
  ('Pintura', 102),
  ('Limpieza', 234),
  ('Jardinería', 45),
  ('Cerrajería', 67),
  ('Albañilería', 89);

-- Insert sample users (optional)
INSERT INTO users (email, name)
VALUES 
  ('demo@example.com', 'Usuario Demo');