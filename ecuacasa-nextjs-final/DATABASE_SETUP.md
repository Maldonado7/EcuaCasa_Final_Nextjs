# Database Setup Instructions

## Overview
To fix the "Profesional no encontrado" error and have all provider cards working, you need to run both database migration scripts in your Supabase database.

## Required Scripts (Run in Order)

### 1. First: Add Extended Fields to Database
**File:** `scripts/migrate-provider-fields.sql`
**Purpose:** Adds all the extended fields (cédula, references, etc.) to the providers table

### 2. Second: Insert Sample Providers
**File:** `scripts/insert-sample-providers.sql`  
**Purpose:** Creates actual database records for all sample providers so their profile pages work

## How to Run the Scripts

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste `scripts/migrate-provider-fields.sql`
4. Click **Run** 
5. Copy and paste `scripts/insert-sample-providers.sql`
6. Click **Run**

### Option 2: Command Line (if you have psql)
```bash
# Run migration first
psql -h [your-supabase-host] -U postgres -d postgres -f scripts/migrate-provider-fields.sql

# Then insert sample providers
psql -h [your-supabase-host] -U postgres -d postgres -f scripts/insert-sample-providers.sql
```

## What This Fixes

### Before Migration:
❌ Only your provider card exists in database  
❌ Clicking sample providers shows "Profesional no encontrado"  
❌ Sample providers have fake IDs (1, 2, 3...) that don't exist

### After Migration:
✅ **8 professional sample providers** added to database  
✅ **All provider cards clickable** and lead to real profile pages  
✅ **Complete profiles** with Ecuador-specific data  
✅ **Realistic reviews, pricing, and availability**  

## Sample Providers Added

1. **Carlos Mendoza** - Plomero Master (El Centro)
2. **María Elena Rodríguez** - Electricista Certificada (San Joaquín)  
3. **Luis Fernando García** - Carpintero Artesanal (Yanuncay)
4. **Ana Patricia Silva** - Pintora Profesional (San Sebastián)
5. **Jorge Alberto Vega** - Jardinero Paisajista (Totoracocha)
6. **Rosa María Vera** - Limpieza Premium (Monay)
7. **Miguel Ángel Torres** - Cerrajero 24/7 (El Batán)
8. **Carmen Lucía Ordóñez** - Albañil Especialista (Ricaurte)

## Verification

After running both scripts:
1. Visit the homepage - you should see multiple provider cards
2. Click on any provider card - it should show their profile page
3. When signed out, your card should be filtered out
4. When signed in, your card should show with "Tu perfil" badge

## Troubleshooting

If you still see "Profesional no encontrado":
1. Check that both SQL scripts ran successfully
2. Verify records exist: `SELECT COUNT(*) FROM providers;`
3. Check for any SQL errors in the Supabase logs
4. Ensure the `verified` column is set to `true` for all providers

## Production Notes

- All sample providers have realistic Ecuador phone numbers
- Locations are real Cuenca neighborhoods  
- Services and pricing reflect actual market rates
- Providers are marked as `verified: true` so they appear in listings