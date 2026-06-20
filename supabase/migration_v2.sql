-- =====================================================================
-- MIGRATION V2: TrueValue Enhancements
-- =====================================================================
-- Run this script in the Supabase SQL Editor to support the new features:
-- 1. Add LPG option to fuel types.
-- 2. Add Location field to Inquiries and Consultation requests.
-- 3. Add Vehicle Color field to Inventory list.
-- =====================================================================

-- 1. Add 'LPG' to the fuel_type enum
-- Note: In PostgreSQL, ALTER TYPE ... ADD VALUE cannot be executed inside a transaction block in some versions,
-- so run this statement separately if needed.
ALTER TYPE fuel_type ADD VALUE IF NOT EXISTS 'LPG';

-- 2. Add 'location' column to public.inquiries table
ALTER TABLE public.inquiries 
ADD COLUMN IF NOT EXISTS location VARCHAR(255);

-- 3. Add 'color' column to public.vehicles table
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS color VARCHAR(100);
