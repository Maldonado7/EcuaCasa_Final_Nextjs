# Database Migration Instructions

## Overview
This migration adds extended fields to the `providers` table to support Ecuador-specific verification and enhanced provider profiles.

## Steps to Run Migration

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the content from `scripts/migrate-provider-fields.sql`
4. Run the script

### Option 2: Command Line
```bash
# If you have psql installed and configured
psql -h [your-supabase-host] -U postgres -d postgres -f scripts/migrate-provider-fields.sql
```

## New Fields Added

| Field | Type | Description |
|-------|------|-------------|
| `cedula` | VARCHAR(10) | Ecuador national ID (exactly 10 digits) |
| `references` | JSONB | Array of client references |
| `insurance_info` | TEXT | Insurance coverage details |
| `portfolio_images` | TEXT[] | Array of portfolio image URLs |
| `years_experience` | INTEGER | Years of professional experience |
| `hourly_rate` | DECIMAL(10,2) | Hourly rate in USD |
| `availability_schedule` | JSONB | Weekly availability schedule |
| `emergency_contact` | JSONB | Emergency contact information |

## Features Enabled After Migration

✅ **Ecuador Cédula Validation** - 10-digit national ID verification  
✅ **Client References** - Up to 3 client references per provider  
✅ **Portfolio Gallery** - Image upload for work samples  
✅ **Enhanced Profile Fields** - Experience, rates, and availability  
✅ **Safety Information** - Insurance and emergency contacts  

## Validation Rules

- **Cédula**: Must be exactly 10 digits (constraint added)
- **References**: JSONB array with name, phone, service_provided fields
- **Portfolio Images**: Array of image URLs from upload system

## Rollback Instructions

If you need to rollback this migration:

```sql
-- Remove added columns (use with caution)
ALTER TABLE providers 
DROP COLUMN IF EXISTS cedula,
DROP COLUMN IF EXISTS references,
DROP COLUMN IF EXISTS insurance_info,
DROP COLUMN IF EXISTS portfolio_images,
DROP COLUMN IF EXISTS years_experience,
DROP COLUMN IF EXISTS hourly_rate,
DROP COLUMN IF EXISTS availability_schedule,
DROP COLUMN IF EXISTS emergency_contact;

-- Remove indexes
DROP INDEX IF EXISTS idx_providers_cedula;
DROP INDEX IF EXISTS idx_providers_experience;
DROP INDEX IF EXISTS idx_providers_rate;
```

## Notes

- All new fields are optional (nullable) to maintain compatibility
- Existing provider profiles will continue to work without migration
- The migration includes performance indexes for commonly queried fields
- Portfolio images are stored as URLs pointing to uploaded files in `/uploads/portfolio/`